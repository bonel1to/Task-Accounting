@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

if not exist reports mkdir reports

set PUBLIC_URL=https://bonel1to.github.io/Task-Accounting/
set REPORT=reports\performance_report.txt

echo ========================================
echo Task-Accounting performance check
echo ========================================
echo Report: %REPORT%

powershell -NoProfile -ExecutionPolicy Bypass -Command "$url='%PUBLIC_URL%'; $sw=[System.Diagnostics.Stopwatch]::StartNew(); $r=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20; $sw.Stop(); $lines=@('Task-Accounting performance check', 'Date: ' + (Get-Date), 'URL: ' + $url, 'HTTP status: ' + [int]$r.StatusCode, 'Elapsed ms: ' + $sw.ElapsedMilliseconds, 'Content length: ' + $r.RawContentLength, '', 'For stage screenshots also attach Chrome DevTools Performance or Lighthouse result.'); $lines | Set-Content '%REPORT%' -Encoding UTF8; $lines"
if errorlevel 1 (
  echo Performance check failed.
  exit /b 1
)
