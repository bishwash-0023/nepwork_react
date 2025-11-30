# Jobs App

The Jobs app handles job listings and management for the NepWork platform.

## Overview

This app provides:

- Job creation, listing, updating, and deletion
- Job status management (open, in_progress, closed)
- Image and file attachments for jobs
- Job owner and hired user tracking

## Job Model

### Fields

| Field         | Type          | Description                          |
| ------------- | ------------- | ------------------------------------ |
| `id`          | AutoField     | Primary key                          |
| `title`       | CharField     | Job title                            |
| `description` | TextField     | Detailed job description             |
| `status`      | CharField     | Job status (open/in_progress/closed) |
| `created_by`  | ForeignKey    | User who created the job             |
| `hired_to`    | ForeignKey    | User hired for the job (optional)    |
| `created_at`  | DateTimeField | Creation timestamp                   |
| `updated_at`  | DateTimeField | Last update timestamp                |

### Related Models

**JobImage**

- `job`: ForeignKey to Job
- `image`: ImageField
- `uploaded_at`: DateTimeField

**JobFile**

- `job`: ForeignKey to Job
- `file`: FileField
- `filename`: CharField
- `uploaded_at`: DateTimeField

## API Endpoints

### POST `/jobs/new`

Create a new job.

**Headers:**

```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request:**

```json
{
	"title": "Build a Website",
	"description": "Need a responsive website built with React"
}
```

**Response (201 Created):**

```json
{
	"id": 1,
	"title": "Build a Website",
	"description": "Need a responsive website built with React",
	"status": "open",
	"created_at": "2024-01-01T12:00:00Z",
	"updated_at": "2024-01-01T12:00:00Z",
	"created_by": {
		"id": 1,
		"email": "user@example.com"
	},
	"hired_to": null,
	"images": [],
	"files": []
}
```

### GET `/jobs/list`

List all jobs with filtering and search.

**Query Parameters:**

- `status`: Filter by status (open/in_progress/closed)
- `created_by`: Filter by creator ID
- `search`: Search in title and description
- `ordering`: Order by field (created_at, updated_at, title)
- `page`: Page number

**Response (200 OK):**

```json
{
	"count": 10,
	"next": "http://localhost:8000/jobs/list?page=2",
	"previous": null,
	"results": [
		{
			"id": 1,
			"title": "Build a Website",
			"description": "Need a responsive website...",
			"status": "open",
			"created_at": "2024-01-01T12:00:00Z",
			"updated_at": "2024-01-01T12:00:00Z",
			"created_by": {
				"id": 1,
				"email": "user@example.com"
			},
			"hired_to": null
		}
	]
}
```

### GET `/jobs/detail/{id}/`

Get detailed information about a specific job.

### PUT/PATCH `/jobs/update/{id}/`

Update a job (owner only).

**Request:**

```json
{
	"title": "Updated Title",
	"status": "in_progress",
	"hired_to_id": 2
}
```

### DELETE `/jobs/delete/{id}/`

Delete a job (owner only).

### GET `/jobs/mine/`

List jobs created by the authenticated user.

### GET `/jobs/hired/`

List jobs where the authenticated user is hired.

## Job Status Flow

```
open → in_progress → closed
```

- **open**: Job is available for bidding
- **in_progress**: Someone has been hired
- **closed**: Job is completed

## Permissions

| Endpoint             | Permission    |
| -------------------- | ------------- |
| `/jobs/new`          | Authenticated |
| `/jobs/list`         | Anyone        |
| `/jobs/detail/{id}/` | Anyone        |
| `/jobs/update/{id}/` | Owner only    |
| `/jobs/delete/{id}/` | Owner only    |
| `/jobs/mine/`        | Authenticated |
| `/jobs/hired/`       | Authenticated |

## Usage Example

```python
from jobs.models import Job, JobImage

# Create a job
job = Job.objects.create(
    title='Web Development Project',
    description='Need a full-stack developer',
    created_by=user
)

# Add an image
JobImage.objects.create(
    job=job,
    image='path/to/image.jpg'
)

# Hire a user (also rejects other bids)
job.hire_user(other_user)
```

## Filtering Examples

```bash
# Get open jobs
GET /jobs/list?status=open

# Search for jobs
GET /jobs/list?search=website

# Get jobs by creator
GET /jobs/list?created_by=1

# Order by newest
GET /jobs/list?ordering=-created_at
```

## File Upload

Jobs support multiple image and file uploads:

```bash
curl -X POST http://localhost:8000/jobs/new \
  -H "Authorization: Bearer <token>" \
  -F "title=My Job" \
  -F "description=Job description" \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "files=@document.pdf"
```

## Testing

```bash
python manage.py test jobs
```
