@echo off
REM start-client-run.bat - Start the client dev server (Vite)
REM Place this file in the project root and double-click it to run the client.

cd /d "%~dp0client"
REM Open a new command window and run the client dev script
start "Vite Client" cmd /k "cd /d "%~dp0client" & npm run dev"

exit /b 0
