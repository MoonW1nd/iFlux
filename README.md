# [iFlux](https://moonw1nd.github.io/iFlux)

Легковесный фреймворк, реализующий Flux-подход.

![Flux](doc/assets/flux-graph-simple.png)

## API
### Dispatcher (Диспетчер)

Диспетчер — это менеджер всего этого процесса. Это центральный узел вашего приложения. Диспетчер получает на вход действия и рассылает эти действия (и связанные с ними данные) зарегистрированным обработчикам.

#### **Используемые интерфейсы**

```typescript
interface IPayload {
  action: string;
  data: any;
}
```

#### **Методы:**

|Имя|Тип принимаемых параметров|Описание|
| ------ | :---| :---- |
| dispatch( payload ) | IPayload | Вызывает все зарегистрированные обработчики действий хранилищ;|
| register( storeActionHandler ) | (IPayload) => void | Регистрирует обработчик действий хранилища и возвращает его id |
| unregister( id ) | string | Убирает регистрация обработчика действий хранилища |

### Store (Хранилище)

Хранилища управляют состоянием определенных частей предметной области вашего приложения : Хранилища хранят данные, методы получения этих данных и зарегистрированные в Диспетчере обработчики Действий.

В данной реализации это статический класс который имеет единственный метод который возвращает новое хранилище в котором данные хранятся в замыкании, и получение и обновление данных может происходить только через методы `getStore` и `updateStore`

#### Создание нового хранилища
```js
Store.createStore(store, dispatcher)
```

|Параметр |Тип принимаемых параметров|Описание|
| ------ | :---| :---- |
| store | any | начальное значение хранилище|
| dispatcher | Dispatcher | диспетчер с которым будет взаимодействовать хранилище |

#### **Методы возвращаемого класса:**

|Имя|Тип принимаемых параметров|Описание|
| ------ | :---| :---- |
| registerActions( storeActionHandler  ) | (IPayload) => void | Регистрация обработчиков действий в диспетчере |
| unregisterActions() | - | удаление обработчиков действий из диспетчера |
| addListener() | () => void | подписать обработчик управляющий изменением представления на изменение хранилища |
| removeListener() | () => void | отписать обработчик управляющий изменением представления на изменение хранилища |
| emitChange() | - | сообщить всем подписанным представлениям что хранилище изменилось |
| getStore() | - | получить текущее состояние хранилища |
| updateStore(value) | any | обновить состояние хранилища |

### Actions (Действия)

Действия класс помогающий удобно управлять действиями. Сам создает константы и функции actionCreators, как собственные методы.

#### Создание
```js
new Actions(dispatcher)
```

|Параметр |Тип принимаемых параметров|Описание|
| ------ | :---| :---- |
| dispatcher | Dispatcher | диспетчер в который будут отправляться действия |

#### **Методы:**

|Имя|Тип принимаемых параметров|Описание|
| ------ | :---| :---- |
| create( actionName, [actionCreatorName] ) | string, [string / null] | Создает действие и функцию actionCreator;|

> Если actionCreatorName не задан, то actionCreatorName будет равен переведенному actionName в camelCase. ('ADD_ITEM' -> 'addItem');

#### **Свойства:**

|Имя|Описание|
| ------ | :---|
| list | возвращает объект со всеми сохраненными действиями|
| creatorsList | возвращает объект со всеми сохраненными функциями actionCreator|
| dispatcher | возвращает привязанный диспетчер |


## Пример использования:
```js
import iFlux from 'path/to/iFlux';

const initialStore = {
  items: [],
}

// инициализируем нужные объекты
const Dispatcher = new iFlux.Dispatcher();
const Store = iFlux.Store.createStore(initialStore, Dispatcher);
const Actions = new iFlux.Actions(Dispatcher);

// создаем действие
Actions.create('ADD_ITEM');

// Подписываем обработчики действий хранилища к диспетчеру
Store.register((payload) => {
  switch (payload.actions) {
    case Actions.list.ADD_ITEM: {
      const newStoreValue = Store.getStore();
      newStoreValue.items.push(payload.data.item);
      Store.updateStore(newStoreValue);
      break;
    }
  }
});

// подписываем обновление представления на изменение хранилища
Store.addListener(() => {
  view.render();
})

// Добавляем функцию actionCreator куда это необходимо
button.addEventListener('click', () => {
  Actions.addItem('Item');
})

//  Теперь после клика мы получим
Store.getStore(); // => { item: ['Item'] }
```

