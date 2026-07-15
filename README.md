# MERN Justdial Clone

A full-stack MERN business directory application similar to Justdial.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Auth:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repo and install dependencies:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

2. Set up environment variables:

```bash
# Server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Seed the database with categories and admin user:

```bash
cd server
npm run seed
```

4. Start the development servers:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Default Admin Credentials

- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get profile |
| GET | `/api/auth/users` | Get all users (admin) |
| DELETE | `/api/auth/users/:id` | Delete user (admin) |

### Businesses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/businesses` | Get all (with search/filter) |
| GET | `/api/businesses/:id` | Get single business |
| POST | `/api/businesses` | Create business |
| PUT | `/api/businesses/:id` | Update business |
| DELETE | `/api/businesses/:id` | Delete business |
| GET | `/api/businesses/user/mine` | Get user's businesses |
| GET | `/api/businesses/admin/all` | Get all (admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category (admin) |
| PUT | `/api/categories/:id` | Update category (admin) |
| DELETE | `/api/categories/:id` | Delete category (admin) |

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import repo on Vercel
3. Set root directory to `client`
4. Build command: `npm run build`
5. Output: `dist`

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables

## Project Structure

```
MERN_Justdial/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
└── README.md
```
