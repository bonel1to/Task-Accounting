@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting GitHub Pages deploy check
echo ========================================

node --check script.js
if errorlevel 1 (
  echo JavaScript syntax check failed.
  exit /b 1
)

echo JavaScript syntax check passed.
echo.
echo Next deployment step:
echo   git push origin module-inspection-fixes
echo.
echo GitHub Actions workflow:
echo   .github\workflows\pages.yml
echo.
echo Public URL after successful Pages deploy:
echo   https://bonel1to.github.io/Task-Accounting/
