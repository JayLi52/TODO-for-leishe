# setup-server.ps1
# Ensure this script runs with administrator privileges

# Define project paths
$ProjectRoot = "$(Get-Location)"
$ServerDir = "$ProjectRoot\server"
$MockDir = "$ProjectRoot\mock"
$DBFile = "$MockDir\db.json"

# Install Node.js (if not already installed)
Write-Host "Checking Node.js installation..."
if (-Not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Node.js..."
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi" -OutFile "node-setup.msi"
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i node-setup.msi /quiet /norestart" -Wait
    Remove-Item "node-setup.msi"
}

# Create directories if needed
Write-Host "Setting up directories..."
if (-Not (Test-Path $ServerDir)) { New-Item -ItemType Directory -Path $ServerDir }
if (-Not (Test-Path $MockDir)) { New-Item -ItemType Directory -Path $MockDir }

# Create db.json if it doesn't exist
if (-Not (Test-Path $DBFile)) {
    Write-Host "Creating mock database..."
    @'
{
  "tasks": [
    {
      "id": "3835",
      "title": "xx ggf",
      "status": "Completed",
      "timestamp": "2024-12-09T08:43:54.980Z"
    },
    {
      "id": "1733734074177",
      "title": "zda",
      "status": "To-Do",
      "timestamp": "2024-12-09T08:47:54.177Z"
    }
  ]
}
'@ | Out-File -Encoding utf8 -FilePath $DBFile
}

# Install dependencies
Write-Host "Installing dependencies..."
npm init -y
npm install express

# Copy server code
Write-Host "Setting up server code..."
$ServerCode = @"
$(Get-Content -Path "$ProjectRoot\server\index.js")
"@
Set-Content -Path "$ServerDir\index.js" -Value $ServerCode

# Run the server
Write-Host "Starting the server..."
Start-Process -NoNewWindow "node" "$ServerDir\index.js"
