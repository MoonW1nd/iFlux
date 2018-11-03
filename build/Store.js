"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var createFrozen = function (object, extension) {
    if (extension === void 0) { extension = {}; }
    if (Object(object) !== object) {
        throw new Error('первый аргумент должен быть объектом');
    }
    if (Object(extension) !== extension) {
        throw new Error('второй аргумент должен быть объектом');
    }
    return Object.freeze(__assign({}, object, extension));
};
function createStore(store, dispatcher) {
    var STORE = createFrozen(store);
    var Store = /** @class */ (function () {
        function Store() {
            this.actionsId = '';
            this.dispatcher = dispatcher;
            this.callbacks = [];
        }
        Store.prototype.registerActions = function (actionsHandlers) {
            var _this = this;
            var resultFunction = function (payload) {
                actionsHandlers(payload);
                _this.emitChange();
            };
            this.actionsId = this.dispatcher.register(resultFunction);
        };
        Store.prototype.unregisterActions = function () {
            this.dispatcher.unregister(this.actionsId);
        };
        Store.prototype.emitChange = function () {
            this.callbacks.forEach(function (callback) { return callback(); });
        };
        Store.prototype.addListener = function (callback) {
            this.callbacks.push(callback);
        };
        Store.prototype.removeListener = function (callback) {
            var _this = this;
            this.callbacks.forEach(function (registeredCallback, index) {
                if (callback === registeredCallback) {
                    _this.callbacks.splice(index, 1);
                }
            });
        };
        Store.prototype.getStore = function () {
            return STORE;
        };
        Store.prototype.updateStore = function (value) {
            STORE = createFrozen(STORE, value);
        };
        return Store;
    }());
    return new Store();
}
exports.createStore = createStore;
