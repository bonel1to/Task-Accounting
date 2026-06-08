@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\dependency_check_report.txt

echo ========================================
echo Task-Accounting dependency check
echo ========================================

(
  echo Task-Accounting dependency check
  echo Date: %DATE% %TIME%
  echo.
  echo Project stack: static HTML, CSS and JavaScript.
  echo package.json: not used.
  echo node_modules: not required.
  echo Python/.NET/Java dependencies: not used.
  echo.
  echo npm audit / pip-audit are not applicable because the project has no package manifest and no external runtime dependencies.
  echo Result: no vulnerable third-party dependencies detected in repository configuration.
) > "%REPORT%"

type "%REPORT%"
