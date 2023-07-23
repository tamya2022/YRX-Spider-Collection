var pre = window._pt_
object.defineProperty(window,'_pt_',{
	get:function() {
		console.log("Getting window._pt_");
		return pre;
	},
	set:function(val) {
		console.log('Setting window._pt_',val);
		debugger;
		pre = val;
	}
})

