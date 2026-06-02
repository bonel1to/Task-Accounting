@echo off
chcp 65001 > nul
cd /d "%~dp0\.."

echo ========================================
echo Task-Accounting format
echo ========================================

where node > nul 2> nul
if errorlevel 1 (
  echo ERROR: Node.js is required for formatting.
  exit /b 1
)

node -e "const fs=require('fs'); for (const f of ['index.html','styles.css','script.js','README.md','INSTALL.md']) { if (!fs.existsSync(f)) continue; let s=fs.readFileSync(f,'utf8'); s=s.split(/\r?\n/).map(line=>line.trimEnd()).join('\n'); if (!s.endsWith('\n')) s+='\n'; fs.writeFileSync(f,s,'utf8'); console.log('formatted', f); }"

echo Formatting completed.
pause
