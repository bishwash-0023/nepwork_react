# Backend Guide for NepWork

This guide outlines the data models and API endpoints required to support the frontend features of the NepWork freelancing platform. The backend is expected to be built using Django, Djoser, and SimpleJWT.

## Authentication & Users

### Models
**User (Custom User Model)**
- `id`: Integer (PK)
- `email`: EmailField (Unique)
- `password`: String (Hashed)
- `first_name`: String
- `last_name`: String
- `role`: ChoiceField ('client', 'freelancer', 'admin')
- `avatar`: ImageField/URL
- `bio`: TextField
- `location`: String
- `title`: String (e.g., "Senior React Developer")
- `skills`: ManyToManyField (to Skill model) or JSONField
- `hourly_rate`: DecimalField (nullable)
- `onboarding_completed`: Boolean (default=False)
- `date_joined`: DateTime
- `is_active`: Boolean
- `is_staff`: Boolean

### Endpoints
- `POST /auth/users/`: Register new user (Djoser)
- `POST /auth/jwt/create/`: Login (get tokens) (SimpleJWT)
- `POST /auth/jwt/refresh/`: Refresh token (SimpleJWT)
- `GET /api/users/me/`: Get current user profile
- `PATCH /api/users/me/`: Update current user profile (onboarding)
- `GET /api/users/{id}/`: Get public profile of a user

## Jobs

### Models
**Job**
- `id`: Integer (PK)
- `poster`: ForeignKey (User)
- `title`: String
- `description`: TextField
- `category`: ChoiceField ('Development', 'Design', 'Marketing', 'Writing', 'Admin')
- `type`: ChoiceField ('Full-time', 'Part-time', 'Contract', 'Freelance')
- `budget`: DecimalField
- `budget_type`: ChoiceField ('Fixed Price', 'Hourly')
- `requirements`: JSONField or TextField (list of strings)
- `tags`: JSONField (list of strings)
- `status`: ChoiceField ('Open', 'In Progress', 'Completed', 'Closed')
- `created_at`: DateTime (auto_now_add=True)
- `updated_at`: DateTime (auto_now=True)
- `featured`: Boolean (default=False)

### Endpoints
- `GET /api/jobs/`: List jobs with filtering (search, category, type, min_budget, max_budget, posted_after, posted_before)
- `POST /api/jobs/`: Create a new job
- `GET /api/jobs/{id}/`: Get job details
- `PATCH /api/jobs/{id}/`: Update job details
- `DELETE /api/jobs/{id}/`: Delete job
- `GET /api/jobs/my_jobs/`: List jobs posted by current user

## Proposals

### Models
**Proposal**
- `id`: Integer (PK)
- `job`: ForeignKey (Job)
- `freelancer`: ForeignKey (User)
- `cover_letter`: TextField
- `bid_amount`: DecimalField
- `status`: ChoiceField ('Pending', 'Shortlisted', 'Rejected', 'Accepted')
- `created_at`: DateTime (auto_now_add=True)

### Endpoints
- `GET /api/jobs/{id}/proposals/`: List proposals for a specific job (only for job poster)
- `POST /api/jobs/{id}/apply/`: Submit a proposal for a job
- `GET /api/proposals/`: List proposals submitted by current user
- `PATCH /api/proposals/{id}/`: Update proposal status (e.g., accept/reject)

## Messages

### Models
**Conversation**
- `id`: Integer (PK)
- `participants`: ManyToManyField (User)
- `updated_at`: DateTime (auto_now=True)

**Message**
- `id`: Integer (PK)
- `conversation`: ForeignKey (Conversation)
- `sender`: ForeignKey (User)
- `text`: TextField
- `is_read`: Boolean (default=False)
- `created_at`: DateTime (auto_now_add=True)

### Endpoints
- `GET /api/conversations/`: List conversations for current user (include last message and unread count)
- `GET /api/conversations/{id}/messages/`: List messages in a conversation
- `POST /api/conversations/{id}/messages/`: Send a message
- `POST /api/conversations/`: Start a new conversation (with a user ID)

## Payments & Transactions

### Models
**Transaction**
- `id`: Integer (PK)
- `user`: ForeignKey (User)
- `amount`: DecimalField
- `type`: ChoiceField ('credit', 'debit')
- `description`: String
- `status`: ChoiceField ('Pending', 'Completed', 'Failed')
- `created_at`: DateTime (auto_now_add=True)

### Endpoints
- `GET /api/transactions/`: List transaction history for current user
- `GET /api/wallet/balance/`: Get current user balance

## Disputes

### Models
**Dispute**
- `id`: Integer (PK)
- `initiator`: ForeignKey (User)
- `job`: ForeignKey (Job)
- `reason`: TextField
- `status`: ChoiceField ('Open', 'Resolved', 'Closed')
- `created_at`: DateTime (auto_now_add=True)

### Endpoints
- `GET /api/disputes/`: List disputes for current user
- `POST /api/disputes/`: File a new dispute
