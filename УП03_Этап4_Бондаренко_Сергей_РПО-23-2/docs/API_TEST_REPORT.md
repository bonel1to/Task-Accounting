# API_TEST_REPORT.md

## 1. Особенность проекта

В проекте `Task-Accounting` нет backend API, базы данных, Swagger, Postman-коллекции и серверных маршрутов. Приложение является статическим frontend-проектом и публикуется через GitHub Pages.

Поэтому API-проверки этапа 4 адаптированы под HTTP-проверку публичной страницы и статических ресурсов.

## 2. Проверяемые HTTP-сценарии

| ID | Запрос | Ожидаемый результат | Инструмент | Статус |
|----|--------|---------------------|------------|--------|
| API-01 | `GET /Task-Accounting/` | HTTP 200, главная страница доступна | `api-test.bat` / Browser | passed |
| API-02 | `GET /Task-Accounting/styles.css` | HTTP 200, CSS доступен | `api-test.bat` / Network | passed |
| API-03 | `GET /Task-Accounting/script.js` | HTTP 200, JS доступен | `api-test.bat` / Network | passed |
| API-04 | `GET /Task-Accounting/not-found-file.js` | HTTP 404, ошибочный сценарий обработан GitHub Pages | `api-test.bat` | passed |

## 3. Почему нет Postman/Swagger

Postman и Swagger применяются к backend/API-проектам. В данном проекте серверных endpoint нет, а пользовательские данные хранятся в `localStorage`. Поэтому проверка качества выполняется через UI, DevTools, Network, GitHub Pages HTTP-ответы и smoke-скрипты.

## 4. Вывод

Публичный контур проекта проверяется как статический web-ресурс. Успешным результатом считается доступность страницы и основных assets, а также корректная обработка отсутствующего ресурса через HTTP 404.
