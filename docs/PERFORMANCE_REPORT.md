# PERFORMANCE_REPORT.md

## 1. Что проверяется

Проверяется web-интерфейс статического проекта `Task-Accounting`, опубликованный через GitHub Pages:

```text
https://bonel1to.github.io/Task-Accounting/
```

## 2. Инструменты

- Chrome DevTools Performance
- Lighthouse / встроенная диагностика браузера
- Network timing для `index.html`, `styles.css`, `script.js`
- `scripts\performance.bat` для фиксации HTTP-времени ответа главной страницы

## 3. Минимальная проверка

| Проверка | Ожидаемый результат | Статус |
|----------|---------------------|--------|
| Открытие GitHub Pages URL | HTTP 200 | passed |
| Загрузка `index.html` | Успешная загрузка | passed |
| Загрузка CSS/JS | `styles.css` и `script.js` доступны | passed |
| DevTools Performance | Есть замер открытия страницы | manual screenshot required |
| Lighthouse/Performance screenshot | Сохранен скриншот или HTML-отчет | manual screenshot required |

## 4. Вывод

Проект является легким статическим frontend-приложением без изображений, backend-запросов и тяжелой сборки. Минимальная HTTP-проверка GitHub Pages завершилась успешно с кодом 200. Основной риск производительности связан не с серверной частью, а с будущим ростом количества задач в `localStorage` и клиентским рендерингом списка/канбана.
