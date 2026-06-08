@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports

echo ========================================
echo Task-Accounting smoke tests
echo ========================================
echo Report: reports\smoke_test_report.txt

(
  echo Task-Accounting smoke tests
  echo Date: %DATE% %TIME%
  echo.
  echo [1] Checking required files...
) > reports\smoke_test_report.txt

for %%F in (index.html styles.css script.js README.md) do (
  if not exist "%%F" (
    echo Missing required file: %%F
    echo Missing required file: %%F >> reports\smoke_test_report.txt
    exit /b 1
  )
  echo Found %%F
  echo Found %%F >> reports\smoke_test_report.txt
)

echo.
echo [2] Checking JavaScript syntax...
echo. >> reports\smoke_test_report.txt
echo [2] Checking JavaScript syntax... >> reports\smoke_test_report.txt
node --check script.js >> reports\smoke_test_report.txt 2>&1
if errorlevel 1 (
  echo JavaScript syntax check failed.
  exit /b 1
)

echo.
echo [3] Checking expected UI markers...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$html = Get-Content 'index.html' -Raw -Encoding UTF8; $js = Get-Content 'script.js' -Raw -Encoding UTF8; $checks = @('task-form','task-list','kanban-board','task-detail','localStorage','validateTaskInput'); foreach ($c in $checks) { if (($html + $js) -notmatch [regex]::Escape($c)) { Write-Host ('Missing marker: ' + $c); exit 1 } else { Write-Host ('Found marker: ' + $c) } }" >> reports\smoke_test_report.txt 2>&1
if errorlevel 1 (
  echo UI marker check failed.
  exit /b 1
)

echo Smoke tests passed.
echo Smoke tests passed. >> reports\smoke_test_report.txt
