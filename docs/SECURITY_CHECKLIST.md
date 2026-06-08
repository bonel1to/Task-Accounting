# SECURITY_CHECKLIST.md

| Проверка | Статус | Доказательство | Что исправлено |
|---|---|---|---|
| `.env` не загружен в Git | выполнено | `01_gitignore_no_env.png`, `03_secret_scan_result.png` | В `.gitignore` добавлены `.env`, `.env.*`, исключения для безопасных example-файлов. |
| `.env.example` без реальных секретов | выполнено | `02_env_example_without_secrets.png` | Добавлен `.env.example` с примерными значениями без паролей и токенов. |
| Ручной поиск секретов выполнен | выполнено | `03_secret_scan_result.png`, `reports/security_scan_report.txt` | Подозрительные слова проверяются скриптом `scripts/security-check.bat`. |
| Зависимости проверены | выполнено | `04_dependency_check_result.png`, `reports/dependency_check_report.txt` | Проект не использует внешние пакеты, поэтому `npm audit`/`pip-audit` неприменимы. |
| Проверены роли | адаптировано | `05_roles_access_check.png` | В проекте нет серверной авторизации; описано как ограничение статического demo-приложения. |
| Проверен доступ к чужим данным | адаптировано | `06_foreign_data_access_denied.png` | Данные хранятся локально в `localStorage`, серверных чужих ресурсов нет. |
| CORS/hosts/debug проверены | выполнено | `07_cors_or_security_config.png` | В env-примерах `APP_DEBUG=false`, backend CORS отсутствует. |
| Backup создан | выполнено | `08_backup_created.png`, `reports/backup_report.txt` | Добавлен `scripts/backup.bat` для копии файлов проекта. |
| Restore проверен | выполнено | `09_restore_success.png`, `reports/restore_report.txt` | Добавлен `scripts/restore.bat` с проверкой последнего backup. |
| Открытые порты проверены | выполнено | `10_open_ports_check.png`, `reports/ports_check_report.txt` | Добавлен `scripts/ports-check.bat`; проект не открывает backend/DB-порты. |
| Логи проверены | выполнено | `11_logs_no_critical_errors.png`, `reports/security_logs_report.txt` | Добавлен `scripts/logs-security.bat`; источники логов: GitHub Actions и DevTools Console. |
