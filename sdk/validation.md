# Валидация данных

Kodzero SDK предоставляет встроенную валидацию данных на основе собственной библиотеки [Validno](https://validno.kodzero.pro).

## Определение схемы

При создании модели укажите схему для валидации:

```js
const kittenSchema = {
  _id: { type: String },
  name: { type: String },
  color: { type: String, required: false},
  age: { type: Number }
}

const Kitten = kodzero.createModel({
  collection: 'kittens',
  schema: kittenSchema
})
```

## Поддерживаемые типы

| Тип     | Описание         |
|---------|------------------|
| String  | Строка           |
| Number  | Число            |
| Boolean | Булево значение  |
| Date    | Дата             |
| Array   | Массив           |
| Object  | Объект           |

## Опции валидации

### required

```js

const schema = {
  name: { type: String, required: false } // required: false / true
}

// Отсутствие значения приравнивается к required: true
const schema2 = {
  name: { type: String } // required: true
}
```

### Другие опции

См. документацию [Validno](https://validno.kodzero.pro)


## Валидация экземпляра

### Метод `validate()`

Используйте метод `validate()` для проверки данных:

```js
const kitten = new Kitten({
  _id: null,
  name: 'Барсик',
  color: null // значение отсутствует
})

const result = kitten.validate()

if (result.ok) {
  console.log('Данные корректны')
} else {
  console.log('Ошибки:', result.errors)
  console.log('Ошибки (строка):', result.joinErrors())
}
```

### Возвращаемое значение

```js
{
  ok: boolean,        // true если валидация прошла успешно
  errors: string[],   // массив ошибок
  joinErrors: () => string  // метод для объединения ошибок в строку
}
```

## Валидация без схемы

Если модель создана без схемы, метод `validate()` выбросит ошибку:

```js
const Kitten = kodzero.createModel<Kitten>({
  collection: 'kittens'
  // schema не указана
})

const kitten = new Kitten({ ... })
kitten.validate() // Error: No schema defined for validation
```