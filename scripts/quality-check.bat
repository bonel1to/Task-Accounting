@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting quality check
echo ========================================

call scripts\test.bat
if errorlevel 1 exit /b 1

call scripts\api-test.bat
if errorlevel 1 exit /b 1

call scripts\logs-check.bat
if errorlevel 1 exit /b 1

call scripts\performance.bat
if errorlevel 1 exit /b 1

echo Quality check completed successfully.
