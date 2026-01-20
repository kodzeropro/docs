# View All

Получение списка записей коллекции с поддержкой поиска, фильтрации и пагинации.

## Базовый запрос

```http
GET /v1/:project/:collection
```

## Query-параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `search` | string | — | Поиск по текстовым полям |
| `page` | number | `1` | Номер страницы |
| `perPage` | number | `25` | Количество записей на странице |
| `sort` | string | `createdAt` | Поле для сортировки. `-field` — по убыванию, `field` — по возрастанию |
| `fields` | string | — | Список полей для возврата, через запятую |
| `include` | string | — | Список связанных записей для включения, через запятую |

## Пример запроса

```http
GET https://api.kodzero.pro/v1/:project/:collection?search=phone&page=1&perPage=10&sort=-price&fields=title,price
```

## Ответ

```json
{
  "ok": true,
  "result": {
    "page": 1,
    "perPage": 10,
    "total": 42,
    "totalPages": 5,
    "found": [
      {
        "_id": "abc123",
        "title": "iPhone 15",
        "price": 999,
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `page` | Текущая страница |
| `perPage` | Записей на странице |
| `total` | Общее количество записей |
| `totalPages` | Общее количество страниц |
| `found` | Массив записей |
| `_include` | Связанные записи (если указан параметр `include`) |

## Поиск

Параметр `search` выполняет поиск по всем полям коллекции:

```http
GET /v1/:project/:collection?search=apple
```

## Пагинация

Для навигации по большим наборам данных используйте `page` и `perPage`:

```http
# Первая страница, 25 записей
GET /v1/:project/:collection?page=1&perPage=25

# Вторая страница
GET /v1/:project/:collection?page=2&perPage=25
```

::: tip :bulb: Подсказка
В [Kodzero SDK](/sdk/) доступны удобные методы для работы с пагинацией и получением списка записей.
:::

## Сортировка

Параметр `sort` позволяет упорядочить записи по любому полю:

```http
# По возрастанию цены
GET /v1/:project/:collection?sort=price

# По убыванию цены
GET /v1/:project/:collection?sort=-price

# По дате создания (по умолчанию)
GET /v1/:project/:collection?sort=createdAt
```

## Выбор полей

Параметр `fields` позволяет запросить только необходимые поля, уменьшив размер ответа:

```http
# Только название и цена
GET /v1/:project/:collection?fields=title,price

# С ID (всегда включается)
GET /v1/:project/:collection?fields=title,price,_id
```

::: tip :pushpin: Имейте в виду
Поле `_id` включается автоматически, даже если не указано в `fields`.
:::

## Связанные записи

Параметр `include` позволяет включить связанные записи в один запрос.

Допустим, в коллекции есть поля типа **Связь**:
- `category` — связь типа **single** (одна категория)
- `tags` — связь типа **multiple** (несколько тегов)

```http
# Включить категорию
GET /v1/:project/:collection?include=category

# Включить несколько связей
GET /v1/:project/:collection?include=category,tags
```

Связанные записи возвращаются в поле `_include`:

```json
{
  "result": {
    "found": [...],
    "_include": {
      "category": [
        { "_id": "cat1", "name": "Electronics" }
      ],
      "tags": [
        { "_id": "tag1", "name": "Mobile" },
        { "_id": "tag2", "name": "Apple" }
      ]
    }
  }
}
```

## Фильтрация

::: info <IconBeta/>Бета-версия
Фильтрация по полям работает в бета-режиме с ограничениями.
:::

Любое поле коллекции можно использовать для фильтрации, указав его как query-параметр:

### Точное совпадение

```http
# Поиск по имени
GET /v1/:project/:collection?name=apple

# Поиск по цене
GET /v1/:project/:collection?price=999
```

### Тип поля: Текст

Для текстовых полей поддерживается поиск по нескольким значениям (логическое ИЛИ):

```http
# Поиск товаров с названием "apple" ИЛИ "samsung"
GET /v1/:project/:collection?brand=apple,samsung

# Поиск по статусу "active" ИЛИ "draft"
GET /v1/:project/:collection?status=active,draft
```

### Тип поля: Число

Поддерживается только точное совпадение:

```http
# Товары с ценой 999
GET /v1/:project/:collection?price=999

# Товары с рейтингом 5
GET /v1/:project/:collection?rating=5
```

### Тип поля: Да/Нет

Для булевых полей укажите нужное значение:

```http
# Только активные записи
GET /v1/:project/:collection?active=true

# Только неактивные записи
GET /v1/:project/:collection?active=false
```

::: tip :bulb: Подсказка
Чтобы получить все записи (и `true`, и `false`), просто не указывайте булево поле в фильтре.
:::

### Тип поля: Список

Для полей типа массив поддерживается поиск "содержит одно из значений". Можно передать как одно значение, так и несколько через запятую:

```http
# Записи, которые содержат "male"
GET /v1/:project/:collection?sex=male

# Записи, которые содержат "male" ИЛИ "female"
GET /v1/:project/:collection?sex=male,female

# Записи с языком "english"
GET /v1/:project/:collection?language=english

# Записи с языками "english" ИЛИ "russian"
GET /v1/:project/:collection?language=english,russian
```

### Комбинирование фильтров

Можно комбинировать несколько фильтров (логическое И):

```http
# Активные товары бренда Apple с ценой 999
GET /v1/:project/:collection?active=true&brand=apple&price=999
```

### Ограничения бета-версии

- **Дата и время**: Фильтрация по датам пока не поддерживается
- **Число**: Только точное совпадение (без диапазонов и нескольких значений через запятую)
