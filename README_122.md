# FeatureFlow - Modern Feature Request Management System

FeatureFlow is a sophisticated, full-stack web application designed for streamlined feature request management. It provides a premium user experience with a modern "Glassmorphism" aesthetic, allowing users to submit requests and administrators to manage them through a centralized dashboard.

## 🚀 Project Overview

The application serves as a bridge between users and product teams. Users can propose new features, track their own submissions, and view their status. Administrators have high-level oversight, with the ability to approve, reject, or keep requests pending.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with Modern UI principles (Glassmorphism, CSS Variables, Flexbox/Grid)
- **State Management**: React Context API
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) with bcryptjs for password hashing
- **Environment**: Dotenv for secure configuration

## 📋 Core Features

### For Users
- **Secure Authentication**: Register and Login functionality.
- **Submit Requests**: Create detailed feature requests with titles and descriptions.
- **Personal Dashboard**: View a personalized list of submitted requests with real-time status updates.
- **Duplicate Prevention**: Backend validation ensures unique titles for feature requests.

### For Administrators
- **Global Overview**: Access to all feature requests submitted by all users.
- **Status Management**: Ability to update request status (Pending, Approved, Rejected).
- **User Data**: Visibility into who created each request (name and email).
- **Role-Based Access**: Secure admin-only routes protected by JWT middleware.

## 📂 Project Structure

```text
project/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic (auth, requests)
│   │   ├── middleware/     # JWT protection & role validation
│   │   ├── models/         # Mongoose schemas (User, FeatureRequest)
│   │   └── routes/         # API endpoint definitions
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance configuration
    │   ├── components/     # Reusable UI elements (Navbar)
    │   ├── context/        # Auth state management
    │   ├── pages/          # Full-page components (Dashboards, Auth)
    │   └── index.css       # Global design system & animations
```

## 🔐 Data Models

### User Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | User's full name |
| `email` | String | Unique email address (lowercase) |
| `password` | String | Hashed password |
| `role` | Enum | 'USER' or 'ADMIN' (Default: 'USER') |

### FeatureRequest Model
| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Unique title for the request |
| `description` | String | Detailed explanation |
| `status` | Enum | 'Pending', 'Approved', 'Rejected' |
| `createdBy` | ObjectId | Reference to the User who created it |

## 🌐 API Endpoints

### Auth Routes
- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Authenticate user and receive JWT.

### Request Routes
- `POST /api/requests`: Create a new request (Private/User).
- `GET /api/requests/my`: Get current user's requests (Private/User).
- `GET /api/requests`: Get all requests (Private/Admin).
- `PUT /api/requests/:id/status`: Update request status (Private/Admin).

## 🎨 Design System

FeatureFlow utilizes a premium dark-themed aesthetic characterized by:
- **Glassmorphism**: Translucent card backgrounds with `backdrop-filter: blur`.
- **Vibrant Accents**: Primary purple (`#8b5cf6`) with glowing effects.
- **Typography**: Inter for readability and Outfit for geometric headers.
- **Micro-animations**: Smooth transitions, hover scaling, and fade-in effects for an "alive" feel.

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sharanya0122/feature_req.git
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env with MONGODB_URI, JWT_SECRET, and PORT
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## ⚖️ License
Distributed under the ISC License.
