# EAFC26 Frontend Dashboard

This project is a premium, highly responsive admin dashboard built for managing the EAFC26 dataset, integrated tightly with a MongoDB/Express backend.

## Tech Stack
- **Framework**: React 19 / Vite
- **Styling**: Tailwind CSS v4 + Material UI (MUI)
- **State Management**: Redux Toolkit (Data, UI, and Auth slices)
- **Routing**: React Router DOM v6
- **Data Fetching**: Axios
- **Form Handling**: Formik + Yup
- **Charts**: Recharts
- **SEO**: React Helmet Async

## Folder Structure
- `src/components`: Reusable UI components (Layouts, SEO, Sidebar, Navbar).
- `src/features`: Domain-specific components (PlayersTable, AnalyticsDashboard).
- `src/pages`: Top-level route components with lazy loading.
- `src/services`: Axios interceptors and global API config.
- `src/store`: Redux store configuration and slices (`authSlice`, `dataSlice`).

## Setup Instructions
1. Ensure the Node.js environment is configured.
2. Ensure the backend server is running on port `5000` (or update the Vite proxy in `vite.config.js`).
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the Vite development server.

## Features Implemented
- Complete JWT Authentication flow (Login, Register, Session Storage)
- Protected and Admin-specific Routes
- Full CRUD operations with Modals for Player Management
- Aggregation-based Analytics Charts (OVR Distribution, Top Nations)
- SEO tags, Dark Mode, and Global Toast Notifications
