# RELEASE_NOTES.md

## Релиз 0.1.1

### Что изменилось

Релиз добавляет минимальный контур сопровождения проекта: CI workflow, локальную release-проверку, создание release-архива и документы для инцидента поддержки.

### Что исправлено

До этапа 6 у проекта был deploy workflow для GitHub Pages, но не было отдельного CI, который проверяет изменения при push и pull request. Также не было корневого `CHANGELOG.md`, корневого `RELEASE_NOTES.md` и единой команды финальной проверки перед релизом.

### Как проверить

1. Запустить локально:

```bat
scripts\release-check.bat
```

2. Проверить, что GitHub Actions workflow `CI` завершился успешно.
3. Создать release-архив:

```bat
scripts\create-release.bat
```

4. Открыть `release\task-accounting-v0.1.1.zip` и убедиться, что внутри есть frontend-файлы, документы и scripts.

### Ограничения

- Проект остается статическим frontend-приложением без backend/API.
- GitHub Release или tag создаются вручную после успешного PR/merge.
