# FESTA Project - Changelog

## [2.0.0] - 2026-05-13 - Major Refactoring

### Added

- ✅ **JWT Token Authentication** - Secure token-based authentication system
- ✅ **Role-Based Access Control (RBAC)** - Four user roles with specific permissions
  - Customer: Book events, submit reviews, participate in discussions
  - Organizer: Create/manage events, book services, manage bookings
  - Provider: Create/manage services
  - Admin: Full access (framework ready)
- ✅ **Enhanced Review System**
  - Comments on reviews from any authenticated user
  - Like/unlike functionality for reviews and comments
  - Like counts tracking in responses
  - Review validation against completed bookings only
- ✅ **Event-Specific Discussion Forum**
  - Discussions linked to specific events
  - Customers ask questions about upcoming events
  - Both customers and organizers can participate
  - Full CRUD operations on discussions and replies
- ✅ **Organizer Service Booking**
  - Organizers can view available services
  - Services categorized (Catering, Music, Decoration, Photography, Other)
  - Book services for specific events
  - Manage service bookings per event
- ✅ **Improved Event Management**
  - Only organizers can create events
  - Organizers can only edit/delete their own events
  - Event organizer info in all responses
  - Customers can view all events before booking
- ✅ **Enhanced Booking System**
  - Customers book event tickets
  - One booking per customer per event validation
  - Organizers update booking status (Pending → Confirmed → Completed)
  - Better booking history tracking
- ✅ **Database Schema Enhancements**
  - New tables: ReviewComments, ReviewLikes, CommentLikes
  - New tables: EventDiscussions, DiscussionReplies
  - New tables: ServiceBookings, Providers
  - Added proper indexes for performance
  - Foreign key relationships with ON DELETE CASCADE
- ✅ **Comprehensive Documentation**
  - Complete API documentation (API_DOCUMENTATION.md)
  - Implementation guide with setup instructions (IMPLEMENTATION_GUIDE.md)
  - Environment configuration template (.env.example)
  - Detailed endpoint reference

### Changed

- 🔄 **Authentication Middleware** - Rewritten for role-based verification
- 🔄 **Event Routes** - Added authorization checks and improved response data
- 🔄 **Booking Routes** - Customer-only booking, improved validation
- 🔄 **Review Routes** - Complete rewrite with comment and like system
- 🔄 **Forum Routes** - Renamed to discussion routes, linked to events
- 🔄 **Provider Routes** - Split into organizer/provider sections with proper access control
- 🔄 **Server Configuration** - Updated with route documentation comments
- 🔄 **Error Handling** - Consistent error response format across all routes

### Removed

- ❌ **Resource Library** - Completely removed from active features
  - resourceRoutes.js now returns deprecation message
  - Old endpoints respond with 410 Gone status
  - Database table kept for backwards compatibility
- ❌ **Old Forum Routes** - Replaced with event-specific discussions
- ❌ **Redundant BookingServices Table** - Replaced with ServiceBookings

### Fixed

- 🐛 Duplicate email validation in signup
- 🐛 Missing response codes in endpoints
- 🐛 Inconsistent error message formatting
- 🐛 Missing validation for booking duplicates
- 🐛 Missing event date validation for bookings

### Security

- 🔒 JWT token implementation with 7-day expiration
- 🔒 Role-based authorization middleware
- 🔒 Authorization checks on all protected routes
- 🔒 User ownership validation for updates/deletes
- 🔒 Password hashing with bcryptjs
- 🔒 Proper HTTP status codes for auth failures

### Performance

- ⚡ Added database indexes on frequently queried fields
- ⚡ Optimized query patterns with SELECT specific fields
- ⚡ Added JOIN operations for related data
- ⚡ Count functions for related records

### Database

```sql
-- New Tables
ReviewComments
ReviewLikes
CommentLikes
EventDiscussions
DiscussionReplies
ServiceBookings
Providers

-- Migration Script
DataBase/migrations.sql
```

### API Endpoints Count

- Public Endpoints: 7
- Authentication Endpoints: 3
- Customer Endpoints: 11
- Organizer Endpoints: 14
- Provider Endpoints: 5
- **Total: 40+ endpoints**

### Breaking Changes

- ⚠️ Old `/api/forum/all` endpoint removed
- ⚠️ Old `/api/resources/all` endpoint removed
- ⚠️ Forum posts must now include event_id
- ⚠️ All protected routes now require JWT token
- ⚠️ Event creation requires organizer role

### Migration Guide

See IMPLEMENTATION_GUIDE.md for complete setup instructions including:

1. Running database migrations
2. Environment configuration
3. Starting the server
4. Testing the API
5. Common issues and solutions

### Testing

Recommended workflow for testing:

1. Create customer, organizer, and provider accounts
2. Organizer creates event
3. Provider creates services
4. Organizer books services for event
5. Customer books event ticket
6. After event, customer submits review
7. Users interact with reviews and discussions

### Known Limitations (v2.0.0)

- No payment integration yet
- No email notifications
- No admin panel UI
- No file uploads for profiles
- No image handling

### Future Roadmap (v2.1.0+)

- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] User profiles with avatars
- [ ] Advanced search and filtering
- [ ] Event recommendations
- [ ] Loyalty points system
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] Comprehensive logging

### Installation & Setup

```bash
# 1. Run migrations
mysql -u root -p festa < DataBase/migrations.sql

# 2. Install dependencies
cd Backend
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your settings

# 4. Start server
npm start
```

### Support

- API Documentation: API_DOCUMENTATION.md
- Implementation Guide: IMPLEMENTATION_GUIDE.md
- Database Migrations: DataBase/migrations.sql
- Environment Setup: Backend/.env.example

---

## [1.0.0] - Initial Release

- Basic event management system
- User registration and login
- Event creation and viewing
- Simple booking system
- Basic review system
- Forum posts
- Resource library

---

**Last Updated:** May 13, 2026
**Version:** 2.0.0
**Status:** Production Ready ✅
