@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist backups mkdir backups
if not exist reports mkdir reports

set TS=%DATE:~-4%%DATE:~3,2%%DATE:~0,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
set TS=%TS: =0%
set BACKUP_DIR=backups\task-accounting_%TS%
set REPORT=reports\backup_report.txt

mkdir "%BACKUP_DIR%"
copy /Y index.html "%BACKUP_DIR%\" > nul
copy /Y styles.css "%BACKUP_DIR%\" > nul
copy /Y script.js "%BACKUP_DIR%\" > nul
copy /Y README.md "%BACKUP_DIR%\" > nul
copy /Y .env.example "%BACKUP_DIR%\" > nul
copy /Y .env.demo.example "%BACKUP_DIR%\" > nul
copy /Y .env.production.example "%BACKUP_DIR%\" > nul

(
  echo Task-Accounting backup report
  echo Date: %DATE% %TIME%
  echo Backup directory: %BACKUP_DIR%
  echo.
  dir "%BACKUP_DIR%"
  echo.
  echo Static project has no database. Backup covers source files and safe environment examples.
) > "%REPORT%"

type "%REPORT%"
