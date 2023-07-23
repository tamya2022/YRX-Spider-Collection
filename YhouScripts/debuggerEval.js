(function() { 
    'use strict';
    var eval_ = window.eval;
    window.eval = function(x){
    	eval_(x.replace("debugger;","  ; "));
    };
    window.eval.toString = eval_.toString;
})();