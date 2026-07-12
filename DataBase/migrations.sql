-- ============================================
-- FESTA DATABASE MIGRATIONS
-- Add support for enhanced reviews, comments, likes, and event discussions
-- ============================================

USE festa;

-- ============================================
-- MIGRATION 1: Enhance Reviews Table
-- ============================================
-- Add more fields to Reviews table for better tracking
ALTER TABLE Reviews ADD COLUMN IF NOT EXISTS created_at DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Reviews ADD COLUMN IF NOT EXISTS customer_id INT AFTER booking_id;

-- ============================================
-- MIGRATION 2: Create Review Comments Table
-- ============================================
-- Customers and Organizers can comment on reviews
DROP TABLE IF EXISTS ReviewComments;
CREATE TABLE ReviewComments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_review_id (review_id),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- MIGRATION 3: Create Review Likes Table
-- ============================================
-- Users can like reviews
DROP TABLE IF EXISTS ReviewLikes;
CREATE TABLE ReviewLikes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_review_like (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES Reviews(review_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_review_id (review_id),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- MIGRATION 4: Create Comment Likes Table
-- ============================================
-- Users can like comments on reviews
DROP TABLE IF EXISTS CommentLikes;
CREATE TABLE CommentLikes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_comment_like (comment_id, user_id),
    FOREIGN KEY (comment_id) REFERENCES ReviewComments(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_comment_id (comment_id),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- MIGRATION 5: Enhance Forum to Event-Specific Discussions
-- ============================================
-- Rename ForumPosts to EventDiscussions for clarity
DROP TABLE IF EXISTS EventDiscussions;
CREATE TABLE EventDiscussions (
    discussion_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(150),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- MIGRATION 6: Create Event Discussion Replies
-- ============================================
-- Replies to event discussions
DROP TABLE IF EXISTS DiscussionReplies;
CREATE TABLE DiscussionReplies (
    reply_id INT PRIMARY KEY AUTO_INCREMENT,
    discussion_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (discussion_id) REFERENCES EventDiscussions(discussion_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_discussion_id (discussion_id),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- MIGRATION 7: Create Service Bookings by Organizers
-- ============================================
-- Track which services organizers book for their events
DROP TABLE IF EXISTS ServiceBookings;
CREATE TABLE ServiceBookings (
    service_booking_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    service_id INT NOT NULL,
    organizer_id INT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Pending',
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE CASCADE,
    FOREIGN KEY (organizer_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    INDEX idx_event_id (event_id),
    INDEX idx_organizer_id (organizer_id)
);

-- ============================================
-- MIGRATION 8: Create Provider Table
-- ============================================
-- Additional provider information
DROP TABLE IF EXISTS Providers;
CREATE TABLE Providers (
    provider_id INT PRIMARY KEY,
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    services_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- ============================================
-- Deprecated Tables (for reference)
-- ============================================
-- The following tables should be deprecated:
-- - Resources (all resource library features removed)
-- - ForumPosts and ForumReplies (replaced by EventDiscussions and DiscussionReplies)
-- - BookingServices (replaced by ServiceBookings)

-- Optional: Drop deprecated tables
-- DROP TABLE IF EXISTS Resources;
-- DROP TABLE IF EXISTS ForumReplies;
-- DROP TABLE IF EXISTS ForumPosts;
-- DROP TABLE IF EXISTS BookingServices;

-- ============================================
-- MIGRATION 9: Create indexes for better performance
-- ============================================
ALTER TABLE Events ADD INDEX idx_organizer_id (organizer_id);
ALTER TABLE Events ADD INDEX idx_event_date (event_date);
ALTER TABLE Services ADD INDEX idx_provider_id (provider_id);
ALTER TABLE Services ADD INDEX idx_category (category);
ALTER TABLE Bookings ADD INDEX idx_event_id (event_id);
ALTER TABLE Bookings ADD INDEX idx_customer_id (customer_id);
ALTER TABLE Reviews ADD INDEX idx_booking_id (booking_id);
ALTER TABLE Reviews ADD INDEX idx_customer_id (customer_id);
