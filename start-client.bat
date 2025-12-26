@echo off
REM start-client.bat - Open a new terminal and start the Vite dev server on port 5000
REM Place this file in the project root and double-click it to run.

REM Change to the client directory (handles being run from any path)
cd /d "%~dp0client"

REM Wechsel ins Client-Verzeichnis
REM Öffne ein neues Fenster und starte den Vite-Devserver auf Port 5000
start "Vite Client" cmd /k "npm exec vite -- --port 5000"
exit /b
@echo off
REM start-client.bat - Open a new terminal and start the Vite dev server on port 5000
REM Place this file in the project root and double-click it to run.

REM Change to the client directory (handles being run from any path)
cd /d "%~dp0client"





pause
nREM The new window will stay open and show Vite logs. Close it when finished.start "Vite Client" cmd /k "npm exec vite -- --port 5000"nREM Open a new command window titled "Vite Client" and run Vite on port 5000