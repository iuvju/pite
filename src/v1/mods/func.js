KISSY.add(function(){
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