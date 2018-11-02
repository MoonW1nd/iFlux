"use strict";
var idPrefix = 'id_';
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this._id = 0;
        this._callbacks = {};
    }
    Dispatcher.prototype.dispatch = function (payload) {
        var _this = this;
        Object.keys(this._callbacks).forEach(function (id) {
            _this._callbacks[id](payload);
        });
    };
    Dispatcher.prototype.register = function (cb) {
        if (typeof cb === "function") {
            var currentId = "" + idPrefix + this._id;
            this._id += 1;
            this._callbacks[currentId] = cb;
            return currentId;
        }
        else {
            throw Error("Переданный в диспетчер cb не является функцией.");
        }
    };
    Dispatcher.prototype.unregister = function (id) {
        if (this._callbacks[id]) {
            delete this._callbacks[id];
        }
        else {
            throw Error("Не найден cb по заданному идентификатору.");
        }
    };
    return Dispatcher;
}());
