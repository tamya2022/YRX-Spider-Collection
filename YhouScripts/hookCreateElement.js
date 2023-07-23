(function() {
    'use strict'
   var _createElement = document.createElement.bind(document);
   document.createElement = function(elm){
   // 这里做判断 是否创建了script这个元素    
   if(elm == 'body'){
        debugger;
   }
    return _createElement(elm);
}
})();