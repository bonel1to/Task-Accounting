@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set RELEASE_DIR=release
set RELEASE_FILE=%RELEASE_DIR%\project_release.zip

echo ========================================
echo Task-Accounting release archive build
echo ========================================

node --check script.js
if errorlevel 1 (
  echo JavaScript syntax check failed.
  exit /b 1
)

if not exist "%RELEASE_DIR%" mkdir "%RELEASE_DIR%"
if exist "%RELEASE_FILE%" del "%RELEASE_FILE%"

powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Force -Path 'index.html','styles.css','script.js','README.md','.env.demo.example','docs','scripts' -DestinationPath '%RELEASE_FILE%'"
if errorlevel 1 (
  echo Release archive build failed.
  exit /b 1
)

echo Release archive created:
echo   %RELEASE_FILE%
