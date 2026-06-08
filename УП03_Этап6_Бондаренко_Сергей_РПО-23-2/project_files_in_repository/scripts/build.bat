@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting build
echo ========================================

call scripts\build_release.bat
if errorlevel 1 exit /b 1

echo Build completed successfully.
