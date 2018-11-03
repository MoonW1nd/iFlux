var Store = /** @class */ (function () {
    function Store(dispatcher) {
        this.dispatcherId = '';
        this.dispatcher = dispatcher;
        this.callbacks = [];
    }
    Store.prototype.registerActions = function (actionsHandlers) {
        var _this = this;
        var resultFunction = function (payload) {
            actionsHandlers(payload);
            _this.emitChange();
        };
        this.dispatcherId = this.dispatcher.register(resultFunction);
    };
    Store.prototype.unregisterActions = function () {
        this.dispatcher.unregister(this.dispatcherId);
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
    return Store;
}());
export default Store;
