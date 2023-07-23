// 处理正则
(function () {
    var _RegExp = RegExp;
    RegExp = function (pattern, modifiers) {
        console.log("Some codes are setting regexp");
        debugger;
        if (modifiers) {
            return _RegExp(pattern, modifiers);
        } else {
            return _RegExp(pattern);
        }
    };
    RegExp.toString = function () {
        return "function setInterval() { [native code] }"
    };
})();