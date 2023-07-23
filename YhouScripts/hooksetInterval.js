(function () {
    setInterval_ = setInterval;
    console.log("原函数已被重命名为setInterval_")
    setInterval = function (a,b) {
    	if(a.toString().indexOf("debugger")!=-1{
			return null;
		}
		_setInterval(a,b);
    };
    setInterval.toString = function () {
        console.log("有函数正在检测setInterval是否被hook");
        return setInterval_.toString();
    };
})();