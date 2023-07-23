// ==UserScript==
// @name         baidu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.example.com/*
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
    var cookieTemp = "";
    Object.defineProperty(document,'cookie',{
        set:function (val) {
            if(val.indexOf("RM4hZBv0dDon443M=") != -1)
            // if(val.indexOf("m=") != -1)
            {
                debugger;
            }
            console.log('Hook 捕获到cookie设置->',val);
            cookieTemp = val;
            return val;
        },
        get:function () {
            return cookieTemp;
        }
    });
    // Your code here...
})();


// 方式二：
var old_cookie = document.cookie;

Object.defineProperty(document, 'cookie', {
    get: function() {
        console.log('Getting cookie');
        return this._value;
    },
    set: function(val) {
        console.log('Setting cookie', arguments);
        this._value = val;
        return this._value;
    }
});

document.cookie = old_cookie;

// 方式二完善版：
var cookie_cache = document.cookie;

Object.defineProperty(document, 'cookie', {
    get: function() {
        console.log('Getting cookie');
        return cookie_cache;
    },
    set: function(val) {
        console.log("Seting cookie",val);
        var cookie = val.split(";")[0];
        var ncookie = cookie.split("=");
        var flag = false;
        var cache = cookie_cache.split("; ");
        cache = cache.map(function(a){
            if (a.split("=")[0] === ncookie[0]){
                flag = true;
                return cookie;
            }
            return a;
        })
    }
})