KISSY.add(function (S, Func) {
	var Pite = function(){
		
	};
	if(window.console){
		window.log = function(msg){
			console.log(msg);
		}
	}else{
		window.log = function(msg){
			alert(msg);
		}
	}
	Pite.prototype.require = function(mods, callback){
		if(!S.isArray(mods)){
			log('不是数组');
			return;
		}
		var queue = [];
		S.each(mods, function(item){
			queue.push('jbc/pite/v1/mods/' + item);
		});
		S.use(queue, callback);
	}

	return new Pite;
}, {
	requires: []
});