(function () {
    'use strict';
    Function.prototype.constructor_ = Function.prototype.constructor;
    Function.prototype.constructor = function (x) {
        if (x === "debugger") {
            return function () {

            }
        }
        return Function.prototype.constructor_(x);
    }
    window.setInterval_ = setInterval;
    setInterval = function (x, x2) {
        if (x2 != 0x7d0) {
            return window.setInterval_(x, x2);
        }
    }

    // Your code here...
})();