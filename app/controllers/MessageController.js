import api from "@/app/services/api";

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

// Helper: transform conversation
const transformConversation = (conv, userId) => {
	const other =
		conv.participants?.find((p) => p.id !== userId) ||
		conv.participants?.[0];
	return {
		id: conv.id,
		participantId: other?.id,
		participantName: other?.full_name || "Unknown",
		participantAvatar: other?.avatar,
		participants: conv.participants,
		lastMessage: conv.last_message?.text || "",
		lastMessageSenderId: conv.last_message?.sender_id,
		timestamp: formatTime(conv.last_message?.created_at || conv.updated_at),
		unread: conv.unread_count || 0,
	};
};

// Helper: transform message
const transformMessage = (msg) => ({
	id: msg.id,
	senderId: msg.sender?.id || msg.sender_id,
	senderName: msg.sender?.full_name,
	senderAvatar: msg.sender?.avatar,
	text: msg.text,
	isRead: msg.is_read,
	timestamp: formatTime(msg.created_at),
	createdAt: msg.created_at,
});

export const messageController = {
	// Get conversations
	async getConversations() {
		try {
			const { data } = await api.get("/api/conversations/");
			const userId = getCurrentUserId();
			return (data.results || data).map((c) =>
				transformConversation(c, userId)
			);
		} catch {
			return [];
		}
	},

	// Start conversation
	async startConversation(participantId) {
		try {
			const { data } = await api.post("/api/conversations/", {
				participant_id: participantId,
			});
			return {
				success: true,
				conversation: transformConversation(data, getCurrentUserId()),
			};
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.detail ||
					"Failed to start conversation",
			};
		}
	},

	// Get messages
	async getMessages(conversationId) {
		try {
			const { data } = await api.get(
				`/api/conversations/${conversationId}/messages/`
			);
			return (data.results || data).map(transformMessage);
		} catch {
			return [];
		}
	},

	// Send message
	async sendMessage(conversationId, text) {
		try {
			const { data } = await api.post(
				`/api/conversations/${conversationId}/messages/`,
				{ text }
			);
			return { success: true, message: transformMessage(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to send",
			};
		}
	},

	// Mark message read
	async markMessageAsRead(conversationId, messageId) {
		try {
			await api.patch(
				`/api/conversations/${conversationId}/messages/${messageId}/mark_read/`
			);
			return { success: true };
		} catch {
			return { success: false };
		}
	},

	// Mark all as read
	async markConversationAsRead(conversationId) {
		try {
			const messages = await this.getMessages(conversationId);
			const userId = getCurrentUserId();
			const unread = messages.filter(
				(m) => !m.isRead && m.senderId !== userId
			);
			await Promise.all(
				unread.map((m) => this.markMessageAsRead(conversationId, m.id))
			);
			return { success: true };
		} catch {
			return { success: false };
		}
	},
};
