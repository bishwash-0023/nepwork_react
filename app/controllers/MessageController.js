import api from "@/app/services/api";

/**
 * MessageController - Updated to match new backend API structure
 *
 * Endpoints (from z_readmes/messaging.md):
 * - POST /messages/new - Send a new message
 * - GET /messages/conversation/{user_id}/ - Get conversation with a specific user
 * - DELETE /messages/delete/{id}/ - Delete a message
 * - GET /messages/mine/ - Get all messages (sent and received)
 * - GET /messages/sent/ - Get all sent messages
 * - GET /messages/received/ - Get all received messages
 * - GET /messages/conversations/ - List all conversations
 * - GET /messages/unread/count/ - Get unread message count
 * - POST /messages/read/{id}/ - Mark a specific message as read
 */

// Helper: format timestamp
const formatTime = (dateString) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	const days = Math.floor((Date.now() - date) / 86400000);
	if (days === 0)
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	if (days === 1) return "Yesterday";
	if (days < 7) return `${days}d ago`;
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper: get current user ID
const getCurrentUserId = () => {
	try {
		const user = localStorage.getItem("nepwork_user");
		return user ? JSON.parse(user).id : null;
	} catch {
		return null;
	}
};

// Helper: transform conversation from new API format
const transformConversation = (conv, userId) => {
	// New API returns participants array
	const participants = conv.participants || [];
	const other = participants.find((p) => p.id !== userId) || participants[0];

	return {
		id: conv.id,
		participantId: other?.id,
		participantName: other?.full_name || other?.email || "Unknown",
		participantEmail: other?.email,
		participantAvatar: other?.profile_image,
		participants: participants,
		lastMessage:
			conv.last_message_content || conv.last_message?.content || "",
		lastMessageTime:
			conv.last_message_time || conv.last_message?.created_at,
		timestamp: formatTime(conv.last_message_time || conv.updated_at),
		unread: conv.unread_count || 0,
		updatedAt: conv.updated_at,
	};
};

// Helper: transform message from new API format
const transformMessage = (msg) => ({
	id: msg.id,
	senderId: msg.sender?.id || msg.sender_id,
	senderName: msg.sender?.full_name || msg.sender?.email,
	senderEmail: msg.sender?.email,
	senderAvatar: msg.sender?.profile_image,
	receiverId: msg.receiver?.id || msg.receiver_id,
	receiverName: msg.receiver?.full_name || msg.receiver?.email,
	receiverEmail: msg.receiver?.email,
	text: msg.content,
	content: msg.content,
	isRead: msg.is_read,
	timestamp: formatTime(msg.created_at),
	createdAt: msg.created_at,
	attachments: msg.attachments || [],
});

export const messageController = {
	/**
	 * Get all conversations
	 * NEW ENDPOINT: GET /messages/conversations/
	 */
	async getConversations() {
		try {
			const { data } = await api.get("/messages/conversations/");
			const userId = getCurrentUserId();
			const conversations = data.results || data;
			return Array.isArray(conversations)
				? conversations.map((c) => transformConversation(c, userId))
				: [];
		} catch (error) {
			console.error("Error fetching conversations:", error);
			return [];
		}
	},

	/**
	 * Get conversation with a specific user
	 * NEW ENDPOINT: GET /messages/conversation/{user_id}/
	 * Note: This endpoint marks all received messages as read
	 * Returns: { sent: [...], received: [...] }
	 */
	async getConversation(userId) {
		try {
			const { data } = await api.get(`/messages/conversation/${userId}/`);
			return {
				sent: (data.sent || []).map(transformMessage),
				received: (data.received || []).map(transformMessage),
			};
		} catch (error) {
			console.error("Error fetching conversation:", error);
			return { sent: [], received: [] };
		}
	},

	/**
	 * Get messages for a conversation (combined sent and received, sorted by time)
	 * Uses the conversation endpoint and merges the results
	 */
	async getMessages(userId) {
		try {
			const { sent, received } = await this.getConversation(userId);
			// Combine and sort by created_at
			const allMessages = [...sent, ...received].sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
			);
			return allMessages;
		} catch (error) {
			console.error("Error fetching messages:", error);
			return [];
		}
	},

	/**
	 * Send a new message
	 * NEW ENDPOINT: POST /messages/new
	 */
	async sendMessage(receiverId, content) {
		try {
			const { data } = await api.post("/messages/new", {
				receiver_id: receiverId,
				content: content,
			});
			return { success: true, message: transformMessage(data) };
		} catch (error) {
			console.error("Error sending message:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to send message",
			};
		}
	},

	/**
	 * Delete a message
	 * NEW ENDPOINT: DELETE /messages/delete/{id}/
	 * Note: Only the sender can delete their messages
	 */
	async deleteMessage(messageId) {
		try {
			await api.delete(`/messages/delete/${messageId}/`);
			return { success: true };
		} catch (error) {
			console.error("Error deleting message:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail || "Failed to delete message",
			};
		}
	},

	/**
	 * Get all messages (sent and received)
	 * NEW ENDPOINT: GET /messages/mine/
	 */
	async getAllMessages() {
		try {
			const { data } = await api.get("/messages/mine/");
			const messages = data.results || data;
			return Array.isArray(messages)
				? messages.map(transformMessage)
				: [];
		} catch (error) {
			console.error("Error fetching all messages:", error);
			return [];
		}
	},

	/**
	 * Get sent messages
	 * NEW ENDPOINT: GET /messages/sent/
	 */
	async getSentMessages() {
		try {
			const { data } = await api.get("/messages/sent/");
			const messages = data.results || data;
			return Array.isArray(messages)
				? messages.map(transformMessage)
				: [];
		} catch (error) {
			console.error("Error fetching sent messages:", error);
			return [];
		}
	},

	/**
	 * Get received messages
	 * NEW ENDPOINT: GET /messages/received/
	 */
	async getReceivedMessages() {
		try {
			const { data } = await api.get("/messages/received/");
			const messages = data.results || data;
			return Array.isArray(messages)
				? messages.map(transformMessage)
				: [];
		} catch (error) {
			console.error("Error fetching received messages:", error);
			return [];
		}
	},

	/**
	 * Get unread message count
	 * NEW ENDPOINT: GET /messages/unread/count/
	 */
	async getUnreadCount() {
		try {
			const { data } = await api.get("/messages/unread/count/");
			return data.unread_count || 0;
		} catch (error) {
			console.error("Error fetching unread count:", error);
			return 0;
		}
	},

	/**
	 * Mark a message as read
	 * NEW ENDPOINT: POST /messages/read/{id}/
	 */
	async markMessageAsRead(messageId) {
		try {
			await api.post(`/messages/read/${messageId}/`);
			return { success: true };
		} catch (error) {
			console.error("Error marking message as read:", error);
			return { success: false };
		}
	},

	/**
	 * Mark all messages in a conversation as read
	 * Uses the getConversation endpoint which auto-marks as read
	 */
	async markConversationAsRead(userId) {
		try {
			// Simply fetching the conversation marks messages as read per API docs
			await this.getConversation(userId);
			return { success: true };
		} catch (error) {
			console.error("Error marking conversation as read:", error);
			return { success: false };
		}
	},

	/**
	 * Start a new conversation by sending a message
	 * Uses the sendMessage endpoint
	 */
	async startConversation(participantId, initialMessage = "") {
		if (!initialMessage) {
			// Just return success if no message, conversation will be created on first message
			return {
				success: true,
				conversation: {
					participantId,
					messages: [],
				},
			};
		}
		return await this.sendMessage(participantId, initialMessage);
	},
};
