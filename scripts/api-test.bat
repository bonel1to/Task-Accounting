@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports

set PUBLIC_URL=https://bonel1to.github.io/Task-Accounting
set REPORT=reports\api_test_report.txt

echo ========================================
echo Task-Accounting HTTP/API adapted checks
echo ========================================
echo Report: %REPORT%

powershell -NoProfile -ExecutionPolicy Bypass -File "tests\api\http-check.ps1"
if errorlevel 1 (
  echo HTTP/API adapted checks failed.
  exit /b 1
)

echo HTTP/API adapted checks passed.
