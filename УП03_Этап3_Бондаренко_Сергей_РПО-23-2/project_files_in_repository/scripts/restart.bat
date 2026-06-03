@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting GitHub Pages redeploy
echo ========================================

node --check script.js
if errorlevel 1 (
  echo JavaScript syntax check failed. Redeploy is not recommended.
  exit /b 1
)

echo Local check passed.
echo.
echo To restart the deployed demo, rerun the GitHub Actions workflow:
echo   Actions - Deploy static site to GitHub Pages - Run workflow
echo.
echo Alternative: push a new commit to trigger deploy automatically.
