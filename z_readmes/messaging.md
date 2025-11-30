# Messaging App

The Messaging app handles direct messaging between users on the NepWork platform.

## Overview

This app provides:

- Direct messaging between users
- Conversation management
- Read/unread status tracking
- File attachments for messages
- Conversation listing and history

## Models

### Message Model

| Field        | Type          | Description                   |
| ------------ | ------------- | ----------------------------- |
| `id`         | AutoField     | Primary key                   |
| `sender`     | ForeignKey    | User who sent the message     |
| `receiver`   | ForeignKey    | User who received the message |
| `content`    | TextField     | Message content               |
| `created_at` | DateTimeField | Send timestamp                |
| `is_read`    | BooleanField  | Read status                   |

### MessageAttachment Model

| Field         | Type          | Description      |
| ------------- | ------------- | ---------------- |
| `id`          | AutoField     | Primary key      |
| `message`     | ForeignKey    | Related message  |
| `file`        | FileField     | Attachment file  |
| `filename`    | CharField     | File name        |
| `uploaded_at` | DateTimeField | Upload timestamp |

### Conversation Model

| Field          | Type            | Description             |
| -------------- | --------------- | ----------------------- |
| `id`           | AutoField       | Primary key             |
| `participants` | ManyToManyField | Users in conversation   |
| `last_message` | ForeignKey      | Most recent message     |
| `updated_at`   | DateTimeField   | Last activity timestamp |

## API Endpoints

### POST `/messages/new`

Send a new message.

**Request:**

```json
{
	"receiver_id": 2,
	"content": "Hello! I'm interested in your project."
}
```

**Response (201 Created):**

```json
{
	"id": 1,
	"sender": {
		"id": 1,
		"email": "sender@example.com"
	},
	"receiver": {
		"id": 2,
		"email": "receiver@example.com"
	},
	"content": "Hello! I'm interested in your project.",
	"created_at": "2024-01-01T12:00:00Z",
	"is_read": false,
	"attachments": []
}
```

### GET `/messages/conversation/{user_id}/`

Get conversation with a specific user (categorized by sent/received).

**Response (200 OK):**

```json
{
	"sent": [
		{
			"id": 1,
			"receiver": {
				"id": 2,
				"email": "other@example.com"
			},
			"content": "Hello!",
			"created_at": "2024-01-01T12:00:00Z",
			"is_read": true,
			"attachments": []
		}
	],
	"received": [
		{
			"id": 2,
			"sender": {
				"id": 2,
				"email": "other@example.com"
			},
			"content": "Hi there!",
			"created_at": "2024-01-01T12:05:00Z",
			"is_read": false,
			"attachments": []
		}
	]
}
```

**Note:** Accessing this endpoint marks all received messages as read.

### DELETE `/messages/delete/{id}/`

Delete a message (sender only).

### GET `/messages/mine/`

Get all messages (sent and received).

### GET `/messages/sent/`

Get all sent messages.

### GET `/messages/received/`

Get all received messages.

### GET `/messages/conversations/`

List all conversations.

**Response (200 OK):**

```json
[
	{
		"id": 1,
		"participants": [
			{ "id": 1, "email": "user1@example.com" },
			{ "id": 2, "email": "user2@example.com" }
		],
		"last_message_content": "See you tomorrow!",
		"last_message_time": "2024-01-01T15:00:00Z",
		"unread_count": 2,
		"updated_at": "2024-01-01T15:00:00Z"
	}
]
```

### GET `/messages/unread/count/`

Get unread message count.

**Response (200 OK):**

```json
{
	"unread_count": 5
}
```

### POST `/messages/read/{id}/`

Mark a specific message as read.

## Permissions

| Endpoint                            | Permission    |
| ----------------------------------- | ------------- |
| `/messages/new`                     | Authenticated |
| `/messages/conversation/{user_id}/` | Authenticated |
| `/messages/delete/{id}/`            | Sender only   |
| `/messages/mine/`                   | Authenticated |
| `/messages/sent/`                   | Authenticated |
| `/messages/received/`               | Authenticated |
| `/messages/conversations/`          | Authenticated |
| `/messages/unread/count/`           | Authenticated |
| `/messages/read/{id}/`              | Receiver only |

## Business Rules

1. **No self-messaging**: Users cannot send messages to themselves
2. **Sender deletion only**: Only senders can delete their messages
3. **Auto-read**: Viewing a conversation marks messages as read
4. **Conversation tracking**: Conversations are automatically created/updated

## Usage Example

```python
from messaging.models import Message, Conversation

# Send a message
message = Message.objects.create(
    sender=user1,
    receiver=user2,
    content='Hello!'
)

# Get or create a conversation
conversation = Conversation.get_or_create_conversation(user1, user2)

# Mark message as read
message.mark_as_read()

# Get unread count
unread = Message.objects.filter(receiver=user1, is_read=False).count()
```

## File Attachments

Messages can include file attachments:

```bash
curl -X POST http://localhost:8000/messages/new \
  -H "Authorization: Bearer <token>" \
  -F "receiver_id=2" \
  -F "content=Please see attached file" \
  -F "attachments=@document.pdf"
```

## Testing

```bash
python manage.py test messaging
```
