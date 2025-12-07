@echo off
echo ==========================================
echo       Lifeline AI Setup Script
echo ==========================================

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend install failed.
    pause
    exit /b
)
cd ..

echo [2/4] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend install failed.
    pause
    exit /b
)
cd ..

echo [3/4] Starting Backend (Port 5001)...
start "Lifeline AI - Backend" cmd /k "cd backend && npm start"

echo [4/4] Starting Frontend (Port 3001)...
start "Lifeline AI - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo Setup Complete!
echo App should open at http://localhost:3001
echo ==========================================
pause
