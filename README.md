# Walmart WSSCC Frontend

This is the frontend for the Walmart WSSCC project, built with React and Material-UI.

## Tech Stack
- **React** (UI library)
- **Material-UI (MUI)** (UI components)
- **react-router-dom** (routing)
- **react-webcam** (camera integration)
- **JavaScript (ES6+)**

## Features
- Manager registration and login
- Dashboard with side navbar:
  - Home
  - Store Map and Details (image upload, store info)
  - Feedback (image and voice capture)
  - Current Problems (notify other stores)
  - Camera Details
  - Nearby Stores (list/add stores)
  - Notifications
  - Profile
- Modular components for each dashboard section
- Responsive and modern UI

## Folder Structure
```
frontend/
  ├── public/                # Static assets
  ├── src/
  │   ├── components/
  │   │   ├── Common/        # Shared UI components
  │   │   ├── Dashboard/     # Dashboard section components
  │   │   └── Scanner/       # Camera/voice components
  │   ├── pages/             # Page-level components (DashboardPage, LoginPage, RegisterPage)
  │   ├── services/          # API and utility services
  │   └── utils/             # Utility functions/constants
  ├── package.json           # Project metadata and dependencies
  └── README.md              # This file
```

## Setup & Run
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. **Open your browser:**
   Go to [http://localhost:3000](http://localhost:3000)

## Notes
- Make sure to run the backend server (if needed) for full functionality.
- You can customize the dashboard sections by editing files in `src/components/Dashboard/`.

---

For any issues, please contact the project maintainer. 