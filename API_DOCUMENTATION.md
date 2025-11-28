# NepWork API Documentation

## Base URL

```
http://localhost:8000
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register User

**POST** `/auth/users/`

**Request Body:**

```json
{
	"email": "user@example.com",
	"password": "securepassword123",
	"first_name": "John",
	"last_name": "Doe",
	"role": "freelancer"
}
```

**Response:** `201 Created`

```json
{
	"id": 1,
	"email": "user@example.com",
	"first_name": "John",
	"last_name": "Doe",
	"role": "freelancer"
}
```

---

### Login (Get JWT Tokens)

**POST** `/auth/jwt/create/`

**Request Body:**

```json
{
	"email": "user@example.com",
	"password": "securepassword123"
}
```

**Response:** `200 OK`

```json
{
	"access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
	"refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### Refresh Token

**POST** `/auth/jwt/refresh/`

**Request Body:**

```json
{
	"refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:** `200 OK`

```json
{
	"access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## User Endpoints

### Get Current User Profile

**GET** `/api/users/me/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"id": 1,
	"email": "user@example.com",
	"first_name": "John",
	"last_name": "Doe",
	"full_name": "John Doe",
	"role": "freelancer",
	"avatar": "https://example.com/avatar.jpg",
	"bio": "Full-stack developer with 5 years experience",
	"location": "Kathmandu, Nepal",
	"title": "Senior Full-Stack Developer",
	"skills": ["React", "Django", "PostgreSQL"],
	"hourly_rate": "50.00",
	"onboarding_completed": true,
	"date_joined": "2024-01-15T10:30:00Z",
	"is_active": true
}
```

---

### Update Current User Profile

**PATCH** `/api/users/me/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"bio": "Updated bio",
	"title": "Lead Developer",
	"skills": ["React", "Django", "PostgreSQL", "Docker"],
	"hourly_rate": "60.00",
	"onboarding_completed": true
}
```

**Response:** `200 OK` (Updated user object)

---

### Get Public User Profile

**GET** `/api/users/{id}/`

**Response:** `200 OK`

```json
{
	"id": 2,
	"full_name": "Jane Smith",
	"avatar": "https://example.com/avatar2.jpg",
	"bio": "UI/UX Designer",
	"location": "Pokhara, Nepal",
	"title": "Senior UI/UX Designer",
	"skills": ["Figma", "Adobe XD", "Sketch"],
	"hourly_rate": "45.00",
	"role": "freelancer"
}
```

---

## Job Endpoints

### List Jobs

**GET** `/api/jobs/`

**Query Parameters:**

- `category` - Filter by category (development, design, marketing, writing, admin)
- `type` - Filter by type (full-time, part-time, contract, freelance)
- `status` - Filter by status (open, in_progress, completed, closed)
- `min_budget` - Minimum budget
- `max_budget` - Maximum budget
- `posted_after` - ISO date (e.g., 2024-01-01T00:00:00Z)
- `posted_before` - ISO date
- `search` - Search in title, description, tags
- `ordering` - Order by field (e.g., -created_at, budget)
- `page` - Page number (default: 1)

**Example:** `/api/jobs/?category=development&min_budget=1000&search=react`

**Response:** `200 OK`

```json
{
	"count": 50,
	"next": "http://localhost:8000/api/jobs/?page=2",
	"previous": null,
	"results": [
		{
			"id": 1,
			"poster_name": "John Doe",
			"title": "React Developer Needed",
			"category": "development",
			"type": "freelance",
			"budget": "2500.00",
			"budget_type": "fixed",
			"tags": ["React", "TypeScript", "API"],
			"status": "open",
			"created_at": "2024-01-20T14:30:00Z",
			"featured": false,
			"proposal_count": 5
		}
	]
}
```

---

### Create Job

**POST** `/api/jobs/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"title": "Full-Stack Developer for E-commerce Site",
	"description": "We need an experienced full-stack developer...",
	"category": "development",
	"type": "contract",
	"budget": "5000.00",
	"budget_type": "fixed",
	"requirements": [
		"5+ years experience",
		"React and Node.js expertise",
		"E-commerce experience"
	],
	"tags": ["React", "Node.js", "MongoDB", "E-commerce"]
}
```

**Response:** `201 Created`

---

### Get Job Details

**GET** `/api/jobs/{id}/`

**Response:** `200 OK`

```json
{
	"id": 1,
	"poster": {
		"id": 1,
		"full_name": "John Doe",
		"avatar": "https://example.com/avatar.jpg",
		"bio": "Tech entrepreneur",
		"location": "Kathmandu, Nepal",
		"title": "CEO",
		"skills": [],
		"hourly_rate": null,
		"role": "client"
	},
	"title": "React Developer Needed",
	"description": "Detailed job description...",
	"category": "development",
	"type": "freelance",
	"budget": "2500.00",
	"budget_type": "fixed",
	"requirements": ["3+ years React", "TypeScript"],
	"tags": ["React", "TypeScript", "API"],
	"status": "open",
	"created_at": "2024-01-20T14:30:00Z",
	"updated_at": "2024-01-20T14:30:00Z",
	"featured": false,
	"proposal_count": 5
}
```

---

### Update Job

**PATCH** `/api/jobs/{id}/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"status": "in_progress",
	"budget": "3000.00"
}
```

**Response:** `200 OK` (Updated job object)

---

### Delete Job

**DELETE** `/api/jobs/{id}/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `204 No Content`

---

### Get My Jobs

**GET** `/api/jobs/my_jobs/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK` (List of jobs posted by current user)

---

## Proposal Endpoints

### List My Proposals

**GET** `/api/proposals/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"count": 10,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"freelancer_name": "Jane Smith",
			"freelancer_avatar": "https://example.com/avatar2.jpg",
			"job_title": "React Developer Needed",
			"bid_amount": "2200.00",
			"status": "pending",
			"created_at": "2024-01-21T10:00:00Z"
		}
	]
}
```

---

### Submit Proposal

**POST** `/api/jobs/{job_id}/apply/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"cover_letter": "I am very interested in this position...",
	"bid_amount": "2200.00"
}
```

**Response:** `201 Created`

---

### List Job Proposals (Job Poster Only)

**GET** `/api/jobs/{job_id}/proposals/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK` (List of proposals for the job)

---

### Update Proposal Status

**PATCH** `/api/jobs/{job_id}/proposals/{proposal_id}/update_status/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"status": "accepted"
}
```

**Response:** `200 OK`

---

## Message Endpoints

### List Conversations

**GET** `/api/conversations/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"count": 5,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"participants": [
				{
					"id": 1,
					"full_name": "John Doe",
					"avatar": "https://example.com/avatar.jpg"
				},
				{
					"id": 2,
					"full_name": "Jane Smith",
					"avatar": "https://example.com/avatar2.jpg"
				}
			],
			"last_message": {
				"id": 10,
				"sender_id": 2,
				"sender_name": "Jane Smith",
				"text": "Thanks for the update!",
				"created_at": "2024-01-22T15:30:00Z"
			},
			"unread_count": 2,
			"updated_at": "2024-01-22T15:30:00Z",
			"created_at": "2024-01-20T10:00:00Z"
		}
	]
}
```

---

### Start Conversation

**POST** `/api/conversations/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"participant_id": 2
}
```

**Response:** `201 Created` or `200 OK` (if conversation exists)

---

### List Messages

**GET** `/api/conversations/{conversation_id}/messages/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"count": 20,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"sender": {
				"id": 1,
				"full_name": "John Doe",
				"avatar": "https://example.com/avatar.jpg"
			},
			"text": "Hello, I'm interested in your proposal",
			"is_read": true,
			"created_at": "2024-01-20T10:30:00Z"
		}
	]
}
```

---

### Send Message

**POST** `/api/conversations/{conversation_id}/messages/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"text": "Thanks for reaching out!"
}
```

**Response:** `201 Created`

---

### Mark Message as Read

**PATCH** `/api/conversations/{conversation_id}/messages/{message_id}/mark_read/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

## Payment Endpoints

### List Transactions

**GET** `/api/transactions/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"count": 15,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"user_name": "John Doe",
			"amount": "2500.00",
			"type": "credit",
			"description": "Payment for React Developer job",
			"status": "completed",
			"created_at": "2024-01-22T10:00:00Z"
		}
	]
}
```

---

### Get Wallet Balance

**GET** `/api/wallet/balance/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"balance": "5000.00",
	"updated_at": "2024-01-22T10:00:00Z"
}
```

---

## Dispute Endpoints

### List Disputes

**GET** `/api/disputes/`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

```json
{
	"count": 2,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"initiator": {
				"id": 1,
				"full_name": "John Doe"
			},
			"job": {
				"id": 5,
				"title": "Website Development"
			},
			"reason": "Work not completed as agreed",
			"status": "open",
			"created_at": "2024-01-22T14:00:00Z",
			"resolved_at": null
		}
	]
}
```

---

### File Dispute

**POST** `/api/disputes/`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**

```json
{
	"job_id": 5,
	"reason": "The freelancer did not deliver the work as promised"
}
```

**Response:** `201 Created`

---

## Error Responses

### 400 Bad Request

```json
{
	"field_name": ["Error message"]
}
```

### 401 Unauthorized

```json
{
	"detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden

```json
{
	"detail": "You do not have permission to perform this action."
}
```

### 404 Not Found

```json
{
	"detail": "Not found."
}
```

### 500 Internal Server Error

```json
{
	"detail": "Internal server error."
}
```

---

## Rate Limiting

Currently, there are no rate limits in development. For production, implement rate limiting using Django REST Framework throttling.

## Pagination

All list endpoints support pagination with the following query parameters:

- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 20, max: 100)

## Filtering & Search

Many endpoints support filtering and search:

- Use query parameters for exact matches
- Use `search` parameter for full-text search
- Use `ordering` parameter to sort results (prefix with `-` for descending)

Example: `/api/jobs/?category=development&ordering=-created_at&search=react`
