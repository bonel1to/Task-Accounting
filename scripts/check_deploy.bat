@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set PUBLIC_URL=https://bonel1to.github.io/Task-Accounting/

echo ========================================
echo Task-Accounting deployment availability check
echo ========================================

node --check script.js
if errorlevel 1 (
  echo JavaScript syntax check failed.
  exit /b 1
)

echo Checking public URL:
echo %PUBLIC_URL%

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri '%PUBLIC_URL%' -UseBasicParsing -TimeoutSec 20; Write-Host ('HTTP status: ' + [int]$r.StatusCode); if ($r.StatusCode -lt 200 -or $r.StatusCode -ge 400) { exit 1 } } catch { Write-Host $_.Exception.Message; exit 1 }"
if errorlevel 1 (
  echo Public URL is not available yet. Check GitHub Pages settings and Actions logs.
  exit /b 1
)

echo Public URL is available.
