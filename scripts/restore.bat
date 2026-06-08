@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\restore_report.txt

for /f "delims=" %%D in ('dir /b /ad /o-d backups\task-accounting_* 2^>nul') do (
  set LATEST=%%D
  goto :found
)

echo No backup directory found. Run scripts\backup.bat first.
exit /b 1

:found
set BACKUP_DIR=backups\%LATEST%

fc /B index.html "%BACKUP_DIR%\index.html" > nul
if errorlevel 1 (
  echo Restore verification failed: index.html differs from latest backup.
  exit /b 1
)

(
  echo Task-Accounting restore report
  echo Date: %DATE% %TIME%
  echo Checked backup directory: %BACKUP_DIR%
  echo.
  echo Restore verification method: binary comparison of current index.html with latest backup copy.
  echo Result: restore source is readable and project file matches backup.
  echo.
  echo For this static project, restore means copying backed-up files back to the repository directory.
) > "%REPORT%"

type "%REPORT%"
