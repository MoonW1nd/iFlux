import Dispatcher, { ICallbackStore, IPayload } from './Dispatcher';

class Store {
  public dispatcherId: string;
  public dispatcher: Dispatcher;
  public callbacks: Array<() => void>;

  constructor(dispatcher: Dispatcher) {
    this.dispatcherId = '';
    this.dispatcher = dispatcher;
    this.callbacks = [];
  }

  public registerActionsHandlers(actionsHandlers: (payload: IPayload) => {}): void {
    const resultFunction = (payload: IPayload) => {
      actionsHandlers(payload);

      this.emitChange();
    };

    this.dispatcherId = this.dispatcher.register(resultFunction);
  }

  public unregisterActionsHandlers(): void {
    this.dispatcher.unregister(this.dispatcherId);
  }

  public emitChange(): void {
    this.callbacks.forEach((callback) => callback());
  }
}
