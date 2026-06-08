# DEPLOYMENT.md

## 1. Где развернут проект

Вариант развертывания: GitHub Pages через GitHub Actions.

Публичный адрес после включения GitHub Pages:

```text
https://bonel1to.github.io/Task-Accounting/
```

Проект является статическим frontend-приложением: `index.html`, `styles.css`, `script.js`.
Backend, база данных и внешние runtime-зависимости не используются.

## 2. Требования

- Репозиторий GitHub: `https://github.com/bonel1to/Task-Accounting`
- GitHub Pages включен в настройках репозитория.
- Source для Pages: GitHub Actions.
- Ветка для публикации: `module-inspection-fixes` или `main`.
- Node.js используется только для проверки синтаксиса командой `node --check script.js`.

## 3. Переменные окружения

Настоящие секреты проекту не требуются. Для демонстрации добавлены безопасные примеры:

- `.env.production.example`
- `.env.demo.example`

Файлы содержат только публичные параметры демонстрации и не содержат паролей, токенов или ключей.

## 4. Команды развертывания

Локальная подготовка перед публикацией:

```bat
scripts\deploy.bat
```

Ручной вариант:

```bash
node --check script.js
git status
git push origin module-inspection-fixes
```

После push GitHub Actions запускает workflow `.github/workflows/pages.yml`.

## 5. Проверка доступности

После успешного workflow открыть:

```text
https://bonel1to.github.io/Task-Accounting/
```

Проверка из командной строки:

```bat
scripts\check_deploy.bat
```

Ожидаемый результат:

- страница открывается вне IDE;
- отображается интерфейс "Учёт задач команды";
- список задач, форма создания, канбан и карточка задачи доступны;
- в workflow нет критических ошибок.

## 6. Перезапуск и повторное развертывание

Для GitHub Pages перезапуск означает повторную публикацию статического сайта через GitHub Actions.

```bat
scripts\restart.bat
```

Скрипт проверяет проект и подсказывает выполнить push или вручную запустить новый workflow `Deploy static site to GitHub Pages` через кнопку `Run workflow` в разделе Actions.

Важно: для GitHub Pages не нужно нажимать `Re-run jobs` внутри уже выполненного run, если в этом run уже был создан artifact `github-pages`. В таком случае GitHub может найти несколько artifact с одинаковым именем и завершить deploy с ошибкой `Multiple artifacts named "github-pages"`.

## 7. Остановка

У GitHub Pages нет локального процесса или контейнера, который нужно останавливать. Отключение выполняется в настройках репозитория:

```text
Settings -> Pages -> Disable GitHub Pages
```

Для учебного этапа проверяется повторный deploy через Actions и доступность страницы после повторной публикации.
