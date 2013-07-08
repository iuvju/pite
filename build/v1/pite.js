/*
combined files : 

K
jbc/pite/v1/pite

*/
KISSY.add('K', function(){
	function K(){
		return this;
	}
	K.prototype.object_key = function(){
		if (!Object.keys){
			Object.keys = function(o) {
				if (o !== Object(o)){
					throw new TypeError('Object.keys called on a non-object');
				}
				var k=[],p;
				for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)){
					k.push(p);
				}
				return k;
			}
		}

		return Object.keys;
	}

	return K;
});
KISSY.add('jbc/pite/v1/pite',function (S, Func) {
	var Pite = function(){
		
	};
	
	var func = new Func();
	
	Pite.prototype = S.mix(Pite.prototype, func);

	return Pite;
}, {
	requires: ['./mods/func']
});
