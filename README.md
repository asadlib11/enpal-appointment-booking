# Enpal Appointment Booking System

A full-stack application for managing appointment bookings, built with React and Hono.js.

## 🚀 Tech Stack

### Backend
- **Framework**: Hono.js with TypeScript
- **API Documentation**: Swagger UI
- **Validation**: Zod
- **Development**: tsx for TypeScript execution

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI)
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Routing**: React Router

## 🛠 Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- Git

## 🏃‍♂️ Running with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/asadlib11/enpal-appointment-booking.git
   cd enpal-appointment-booking
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

This will start both the frontend and backend services:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## 💻 Development Setup

### Backend (API)

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at http://localhost:3000

### Frontend (Client)

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3001

## 📁 Project Structure

```
enpal-appointment-booking/
├── api/                    # Backend API
│   ├── src/               # Source code
│   ├── Dockerfile         # API Docker configuration
│   └── package.json       # API dependencies
├── client/                # Frontend application
│   ├── src/              # Source code
│   ├── public/           # Static files
│   ├── Dockerfile        # Client Docker configuration
│   └── package.json      # Client dependencies
└── docker-compose.yml     # Docker compose configuration
```

## 🔒 Environment Variables

### Backend
- `PORT`: API port (default: 3000)

### Frontend
- `PORT`: Client port (default: 3001)
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3000)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
