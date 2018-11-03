import Dispatcher, { ICallbackStore, IPayload } from './Dispatcher';

export default class Store {
  public dispatcherId: string;
  public dispatcher: Dispatcher;
  public callbacks: Array<() => void>;

  constructor(dispatcher: Dispatcher) {
    this.dispatcherId = '';
    this.dispatcher = dispatcher;
    this.callbacks = [];
  }

  public registerActions(actionsHandlers: (payload: IPayload) => {}): void {
    const resultFunction = (payload: IPayload) => {
      actionsHandlers(payload);

      this.emitChange();
    };

    this.dispatcherId = this.dispatcher.register(resultFunction);
  }

  public unregisterActions(): void {
    this.dispatcher.unregister(this.dispatcherId);
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
}
