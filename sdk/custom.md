# Кастомные методы

Kodzero SDK позволяет расширять модели собственными методами для реализации бизнес-логики.

## Регистрация метода

Используйте статический метод `registerMethod()` для добавления кастомных методов к модели:

```js
Kitten.registerMethod('methodName', function() {
  // Внутри метода доступен this — экземпляр модели
  const data = this.data()
  // ...
})
```

## Простой пример

```ts
interface Kitten {
  _id: string | null
  name: string
  color: string
  age: number
}

const Kitten = kodzero.createModel<Kitten>({
  collection: 'kittens'
})

// Регистрируем кастомный метод
Kitten.registerMethod('getDescription', function() {
  const data = this.data()
  return `${data.name} (${data.color}, ${data.age} мес.)`
})

// Использование
const kitten = await Kitten.get('kitten_id')
console.log(kitten.getDescription()) // "Барсик (серый, 3 мес.)"
```

## Типизация кастомных методов

Для полной поддержки TypeScript создайте интерфейс для кастомных методов:

```ts
// Интерфейс данных
interface Kitten {
  _id: string | null
  name: string
  color: string
  age: number
  weight: number
}

// Интерфейс кастомных методов
interface KittenMethods {
  getDescription: () => string
  isAdult: () => boolean
  applyWeightGain: (grams: number) => number
}

// Создаём модель с обоими типами
const Kitten = kodzero.createModel<Kitten, KittenMethods>({
  collection: 'kittens'
})

// Регистрируем методы
Kitten.registerMethod('getDescription', function() {
  const data = this.data()
  return `${data.name} (${data.color}, ${data.age} мес.)`
})

Kitten.registerMethod('isAdult', function() {
  return this.data().age >= 12
})

Kitten.registerMethod('applyWeightGain', function(grams: number) {
  const weight = this.data().weight
  return weight + grams
})

// Теперь TypeScript знает о кастомных методах
const kitten = await Kitten.get('kitten_id')
kitten.getDescription()      // ✅ TypeScript знает тип возвращаемого значения
kitten.isAdult()            // ✅
kitten.applyWeightGain(200) // ✅
// kitten.unknownMethod()   // ❌ Ошибка компиляции
```

## Практические примеры

### Форматирование данных

```ts
interface Kitten {
  _id: string | null
  name: string
  breed: string
  color: string
}

interface KittenMethods {
  getFullName: () => string
  getInitials: () => string
  formatBreed: () => string
}

const Kitten = kodzero.createModel<Kitten, KittenMethods>({
  collection: 'kittens'
})

Kitten.registerMethod('getFullName', function() {
  const { name, breed } = this.data()
  return `${name} (${breed})`
})

Kitten.registerMethod('getInitials', function() {
  const { name, breed } = this.data()
  return `${name[0]}${breed[0]}`.toUpperCase()
})

Kitten.registerMethod('formatBreed', function() {
  return this.data().breed.toLowerCase()
})
```

### Вычисляемые свойства

```ts
interface Kitten {
  _id: string | null
  toys: Array<{ name: string; price: number; quantity: number }>
  discount: number
}

interface KittenMethods {
  getToysSubtotal: () => number
  getDiscount: () => number
  getToysTotal: () => number
  getToyCount: () => number
}

const Kitten = kodzero.createModel<Kitten, KittenMethods>({
  collection: 'kittens'
})

Kitten.registerMethod('getToysSubtotal', function() {
  return this.data().toys.reduce((sum, toy) => {
    return sum + (toy.price * toy.quantity)
  }, 0)
})

Kitten.registerMethod('getDiscount', function() {
  const subtotal = this.getToysSubtotal()
  return subtotal * (this.data().discount / 100)
})

Kitten.registerMethod('getToysTotal', function() {
  return this.getToysSubtotal() - this.getDiscount()
})

Kitten.registerMethod('getToyCount', function() {
  return this.data().toys.reduce((count, toy) => count + toy.quantity, 0)
})

// Использование
const kitten = await Kitten.get('kitten_id')
console.log('Подитог:', kitten.getToysSubtotal())
console.log('Скидка:', kitten.getDiscount())
console.log('Итого:', kitten.getToysTotal())
console.log('Игрушек:', kitten.getToyCount())
```

### Бизнес-логика

```ts
interface Kitten {
  _id: string | null
  name: string
  status: 'sleeping' | 'playing' | 'eating'
  age: number
  favoriteFood: string
}

interface KittenMethods {
  isSleeping: () => boolean
  isAdult: () => boolean
  canPlay: () => boolean
  getStatusLabel: () => string
}

const Kitten = kodzero.createModel<Kitten, KittenMethods>({
  collection: 'kittens'
})

Kitten.registerMethod('isSleeping', function() {
  return this.data().status === 'sleeping'
})

Kitten.registerMethod('isAdult', function() {
  return this.data().age >= 12
})

Kitten.registerMethod('canPlay', function() {
  return this.data().status !== 'sleeping'
})

Kitten.registerMethod('getStatusLabel', function() {
  const labels = {
    sleeping: 'Спит',
    playing: 'Играет',
    eating: 'Кушает'
  }
  return labels[this.data().status]
})

// Использование
const kittens = await Kitten.findMany()
const sleepingKittens = []
for (const kittenData of kittens) {
  const kitten = await Kitten.get(kittenData._id)
  if (kitten.isSleeping()) sleepingKittens.push(kitten)
}
```

## Доступ к данным в методах

Внутри кастомного метода:

- `this.data()` — получить текущие данные
- `this.set(key, value)` — изменить данные
- `this.save()` — сохранить изменения
- `this.update()` — обновить документ
- `this.delete()` — удалить документ
- `this.validate()` — валидировать данные

```ts
interface Kitten {
  _id: string | null
  name: string
  food: string
  weight: number
}

interface KittenMethods {
  feed: (food: string, grams: number) => Promise<void>
  isHungry: () => boolean
}

const Kitten = kodzero.createModel<Kitten, KittenMethods>({
  collection: 'kittens'
})

Kitten.registerMethod('feed', async function(food: string, grams: number) {
  this.set('food', food)
  this.set('weight', this.data().weight + grams)
  await this.update()
})

Kitten.registerMethod('isHungry', function() {
  return this.data().weight < 2000 // например, меньше 2 кг
})

// Использование
const kitten = await Kitten.get('kitten_id')

if (kitten.isHungry()) {
  await kitten.feed('корм', 100)
}
```
