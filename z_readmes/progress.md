# Accounts App

The Accounts app handles user management and authentication for the NepWork platform.

## Overview

This app provides:

- Custom User model with email-based authentication
- JWT-based authentication (login, signup, token refresh)
- User profile management
- Role-based permissions (Admin, Staff, Regular User)

## User Model

### Fields

| Field           | Type          | Description                           |
| --------------- | ------------- | ------------------------------------- |
| `id`            | AutoField     | Primary key                           |
| `email`         | EmailField    | Unique email address (used for login) |
| `password`      | CharField     | Hashed password                       |
| `full_name`     | CharField     | User's full name (optional)           |
| `phone_number`  | CharField     | Phone number (optional)               |
| `address`       | TextField     | Address (optional)                    |
| `profile_image` | ImageField    | Profile picture (optional)            |
| `is_active`     | BooleanField  | Account active status                 |
| `is_staff`      | BooleanField  | Staff/Employer status                 |
| `is_admin`      | BooleanField  | Admin status                          |
| `date_joined`   | DateTimeField | Registration timestamp                |

### User Roles

1. **Admin** (`is_admin=True`): Top level user with all permissions
2. **Staff/Employer** (`is_staff=True`): Mid level user who can manage issues and progress
3. **Regular User**: Default user who can create jobs and place bids

## API Endpoints

### POST `/auth/signup/`

Register a new user.

**Request:**

```json
{
	"email": "user@example.com",
	"password": "SecurePass123!",
	"password_confirm": "SecurePass123!",
	"full_name": "John Doe",
	"phone_number": "+1234567890",
	"address": "123 Main St"
}
```

**Response (201 Created):**

```json
{
	"id": 1,
	"email": "user@example.com",
	"full_name": "John Doe",
	"phone_number": "+1234567890",
	"address": "123 Main St",
	"profile_image": null
}
```

### POST `/auth/login/`

Authenticate and receive JWT tokens.

**Request:**

```json
{
	"email": "user@example.com",
	"password": "SecurePass123!"
}
```

**Response (200 OK):**

```json
{
	"tokens": {
		"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
		"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	},
	"user": {
		"id": 1,
		"email": "user@example.com",
		"full_name": "John Doe",
		"phone_number": "+1234567890",
		"address": "123 Main St",
		"profile_image": null
	}
}
```

### POST `/auth/jwt/refresh/`

Refresh the access token.

**Request:**

```json
{
	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**

```json
{
	"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
	"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST `/auth/jwt/verify/`

Verify a token is valid.

**Request:**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET `/auth/users/me/`

Get current authenticated user's profile.

**Headers:**

```
Authorization: Bearer <access_token>
```

**Response (200 OK):**

```json
{
	"id": 1,
	"email": "user@example.com",
	"full_name": "John Doe",
	"phone_number": "+1234567890",
	"address": "123 Main St",
	"profile_image": null,
	"is_staff": false,
	"is_admin": false,
	"date_joined": "2024-01-01T12:00:00Z"
}
```

### PUT/PATCH `/auth/users/me/`

Update current user's profile.

**Request:**

```json
{
	"full_name": "John Doe Updated",
	"phone_number": "+1987654321"
}
```

### GET `/auth/users/{id}/public/`

Get public details of a user (available to all).

**Response (200 OK):**

```json
{
	"id": 1,
	"full_name": "John Doe",
	"address": "123 Main St",
	"profile_image": null
}
```

## Permissions

| Endpoint                   | Permission    |
| -------------------------- | ------------- |
| `/auth/signup/`            | Anyone        |
| `/auth/login/`             | Anyone        |
| `/auth/jwt/refresh/`       | Anyone        |
| `/auth/jwt/verify/`        | Anyone        |
| `/auth/users/me/`          | Authenticated |
| `/auth/users/{id}/public/` | Anyone        |
| `/auth/users/`             | Admin only    |

## Usage Example

```python
# Create a user
from accounts.models import User

user = User.objects.create_user(
    email='test@example.com',
    password='testpass123',
    full_name='Test User'
)

# Create a superuser
admin = User.objects.create_superuser(
    email='admin@example.com',
    password='adminpass123'
)

# Check user role
print(user.is_employee)  # True
print(admin.is_admin)    # True
```

## Testing

Run tests for the accounts app:

```bash
python manage.py test accounts
```

## Security Features

- Password validation (length, complexity)
- Password hashing (Django's default PBKDF2)
- JWT token expiration (1 day access, 7 days refresh)
- Token blacklisting on refresh rotation
