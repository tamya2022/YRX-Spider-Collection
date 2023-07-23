// ==UserScript==
// @name         HOOK 二层函数名 end
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  day day up!
// @author       FY
// @include      *
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var source = ['decodeData','base64decode','md5','decode','btoa','MD5','RSA','AES','CryptoJS','encrypt','strdecode',"encode",'decodeURIComponent','_t','JSON.stringify','String.fromCharCode','fromCharCode'];
    console.log("开始测试是否有解密函数");
    let realCtx, realName;
    function getRealCtx(ctx, funcName) {
        let parts = funcName.split(".");
        let realCtx = ctx;
        for(let i = 0; i < parts.length - 1; i++) {
            realCtx = realCtx[parts[i]];
        }
        return realCtx;
    }
    function getRealName(funcName) {
        let parts = funcName.split(".");
        return parts[parts.length - 1];
    }
    function hook(ctx, funcName, level, originFunc) {
        ctx[funcName] = function(a){
            console.log("level:" + level + " function:" + funcName,a);
            let regexp = / [\S]*\(.*\)\;/g;
            let match = originFunc.toString().match(regexp)
            console.log(match);
            debugger;
            return originFunc(a);
        };
    }
    function test(ctx, level) {
        for(let i = 0; i < source.length; i++) {
            let f = source[i];
            let realCtx = getRealCtx(ctx, f);
            let realName = getRealName(f);
            let chars = realCtx[realName];
            hook(realCtx, realName, level, chars);
        }
    }
    test(window, 1);
})();