@echo off
echo Starting URL Shortener Development Environment...

echo Starting backend server on port 5000...
start "Backend Server" cmd /k "set NODE_ENV=development && node -r tsx/register server/index.ts"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend server on port 5173...
start "Frontend Server" cmd /k "npm run dev:client"

echo Development environment started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop all servers...
pause > nul

echo Stopping servers...
taskkill /f /im node.exe > nul 2>&1
echo Development environment stopped.
