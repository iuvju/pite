KISSY.add(function (S, Func) {
	var Pite = function(){
		
	};
	
	var func = new Func();
	
	Pite.prototype = S.mix(Pite.prototype, func);

	return Pite;
}, {
	requires: ['./mods/func']
});