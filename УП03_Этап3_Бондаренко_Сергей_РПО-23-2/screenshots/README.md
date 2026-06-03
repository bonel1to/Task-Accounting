# Скриншоты этапа 3

По методичке нужно подготовить следующие файлы:

1. `01_env_production_or_demo.png` - файл `.env.production.example` или `.env.demo.example` без настоящих секретов.
2. `02_deploy_files.png` - deploy-файлы: `.github/workflows/pages.yml`, `docs/DEPLOYMENT.md`, scripts.
3. `03_deploy_command_success.png` - успешный запуск `scripts\deploy.bat` или GitHub Actions deploy log.
4. `04_service_or_build_started.png` - GitHub Actions workflow завершен успешно или release-архив собран.
5. `05_app_available.png` - приложение открыто по GitHub Pages URL.
6. `06_logs_without_critical_errors.png` - GitHub Actions logs без критических ошибок.
7. `07_main_scenario_works.png` - основной сценарий в приложении: создана/отредактирована задача.
8. `08_restart_success.png` - повторный запуск workflow или `scripts\restart.bat`.
9. `09_release_or_public_url.png` - публичная ссылка GitHub Pages или готовый release-архив.

Скриншоты добавляются после push, включения GitHub Pages и проверки публичной ссылки.
