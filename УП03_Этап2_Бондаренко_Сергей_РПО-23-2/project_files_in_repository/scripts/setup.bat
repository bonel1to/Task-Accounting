@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting setup
echo ========================================
echo Static project: no package installation is required.

if not exist index.html (
  echo ERROR: index.html not found.
  exit /b 1
)

if not exist styles.css (
  echo ERROR: styles.css not found.
  exit /b 1
)

if not exist script.js (
  echo ERROR: script.js not found.
  exit /b 1
)

echo Required project files found.
echo Setup completed successfully.
pause
