!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(1);e.Actions=i.Actions;var o=r(2);e.Dispatcher=o.Dispatcher;var c=n(r(3));e.Store=c.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.dispatcher=t,this.list={},this.creatorsList={}}return t.prototype.create=function(e,r){var n=this;if(null==r&&(r=function(t){return(t=t.toLowerCase()).replace(/_\w/g,function(t){return t[1].toUpperCase()})}(e)),e in this.list)throw Error("Имя заданного действия уже существует");if(r in this.creatorsList)throw Error("Имя метода создания события уже существует");this.list[e]=e,this.creatorsList[r]=e,t.prototype[r]=function(t){n.dispatcher.dispatch({action:n.list[e],data:t})}},t}();e.Actions=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.id=0,this.callbacks={}}return t.prototype.dispatch=function(t){var e=this;Object.keys(this.callbacks).forEach(function(r){e.callbacks[r](t)})},t.prototype.register=function(t){if("function"==typeof t){var e="id_"+this.id;return this.id+=1,this.callbacks[e]=t,e}throw Error("Переданный в диспетчер cb не является функцией.")},t.prototype.unregister=function(t){if(!this.callbacks[t])throw Error("Не найден cb по заданному идентификатору.");delete this.callbacks[t]},t}();e.Dispatcher=n},function(t,e,r){"use strict";function n(t,e){void 0===e&&(e={});for(var r=0,i=Object.keys(t);r<i.length;r++){var o=i[r];Object(t[o])===t[o]&&t[o].constructor===Object?n(t[o],null!=e[o]?e[o]:e[o]={}):e[o]=t[o]}}function i(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var r={},i=0,o=t;i<o.length;i++){n(o[i],r)}return r}function o(t,e){var r=i(t);return new(function(){function t(){this.actionsId="",this.dispatcher=e,this.callbacks=[]}return t.prototype.registerActions=function(t){var e=this;this.actionsId=this.dispatcher.register(function(r){t(r),e.emitChange()})},t.prototype.unregisterActions=function(){this.dispatcher.unregister(this.actionsId)},t.prototype.emitChange=function(){this.callbacks.forEach(function(t){return t()})},t.prototype.addListener=function(t){this.callbacks.push(t)},t.prototype.removeListener=function(t){var e=this;this.callbacks.forEach(function(r,n){t===r&&e.callbacks.splice(n,1)})},t.prototype.getStore=function(){return i(r)},t.prototype.updateStore=function(t){r=i(r,t)},t}())}Object.defineProperty(e,"__esModule",{value:!0}),e.default={createStore:o},e.Store={createStore:o}}]);