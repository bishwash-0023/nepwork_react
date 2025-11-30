# NepWork API Documentation# NepWork API Documentation

## Updated for New Backend Structure## Base URL

## Base URL```

http://localhost:8000

````

http://localhost:8000

```## Authentication



## AuthenticationAll authenticated endpoints require a JWT token in the Authorization header:



All authenticated endpoints require a JWT token in the Authorization header:```

Authorization: Bearer <access_token>

````

Authorization: Bearer <access_token>

````---



---## Authentication Endpoints



## Authentication Endpoints### Register User



### Register User**POST** `/auth/users/`



**POST** `/auth/signup/`**Request Body:**



**Request Body:**```json

{

```json	"email": "user@example.com",

{	"password": "securepassword123",

	"email": "user@example.com",	"first_name": "John",

	"password": "SecurePass123!",	"last_name": "Doe",

	"password_confirm": "SecurePass123!",	"role": "freelancer"

	"full_name": "John Doe",}

	"phone_number": "+1234567890",```

	"address": "123 Main St"

}**Response:** `201 Created`

````

```````json

**Response:** `201 Created`{

	"id": 1,

```json	"email": "user@example.com",

{	"first_name": "John",

	"id": 1,	"last_name": "Doe",

	"email": "user@example.com",	"role": "freelancer"

	"full_name": "John Doe",}

	"phone_number": "+1234567890",```

	"address": "123 Main St",

	"profile_image": null---

}

```### Login (Get JWT Tokens)



---**POST** `/auth/jwt/create/`



### Login (Get JWT Tokens)**Request Body:**



**POST** `/auth/login/````json

{

**Request Body:**	"email": "user@example.com",

	"password": "securepassword123"

```json}

{```

	"email": "user@example.com",

	"password": "SecurePass123!"**Response:** `200 OK`

}

``````json

{

**Response:** `200 OK`	"access": "eyJ0eXAiOiJKV1QiLCJhbGc...",

	"refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."

```json}

{```

	"tokens": {

		"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",---

		"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

	},### Refresh Token

	"user": {

		"id": 1,**POST** `/auth/jwt/refresh/`

		"email": "user@example.com",

		"full_name": "John Doe",**Request Body:**

		"phone_number": "+1234567890",

		"address": "123 Main St",```json

		"profile_image": null{

	}	"refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."

}}

```````

---**Response:** `200 OK`

### Refresh Token```json

{

**POST** `/auth/jwt/refresh/` "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."

}

**Request Body:**```

````json---

{

	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."## User Endpoints

}

```### Get Current User Profile



**Response:** `200 OK`**GET** `/api/users/me/`



```json**Headers:** `Authorization: Bearer <token>`

{

	"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",**Response:** `200 OK`

	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

}```json

```{

	"id": 1,

---	"email": "user@example.com",

	"first_name": "John",

### Verify Token	"last_name": "Doe",

	"full_name": "John Doe",

**POST** `/auth/jwt/verify/`	"role": "freelancer",

	"avatar": "https://example.com/avatar.jpg",

**Request Body:**	"bio": "Full-stack developer with 5 years experience",

	"location": "Kathmandu, Nepal",

```json	"title": "Senior Full-Stack Developer",

{	"skills": ["React", "Django", "PostgreSQL"],

	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."	"hourly_rate": "50.00",

}	"onboarding_completed": true,

```	"date_joined": "2024-01-15T10:30:00Z",

	"is_active": true

---}

````

## User Endpoints

---

### Get Current User Profile

### Update Current User Profile

**GET** `/auth/users/me/`

**PATCH** `/api/users/me/`

🔒 **Requires Authentication**

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

**Request Body:**

````json

{```json

	"id": 1,{

	"email": "user@example.com",	"bio": "Updated bio",

	"full_name": "John Doe",	"title": "Lead Developer",

	"phone_number": "+1234567890",	"skills": ["React", "Django", "PostgreSQL", "Docker"],

	"address": "123 Main St",	"hourly_rate": "60.00",

	"profile_image": null,	"onboarding_completed": true

	"is_staff": false,}

	"is_admin": false,```

	"date_joined": "2024-01-01T12:00:00Z"

}**Response:** `200 OK` (Updated user object)

````

---

---

### Get Public User Profile

### Update Current User Profile

**GET** `/api/users/{id}/`

**PUT/PATCH** `/auth/users/me/`

**Response:** `200 OK`

🔒 **Requires Authentication**

````json

**Request Body:**{

	"id": 2,

```json	"full_name": "Jane Smith",

{	"avatar": "https://example.com/avatar2.jpg",

	"full_name": "John Doe Updated",	"bio": "UI/UX Designer",

	"phone_number": "+1987654321"	"location": "Pokhara, Nepal",

}	"title": "Senior UI/UX Designer",

```	"skills": ["Figma", "Adobe XD", "Sketch"],

	"hourly_rate": "45.00",

---	"role": "freelancer"

}

### Get Public User Profile```



**GET** `/auth/users/{id}/public/`---



**Response:** `200 OK`## Job Endpoints



```json### List Jobs

{

	"id": 1,**GET** `/api/jobs/`

	"full_name": "John Doe",

	"address": "123 Main St",**Query Parameters:**

	"profile_image": null

}- `category` - Filter by category (development, design, marketing, writing, admin)

```- `type` - Filter by type (full-time, part-time, contract, freelance)

- `status` - Filter by status (open, in_progress, completed, closed)

---- `min_budget` - Minimum budget

- `max_budget` - Maximum budget

## Job Endpoints- `posted_after` - ISO date (e.g., 2024-01-01T00:00:00Z)

- `posted_before` - ISO date

### Create Job- `search` - Search in title, description, tags

- `ordering` - Order by field (e.g., -created_at, budget)

**POST** `/jobs/new`- `page` - Page number (default: 1)



🔒 **Requires Authentication****Example:** `/api/jobs/?category=development&min_budget=1000&search=react`



**Content-Type:** `multipart/form-data`**Response:** `200 OK`



**Request Body:**```json

{

```json	"count": 50,

{	"next": "http://localhost:8000/api/jobs/?page=2",

	"title": "Build a Website",	"previous": null,

	"description": "Need a responsive website built with React"	"results": [

}		{

```			"id": 1,

			"poster_name": "John Doe",

**Response:** `201 Created`			"title": "React Developer Needed",

			"category": "development",

```json			"type": "freelance",

{			"budget": "2500.00",

	"id": 1,			"budget_type": "fixed",

	"title": "Build a Website",			"tags": ["React", "TypeScript", "API"],

	"description": "Need a responsive website built with React",			"status": "open",

	"status": "open",			"created_at": "2024-01-20T14:30:00Z",

	"created_at": "2024-01-01T12:00:00Z",			"featured": false,

	"updated_at": "2024-01-01T12:00:00Z",			"proposal_count": 5

	"created_by": {		}

		"id": 1,	]

		"email": "user@example.com"}

	},```

	"hired_to": null,

	"images": [],---

	"files": []

}### Create Job

````

**POST** `/api/jobs/`

---

**Headers:** `Authorization: Bearer <token>`

### List Jobs

**Request Body:**

**GET** `/jobs/list`

````json

**Query Parameters:**{

	"title": "Full-Stack Developer for E-commerce Site",

| Parameter    | Type   | Description                            |	"description": "We need an experienced full-stack developer...",

| ------------ | ------ | -------------------------------------- |	"category": "development",

| `status`     | string | Filter by status (open/in_progress/closed) |	"type": "contract",

| `created_by` | int    | Filter by creator ID                   |	"budget": "5000.00",

| `search`     | string | Search in title and description        |	"budget_type": "fixed",

| `ordering`   | string | Order by field (created_at, updated_at, title) |	"requirements": [

| `page`       | int    | Page number                            |		"5+ years experience",

		"React and Node.js expertise",

**Response:** `200 OK`		"E-commerce experience"

	],

```json	"tags": ["React", "Node.js", "MongoDB", "E-commerce"]

{}

	"count": 10,```

	"next": "http://localhost:8000/jobs/list?page=2",

	"previous": null,**Response:** `201 Created`

	"results": [

		{---

			"id": 1,

			"title": "Build a Website",### Get Job Details

			"description": "Need a responsive website...",

			"status": "open",**GET** `/api/jobs/{id}/`

			"created_at": "2024-01-01T12:00:00Z",

			"updated_at": "2024-01-01T12:00:00Z",**Response:** `200 OK`

			"created_by": {

				"id": 1,```json

				"email": "user@example.com"{

			},	"id": 1,

			"hired_to": null	"poster": {

		}		"id": 1,

	]		"full_name": "John Doe",

}		"avatar": "https://example.com/avatar.jpg",

```		"bio": "Tech entrepreneur",

		"location": "Kathmandu, Nepal",

---		"title": "CEO",

		"skills": [],

### Get Job Details		"hourly_rate": null,

		"role": "client"

**GET** `/jobs/detail/{id}/`	},

	"title": "React Developer Needed",

---	"description": "Detailed job description...",

	"category": "development",

### Update Job	"type": "freelance",

	"budget": "2500.00",

**PUT/PATCH** `/jobs/update/{id}/`	"budget_type": "fixed",

	"requirements": ["3+ years React", "TypeScript"],

🔒 **Requires Authentication (Owner only)**	"tags": ["React", "TypeScript", "API"],

	"status": "open",

**Request Body:**	"created_at": "2024-01-20T14:30:00Z",

	"updated_at": "2024-01-20T14:30:00Z",

```json	"featured": false,

{	"proposal_count": 5

	"title": "Updated Title",}

	"status": "in_progress",```

	"hired_to_id": 2

}---

````

### Update Job

---

**PATCH** `/api/jobs/{id}/`

### Delete Job

**Headers:** `Authorization: Bearer <token>`

**DELETE** `/jobs/delete/{id}/`

**Request Body:**

🔒 **Requires Authentication (Owner only)**

`````json

---{

	"status": "in_progress",

### Get My Jobs	"budget": "3000.00"

}

**GET** `/jobs/mine/````



🔒 **Requires Authentication****Response:** `200 OK` (Updated job object)



------



### Get Jobs Where I'm Hired### Delete Job



**GET** `/jobs/hired/`**DELETE** `/api/jobs/{id}/`



🔒 **Requires Authentication****Headers:** `Authorization: Bearer <token>`



---**Response:** `204 No Content`



## Bid Endpoints---



### Create Bid### Get My Jobs



**POST** `/bids/new`**GET** `/api/jobs/my_jobs/`



🔒 **Requires Authentication (Not job owner)****Headers:** `Authorization: Bearer <token>`



**Request Body:****Response:** `200 OK` (List of jobs posted by current user)



```json---

{

	"job_id": 1,## Proposal Endpoints

	"amount": "150.00",

	"notes": "I can complete this project in 2 weeks"### List My Proposals

}

```**GET** `/api/proposals/`



**Response:** `201 Created`**Headers:** `Authorization: Bearer <token>`



```json**Response:** `200 OK`

{

	"id": 1,```json

	"job": {{

		"id": 1,	"count": 10,

		"title": "Build a Website"	"next": null,

	},	"previous": null,

	"user": {	"results": [

		"id": 2,		{

		"email": "bidder@example.com"			"id": 1,

	},			"freelancer_name": "Jane Smith",

	"amount": "150.00",			"freelancer_avatar": "https://example.com/avatar2.jpg",

	"status": "pending",			"job_title": "React Developer Needed",

	"notes": "I can complete this project in 2 weeks",			"bid_amount": "2200.00",

	"created_at": "2024-01-01T12:00:00Z",			"status": "pending",

	"updated_at": "2024-01-01T12:00:00Z",			"created_at": "2024-01-21T10:00:00Z"

	"attachments": []		}

}	]

```}

`````

---

---

### List Bids for Job

### Submit Proposal

**GET** `/bids/list/{job_id}/`

**POST** `/api/jobs/{job_id}/apply/`

🔒 **Requires Authentication**

**Headers:** `Authorization: Bearer <token>`

---

**Request Body:**

### Update Bid

````json

**PUT/PATCH** `/bids/update/{id}/`{

	"cover_letter": "I am very interested in this position...",

🔒 **Requires Authentication (Bid owner only, pending bids only)**	"bid_amount": "2200.00"

}

**Request Body:**```



```json**Response:** `201 Created`

{

	"amount": "175.00",---

	"notes": "Updated proposal"

}### List Job Proposals (Job Poster Only)

````

**GET** `/api/jobs/{job_id}/proposals/`

---

**Headers:** `Authorization: Bearer <token>`

### Withdraw Bid

**Response:** `200 OK` (List of proposals for the job)

**DELETE** `/bids/delete/{id}/`

---

🔒 **Requires Authentication (Bid owner only)**

### Update Proposal Status

---

**PATCH** `/api/jobs/{job_id}/proposals/{proposal_id}/update_status/`

### Get My Bids

**Headers:** `Authorization: Bearer <token>`

**GET** `/bids/mine/`

**Request Body:**

🔒 **Requires Authentication**

`````json

**Query Parameters:**{

	"status": "accepted"

| Parameter | Type   | Description       |}

| --------- | ------ | ----------------- |```

| `status`  | string | Filter by status  |

**Response:** `200 OK`

---

---

### Accept Bid

## Message Endpoints

**POST** `/bids/accept/{id}/`

### List Conversations

🔒 **Requires Authentication (Job owner only)**

**GET** `/api/conversations/`

**Effects:**

**Headers:** `Authorization: Bearer <token>`

1. Bid status → `accepted`

2. All other pending bids → `rejected`**Response:** `200 OK`

3. Job's `hired_to` → bidder

4. Job status → `in_progress````json

{

---	"count": 5,

	"next": null,

### Reject Bid	"previous": null,

	"results": [

**POST** `/bids/reject/{id}/`		{

			"id": 1,

🔒 **Requires Authentication (Job owner only)**			"participants": [

				{

---					"id": 1,

					"full_name": "John Doe",

## Message Endpoints					"avatar": "https://example.com/avatar.jpg"

				},

### Send Message				{

					"id": 2,

**POST** `/messages/new`					"full_name": "Jane Smith",

					"avatar": "https://example.com/avatar2.jpg"

🔒 **Requires Authentication**				}

			],

**Request Body:**			"last_message": {

				"id": 10,

```json				"sender_id": 2,

{				"sender_name": "Jane Smith",

	"receiver_id": 2,				"text": "Thanks for the update!",

	"content": "Hello! I'm interested in your project."				"created_at": "2024-01-22T15:30:00Z"

}			},

```			"unread_count": 2,

			"updated_at": "2024-01-22T15:30:00Z",

**Response:** `201 Created`			"created_at": "2024-01-20T10:00:00Z"

		}

```json	]

{}

	"id": 1,```

	"sender": {

		"id": 1,---

		"email": "sender@example.com"

	},### Start Conversation

	"receiver": {

		"id": 2,**POST** `/api/conversations/`

		"email": "receiver@example.com"

	},**Headers:** `Authorization: Bearer <token>`

	"content": "Hello! I'm interested in your project.",

	"created_at": "2024-01-01T12:00:00Z",**Request Body:**

	"is_read": false,

	"attachments": []```json

}{

```	"participant_id": 2

}

---```



### Get Conversation with User**Response:** `201 Created` or `200 OK` (if conversation exists)



**GET** `/messages/conversation/{user_id}/`---



🔒 **Requires Authentication**### List Messages



**Note:** Accessing this endpoint marks all received messages as read.**GET** `/api/conversations/{conversation_id}/messages/`



**Response:** `200 OK`**Headers:** `Authorization: Bearer <token>`



```json**Response:** `200 OK`

{

	"sent": [```json

		{{

			"id": 1,	"count": 20,

			"receiver": {	"next": null,

				"id": 2,	"previous": null,

				"email": "other@example.com"	"results": [

			},		{

			"content": "Hello!",			"id": 1,

			"created_at": "2024-01-01T12:00:00Z",			"sender": {

			"is_read": true,				"id": 1,

			"attachments": []				"full_name": "John Doe",

		}				"avatar": "https://example.com/avatar.jpg"

	],			},

	"received": [			"text": "Hello, I'm interested in your proposal",

		{			"is_read": true,

			"id": 2,			"created_at": "2024-01-20T10:30:00Z"

			"sender": {		}

				"id": 2,	]

				"email": "other@example.com"}

			},```

			"content": "Hi there!",

			"created_at": "2024-01-01T12:05:00Z",---

			"is_read": false,

			"attachments": []### Send Message

		}

	]**POST** `/api/conversations/{conversation_id}/messages/`

}

```**Headers:** `Authorization: Bearer <token>`



---**Request Body:**



### Delete Message```json

{

**DELETE** `/messages/delete/{id}/`	"text": "Thanks for reaching out!"

}

🔒 **Requires Authentication (Sender only)**```



---**Response:** `201 Created`



### Get All My Messages---



**GET** `/messages/mine/`### Mark Message as Read



🔒 **Requires Authentication****PATCH** `/api/conversations/{conversation_id}/messages/{message_id}/mark_read/`



---**Headers:** `Authorization: Bearer <token>`



### Get Sent Messages**Response:** `200 OK`



**GET** `/messages/sent/`---



🔒 **Requires Authentication**## Payment Endpoints



---### List Transactions



### Get Received Messages**GET** `/api/transactions/`



**GET** `/messages/received/`**Headers:** `Authorization: Bearer <token>`



🔒 **Requires Authentication****Response:** `200 OK`



---```json

{

### List Conversations	"count": 15,

	"next": null,

**GET** `/messages/conversations/`	"previous": null,

	"results": [

🔒 **Requires Authentication**		{

			"id": 1,

**Response:** `200 OK`			"user_name": "John Doe",

			"amount": "2500.00",

```json			"type": "credit",

[			"description": "Payment for React Developer job",

	{			"status": "completed",

		"id": 1,			"created_at": "2024-01-22T10:00:00Z"

		"participants": [		}

			{ "id": 1, "email": "user1@example.com" },	]

			{ "id": 2, "email": "user2@example.com" }}

		],```

		"last_message_content": "See you tomorrow!",

		"last_message_time": "2024-01-01T15:00:00Z",---

		"unread_count": 2,

		"updated_at": "2024-01-01T15:00:00Z"### Get Wallet Balance

	}

]**GET** `/api/wallet/balance/`

`````

**Headers:** `Authorization: Bearer <token>`

---

**Response:** `200 OK`

### Get Unread Count

`````json

**GET** `/messages/unread/count/`{

	"balance": "5000.00",

🔒 **Requires Authentication**	"updated_at": "2024-01-22T10:00:00Z"

}

**Response:** `200 OK````



```json---

{

	"unread_count": 5## Dispute Endpoints

}

```### List Disputes



---**GET** `/api/disputes/`



### Mark Message as Read**Headers:** `Authorization: Bearer <token>`



**POST** `/messages/read/{id}/`**Response:** `200 OK`



🔒 **Requires Authentication (Receiver only)**```json

{

---	"count": 2,

	"next": null,

## Comment Endpoints	"previous": null,

	"results": [

### Create Comment		{

			"id": 1,

**POST** `/comments/new`			"initiator": {

				"id": 1,

🔒 **Requires Authentication**				"full_name": "John Doe"

			},

**Request Body:**			"job": {

				"id": 5,

```json				"title": "Website Development"

{			},

	"job_id": 1,			"reason": "Work not completed as agreed",

	"content": "This looks like an interesting project!"			"status": "open",

}			"created_at": "2024-01-22T14:00:00Z",

```			"resolved_at": null

		}

**Response:** `201 Created`	]

}

```json```

{

	"id": 1,---

	"job": {

		"id": 1,### File Dispute

		"title": "Build a Website"

	},**POST** `/api/disputes/`

	"user": {

		"id": 2,**Headers:** `Authorization: Bearer <token>`

		"email": "commenter@example.com"

	},**Request Body:**

	"content": "This looks like an interesting project!",

	"created_at": "2024-01-01T12:00:00Z"```json

}{

```	"job_id": 5,

	"reason": "The freelancer did not deliver the work as promised"

---}

`````

### List Comments for Job

**Response:** `201 Created`

**GET** `/comments/list/{job_id}/`

---

---

## Error Responses

### Update Comment

### 400 Bad Request

**PUT/PATCH** `/comments/update/{id}/`

```json

🔒 **Requires Authentication (Owner only)**{

	"field_name": ["Error message"]

**Request Body:**}

```

````json

{### 401 Unauthorized

	"content": "Updated comment content"

}```json

```{

	"detail": "Authentication credentials were not provided."

---}

````

### Delete Comment

### 403 Forbidden

**DELETE** `/comments/delete/{id}/`

```json

🔒 **Requires Authentication (Owner or Admin)**{

	"detail": "You do not have permission to perform this action."

---}

```

### Get My Comments

### 404 Not Found

**GET** `/comments/mine/`

```json

🔒 **Requires Authentication**{

	"detail": "Not found."

---}

```

## Permissions Summary

### 500 Internal Server Error

### Authentication Endpoints

````json

| Endpoint            | Permission |{

| ------------------- | ---------- |	"detail": "Internal server error."

| `/auth/signup/`     | Anyone     |}

| `/auth/login/`      | Anyone     |```

| `/auth/jwt/refresh/`| Anyone     |

| `/auth/jwt/verify/` | Anyone     |---

| `/auth/users/me/`   | Authenticated |

| `/auth/users/{id}/public/` | Anyone |## Rate Limiting

| `/auth/users/`      | Admin only |

Currently, there are no rate limits in development. For production, implement rate limiting using Django REST Framework throttling.

### Job Endpoints

## Pagination

| Endpoint             | Permission    |

| -------------------- | ------------- |All list endpoints support pagination with the following query parameters:

| `/jobs/new`          | Authenticated |

| `/jobs/list`         | Anyone        |- `page` - Page number (default: 1)

| `/jobs/detail/{id}/` | Anyone        |- `page_size` - Items per page (default: 20, max: 100)

| `/jobs/update/{id}/` | Owner only    |

| `/jobs/delete/{id}/` | Owner only    |## Filtering & Search

| `/jobs/mine/`        | Authenticated |

| `/jobs/hired/`       | Authenticated |Many endpoints support filtering and search:



### Bid Endpoints- Use query parameters for exact matches

- Use `search` parameter for full-text search

| Endpoint               | Permission                    |- Use `ordering` parameter to sort results (prefix with `-` for descending)

| ---------------------- | ----------------------------- |

| `/bids/new`            | Authenticated (not job owner) |Example: `/api/jobs/?category=development&ordering=-created_at&search=react`

| `/bids/list/{job_id}/` | Authenticated                 |
| `/bids/update/{id}/`   | Bid owner only                |
| `/bids/delete/{id}/`   | Bid owner only                |
| `/bids/mine/`          | Authenticated                 |
| `/bids/user/{user_id}/`| Admin only                    |
| `/bids/accept/{id}/`   | Job owner only                |
| `/bids/reject/{id}/`   | Job owner only                |

### Message Endpoints

| Endpoint                        | Permission    |
| ------------------------------- | ------------- |
| `/messages/new`                 | Authenticated |
| `/messages/conversation/{user_id}/` | Authenticated |
| `/messages/delete/{id}/`        | Sender only   |
| `/messages/mine/`               | Authenticated |
| `/messages/sent/`               | Authenticated |
| `/messages/received/`           | Authenticated |
| `/messages/conversations/`      | Authenticated |
| `/messages/unread/count/`       | Authenticated |
| `/messages/read/{id}/`          | Receiver only |

### Comment Endpoints

| Endpoint                  | Permission       |
| ------------------------- | ---------------- |
| `/comments/new`           | Authenticated    |
| `/comments/list/{job_id}/`| Anyone           |
| `/comments/update/{id}/`  | Owner only       |
| `/comments/delete/{id}/`  | Owner or Admin   |
| `/comments/mine/`         | Authenticated    |
| `/comments/job/{job_id}/` | Anyone           |
| `/comments/user/{user_id}/` | Admin/Staff only |

---

## Status Values

### Job Status

- `open` - Job is available for bidding
- `in_progress` - Someone has been hired
- `closed` - Job is completed

### Bid Status

- `pending` - Awaiting decision
- `accepted` - Bid accepted
- `rejected` - Bid rejected
- `withdrawn` - Bidder withdrew bid

---

## User Roles

1. **Admin** (`is_admin=True`): Top level user with all permissions
2. **Staff/Employer** (`is_staff=True`): Mid level user who can manage issues and progress
3. **Regular User**: Default user who can create jobs and place bids
````
