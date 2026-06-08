# INCIDENT_REPORT.md

## 1. Инцидент

В проекте отсутствовал отдельный CI/CD-контур сопровождения: не было `.github/workflows/ci.yml`, корневого `CHANGELOG.md`, корневого `RELEASE_NOTES.md` и единой команды `scripts\release-check.bat`.

## 2. Где обнаружено

Репозиторий `Task-Accounting`, ветка `support/ci-release-incident`. Проект развернут как статический frontend на GitHub Pages.

## 3. Как воспроизвести

1. Открыть репозиторий до исправления.
2. Проверить папку `.github/workflows`: есть deploy workflow, но нет отдельного CI workflow.
3. Попробовать выполнить `scripts\release-check.bat`.
4. Убедиться, что команды финальной release-проверки нет.

## 4. Диагностика

Проверены:

- `.github/workflows/pages.yml`;
- папка `scripts`;
- папка `docs`;
- release-архив из этапа 3;
- результаты тестирования и безопасности из этапов 4-5.

## 5. Причина

Ранее проект был подготовлен к запуску, деплою, тестированию и security-проверкам по отдельности. Но эти проверки не были собраны в единый support/release процесс, а GitHub Actions выполнял только деплой GitHub Pages.

## 6. Исправление

Добавлены:

- `.github/workflows/ci.yml`;
- `scripts\build.bat`;
- `scripts\release-check.bat`;
- `scripts\create-release.bat`;
- `CHANGELOG.md`;
- `RELEASE_NOTES.md`;
- `docs\RELEASE_CHECKLIST.md`.

## 7. Проверка

Команды:

```bat
scripts\release-check.bat
scripts\create-release.bat
```

Также проверяется GitHub Actions workflow `CI` при push и pull request.

## 8. Итог

Инцидент закрыт: проект получил повторяемую локальную release-проверку, отдельный CI workflow, changelog/release notes и release-архив версии `0.1.1`.
