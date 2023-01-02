// 防止不断打印，占满内存
(function () {
    console._log = console.log;
    var _log = function (arg) {};
    Object.defineProperty(console, 'log', {
        value: _log
    })
})();
