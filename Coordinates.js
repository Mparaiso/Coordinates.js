(function () { "use strict";
var $_, $hxClasses = {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Coordinates = function() { }
$hxClasses["Coordinates"] = Coordinates;
Coordinates.__name__ = ["Coordinates"];
Coordinates.main = function() {
}
Coordinates.getRandomColor = function() {
	var color = 256 + Math.random() * 256 * 256 + Math.random() * 256 * 256 * 256;
	return color;
}
$hxExpose(Coordinates.getRandomColor, "Coordinates.getRandomColor");
Coordinates.prototype = {
	__class__: Coordinates
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.add(this.matchedLeft());
			buf.add(f(this));
			s = this.matchedRight();
		}
		buf.b[buf.b.length] = s == null?"null":s;
		return buf.b.join("");
	}
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
var IntIter = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIter"] = IntIter;
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
Reflect.prototype = {
	__class__: Reflect
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
var StringBuf = function() {
	this.b = new Array();
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	a.remove("__class__");
	a.remove("__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__properties__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
Type.prototype = {
	__class__: Type
}
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,_nodeName: null
	,_nodeValue: null
	,_attributes: null
	,_children: null
	,_parent: null
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getParent: function() {
		return this._parent;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.push(x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = this._children.remove(x);
		if(b) x._parent = null;
		return b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.insert(pos,x);
	}
	,toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "<";
			s.add(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b[s.b.length] = " ";
				s.b[s.b.length] = k == null?"null":k;
				s.b[s.b.length] = "=\"";
				s.add(this._attributes.get(k));
				s.b[s.b.length] = "\"";
			}
			if(this._children.length == 0) {
				s.b[s.b.length] = "/>";
				return s.b.join("");
			}
			s.b[s.b.length] = ">";
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.add(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "</";
			s.add(this._nodeName);
			s.b[s.b.length] = ">";
		}
		return s.b.join("");
	}
	,__class__: Xml
	,__properties__: {get_parent:"getParent",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",set_nodeName:"setNodeName",get_nodeName:"getNodeName"}
}
var com = {}
com.somerandomdude = {}
com.somerandomdude.coordy = {}
com.somerandomdude.coordy.constants = {}
com.somerandomdude.coordy.constants.GridLayoutDirection = function() { }
$hxClasses["com.somerandomdude.coordy.constants.GridLayoutDirection"] = com.somerandomdude.coordy.constants.GridLayoutDirection;
com.somerandomdude.coordy.constants.GridLayoutDirection.__name__ = ["com","somerandomdude","coordy","constants","GridLayoutDirection"];
com.somerandomdude.coordy.constants.GridLayoutDirection.prototype = {
	__class__: com.somerandomdude.coordy.constants.GridLayoutDirection
}
com.somerandomdude.coordy.constants.LatticeAlternationPattern = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeAlternationPattern"] = com.somerandomdude.coordy.constants.LatticeAlternationPattern;
com.somerandomdude.coordy.constants.LatticeAlternationPattern.__name__ = ["com","somerandomdude","coordy","constants","LatticeAlternationPattern"];
com.somerandomdude.coordy.constants.LatticeAlternationPattern.prototype = {
	__class__: com.somerandomdude.coordy.constants.LatticeAlternationPattern
}
com.somerandomdude.coordy.constants.LatticeOrder = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeOrder"] = com.somerandomdude.coordy.constants.LatticeOrder;
com.somerandomdude.coordy.constants.LatticeOrder.__name__ = ["com","somerandomdude","coordy","constants","LatticeOrder"];
com.somerandomdude.coordy.constants.LatticeOrder.prototype = {
	__class__: com.somerandomdude.coordy.constants.LatticeOrder
}
com.somerandomdude.coordy.constants.LatticeType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeType"] = com.somerandomdude.coordy.constants.LatticeType;
com.somerandomdude.coordy.constants.LatticeType.__name__ = ["com","somerandomdude","coordy","constants","LatticeType"];
com.somerandomdude.coordy.constants.LatticeType.prototype = {
	__class__: com.somerandomdude.coordy.constants.LatticeType
}
com.somerandomdude.coordy.constants.LayoutType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LayoutType"] = com.somerandomdude.coordy.constants.LayoutType;
com.somerandomdude.coordy.constants.LayoutType.__name__ = ["com","somerandomdude","coordy","constants","LayoutType"];
com.somerandomdude.coordy.constants.LayoutType.prototype = {
	__class__: com.somerandomdude.coordy.constants.LayoutType
}
com.somerandomdude.coordy.constants.LayoutUpdateMethod = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LayoutUpdateMethod"] = com.somerandomdude.coordy.constants.LayoutUpdateMethod;
$hxExpose(com.somerandomdude.coordy.constants.LayoutUpdateMethod, "com.somerandomdude.coordy.constants.LayoutUpdateMethod");
com.somerandomdude.coordy.constants.LayoutUpdateMethod.__name__ = ["com","somerandomdude","coordy","constants","LayoutUpdateMethod"];
com.somerandomdude.coordy.constants.LayoutUpdateMethod.prototype = {
	__class__: com.somerandomdude.coordy.constants.LayoutUpdateMethod
}
com.somerandomdude.coordy.constants.PathAlignType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.PathAlignType"] = com.somerandomdude.coordy.constants.PathAlignType;
com.somerandomdude.coordy.constants.PathAlignType.__name__ = ["com","somerandomdude","coordy","constants","PathAlignType"];
com.somerandomdude.coordy.constants.PathAlignType.prototype = {
	__class__: com.somerandomdude.coordy.constants.PathAlignType
}
com.somerandomdude.coordy.constants.StackOrder = function() { }
$hxClasses["com.somerandomdude.coordy.constants.StackOrder"] = com.somerandomdude.coordy.constants.StackOrder;
com.somerandomdude.coordy.constants.StackOrder.__name__ = ["com","somerandomdude","coordy","constants","StackOrder"];
com.somerandomdude.coordy.constants.StackOrder.prototype = {
	__class__: com.somerandomdude.coordy.constants.StackOrder
}
com.somerandomdude.coordy.constants.WaveFunction = function() { }
$hxClasses["com.somerandomdude.coordy.constants.WaveFunction"] = com.somerandomdude.coordy.constants.WaveFunction;
com.somerandomdude.coordy.constants.WaveFunction.__name__ = ["com","somerandomdude","coordy","constants","WaveFunction"];
com.somerandomdude.coordy.constants.WaveFunction.prototype = {
	__class__: com.somerandomdude.coordy.constants.WaveFunction
}
com.somerandomdude.coordy.events = {}
com.somerandomdude.coordy.events.helpers = {}
com.somerandomdude.coordy.events.helpers.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.jeashIsCancelled = false;
	this.jeashIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = com.somerandomdude.coordy.events.helpers.EventPhase.AT_TARGET;
};
$hxClasses["com.somerandomdude.coordy.events.helpers.Event"] = com.somerandomdude.coordy.events.helpers.Event;
com.somerandomdude.coordy.events.helpers.Event.__name__ = ["com","somerandomdude","coordy","events","helpers","Event"];
com.somerandomdude.coordy.events.helpers.Event.prototype = {
	bubbles: null
	,cancelable: null
	,eventPhase: null
	,target: null
	,currentTarget: null
	,type: null
	,jeashIsCancelled: null
	,jeashIsCancelledNow: null
	,jeashSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,jeashGetIsCancelled: function() {
		return this.jeashIsCancelled;
	}
	,jeashGetIsCancelledNow: function() {
		return this.jeashIsCancelledNow;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.events.helpers.Event(this.type,this.bubbles,this.cancelable);
	}
	,stopImmediatePropagation: function() {
		this.jeashIsCancelledNow = this.jeashIsCancelled = true;
	}
	,stopPropagation: function() {
		this.jeashIsCancelled = true;
	}
	,toString: function() {
		return "Event";
	}
	,jeashCreateSimilar: function(type,related,targ) {
		var result = new com.somerandomdude.coordy.events.helpers.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: com.somerandomdude.coordy.events.helpers.Event
}
com.somerandomdude.coordy.events.CoordyNodeEvent = function(type,node,bubbles,cancelable) {
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.node = node;
	com.somerandomdude.coordy.events.helpers.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["com.somerandomdude.coordy.events.CoordyNodeEvent"] = com.somerandomdude.coordy.events.CoordyNodeEvent;
com.somerandomdude.coordy.events.CoordyNodeEvent.__name__ = ["com","somerandomdude","coordy","events","CoordyNodeEvent"];
com.somerandomdude.coordy.events.CoordyNodeEvent.__super__ = com.somerandomdude.coordy.events.helpers.Event;
com.somerandomdude.coordy.events.CoordyNodeEvent.prototype = $extend(com.somerandomdude.coordy.events.helpers.Event.prototype,{
	node: null
	,clone: function() {
		return new com.somerandomdude.coordy.events.CoordyNodeEvent(this.type,this.node,this.bubbles,this.cancelable);
	}
	,__class__: com.somerandomdude.coordy.events.CoordyNodeEvent
});
com.somerandomdude.coordy.events.helpers.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = com.somerandomdude.coordy.events.helpers.Listener.sIDs++;
};
$hxClasses["com.somerandomdude.coordy.events.helpers.Listener"] = com.somerandomdude.coordy.events.helpers.Listener;
com.somerandomdude.coordy.events.helpers.Listener.__name__ = ["com","somerandomdude","coordy","events","helpers","Listener"];
com.somerandomdude.coordy.events.helpers.Listener.prototype = {
	mListner: null
	,mUseCapture: null
	,mPriority: null
	,mID: null
	,Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: com.somerandomdude.coordy.events.helpers.Listener
}
com.somerandomdude.coordy.events.helpers.IEventDispatcher = function() { }
$hxClasses["com.somerandomdude.coordy.events.helpers.IEventDispatcher"] = com.somerandomdude.coordy.events.helpers.IEventDispatcher;
com.somerandomdude.coordy.events.helpers.IEventDispatcher.__name__ = ["com","somerandomdude","coordy","events","helpers","IEventDispatcher"];
com.somerandomdude.coordy.events.helpers.IEventDispatcher.prototype = {
	addEventListener: null
	,dispatchEvent: null
	,hasEventListener: null
	,removeEventListener: null
	,willTrigger: null
	,__class__: com.somerandomdude.coordy.events.helpers.IEventDispatcher
}
com.somerandomdude.coordy.events.helpers.EventDispatcher = function(target) {
	if(target != null) this.jeashTarget = target; else this.jeashTarget = this;
	this.jeashEventMap = [];
};
$hxClasses["com.somerandomdude.coordy.events.helpers.EventDispatcher"] = com.somerandomdude.coordy.events.helpers.EventDispatcher;
com.somerandomdude.coordy.events.helpers.EventDispatcher.__name__ = ["com","somerandomdude","coordy","events","helpers","EventDispatcher"];
com.somerandomdude.coordy.events.helpers.EventDispatcher.__interfaces__ = [com.somerandomdude.coordy.events.helpers.IEventDispatcher];
com.somerandomdude.coordy.events.helpers.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
com.somerandomdude.coordy.events.helpers.EventDispatcher.prototype = {
	jeashTarget: null
	,jeashEventMap: null
	,getList: function(type) {
		return this.jeashEventMap[type];
	}
	,setList: function(type,list) {
		this.jeashEventMap[type] = list;
	}
	,existList: function(type) {
		return this.jeashEventMap[type] != undefined;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new com.somerandomdude.coordy.events.helpers.Listener(inListener,capture,priority));
		list.sort(com.somerandomdude.coordy.events.helpers.EventDispatcher.compareListeners);
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.jeashTarget;
		var capture = event.eventPhase == com.somerandomdude.coordy.events.helpers.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.jeashGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,toString: function() {
		return Std.string(this);
	}
	,willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,__class__: com.somerandomdude.coordy.events.helpers.EventDispatcher
}
com.somerandomdude.coordy.events.helpers.EventPhase = function() { }
$hxClasses["com.somerandomdude.coordy.events.helpers.EventPhase"] = com.somerandomdude.coordy.events.helpers.EventPhase;
com.somerandomdude.coordy.events.helpers.EventPhase.__name__ = ["com","somerandomdude","coordy","events","helpers","EventPhase"];
com.somerandomdude.coordy.events.helpers.EventPhase.prototype = {
	__class__: com.somerandomdude.coordy.events.helpers.EventPhase
}
com.somerandomdude.coordy.geom = {}
com.somerandomdude.coordy.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	this.a = in_a == null?1.0:in_a;
	this.b = in_b == null?0.0:in_b;
	this.c = in_c == null?0.0:in_c;
	this.d = in_d == null?1.0:in_d;
	this.tx = in_tx == null?0.0:in_tx;
	this.ty = in_ty == null?0.0:in_ty;
};
$hxClasses["com.somerandomdude.coordy.geom.Matrix"] = com.somerandomdude.coordy.geom.Matrix;
com.somerandomdude.coordy.geom.Matrix.__name__ = ["com","somerandomdude","coordy","geom","Matrix"];
com.somerandomdude.coordy.geom.Matrix.prototype = {
	a: null
	,b: null
	,c: null
	,d: null
	,tx: null
	,ty: null
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else this.b = this.c = 0;
		this.tx = in_tx != null?in_tx + in_width / 2:in_width / 2;
		this.ty = in_ty != null?in_ty + in_height / 2:in_height / 2;
	}
	,setRotation: function(inTheta,inScale) {
		var scale = inScale == null?1.0:inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,transformPoint: function(inPos) {
		return new com.somerandomdude.coordy.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,translate: function(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,mult: function(m) {
		var result = new com.somerandomdude.coordy.geom.Matrix();
		result.a = this.a * m.a + this.b * m.c;
		result.b = this.a * m.b + this.b * m.d;
		result.c = this.c * m.a + this.d * m.c;
		result.d = this.c * m.b + this.d * m.d;
		result.tx = this.tx * m.a + this.ty * m.c + m.tx;
		result.ty = this.tx * m.b + this.ty * m.d + m.ty;
		return result;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,toMozString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += "px, ";
		m += this.ty;
		m += "px)";
		return m;
	}
	,toString: function() {
		var m = "matrix(";
		m += this.a;
		m += ", ";
		m += this.b;
		m += ", ";
		m += this.c;
		m += ", ";
		m += this.d;
		m += ", ";
		m += this.tx;
		m += ", ";
		m += this.ty;
		m += ")";
		return m;
	}
	,__class__: com.somerandomdude.coordy.geom.Matrix
}
com.somerandomdude.coordy.geom.Point = function(inX,inY) {
	this.x = inX == null?0.0:inX;
	this.y = inY == null?0.0:inY;
};
$hxClasses["com.somerandomdude.coordy.geom.Point"] = com.somerandomdude.coordy.geom.Point;
com.somerandomdude.coordy.geom.Point.__name__ = ["com","somerandomdude","coordy","geom","Point"];
com.somerandomdude.coordy.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
com.somerandomdude.coordy.geom.Point.interpolate = function(pt1,pt2,f) {
	return new com.somerandomdude.coordy.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
com.somerandomdude.coordy.geom.Point.polar = function(len,angle) {
	return new com.somerandomdude.coordy.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
com.somerandomdude.coordy.geom.Point.prototype = {
	x: null
	,y: null
	,add: function(v) {
		return new com.somerandomdude.coordy.geom.Point(v.x + this.x,v.y + this.y);
	}
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x,this.y);
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,length: null
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) this.x = thickness; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,subtract: function(v) {
		return new com.somerandomdude.coordy.geom.Point(this.x - v.x,this.y - v.y);
	}
	,__class__: com.somerandomdude.coordy.geom.Point
	,__properties__: {get_length:"get_length"}
}
com.somerandomdude.coordy.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0.;
	if(inWidth == null) inWidth = 0.;
	if(inY == null) inY = 0.;
	if(inX == null) inX = 0.;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["com.somerandomdude.coordy.geom.Rectangle"] = com.somerandomdude.coordy.geom.Rectangle;
com.somerandomdude.coordy.geom.Rectangle.__name__ = ["com","somerandomdude","coordy","geom","Rectangle"];
com.somerandomdude.coordy.geom.Rectangle.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,left: null
	,get_left: function() {
		return this.x;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,right: null
	,get_right: function() {
		return this.x + this.width;
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,top: null
	,get_top: function() {
		return this.y;
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,bottom: null
	,get_bottom: function() {
		return this.y + this.height;
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,topLeft: null
	,get_topLeft: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x,this.y);
	}
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,size: null
	,get_size: function() {
		return new com.somerandomdude.coordy.geom.Point(this.width,this.height);
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,bottomRight: null
	,get_bottomRight: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,containsRect: function(rect) {
		return this.contains(rect.x,rect.y) && this.containsPoint(rect.get_bottomRight());
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new com.somerandomdude.coordy.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new com.somerandomdude.coordy.geom.Rectangle();
		return new com.somerandomdude.coordy.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
		return new com.somerandomdude.coordy.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,isEmpty: function() {
		return this.width == 0 && this.height == 0;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new com.somerandomdude.coordy.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,__class__: com.somerandomdude.coordy.geom.Rectangle
	,__properties__: {set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_size:"set_size",get_size:"get_size",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_bottom:"set_bottom",get_bottom:"get_bottom",set_top:"set_top",get_top:"get_top",set_right:"set_right",get_right:"get_right",set_left:"set_left",get_left:"get_left"}
}
com.somerandomdude.coordy.layouts = {}
com.somerandomdude.coordy.layouts.ICoreLayout = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.ICoreLayout"] = com.somerandomdude.coordy.layouts.ICoreLayout;
com.somerandomdude.coordy.layouts.ICoreLayout.__name__ = ["com","somerandomdude","coordy","layouts","ICoreLayout"];
com.somerandomdude.coordy.layouts.ICoreLayout.prototype = {
	nodes: null
	,size: null
	,addNodes: null
	,addNode: null
	,addToLayout: null
	,getNodeByLink: null
	,getNodeIndex: null
	,getNodeAt: null
	,addLinkAt: null
	,removeLinks: null
	,removeLinkAt: null
	,removeNode: null
	,removeNodeByLink: null
	,swapNodeLinks: null
	,updateAndRender: null
	,update: null
	,render: null
	,toString: null
	,toJSON: null
	,toXML: null
	,__class__: com.somerandomdude.coordy.layouts.ICoreLayout
}
com.somerandomdude.coordy.layouts.ILayout = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.ILayout"] = com.somerandomdude.coordy.layouts.ILayout;
com.somerandomdude.coordy.layouts.ILayout.__name__ = ["com","somerandomdude","coordy","layouts","ILayout"];
com.somerandomdude.coordy.layouts.ILayout.__interfaces__ = [com.somerandomdude.coordy.layouts.ICoreLayout];
com.somerandomdude.coordy.layouts.ILayout.prototype = {
	updateMethod: null
	,proxyUpdater: null
	,executeUpdateMethod: null
	,__class__: com.somerandomdude.coordy.layouts.ILayout
	,__properties__: {set_proxyUpdater:"set_proxyUpdater",set_updateMethod:"set_updateMethod"}
}
com.somerandomdude.coordy.layouts.IOrderedLayout = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.IOrderedLayout"] = com.somerandomdude.coordy.layouts.IOrderedLayout;
com.somerandomdude.coordy.layouts.IOrderedLayout.__name__ = ["com","somerandomdude","coordy","layouts","IOrderedLayout"];
com.somerandomdude.coordy.layouts.IOrderedLayout.__interfaces__ = [com.somerandomdude.coordy.layouts.ILayout];
com.somerandomdude.coordy.layouts.IOrderedLayout.prototype = {
	order: null
	,__class__: com.somerandomdude.coordy.layouts.IOrderedLayout
	,__properties__: {set_order:"set_order",get_order:"get_order"}
}
com.somerandomdude.coordy.layouts.Layout = function() {
	com.somerandomdude.coordy.events.helpers.EventDispatcher.call(this);
	this.size = 0;
};
$hxClasses["com.somerandomdude.coordy.layouts.Layout"] = com.somerandomdude.coordy.layouts.Layout;
$hxExpose(com.somerandomdude.coordy.layouts.Layout, "Coordinates.layouts.Layout");
com.somerandomdude.coordy.layouts.Layout.__name__ = ["com","somerandomdude","coordy","layouts","Layout"];
com.somerandomdude.coordy.layouts.Layout.__super__ = com.somerandomdude.coordy.events.helpers.EventDispatcher;
com.somerandomdude.coordy.layouts.Layout.prototype = $extend(com.somerandomdude.coordy.events.helpers.EventDispatcher.prototype,{
	nodes: null
	,size: null
	,toString: function() {
		return "";
	}
	,toJSON: function() {
		var _nodes = new Array();
		var layout = { };
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			var _node = this.nodes[i];
			_nodes.push(Std.string(_node));
		}
		layout.type = this.toString();
		layout.size = this.size;
		layout.nodes = this.nodes;
		return layout;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,addNodes: function(count) {
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.addNode();
		}
	}
	,toXML: function() {
		var xml = Xml.parse("<layout></layout>");
		xml.set("type",this.toString());
		xml.set("size",(function($this) {
			var $r;
			var $t = $this.size;
			if(Std["is"]($t,String)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this)));
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
		}
		return xml;
	}
	,getNodeByLink: function(link) {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link == link) return this.nodes[i];
		}
		return null;
	}
	,getNodeIndex: function(node) {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i] == node) return i;
		}
		return -1;
	}
	,getNodeAt: function(index) {
		return this.nodes[index];
	}
	,linkExists: function(link) {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			if(link == this.nodes[i].link) return true;
		}
		return false;
	}
	,swapNodeLinks: function(nodeTo,nodeFrom) {
		var tmpLink = nodeTo.get_link();
		nodeTo.set_link(nodeFrom.get_link());
		nodeFrom.set_link(tmpLink);
	}
	,removeLinks: function() {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].link = null;
		}
	}
	,removeLinkAt: function(index) {
		this.nodes[index].link = null;
	}
	,removeNode: function(node) {
		this.nodes.splice(this.getNodeIndex(node),1);
		this.size--;
	}
	,removeAllNodes: function() {
		this.clearNodes();
		this.size = 0;
	}
	,removeNodeByLink: function(link) {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link == link) this.removeNode(this.nodes[i]);
		}
	}
	,addLinkAt: function(object,index) {
		this.nodes[index].link = object;
	}
	,storeNode: function(node) {
		if(this.nodes == null) this.nodes = new Array();
		this.nodes.push(node);
		this.size++;
		return this.size;
	}
	,storeNodeAt: function(node,index) {
		if(this.nodes == null) this.nodes = new Array();
		if(index >= 0 && index < this.size) this.nodes.insert(index,node); else this.nodes.push(node);
		this.size++;
		return this.size;
	}
	,getNextAvailableNode: function() {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link != null) return this.nodes[i];
		}
		return null;
	}
	,clearNodes: function() {
		if(this.nodes == null) return;
		if(this.nodes.length > 0) {
			var _g1 = 0, _g = this.nodes.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.nodes[i] = null;
				this.nodes.remove(this.nodes[i]);
			}
		}
		this.nodes = new Array();
	}
	,__class__: com.somerandomdude.coordy.layouts.Layout
});
com.somerandomdude.coordy.layouts.threedee = {}
com.somerandomdude.coordy.layouts.threedee.ILayout3d = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.threedee.ILayout3d"] = com.somerandomdude.coordy.layouts.threedee.ILayout3d;
com.somerandomdude.coordy.layouts.threedee.ILayout3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","ILayout3d"];
com.somerandomdude.coordy.layouts.threedee.ILayout3d.__interfaces__ = [com.somerandomdude.coordy.layouts.ILayout];
com.somerandomdude.coordy.layouts.threedee.ILayout3d.prototype = {
	x: null
	,y: null
	,z: null
	,width: null
	,height: null
	,depth: null
	,rotation: null
	,jitterX: null
	,jitterY: null
	,jitterZ: null
	,renderNode: null
	,clone: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.ILayout3d
	,__properties__: {set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_rotation:"set_rotation",get_rotation:"get_rotation",set_depth:"set_depth",get_depth:"get_depth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
}
com.somerandomdude.coordy.layouts.threedee.Layout3d = function() {
	com.somerandomdude.coordy.layouts.Layout.call(this);
	this.set_updateMethod("updateAndRender");
	this.updateFunction = this.updateAndRender.$bind(this);
	this.set_x(0);
	this.set_y(0);
	this.set_z(0);
	this.set_width(0);
	this.set_height(0);
	this.set_depth(0);
	this.set_rotation(0);
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.Layout3d"] = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.Layout3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","Layout3d"];
com.somerandomdude.coordy.layouts.threedee.Layout3d.__interfaces__ = [com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.Layout3d.__super__ = com.somerandomdude.coordy.layouts.Layout;
com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype = $extend(com.somerandomdude.coordy.layouts.Layout.prototype,{
	x: null
	,y: null
	,z: null
	,width: null
	,height: null
	,depth: null
	,rotation: null
	,jitterX: null
	,jitterY: null
	,jitterZ: null
	,updateMethod: null
	,updateFunction: null
	,proxyUpdater: null
	,get_proxyUpdater: function() {
		return this.proxyUpdater;
	}
	,set_proxyUpdater: function(value) {
		this.set_updateMethod(value.get_name());
		this.updateFunction = value.update.$bind(value);
		return this.proxyUpdater;
	}
	,get_updateMethod: function() {
		return this.updateMethod;
	}
	,set_updateMethod: function(value) {
		this.updateMethod = value;
		switch(value) {
		case "none":
			this.updateFunction = function() {
			};
			break;
		case "updateOnly":
			this.updateFunction = this.update.$bind(this);
			break;
		default:
			this.updateFunction = this.updateAndRender.$bind(this);
		}
		return this.updateMethod;
	}
	,get_rotation: function() {
		return this.rotation;
	}
	,set_rotation: function(value) {
		this.rotation = value;
		this.updateFunction();
		return this.get_rotation();
	}
	,get_x: function() {
		return this.x;
	}
	,set_x: function(value) {
		this.x = value;
		this.updateFunction();
		return this.get_x();
	}
	,get_y: function() {
		return this.y;
	}
	,set_y: function(value) {
		this.y = value;
		this.updateFunction();
		return this.get_y();
	}
	,get_z: function() {
		return this.z;
	}
	,set_z: function(value) {
		this.z = value;
		this.updateFunction();
		return this.get_z();
	}
	,get_width: function() {
		return this.width;
	}
	,set_width: function(value) {
		this.width = value;
		this.updateFunction();
		return this.get_width();
	}
	,get_height: function() {
		return this.height;
	}
	,set_height: function(value) {
		this.height = value;
		this.updateFunction();
		return this.get_height();
	}
	,get_depth: function() {
		return this.depth;
	}
	,set_depth: function(value) {
		this.depth = value;
		this.updateFunction();
		return this.get_depth();
	}
	,get_jitterX: function() {
		return this.jitterX;
	}
	,set_jitterX: function(value) {
		this.jitterX = value;
		this.updateFunction();
		return this.get_jitterX();
	}
	,get_jitterY: function() {
		return this.jitterY;
	}
	,set_jitterY: function(value) {
		this.jitterY = value;
		this.updateFunction();
		return this.get_jitterY();
	}
	,get_jitterZ: function() {
		return this.jitterZ;
	}
	,set_jitterZ: function(value) {
		this.jitterZ = value;
		this.updateFunction();
		return this.get_jitterZ();
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.Layout.prototype.removeNode.call(this,node);
		this.updateFunction();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeRemove",node));
	}
	,clone: function() {
		throw "Method must be overriden by child class";
		return null;
	}
	,executeUpdateMethod: function() {
		this.updateFunction();
	}
	,updateAndRender: function() {
		this.update();
		this.render();
	}
	,update: function() {
		throw "Method must be overriden by child class";
	}
	,render: function() {
		var n;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			n = this.nodes[i];
			if(n.get_link() == null) continue;
			n.get_link().x = n.get_x();
			n.get_link().y = n.get_y();
			n.get_link().z = n.get_z();
		}
	}
	,renderNode: function(node) {
		if(node.get_link() == null) return;
		node.get_link().x = node.get_x();
		node.get_link().y = node.get_y();
		node.get_link().z = node.get_z();
	}
	,validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"z") && Reflect.hasField(object,"rotationX") && Reflect.hasField(object,"rotationY") && Reflect.hasField(object,"rotationZ")) return true;
		return false;
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.Layout3d
	,__properties__: {set_proxyUpdater:"set_proxyUpdater",set_updateMethod:"set_updateMethod",set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_rotation:"set_rotation",get_rotation:"get_rotation",set_depth:"set_depth",get_depth:"get_depth",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
});
com.somerandomdude.coordy.layouts.threedee.Grid3d = function(width,height,depth,columns,rows,layers,paddingX,paddingY,paddingZ,x,y,z,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(paddingZ == null) paddingZ = 0;
	if(paddingY == null) paddingY = 0;
	if(paddingX == null) paddingX = 0;
	if(layers == null) layers = 1;
	if(rows == null) rows = 1;
	if(columns == null) columns = 1;
	com.somerandomdude.coordy.layouts.threedee.Layout3d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.set_depth(depth);
	this.set_columns(columns);
	this.set_rows(rows);
	this.set_layers(layers);
	this.set_paddingX(paddingX);
	this.set_paddingY(paddingY);
	this.set_paddingZ(paddingZ);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_jitterZ(jitterZ);
	this.set_maxNodes(rows * columns * layers);
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.Grid3d"] = com.somerandomdude.coordy.layouts.threedee.Grid3d;
$hxExpose(com.somerandomdude.coordy.layouts.threedee.Grid3d, "Coordinates.layouts.threedee.Grid3d");
com.somerandomdude.coordy.layouts.threedee.Grid3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","Grid3d"];
com.somerandomdude.coordy.layouts.threedee.Grid3d.__interfaces__ = [com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.Grid3d.__super__ = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.Grid3d.prototype = $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype,{
	rows: null
	,set_rows: function(value) {
		this.rows = value;
		this.updateFunction();
		return this.rows;
	}
	,columns: null
	,set_columns: function(value) {
		this.columns = value;
		this.updateFunction();
		return this.columns;
	}
	,layers: null
	,set_layers: function(value) {
		this.layers = value;
		this.updateFunction();
		return this.layers;
	}
	,paddingX: null
	,set_paddingX: function(value) {
		this.paddingX = value;
		this.updateFunction();
		return this.paddingX;
	}
	,paddingY: null
	,set_paddingY: function(value) {
		this.paddingY = value;
		this.updateFunction();
		return this.paddingY;
	}
	,paddingZ: null
	,set_paddingZ: function(value) {
		this.paddingZ = value;
		this.updateFunction();
		return this.paddingZ;
	}
	,maxNodes: null
	,set_maxNodes: function(value) {
		this.maxNodes = value;
		this.updateFunction();
		return this.maxNodes;
	}
	,cellWidth: null
	,get_cellWidth: function() {
		return this.nodes[0].width;
	}
	,cellHeight: null
	,get_cellHeight: function() {
		return this.nodes[0].height;
	}
	,toString: function() {
		return "Grid3d";
	}
	,getColumn: function(column) {
		var c = [];
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i * this.columns + column]);
		}
		return c;
	}
	,getRow: function(row) {
		var c = [];
		var _g1 = row * this.columns, _g = row * this.columns + this.columns;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i]);
		}
		return c;
	}
	,getLayer: function(layer) {
		return [];
	}
	,removeItemAt: function(column,row) {
		this.getNodeFromCoordinates(column,row).set_link(null);
	}
	,getNodeFromCoordinates: function(column,row) {
		return this.nodes[row * this.columns + column];
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object) || this.size >= this.maxNodes) return null;
		var w = (this.get_width() - (this.columns - 1) * this.paddingX) / this.columns;
		var h = (this.get_height() - (this.rows - 1) * this.paddingY) / this.rows;
		var d = (this.get_depth() - (this.layers - 1) * this.paddingZ) / this.layers;
		var c = this.size % this.columns;
		var r = Math.floor(this.size / this.rows) % this.rows;
		var l = Math.floor(this.size / (this.rows * this.columns));
		var node = new com.somerandomdude.coordy.nodes.threedee.GridNode3d(object,c,r,l,w * c + c * this.paddingX + this.get_x(),h * r + r * this.paddingY + this.get_y(),d * l + l * this.paddingZ + this.get_z());
		this.storeNode(node);
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Grid3d(this.get_width(),this.get_height(),this.get_depth(),this.columns,this.rows,this.layers,this.paddingX,this.paddingY,this.paddingZ,this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,update: function() {
		var total = this.columns * this.rows * this.layers;
		var w = (this.get_width() - (this.columns - 1) * this.paddingX) / this.columns;
		var h = (this.get_height() - (this.rows - 1) * this.paddingY) / this.rows;
		var d = (this.get_depth() - (this.layers - 1) * this.paddingZ) / this.layers;
		var c;
		var r;
		var l;
		var node;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			c = i % this.columns;
			r = (i / this.rows | 0) % this.rows;
			l = i / (this.rows * this.columns) | 0;
			node.set_x(w * c + c * this.paddingX + this.get_x() + node.get_jitterX() * this.get_jitterX());
			node.set_y(h * r + r * this.paddingY + this.get_y() + node.get_jitterY() * this.get_jitterY());
			node.set_z(d * l + l * this.paddingZ + this.get_z() + node.get_jitterZ() * this.get_jitterZ());
		}
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.Grid3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{get_cellHeight:"get_cellHeight",get_cellWidth:"get_cellWidth",set_maxNodes:"set_maxNodes",set_paddingZ:"set_paddingZ",set_paddingY:"set_paddingY",set_paddingX:"set_paddingX",set_layers:"set_layers",set_columns:"set_columns",set_rows:"set_rows"})
});
com.somerandomdude.coordy.layouts.threedee.Scatter3d = function(width,height,depth,jitter,x,y,z,jitterRotation) {
	if(jitterRotation == null) jitterRotation = false;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(jitter == null) jitter = 1;
	com.somerandomdude.coordy.layouts.threedee.Layout3d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.set_depth(depth);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitter(jitter);
	this.set_jitterRotation(jitterRotation);
	this.nodes = new Array();
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.Scatter3d"] = com.somerandomdude.coordy.layouts.threedee.Scatter3d;
$hxExpose(com.somerandomdude.coordy.layouts.threedee.Scatter3d, "Coordinates.layouts.threedee.Scatter3d");
com.somerandomdude.coordy.layouts.threedee.Scatter3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","Scatter3d"];
com.somerandomdude.coordy.layouts.threedee.Scatter3d.__interfaces__ = [com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.Scatter3d.__super__ = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.Scatter3d.prototype = $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype,{
	jitter: null
	,jitterRotation: null
	,get_jitter: function() {
		return this.jitter;
	}
	,set_jitter: function(value) {
		this.jitter = value;
		this.updateFunction();
		return this.get_jitter();
	}
	,get_jitterRotation: function() {
		return this.jitterRotation;
	}
	,set_jitterRotation: function(value) {
		this.jitterRotation = value;
		this.updateFunction();
		return this.get_jitterRotation();
	}
	,toString: function() {
		return "Scatter3d";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var p = Math.round(Math.random()) != 0?-1:1;
		var xPos = Math.random() * this.get_width() * this.get_jitter() * p + this.get_x();
		p = Math.round(Math.random()) != 0?-1:1;
		var yPos = Math.random() * this.get_height() * this.get_jitter() * p + this.get_y();
		p = Math.round(Math.random()) != 0?-1:1;
		var zPos = Math.random() * this.get_depth() * this.get_jitter() * p + this.get_z();
		var node = new com.somerandomdude.coordy.nodes.threedee.ScatterNode3d(object,xPos,yPos,zPos,this.get_jitterRotation()?Math.random() * p * 360:0,this.get_jitterRotation()?Math.random() * p * 360:0,this.get_jitterRotation()?Math.random() * p * 360:0);
		node.set_xRelation((node.get_x() - this.get_width() / 2) / this.get_width() / 2);
		node.set_yRelation((node.get_y() - this.get_height() / 2) / this.get_height() / 2);
		node.set_zRelation((node.get_z() - this.get_depth() / 2) / this.get_depth() / 2);
		this.storeNode(node);
		if(object != null && moveToCoordinates) {
			object.x = node.get_x();
			object.y = node.get_y();
			object.z = node.get_z();
		}
		return node;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
	}
	,render: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			if(!this.nodes[i].link) continue;
			this.nodes[i].link.x = this.nodes[i].x;
			this.nodes[i].link.y = this.nodes[i].y;
			this.nodes[i].link.z = this.nodes[i].z;
			this.nodes[i].link.rotationX = this.nodes[i].rotationX;
			this.nodes[i].link.rotationY = this.nodes[i].rotationY;
			this.nodes[i].link.rotationZ = this.nodes[i].rotationZ;
		}
	}
	,update: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].x = this.nodes[i].xRelation * this.get_width() + this.get_x();
			this.nodes[i].y = this.nodes[i].yRelation * this.get_height() + this.get_y();
			this.nodes[i].z = this.nodes[i].zRelation * this.get_depth() + this.get_z();
		}
	}
	,scatter: function() {
		var p;
		var xPos;
		var yPos;
		var zPos;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			p = Math.round(Math.random()) != 0?-1:1;
			xPos = Math.random() * this.get_width() * this.get_jitter() * p + this.get_x();
			p = Math.round(Math.random()) != 0?-1:1;
			yPos = Math.random() * this.get_height() * this.get_jitter() * p + this.get_y();
			p = Math.round(Math.random()) != 0?-1:1;
			zPos = Math.random() * this.get_depth() * this.get_jitter() * p + this.get_z();
			this.nodes[i].x = xPos;
			this.nodes[i].y = yPos;
			this.nodes[i].z = zPos;
		}
		this.updateFunction();
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Scatter3d(this.get_width(),this.get_height(),this.get_depth(),this.get_jitter(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterRotation());
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.Scatter3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_jitterRotation:"set_jitterRotation",get_jitterRotation:"get_jitterRotation",set_jitter:"set_jitter",get_jitter:"get_jitter"})
});
com.somerandomdude.coordy.layouts.threedee.Stack3d = function(angle,offset,zOffset,x,y,z,order,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(order == null) order = "stackAscending";
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(zOffset == null) zOffset = 5;
	if(offset == null) offset = 5;
	if(angle == null) angle = 45;
	com.somerandomdude.coordy.layouts.threedee.Layout3d.call(this);
	this.set_offsetAngle(angle);
	this.set_offset(offset);
	this.set_zOffset(zOffset);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_jitterZ(jitterZ);
	this.set_order(order);
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.Stack3d"] = com.somerandomdude.coordy.layouts.threedee.Stack3d;
$hxExpose(com.somerandomdude.coordy.layouts.threedee.Stack3d, "Coordinates.layouts.threedee.Stack3d");
com.somerandomdude.coordy.layouts.threedee.Stack3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","Stack3d"];
com.somerandomdude.coordy.layouts.threedee.Stack3d.__interfaces__ = [com.somerandomdude.coordy.layouts.IOrderedLayout,com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.Stack3d.__super__ = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.Stack3d.prototype = $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype,{
	offset: null
	,zOffset: null
	,angle: null
	,order: null
	,get_order: function() {
		return this.order;
	}
	,set_order: function(value) {
		this.order = value;
		this.updateFunction();
		return this.get_order();
	}
	,get_offset: function() {
		return this.offset;
	}
	,set_offset: function(value) {
		this.offset = value;
		this.updateFunction();
		return this.get_offset();
	}
	,get_zOffset: function() {
		return this.zOffset;
	}
	,set_zOffset: function(value) {
		this.zOffset = value;
		this.updateFunction();
		return this.get_zOffset();
	}
	,get_offsetAngle: function() {
		return this.angle;
	}
	,set_offsetAngle: function(value) {
		this.angle = value;
		this.updateFunction();
		return this.get_offsetAngle();
	}
	,toString: function() {
		return "Stack3d";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.threedee.OrderedNode3d(object,this.size);
		this.storeNode(node);
		this.cleanOrder();
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
	}
	,addToLayoutAt: function(object,index,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(!this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.threedee.OrderedNode3d(object,index,0,0,0);
		this.storeNodeAt(node,index);
		this.cleanOrder();
		this.update();
		if(moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Stack3d(this.get_offsetAngle(),this.get_offset(),this.get_zOffset(),this.get_x(),this.get_y(),this.get_z(),this.get_order(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,update: function() {
		if(this.nodes == null) return;
		this.cleanOrder();
		var rad = this.get_offsetAngle() * Math.PI / 180;
		if(this.get_order() == "stackAscending") this.nodes.sort(com.somerandomdude.coordy.utils.Utilities.sortOnOrderDescending);
		var node;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			node.set_x(this.get_x() + Math.cos(rad) * this.get_offset() * i + node.get_jitterX() * this.get_jitterX());
			node.set_y(this.get_y() + Math.sin(rad) * this.get_offset() * i + node.get_jitterY() * this.get_jitterY());
			node.set_z(this.get_z() + this.get_zOffset() * i + node.get_jitterZ() * this.get_jitterZ());
		}
	}
	,cleanOrder: function() {
		this.nodes.sort(com.somerandomdude.coordy.utils.Utilities.sortOnOrderAscending);
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].order = i;
		}
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.Stack3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_order:"set_order",get_order:"get_order",set_angle:"set_offsetAngle",get_angle:"get_offsetAngle",set_zOffset:"set_zOffset",get_zOffset:"get_zOffset",set_offset:"set_offset",get_offset:"get_offset"})
});
com.somerandomdude.coordy.layouts.threedee.Wave3d = function(width,height,depth,x,y,z,frequency,waveFunctionY,waveFunctionZ,jitterX,jitterY,jitterZ,alignType,alignOffset) {
	if(alignOffset == null) alignOffset = 0;
	if(alignType == null) alignType = "alignPerpendicular";
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(waveFunctionZ == null) waveFunctionZ = "cosineFunction";
	if(waveFunctionY == null) waveFunctionY = "sineFunction";
	if(frequency == null) frequency = 1;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.layouts.threedee.Layout3d.call(this);
	this.set_heightMultiplier(0);
	this.set_depthMultiplier(0);
	this.functionY = Math.sin;
	this.functionZ = Math.cos;
	this.set_width(width);
	this.set_height(height);
	this.set_depth(depth);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_jitterZ(jitterZ);
	this.set_frequency(frequency);
	this.set_waveFunctionY(waveFunctionY);
	this.set_waveFunctionZ(waveFunctionZ);
	this.set_alignType(alignType);
	this.set_alignAngleOffset(alignOffset);
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.Wave3d"] = com.somerandomdude.coordy.layouts.threedee.Wave3d;
$hxExpose(com.somerandomdude.coordy.layouts.threedee.Wave3d, "Coordinates.layouts.threedee.Wave3d");
com.somerandomdude.coordy.layouts.threedee.Wave3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","Wave3d"];
com.somerandomdude.coordy.layouts.threedee.Wave3d.__interfaces__ = [com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.Wave3d.__super__ = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.Wave3d.prototype = $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype,{
	frequency: null
	,waveFunctionY: null
	,waveFunctionZ: null
	,functionY: null
	,functionZ: null
	,heightMultiplier: null
	,depthMultiplier: null
	,alignType: null
	,alignAngleOffset: null
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,get_alignType: function() {
		return this.alignType;
	}
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,get_waveFunctionY: function() {
		return this.waveFunctionY;
	}
	,set_waveFunctionY: function(value) {
		switch(value) {
		case "sineFunction":
			this.waveFunctionY = value;
			this.functionY = Math.sin;
			break;
		case "cosineFunction":
			this.waveFunctionY = value;
			this.functionY = Math.cos;
			break;
		case "tanFunction":
			this.waveFunctionY = value;
			this.functionY = Math.tan;
			break;
		case "arcsineFunction":
			this.waveFunctionY = value;
			this.functionY = Math.asin;
			break;
		case "arccosineFunction":
			this.waveFunctionY = value;
			this.functionY = Math.acos;
			break;
		case "arctanFunction":
			this.waveFunctionY = value;
			this.functionY = Math.atan;
			break;
		default:
			this.waveFunctionY = "sineFunction";
			this.functionY = Math.sin;
		}
		this.updateFunction();
		return this.get_waveFunctionY();
	}
	,get_waveFunctionZ: function() {
		return this.waveFunctionZ;
	}
	,set_waveFunctionZ: function(value) {
		switch(value) {
		case "sineFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.sin;
			break;
		case "cosineFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.cos;
			break;
		case "tanFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.tan;
			break;
		case "arcsineFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.asin;
			break;
		case "arccosineFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.acos;
			break;
		case "arctanFunction":
			this.waveFunctionZ = value;
			this.functionZ = Math.atan;
			break;
		default:
			this.waveFunctionZ = "sineFunction";
			this.functionZ = Math.sin;
		}
		this.updateFunction();
		return this.get_waveFunctionZ();
	}
	,get_frequency: function() {
		return this.frequency;
	}
	,set_frequency: function(value) {
		this.frequency = value;
		this.updateFunction();
		return this.get_frequency();
	}
	,get_heightMultiplier: function() {
		return this.heightMultiplier;
	}
	,set_heightMultiplier: function(value) {
		this.heightMultiplier = value;
		this.updateFunction();
		return this.get_heightMultiplier();
	}
	,get_depthMultiplier: function() {
		return this.depthMultiplier;
	}
	,set_depthMultiplier: function(value) {
		this.depthMultiplier = value;
		this.updateFunction();
		return this.get_depthMultiplier();
	}
	,toString: function() {
		return "Wave3d";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.threedee.Node3d(object,0,0,0,(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random());
		this.storeNode((function($this) {
			var $r;
			var $t = node;
			if(Std["is"]($t,com.somerandomdude.coordy.nodes.threedee.INode3d)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this)));
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Wave3d(this.get_width(),this.get_height(),this.get_depth(),this.get_x(),this.get_y(),this.get_z(),this.get_frequency(),this.get_waveFunctionY(),this.get_waveFunctionZ(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,update: function() {
		var c;
		var r = this.get_rotation() * (Math.PI / 180);
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			c.set_x(i * (this.get_width() / this.size) + this.get_x() + c.get_jitterX() * this.get_jitterX());
			c.set_y(this.functionY((Math.PI * (i + 1) / (this.size / 2) + r) * this.get_frequency()) * ((this.get_height() + this.get_heightMultiplier() * i) / 2) + this.get_y() + c.get_jitterY() * this.get_jitterY());
			c.set_z(this.functionZ((Math.PI * (i + 1) / (this.size / 2) + r) * this.get_frequency()) * ((this.get_depth() + this.get_depthMultiplier() * i) / 2) + this.get_z() + c.get_jitterZ() * this.get_jitterZ());
			if(this.functionY == Math.sin) c.set_rotationZ(Math.cos(Math.PI * (i + 1) / (this.size / 2) * this.get_frequency()) * 180 / Math.PI); else if(this.functionY == Math.cos) c.set_rotationZ(Math.sin(Math.PI * (i + 1) / (this.size / 2) * this.get_frequency()) * 180 / Math.PI); else c.set_rotationZ(0);
			if(this.get_alignType() == "alignPerpendicular") {
				var _g2 = c;
				_g2.set_rotationZ(_g2.get_rotationZ() + 90);
			}
			var _g2 = c;
			_g2.set_rotationZ(_g2.get_rotationZ() + this.get_alignAngleOffset());
		}
	}
	,render: function() {
		var c;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			if(c.get_link() == null) continue;
			c.get_link().x = c.get_x();
			c.get_link().y = c.get_y();
			c.get_link().z = c.get_z();
			if(this.get_alignType() == "noAlign") continue;
			c.get_link().rotationZ = c.get_rotationZ();
		}
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.Wave3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset",set_alignType:"set_alignType",get_alignType:"get_alignType",set_depthMultiplier:"set_depthMultiplier",get_depthMultiplier:"get_depthMultiplier",set_heightMultiplier:"set_heightMultiplier",get_heightMultiplier:"get_heightMultiplier",set_waveFunctionZ:"set_waveFunctionZ",get_waveFunctionZ:"get_waveFunctionZ",set_waveFunctionY:"set_waveFunctionY",get_waveFunctionY:"get_waveFunctionY",set_frequency:"set_frequency",get_frequency:"get_frequency"})
});
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d = function(width,height,depth,frequencyX,frequencyY,frequencyZ,x,y,z,rotation,rotationY,rotationZ,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(rotationZ == null) rotationZ = 90;
	if(rotationY == null) rotationY = 90;
	if(rotation == null) rotation = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(frequencyZ == null) frequencyZ = 5;
	if(frequencyY == null) frequencyY = 1;
	if(frequencyX == null) frequencyX = 1;
	com.somerandomdude.coordy.layouts.threedee.Layout3d.call(this);
	this.set_frequencyX(frequencyX);
	this.set_frequencyY(frequencyY);
	this.set_frequencyZ(frequencyZ);
	this.nodes = [];
	this.set_width(width);
	this.set_height(height);
	this.set_depth(depth);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_jitterZ(jitterZ);
	this.set_rotation(rotation);
	this.set_rotationY(rotationY);
	this.set_rotationZ(rotationZ);
};
$hxClasses["com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d"] = com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d;
$hxExpose(com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d, "Coordinates.layouts.threedee.WaveEllipse3d");
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","WaveEllipse3d"];
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.__interfaces__ = [com.somerandomdude.coordy.layouts.threedee.ILayout3d];
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.__super__ = com.somerandomdude.coordy.layouts.threedee.Layout3d;
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.prototype = $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype,{
	rotationY: null
	,rotationZ: null
	,frequencyX: null
	,frequencyY: null
	,frequencyZ: null
	,get_eccentricity: function() {
		var a = this.get_width() > this.get_height()?this.get_width() / 2:this.get_height() / 2;
		var b = this.get_width() > this.get_height()?this.get_height() / 2:this.get_width() / 2;
		var e = Math.sqrt(1 - Math.pow(b,2) / Math.pow(a,2));
		return e;
	}
	,set_frequencyX: function(value) {
		this.frequencyX = value;
		this.updateFunction();
		return this.get_frequencyX();
	}
	,get_frequencyX: function() {
		return this.frequencyX;
	}
	,set_frequencyY: function(value) {
		this.frequencyY = value;
		this.updateFunction();
		return this.get_frequencyY();
	}
	,get_frequencyY: function() {
		return this.frequencyY;
	}
	,set_frequencyZ: function(value) {
		this.frequencyZ = value;
		this.updateFunction();
		return this.get_frequencyZ();
	}
	,get_frequencyZ: function() {
		return this.frequencyZ;
	}
	,set_rotationY: function(value) {
		this.rotationY = value;
		this.updateFunction();
		return this.get_rotationY();
	}
	,get_rotationY: function() {
		return this.rotationY;
	}
	,set_rotationZ: function(value) {
		this.rotationZ = value;
		this.updateFunction();
		return this.get_rotationZ();
	}
	,get_rotationZ: function() {
		return this.rotationZ;
	}
	,toString: function() {
		return "WaveEllipse3d";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.threedee.EllipseNode3d(object,0,0,0,0,Math.random() * (Math.random() > .5?1:-1),Math.random() * (Math.random() > .5?1:-1),Math.random() * (Math.random() > .5?1:-1));
		this.storeNode(node);
		this.update();
		if(object && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
	}
	,getCellAngle: function(cell) {
		var xR = cell.get_link().x - (this.get_x() + this.get_width() / 2);
		var yR = cell.get_link().y - (this.get_y() + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		return a;
	}
	,setCellAngle: function(cell,angle) {
		var nAngle = this.getCellAngle(cell);
		this.set_rotation(this.get_rotation() - angle - nAngle);
	}
	,clone: function() {
		var we3d = new com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d(this.get_width(),this.get_height(),this.get_depth(),this.get_x(),this.get_y(),this.get_z(),this.get_frequencyX(),this.get_frequencyY(),this.get_frequencyZ(),this.get_rotation(),this.get_rotationY(),this.get_rotationZ(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		return we3d;
	}
	,update: function() {
		var w = this.get_width() / 2;
		var h = this.get_height() / 2;
		var d = this.get_depth() / 2;
		var rOffset = this.get_rotation() * (Math.PI / 180);
		var rad;
		var c;
		var rY = this.get_rotationY() * (Math.PI / 180);
		var rZ = this.get_rotationZ() * (Math.PI / 180);
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			rad = Math.PI * i / (this.size / 2) + rOffset;
			c.set_x(Math.sin(rZ) * (w * Math.cos(rad * this.get_frequencyX())) + this.get_x() + c.get_jitterX() * this.get_jitterX());
			c.set_y(Math.sin(rY) * (d * Math.sin(rad * this.get_frequencyY())) + this.get_y() + c.get_jitterY() * this.get_jitterY());
			c.set_z(Math.sin(rY) * (h * Math.sin(rad * this.get_frequencyZ())) + this.get_z() + c.get_jitterZ() * this.get_jitterZ());
		}
	}
	,rotateCellToTop: function(cell) {
		var xR = cell.get_link().x - (this.get_x() + this.get_width() / 2);
		var yR = cell.get_link().y - (this.get_y() + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.get_rotation() - a);
		return a;
	}
	,__class__: com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_frequencyZ:"set_frequencyZ",get_frequencyZ:"get_frequencyZ",set_frequencyY:"set_frequencyY",get_frequencyY:"get_frequencyY",set_frequencyX:"set_frequencyX",get_frequencyX:"get_frequencyX",set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ",set_rotationY:"set_rotationY",get_rotationY:"get_rotationY"})
});
com.somerandomdude.coordy.layouts.twodee = {}
com.somerandomdude.coordy.layouts.twodee.ILayout2d = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.twodee.ILayout2d"] = com.somerandomdude.coordy.layouts.twodee.ILayout2d;
com.somerandomdude.coordy.layouts.twodee.ILayout2d.__name__ = ["com","somerandomdude","coordy","layouts","twodee","ILayout2d"];
com.somerandomdude.coordy.layouts.twodee.ILayout2d.__interfaces__ = [com.somerandomdude.coordy.layouts.ILayout];
com.somerandomdude.coordy.layouts.twodee.ILayout2d.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,rotation: null
	,jitterX: null
	,jitterY: null
	,renderNode: null
	,clone: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.ILayout2d
	,__properties__: {set_jitterY:"set_jitterY",set_jitterX:"set_jitterX",set_rotation:"set_rotation",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_y:"set_y",set_x:"set_x"}
}
com.somerandomdude.coordy.layouts.twodee.Layout2d = function() {
	com.somerandomdude.coordy.layouts.Layout.call(this);
	this.updateFunction = this.updateAndRender.$bind(this);
	this.set_updateMethod("updateAndRender");
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Layout2d"] = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Layout2d.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Layout2d"];
com.somerandomdude.coordy.layouts.twodee.Layout2d.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Layout2d.__super__ = com.somerandomdude.coordy.layouts.Layout;
com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype = $extend(com.somerandomdude.coordy.layouts.Layout.prototype,{
	x: null
	,y: null
	,width: null
	,height: null
	,rotation: null
	,jitterX: null
	,jitterY: null
	,updateMethod: null
	,updateFunction: null
	,proxyUpdater: null
	,set_proxyUpdater: function(value) {
		this.set_updateMethod(value.get_name());
		this.updateFunction = value.update.$bind(value);
		return this.proxyUpdater;
	}
	,set_updateMethod: function(value) {
		this.updateMethod = value;
		switch(value) {
		case "none":
			this.updateFunction = function() {
			};
			break;
		case "updateOnly":
			this.updateFunction = this.update.$bind(this);
			break;
		default:
			this.updateFunction = this.updateAndRender.$bind(this);
		}
		return this.updateMethod;
	}
	,set_rotation: function(value) {
		this.rotation = value;
		this.updateFunction();
		return this.rotation;
	}
	,set_x: function(value) {
		this.x = value;
		this.updateFunction();
		return this.x;
	}
	,set_y: function(value) {
		this.y = value;
		this.updateFunction();
		return this.y;
	}
	,get_width: function() {
		return this.width;
	}
	,set_width: function(value) {
		this.width = value;
		this.updateFunction();
		return this.get_width();
	}
	,get_height: function() {
		return this.height;
	}
	,set_height: function(value) {
		this.height = value;
		this.updateFunction();
		return this.get_height();
	}
	,set_jitterX: function(value) {
		this.jitterX = value;
		this.updateFunction();
		return this.jitterX;
	}
	,set_jitterY: function(value) {
		this.jitterY = value;
		this.updateFunction();
		return this.jitterY;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.Layout.prototype.removeNode.call(this,node);
		this.updateFunction();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeRemove",node));
	}
	,executeUpdateMethod: function() {
		this.updateFunction();
	}
	,updateAndRender: function() {
		this.update();
		this.render();
	}
	,update: function() {
	}
	,render: function() {
		var n;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			n = this.nodes[i];
			if(n.get_link() == null) continue;
			n.get_link().x = n.x;
			n.get_link().y = n.y;
		}
	}
	,clone: function() {
		throw "Method must be overriden by child class";
		return null;
	}
	,renderNode: function(node) {
		node.get_link().x = node.x;
		node.get_link().y = node.y;
	}
	,validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"rotation")) return true;
		return false;
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Layout2d
	,__properties__: {set_proxyUpdater:"set_proxyUpdater",set_updateMethod:"set_updateMethod",set_jitterY:"set_jitterY",set_jitterX:"set_jitterX",set_rotation:"set_rotation",set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width",set_y:"set_y",set_x:"set_x"}
});
com.somerandomdude.coordy.layouts.twodee.Ellipse = function(width,height,x,y,rotation,jitterX,jitterY,alignType,alighOffset) {
	if(alighOffset == null) alighOffset = 0;
	if(alignType == null) alignType = "noAlign";
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(rotation == null) rotation = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.set_x(x);
	this.set_y(y);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_rotation(rotation);
	this.set_alignType(alignType);
	this.set_alignAngleOffset(this.get_alignAngleOffset());
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Ellipse"] = com.somerandomdude.coordy.layouts.twodee.Ellipse;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Ellipse, "Coordinates.layouts.twodee.Ellipse");
com.somerandomdude.coordy.layouts.twodee.Ellipse.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Ellipse"];
com.somerandomdude.coordy.layouts.twodee.Ellipse.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Ellipse.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Ellipse.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	alignType: null
	,get_alignType: function() {
		return this.alignType;
	}
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,alignAngleOffset: null
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,eccentricity: null
	,get_eccentricity: function() {
		var a = this.get_width() > this.get_height()?this.get_width() / 2:this.get_height() / 2;
		var b = this.get_width() > this.get_height()?this.get_height() / 2:this.get_width() / 2;
		var e = Math.sqrt(1 - Math.pow(b,2) / Math.pow(a,2));
		return e;
	}
	,toString: function() {
		return "Ellipse";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.twodee.EllipseNode(object,0,0,0,(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random());
		this.storeNode(node);
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,renderNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.renderNode.call(this,node);
		node.get_link().rotation = node.rotation;
	}
	,render: function() {
		var c;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			if(c.get_link() == null) continue;
			c.get_link().x = c.x;
			c.get_link().y = c.y;
			c.get_link().rotation = this.get_alignType() == "noAlign"?0:c.rotation;
		}
	}
	,getCellAngle: function(cell) {
		var xR;
		var yR;
		xR = cell.get_link().x - (this.x + this.get_width() / 2);
		yR = cell.get_link().y - (this.y + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		return a;
	}
	,setNodeAndle: function(node,angle) {
		var nAngle = this.getCellAngle(node);
		this.set_rotation(this.rotation - nAngle - angle);
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Ellipse(this.get_width(),this.get_height(),this.x,this.y,this.rotation,this.jitterX,this.jitterY,this.get_alignType(),this.get_alignAngleOffset());
	}
	,update: function() {
		var w = this.get_width() / 2;
		var h = this.get_height() / 2;
		var rOffset = this.rotation * (Math.PI / 180);
		var rad;
		var c;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			rad = Math.PI * i / (this.size / 2) + rOffset;
			c.x = w * Math.cos(rad) + (w + this.x) + c.jitterX * this.jitterX - w;
			c.y = h * Math.sin(rad) + (h + this.y) + c.jitterY * this.jitterY - h;
			c.rotation = Math.atan2(this.y - c.y,this.x - c.x) * (180 / Math.PI);
			if(this.get_alignType() == "alignPerpendicular") c.rotation += 90;
			c.rotation += this.get_alignAngleOffset();
		}
	}
	,rotateCellToTop: function(cell) {
		var xR;
		var yR;
		xR = cell.get_link().x - (this.x + this.get_width() / 2);
		yR = cell.get_link().y - (this.y + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.rotation - a);
		return a;
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Ellipse
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{get_eccentricity:"get_eccentricity",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset",set_alignType:"set_alignType",get_alignType:"get_alignType"})
});
com.somerandomdude.coordy.layouts.twodee.Grid = function(width,height,columns,rows,paddingX,vPadding,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(vPadding == null) vPadding = 0;
	if(paddingX == null) paddingX = 0;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.rows = rows;
	this.columns = columns;
	this.maxNodes = rows * columns;
	this.paddingX = paddingX;
	this.paddingY = vPadding;
	this.set_x(x);
	this.set_y(y);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Grid"] = com.somerandomdude.coordy.layouts.twodee.Grid;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Grid, "Coordinates.layouts.twoodee.Grid");
com.somerandomdude.coordy.layouts.twodee.Grid.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Grid"];
com.somerandomdude.coordy.layouts.twodee.Grid.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Grid.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Grid.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	rows: null
	,columns: null
	,paddingX: null
	,paddingY: null
	,hDirection: null
	,vDirection: null
	,maxNodes: null
	,set_hDirection: function(value) {
		this.hDirection = value;
		this.updateFunction();
		return this.hDirection;
	}
	,set_vDirection: function(value) {
		this.vDirection = value;
		this.updateFunction();
		return this.vDirection;
	}
	,toString: function() {
		return "Grid";
	}
	,getColumn: function(column) {
		var c = new Array();
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i * this.columns + column]);
		}
		return c;
	}
	,getRow: function(row) {
		var c = new Array();
		var _g1 = row * this.columns, _g = row * this.columns + this.columns;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i]);
		}
		return c;
	}
	,removeItemAt: function(column,row) {
		this.getNodeFromCoordinates(column,row).set_link(null);
	}
	,addItemAt: function(object,column,row,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(!this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"rotation\"";
		if(this.linkExists(object)) return null;
		var node = this.getNodeFromCoordinates(column,row);
		node.set_link(object);
		if(moveToCoordinates) {
			object.x = node.x;
			object.y = node.y;
		}
		return node;
	}
	,getNodeFromCoordinates: function(column,row) {
		return this.nodes[row * this.columns + column];
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"rotation\"";
		if(object != null && this.linkExists(object) || this.size >= this.maxNodes) return null;
		var d = this.calculateCellSize();
		var c = this.size % this.columns;
		var r = Math.floor(this.size / (this.maxNodes / this.rows));
		var node = new com.somerandomdude.coordy.nodes.twodee.GridNode(object,c,r,d.width * c + c * this.paddingX + this.x,d.height * r + r * this.paddingY + this.y);
		this.storeNode(node);
		if(object != null && moveToCoordinates) {
			object.x = node.x;
			object.y = node.y;
		}
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,addNodes: function(count) {
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(!this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"rotation\"";
		if(object != null && this.linkExists(object) || this.size >= this.maxNodes) return null;
		var d = this.calculateCellSize();
		var c = this.size % this.columns;
		var r = Math.floor(this.size / (this.maxNodes / this.rows));
		var node = new com.somerandomdude.coordy.nodes.twodee.GridNode(object,c,r,d.width * c + c * this.paddingX + this.x,d.height * r + r * this.paddingY + this.y);
		this.storeNode(node);
		if(moveToCoordinates) {
			object.x = node.x;
			object.y = node.y;
		}
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Grid(this.get_width(),this.get_height(),this.columns,this.rows,this.paddingX,this.paddingY,this.x,this.y,this.jitterX,this.jitterY);
	}
	,update: function() {
		var total = this.columns * this.rows;
		var d = this.calculateCellSize();
		var c;
		var r;
		var node;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			if(node == null) break;
			c = i % this.columns;
			r = Math.floor(i / (total / this.rows));
			if(this.hDirection == "rightToLeft") c = this.columns - 1 - c;
			if(this.vDirection == "downToUp") r = this.rows - 1 - r;
			node.x = d.width * c + c * this.paddingX + this.x;
			node.y = d.height * r + r * this.paddingY + this.y;
		}
	}
	,calculateCellSize: function() {
		return new com.somerandomdude.coordy.geom.Rectangle(0,0,(this.get_width() - (this.columns - 1) * this.paddingX) / this.columns,(this.get_height() - (this.rows - 1) * this.paddingY) / this.rows);
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Grid
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_hDirection:"set_hDirection"})
});
com.somerandomdude.coordy.layouts.twodee.Lattice = function(width,height,columns,rows,allowOverflow,order,hPadding,vPadding,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(vPadding == null) vPadding = 0;
	if(hPadding == null) hPadding = 0;
	if(order == null) order = "latticeOrderHorizontally";
	if(allowOverflow == null) allowOverflow = true;
	if(rows == null) rows = 1;
	if(columns == null) columns = 1;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.paddingX = hPadding;
	this.paddingY = vPadding;
	this.set_x(x);
	this.set_y(y);
	this.columns = columns;
	this.rows = rows;
	this.columnWidth = width / columns;
	this.rowHeight = height / rows;
	this.set_width(width);
	this.set_height(height);
	this.maxCells = rows * columns;
	this.allowOverflow = allowOverflow;
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.latticeType = "diagonalLattice";
	this.alternate = "diagonalLatticeAlternalVertially";
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Lattice"] = com.somerandomdude.coordy.layouts.twodee.Lattice;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Lattice, "Coordinates.layouts.twodee.Lattice");
com.somerandomdude.coordy.layouts.twodee.Lattice.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Lattice"];
com.somerandomdude.coordy.layouts.twodee.Lattice.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Lattice.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Lattice.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	order: null
	,rows: null
	,columns: null
	,paddingX: null
	,paddingY: null
	,columnWidth: null
	,rowHeight: null
	,latticeType: null
	,alternate: null
	,allowOverflow: null
	,maxCells: null
	,get_latticeType: function() {
		return this.latticeType;
	}
	,set_latticeType: function(value) {
		this.latticeType = value;
		this.updateFunction();
	}
	,get_alternate: function() {
		return this.alternate;
	}
	,set_alternate: function(value) {
		this.alternate = value;
		this.updateFunction();
	}
	,get_order: function() {
		return this.order;
	}
	,set_order: function(value) {
		this.order = value;
		this.adjustLattice();
		this.updateFunction();
	}
	,get_allowOverflow: function() {
		return this.allowOverflow;
	}
	,set_allowOverflow: function(value) {
		this.allowOverflow = value;
		return this.allowOverflow;
	}
	,get_width: function() {
		return this.columnWidth * this.columns;
	}
	,set_width: function(value) {
		this.width = value;
		this.columnWidth = value / this.columns;
		this.updateFunction();
		return this.get_width();
	}
	,get_height: function() {
		return this.rowHeight * this.rows;
	}
	,set_height: function(value) {
		this.height = value;
		this.rowHeight = value / this.rows;
		this.updateFunction();
		return this.get_height();
	}
	,get_paddingX: function() {
		return this.paddingX;
	}
	,set_paddingX: function(value) {
		this.paddingX = value;
		this.updateFunction();
		return this.paddingX;
	}
	,get_paddingY: function() {
		return this.paddingY;
	}
	,set_paddingY: function(value) {
		this.paddingY = value;
		this.updateFunction();
		return this.paddingY;
	}
	,get_columnWidth: function() {
		return this.columnWidth;
	}
	,set_columnWidth: function(value) {
		this.columnWidth = value;
		this.updateFunction();
		return this.columnWidth;
	}
	,get_rowHeight: function() {
		return this.rowHeight;
	}
	,set_rowHeight: function(value) {
		this.rowHeight = value;
		this.updateFunction();
		return this.rowHeight;
	}
	,get_rows: function() {
		return this.rows;
	}
	,set_rows: function(value) {
		this.rows = value;
		this.order = "latticeOrderVertically";
		this.adjustLattice();
		this.updateFunction();
		this.maxCells = this.rows * this.columns;
		return this.rows;
	}
	,get_columns: function() {
		return this.columns;
	}
	,set_columns: function(value) {
		this.columns = value;
		this.order = "latticeOrderHorizontally";
		this.adjustLattice();
		this.updateFunction();
		this.maxCells = this.rows * this.columns;
		return this.columns;
	}
	,toString: function() {
		return "Lattice";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		if(!this.allowOverflow && this.size >= this.maxCells) return null;
		var c = this.order == "latticeOrderVertically"?this.size % this.columns:this.size % Math.floor(this.size / this.rows);
		var r = this.order == "latticeOrderVertically"?Math.floor(this.size / this.columns):this.size % this.rows;
		var node = new com.somerandomdude.coordy.nodes.twodee.GridNode(object,c,r);
		this.storeNode(node);
		this.adjustLattice();
		this.update();
		if(object != null && moveToCoordinates) this.render();
		if(this.order == "latticeOrderHorizontally") this.columns = Math.ceil(this.size / this.rows); else if(this.order == "latticeOrderHorizontally") this.rows = Math.ceil(this.size / this.columns);
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.removeNode.call(this,node);
		this.adjustLattice();
		this.updateFunction();
	}
	,update: function() {
		var node;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			if(node == null) break;
			node.x = node.column * (this.columnWidth + this.paddingX) + this.x + node.jitterX * this.jitterX;
			node.y = node.row * (this.rowHeight + this.paddingY) + this.y + node.jitterY * this.jitterY;
			if(this.latticeType == "diagonalLattice" && this.alternate == "diagonalLatticeAlternalVertially" && node.row % 2 != 0) node.x += this.columnWidth / 2; else if(this.latticeType == "diagonalLattice" && this.alternate == "diagonalLatticeAlternalHorizontally" && node.column % 2 != 0) node.y += this.rowHeight / 2;
		}
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Lattice(this.get_width(),this.get_height(),this.columns,this.rows,this.allowOverflow,this.order,this.paddingX,this.paddingY,this.x,this.y,this.jitterX,this.jitterY);
	}
	,adjustLattice: function() {
		var c;
		var r;
		var node;
		var i;
		if(this.order == "latticeOrderHorizontally") {
			var _g1 = 0, _g = this.size;
			while(_g1 < _g) {
				var i1 = _g1++;
				node = this.nodes[i1];
				if(node == null) break;
				c = i1 % this.columns;
				r = Math.floor(i1 / this.columns);
				node.column = c;
				node.row = r;
			}
		} else {
			var _g1 = 0, _g = this.size;
			while(_g1 < _g) {
				var i1 = _g1++;
				node = this.nodes[i1];
				if(node == null) break;
				c = Math.floor(i1 / this.rows);
				r = i1 % this.rows;
				node.column = c;
				node.row = r;
			}
		}
		if(this.order == "latticeOrderVertically") this.columns = Math.ceil(this.size / this.rows); else if(this.order == "latticeOrderHorizontally") this.rows = Math.ceil(this.size / this.columns);
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Lattice
});
com.somerandomdude.coordy.layouts.twodee.Scatter = function(width,height,x,y,jitter,jitterRotation) {
	if(jitterRotation == null) jitterRotation = false;
	if(jitter == null) jitter = 1;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.set_x(x);
	this.set_y(y);
	this.set_jitter(jitter);
	this.set_jitterRotation(jitterRotation);
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Scatter"] = com.somerandomdude.coordy.layouts.twodee.Scatter;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Scatter, "com.somerandomdude.coordy.layouts.twodee.Scatter");
com.somerandomdude.coordy.layouts.twodee.Scatter.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Scatter"];
com.somerandomdude.coordy.layouts.twodee.Scatter.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Scatter.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	jitter: null
	,get_jitter: function() {
		return this.jitter;
	}
	,set_jitter: function(value) {
		this.jitter = value;
		this.updateFunction();
		return this.get_jitter();
	}
	,jitterRotation: null
	,get_jitterRotation: function() {
		return this.jitterRotation;
	}
	,set_jitterRotation: function(value) {
		this.jitterRotation = value;
		this.updateFunction();
		return this.get_jitterRotation();
	}
	,toString: function() {
		return "Scatter";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var p = Math.round(Math.random()) != 0?-1:1;
		var xPos = this.getXPos(p);
		p = Math.round(Math.random()) != 0?-1:1;
		var yPos = this.getYPos(p);
		p = Math.round(Math.random()) != 0?-1:1;
		var node = new com.somerandomdude.coordy.nodes.twodee.ScatterNode(object,xPos,yPos,this.get_jitterRotation()?Math.random() * p * 360:0);
		node.set_xRelation(node.x / this.get_width());
		node.set_yRelation(node.y / this.get_height());
		this.storeNode(node);
		if(object != null && moveToCoordinates) {
			object.x = node.x;
			object.y = node.y;
			object.rotation = node.rotation;
		}
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
	}
	,render: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			var localNode = this.nodes[i].link;
			localNode.x = this.nodes[i].x;
			localNode.y = this.nodes[i].y;
			localNode.rotation = this.nodes[i].rotation;
		}
	}
	,update: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].x = this.nodes[i].xRelation * this.get_width() + this.x;
			this.nodes[i].y = this.nodes[i].yRelation * this.get_height() + this.y;
		}
	}
	,scatter: function() {
		var p;
		var node;
		var xPos;
		var yPos;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			p = Math.round(Math.random()) != 0?-1:1;
			xPos = this.getXPos(p);
			p = Math.round(Math.random()) != 0?-1:1;
			yPos = this.getYPos(p);
			node.x = xPos;
			node.y = yPos;
			node.set_xRelation(node.x / this.get_width());
			node.set_yRelation(node.y / this.get_height());
			node.rotation = this.get_jitterRotation()?Math.random() * p * 360:0;
		}
		this.updateFunction();
	}
	,getP: function() {
		return Math.round(Math.random()) != 0?-1:1;
	}
	,getXPos: function(p) {
		return this.get_width() / 2 + Math.random() * this.get_width() * this.get_jitter() / 2 * p + this.x;
	}
	,getYPos: function(p) {
		return this.get_height() / 2 + Math.random() * this.get_height() * this.get_jitter() / 2 * p + this.y;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Scatter(this.get_width(),this.get_height(),this.get_jitter(),this.x,this.y,this.get_jitterRotation());
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Scatter
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_jitterRotation:"set_jitterRotation",get_jitterRotation:"get_jitterRotation",set_jitter:"set_jitter",get_jitter:"get_jitter"})
});
com.somerandomdude.coordy.layouts.twodee.Spiral = function(circumference,spiralConstant,x,y,angleDelta,rotation,jitterX,jitterY,alignType,alignOffset) {
	if(alignOffset == null) alignOffset = 0;
	if(alignType == null) alignType = "noAlign";
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(rotation == null) rotation = 0;
	if(angleDelta == null) angleDelta = 30;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(spiralConstant == null) spiralConstant = .15;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_circumference(circumference);
	this.set_x(x);
	this.set_y(y);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_rotation(rotation);
	this.set_angleDelta(angleDelta);
	this.set_spiralConstant(spiralConstant);
	this.set_alignType(alignType);
	this.set_alignAngleOffset(alignOffset);
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Spiral"] = com.somerandomdude.coordy.layouts.twodee.Spiral;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Spiral, "Coordinates.layouts.twodee.Spiral");
com.somerandomdude.coordy.layouts.twodee.Spiral.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Spiral"];
com.somerandomdude.coordy.layouts.twodee.Spiral.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Spiral.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Spiral.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	angleDelta: null
	,get_angleDelta: function() {
		return this.angleDelta;
	}
	,set_angleDelta: function(value) {
		this.angleDelta = value;
		this.updateFunction();
		return this.get_angleDelta();
	}
	,spiralConstant: null
	,get_spiralConstant: function() {
		return this.spiralConstant;
	}
	,set_spiralConstant: function(value) {
		this.spiralConstant = value;
		this.updateFunction();
		return this.get_spiralConstant();
	}
	,circumference: null
	,get_circumference: function() {
		return this.circumference;
	}
	,set_circumference: function(value) {
		this.circumference = value;
		this.updateFunction();
		return this.get_circumference();
	}
	,set_height: function(value) {
		this.height = value;
		this.set_circumference(value);
		this.updateFunction();
		return this.get_height();
	}
	,set_width: function(value) {
		this.width = value;
		this.set_circumference(value);
		this.updateFunction();
		return this.get_width();
	}
	,alignAngleOffset: null
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,alignType: null
	,get_alignType: function() {
		return this.alignType;
	}
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,toString: function() {
		return "Spiral";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.twodee.Node2d(object,0,0,(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random());
		this.storeNode(node);
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,renderNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.renderNode.call(this,node);
		node.get_link().rotation = node.rotation;
	}
	,render: function() {
		var c;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			if(c.get_link() == null) continue;
			c.get_link().x = c.x;
			c.get_link().y = c.y;
			c.get_link().rotation = this.get_alignType() == "noAlign"?0:c.rotation;
		}
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Ellipse(this.get_width(),this.get_height(),this.x,this.y,this.rotation,this.jitterX,this.jitterY,this.get_alignType(),this.get_alignAngleOffset());
	}
	,update: function() {
		var w = this.get_width() / 2;
		var h = this.get_height() / 2;
		var rOffset = this.rotation * (Math.PI / 180);
		var rad;
		var c;
		var phi;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			phi = this.get_angleDelta() * i * Math.PI / 180;
			c.x = this.x + this.get_circumference() * Math.exp(this.get_spiralConstant() * phi) * Math.cos(phi);
			c.y = this.y + this.get_circumference() * Math.exp(this.get_spiralConstant() * phi) * Math.sin(phi);
			c.rotation = Math.atan2(this.y - c.y,this.x - c.x) * (180 / Math.PI);
			if(this.get_alignType() == "alignPerpendicular") c.rotation += 90;
			c.rotation += this.get_alignAngleOffset();
		}
	}
	,rotateCellToTop: function(cell) {
		var xR = cell.get_link().x - (this.x + this.get_width() / 2);
		var yR = cell.get_link().y - (this.y + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.rotation - a);
		return a;
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.Spiral
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_alignType:"set_alignType",get_alignType:"get_alignType",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset",set_circumference:"set_circumference",get_circumference:"get_circumference",set_spiralConstant:"set_spiralConstant",get_spiralConstant:"get_spiralConstant",set_angleDelta:"set_angleDelta",get_angleDelta:"get_angleDelta"})
});
com.somerandomdude.coordy.layouts.twodee.VerticalLine = function(vPadding,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(vPadding == null) vPadding = 0;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_vPadding(vPadding);
	this.set_x(x);
	this.set_y(y);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.VerticalLine"] = com.somerandomdude.coordy.layouts.twodee.VerticalLine;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.VerticalLine, "Coordinates.layouts.twodee.VerticalLine");
com.somerandomdude.coordy.layouts.twodee.VerticalLine.__name__ = ["com","somerandomdude","coordy","layouts","twodee","VerticalLine"];
com.somerandomdude.coordy.layouts.twodee.VerticalLine.__interfaces__ = [com.somerandomdude.coordy.layouts.IOrderedLayout,com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.VerticalLine.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.VerticalLine.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	vPadding: null
	,get_vPadding: function() {
		return this.vPadding;
	}
	,set_vPadding: function(value) {
		this.vPadding = value;
		this.updateFunction();
		return this.get_vPadding();
	}
	,order: null
	,get_order: function() {
		return this.order;
	}
	,set_order: function(value) {
		this.order = value;
		this.updateFunction();
		return this.get_order();
	}
	,toString: function() {
		return "VerticalLine";
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"height\", \"rotation\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.twodee.OrderedNode(object,this.size);
		this.storeNode(node);
		this.cleanOrder();
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.VerticalLine(this.get_vPadding(),this.x,this.y,this.jitterX,this.jitterY);
	}
	,update: function() {
		if(this.size == 0) return;
		var node;
		this.nodes.sort(this.sortOnOrder.$bind(this));
		var yPos = 0;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			node = this.nodes[i];
			node.y = yPos + this.y + node.jitterY * this.jitterY;
			node.x = this.x + node.jitterX * this.jitterX;
			if(node.get_link() == null) continue;
			yPos += node.get_link().height + this.get_vPadding();
		}
	}
	,cleanOrder: function() {
		this.nodes.sort(this.sortOnOrder.$bind(this));
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].order = i;
		}
	}
	,sortOnOrder: function(x,y) {
		if(x.get_order() == y.get_order()) return 0;
		if(x.get_order() > y.get_order()) return 1;
		return -1;
	}
	,validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"rotation") && Reflect.hasField(object,"height")) return true;
		return false;
	}
	,__class__: com.somerandomdude.coordy.layouts.twodee.VerticalLine
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_order:"set_order",get_order:"get_order",set_vPadding:"set_vPadding",get_vPadding:"get_vPadding"})
});
com.somerandomdude.coordy.nodes = {}
com.somerandomdude.coordy.nodes.INode = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.INode"] = com.somerandomdude.coordy.nodes.INode;
com.somerandomdude.coordy.nodes.INode.__name__ = ["com","somerandomdude","coordy","nodes","INode"];
com.somerandomdude.coordy.nodes.INode.prototype = {
	link: null
	,toObject: null
	,__class__: com.somerandomdude.coordy.nodes.INode
	,__properties__: {set_link:"set_link",get_link:"get_link"}
}
com.somerandomdude.coordy.nodes.Node = function(link) {
	this.set_link(link);
};
$hxClasses["com.somerandomdude.coordy.nodes.Node"] = com.somerandomdude.coordy.nodes.Node;
com.somerandomdude.coordy.nodes.Node.__name__ = ["com","somerandomdude","coordy","nodes","Node"];
com.somerandomdude.coordy.nodes.Node.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.Node.prototype = {
	link: null
	,get_link: function() {
		return this.link;
	}
	,set_link: function(value) {
		return this.link = value;
	}
	,toObject: function() {
		throw "Method must be called in Node descendant";
		return null;
	}
	,__class__: com.somerandomdude.coordy.nodes.Node
	,__properties__: {set_link:"set_link",get_link:"get_link"}
}
com.somerandomdude.coordy.nodes.threedee = {}
com.somerandomdude.coordy.nodes.threedee.INode3d = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.threedee.INode3d"] = com.somerandomdude.coordy.nodes.threedee.INode3d;
com.somerandomdude.coordy.nodes.threedee.INode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","INode3d"];
com.somerandomdude.coordy.nodes.threedee.INode3d.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.threedee.INode3d.prototype = {
	x: null
	,y: null
	,z: null
	,jitterX: null
	,jitterY: null
	,rotationX: null
	,rotationY: null
	,rotationZ: null
	,clone: null
	,__class__: com.somerandomdude.coordy.nodes.threedee.INode3d
	,__properties__: {set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ",set_rotationY:"set_rotationY",get_rotationY:"get_rotationY",set_rotationX:"set_rotationX",get_rotationX:"get_rotationX",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
}
com.somerandomdude.coordy.nodes.threedee.Node3d = function(link,x,y,z,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.nodes.Node.call(this,link);
	this.set_x(x);
	this.set_y(y);
	this.set_z(z);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_jitterZ(jitterZ);
};
$hxClasses["com.somerandomdude.coordy.nodes.threedee.Node3d"] = com.somerandomdude.coordy.nodes.threedee.Node3d;
com.somerandomdude.coordy.nodes.threedee.Node3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","Node3d"];
com.somerandomdude.coordy.nodes.threedee.Node3d.__interfaces__ = [com.somerandomdude.coordy.nodes.threedee.INode3d];
com.somerandomdude.coordy.nodes.threedee.Node3d.__super__ = com.somerandomdude.coordy.nodes.Node;
com.somerandomdude.coordy.nodes.threedee.Node3d.prototype = $extend(com.somerandomdude.coordy.nodes.Node.prototype,{
	x: null
	,y: null
	,z: null
	,jitterX: null
	,jitterY: null
	,jitterZ: null
	,rotationX: null
	,rotationY: null
	,rotationZ: null
	,get_x: function() {
		return this.x;
	}
	,set_x: function(value) {
		return this.x = value;
	}
	,get_y: function() {
		return this.y;
	}
	,set_y: function(value) {
		return this.y = value;
	}
	,get_z: function() {
		return this.z;
	}
	,set_z: function(value) {
		return this.z = value;
	}
	,get_jitterX: function() {
		return this.jitterX;
	}
	,set_jitterX: function(value) {
		return this.jitterX = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,get_jitterY: function() {
		return this.jitterY;
	}
	,set_jitterY: function(value) {
		return this.jitterY = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,get_jitterZ: function() {
		return this.jitterZ;
	}
	,set_jitterZ: function(value) {
		return this.jitterZ = value;
	}
	,get_rotationX: function() {
		return this.rotationX;
	}
	,set_rotationX: function(value) {
		return this.rotationX = value;
	}
	,get_rotationY: function() {
		return this.rotationY;
	}
	,set_rotationY: function(value) {
		return this.rotationY = value;
	}
	,get_rotationZ: function() {
		return this.rotationZ;
	}
	,set_rotationZ: function(value) {
		return this.rotationZ = value;
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.Node3d(this.get_link(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		n.set_rotationX(this.get_rotationX());
		n.set_rotationY(this.get_rotationY());
		n.set_rotationZ(this.get_rotationZ());
		return n;
	}
	,toObject: function() {
		return { x : this.get_x(), y : this.get_y(), z : this.get_z(), rotationX : this.get_rotationX(), rotationY : this.get_rotationY(), rotationZ : this.get_rotationZ()};
	}
	,__class__: com.somerandomdude.coordy.nodes.threedee.Node3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.Node.prototype.__properties__,{set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ",set_rotationY:"set_rotationY",get_rotationY:"get_rotationY",set_rotationX:"set_rotationX",get_rotationX:"get_rotationX",set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"})
});
com.somerandomdude.coordy.nodes.threedee.EllipseNode3d = function(link,x,y,z,rotationX,rotationY,rotationZ,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(rotationZ == null) rotationZ = 0;
	if(rotationY == null) rotationY = 0;
	if(rotationX == null) rotationX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.nodes.threedee.Node3d.call(this,link,x,y,z,jitterX,jitterY,jitterZ);
	this.set_rotationX(rotationX);
	this.set_rotationY(rotationY);
	this.set_rotationZ(rotationZ);
};
$hxClasses["com.somerandomdude.coordy.nodes.threedee.EllipseNode3d"] = com.somerandomdude.coordy.nodes.threedee.EllipseNode3d;
$hxExpose(com.somerandomdude.coordy.nodes.threedee.EllipseNode3d, "Coordinates.node.threedee.EllipseNode3d");
com.somerandomdude.coordy.nodes.threedee.EllipseNode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","EllipseNode3d"];
com.somerandomdude.coordy.nodes.threedee.EllipseNode3d.__interfaces__ = [com.somerandomdude.coordy.nodes.threedee.INode3d];
com.somerandomdude.coordy.nodes.threedee.EllipseNode3d.__super__ = com.somerandomdude.coordy.nodes.threedee.Node3d;
com.somerandomdude.coordy.nodes.threedee.EllipseNode3d.prototype = $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype,{
	clone: function() {
		return new com.somerandomdude.coordy.nodes.threedee.EllipseNode3d(this.get_link(),this.get_x(),this.get_y(),this.get_z(),this.get_rotationX(),this.get_rotationY(),this.get_rotationZ(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,__class__: com.somerandomdude.coordy.nodes.threedee.EllipseNode3d
});
com.somerandomdude.coordy.nodes.threedee.GridNode3d = function(link,column,row,layer,x,y,z,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(layer == null) layer = 1;
	if(row == null) row = 1;
	if(column == null) column = 1;
	com.somerandomdude.coordy.nodes.threedee.Node3d.call(this,link,x,y,z,jitterX,jitterY,jitterZ);
	this.set_row(row);
	this.set_column(column);
	this.set_layer(layer);
};
$hxClasses["com.somerandomdude.coordy.nodes.threedee.GridNode3d"] = com.somerandomdude.coordy.nodes.threedee.GridNode3d;
com.somerandomdude.coordy.nodes.threedee.GridNode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","GridNode3d"];
com.somerandomdude.coordy.nodes.threedee.GridNode3d.__interfaces__ = [com.somerandomdude.coordy.nodes.threedee.INode3d];
com.somerandomdude.coordy.nodes.threedee.GridNode3d.__super__ = com.somerandomdude.coordy.nodes.threedee.Node3d;
com.somerandomdude.coordy.nodes.threedee.GridNode3d.prototype = $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype,{
	row: null
	,get_row: function() {
		return this.row;
	}
	,set_row: function(value) {
		return this.row = value;
	}
	,column: null
	,get_column: function() {
		return this.column;
	}
	,set_column: function(value) {
		return this.column = value;
	}
	,layer: null
	,get_layer: function() {
		return this.layer;
	}
	,set_layer: function(value) {
		return this.layer = value;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.threedee.GridNode3d(this.get_link(),this.get_column(),this.get_row(),this.get_layer(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,toObject: function() {
		return { row : this.get_row(), column : this.get_column(), layer : this.get_layer(), x : this.get_x(), y : this.get_y(), z : this.get_z(), jitterX : this.get_jitterX(), jitterY : this.get_jitterY(), jitterZ : this.get_jitterZ()};
	}
	,__class__: com.somerandomdude.coordy.nodes.threedee.GridNode3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype.__properties__,{set_layer:"set_layer",get_layer:"get_layer",set_column:"set_column",get_column:"get_column",set_row:"set_row",get_row:"get_row"})
});
com.somerandomdude.coordy.nodes.threedee.OrderedNode3d = function(link,order,x,y,z,jitterX,jitterY,jitterZ) {
	if(jitterZ == null) jitterZ = 0;
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(order == null) order = 0;
	com.somerandomdude.coordy.nodes.threedee.Node3d.call(this,link,x,y,z,jitterX,jitterY,jitterZ);
	this.set_order(order);
};
$hxClasses["com.somerandomdude.coordy.nodes.threedee.OrderedNode3d"] = com.somerandomdude.coordy.nodes.threedee.OrderedNode3d;
com.somerandomdude.coordy.nodes.threedee.OrderedNode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","OrderedNode3d"];
com.somerandomdude.coordy.nodes.threedee.OrderedNode3d.__super__ = com.somerandomdude.coordy.nodes.threedee.Node3d;
com.somerandomdude.coordy.nodes.threedee.OrderedNode3d.prototype = $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype,{
	order: null
	,get_order: function() {
		return this.order;
	}
	,set_order: function(value) {
		return this.order = value;
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.OrderedNode3d(this.get_link(),this.get_order(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		return n;
	}
	,toObject: function() {
		return { order : this.get_order(), x : this.get_x(), y : this.get_y(), z : this.get_z()};
	}
	,__class__: com.somerandomdude.coordy.nodes.threedee.OrderedNode3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype.__properties__,{set_order:"set_order",get_order:"get_order"})
});
com.somerandomdude.coordy.nodes.threedee.ScatterNode3d = function(link,x,y,z,rotationX,rotationY,rotationZ) {
	if(rotationZ == null) rotationZ = 0;
	if(rotationY == null) rotationY = 0;
	if(rotationX == null) rotationX = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.nodes.threedee.Node3d.call(this,link,x,y,z);
	this.set_rotationX(rotationX);
	this.set_rotationY(rotationY);
	this.set_rotationZ(rotationZ);
};
$hxClasses["com.somerandomdude.coordy.nodes.threedee.ScatterNode3d"] = com.somerandomdude.coordy.nodes.threedee.ScatterNode3d;
com.somerandomdude.coordy.nodes.threedee.ScatterNode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","ScatterNode3d"];
com.somerandomdude.coordy.nodes.threedee.ScatterNode3d.__interfaces__ = [com.somerandomdude.coordy.nodes.threedee.INode3d];
com.somerandomdude.coordy.nodes.threedee.ScatterNode3d.__super__ = com.somerandomdude.coordy.nodes.threedee.Node3d;
com.somerandomdude.coordy.nodes.threedee.ScatterNode3d.prototype = $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype,{
	xRelation: null
	,yRelation: null
	,zRelation: null
	,get_xRelation: function() {
		return this.xRelation;
	}
	,set_xRelation: function(value) {
		this.xRelation = value;
		return this.get_xRelation();
	}
	,get_yRelation: function() {
		return this.yRelation;
	}
	,set_yRelation: function(value) {
		this.yRelation = value;
		return this.get_yRelation();
	}
	,get_zRelation: function() {
		return this.zRelation;
	}
	,set_zRelation: function(value) {
		this.zRelation = value;
		return this.get_zRelation();
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.ScatterNode3d(this.get_link(),this.get_x(),this.get_y(),this.get_z(),this.get_rotationX(),this.get_rotationY(),this.get_rotationZ());
		n.set_xRelation(this.get_xRelation());
		n.set_yRelation(this.get_yRelation());
		n.set_zRelation(this.get_zRelation());
		return n;
	}
	,__class__: com.somerandomdude.coordy.nodes.threedee.ScatterNode3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype.__properties__,{set_zRelation:"set_zRelation",get_zRelation:"get_zRelation",set_yRelation:"set_yRelation",get_yRelation:"get_yRelation",set_xRelation:"set_xRelation",get_xRelation:"get_xRelation"})
});
com.somerandomdude.coordy.nodes.twodee = {}
com.somerandomdude.coordy.nodes.twodee.INode2d = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.twodee.INode2d"] = com.somerandomdude.coordy.nodes.twodee.INode2d;
com.somerandomdude.coordy.nodes.twodee.INode2d.__name__ = ["com","somerandomdude","coordy","nodes","twodee","INode2d"];
com.somerandomdude.coordy.nodes.twodee.INode2d.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.twodee.INode2d.prototype = {
	x: null
	,y: null
	,jitterX: null
	,jitterY: null
	,rotation: null
	,clone: null
	,__class__: com.somerandomdude.coordy.nodes.twodee.INode2d
}
com.somerandomdude.coordy.nodes.twodee.Node2d = function(link,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.setJitterX(jitterX);
	this.setJitterY(jitterY);
	this.rotation = 0;
	com.somerandomdude.coordy.nodes.Node.call(this,link);
};
$hxClasses["com.somerandomdude.coordy.nodes.twodee.Node2d"] = com.somerandomdude.coordy.nodes.twodee.Node2d;
com.somerandomdude.coordy.nodes.twodee.Node2d.__name__ = ["com","somerandomdude","coordy","nodes","twodee","Node2d"];
com.somerandomdude.coordy.nodes.twodee.Node2d.__interfaces__ = [com.somerandomdude.coordy.nodes.twodee.INode2d];
com.somerandomdude.coordy.nodes.twodee.Node2d.__super__ = com.somerandomdude.coordy.nodes.Node;
com.somerandomdude.coordy.nodes.twodee.Node2d.prototype = $extend(com.somerandomdude.coordy.nodes.Node.prototype,{
	x: null
	,y: null
	,jitterX: null
	,jitterY: null
	,rotation: null
	,setJitterX: function(value) {
		return this.jitterX = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,setJitterY: function(value) {
		return this.jitterY = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.twodee.Node2d(this.get_link(),this.x,this.y,this.jitterX,this.jitterY);
		n.rotation = this.rotation;
		return n;
	}
	,toObject: function() {
		return { x : this.x, y : this.y, rotation : this.rotation};
	}
	,__class__: com.somerandomdude.coordy.nodes.twodee.Node2d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.Node.prototype.__properties__,{set_jitterY:"setJitterY",set_jitterX:"setJitterX"})
});
com.somerandomdude.coordy.nodes.twodee.EllipseNode = function(link,x,y,rotation,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(rotation == null) rotation = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.nodes.twodee.Node2d.call(this,link,x,y,jitterX,jitterY);
	this.rotation = rotation;
};
$hxClasses["com.somerandomdude.coordy.nodes.twodee.EllipseNode"] = com.somerandomdude.coordy.nodes.twodee.EllipseNode;
com.somerandomdude.coordy.nodes.twodee.EllipseNode.__name__ = ["com","somerandomdude","coordy","nodes","twodee","EllipseNode"];
com.somerandomdude.coordy.nodes.twodee.EllipseNode.__interfaces__ = [com.somerandomdude.coordy.nodes.twodee.INode2d];
com.somerandomdude.coordy.nodes.twodee.EllipseNode.__super__ = com.somerandomdude.coordy.nodes.twodee.Node2d;
com.somerandomdude.coordy.nodes.twodee.EllipseNode.prototype = $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype,{
	clone: function() {
		return new com.somerandomdude.coordy.nodes.twodee.EllipseNode(this.get_link(),this.x,this.y,this.rotation,this.jitterX,this.jitterY);
	}
	,__class__: com.somerandomdude.coordy.nodes.twodee.EllipseNode
});
com.somerandomdude.coordy.nodes.twodee.GridNode = function(link,column,row,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(row == null) row = -1;
	if(column == null) column = -1;
	com.somerandomdude.coordy.nodes.twodee.Node2d.call(this,link,x,y,jitterX,jitterY);
	this.row = row;
	this.column = column;
};
$hxClasses["com.somerandomdude.coordy.nodes.twodee.GridNode"] = com.somerandomdude.coordy.nodes.twodee.GridNode;
com.somerandomdude.coordy.nodes.twodee.GridNode.__name__ = ["com","somerandomdude","coordy","nodes","twodee","GridNode"];
com.somerandomdude.coordy.nodes.twodee.GridNode.__interfaces__ = [com.somerandomdude.coordy.nodes.twodee.INode2d];
com.somerandomdude.coordy.nodes.twodee.GridNode.__super__ = com.somerandomdude.coordy.nodes.twodee.Node2d;
com.somerandomdude.coordy.nodes.twodee.GridNode.prototype = $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype,{
	row: null
	,column: null
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.twodee.GridNode(this.get_link(),this.column,this.row,this.x,this.y,this.jitterX,this.jitterY);
	}
	,toObject: function() {
		return { row : this.row, column : this.column, x : this.x, y : this.y, rotation : this.rotation};
	}
	,__class__: com.somerandomdude.coordy.nodes.twodee.GridNode
});
com.somerandomdude.coordy.nodes.twodee.OrderedNode = function(link,order,x,y,jitterX,jitterY) {
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(order == null) order = 0;
	com.somerandomdude.coordy.nodes.twodee.Node2d.call(this,link,x,y,jitterX,jitterY);
	this._order = order;
};
$hxClasses["com.somerandomdude.coordy.nodes.twodee.OrderedNode"] = com.somerandomdude.coordy.nodes.twodee.OrderedNode;
com.somerandomdude.coordy.nodes.twodee.OrderedNode.__name__ = ["com","somerandomdude","coordy","nodes","twodee","OrderedNode"];
com.somerandomdude.coordy.nodes.twodee.OrderedNode.__super__ = com.somerandomdude.coordy.nodes.twodee.Node2d;
com.somerandomdude.coordy.nodes.twodee.OrderedNode.prototype = $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype,{
	_order: null
	,order: null
	,get_order: function() {
		return this._order;
	}
	,set_order: function(value) {
		return this._order = value;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.twodee.OrderedNode(this.get_link(),this.get_order(),this.x,this.y,this.jitterX,this.jitterY);
	}
	,toObject: function() {
		return { order : this._order, x : this.x, y : this.y, rotation : this.rotation};
	}
	,__class__: com.somerandomdude.coordy.nodes.twodee.OrderedNode
	,__properties__: $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype.__properties__,{set_order:"set_order",get_order:"get_order"})
});
com.somerandomdude.coordy.nodes.twodee.ScatterNode = function(link,x,y,rotation) {
	if(rotation == null) rotation = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.nodes.twodee.Node2d.call(this,link,x,y);
	this.rotation = rotation;
};
$hxClasses["com.somerandomdude.coordy.nodes.twodee.ScatterNode"] = com.somerandomdude.coordy.nodes.twodee.ScatterNode;
com.somerandomdude.coordy.nodes.twodee.ScatterNode.__name__ = ["com","somerandomdude","coordy","nodes","twodee","ScatterNode"];
com.somerandomdude.coordy.nodes.twodee.ScatterNode.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.twodee.ScatterNode.__super__ = com.somerandomdude.coordy.nodes.twodee.Node2d;
com.somerandomdude.coordy.nodes.twodee.ScatterNode.prototype = $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype,{
	xRelation: null
	,get_xRelation: function() {
		return this.xRelation;
	}
	,set_xRelation: function(value) {
		return this.xRelation = value;
	}
	,yRelation: null
	,get_yRelation: function() {
		return this.yRelation;
	}
	,set_yRelation: function(value) {
		return this.yRelation = value;
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.twodee.ScatterNode(this.get_link(),this.x,this.y,this.rotation);
		n.set_xRelation(this.get_xRelation());
		n.set_yRelation(this.get_yRelation());
		return n;
	}
	,__class__: com.somerandomdude.coordy.nodes.twodee.ScatterNode
	,__properties__: $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype.__properties__,{set_yRelation:"set_yRelation",get_yRelation:"get_yRelation",set_xRelation:"set_xRelation",get_xRelation:"get_xRelation"})
});
com.somerandomdude.coordy.proxyupdaters = {}
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater = function() { }
$hxClasses["com.somerandomdude.coordy.proxyupdaters.IProxyUpdater"] = com.somerandomdude.coordy.proxyupdaters.IProxyUpdater;
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater.__name__ = ["com","somerandomdude","coordy","proxyupdaters","IProxyUpdater"];
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater.prototype = {
	name: null
	,update: null
	,__class__: com.somerandomdude.coordy.proxyupdaters.IProxyUpdater
	,__properties__: {get_name:"get_name"}
}
com.somerandomdude.coordy.utils = {}
com.somerandomdude.coordy.utils.ILayoutTransitioner = function() { }
$hxClasses["com.somerandomdude.coordy.utils.ILayoutTransitioner"] = com.somerandomdude.coordy.utils.ILayoutTransitioner;
com.somerandomdude.coordy.utils.ILayoutTransitioner.__name__ = ["com","somerandomdude","coordy","utils","ILayoutTransitioner"];
com.somerandomdude.coordy.utils.ILayoutTransitioner.prototype = {
	syncNodesTo: null
	,__class__: com.somerandomdude.coordy.utils.ILayoutTransitioner
}
com.somerandomdude.coordy.utils.LayoutTransitioner = function(layout,tweenFunction) {
	this.layout = layout;
	this.tweenFunction = tweenFunction;
};
$hxClasses["com.somerandomdude.coordy.utils.LayoutTransitioner"] = com.somerandomdude.coordy.utils.LayoutTransitioner;
$hxExpose(com.somerandomdude.coordy.utils.LayoutTransitioner, "Coordinates.utils.LayoutTransitioner");
com.somerandomdude.coordy.utils.LayoutTransitioner.__name__ = ["com","somerandomdude","coordy","utils","LayoutTransitioner"];
com.somerandomdude.coordy.utils.LayoutTransitioner.__interfaces__ = [com.somerandomdude.coordy.utils.ILayoutTransitioner];
com.somerandomdude.coordy.utils.LayoutTransitioner.prototype = {
	layout: null
	,tweenFunction: function(node) {
	}
	,syncNodesTo: function(l) {
		if(l != null) this.layout = l;
		if(this.tweenFunction.$bind(this) == null) {
			this.layout.updateAndRender();
			return;
		}
		var _g1 = 0, _g = this.layout.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.tweenFunction(this.layout.nodes[i]);
		}
	}
	,__class__: com.somerandomdude.coordy.utils.LayoutTransitioner
}
com.somerandomdude.coordy.utils.Utilities = function() { }
$hxClasses["com.somerandomdude.coordy.utils.Utilities"] = com.somerandomdude.coordy.utils.Utilities;
com.somerandomdude.coordy.utils.Utilities.__name__ = ["com","somerandomdude","coordy","utils","Utilities"];
com.somerandomdude.coordy.utils.Utilities.sortOnOrderAscending = function(x,y) {
	if(x.order == y.order) return 0;
	if(x.order > y.order) return 1;
	return -1;
}
com.somerandomdude.coordy.utils.Utilities.sortOnOrderDescending = function(x,y) {
	if(x.order == y.order) return 0;
	if(x.order > y.order) return -1;
	return 1;
}
com.somerandomdude.coordy.utils.Utilities.prototype = {
	__class__: com.somerandomdude.coordy.utils.Utilities
}
var haxe = {}
haxe.Json = function() {
};
$hxClasses["haxe.Json"] = haxe.Json;
haxe.Json.__name__ = ["haxe","Json"];
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.stringify = function(value) {
	return new haxe.Json().toString(value);
}
haxe.Json.prototype = {
	buf: null
	,str: null
	,pos: null
	,reg_float: null
	,toString: function(v) {
		this.buf = new StringBuf();
		this.toStringRec(v);
		return this.buf.b.join("");
	}
	,objString: function(v) {
		var first = true;
		this.buf.add("{");
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var value = Reflect.field(v,f);
			if(Reflect.isFunction(value)) continue;
			if(first) first = false; else this.buf.add(",");
			this.quote(f);
			this.buf.add(":");
			this.toStringRec(value);
		}
		this.buf.add("}");
	}
	,toStringRec: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 8:
			this.buf.add("\"???\"");
			break;
		case 4:
			this.objString(v);
			break;
		case 1:
		case 2:
			this.buf.add(v);
			break;
		case 5:
			this.buf.add("\"<fun>\"");
			break;
		case 6:
			var c = $e[2];
			if(c == String) this.quote(v); else if(c == Array) {
				var v1 = v;
				this.buf.add("[");
				var len = v1.length;
				if(len > 0) {
					this.toStringRec(v1[0]);
					var i = 1;
					while(i < len) {
						this.buf.add(",");
						this.toStringRec(v1[i++]);
					}
				}
				this.buf.add("]");
			} else if(c == Hash) {
				var v1 = v;
				var o = { };
				var $it0 = v1.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					o[k] = v1.get(k);
				}
				this.objString(o);
			} else if(v.iterator != null) {
				var a = [];
				var it = v.iterator();
				while( it.hasNext() ) {
					var v1 = it.next();
					a.push(v1);
				}
				this.toStringRec(a);
			} else this.objString(v);
			break;
		case 7:
			var e = $e[2];
			this.buf.add(v[1]);
			break;
		case 3:
			this.buf.add(v?"true":"false");
			break;
		case 0:
			this.buf.add("null");
			break;
		}
	}
	,quote: function(s) {
		this.buf.add("\"");
		var i = 0;
		while(true) {
			var c = s.cca(i++);
			if(c != c) break;
			switch(c) {
			case 34:
				this.buf.add("\\\"");
				break;
			case 92:
				this.buf.add("\\\\");
				break;
			case 10:
				this.buf.add("\\n");
				break;
			case 13:
				this.buf.add("\\r");
				break;
			case 9:
				this.buf.add("\\t");
				break;
			case 8:
				this.buf.add("\\b");
				break;
			case 12:
				this.buf.add("\\f");
				break;
			default:
				this.buf.addChar(c);
			}
		}
		this.buf.add("\"");
	}
	,doParse: function(str) {
		this.reg_float = new EReg("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?","");
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + this.str.cca(this.pos) + " at position " + this.pos;
	}
	,nextChar: function() {
		return this.str.cca(this.pos++);
	}
	,parseRec: function() {
		while(true) {
			var c = this.str.cca(this.pos++);
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.str.cca(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						obj[field] = this.parseRec();
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.str.cca(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.str.cca(this.pos++) != 114 || this.str.cca(this.pos++) != 117 || this.str.cca(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.str.cca(this.pos++) != 97 || this.str.cca(this.pos++) != 108 || this.str.cca(this.pos++) != 115 || this.str.cca(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.str.cca(this.pos++) != 117 || this.str.cca(this.pos++) != 108 || this.str.cca(this.pos++) != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				this.pos--;
				if(!this.reg_float.match(this.str.substr(this.pos))) throw "Invalid float at position " + this.pos;
				var v = this.reg_float.matched(0);
				this.pos += v.length;
				var f = Std.parseFloat(v);
				var i = f | 0;
				return i == f?i:f;
			default:
				this.invalidChar();
			}
		}
		return null;
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.str.cca(this.pos++);
			if(c == 34) break;
			if(c == 92) {
				buf.b[buf.b.length] = this.str.substr(start,this.pos - start - 1);
				c = this.str.cca(this.pos++);
				switch(c) {
				case 114:
					buf.b[buf.b.length] = String.fromCharCode(13);
					break;
				case 110:
					buf.b[buf.b.length] = String.fromCharCode(10);
					break;
				case 116:
					buf.b[buf.b.length] = String.fromCharCode(9);
					break;
				case 98:
					buf.b[buf.b.length] = String.fromCharCode(8);
					break;
				case 102:
					buf.b[buf.b.length] = String.fromCharCode(12);
					break;
				case 47:case 92:case 34:
					buf.b[buf.b.length] = String.fromCharCode(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + this.str.substr(this.pos,4));
					this.pos += 4;
					buf.b[buf.b.length] = String.fromCharCode(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(c != c) throw "Unclosed string";
		}
		buf.b[buf.b.length] = this.str.substr(start,this.pos - start - 1);
		return buf.b.join("");
	}
	,__class__: haxe.Json
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib["eval"] = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
if(typeof(JSON) != "undefined") haxe.Json = JSON;
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
Xml.enode = new EReg("^<([a-zA-Z0-9:._-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:._-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
com.somerandomdude.coordy.constants.GridLayoutDirection.LEFT_TO_RIGHT = "leftToRight";
com.somerandomdude.coordy.constants.GridLayoutDirection.RIGHT_TO_LEFT = "rightToLeft";
com.somerandomdude.coordy.constants.GridLayoutDirection.TOP_TO_BOTTOM = "upToDown";
com.somerandomdude.coordy.constants.GridLayoutDirection.BOTTOM_TO_TOP = "downToUp";
com.somerandomdude.coordy.constants.LatticeAlternationPattern.ALTERNATE_HORIZONTALLY = "diagonalLatticeAlternalHorizontally";
com.somerandomdude.coordy.constants.LatticeAlternationPattern.ALTERNATE_VERTICALLY = "diagonalLatticeAlternalVertially";
com.somerandomdude.coordy.constants.LatticeOrder.ORDER_HORIZONTALLY = "latticeOrderHorizontally";
com.somerandomdude.coordy.constants.LatticeOrder.ORDER_VERTICALLY = "latticeOrderVertically";
com.somerandomdude.coordy.constants.LatticeType.SQUARE = "squareLattice";
com.somerandomdude.coordy.constants.LatticeType.DIAGONAL = "diagonalLattice";
com.somerandomdude.coordy.constants.LayoutType.ELLIPSE_3D = "Ellipse3d";
com.somerandomdude.coordy.constants.LayoutType.GRID_3D = "Grid3d";
com.somerandomdude.coordy.constants.LayoutType.SCATTER_3D = "Scatter3d";
com.somerandomdude.coordy.constants.LayoutType.SNAPSHOT_3D = "Snapshot3d";
com.somerandomdude.coordy.constants.LayoutType.SPHEROID_3D = "Sphere3d";
com.somerandomdude.coordy.constants.LayoutType.STACK_3D = "Stack3d";
com.somerandomdude.coordy.constants.LayoutType.WAVE_3D = "Wave3d";
com.somerandomdude.coordy.constants.LayoutType.WAVE_ELLIPSE_3D = "WaveEllipse3d";
com.somerandomdude.coordy.constants.LayoutType.ELLIPSE = "Ellipse";
com.somerandomdude.coordy.constants.LayoutType.SPIRAL = "Spiral";
com.somerandomdude.coordy.constants.LayoutType.FLOW = "Flow";
com.somerandomdude.coordy.constants.LayoutType.GRID = "Grid";
com.somerandomdude.coordy.constants.LayoutType.HORIZONTAL_LINE = "HorizontalLine";
com.somerandomdude.coordy.constants.LayoutType.LATTICE = "Lattice";
com.somerandomdude.coordy.constants.LayoutType.SCATTER = "Scatter";
com.somerandomdude.coordy.constants.LayoutType.SNAPSHOT = "Snapshot";
com.somerandomdude.coordy.constants.LayoutType.STACK = "Stack";
com.somerandomdude.coordy.constants.LayoutType.VERTICAL_LINE = "VerticalLine";
com.somerandomdude.coordy.constants.LayoutType.WAVE = "Wave";
com.somerandomdude.coordy.constants.LayoutUpdateMethod.NONE = "none";
com.somerandomdude.coordy.constants.LayoutUpdateMethod.UPDATE_ONLY = "updateOnly";
com.somerandomdude.coordy.constants.LayoutUpdateMethod.UPDATE_AND_RENDER = "updateAndRender";
com.somerandomdude.coordy.constants.PathAlignType.ALIGN_PARALLEL = "alignParallel";
com.somerandomdude.coordy.constants.PathAlignType.ALIGN_PERPENDICULAR = "alignPerpendicular";
com.somerandomdude.coordy.constants.PathAlignType.NONE = "noAlign";
com.somerandomdude.coordy.constants.StackOrder.ASCENDING = "stackAscending";
com.somerandomdude.coordy.constants.StackOrder.DESCENDING = "stackDescending";
com.somerandomdude.coordy.constants.WaveFunction.SINE = "sineFunction";
com.somerandomdude.coordy.constants.WaveFunction.COSINE = "cosineFunction";
com.somerandomdude.coordy.constants.WaveFunction.TAN = "tanFunction";
com.somerandomdude.coordy.constants.WaveFunction.ARCSINE = "arcsineFunction";
com.somerandomdude.coordy.constants.WaveFunction.ARCCOSINE = "arccosineFunction";
com.somerandomdude.coordy.constants.WaveFunction.ARCTAN = "arctanFunction";
com.somerandomdude.coordy.events.helpers.Event.ACTIVATE = "activate";
com.somerandomdude.coordy.events.helpers.Event.ADDED = "added";
com.somerandomdude.coordy.events.helpers.Event.ADDED_TO_STAGE = "addedToStage";
com.somerandomdude.coordy.events.helpers.Event.CANCEL = "cancel";
com.somerandomdude.coordy.events.helpers.Event.CHANGE = "change";
com.somerandomdude.coordy.events.helpers.Event.CLOSE = "close";
com.somerandomdude.coordy.events.helpers.Event.COMPLETE = "complete";
com.somerandomdude.coordy.events.helpers.Event.CONNECT = "connect";
com.somerandomdude.coordy.events.helpers.Event.DEACTIVATE = "deactivate";
com.somerandomdude.coordy.events.helpers.Event.ENTER_FRAME = "enterFrame";
com.somerandomdude.coordy.events.helpers.Event.ID3 = "id3";
com.somerandomdude.coordy.events.helpers.Event.INIT = "init";
com.somerandomdude.coordy.events.helpers.Event.MOUSE_LEAVE = "mouseLeave";
com.somerandomdude.coordy.events.helpers.Event.OPEN = "open";
com.somerandomdude.coordy.events.helpers.Event.REMOVED = "removed";
com.somerandomdude.coordy.events.helpers.Event.REMOVED_FROM_STAGE = "removedFromStage";
com.somerandomdude.coordy.events.helpers.Event.RENDER = "render";
com.somerandomdude.coordy.events.helpers.Event.RESIZE = "resize";
com.somerandomdude.coordy.events.helpers.Event.SCROLL = "scroll";
com.somerandomdude.coordy.events.helpers.Event.SELECT = "select";
com.somerandomdude.coordy.events.helpers.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
com.somerandomdude.coordy.events.helpers.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
com.somerandomdude.coordy.events.helpers.Event.TAB_INDEX_CHANGE = "tabIndexChange";
com.somerandomdude.coordy.events.helpers.Event.UNLOAD = "unload";
com.somerandomdude.coordy.events.helpers.Event.SOUND_COMPLETE = "soundComplete";
com.somerandomdude.coordy.events.CoordyNodeEvent.ADD = "coordyNodeAdd";
com.somerandomdude.coordy.events.CoordyNodeEvent.REMOVE = "coordyNodeRemove";
com.somerandomdude.coordy.events.helpers.Listener.sIDs = 1;
com.somerandomdude.coordy.events.helpers.EventPhase.CAPTURING_PHASE = 0;
com.somerandomdude.coordy.events.helpers.EventPhase.AT_TARGET = 1;
com.somerandomdude.coordy.events.helpers.EventPhase.BUBBLING_PHASE = 2;
com.somerandomdude.coordy.layouts.threedee.Wave3d.PI = Math.PI;
com.somerandomdude.coordy.layouts.threedee.Wave3d.PI_180 = Math.PI / 180;
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.PI = Math.PI;
com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d.PI180 = Math.PI / 180;
com.somerandomdude.coordy.layouts.twodee.Ellipse.PI = Math.PI;
com.somerandomdude.coordy.layouts.twodee.Spiral.PI = Math.PI;
js.Lib.onerror = null;
Coordinates.main();
function $hxExpose(src, path) {
	var o = window;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
})()