"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { messageController } from "@/app/controllers/MessageController";
import { authController } from "@/app/controllers/AuthController";
import { useRouter } from "next/navigation";

export default function MessagesPage() {
	const [conversations, setConversations] = useState([]);
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch current user
				const user = await authController.fetchCurrentUser();
				if (!user) {
					router.push("/login");
					return;
				}
				setCurrentUser(user);

				// Fetch conversations
				const response = await messageController.getConversations();
				const data = response?.results || response || [];
				setConversations(data);
				if (data.length > 0) {
					// Select first conversation by default on desktop
					handleSelectConversation(data[0]);
				}
			} catch (error) {
				console.error("Error fetching conversations:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [router]);

	const handleSelectConversation = async (conversation) => {
		setSelectedConversation(conversation);
		try {
			const response = await messageController.getMessages(
				conversation.id
			);
			const msgs = response?.results || response || [];
			setMessages(msgs);
		} catch (error) {
			console.error("Error fetching messages:", error);
			setMessages([]);
		}
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		if (!newMessage.trim() || !selectedConversation) return;

		try {
			const result = await messageController.sendMessage(
				selectedConversation.id,
				newMessage
			);
			if (result.success && result.message) {
				setMessages([...messages, result.message]);
				setNewMessage("");
				// Update last message in conversation list
				setConversations((prev) =>
					prev.map((c) =>
						c.id === selectedConversation.id
							? {
									...c,
									lastMessage:
										result.message.content ||
										result.message.text,
									timestamp: "Just now",
								}
							: c
					)
				);
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	// Helper to get the other participant from conversation
	const getOtherParticipant = (conversation) => {
		if (!currentUser) return conversation.participants?.[0] || {};
		return (
			conversation.participants?.find((p) => p.id !== currentUser.id) ||
			conversation.participants?.[0] ||
			{}
		);
	};

	return (
		<DashboardLayout>
			<div className='flex h-[calc(100vh-64px)] bg-background-light dark:bg-background-dark overflow-hidden'>
				{/* Conversation List */}
				<div
					className={`w-full md:w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#192430] flex flex-col ${selectedConversation ? "hidden md:flex" : "flex"}`}
				>
					<div className='p-4 border-b border-gray-200 dark:border-gray-700'>
						<h2 className='text-xl font-bold text-gray-900 dark:text-white'>
							Messages
						</h2>
						<div className='mt-2 relative'>
							<span className='absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-sm'>
								search
							</span>
							<input
								type='text'
								placeholder='Search messages'
								className='w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none'
							/>
						</div>
					</div>
					<div className='flex-1 overflow-y-auto'>
						{loading ? (
							<div className='p-4 text-center text-gray-500'>
								Loading...
							</div>
						) : conversations.length === 0 ? (
							<div className='p-4 text-center text-gray-500'>
								No conversations yet
							</div>
						) : (
							conversations.map((conv) => {
								const otherUser = getOtherParticipant(conv);
								const participantName =
									otherUser.fullName ||
									otherUser.username ||
									"Unknown";
								const participantAvatar =
									otherUser.avatar ||
									`https://ui-avatars.com/api/?name=${encodeURIComponent(participantName)}&background=random`;

								return (
									<div
										key={conv.id}
										onClick={() =>
											handleSelectConversation(conv)
										}
										className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedConversation?.id === conv.id ? "bg-primary/5 dark:bg-primary/10 border-l-4 border-primary" : "border-l-4 border-transparent"}`}
									>
										<div className='relative'>
											<img
												src={participantAvatar}
												alt={participantName}
												className='w-12 h-12 rounded-full object-cover'
											/>
											{conv.unreadCount > 0 && (
												<span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-[#192430]'>
													{conv.unreadCount}
												</span>
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<div className='flex justify-between items-baseline mb-1'>
												<h3 className='font-bold text-gray-900 dark:text-white truncate'>
													{participantName}
												</h3>
												<span className='text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2'>
													{conv.lastMessageTime || ""}
												</span>
											</div>
											<p
												className={`text-sm truncate ${conv.unreadCount > 0 ? "font-bold text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
											>
												{conv.lastMessage ||
													"No messages yet"}
											</p>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>

				{/* Chat Area */}
				<div
					className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 ${!selectedConversation ? "hidden md:flex" : "flex"}`}
				>
					{selectedConversation ? (
						<>
							{/* Chat Header */}
							<div className='p-4 bg-white dark:bg-[#192430] border-b border-gray-200 dark:border-gray-700 flex items-center gap-3 shadow-sm z-10'>
								<button
									onClick={() =>
										setSelectedConversation(null)
									}
									className='md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full'
								>
									<span className='material-symbols-outlined'>
										arrow_back
									</span>
								</button>
								{(() => {
									const otherUser =
										getOtherParticipant(
											selectedConversation
										);
									const participantName =
										otherUser.fullName ||
										otherUser.username ||
										"Unknown";
									const participantAvatar =
										otherUser.avatar ||
										`https://ui-avatars.com/api/?name=${encodeURIComponent(participantName)}&background=random`;
									return (
										<>
											<img
												src={participantAvatar}
												alt={participantName}
												className='w-10 h-10 rounded-full object-cover'
											/>
											<div>
												<h3 className='font-bold text-gray-900 dark:text-white'>
													{participantName}
												</h3>
												<span className='flex items-center gap-1 text-xs text-green-500 font-medium'>
													<span className='w-2 h-2 bg-green-500 rounded-full'></span>
													Online
												</span>
											</div>
										</>
									);
								})()}
								<div className='ml-auto flex gap-2'>
									<button className='p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full'>
										<span className='material-symbols-outlined'>
											videocam
										</span>
									</button>
									<button className='p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full'>
										<span className='material-symbols-outlined'>
											more_vert
										</span>
									</button>
								</div>
							</div>

							{/* Messages */}
							<div className='flex-1 overflow-y-auto p-4 space-y-4'>
								{messages.map((msg) => {
									const isMe =
										msg.senderId === currentUser?.id ||
										msg.sender?.id === currentUser?.id;
									return (
										<div
											key={msg.id}
											className={`flex ${isMe ? "justify-end" : "justify-start"}`}
										>
											<div
												className={`max-w-[75%] rounded-2xl px-4 py-3 ${
													isMe
														? "bg-primary text-white rounded-br-none"
														: "bg-white dark:bg-[#192430] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none"
												}`}
											>
												<p className='text-sm'>
													{msg.content || msg.text}
												</p>
												<p
													className={`text-[10px] mt-1 text-right ${isMe ? "text-white/70" : "text-gray-400"}`}
												>
													{msg.timestamp ||
														msg.createdAt ||
														""}
												</p>
											</div>
										</div>
									);
								})}
							</div>

							{/* Input Area */}
							<div className='p-4 bg-white dark:bg-[#192430] border-t border-gray-200 dark:border-gray-700'>
								<form
									onSubmit={handleSendMessage}
									className='flex items-center gap-2'
								>
									<button
										type='button'
										className='p-2 text-gray-400 hover:text-primary transition-colors'
									>
										<span className='material-symbols-outlined'>
											attach_file
										</span>
									</button>
									<input
										type='text'
										placeholder='Type a message...'
										className='flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-none text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 outline-none'
										value={newMessage}
										onChange={(e) =>
											setNewMessage(e.target.value)
										}
									/>
									<button
										type='submit'
										disabled={!newMessage.trim()}
										className='p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
									>
										<span className='material-symbols-outlined'>
											send
										</span>
									</button>
								</form>
							</div>
						</>
					) : (
						<div className='flex-1 flex flex-col items-center justify-center text-gray-400'>
							<span className='material-symbols-outlined text-6xl mb-4'>
								chat
							</span>
							<p className='text-lg font-medium'>
								Select a conversation to start messaging
							</p>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
