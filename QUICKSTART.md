# Sample Full-Stack Application - Quick Start Guide

## What You Have

A complete three-tier application with:

- **React Frontend** (port 3000)
- **Main Backend API** (port 5002)
- **Internal Backend Service** (port 5001)

## Running the Application

### Option 1: Automatic Start (macOS)

```bash
chmod +x start-all.sh
./start-all.sh
```

This will open three terminal windows, one for each service.

### Option 2: Manual Start

Open three separate terminals and run:

**Terminal 1 - Internal Backend:**

```bash
cd internal-backend
npm start
```

**Terminal 2 - Main Backend:**

```bash
cd backend
npm start
```

**Terminal 3 - Frontend:**

```bash
cd frontend
npm start
```

### Accessing the Application

Once all services are running:

- Open your browser to **http://localhost:3000**
- You should see a beautiful dark-themed UI with:
  - System health status
  - A catalog of items fetched from the backend

## Testing the API Endpoints

### Main Backend (Port 5002)

**Health Check:**

```bash
curl http://localhost:5002/api/health
```

**Get All Items:**

```bash
curl http://localhost:5002/api/items
```

**Get Specific Item:**

```bash
curl http://localhost:5002/api/items/1
```

### Internal Backend (Port 5001)

**Health Check:**

```bash
curl http://localhost:5001/health
```

**Get Raw Data:**

```bash
curl http://localhost:5001/data
```

## Architecture Flow

```
┌─────────────────────────────────┐
│     React Frontend (3000)       │
│  - Displays items               │
│  - Shows health status          │
│  - Modern dark UI               │
└────────────┬────────────────────┘
             │
             │ HTTP GET /api/items
             │ HTTP GET /api/health
             ▼
┌─────────────────────────────────┐
│   Main Backend API (5002)       │
│  - Serves frontend requests     │
│  - Processes/transforms data    │
│  - Aggregates from internal     │
└────────────┬────────────────────┘
             │
             │ HTTP GET /data
             │ HTTP GET /health
             ▼
┌─────────────────────────────────┐
│  Internal Backend (5001)        │
│  - Provides raw data            │
│  - Only accessed by main API    │
│  - Not exposed publicly         │
└─────────────────────────────────┘
```

## DevOps Learning Opportunities

This application is perfect for learning:

### 1. **Containerization**

- Create Dockerfiles for each service
- Build and run containers
- Use Docker Compose for orchestration

### 2. **Kubernetes Deployment**

- Create deployment manifests
- Set up services and ingress
- Configure internal vs external networking

### 3. **CI/CD Pipelines**

- Automated testing
- Build and push Docker images
- Deploy to staging/production

### 4. **Monitoring & Logging**

- Add Prometheus metrics
- Set up Grafana dashboards
- Centralized logging with ELK

### 5. **Service Mesh**

- Implement with Istio or Linkerd
- Service-to-service authentication
- Traffic management

### 6. **Environment Configuration**

- Different configs for dev/staging/prod
- Secret management
- Feature flags

## Next Steps

1.  **Test the application** - Make sure all three services work together
2.  **Create Dockerfiles** - Containerize each service
3.  **Set up Docker Compose** - Run all services with one command
4.  **Deploy to cloud** - Try AWS, GCP, or Azure
5.  **Add monitoring** - Implement health checks and metrics
6.  **Set up CI/CD** - Automate your deployment pipeline

## Troubleshooting

**Frontend can't connect to backend:**

- Make sure backend is running on port 5002
- Check browser console for errors

**Backend can't connect to internal backend:**

- Ensure internal backend is running on port 5001
- Check the INTERNAL_BACKEND_URL in backend/.env

**Port already in use:**

- Change ports in the .env files
- Update the proxy in frontend/package.json if needed

## Project Structure

```
sample-full-stack/
├── frontend/              # React application
│   ├── public/
│   ├── src/
│   │   ├── App.js        # Main component
│   │   ├── App.css       # Component styles
│   │   └── index.css     # Global styles
│   └── package.json
├── backend/               # Main backend API
│   ├── server.js         # Express server
│   └── package.json
├── internal-backend/      # Internal service
│   ├── server.js         # Express server
│   └── package.json
├── start-all.sh          # Quick start script
└── README.md             # This file
```

Enjoy learning DevOps! 🚀

