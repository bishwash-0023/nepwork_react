# Bids App

The Bids app handles the bidding system for the NepWork platform.

## Overview

This app provides:

- Bid creation on open jobs
- Bid management (update, withdraw)
- Bid acceptance/rejection by job owners
- Automatic rejection of other bids when one is accepted
- File attachments for bids

## Bid Model

### Fields

| Field        | Type          | Description           |
| ------------ | ------------- | --------------------- |
| `id`         | AutoField     | Primary key           |
| `job`        | ForeignKey    | Related job           |
| `user`       | ForeignKey    | Bidder                |
| `amount`     | DecimalField  | Bid amount            |
| `status`     | CharField     | Bid status            |
| `notes`      | TextField     | Bid proposal/notes    |
| `created_at` | DateTimeField | Creation timestamp    |
| `updated_at` | DateTimeField | Last update timestamp |

### Status Options

- `pending`: Awaiting decision
- `accepted`: Bid accepted
- `rejected`: Bid rejected
- `withdrawn`: Bidder withdrew bid

### Related Models

**BidAttachment**

- `bid`: ForeignKey to Bid
- `file`: FileField
- `filename`: CharField
- `uploaded_at`: DateTimeField

## API Endpoints

### POST `/bids/new`

Create a new bid.

**Request:**

```json
{
	"job_id": 1,
	"amount": "150.00",
	"notes": "I can complete this project in 2 weeks"
}
```

**Response (201 Created):**

```json
{
	"id": 1,
	"job": {
		"id": 1,
		"title": "Build a Website"
	},
	"user": {
		"id": 2,
		"email": "bidder@example.com"
	},
	"amount": "150.00",
	"status": "pending",
	"notes": "I can complete this project in 2 weeks",
	"created_at": "2024-01-01T12:00:00Z",
	"updated_at": "2024-01-01T12:00:00Z",
	"attachments": []
}
```

### GET `/bids/list/{job_id}/`

List all bids for a specific job.

**Access:**

- Job owner: Sees all bids
- Other users: See only their own bids
- Admin: Sees all bids

### PUT/PATCH `/bids/update/{id}/`

Update a bid (owner only, pending bids only).

**Request:**

```json
{
	"amount": "175.00",
	"notes": "Updated proposal"
}
```

### DELETE `/bids/delete/{id}/`

Withdraw a bid (owner only).

### GET `/bids/mine/`

Get all bids by the authenticated user.

**Query Parameters:**

- `status`: Filter by status

### GET `/bids/user/{user_id}/`

List bids by a specific user (admin only).

### POST `/bids/accept/{id}/`

Accept a bid (job owner only).

**What happens:**

1. Bid status → `accepted`
2. All other pending bids → `rejected`
3. Job's `hired_to` → bidder
4. Job status → `in_progress`

**Response (200 OK):**

```json
{
	"id": 1,
	"job": {
		"id": 1,
		"title": "Build a Website"
	},
	"user": {
		"id": 2,
		"email": "bidder@example.com"
	},
	"amount": "150.00",
	"status": "accepted",
	"notes": "I can complete this project in 2 weeks",
	"created_at": "2024-01-01T12:00:00Z",
	"updated_at": "2024-01-01T12:30:00Z"
}
```

### POST `/bids/reject/{id}/`

Reject a bid (job owner only).

## Permissions

| Endpoint                | Permission                    |
| ----------------------- | ----------------------------- |
| `/bids/new`             | Authenticated (not job owner) |
| `/bids/list/{job_id}/`  | Authenticated                 |
| `/bids/update/{id}/`    | Bid owner only                |
| `/bids/delete/{id}/`    | Bid owner only                |
| `/bids/mine/`           | Authenticated                 |
| `/bids/user/{user_id}/` | Admin only                    |
| `/bids/accept/{id}/`    | Job owner only                |
| `/bids/reject/{id}/`    | Job owner only                |

## Business Rules

1. **One bid per job**: Users can only place one bid per job
2. **No self-bidding**: Job owners cannot bid on their own jobs
3. **Only open jobs**: Can only bid on jobs with `status='open'`
4. **Pending bids only**: Can only update pending bids
5. **Auto-rejection**: When a bid is accepted, all other pending bids are rejected

## Usage Example

```python
from bids.models import Bid
from jobs.models import Job

job = Job.objects.get(id=1)

# Create a bid
bid = Bid.objects.create(
    job=job,
    user=bidder_user,
    amount=150.00,
    notes='I can do this!'
)

# Accept the bid
bid.accept()
# This will:
# - Set bid.status = 'accepted'
# - Reject all other pending bids
# - Set job.hired_to = bidder_user
# - Set job.status = 'in_progress'

# Reject a bid
other_bid.reject()

# Withdraw a bid
bid.withdraw()
```

## Bid Flow

```
pending → accepted (auto-rejects others, hires user)
        → rejected (by job owner)
        → withdrawn (by bidder)
```

## File Attachments

Bids can include file attachments (portfolios, proposals):

```bash
curl -X POST http://localhost:8000/bids/new \
  -H "Authorization: Bearer <token>" \
  -F "job_id=1" \
  -F "amount=150.00" \
  -F "notes=My proposal" \
  -F "attachments=@portfolio.pdf"
```

## Testing

```bash
python manage.py test bids
```
