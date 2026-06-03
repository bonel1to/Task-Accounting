# RELEASE_NOTES.md

## Версия

`v3-demo-pages`

Дата: 2026-06-03

## Что входит в релиз

- статическое приложение "Учёт задач команды";
- HTML/CSS/JavaScript без сборщика и backend;
- демонстрационные данные команды и задач;
- сохранение состояния через `localStorage`;
- GitHub Actions workflow для публикации на GitHub Pages;
- файлы `.env.production.example` и `.env.demo.example`;
- инструкции `DEPLOYMENT.md` и `DEMO_GUIDE.md`;
- BAT-скрипты для проверки, подготовки deploy и release-архива.

## Как запускать

Основной способ:

```text
https://bonel1to.github.io/Task-Accounting/
```

Локальный fallback:

```bat
scripts\build_release.bat
```

После сборки открыть архив из папки `release`.

## Известные ограничения

- данные хранятся только в браузере пользователя;
- многопользовательская синхронизация не реализована;
- backend и база данных отсутствуют;
- GitHub Pages публикует статический сайт, поэтому серверные логи отсутствуют, вместо них используются deploy logs GitHub Actions.
