@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\ports_check_report.txt

echo ========================================
echo Task-Accounting ports check
echo ========================================

(
  echo Task-Accounting ports check
  echo Date: %DATE% %TIME%
  echo.
  echo Static GitHub Pages deployment does not run a local backend service.
  echo Docker is not required for this project.
  echo.
  echo Windows listening ports:
  netstat -ano | findstr LISTENING
  echo.
  echo Expected project result: no additional backend/database ports opened by Task-Accounting.
) > "%REPORT%" 2>&1

type "%REPORT%"
