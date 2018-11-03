import { Dispatcher, ICallbackStore, IPayload } from './Dispatcher';

export class Store {
  public actionsId: string;
  public dispatcher: Dispatcher;
  public callbacks: Array<() => void>;

  constructor(dispatcher: Dispatcher) {
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
}
