// ==UserScript==
// @name         stringify
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var stringify = JSON.stringify;
    JSON.stringify = function(s) {
        console.log('JSON.stringify=>',s)
        debugger
        return stringify(s)
    }
    JSON.stringify.toString = function(){
        console.log("你这招太low了...")
        return stringify.toString();
    }
    // Your code here...
})();

// TestCase //
// var info = {
//     name:"reverse",
//     password:"12312312"
// };
// var fstr = JSON.stringify.toString();
// console.log(fstr);

// if(fstr == "function stringify() { [native code] }") {
//     var jstr = JSON.stringify(info);
// } else {
//     console.log("太菜了！");
// }

// JSON.stringify 的作用是将一个对象转换为字符串