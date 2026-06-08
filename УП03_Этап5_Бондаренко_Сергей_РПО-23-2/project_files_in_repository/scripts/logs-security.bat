@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\security_logs_report.txt

(
  echo Task-Accounting security logs check
  echo Date: %DATE% %TIME%
  echo.
  echo Static GitHub Pages project has no server-side security log stream.
  echo Evidence sources:
  echo - GitHub Actions deployment logs
  echo - Browser DevTools Console during the main scenario
  echo - HTTP checks from stage 4
  echo.
  echo Expected result: no repeated fatal/error/traceback messages during deployment and UI scenario.
) > "%REPORT%"

type "%REPORT%"
