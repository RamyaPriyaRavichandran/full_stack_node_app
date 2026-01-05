# Sample Full-Stack Application for DevOps Learning

This is a sample three-tier application designed for learning DevOps practices and deployment.

## Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Port 3000)   │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Main Backend   │
│   (Port 5002)   │
└────────┬────────┘
         │ HTTP (Internal)
         ▼
┌─────────────────┐
│Internal Backend │
│   (Port 5001)   │
└─────────────────┘
```

## Components

### 1. Frontend (`/frontend`)

- React application
- Fetches data from Main Backend
- Displays a list of items
- Health check UI

### 2. Main Backend (`/backend`)

- Express.js API server
- Serves frontend requests
- Communicates with Internal Backend
- Endpoints:
  - `GET /api/health` - Health check
  - `GET /api/items` - Fetch items (aggregates data from internal backend)

### 3. Internal Backend (`/internal-backend`)

- Express.js service
- Only accessible by Main Backend (not exposed publicly)
- Endpoints:
  - `GET /health` - Health check
  - `GET /data` - Provides raw data

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Running Locally

1. **Start Internal Backend** (Terminal 1)

   ```bash
   cd internal-backend
   npm install
   npm start
   ```

2. **Start Main Backend** (Terminal 2)

   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Start Frontend** (Terminal 3)

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Main Backend: http://localhost:5002
   - Internal Backend: http://localhost:5001 (should not be publicly accessible in production)

## Environment Variables

### Backend

- `PORT` - Server port (default: 5002)
- `INTERNAL_BACKEND_URL` - Internal backend URL (default: http://localhost:5001)

### Internal Backend

- `PORT` - Server port (default: 5001)

### Frontend

- `REACT_APP_API_URL` - Main backend URL (default: http://localhost:5002)

## DevOps Learning Points

This application is designed to help you learn:

1. **Multi-service deployment** - Deploy three separate services
2. **Service communication** - Internal vs external networking
3. **Environment configuration** - Different configs for dev/staging/prod
4. **Health checks** - Monitor service availability
5. **Load balancing** - Scale individual services
6. **Container orchestration** - Docker and Kubernetes
7. **CI/CD pipelines** - Automated testing and deployment

## Next Steps for DevOps

1. **Dockerize** - Create Dockerfiles for each service
2. **Docker Compose** - Orchestrate all services locally
3. **Kubernetes** - Deploy to a K8s cluster
4. **CI/CD** - Set up GitHub Actions or Jenkins
5. **Monitoring** - Add Prometheus/Grafana
6. **Logging** - Centralized logging with ELK stack

