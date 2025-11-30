# Comments App

The Comments app handles comments on jobs for the NepWork platform.

## Overview

This app provides:

- Comment creation on jobs
- Edit and delete functionality with proper permissions
- User's own comments retrieval
- Admin view of user comments

## Comment Model

### Fields

| Field        | Type          | Description           |
| ------------ | ------------- | --------------------- |
| `id`         | AutoField     | Primary key           |
| `job`        | ForeignKey    | Related job           |
| `user`       | ForeignKey    | Comment author        |
| `content`    | TextField     | Comment content       |
| `created_at` | DateTimeField | Creation timestamp    |
| `updated_at` | DateTimeField | Last update timestamp |

## API Endpoints

### POST `/comments/new`

Create a new comment.

**Request:**

```json
{
	"job_id": 1,
	"content": "This looks like an interesting project!"
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
		"email": "commenter@example.com"
	},
	"content": "This looks like an interesting project!",
	"created_at": "2024-01-01T12:00:00Z"
}
```

### GET `/comments/list/{job_id}/`

List all comments for a specific job.

**Response (200 OK):**

```json
[
	{
		"id": 1,
		"job": {
			"id": 1,
			"title": "Build a Website"
		},
		"user": {
			"id": 2,
			"email": "commenter@example.com"
		},
		"content": "This looks like an interesting project!",
		"created_at": "2024-01-01T12:00:00Z"
	}
]
```

### PUT/PATCH `/comments/update/{id}/`

Update a comment (owner only).

**Request:**

```json
{
	"content": "Updated comment content"
}
```

### DELETE `/comments/delete/{id}/`

Delete a comment (owner or admin only).

### GET `/comments/mine/`

Get all comments by the authenticated user.

**Response (200 OK):**

```json
[
	{
		"id": 1,
		"job": {
			"id": 1,
			"title": "Build a Website"
		},
		"content": "This looks like an interesting project!",
		"created_at": "2024-01-01T12:00:00Z"
	}
]
```

### GET `/comments/job/{job_id}/`

Alternative endpoint to list comments for a job.

### GET `/comments/user/{user_id}/`

List comments by a specific user (admin/staff only).

## Permissions

| Endpoint                    | Permission       |
| --------------------------- | ---------------- |
| `/comments/new`             | Authenticated    |
| `/comments/list/{job_id}/`  | Anyone           |
| `/comments/update/{id}/`    | Owner only       |
| `/comments/delete/{id}/`    | Owner or Admin   |
| `/comments/mine/`           | Authenticated    |
| `/comments/job/{job_id}/`   | Anyone           |
| `/comments/user/{user_id}/` | Admin/Staff only |

## Usage Example

```python
from comments.models import Comment
from jobs.models import Job

job = Job.objects.get(id=1)

# Create a comment
comment = Comment.objects.create(
    job=job,
    user=current_user,
    content='Great project! I would love to work on this.'
)

# Get all comments for a job
job_comments = Comment.objects.filter(job=job)

# Get user's comments
my_comments = Comment.objects.filter(user=current_user)
```

## Testing

```bash
python manage.py test comments
```

## Notes

- Only the comment owner can edit their comment
- Only the comment owner or an admin can delete a comment
- Comments are ordered by creation date (newest first)
