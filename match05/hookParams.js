// ==UserScript==
// @name         match05
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://match.yuanrenxue.com/match/5
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    var cookieTemp = "";
    Object.defineProperty(document,'cookie',{
        set:function (val) {
            if(val.indexOf("RM4hZBv0dDon443M=") != -1)
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
    Object.defineProperty(window, '_$ss', {
			set: function(cookie){
				debugger;
				console.log(cookie);
				return cookie;
			}
		});
})();