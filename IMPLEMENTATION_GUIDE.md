# FESTA Project Refactoring - Implementation Guide

## Overview of Changes

This document outlines all the changes made to reorganize FESTA with proper role-based access control and feature organization.

---

## What Changed

### 1. Authentication System

**New:** JWT Token-based Authentication

- Users login and receive a JWT token
- Token valid for 7 days
- All protected endpoints require Bearer token in Authorization header

**File:** [Backend/routes/authRoutes.js](Backend/routes/authRoutes.js)

**Usage:**

```bash
# Login to get token
POST /api/auth/login

# Use token in subsequent requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

### 2. Role-Based Access Control (RBAC)

**New:** Middleware for role verification

**File:** [Backend/middleware/authMiddleware.js](Backend/middleware/authMiddleware.js)

**Roles and Permissions:**

| Role          | Permissions                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Customer**  | View events, Book events, Submit reviews, Comment on reviews, Like/unlike, Participate in discussions          |
| **Organizer** | Create/manage events, View bookings, Update booking status, View services, Book services, Reply to discussions |
| **Provider**  | Create/manage services, Receive bookings                                                                       |
| **Admin**     | Full access (future)                                                                                           |

---

### 3. Event Management

**Enhanced:** Organizers-only event creation and management

**File:** [Backend/routes/eventRoutes.js](Backend/routes/eventRoutes.js)

**Changes:**

- ✅ Only organizers can create events
- ✅ Organizers can only edit/delete their own events
- ✅ All users can view all events (public)
- ✅ Customers can view event details before booking
- ✅ Added event organizer information in responses

---

### 4. Event Booking System

**Enhanced:** Customer ticket booking

**File:** [Backend/routes/bookingRoutes.js](Backend/routes/bookingRoutes.js)

**Changes:**

- ✅ Only customers can book event tickets
- ✅ One booking per customer per event
- ✅ Customers can view their bookings
- ✅ Customers can cancel their own bookings
- ✅ Organizers can view all bookings for their events
- ✅ Organizers can update booking status (Pending → Confirmed → Completed)

---

### 5. Enhanced Review System

**New:** Comments and Likes for Reviews

**File:** [Backend/routes/reviewRoutes.js](Backend/routes/reviewRoutes.js)

**Features:**

- ✅ Customers can submit reviews with 1-5 rating
- ✅ Anyone can comment on reviews
- ✅ Users can like/unlike reviews
- ✅ Users can like/unlike comments
- ✅ Reviews tied to completed bookings only
- ✅ Comment and like counts in review responses

**Database Tables:**

- ReviewComments - for storing review comments
- ReviewLikes - for tracking review likes
- CommentLikes - for tracking comment likes

---

### 6. Event Discussion Forum

**Renamed:** Forum → Event Discussions
**Enhanced:** Event-specific discussions

**File:** [Backend/routes/forumRoutes.js](Backend/routes/forumRoutes.js)

**Features:**

- ✅ Discussions linked to specific events
- ✅ Customers ask questions about upcoming events
- ✅ Both customers and organizers can participate
- ✅ Organizers can reply to discussions
- ✅ Anyone can add replies to discussions
- ✅ Edit/delete own discussions and replies

**Database Tables:**

- EventDiscussions - replaced ForumPosts
- DiscussionReplies - replaced ForumReplies

---

### 7. Provider & Service Management

**Enhanced:** Organizers-only service browsing and booking

**File:** [Backend/routes/providerRoutes.js](Backend/routes/providerRoutes.js)

**Features:**

**For Organizers:**

- ✅ View all available services
- ✅ Filter services by category
- ✅ Book services for their events
- ✅ View booked services for each event
- ✅ Cancel service bookings

**For Providers:**

- ✅ Create services (5 categories: Catering, Music, Decoration, Photography, Other)
- ✅ Update service details and price
- ✅ Toggle availability
- ✅ Delete services
- ✅ View their own services

**Database Tables:**

- ServiceBookings - tracks organizer service bookings (new)
- Services - updated with better relationships
- Providers - additional provider info (new)

---

### 8. Removed Features

**❌ Resource Library:** Completely removed

**File:** [Backend/routes/resourceRoutes.js](Backend/routes/resourceRoutes.js)

- All resource library endpoints now return 410 Gone
- Database table Resources kept for backwards compatibility
- Can be removed in future cleanup

---

## Database Changes

### New Tables Created:

1. **ReviewComments** - Comments on reviews
2. **ReviewLikes** - Likes on reviews
3. **CommentLikes** - Likes on comments
4. **EventDiscussions** - Event-specific discussions (replaces ForumPosts)
5. **DiscussionReplies** - Replies to discussions (replaces ForumReplies)
6. **ServiceBookings** - Organizer service bookings
7. **Providers** - Provider profile information

### Modified Tables:

1. **Reviews** - Added `customer_id` field
2. **Events** - Relationships already correct
3. **Services** - Added better indexing

### Migration Script:

Run the migration to create all new tables and relationships:

```bash
mysql -u root -p festa < DataBase/migrations.sql
```

---

## API Endpoints Summary

### Public Endpoints (No Auth)

```
GET  /api/events/all
GET  /api/events/:id
GET  /api/reviews/event/:id
GET  /api/reviews/:id/comments
GET  /api/forum/event/:id/discussions
GET  /api/forum/discussions/:id/replies
```

### Authentication Endpoints

```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Customer Endpoints

```
POST   /api/bookings/create
GET    /api/bookings/my-bookings
DELETE /api/bookings/:id
POST   /api/reviews/create
POST   /api/reviews/:id/comments
POST   /api/reviews/:id/like
DELETE /api/reviews/:id/unlike
POST   /api/forum/event/:id/discussions
POST   /api/forum/discussions/:id/replies
```

### Organizer Endpoints

```
POST   /api/events/create
GET    /api/events/organizer/my-events
PUT    /api/events/:id
DELETE /api/events/:id
GET    /api/bookings/event/:id
PUT    /api/bookings/:id/status
GET    /api/providers/all
GET    /api/providers/category/:category
POST   /api/providers/book
GET    /api/providers/event/:id/bookings
DELETE /api/providers/bookings/:id
```

### Provider Endpoints

```
POST /api/providers/create
GET  /api/providers/my-services
PUT  /api/providers/:id
DELETE /api/providers/:id
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete endpoint reference.

---

## Setup Instructions

### 1. Run Database Migrations

```bash
mysql -u root -p festa < DataBase/migrations.sql
```

### 2. Install Dependencies

```bash
cd Backend
npm install
```

Make sure these packages are in package.json:

- express
- cors
- mysql2
- bcryptjs
- jsonwebtoken

### 3. Configure Environment Variables

Create `.env` file in Backend folder:

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=festa
```

### 4. Start Server

```bash
npm start
```

Server runs on http://localhost:5000

---

## Testing the API

### 1. Create Test Accounts

**Customer:**

```json
POST /api/auth/signup
{
  "name": "John Customer",
  "email": "customer@test.com",
  "password": "password123",
  "role": "Customer"
}
```

**Organizer:**

```json
POST /api/auth/signup
{
  "name": "Jane Organizer",
  "email": "organizer@test.com",
  "password": "password123",
  "role": "Organizer"
}
```

**Provider:**

```json
POST /api/auth/signup
{
  "name": "Bob Provider",
  "email": "provider@test.com",
  "password": "password123",
  "role": "Provider"
}
```

### 2. Login and Get Token

```json
POST /api/auth/login
{
  "email": "organizer@test.com",
  "password": "password123"
}
```

Copy the `token` from response.

### 3. Test Endpoints

Use token in Authorization header:

```
Authorization: Bearer <your_token>
```

Test workflow:

1. Organizer creates event
2. Customer books event
3. After event completion, customer reviews it
4. Others comment and like the review
5. During event, customers discuss questions

---

## File Structure

```
Backend/
├── routes/
│   ├── authRoutes.js         ✅ Updated (JWT)
│   ├── eventRoutes.js        ✅ Updated (RBAC)
│   ├── bookingRoutes.js      ✅ Updated (Customer only)
│   ├── reviewRoutes.js       ✅ Enhanced (Comments/Likes)
│   ├── forumRoutes.js        ✅ Updated (Event discussions)
│   ├── providerRoutes.js     ✅ Enhanced (Organizers only)
│   └── resourceRoutes.js     ❌ Deprecated
├── middleware/
│   └── authMiddleware.js     ✅ NEW (RBAC)
├── controllers/
├── models/
├── db.js
├── server.js                 ✅ Updated
└── package.json

DataBase/
├── festa.sql
├── migrations.sql            ✅ NEW (Schema updates)
├── stored_procedures.sql
├── triggers.sql
├── udfs.sql
└── views.sql

Documentation/
├── API_DOCUMENTATION.md      ✅ NEW (Complete reference)
└── IMPLEMENTATION_GUIDE.md   ✅ NEW (This file)
```

---

## Common Issues & Solutions

### Issue: "No token provided"

**Solution:** Add Authorization header with Bearer token

### Issue: "Access denied. Required role: Organizer"

**Solution:** Ensure logged-in user account is role "Organizer", not "Customer"

### Issue: "You can only edit your own events"

**Solution:** User must be the event organizer who created the event

### Issue: "You can only review completed bookings"

**Solution:** Event must be completed (event_date must be in past) and booking status must be "Completed"

### Issue: Database migration fails

**Solution:** Ensure MySQL service is running and user has proper permissions

---

## Next Steps

### Phase 2 (Future):

- [ ] Payment integration
- [ ] Notifications system
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Email verification
- [ ] Password reset
- [ ] User profiles with photos
- [ ] Advanced search and filtering
- [ ] Recommendations

### Maintenance:

- [ ] Add API rate limiting
- [ ] Add request validation
- [ ] Add comprehensive logging
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API versioning

---

## Version History

**v2.0.0** (May 13, 2026)

- ✅ Implemented role-based access control
- ✅ Enhanced review system with comments and likes
- ✅ Event-specific discussion forum
- ✅ Organizer service booking
- ✅ Removed resource library
- ✅ JWT authentication
- ✅ Complete API documentation

**v1.0.0** (Initial)

- Basic event management
- Basic booking system
- Simple reviews
- Forum posts

---

## Contact & Support

For questions or issues with the refactored system, refer to:

- API Documentation: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Individual route files for specific endpoint details
- Database migrations for schema information
