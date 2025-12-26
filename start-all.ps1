# start-all.ps1 - Start API (nodemon) and Client (Vite) in separate PowerShell windows
# Usage: Right-click -> Run with PowerShell, or run from PowerShell: .\start-all.ps1




Start-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","Set-Location -LiteralPath '$clientDir'; npm run dev" -WindowStyle Normal -WorkingDirectory $clientDir
n# Start Client server in new PowerShell window
n$clientDir = Join-Path $scriptDir 'client'n$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
n
n# Start API server in new PowerShell window
nStart-Process -FilePath "powershell" -ArgumentList "-NoExit","-Command","Set-Location -LiteralPath '$scriptDir'; npm run dev" -WindowStyle Normal -WorkingDirectory $scriptDir