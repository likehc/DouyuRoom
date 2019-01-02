(function () { 
	var myJs = (function () { 
		var myJs = function (selector, context) { 
			return new myJs.prototype.init(selector, context); 
		}
		myJs.prototype.init = function (selector, context) { 
			var context = context || document; 
			var nodeList = context.querySelectorAll(selector); 
			this.length = nodeList.length; 
			for (var i = 0; i < this.length; i++) { 
				this[i] = nodeList[i]; 
			} 
			return this; 
		}
		myJs.prototype.each = function (callback, args) { 
			var length = this.length, i = 0; 
			if (args) { 
				while (i < length) { 
					callback.call(this[i], args); 
					i += 1; 
				} 
			} else { 
				while (i < length) { 
					callback.call(this[i]); 
					i += 1; 
				} 
			} 
			return this; 
		}
		myJs.prototype.html = function (value) { 
			if (typeof value == 'string') { 
				this.each(function () { 
					this.innerHTML = value; 
				}); 
				return this; 
			} else { 
				return this[0].innerHTML; 
			} 
		}
		myJs.prototype.init.prototype = myJs.prototype;
		return myJs; 
	})();
	window.myJs = myJs; 
})();


var Shaka = function(age) {
	return new Shaka.fn.init(age);
};

Shaka.fn = Shaka.prototype = { 
	init: function(age) {
		this.age = age; return this;
	},
	sayHello: function() {
		alert('I am a little baby, my age is ' + this.age + ' years old.');
	}
};

Shaka.fn.init.prototype = Shaka.fn;


#.fn.message = function () {
	return this;
}
var msg = #("#divMessage").message();