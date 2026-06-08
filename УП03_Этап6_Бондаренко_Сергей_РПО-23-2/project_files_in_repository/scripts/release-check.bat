@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\release_check_report.txt

echo ========================================
echo Task-Accounting release check
echo ========================================

(
  echo Task-Accounting release check
  echo Date: %DATE% %TIME%
  echo.
  echo [1] Smoke tests
) > "%REPORT%"

call scripts\test.bat >> "%REPORT%" 2>&1
if errorlevel 1 (
  type "%REPORT%"
  exit /b 1
)

echo. >> "%REPORT%"
echo [2] Quality check >> "%REPORT%"
call scripts\quality-check.bat >> "%REPORT%" 2>&1
if errorlevel 1 (
  type "%REPORT%"
  exit /b 1
)

echo. >> "%REPORT%"
echo [3] Security check >> "%REPORT%"
call scripts\security-check.bat >> "%REPORT%" 2>&1
if errorlevel 1 (
  type "%REPORT%"
  exit /b 1
)

echo. >> "%REPORT%"
echo [4] Dependency check >> "%REPORT%"
call scripts\deps-check.bat >> "%REPORT%" 2>&1
if errorlevel 1 (
  type "%REPORT%"
  exit /b 1
)

echo. >> "%REPORT%"
echo [5] Build release archive >> "%REPORT%"
call scripts\build.bat >> "%REPORT%" 2>&1
if errorlevel 1 (
  type "%REPORT%"
  exit /b 1
)

echo. >> "%REPORT%"
echo Release check passed. >> "%REPORT%"
type "%REPORT%"
