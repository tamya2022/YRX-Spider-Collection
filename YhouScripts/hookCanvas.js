// hook canvas
(function() {
    'use strict';
    let create_element = document.createElement.bind(document);

    document.createElement = function (_element) {
        console.log("create_element:",_element);
        if (_element === "canvas") {
            debugger;
        }
        return create_element(_element);
    }
})();
