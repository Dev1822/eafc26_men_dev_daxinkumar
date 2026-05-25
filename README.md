# EAFC 26 Player Analytics API & Dashboard

A full-stack football analytics platform built using the MERN Stack.  
This project provides advanced player analytics, authentication, CRUD operations, filtering, sorting, aggregation pipelines, JWT security, admin dashboards, and MongoDB-powered APIs for EAFC 26 football player datasets.

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

## Frontend
- React.js (Vite)
- Tailwind CSS
- Material UI (MUI)
- Redux Toolkit
- Axios
- React Router

---

# Project Timeline

## Backend Development
**13 May 2026 – 28 May 2026 (15 Days)**

### Backend Goals
- MongoDB schema design
- REST API development
- JWT authentication
- CRUD operations
- Aggregation pipelines
- Middleware implementation
- Postman testing
- Error handling
- API documentation

---

## Frontend Development
**29 May 2026 – 13 June 2026 (15 Days)**

### Frontend Goals
- Admin dashboard
- User dashboard
- API integration
- Redux state management
- Authentication flow
- Responsive UI
- Analytics dashboard
- CRUD UI system
- Deployment-ready build

---

# Features

## Backend Features
- RESTful API architecture
- MongoDB integration
- CRUD operations
- Authentication system
- JWT token handling
- Middleware system
- Error handling
- Aggregation pipelines
- Pagination
- Sorting
- Filtering
- Search APIs
- Role-based access control
- Rate limiting
- Validation system

---

## Frontend Features
- Responsive admin dashboard
- User dashboard
- Authentication flow
- Protected routes
- Redux Toolkit state management
- Dynamic tables and cards
- Real-time CRUD updates
- Charts & analytics
- Dark/light theme
- API loading states
- Error handling UI
- Toast notifications

---

# Folder Structure

## Backend Structure

```bash
backend/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── app.js
├── server.js
└── package.json
```

---

## Frontend Structure

```bash
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── features/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── layouts/
│   ├── routes/
│   └── utils/
│
├── public/
├── package.json
└── vite.config.js
```

---

# Installation

## Clone Repository

```bash
git clone git clone https://github.com/Dev1822/eafc26_men_dev_daxinkumar
```

---

# Backend Setup

```bash
cd backend
npm install
```

### Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Authentication Features

- Register/Login system
- JWT token generation
- Protected routes
- Role-based authorization
- Password hashing with bcrypt
- Token verification middleware
- Refresh token support

---

# Core API Features

## CRUD APIs
- Create players
- Read players
- Update players
- Delete players

## Filtering APIs
- By team
- By nation
- By league
- By position
- By rating
- By stats

## Sorting APIs
- Overall rating
- Pace
- Passing
- Shooting
- Dribbling
- Defending
- Physical

## Pagination APIs
- Dynamic page-based APIs
- Limit support
- Optimized query handling

## Analytics APIs
- Top-rated players
- Best dribblers
- Best passers
- Young talents
- Team analytics
- League analytics
- Nation analytics

---

# Frontend Dashboard Modules

## Admin Dashboard
- Manage players
- Manage users
- Analytics system
- Admin routes
- Role management

## User Dashboard
- Player browsing
- Search system
- Analytics viewing
- Profile management

---

# Performance Optimization

- Code splitting
- Lazy loading
- Optimized MongoDB queries
- Indexing
- useMemo
- useCallback
- Efficient API calls

---

# Security Features

- JWT Authentication
- Request validation
- Rate limiting
- Protected APIs
- Sanitized inputs
- Error handling middleware

---

# SEO Features

- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Structured data
- Sitemap generation

---

# API Examples

## Get All Players

```http
GET /players
```

## Get Player By ID

```http
GET /players/:id
```

## Search Players

```http
GET /search/players?q=mbappe
```

## Filter Players

```http
GET /players?minDefending=80
GET /players?minPhysical=80
GET /players?team=Liverpool
GET /players?league=Premier League
GET /players?nation=France
GET /players?position=ST
GET /players?preferredFoot=Left
GET /players?age=26
GET /players?skillMoves=5
GET /players?weakFoot=4
```

## Pagination

```http
GET /players?page=1&limit=10
```

## Sorting

```http
GET /players?sort=ovr
```

---

# Advanced APIs

- Player recommendations
- Dream team generation
- Squad chemistry
- Market value prediction
- Trending players
- Live search
- Heatmap analytics

---

# Middleware System

- Logger middleware
- Authentication middleware
- Validation middleware
- Error handler middleware
- Role-check middleware
- Rate limiting middleware

---

# Deployment

## Backend Deployment
- Render
- Railway
- VPS
- AWS

## Frontend Deployment
- Vercel
- Netlify

---

# Dataset

Google Drive Dataset Link:

https://drive.google.com/file/d/1skFOwACmG1U6O2qQRGFuGcF4-AYtk6BW/view?usp=drive_link

---

# Final Evaluation Criteria

The project is considered industry-ready if:

- All APIs work correctly
- Authentication is secure
- CRUD operations function properly
- MongoDB schemas are scalable
- Frontend is fully responsive
- APIs are integrated successfully
- Dashboard reflects real database data
- Error handling is implemented
- State management is optimized
- Code is reusable and modular

---

# Future Improvements

- AI-powered player recommendations
- Real-time WebSocket updates
- Advanced caching
- Machine learning analytics
- Cloud media storage
- Multi-language support

---

# Author

Developed by Dev Patel

