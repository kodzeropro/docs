# Модели данных

Модели — это основа работы с данными в <strong>Kodzero SDK</strong>. Они предоставляют объектно-ориентированный интерфейс для взаимодействия с коллекциями вашего бэкенда в стиле Active Record.

## Создание модели

### Базовый синтаксис

```js
const Kitten = kodzero.createModel({
  collection: 'kittens'
})
```

### С TypeScript-типами

```ts
// Определяем интерфейс данных
interface Kitten {
  _id: string | null
  name: string
  color: string
  age?: number
  createdAt?: Date
  updateAt?: Date
}

// Создаём типизированную модель
const Kitten = kodzero.createModel<Kitten>({
  collection: 'kittens'
})
```

### Со схемой валидации

>Для валидации данных используется пакет Validno. Подробнее: [validno.kodzero.pro](https://validno.kodzero.pro)

```js
const kittenSchema = {
  _id: { type: String },
  name: { type: String },
  color: { type: String, required: false },
  age: { type: Number }
}

const Kitten = kodzero.createModel<Kitten>({
  collection: 'kittens',
  schema: kittenSchema
})
```

## Работа с экземплярами
### Создание экземпляра

Рассмотрим пример создания новой записи в коллекции

```js
// Создание нового документа
const kitten = new Kitten({
  _id: null, // null для новых документов
  name: 'Снежок',
  color: 'белый'
})

// На этом этапе запись еще не создана
// в коллекции, но мы можем посмотреть её 
// данные:

kitten.data()
// { _id: null, name: 'Снежок', color: 'белый' }

// Чтобы сохранить запись в коллекции
await kitten.save()
```

### save()
Сохраняет документ. Если `_id` не указан (или равен `null`), будет создан новый документ. Если `_id` есть — произойдет обновление существующего документа:

```js
// Новый документ (создание)
const kitten = new Kitten({
  _id: null,
  name: 'Снежок'
})

await kitten.save() // создаёт новую запись

console.log(kitten.data()._id) // теперь _id заполнен

// Обновление существующего документа
kitten.set('name', 'Снежище')

await kitten.save() // обновляет запись по _id
```

#### create()
Явно создаёт новый документ:

```js
await kitten.create()
```

### update()
Явно обновляет существующий документ:

```js
await kitten.update()
```

::: warning
Метод `update()` требует наличия `_id`. Если `_id` отсутствует, будет выброшена ошибка.
:::

### delete()
Удаляет документ из коллекции:

```js
const deleted = await kitten.delete()

if (deleted) {
  console.log('Документ удалён')
}
```

### validate()
Валидирует данные по схеме (если схема была указана при создании модели):

```js
const result = kitten.validate()

if (result.ok) {
  console.log('Данные корректны')
} else {
  console.log('Ошибки:', result.joinErrors())
}
```

>Подробнее о механизме валидации: [validno.kodzero.pro](https://validno.kodzero.pro)

## Статические методы

Статические методы позволяют работать с коллекцией напрямую, без создания экземпляра.

### get(id)
Получает документ по ID и возвращает экземпляр модели:

```js
const kitten = await Kitten.get('kitten_id')

// kitten — это экземпляр модели с методами
kitten.set('name', 'Новое имя')
await kitten.save()
```

### find(id)
Получает документ по ID и возвращает простой объект:

```js
const kittenData = await Kitten.find('kitten_id')

// kittenData — это просто объект с данными
console.log(kittenData.name)
```

### findMany(options?)
Получает список документов:

```js
const kittens = await Kitten.findMany({
  page: 1,
  perPage: 25,
  search: 'Барсик',
  sort: '-createdAt',  // минус означает по убыванию
  fields: ['name', 'color']  // только указанные поля
})
```

**Параметры:**

| Параметр | Тип      | Описание                              |
|----------|----------|---------------------------------------|
| page     | number   | Номер страницы (начиная с 1)          |
| perPage  | number   | Количество документов на страницу      |
| search   | string   | Поисковый запрос                      |
| sort     | string   | Поле для сортировки (префикс - для убывания) |
| fields   | string[] | Список полей для возврата              |

### findManyPaginated(options?, page?, perPage?)
Получает список документов с информацией о пагинации:

```js
const result = await Kitten.findManyPaginated({}, 1, 25)

console.log(result.data)        // массив документов
console.log(result.state.page)  // текущая страница
console.log(result.state.total) // общее количество документов
```

Подробнее см. раздел «Пагинация».

### create(data)
Создаёт новый документ:

```js
const newKitten = await Kitten.create({
  name: 'Мурка',
  color: 'черный'
})

console.log(newKitten._id) // 'generated_id'
```

### update(id, data)
Обновляет документ по ID:

```js
const updatedKitten = await Kitten.update('kitten_id', {
  name: 'Новое имя'
})
```

### delete(id)
Удаляет документ по ID:

```js
const deleted = await Kitten.delete('kitten_id')
// deleted: true
```

## Полный пример

```js
// Импортируем Kodzero SDK
import Kodzero from 'kodzero-sdk'

// Создаём экземпляр клиента
const kodzero = new Kodzero({
  host: 'https://api.kodzero.pro/demo',
  authCollection: 'auth'
})

// Описываем интерфейс данных (TypeScript)
interface Kitten {
  _id: string | null
  name: string
  color: string
  age?: number
}

// Описываем схему для валидации
const kittenSchema = {
  _id: { type: String },
  name: { type: String, required: true },
  color: { type: String },
  age: { type: Number }
}

// Создаём типизированную модель с валидацией
const Kitten = kodzero.createModel<Kitten>({
  collection: 'kittens',
  schema: kittenSchema
})

// Создаём новый экземпляр (документ)
const kitten = new Kitten({
  _id: null, // null для новых документов
  name: 'Снежок',
  color: 'белый',
  age: 1
})

// Проверяем данные перед сохранением
const validation = kitten.validate()
if (!validation.ok) {
  // Выводим ошибки, если есть
  console.log('Ошибки:', validation.joinErrors())
}

// Сохраняем документ (создание)
await kitten.save()
console.log(kitten.data()._id) // теперь _id заполнен

// Изменяем данные
kitten.set('name', 'Снежище')
kitten.set({ color: 'серый', age: 2 })

// Сохраняем изменения (обновление)
await kitten.save()

// Получаем документ по ID (экземпляр модели)
const foundKitten = await Kitten.get(kitten.data()._id)
console.log(foundKitten.data())

// Получаем документ по ID (простой объект)
const kittenData = await Kitten.find(kitten.data()._id)
console.log(kittenData.name)

// Получаем список документов
const kittens = await Kitten.findMany({
  page: 1,
  perPage: 10,
  search: 'Снежок',
  sort: '-createdAt',
  fields: ['name', 'color']
})
console.log(kittens)

// Удаляем документ
const deleted = await kitten.delete()
if (deleted) {
  console.log('Документ удалён')
}
```