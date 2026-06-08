@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports

set REPORT=reports\logs_tail.txt

echo ========================================
echo Task-Accounting logs check
echo ========================================

(
  echo Task-Accounting logs check
  echo Date: %DATE% %TIME%
  echo.
  echo Static GitHub Pages project has no server-side application logs.
  echo Quality evidence uses GitHub Actions deploy logs and browser DevTools Console.
  echo Expected result: no critical deploy errors in GitHub Actions and no critical red Console errors during the main scenario.
  echo.
  echo GitHub Actions workflow: Deploy static site to GitHub Pages
  echo Public URL: https://bonel1to.github.io/Task-Accounting/
) > "%REPORT%"

type "%REPORT%"
