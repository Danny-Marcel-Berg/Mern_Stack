@echo off
REM start-all.bat - Opens two new Command windows and starts the API (nodemon) and Client (Vite)
REM Place this file in the project root and double-click it to start both servers.

cd /d "%~dp0"
start "Client (Vite)" cmd /k "cd /d "%~dp0client" && npm run dev"
start "API Server" cmd /k "cd /d "%~dp0" && npm run dev"

exit /b 0
@echo off
REM start-all.bat - Opens two new Command windows and starts the API (nodemon) and Client (Vite)
REM Place this file in the project root and double-click it to start both servers.









exit /b 0
nREM Exit this launcher scriptstart "Client (Vite)" cmd /k "cd /d "%~dp0client" & npm run dev"
nREM Start Client dev server (runs `npm run dev` inside client folder)start "API Server" cmd /k "cd /d "%~dp0" & npm run dev"
nREM Start API server (runs `npm run dev` in project root)cd /d "%~dp0"nREM Ensure we are in the repository root