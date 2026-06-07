# TEST_PLAN.md

## 1. Что проверяется

Проект: Task-Accounting / "Учёт задач команды"

Версия / ветка: `module-inspection-fixes`

Адрес развернутого проекта:

```text
https://bonel1to.github.io/Task-Accounting/
```

Тип проекта: статический web/frontend без backend, базы данных и внешнего API.

## 2. Основные сценарии

| ID | Сценарий | Ожидаемый результат | Инструмент | Статус |
|----|----------|---------------------|------------|--------|
| TC-01 | Открыть GitHub Pages URL | Страница открывается с кодом 200 | Browser / `api-test.bat` | passed |
| TC-02 | Проверить статические ресурсы | `index.html`, `styles.css`, `script.js` доступны | HTTP check / Network | passed |
| TC-03 | Проверить консоль браузера | Нет критических красных ошибок при открытии | Chrome DevTools Console | manual screenshot required |
| TC-04 | Создать задачу | Новая задача появляется в списке и карточке | UI smoke | manual screenshot required |
| TC-05 | Изменить статус задачи | Задача отображается в нужной колонке канбана | UI smoke | manual screenshot required |
| TC-06 | Добавить комментарий | Комментарий сохраняется у выбранной задачи | UI smoke | manual screenshot required |
| TC-07 | Проверить фильтры | Список и канбан показывают выбранный набор задач | UI smoke | manual screenshot required |
| TC-08 | Проверить localStorage | После перезагрузки данные сохраняются | Browser / DevTools | manual screenshot required |
| TC-09 | Проверить производительность | Есть Lighthouse/Performance-замер и краткий вывод | DevTools / Lighthouse | partly passed, Lighthouse screenshot required |
| TC-10 | Проверить логи развертывания | GitHub Actions logs без критических ошибок | GitHub Actions | passed |
| TC-11 | Запустить smoke-тесты одной командой | `scripts\test.bat` завершается без ошибок | BAT / Node | passed |
| TC-12 | Проверить ошибочный HTTP-сценарий | Несуществующий файл возвращает 404 и не ломает приложение | `api-test.bat` | passed |

## 3. Инструменты

- Chrome DevTools Console
- Chrome DevTools Network
- Chrome DevTools Performance / Lighthouse
- GitHub Actions deploy logs
- BAT-скрипты этапа 4
- Node.js syntax check: `node --check script.js`
- HTTP-проверки через PowerShell `Invoke-WebRequest`

## 4. Итог

Критичные ошибки: 0.

Некритичные ошибки: 4 замечания зафиксированы в `DEFECT_LOG.md`, блокирующих ошибок нет.

Вывод: проект считается готовым к дальнейшей эксплуатации, если публичная страница открывается, основной сценарий работает, в консоли и логах нет критических ошибок, а выявленные замечания занесены в `DEFECT_LOG.md`.
