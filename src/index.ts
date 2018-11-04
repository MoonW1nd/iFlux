import {Actions} from './Actions';
import {Dispatcher} from './Dispatcher';
import Store from './Store';

interface IWindow extends Window {
  iFlux: any;
}

((libraryModule: () => void) => {
  if (typeof exports === 'object') {
    module.exports = libraryModule();
  } else if (window) {
    (window as IWindow).iFlux = libraryModule();
  } else {
    throw Error('Окружение не определено');
  }
})(() => ({ Actions, Dispatcher, Store }));
