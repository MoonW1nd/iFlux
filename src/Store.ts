import { Dispatcher, ICallbackStore, IPayload } from './Dispatcher';

const createFrozen = (object: any, extension = {}) => {
  if (Object(object) !== object) { throw new Error('первый аргумент должен быть объектом'); }
  if (Object(extension) !== extension) { throw new Error('второй аргумент должен быть объектом'); }

  return Object.freeze({ ...object, ...extension });
};

function createStore(store: any, dispatcher: Dispatcher) {

  let STORE = createFrozen(store);

  class Store {
    public actionsId: string;
    public dispatcher: Dispatcher;
    public callbacks: Array<() => void>;

    constructor() {
      this.actionsId = '';
      this.dispatcher = dispatcher;
      this.callbacks = [];
    }

    public registerActions(actionsHandlers: (payload: IPayload) => {}): void {
      const resultFunction = (payload: IPayload) => {
        actionsHandlers(payload);

        this.emitChange();
      };

      this.actionsId = this.dispatcher.register(resultFunction);
    }

    public unregisterActions(): void {
      this.dispatcher.unregister(this.actionsId);
    }

    public emitChange(): void {
      this.callbacks.forEach((callback) => callback());
    }

    public addListener(callback: () => void) {
      this.callbacks.push(callback);
    }

    public removeListener(callback: () => void) {
      this.callbacks.forEach((registeredCallback, index) => {
        if (callback === registeredCallback) {
          this.callbacks.splice(index, 1);
        }
      });
    }

    public getStore() {
      return STORE;
    }

    public updateStore(value: any) {
      STORE = createFrozen(STORE, value);
    }
  }

  return new Store();
}

export {
  createStore,
};
