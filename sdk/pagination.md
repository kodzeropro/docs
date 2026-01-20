# Пагинация

При работе с большими наборами данных важно использовать пагинацию. Kodzero SDK предоставляет удобные инструменты для постраничной навигации.

## Базовая пагинация

### Метод `findMany`
Для простой пагинации используйте параметры `page` и `perPage`:

```js
// Первая страница, 10 записей
const page1 = await Kitten.findMany({
  page: 1,
  perPage: 10
})

// Вторая страница
const page2 = await Kitten.findMany({
  page: 2,
  perPage: 10
})
```

## Продвинутая пагинация

### Метод `findManyPaginated`
Для полноценной работы с пагинацией используйте `findManyPaginated`, который возвращает объект `PaginatedResult`:

```js
const result = await Kitten.findManyPaginated({}, 1, 25)

// Данные
console.log(result.data)  // массив котят

// Состояние пагинации
console.log(result.state.page)       // текущая страница
console.log(result.state.total)      // всего документов
console.log(result.state.totalPages) // всего страниц
console.log(result.state.limit)      // документов на странице
console.log(result.state.left)       // осталось документов
```

### Объект PaginatedResult

| Свойство        | Тип      | Описание                        |
|-----------------|----------|---------------------------------|
| data            | T[]      | Массив документов текущей страницы |
| state.page      | number   | Номер текущей страницы          |
| state.total     | number   | Общее количество документов     |
| state.totalPages| number   | Общее количество страниц        |
| state.limit     | number   | Количество документов на страницу |
| state.skip      | number   | Количество пропущенных документов |
| state.left      | number   | Количество оставшихся документов |

## Навигация по страницам

`PaginatedResult` предоставляет методы для навигации:

```js
const result = await Kitten.findManyPaginated({}, 1, 25)

// Переход к следующей странице
await result.next()
console.log(result.data)        // данные новой страницы
console.log(result.state.page)  // 2

// Переход к предыдущей странице
await result.previous()
console.log(result.state.page)  // 1
```

## Примеры использования

### Простой список с пагинацией

```ts
async function loadKittens(page: number = 1) {
  const result = await Kitten.findManyPaginated({}, page, 25)
  
  return {
    kittens: result.data,
    pagination: {...result.state}
  }
}
```
## Комбинирование с фильтрами

Пагинацию можно комбинировать с другими параметрами запроса:

```js
const result = await Kitten.findManyPaginated(
  {
    search: 'Барсик',
    sort: '-age',
    fields: ['name', 'color', 'age']
  },
  1,  // страница
  25  // на страницу
)
```
