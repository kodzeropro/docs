# Коды ошибок

При возникновении ошибки API возвращает JSON с описанием проблемы.

## Формат ошибки

```json
{
  "ok": false,
  "error": "<string>"
}
```

## Коды ошибок

### 400 Bad Request

| Код | Описание |
|-----|----------|
| `VALIDATION_ERROR` | Данные не прошли валидацию |
| `INVALID_REQUEST` | Неверный формат запроса |

### 401 Unauthorized

| Код | Описание |
|-----|----------|
| `UNAUTHORIZED` | Требуется авторизация |
| `INVALID_TOKEN` | Недействительный токен |
| `TOKEN_EXPIRED` | Токен истёк |

### 403 Forbidden

| Код | Описание |
|-----|----------|
| `FORBIDDEN` | Нет доступа к ресурсу |
| `METHOD_DISABLED` | Метод отключён в настройках |

### 404 Not Found

| Код | Описание |
|-----|----------|
| `NOT_FOUND` | Запись не найдена |
| `COLLECTION_NOT_FOUND` | Коллекция не найдена |

### 429 Too Many Requests

| Код | Описание |
|-----|----------|
| `RATE_LIMIT` | Превышен лимит запросов |

### 500 Internal Server Error

| Код | Описание |
|-----|----------|
| `INTERNAL_ERROR` | Внутренняя ошибка сервера |

## Обработка ошибок

Рекомендуется проверять поле `ok` в каждом ответе:

```javascript
const response = await fetch(url)
const data = await response.json()

if (!data.ok) {
  console.error(`Error: ${data.error}`)
  return
}

// Работа с data.result
```
