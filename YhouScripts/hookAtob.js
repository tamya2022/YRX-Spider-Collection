// ==UserScript==
// @name         Base64 hook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
    console.log("start...");
    var tmp_atob = window.atob;
    window.atob = function(param){
        var result = tmp_atob(param);
        console.log(`base64:${param} to ${result}`);
        return result;
    }
    // Your code here...
})();