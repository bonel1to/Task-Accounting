@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

set VERSION=0.1.1
set RELEASE_DIR=release
set VERSIONED_RELEASE_FILE=%RELEASE_DIR%\task-accounting-v%VERSION%.zip

echo ========================================
echo Task-Accounting create release
echo ========================================

call scripts\release-check.bat
if errorlevel 1 exit /b 1

if not exist "%RELEASE_DIR%" mkdir "%RELEASE_DIR%"
if exist "%VERSIONED_RELEASE_FILE%" del "%VERSIONED_RELEASE_FILE%"

powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Force -Path 'index.html','styles.css','script.js','README.md','CHANGELOG.md','RELEASE_NOTES.md','SECURITY.md','.env.example','.env.demo.example','.env.production.example','docs','scripts' -DestinationPath '%VERSIONED_RELEASE_FILE%'"
if errorlevel 1 (
  echo Release archive creation failed.
  exit /b 1
)

echo Release archive created:
echo   %VERSIONED_RELEASE_FILE%
