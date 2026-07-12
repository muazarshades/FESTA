# Festa – Full Stack Event Management System

Festa is a comprehensive full-stack web application developed to simplify the planning, organization, and management of events. The platform provides an all-in-one solution where users can create and manage events, book venues, hire service providers, and manage reservations through an intuitive and responsive interface.

The project follows a client-server architecture, with a React.js frontend, a Node.js and Express.js backend, and MySQL as the relational database. It demonstrates modern web development practices including RESTful API development, user authentication, CRUD operations, database management, and responsive UI design.

## Features

### User Authentication
- Secure user registration and login
- Password encryption
- User profile management
- Session-based authentication

### Event Management
- Create new events
- Edit existing events
- Delete events
- View upcoming events
- Event categorization and details

### Venue Management
- Browse available venues
- View venue information
- Book venues for events
- Venue availability management

### Service Provider Management
- Browse service providers
- Search and filter providers
- Book services for events
- View provider information and pricing

### Booking System
- Make bookings for venues and services
- Track booking status
- Manage reservations
- Booking history

### Reviews & Ratings
- Rate service providers
- Leave reviews
- View customer feedback
- Improve service transparency

### Search & Filtering
- Search events
- Filter venues
- Filter service providers
- Quick navigation

### Responsive User Interface
- Modern and user-friendly design
- Responsive layout
- Easy navigation
- Interactive components

---

## Technology Stack

### Frontend
- React.js
- JavaScript (ES6)
- HTML5
- CSS3
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT/Session Authentication

### Database
- MySQL

### Development Tools
- Visual Studio Code
- XAMPP
- Git
- GitHub
- Postman

---

## Project Structure

```
FestaProject
│
├── Backend
│   ├── Controllers
│   ├── Routes
│   ├── Models
│   ├── Middleware
│   └── Configuration
│
├── Frontend
│   ├── Components
│   ├── Pages
│   ├── Assets
│   └── Services
│
├── DataBase
│   └── SQL Files
│
├── API_DOCUMENTATION
├── IMPLEMENTATION_DOCUMENT
└── CHANGELOG.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/FestaProject.git
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm start
```

### Database

1. Install XAMPP.
2. Start Apache and MySQL.
3. Open phpMyAdmin.
4. Create a new database.
5. Import the SQL file from the `DataBase` folder.
6. Configure the database connection in the backend.

---

## API

The project follows RESTful API architecture.

Major API modules include:

- Authentication
- Users
- Events
- Venues
- Bookings
- Service Providers
- Reviews

Detailed API documentation is included in the `API_DOCUMENTATION` file.

---

## Learning Outcomes

This project demonstrates practical implementation of:

- Full Stack Web Development
- React.js Development
- Express.js Server Development
- REST API Design
- MySQL Database Design
- Authentication & Authorization
- CRUD Operations
- Responsive UI Development
- Database Integration
- Client-Server Communication
- Software Engineering Principles

---

## Future Improvements

- Online payment integration
- Email notifications
- Real-time chat
- Admin dashboard
- Google Maps integration
- Event recommendations
- Mobile application
- QR code ticketing

---

## Authors

Developed as a Software Engineering academic project at FAST National University of Computer and Emerging Sciences (FAST-NUCES).

---

## License

This project is developed for educational purposes.
