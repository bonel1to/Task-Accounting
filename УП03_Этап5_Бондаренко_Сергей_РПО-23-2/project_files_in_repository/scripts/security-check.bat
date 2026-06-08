@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports
set REPORT=reports\security_scan_report.txt

echo ========================================
echo Task-Accounting security check
echo ========================================

(
  echo Task-Accounting security check
  echo Date: %DATE% %TIME%
  echo.
  echo [1] Suspicious words in source/config files
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$matches = Select-String -Path 'index.html','script.js','styles.css','.env.example','.env.demo.example','.env.production.example' -Pattern 'password|secret|token|api_key|apikey|jwt|smtp|database_url' -CaseSensitive:$false; if ($matches) { $matches | ForEach-Object { '{0}:{1}: {2}' -f $_.Path,$_.LineNumber,$_.Line.Trim() } } else { 'No suspicious secrets found in source/config files.' }"
  echo.
  echo [2] Tracked .env files
  git ls-files | findstr /R /C:"^\.env$" /C:"[\\/]\\.env$"
  if errorlevel 1 echo No tracked real .env files found.
  echo.
  echo [3] Git status
  git status --short
  echo.
  echo Expected result: no real passwords, tokens, keys, database dumps or .env files in Git.
) > "%REPORT%" 2>&1

type "%REPORT%"
