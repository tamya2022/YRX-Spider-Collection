// 访问器属性不包含数据值，他们包含一对getter和setter函数，读取访问器属性时会调用getter函数负责返回有效的值；在写入访问器属性时，会调用setter函数并传入新值。
// ==UserScript==
// @name         hook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Cookie 监控
    var cookie_cache = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get: function() {
            console.log('Getting cookie');
            return cookie_cache;
        },
        set: function(val) {
            console.log('Setting cookie', val);
            if (val.includes('Last-Event-ID')){
                debugger;
            }
            debugger;
            // 首个键值对
            var cookie = val.split(";")[0];

            var ncookie = cookie.split("=");

            var flag = false;

            var cache = cookie_cache.split("; ");
            // 把cache数组里的每一个值用该函数进行处理
            cache = cache.map(function(a){
                // 判断是否有重复的key则不写入
                if (a.split("=")[0] === ncookie[0]){
                    flag = true;
                    console.info("GET True")
                    return cookie;
                }
                return a;
            });
            cookie_cache = cache.join("; ");
            console.info("cookie_cache:",cookie_cache);
            // 新增新生成的cookie键值对到cookie_cache
            if (!flag){
                cookie_cache += cookie + "; ";
            }

            this._value = val;
            // 返回cookie
            return cookie_cache;
        },
    });

    //HOOK JSON stringify
    var rstringify = JSON.stringify;
    JSON.stringify = function(a){
        if (!!a.ua){
            //debugger;
        }
        console.log("Detect Json.stringify", a);
        return rstringify(a);
    }


})();

// hook eval
(function() {
    if (window.__cr_eval) return
    window.__cr_eval = window.eval
    var myeval = function (src) {
        console.log("================ eval begin: length=" + src.length + ",caller=" + (myeval.caller && myeval.caller.name) + " ===============")
        console.log(src);
        console.log("================ eval end ================")
        return window.__cr_eval(src)
    }
    var _myeval = myeval.bind(null)  // 注意：这句和下一句就是小花招本招了！
    // 增加toSring的属性避免检测
    _myeval.toString = window.__cr_eval.toString
    Object.defineProperty(window, 'eval', { value: _myeval })
    console.log(">>>>>>>>>>>>>> eval injected: " + document.location + " <<<<<<<<<<<<<<<<<<<")
})();

// hook Function
(function() {
    if (window.__cr_fun) return
    window.__cr_fun = window.Function
    var myfun = function () {
        var args = Array.prototype.slice.call(arguments, 0, -1).join(","), src = arguments[arguments.length - 1]
        console.log("================ Function begin: args=" + args + ", length=" + src.length + ",caller=" + (myfun.caller && myfun.caller.name) + " ===============")
        console.log(src);
        console.log("================ Function end ================")
        return window.__cr_fun.apply(this, arguments)
    }
    myfun.toString = function() { return window.__cr_fun + "" } // 小花招
    Object.defineProperty(window, 'Function', { value: myfun })
    console.log(">>>>>>>>>>>>>> Function injected: " + document.location + " <<<<<<<<<<<<<<<<<<<")
})();