@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting run
echo ========================================

if not exist index.html (
  echo ERROR: index.html not found.
  exit /b 1
)

echo Opening index.html in the default browser...
start "" "%cd%\index.html"
pause
