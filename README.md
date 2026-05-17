# 🌍 TravelShare

**TravelShare** is a collaborative web platform that allows travellers from all over the world to share real experiences, recommendations, prices, and transport information — without commercial influence.

🔗 **Live Demo**: [https://travelshare-app.onrender.com](https://travelshare-app.onrender.com)

> ⚠️ The server runs on a free plan and may take up to 60 seconds to wake up after inactivity. Please wait a moment if the page loads slowly.

---

##  Features

-  **Secure authentication** — JWT tokens + bcrypt password hashing
-  **Create posts** with text, images and videos (up to 10 files per post)
-  **Like posts** and access your liked posts from your profile
-  **Comments with threaded replies** — reply directly to comments
-  **Delete your own posts and comments** with confirmation modal
-  **Filter posts** by country, experience type and price range
-  **Real-time direct messaging** via Socket.io
-  **Online presence indicators** for active users
-  **Unread message notifications** in the navbar
-  **User profiles** with avatar, bio, country and posts history
-  **Email notifications** to admin when a new user registers (via Resend)
-  **Deployed on Render** (frontend + backend)

---

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Context API (AuthContext, PostContext, MessageContext)
- Socket.io-client

### Backend
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Socket.io
- JWT Authentication
- Bcrypt
- Multer + Cloudinary (image & video uploads)
- Resend (email notifications)
- Helmet, CORS, express-rate-limit

### Testing
- Selenium WebDriver (Firefox) — automated authentication tests
- Postman — API REST endpoint testing

### Deployment
- **Frontend**: Render Static Site → [https://travelshare-app.onrender.com](https://travelshare-app.onrender.com)
- **Backend**: Render Web Service → [https://travelshare-api.onrender.com](https://travelshare-api.onrender.com)
- **Database**: MongoDB Atlas
- **Media storage**: Cloudinary

---

## 📁 Project Structure

```
travelshare-platform/
├── client/                          # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/              # Main components
│   │   │   ├── Feed.tsx
│   │   │   ├── CreatePost.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Messages.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── contexts/                # Global state management
│   │   │   ├── AuthContext.tsx
│   │   │   ├── PostContext.tsx
│   │   │   └── MessageContext.tsx
│   │   ├── services/                # API communication
│   │   │   ├── authService.ts
│   │   │   └── postService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── App.tsx
│   └── package.json
│
├── server/                          # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   │   ├── cloudinary.ts
│   │   │   └── email.ts
│   │   └── server.ts
│   └── package.json
│
└── tests/                           # Automated Selenium tests
    ├── auth.test.js
    └── package.json
```

---

##  Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Resend account (for email notifications)

### 1. Clone the repository

```bash
git clone https://github.com/userMFarias/travelshare-platform.git
cd travelshare-platform
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=your_email@example.com
```

Start the backend:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs on `http://localhost:3000`

---

##  Running Selenium Tests

Make sure both the server and client are running, then:

```bash
cd tests
npm install
npm test
```

> ⚠️ Before running the tests, delete the user `selenium@test.com` from MongoDB Atlas if it already exists.

The test suite covers:
- ✅ TC-01 — Register with valid data
- ✅ TC-02 — Register with duplicate email
- ✅ TC-03 — Login with correct credentials
- ✅ TC-04 — Login with incorrect password

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login | ❌ |
| POST | `/api/auth/logout` | Logout | ✅ |
| GET | `/api/users/profile` | Get current user profile | ✅ |
| PUT | `/api/users/update` | Update profile | ✅ |
| PUT | `/api/users/credentials` | Update email/password | ✅ |
| GET | `/api/users/search` | Search users by username | ✅ |
| GET | `/api/posts` | Get all posts | ✅ |
| POST | `/api/posts` | Create post | ✅ |
| DELETE | `/api/posts/:id` | Delete post | ✅ |
| POST | `/api/posts/:id/like` | Toggle like | ✅ |
| POST | `/api/posts/:id/comments` | Add comment | ✅ |
| DELETE | `/api/posts/:id/comments/:cid` | Delete comment | ✅ |
| POST | `/api/posts/:id/comments/:cid/replies` | Add reply | ✅ |
| GET | `/api/posts/filter` | Filter posts | ✅ |
| GET | `/api/messages` | Get conversations | ✅ |
| POST | `/api/messages` | Send message | ✅ |
| GET | `/api/messages/:userId` | Get messages with user | ✅ |
| POST | `/api/upload/image` | Upload profile image | ✅ |
| POST | `/api/upload/media` | Upload post media | ✅ |

---

