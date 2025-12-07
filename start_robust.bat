@echo off
REM Fix PATH so npm post-install scripts can find node
set "PATH=%PATH%;C:\Program Files\nodejs"

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
start "Lifeline AI - Backend" node backend\server.js

echo [4/4] Starting Frontend (Port 3001)...
cd frontend
start "Lifeline AI - Frontend" npm run dev

echo.
echo ==========================================
echo App starting at http://localhost:3001
echo ==========================================
pause
