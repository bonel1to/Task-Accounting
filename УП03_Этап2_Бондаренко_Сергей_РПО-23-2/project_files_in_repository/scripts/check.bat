@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting check
echo ========================================

where node > nul 2> nul
if errorlevel 1 (
  echo ERROR: Node.js is required for JavaScript syntax check.
  echo Install Node.js or skip this optional syntax check for local browser-only run.
  exit /b 1
)

node --check script.js
if errorlevel 1 (
  echo JavaScript syntax check failed.
  exit /b 1
)

echo JavaScript syntax check passed.
pause
