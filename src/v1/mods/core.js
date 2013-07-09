KISSY.add(function(){
	function F(){
		return this;
	}

	// Object.key 
	var object_key = function(){
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
	object_key();
	
	// 防抖方法
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate){
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow){
				func.apply(context, args);
			}
		};
	}
	

	// join 方法，根据浏览器自动选择最优的拼接方式
	function join(){
	
	}

	// 图片 data uri

	// CSS 3 动画


	F.prototype.debounce = debounce;
	F.prototype.join = join;
	return new F;
},{requires: []});