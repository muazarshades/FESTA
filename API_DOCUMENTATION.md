# FESTA - Event Management System API Documentation

## Version 2.0.0 - Refactored with Role-Based Access Control

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [User Roles](#user-roles)
4. [API Endpoints](#api-endpoints)
5. [Request/Response Examples](#requestresponse-examples)
6. [Error Handling](#error-handling)

---

## Overview

FESTA is a comprehensive event management system with role-based access control. The API provides endpoints for:

- **Event Management** - Create, view, and manage events
- **Event Bookings** - Book tickets for events (customers only)
- **Reviews & Ratings** - Submit reviews with comments and likes
- **Event Discussions** - Ask questions and discuss upcoming events
- **Service Management** - Providers offer services, organizers book them
- **Role-Based Access** - Different permissions for Customers, Organizers, and Providers

---

## Authentication

### JWT Token

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. **Signup** (Create new account)

   ```bash
   POST /api/auth/signup
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "Customer" // or "Organizer" or "Provider"
   }
   ```

2. **Login** (Get JWT token)

   ```bash
   POST /api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

   Response:

   ```json
   {
     "success": true,
     "message": "Login successful",
     "token": "eyJhbGciOiJIUzI1NiIs...",
     "user": {
       "user_id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "role": "Customer"
     }
   }
   ```

---

## User Roles

### 1. **Customer**

- View all events
- Book tickets for upcoming events
- Cancel their own bookings
- Submit reviews for completed events
- Comment on reviews
- Like/unlike reviews and comments
- Participate in event discussions
- Ask questions about events

### 2. **Organizer**

- Create and manage their own events
- View all bookings for their events
- Update booking status (Pending → Confirmed → Completed)
- View available services
- Book services for their events
- Manage service bookings for events
- Reply to event discussions
- Like/unlike comments and reviews

### 3. **Provider**

- Create and manage services (Catering, Music, Decoration, Photography, Other)
- Update/delete their services
- Receive bookings from organizers
- Track service bookings

### 4. **Admin** (Future)

- Full access to all resources
- User management
- System administration

---

## API Endpoints

### AUTHENTICATION ENDPOINTS

#### POST `/api/auth/signup`

Create a new user account.

**No Authentication Required**

**Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6 chars)",
  "role": "Customer|Organizer|Provider|Admin (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Signup successful. Please log in."
}
```

---

#### POST `/api/auth/login`

Authenticate and get JWT token.

**No Authentication Required**

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Customer"
  }
}
```

---

#### GET `/api/auth/me`

Get current authenticated user info.

**Authentication Required**

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "user_id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "Customer"
  }
}
```

---

### EVENT ENDPOINTS

#### GET `/api/events/all`

Get all events. **No authentication required**

**Query Parameters:** None

**Response (200 OK):**

```json
{
  "success": true,
  "events": [
    {
      "event_id": 1,
      "organizer_id": 5,
      "organizer_name": "Event Company Inc",
      "title": "Summer Concert 2026",
      "description": "Live music event",
      "event_date": "2026-06-15",
      "location": "Central Park",
      "budget": 50000,
      "created_at": "2026-05-13T10:30:00Z"
    }
  ]
}
```

---

#### GET `/api/events/:id`

Get single event details. **No authentication required**

**URL Parameters:**

- `id` (number) - Event ID

**Response (200 OK):**

```json
{
  "success": true,
  "event": {
    "event_id": 1,
    "organizer_id": 5,
    "organizer_name": "Event Company Inc",
    "organizer_email": "organizer@company.com",
    "title": "Summer Concert 2026",
    "description": "Live music event",
    "event_date": "2026-06-15",
    "location": "Central Park",
    "budget": 50000,
    "created_at": "2026-05-13T10:30:00Z"
  }
}
```

---

#### POST `/api/events/create`

Create a new event. **Organizers Only**

**Authentication:** Required

**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "event_date": "YYYY-MM-DD (required)",
  "location": "string (required)",
  "budget": "decimal (optional)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Event created successfully",
  "event_id": 1
}
```

---

#### GET `/api/events/organizer/my-events`

Get events created by logged-in organizer. **Organizers Only**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "events": [
    {
      "event_id": 1,
      "title": "Summer Concert 2026",
      "event_date": "2026-06-15",
      "location": "Central Park"
    }
  ]
}
```

---

#### PUT `/api/events/:id`

Update event. **Organizers Only (own events)**

**Authentication:** Required

**URL Parameters:**

- `id` (number) - Event ID

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "event_date": "YYYY-MM-DD",
  "location": "string",
  "budget": "decimal"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event updated successfully"
}
```

---

#### DELETE `/api/events/:id`

Delete event. **Organizers Only (own events)**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

### BOOKING ENDPOINTS

#### POST `/api/bookings/create`

Book a ticket for an event. **Customers Only**

**Authentication:** Required

**Request Body:**

```json
{
  "event_id": "number (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Booking confirmed successfully",
  "booking_id": 42
}
```

---

#### GET `/api/bookings/my-bookings`

Get customer's bookings. **Customers Only**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "bookings": [
    {
      "booking_id": 42,
      "event_id": 1,
      "event_title": "Summer Concert 2026",
      "event_date": "2026-06-15",
      "location": "Central Park",
      "organizer_name": "Event Company Inc",
      "booking_date": "2026-05-13T14:20:00Z",
      "status": "Confirmed",
      "review_count": 0
    }
  ]
}
```

---

#### GET `/api/bookings/event/:event_id`

Get all bookings for an event. **Organizers Only (own events)**

**Authentication:** Required

**URL Parameters:**

- `event_id` (number) - Event ID

**Response (200 OK):**

```json
{
  "success": true,
  "bookings": [
    {
      "booking_id": 42,
      "event_id": 1,
      "customer_id": 2,
      "customer_name": "John Doe",
      "customer_email": "john@example.com",
      "booking_date": "2026-05-13T14:20:00Z",
      "status": "Confirmed",
      "has_review": false
    }
  ]
}
```

---

#### DELETE `/api/bookings/:id`

Cancel a booking. **Customers Only (own bookings)**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

#### PUT `/api/bookings/:id/status`

Update booking status. **Organizers Only (own events)**

**Authentication:** Required

**Request Body:**

```json
{
  "status": "Pending|Confirmed|Completed|Cancelled (required)"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Booking status updated successfully"
}
```

---

### REVIEW ENDPOINTS

#### POST `/api/reviews/create`

Submit a review for a completed event. **Customers Only**

**Authentication:** Required

**Request Body:**

```json
{
  "booking_id": "number (required)",
  "rating": "1-5 (required)",
  "comment": "string (optional)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Review submitted successfully",
  "review_id": 1
}
```

---

#### GET `/api/reviews/event/:event_id`

Get all reviews for an event. **No authentication required**

**URL Parameters:**

- `event_id` (number) - Event ID

**Response (200 OK):**

```json
{
  "success": true,
  "reviews": [
    {
      "review_id": 1,
      "booking_id": 42,
      "rating": 5,
      "comment": "Great event!",
      "customer_name": "John Doe",
      "created_at": "2026-05-13T15:30:00Z",
      "likes_count": 3,
      "comments_count": 2
    }
  ]
}
```

---

#### POST `/api/reviews/:review_id/comments`

Add comment to a review. **Any authenticated user**

**Authentication:** Required

**Request Body:**

```json
{
  "content": "string (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Comment added successfully",
  "comment_id": 1
}
```

---

#### GET `/api/reviews/:review_id/comments`

Get comments on a review. **No authentication required**

**Response (200 OK):**

```json
{
  "success": true,
  "comments": [
    {
      "comment_id": 1,
      "content": "I agree!",
      "user_id": 3,
      "name": "Jane Smith",
      "role": "Customer",
      "created_at": "2026-05-13T16:00:00Z",
      "likes_count": 1
    }
  ]
}
```

---

#### POST `/api/reviews/:review_id/like`

Like a review. **Any authenticated user**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Review liked successfully"
}
```

---

#### DELETE `/api/reviews/:review_id/unlike`

Unlike a review. **Any authenticated user**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Review unliked successfully"
}
```

---

#### POST `/api/reviews/comments/:comment_id/like`

Like a comment. **Any authenticated user**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Comment liked successfully"
}
```

---

#### DELETE `/api/reviews/comments/:comment_id/unlike`

Unlike a comment. **Any authenticated user**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Comment unliked successfully"
}
```

---

### PROVIDER/SERVICE ENDPOINTS

#### GET `/api/providers/all`

Get all available services. **Organizers Only**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "services": [
    {
      "service_id": 1,
      "name": "DJ Services",
      "category": "Music",
      "description": "Professional DJ for events",
      "price": 500,
      "provider_id": 4,
      "provider_name": "DJ Company",
      "provider_email": "dj@company.com"
    }
  ]
}
```

---

#### GET `/api/providers/category/:category`

Get services by category. **Organizers Only**

**Authentication:** Required

**URL Parameters:**

- `category` - Catering|Music|Decoration|Photography|Other

**Response (200 OK):**

```json
{
  "success": true,
  "services": [...]
}
```

---

#### POST `/api/providers/book`

Book a service for an event. **Organizers Only**

**Authentication:** Required

**Request Body:**

```json
{
  "event_id": "number (required)",
  "service_id": "number (required)",
  "notes": "string (optional)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Service booked successfully",
  "booking_id": 1
}
```

---

#### GET `/api/providers/event/:event_id/bookings`

Get services booked for an event. **Organizers Only (own events)**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "bookings": [
    {
      "service_booking_id": 1,
      "event_id": 1,
      "booking_date": "2026-05-13T14:30:00Z",
      "status": "Confirmed",
      "service_id": 1,
      "service_name": "DJ Services",
      "category": "Music",
      "price": 500,
      "provider_name": "DJ Company",
      "provider_email": "dj@company.com"
    }
  ]
}
```

---

#### DELETE `/api/providers/bookings/:booking_id`

Cancel service booking. **Organizers Only**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

#### POST `/api/providers/create`

Create a service. **Providers Only**

**Authentication:** Required

**Request Body:**

```json
{
  "category": "Catering|Music|Decoration|Photography|Other (required)",
  "name": "string (required)",
  "description": "string (optional)",
  "price": "decimal (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Service created successfully",
  "service_id": 1
}
```

---

#### GET `/api/providers/my-services`

Get provider's services. **Providers Only**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "services": [
    {
      "service_id": 1,
      "category": "Music",
      "name": "DJ Services",
      "description": "Professional DJ",
      "price": 500,
      "availability": true
    }
  ]
}
```

---

#### PUT `/api/providers/:service_id`

Update service. **Providers Only (own services)**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Service updated successfully"
}
```

---

#### DELETE `/api/providers/:service_id`

Delete service. **Providers Only (own services)**

**Authentication:** Required

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

### EVENT DISCUSSION ENDPOINTS

#### POST `/api/forum/event/:event_id/discussions`

Create discussion about an event. **Any authenticated user**

**Authentication:** Required

**Request Body:**

```json
{
  "title": "string (required)",
  "content": "string (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Discussion created successfully",
  "discussion_id": 1
}
```

---

#### GET `/api/forum/event/:event_id/discussions`

Get all discussions for an event. **No authentication required**

**Response (200 OK):**

```json
{
  "success": true,
  "discussions": [
    {
      "discussion_id": 1,
      "title": "Where is the parking?",
      "content": "Can someone help with parking info?",
      "author_name": "John Doe",
      "author_name": "Customer",
      "created_at": "2026-05-13T10:00:00Z",
      "replies_count": 3
    }
  ]
}
```

---

#### POST `/api/forum/discussions/:discussion_id/replies`

Add reply to discussion. **Any authenticated user**

**Authentication:** Required

**Request Body:**

```json
{
  "content": "string (required)"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Reply added successfully",
  "reply_id": 1
}
```

---

#### GET `/api/forum/discussions/:discussion_id/replies`

Get replies for discussion. **No authentication required**

**Response (200 OK):**

```json
{
  "success": true,
  "replies": [
    {
      "reply_id": 1,
      "content": "There's free parking at the venue.",
      "user_id": 4,
      "name": "Jane Smith",
      "role": "Organizer",
      "created_at": "2026-05-13T10:15:00Z"
    }
  ]
}
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Description of what was wrong with the request"
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "No token provided. Please log in." // or "Invalid or expired token"
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied. Required role(s): Organizer"
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Implementation Checklist

- [x] Role-based authentication with JWT
- [x] Event management (create, read, update, delete)
- [x] Event bookings by customers
- [x] Review system with comments and likes
- [x] Event discussions and replies
- [x] Provider service management
- [x] Organizers can book services for events
- [x] Remove resource library feature
- [x] Proper error handling and validation

---

## Database Tables Required

The following tables must be created using the migrations.sql file:

- Users
- Events
- Bookings
- Reviews
- ReviewComments
- ReviewLikes
- CommentLikes
- EventDiscussions
- DiscussionReplies
- Services
- ServiceBookings
- Providers

---

## Getting Started

1. Run the migration script: `migrations.sql`
2. Update `.env` with your configuration
3. Install dependencies: `npm install`
4. Start server: `npm start`
5. Test endpoints using Postman or similar tool

---

## Support & Questions

For API support or questions, refer to the endpoint documentation above or contact the development team.

Version 2.0.0 - Last Updated: May 13, 2026
