#!/bin/bash

# Quick Start Script for Sample Full-Stack App
# This script starts all three services in separate terminal windows

echo "🚀 Starting Sample Full-Stack Application..."
echo ""

# Check if we're on macOS (for opening new terminal windows)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📱 Opening services in new Terminal windows..."
    
    # Start Internal Backend
    osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'/internal-backend\" && echo \"🔒 Starting Internal Backend...\" && npm start"'
    
    # Wait a bit for internal backend to start
    sleep 2
    
    # Start Main Backend
    osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'/backend\" && echo \"🚀 Starting Main Backend...\" && npm start"'
    
    # Wait a bit for main backend to start
    sleep 2
    
    # Start Frontend
    osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'/frontend\" && echo \"⚛️  Starting React Frontend...\" && npm start"'
    
    echo ""
    echo "✅ All services are starting in separate terminal windows!"
    echo ""
    echo "📍 Service URLs:"
    echo "   - Frontend:          http://localhost:3000"
    echo "   - Main Backend:      http://localhost:5002"
    echo "   - Internal Backend:  http://localhost:5001"
    echo ""
    echo "💡 Tip: Wait for all services to fully start before accessing the frontend"
    
else
    # For Linux or other systems
    echo "⚠️  Auto-start only works on macOS"
    echo ""
    echo "Please start each service manually in separate terminals:"
    echo ""
    echo "Terminal 1 (Internal Backend):"
    echo "  cd internal-backend && npm start"
    echo ""
    echo "Terminal 2 (Main Backend):"
    echo "  cd backend && npm start"
    echo ""
    echo "Terminal 3 (Frontend):"
    echo "  cd frontend && npm start"
fi
