# start-dev.ps1 — start backend and frontend and open browser
# Usage: In PowerShell run: powershell -ExecutionPolicy Bypass -File .\start-dev.ps1

# Paths (adjust if your folders are in different locations)
$backendPath = "C:\Users\LENOVO\OneDrive\Desktop\node API"
$clientPath = "C:\Users\LENOVO\OneDrive\Desktop\React-frontend\Client"

# Start backend in a new PowerShell window
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd '$backendPath'; npm start"

# Start frontend in a new PowerShell window (forces IPv4 bind and port 5173)
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit","-Command","cd '$clientPath'; npm run dev"

# Wait a moment then open the browser to the fixed URL
Start-Sleep -Seconds 2
Start-Process "http://127.0.0.1:5173/"
