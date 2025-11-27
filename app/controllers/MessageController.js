class MessageController {
    constructor() {
        this.conversations = [
            {
                id: 1,
                participantId: 2,
                participantName: "David Miller",
                participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBecCzAzBEe41DuGoY03sthZ5A2jPjw8XN3_QFW6k2cTf14L8G7hzm5JLbLRzZI9U9y4KE2d_vZP89W5PQmVbONX8_thYUzzTDt0RoFSwli5wzn0BMeVVet2yfBmMHVrx_71vnMTeFh6lYEKm7kLBJDGkcDun8dFKEZucM1merHiASX-lQf599972CLQhRXsrEuJIOm7NkxBnBTJChYYyzfLxbrC6c9Oaodb0yI2HKUahd6s0N9QK5hG09qJLPxOfAEb5Jm2LOfZ-6w",
                lastMessage: "Sure, I can have that done by Friday.",
                timestamp: "10:30 AM",
                unread: 2,
                messages: [
                    { id: 1, senderId: 2, text: "Hi, I saw your job posting.", timestamp: "10:00 AM" },
                    { id: 2, senderId: 1, text: "Great! Do you have experience with React?", timestamp: "10:05 AM" },
                    { id: 3, senderId: 2, text: "Yes, I have been working with it for 5 years.", timestamp: "10:10 AM" },
                    { id: 4, senderId: 2, text: "Sure, I can have that done by Friday.", timestamp: "10:30 AM" }
                ]
            },
            {
                id: 2,
                participantId: 3,
                participantName: "Sarah Chen",
                participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh-aiNcCW5cqRtzstE3mQpmMhrw19H3dz-qO9bjqQM7WVWzUQvanGYDW8wCzm0W8-INMC3Ok5Olf91gEwOpiLfsqhHiJeBaAZamCr7_i4siDDvmJap_Wt0E6TGxF7bgaUwZozw2ONkc6Fil3e3TPVIpkdBjNRm6HVib4i0wF0VB20BubcXIWIOThphzFHrYtokWeOLXzufBikyKxHG2v-XJ8CXBQ33H63UdcgXH1LYYzawA8whQbkQi_QZ-gf979vkebTHvmGoHpMt",
                lastMessage: "The API endpoint is ready for testing.",
                timestamp: "Yesterday",
                unread: 0,
                messages: [
                    { id: 1, senderId: 3, text: "Updates on the backend?", timestamp: "Yesterday" },
                    { id: 2, senderId: 3, text: "The API endpoint is ready for testing.", timestamp: "Yesterday" }
                ]
            },
            {
                id: 3,
                participantId: 4,
                participantName: "Michael Brown",
                participantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTsD7VPifNUR9klSEyzvfL7WnyM6L_BjOvZMbGwcdA6AOsJHSoJb7T0_oY7ltm09FbujZLxzUdNzW_GbCkuQtWO5o5hGExplfdK46BNFaCnmrlISQ7F5-84iA6_kGoe9tT-BW7CNgUEtmuF1JiZKzRHwIY2A-T3KHx-9qQlpqrDgU0m3Dnuf5kpSNnZBvYUsVVrVYZgVDyOGu1goqDXLjZnqYqe_pdbtshSHcR9Gi78k7iMWUfuS6713NJlzZGVj5RtQyTkDxHVIIf",
                lastMessage: "Thanks for the payment!",
                timestamp: "2 days ago",
                unread: 0,
                messages: [
                    { id: 1, senderId: 1, text: "Payment sent.", timestamp: "2 days ago" },
                    { id: 2, senderId: 4, text: "Thanks for the payment!", timestamp: "2 days ago" }
                ]
            }
        ];
    }

    async getConversations() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.conversations);
            }, 300);
        });
    }

    async getMessages(conversationId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conversation = this.conversations.find(c => c.id === parseInt(conversationId));
                resolve(conversation ? conversation.messages : []);
            }, 300);
        });
    }

    async sendMessage(conversationId, text) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const conversation = this.conversations.find(c => c.id === parseInt(conversationId));
                if (conversation) {
                    const newMessage = {
                        id: conversation.messages.length + 1,
                        senderId: 1, // Current user
                        text: text,
                        timestamp: "Just now"
                    };
                    conversation.messages.push(newMessage);
                    conversation.lastMessage = text;
                    conversation.timestamp = "Just now";
                    resolve({ success: true, message: newMessage });
                } else {
                    resolve({ success: false });
                }
            }, 300);
        });
    }
}

export const messageController = new MessageController();
