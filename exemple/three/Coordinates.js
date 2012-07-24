(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
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
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIter"] = IntIter;
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
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
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
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
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
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
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
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
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
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
		ns += HxOverrides.substr(c,0,l - sl);
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
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
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
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
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
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
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
		if(v.__name__ || v.__ename__) return ValueType.TObject;
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
	return haxe.xml.Parser.parse(str);
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
	toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("<");
			s.b += Std.string(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b += Std.string(" ");
				s.b += Std.string(k);
				s.b += Std.string("=\"");
				s.b += Std.string(this._attributes.get(k));
				s.b += Std.string("\"");
			}
			if(this._children.length == 0) {
				s.b += Std.string("/>");
				return s.b;
			}
			s.b += Std.string(">");
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.b += Std.string(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("</");
			s.b += Std.string(this._nodeName);
			s.b += Std.string(">");
		}
		return s.b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.splice(pos,0,x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = HxOverrides.remove(this._children,x);
		if(b) x._parent = null;
		return b;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
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
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
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
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,_parent: null
	,_children: null
	,_attributes: null
	,_nodeValue: null
	,_nodeName: null
	,parent: null
	,nodeValue: null
	,nodeName: null
	,nodeType: null
	,__class__: Xml
	,__properties__: {set_nodeName:"setNodeName",get_nodeName:"getNodeName",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",get_parent:"getParent"}
}
var com = {}
com.somerandomdude = {}
com.somerandomdude.coordy = {}
com.somerandomdude.coordy.constants = {}
com.somerandomdude.coordy.constants.GridLayoutDirection = function() { }
$hxClasses["com.somerandomdude.coordy.constants.GridLayoutDirection"] = com.somerandomdude.coordy.constants.GridLayoutDirection;
com.somerandomdude.coordy.constants.GridLayoutDirection.__name__ = ["com","somerandomdude","coordy","constants","GridLayoutDirection"];
com.somerandomdude.coordy.constants.LatticeAlternationPattern = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeAlternationPattern"] = com.somerandomdude.coordy.constants.LatticeAlternationPattern;
com.somerandomdude.coordy.constants.LatticeAlternationPattern.__name__ = ["com","somerandomdude","coordy","constants","LatticeAlternationPattern"];
com.somerandomdude.coordy.constants.LatticeOrder = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeOrder"] = com.somerandomdude.coordy.constants.LatticeOrder;
com.somerandomdude.coordy.constants.LatticeOrder.__name__ = ["com","somerandomdude","coordy","constants","LatticeOrder"];
com.somerandomdude.coordy.constants.LatticeType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LatticeType"] = com.somerandomdude.coordy.constants.LatticeType;
com.somerandomdude.coordy.constants.LatticeType.__name__ = ["com","somerandomdude","coordy","constants","LatticeType"];
com.somerandomdude.coordy.constants.LayoutType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LayoutType"] = com.somerandomdude.coordy.constants.LayoutType;
com.somerandomdude.coordy.constants.LayoutType.__name__ = ["com","somerandomdude","coordy","constants","LayoutType"];
com.somerandomdude.coordy.constants.LayoutUpdateMethod = function() { }
$hxClasses["com.somerandomdude.coordy.constants.LayoutUpdateMethod"] = com.somerandomdude.coordy.constants.LayoutUpdateMethod;
$hxExpose(com.somerandomdude.coordy.constants.LayoutUpdateMethod, "com.somerandomdude.coordy.constants.LayoutUpdateMethod");
com.somerandomdude.coordy.constants.LayoutUpdateMethod.__name__ = ["com","somerandomdude","coordy","constants","LayoutUpdateMethod"];
com.somerandomdude.coordy.constants.PathAlignType = function() { }
$hxClasses["com.somerandomdude.coordy.constants.PathAlignType"] = com.somerandomdude.coordy.constants.PathAlignType;
com.somerandomdude.coordy.constants.PathAlignType.__name__ = ["com","somerandomdude","coordy","constants","PathAlignType"];
com.somerandomdude.coordy.constants.StackOrder = function() { }
$hxClasses["com.somerandomdude.coordy.constants.StackOrder"] = com.somerandomdude.coordy.constants.StackOrder;
com.somerandomdude.coordy.constants.StackOrder.__name__ = ["com","somerandomdude","coordy","constants","StackOrder"];
com.somerandomdude.coordy.constants.WaveFunction = function() { }
$hxClasses["com.somerandomdude.coordy.constants.WaveFunction"] = com.somerandomdude.coordy.constants.WaveFunction;
com.somerandomdude.coordy.constants.WaveFunction.__name__ = ["com","somerandomdude","coordy","constants","WaveFunction"];
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
	jeashCreateSimilar: function(type,related,targ) {
		var result = new com.somerandomdude.coordy.events.helpers.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,toString: function() {
		return "Event";
	}
	,stopPropagation: function() {
		this.jeashIsCancelled = true;
	}
	,stopImmediatePropagation: function() {
		this.jeashIsCancelledNow = this.jeashIsCancelled = true;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.events.helpers.Event(this.type,this.bubbles,this.cancelable);
	}
	,jeashGetIsCancelledNow: function() {
		return this.jeashIsCancelledNow;
	}
	,jeashGetIsCancelled: function() {
		return this.jeashIsCancelled;
	}
	,jeashSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,jeashIsCancelledNow: null
	,jeashIsCancelled: null
	,type: null
	,currentTarget: null
	,target: null
	,eventPhase: null
	,cancelable: null
	,bubbles: null
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
	clone: function() {
		return new com.somerandomdude.coordy.events.CoordyNodeEvent(this.type,this.node,this.bubbles,this.cancelable);
	}
	,node: null
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
	dispatchEvent: function(event) {
		this.mListner(event);
	}
	,Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,mID: null
	,mPriority: null
	,mUseCapture: null
	,mListner: null
	,__class__: com.somerandomdude.coordy.events.helpers.Listener
}
com.somerandomdude.coordy.events.helpers.IEventDispatcher = function() { }
$hxClasses["com.somerandomdude.coordy.events.helpers.IEventDispatcher"] = com.somerandomdude.coordy.events.helpers.IEventDispatcher;
com.somerandomdude.coordy.events.helpers.IEventDispatcher.__name__ = ["com","somerandomdude","coordy","events","helpers","IEventDispatcher"];
com.somerandomdude.coordy.events.helpers.IEventDispatcher.prototype = {
	willTrigger: null
	,removeEventListener: null
	,hasEventListener: null
	,dispatchEvent: null
	,addEventListener: null
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
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return Std.string(this);
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
	,hasEventListener: function(type) {
		return this.existList(type);
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
	,existList: function(type) {
		return this.jeashEventMap[type] != undefined;
	}
	,setList: function(type,list) {
		this.jeashEventMap[type] = list;
	}
	,getList: function(type) {
		return this.jeashEventMap[type];
	}
	,jeashEventMap: null
	,jeashTarget: null
	,__class__: com.somerandomdude.coordy.events.helpers.EventDispatcher
}
com.somerandomdude.coordy.events.helpers.EventPhase = function() { }
$hxClasses["com.somerandomdude.coordy.events.helpers.EventPhase"] = com.somerandomdude.coordy.events.helpers.EventPhase;
com.somerandomdude.coordy.events.helpers.EventPhase.__name__ = ["com","somerandomdude","coordy","events","helpers","EventPhase"];
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
	toString: function() {
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
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
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
	,scale: function(inSX,inSY) {
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		this.tx *= inSX;
		this.ty *= inSY;
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
	,translate: function(inDX,inDY) {
		this.tx += inDX;
		this.ty += inDY;
	}
	,transformPoint: function(inPos) {
		return new com.somerandomdude.coordy.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
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
	,setRotation: function(inTheta,inScale) {
		var scale = inScale == null?1.0:inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
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
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,ty: null
	,tx: null
	,d: null
	,c: null
	,b: null
	,a: null
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
	subtract: function(v) {
		return new com.somerandomdude.coordy.geom.Point(this.x - v.x,this.y - v.y);
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) this.x = thickness; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,length: null
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x,this.y);
	}
	,add: function(v) {
		return new com.somerandomdude.coordy.geom.Point(v.x + this.x,v.y + this.y);
	}
	,y: null
	,x: null
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
	extendBounds: function(r) {
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
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,isEmpty: function() {
		return this.width == 0 && this.height == 0;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
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
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new com.somerandomdude.coordy.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new com.somerandomdude.coordy.geom.Rectangle();
		return new com.somerandomdude.coordy.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,containsRect: function(rect) {
		return this.contains(rect.x,rect.y) && this.containsPoint(rect.get_bottomRight());
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new com.somerandomdude.coordy.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x + this.width,this.y + this.height);
	}
	,bottomRight: null
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new com.somerandomdude.coordy.geom.Point(this.width,this.height);
	}
	,size: null
	,set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new com.somerandomdude.coordy.geom.Point(this.x,this.y);
	}
	,topLeft: null
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,bottom: null
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,top: null
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,right: null
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,left: null
	,height: null
	,width: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.geom.Rectangle
	,__properties__: {set_left:"set_left",get_left:"get_left",set_right:"set_right",get_right:"get_right",set_top:"set_top",get_top:"get_top",set_bottom:"set_bottom",get_bottom:"get_bottom",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_size:"set_size",get_size:"get_size",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight"}
}
com.somerandomdude.coordy.layouts = {}
com.somerandomdude.coordy.layouts.ICoreLayout = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.ICoreLayout"] = com.somerandomdude.coordy.layouts.ICoreLayout;
com.somerandomdude.coordy.layouts.ICoreLayout.__name__ = ["com","somerandomdude","coordy","layouts","ICoreLayout"];
com.somerandomdude.coordy.layouts.ICoreLayout.prototype = {
	toXML: null
	,toJSON: null
	,toString: null
	,render: null
	,update: null
	,updateAndRender: null
	,swapNodeLinks: null
	,removeNodeByLink: null
	,removeNode: null
	,removeLinkAt: null
	,removeLinks: null
	,addLinkAt: null
	,getNodeAt: null
	,getNodeIndex: null
	,getNodeByLink: null
	,addToLayout: null
	,addNode: null
	,addNodes: null
	,size: null
	,nodes: null
	,__class__: com.somerandomdude.coordy.layouts.ICoreLayout
}
com.somerandomdude.coordy.layouts.ILayout = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.ILayout"] = com.somerandomdude.coordy.layouts.ILayout;
com.somerandomdude.coordy.layouts.ILayout.__name__ = ["com","somerandomdude","coordy","layouts","ILayout"];
com.somerandomdude.coordy.layouts.ILayout.__interfaces__ = [com.somerandomdude.coordy.layouts.ICoreLayout];
com.somerandomdude.coordy.layouts.ILayout.prototype = {
	executeUpdateMethod: null
	,proxyUpdater: null
	,updateMethod: null
	,__class__: com.somerandomdude.coordy.layouts.ILayout
	,__properties__: {set_updateMethod:"set_updateMethod",set_proxyUpdater:"set_proxyUpdater"}
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
	clearNodes: function() {
		if(this.nodes == null) return;
		if(this.nodes.length > 0) {
			var _g1 = 0, _g = this.nodes.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.nodes[i] = null;
				HxOverrides.remove(this.nodes,this.nodes[i]);
			}
		}
		this.nodes = new Array();
	}
	,getNextAvailableNode: function() {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link != null) return this.nodes[i];
		}
		return null;
	}
	,storeNodeAt: function(node,index) {
		if(this.nodes == null) this.nodes = new Array();
		if(index >= 0 && index < this.size) this.nodes.splice(index,0,node); else this.nodes.push(node);
		this.size++;
		return this.size;
	}
	,storeNode: function(node) {
		if(this.nodes == null) this.nodes = new Array();
		this.nodes.push(node);
		this.size++;
		return this.size;
	}
	,addLinkAt: function(object,index) {
		this.nodes[index].link = object;
	}
	,removeNodeByLink: function(link) {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link == link) this.removeNode(this.nodes[i]);
		}
	}
	,removeAllNodes: function() {
		this.clearNodes();
		this.size = 0;
	}
	,removeNode: function(node) {
		this.nodes.splice(this.getNodeIndex(node),1);
		this.size--;
	}
	,removeLinkAt: function(index) {
		this.nodes[index].link = null;
	}
	,removeLinks: function() {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].link = null;
		}
	}
	,swapNodeLinks: function(nodeTo,nodeFrom) {
		var tmpLink = nodeTo.get_link();
		nodeTo.set_link(nodeFrom.get_link());
		nodeFrom.set_link(tmpLink);
	}
	,linkExists: function(link) {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			if(link == this.nodes[i].link) return true;
		}
		return false;
	}
	,getNodeAt: function(index) {
		return this.nodes[index];
	}
	,getNodeIndex: function(node) {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i] == node) return i;
		}
		return -1;
	}
	,getNodeByLink: function(link) {
		var _g1 = 0, _g = this.nodes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nodes[i].link == link) return this.nodes[i];
		}
		return null;
	}
	,toXML: function() {
		var xml = Xml.parse("<layout></layout>");
		xml.set("type",this.toString());
		xml.set("size",js.Boot.__cast(this.size , String));
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
		}
		return xml;
	}
	,addNodes: function(count) {
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			this.addNode();
		}
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
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
	,toString: function() {
		return "";
	}
	,size: null
	,nodes: null
	,__class__: com.somerandomdude.coordy.layouts.Layout
});
com.somerandomdude.coordy.layouts.threedee = {}
com.somerandomdude.coordy.layouts.threedee.ILayout3d = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.threedee.ILayout3d"] = com.somerandomdude.coordy.layouts.threedee.ILayout3d;
com.somerandomdude.coordy.layouts.threedee.ILayout3d.__name__ = ["com","somerandomdude","coordy","layouts","threedee","ILayout3d"];
com.somerandomdude.coordy.layouts.threedee.ILayout3d.__interfaces__ = [com.somerandomdude.coordy.layouts.ILayout];
com.somerandomdude.coordy.layouts.threedee.ILayout3d.prototype = {
	clone: null
	,renderNode: null
	,jitterZ: null
	,jitterY: null
	,jitterX: null
	,rotation: null
	,depth: null
	,height: null
	,width: null
	,z: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.ILayout3d
	,__properties__: {set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_z:"set_z",get_z:"get_z",set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height",set_depth:"set_depth",get_depth:"get_depth",set_rotation:"set_rotation",get_rotation:"get_rotation",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ"}
}
com.somerandomdude.coordy.layouts.threedee.Layout3d = function() {
	com.somerandomdude.coordy.layouts.Layout.call(this);
	this.set_updateMethod("updateAndRender");
	this.updateFunction = $bind(this,this.updateAndRender);
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
	validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"z") && Reflect.hasField(object,"rotationX") && Reflect.hasField(object,"rotationY") && Reflect.hasField(object,"rotationZ")) return true;
		return false;
	}
	,renderNode: function(node) {
		if(node.get_link() == null) return;
		node.get_link().x = node.get_x();
		node.get_link().y = node.get_y();
		node.get_link().z = node.get_z();
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
	,update: function() {
		throw "Method must be overriden by child class";
	}
	,updateAndRender: function() {
		this.update();
		this.render();
	}
	,executeUpdateMethod: function() {
		this.updateFunction();
	}
	,clone: function() {
		throw "Method must be overriden by child class";
		return null;
	}
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.Layout.prototype.removeNode.call(this,node);
		this.updateFunction();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeRemove",node));
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,set_jitterZ: function(value) {
		this.jitterZ = value;
		this.updateFunction();
		return this.get_jitterZ();
	}
	,get_jitterZ: function() {
		return this.jitterZ;
	}
	,set_jitterY: function(value) {
		this.jitterY = value;
		this.updateFunction();
		return this.get_jitterY();
	}
	,get_jitterY: function() {
		return this.jitterY;
	}
	,set_jitterX: function(value) {
		this.jitterX = value;
		this.updateFunction();
		return this.get_jitterX();
	}
	,get_jitterX: function() {
		return this.jitterX;
	}
	,set_depth: function(value) {
		this.depth = value;
		this.updateFunction();
		return this.get_depth();
	}
	,get_depth: function() {
		return this.depth;
	}
	,set_height: function(value) {
		this.height = value;
		this.updateFunction();
		return this.get_height();
	}
	,get_height: function() {
		return this.height;
	}
	,set_width: function(value) {
		this.width = value;
		this.updateFunction();
		return this.get_width();
	}
	,get_width: function() {
		return this.width;
	}
	,set_z: function(value) {
		this.z = value;
		this.updateFunction();
		return this.get_z();
	}
	,get_z: function() {
		return this.z;
	}
	,set_y: function(value) {
		this.y = value;
		this.updateFunction();
		return this.get_y();
	}
	,get_y: function() {
		return this.y;
	}
	,set_x: function(value) {
		this.x = value;
		this.updateFunction();
		return this.get_x();
	}
	,get_x: function() {
		return this.x;
	}
	,set_rotation: function(value) {
		this.rotation = value;
		this.updateFunction();
		return this.get_rotation();
	}
	,get_rotation: function() {
		return this.rotation;
	}
	,set_updateMethod: function(value) {
		this.updateMethod = value;
		switch(value) {
		case "none":
			this.updateFunction = function() {
			};
			break;
		case "updateOnly":
			this.updateFunction = $bind(this,this.update);
			break;
		default:
			this.updateFunction = $bind(this,this.updateAndRender);
		}
		return this.updateMethod;
	}
	,get_updateMethod: function() {
		return this.updateMethod;
	}
	,set_proxyUpdater: function(value) {
		this.set_updateMethod(value.get_name());
		this.updateFunction = $bind(value,value.update);
		return this.proxyUpdater;
	}
	,get_proxyUpdater: function() {
		return this.proxyUpdater;
	}
	,proxyUpdater: null
	,updateFunction: null
	,updateMethod: null
	,jitterZ: null
	,jitterY: null
	,jitterX: null
	,rotation: null
	,depth: null
	,height: null
	,width: null
	,z: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.Layout3d
	,__properties__: {set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_z:"set_z",get_z:"get_z",set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height",set_depth:"set_depth",get_depth:"get_depth",set_rotation:"set_rotation",get_rotation:"get_rotation",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ",set_updateMethod:"set_updateMethod",set_proxyUpdater:"set_proxyUpdater"}
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
	update: function() {
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Grid3d(this.get_width(),this.get_height(),this.get_depth(),this.columns,this.rows,this.layers,this.paddingX,this.paddingY,this.paddingZ,this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
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
	,getNodeFromCoordinates: function(column,row) {
		return this.nodes[row * this.columns + column];
	}
	,removeItemAt: function(column,row) {
		this.getNodeFromCoordinates(column,row).set_link(null);
	}
	,getLayer: function(layer) {
		return [];
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
	,getColumn: function(column) {
		var c = [];
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i * this.columns + column]);
		}
		return c;
	}
	,toString: function() {
		return "Grid3d";
	}
	,get_cellHeight: function() {
		return this.nodes[0].height;
	}
	,cellHeight: null
	,get_cellWidth: function() {
		return this.nodes[0].width;
	}
	,cellWidth: null
	,set_maxNodes: function(value) {
		this.maxNodes = value;
		this.updateFunction();
		return this.maxNodes;
	}
	,maxNodes: null
	,set_paddingZ: function(value) {
		this.paddingZ = value;
		this.updateFunction();
		return this.paddingZ;
	}
	,paddingZ: null
	,set_paddingY: function(value) {
		this.paddingY = value;
		this.updateFunction();
		return this.paddingY;
	}
	,paddingY: null
	,set_paddingX: function(value) {
		this.paddingX = value;
		this.updateFunction();
		return this.paddingX;
	}
	,paddingX: null
	,set_layers: function(value) {
		this.layers = value;
		this.updateFunction();
		return this.layers;
	}
	,layers: null
	,set_columns: function(value) {
		this.columns = value;
		this.updateFunction();
		return this.columns;
	}
	,columns: null
	,set_rows: function(value) {
		this.rows = value;
		this.updateFunction();
		return this.rows;
	}
	,rows: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.Grid3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_rows:"set_rows",set_columns:"set_columns",set_layers:"set_layers",set_paddingX:"set_paddingX",set_paddingY:"set_paddingY",set_paddingZ:"set_paddingZ",set_maxNodes:"set_maxNodes",get_cellWidth:"get_cellWidth",get_cellHeight:"get_cellHeight"})
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
	clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Scatter3d(this.get_width(),this.get_height(),this.get_depth(),this.get_jitter(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterRotation());
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
	,update: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].x = this.nodes[i].xRelation * this.get_width() + this.get_x();
			this.nodes[i].y = this.nodes[i].yRelation * this.get_height() + this.get_y();
			this.nodes[i].z = this.nodes[i].zRelation * this.get_depth() + this.get_z();
		}
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
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
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
	,toString: function() {
		return "Scatter3d";
	}
	,set_jitterRotation: function(value) {
		this.jitterRotation = value;
		this.updateFunction();
		return this.get_jitterRotation();
	}
	,get_jitterRotation: function() {
		return this.jitterRotation;
	}
	,set_jitter: function(value) {
		this.jitter = value;
		this.updateFunction();
		return this.get_jitter();
	}
	,get_jitter: function() {
		return this.jitter;
	}
	,jitterRotation: null
	,jitter: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.Scatter3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_jitter:"set_jitter",get_jitter:"get_jitter",set_jitterRotation:"set_jitterRotation",get_jitterRotation:"get_jitterRotation"})
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
	cleanOrder: function() {
		this.nodes.sort(com.somerandomdude.coordy.utils.Utilities.sortOnOrderAscending);
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].order = i;
		}
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Stack3d(this.get_offsetAngle(),this.get_offset(),this.get_zOffset(),this.get_x(),this.get_y(),this.get_z(),this.get_order(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
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
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
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
	,toString: function() {
		return "Stack3d";
	}
	,set_offsetAngle: function(value) {
		this.angle = value;
		this.updateFunction();
		return this.get_offsetAngle();
	}
	,get_offsetAngle: function() {
		return this.angle;
	}
	,set_zOffset: function(value) {
		this.zOffset = value;
		this.updateFunction();
		return this.get_zOffset();
	}
	,get_zOffset: function() {
		return this.zOffset;
	}
	,set_offset: function(value) {
		this.offset = value;
		this.updateFunction();
		return this.get_offset();
	}
	,get_offset: function() {
		return this.offset;
	}
	,set_order: function(value) {
		this.order = value;
		this.updateFunction();
		return this.get_order();
	}
	,get_order: function() {
		return this.order;
	}
	,order: null
	,angle: null
	,zOffset: null
	,offset: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.Stack3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_offset:"set_offset",get_offset:"get_offset",set_zOffset:"set_zOffset",get_zOffset:"get_zOffset",set_angle:"set_offsetAngle",get_angle:"get_offsetAngle",set_order:"set_order",get_order:"get_order"})
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
	render: function() {
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.threedee.Wave3d(this.get_width(),this.get_height(),this.get_depth(),this.get_x(),this.get_y(),this.get_z(),this.get_frequency(),this.get_waveFunctionY(),this.get_waveFunctionZ(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Object does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.threedee.Node3d(object,0,0,0,(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random());
		this.storeNode(js.Boot.__cast(node , com.somerandomdude.coordy.nodes.threedee.INode3d));
		this.update();
		if(object != null && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,toString: function() {
		return "Wave3d";
	}
	,set_depthMultiplier: function(value) {
		this.depthMultiplier = value;
		this.updateFunction();
		return this.get_depthMultiplier();
	}
	,get_depthMultiplier: function() {
		return this.depthMultiplier;
	}
	,set_heightMultiplier: function(value) {
		this.heightMultiplier = value;
		this.updateFunction();
		return this.get_heightMultiplier();
	}
	,get_heightMultiplier: function() {
		return this.heightMultiplier;
	}
	,set_frequency: function(value) {
		this.frequency = value;
		this.updateFunction();
		return this.get_frequency();
	}
	,get_frequency: function() {
		return this.frequency;
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
	,get_waveFunctionZ: function() {
		return this.waveFunctionZ;
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
	,get_waveFunctionY: function() {
		return this.waveFunctionY;
	}
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,get_alignType: function() {
		return this.alignType;
	}
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,alignAngleOffset: null
	,alignType: null
	,depthMultiplier: null
	,heightMultiplier: null
	,functionZ: null
	,functionY: null
	,waveFunctionZ: null
	,waveFunctionY: null
	,frequency: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.Wave3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_frequency:"set_frequency",get_frequency:"get_frequency",set_waveFunctionY:"set_waveFunctionY",get_waveFunctionY:"get_waveFunctionY",set_waveFunctionZ:"set_waveFunctionZ",get_waveFunctionZ:"get_waveFunctionZ",set_heightMultiplier:"set_heightMultiplier",get_heightMultiplier:"get_heightMultiplier",set_depthMultiplier:"set_depthMultiplier",get_depthMultiplier:"get_depthMultiplier",set_alignType:"set_alignType",get_alignType:"get_alignType",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset"})
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
	rotateCellToTop: function(cell) {
		var xR = cell.get_link().x - (this.get_x() + this.get_width() / 2);
		var yR = cell.get_link().y - (this.get_y() + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.get_rotation() - a);
		return a;
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
	,clone: function() {
		var we3d = new com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d(this.get_width(),this.get_height(),this.get_depth(),this.get_x(),this.get_y(),this.get_z(),this.get_frequencyX(),this.get_frequencyY(),this.get_frequencyZ(),this.get_rotation(),this.get_rotationY(),this.get_rotationZ(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		return we3d;
	}
	,setCellAngle: function(cell,angle) {
		var nAngle = this.getCellAngle(cell);
		this.set_rotation(this.get_rotation() - angle - nAngle);
	}
	,getCellAngle: function(cell) {
		var xR = cell.get_link().x - (this.get_x() + this.get_width() / 2);
		var yR = cell.get_link().y - (this.get_y() + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		return a;
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
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
	,toString: function() {
		return "WaveEllipse3d";
	}
	,get_rotationZ: function() {
		return this.rotationZ;
	}
	,set_rotationZ: function(value) {
		this.rotationZ = value;
		this.updateFunction();
		return this.get_rotationZ();
	}
	,get_rotationY: function() {
		return this.rotationY;
	}
	,set_rotationY: function(value) {
		this.rotationY = value;
		this.updateFunction();
		return this.get_rotationY();
	}
	,get_frequencyZ: function() {
		return this.frequencyZ;
	}
	,set_frequencyZ: function(value) {
		this.frequencyZ = value;
		this.updateFunction();
		return this.get_frequencyZ();
	}
	,get_frequencyY: function() {
		return this.frequencyY;
	}
	,set_frequencyY: function(value) {
		this.frequencyY = value;
		this.updateFunction();
		return this.get_frequencyY();
	}
	,get_frequencyX: function() {
		return this.frequencyX;
	}
	,set_frequencyX: function(value) {
		this.frequencyX = value;
		this.updateFunction();
		return this.get_frequencyX();
	}
	,get_eccentricity: function() {
		var a = this.get_width() > this.get_height()?this.get_width() / 2:this.get_height() / 2;
		var b = this.get_width() > this.get_height()?this.get_height() / 2:this.get_width() / 2;
		var e = Math.sqrt(1 - Math.pow(b,2) / Math.pow(a,2));
		return e;
	}
	,frequencyZ: null
	,frequencyY: null
	,frequencyX: null
	,rotationZ: null
	,rotationY: null
	,__class__: com.somerandomdude.coordy.layouts.threedee.WaveEllipse3d
	,__properties__: $extend(com.somerandomdude.coordy.layouts.threedee.Layout3d.prototype.__properties__,{set_rotationY:"set_rotationY",get_rotationY:"get_rotationY",set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ",set_frequencyX:"set_frequencyX",get_frequencyX:"get_frequencyX",set_frequencyY:"set_frequencyY",get_frequencyY:"get_frequencyY",set_frequencyZ:"set_frequencyZ",get_frequencyZ:"get_frequencyZ"})
});
com.somerandomdude.coordy.layouts.twodee = {}
com.somerandomdude.coordy.layouts.twodee.ILayout2d = function() { }
$hxClasses["com.somerandomdude.coordy.layouts.twodee.ILayout2d"] = com.somerandomdude.coordy.layouts.twodee.ILayout2d;
com.somerandomdude.coordy.layouts.twodee.ILayout2d.__name__ = ["com","somerandomdude","coordy","layouts","twodee","ILayout2d"];
com.somerandomdude.coordy.layouts.twodee.ILayout2d.__interfaces__ = [com.somerandomdude.coordy.layouts.ILayout];
com.somerandomdude.coordy.layouts.twodee.ILayout2d.prototype = {
	clone: null
	,renderNode: null
	,jitterY: null
	,jitterX: null
	,rotation: null
	,height: null
	,width: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.ILayout2d
	,__properties__: {set_x:"set_x",set_y:"set_y",set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height",set_rotation:"set_rotation",set_jitterX:"set_jitterX",set_jitterY:"set_jitterY"}
}
com.somerandomdude.coordy.layouts.twodee.Layout2d = function() {
	com.somerandomdude.coordy.layouts.Layout.call(this);
	this.updateFunction = $bind(this,this.updateAndRender);
	this.set_updateMethod("updateAndRender");
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Layout2d"] = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Layout2d.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Layout2d"];
com.somerandomdude.coordy.layouts.twodee.Layout2d.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Layout2d.__super__ = com.somerandomdude.coordy.layouts.Layout;
com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype = $extend(com.somerandomdude.coordy.layouts.Layout.prototype,{
	validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"rotation")) return true;
		return false;
	}
	,renderNode: function(node) {
		node.get_link().x = node.x;
		node.get_link().y = node.y;
	}
	,clone: function() {
		throw "Method must be overriden by child class";
		return null;
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
	,update: function() {
	}
	,updateAndRender: function() {
		this.update();
		this.render();
	}
	,executeUpdateMethod: function() {
		this.updateFunction();
	}
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.Layout.prototype.removeNode.call(this,node);
		this.updateFunction();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeRemove",node));
	}
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		throw "Method must be overriden by child class";
		return null;
	}
	,set_jitterY: function(value) {
		this.jitterY = value;
		this.updateFunction();
		return this.jitterY;
	}
	,set_jitterX: function(value) {
		this.jitterX = value;
		this.updateFunction();
		return this.jitterX;
	}
	,set_height: function(value) {
		this.height = value;
		this.updateFunction();
		return this.get_height();
	}
	,get_height: function() {
		return this.height;
	}
	,set_width: function(value) {
		this.width = value;
		this.updateFunction();
		return this.get_width();
	}
	,get_width: function() {
		return this.width;
	}
	,set_y: function(value) {
		this.y = value;
		this.updateFunction();
		return this.y;
	}
	,set_x: function(value) {
		this.x = value;
		this.updateFunction();
		return this.x;
	}
	,set_rotation: function(value) {
		this.rotation = value;
		this.updateFunction();
		return this.rotation;
	}
	,set_updateMethod: function(value) {
		this.updateMethod = value;
		switch(value) {
		case "none":
			this.updateFunction = function() {
			};
			break;
		case "updateOnly":
			this.updateFunction = $bind(this,this.update);
			break;
		default:
			this.updateFunction = $bind(this,this.updateAndRender);
		}
		return this.updateMethod;
	}
	,set_proxyUpdater: function(value) {
		this.set_updateMethod(value.get_name());
		this.updateFunction = $bind(value,value.update);
		return this.proxyUpdater;
	}
	,proxyUpdater: null
	,updateFunction: null
	,updateMethod: null
	,jitterY: null
	,jitterX: null
	,rotation: null
	,height: null
	,width: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.Layout2d
	,__properties__: {set_x:"set_x",set_y:"set_y",set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height",set_rotation:"set_rotation",set_jitterX:"set_jitterX",set_jitterY:"set_jitterY",set_updateMethod:"set_updateMethod",set_proxyUpdater:"set_proxyUpdater"}
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
	rotateCellToTop: function(cell) {
		var xR;
		var yR;
		xR = cell.get_link().x - (this.x + this.get_width() / 2);
		yR = cell.get_link().y - (this.y + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.rotation - a);
		return a;
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Ellipse(this.get_width(),this.get_height(),this.x,this.y,this.rotation,this.jitterX,this.jitterY,this.get_alignType(),this.get_alignAngleOffset());
	}
	,setNodeAndle: function(node,angle) {
		var nAngle = this.getCellAngle(node);
		this.set_rotation(this.rotation - nAngle - angle);
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
	,renderNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.renderNode.call(this,node);
		node.get_link().rotation = node.rotation;
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
	,toString: function() {
		return "Ellipse";
	}
	,get_eccentricity: function() {
		var a = this.get_width() > this.get_height()?this.get_width() / 2:this.get_height() / 2;
		var b = this.get_width() > this.get_height()?this.get_height() / 2:this.get_width() / 2;
		var e = Math.sqrt(1 - Math.pow(b,2) / Math.pow(a,2));
		return e;
	}
	,eccentricity: null
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,alignAngleOffset: null
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,get_alignType: function() {
		return this.alignType;
	}
	,alignType: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.Ellipse
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_alignType:"set_alignType",get_alignType:"get_alignType",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset",get_eccentricity:"get_eccentricity"})
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
	calculateCellSize: function() {
		return new com.somerandomdude.coordy.geom.Rectangle(0,0,(this.get_width() - (this.columns - 1) * this.paddingX) / this.columns,(this.get_height() - (this.rows - 1) * this.paddingY) / this.rows);
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Grid(this.get_width(),this.get_height(),this.columns,this.rows,this.paddingX,this.paddingY,this.x,this.y,this.jitterX,this.jitterY);
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
	,addNodes: function(count) {
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
	,getNodeFromCoordinates: function(column,row) {
		return this.nodes[row * this.columns + column];
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
	,removeItemAt: function(column,row) {
		this.getNodeFromCoordinates(column,row).set_link(null);
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
	,getColumn: function(column) {
		var c = new Array();
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			c.push(this.nodes[i * this.columns + column]);
		}
		return c;
	}
	,toString: function() {
		return "Grid";
	}
	,set_vDirection: function(value) {
		this.vDirection = value;
		this.updateFunction();
		return this.vDirection;
	}
	,set_hDirection: function(value) {
		this.hDirection = value;
		this.updateFunction();
		return this.hDirection;
	}
	,maxNodes: null
	,vDirection: null
	,hDirection: null
	,paddingY: null
	,paddingX: null
	,columns: null
	,rows: null
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
	adjustLattice: function() {
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Lattice(this.get_width(),this.get_height(),this.columns,this.rows,this.allowOverflow,this.order,this.paddingX,this.paddingY,this.x,this.y,this.jitterX,this.jitterY);
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
	,removeNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.removeNode.call(this,node);
		this.adjustLattice();
		this.updateFunction();
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
	,toString: function() {
		return "Lattice";
	}
	,set_columns: function(value) {
		this.columns = value;
		this.order = "latticeOrderHorizontally";
		this.adjustLattice();
		this.updateFunction();
		this.maxCells = this.rows * this.columns;
		return this.columns;
	}
	,get_columns: function() {
		return this.columns;
	}
	,set_rows: function(value) {
		this.rows = value;
		this.order = "latticeOrderVertically";
		this.adjustLattice();
		this.updateFunction();
		this.maxCells = this.rows * this.columns;
		return this.rows;
	}
	,get_rows: function() {
		return this.rows;
	}
	,set_rowHeight: function(value) {
		this.rowHeight = value;
		this.updateFunction();
		return this.rowHeight;
	}
	,get_rowHeight: function() {
		return this.rowHeight;
	}
	,set_columnWidth: function(value) {
		this.columnWidth = value;
		this.updateFunction();
		return this.columnWidth;
	}
	,get_columnWidth: function() {
		return this.columnWidth;
	}
	,set_paddingY: function(value) {
		this.paddingY = value;
		this.updateFunction();
		return this.paddingY;
	}
	,get_paddingY: function() {
		return this.paddingY;
	}
	,set_paddingX: function(value) {
		this.paddingX = value;
		this.updateFunction();
		return this.paddingX;
	}
	,get_paddingX: function() {
		return this.paddingX;
	}
	,set_height: function(value) {
		this.height = value;
		this.rowHeight = value / this.rows;
		this.updateFunction();
		return this.get_height();
	}
	,get_height: function() {
		return this.rowHeight * this.rows;
	}
	,set_width: function(value) {
		this.width = value;
		this.columnWidth = value / this.columns;
		this.updateFunction();
		return this.get_width();
	}
	,get_width: function() {
		return this.columnWidth * this.columns;
	}
	,set_allowOverflow: function(value) {
		this.allowOverflow = value;
		return this.allowOverflow;
	}
	,get_allowOverflow: function() {
		return this.allowOverflow;
	}
	,set_order: function(value) {
		this.order = value;
		this.adjustLattice();
		this.updateFunction();
	}
	,get_order: function() {
		return this.order;
	}
	,set_alternate: function(value) {
		this.alternate = value;
		this.updateFunction();
	}
	,get_alternate: function() {
		return this.alternate;
	}
	,set_latticeType: function(value) {
		this.latticeType = value;
		this.updateFunction();
	}
	,get_latticeType: function() {
		return this.latticeType;
	}
	,maxCells: null
	,allowOverflow: null
	,alternate: null
	,latticeType: null
	,rowHeight: null
	,columnWidth: null
	,paddingY: null
	,paddingX: null
	,columns: null
	,rows: null
	,order: null
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
	clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Scatter(this.get_width(),this.get_height(),this.get_jitter(),this.x,this.y,this.get_jitterRotation());
	}
	,getYPos: function(p) {
		return this.get_height() / 2 + Math.random() * this.get_height() * this.get_jitter() / 2 * p + this.y;
	}
	,getXPos: function(p) {
		return this.get_width() / 2 + Math.random() * this.get_width() * this.get_jitter() / 2 * p + this.x;
	}
	,getP: function() {
		return Math.round(Math.random()) != 0?-1:1;
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
	,update: function() {
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].x = this.nodes[i].xRelation * this.get_width() + this.x;
			this.nodes[i].y = this.nodes[i].yRelation * this.get_height() + this.y;
		}
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
	,addToLayout: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		return this.addNode(object,moveToCoordinates);
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
	,toString: function() {
		return "Scatter";
	}
	,set_jitterRotation: function(value) {
		this.jitterRotation = value;
		this.updateFunction();
		return this.get_jitterRotation();
	}
	,get_jitterRotation: function() {
		return this.jitterRotation;
	}
	,jitterRotation: null
	,set_jitter: function(value) {
		this.jitter = value;
		this.updateFunction();
		return this.get_jitter();
	}
	,get_jitter: function() {
		return this.jitter;
	}
	,jitter: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.Scatter
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_jitter:"set_jitter",get_jitter:"get_jitter",set_jitterRotation:"set_jitterRotation",get_jitterRotation:"get_jitterRotation"})
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
	rotateCellToTop: function(cell) {
		var xR = cell.get_link().x - (this.x + this.get_width() / 2);
		var yR = cell.get_link().y - (this.y + this.get_height() / 2);
		var rads = Math.atan2(yR * (this.get_width() / this.get_height()),xR);
		var a = rads * (180 / Math.PI) + 90;
		this.set_rotation(this.rotation - a);
		return a;
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Ellipse(this.get_width(),this.get_height(),this.x,this.y,this.rotation,this.jitterX,this.jitterY,this.get_alignType(),this.get_alignAngleOffset());
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
	,renderNode: function(node) {
		com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.renderNode.call(this,node);
		node.get_link().rotation = node.rotation;
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
	,toString: function() {
		return "Spiral";
	}
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,get_alignType: function() {
		return this.alignType;
	}
	,alignType: null
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,alignAngleOffset: null
	,set_width: function(value) {
		this.width = value;
		this.set_circumference(value);
		this.updateFunction();
		return this.get_width();
	}
	,set_height: function(value) {
		this.height = value;
		this.set_circumference(value);
		this.updateFunction();
		return this.get_height();
	}
	,set_circumference: function(value) {
		this.circumference = value;
		this.updateFunction();
		return this.get_circumference();
	}
	,get_circumference: function() {
		return this.circumference;
	}
	,circumference: null
	,set_spiralConstant: function(value) {
		this.spiralConstant = value;
		this.updateFunction();
		return this.get_spiralConstant();
	}
	,get_spiralConstant: function() {
		return this.spiralConstant;
	}
	,spiralConstant: null
	,set_angleDelta: function(value) {
		this.angleDelta = value;
		this.updateFunction();
		return this.get_angleDelta();
	}
	,get_angleDelta: function() {
		return this.angleDelta;
	}
	,angleDelta: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.Spiral
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_angleDelta:"set_angleDelta",get_angleDelta:"get_angleDelta",set_spiralConstant:"set_spiralConstant",get_spiralConstant:"get_spiralConstant",set_circumference:"set_circumference",get_circumference:"get_circumference",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset",set_alignType:"set_alignType",get_alignType:"get_alignType"})
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
	validateObject: function(object) {
		if(Reflect.hasField(object,"x") && Reflect.hasField(object,"y") && Reflect.hasField(object,"rotation") && Reflect.hasField(object,"height")) return true;
		return false;
	}
	,sortOnOrder: function(x,y) {
		if(x.get_order() == y.get_order()) return 0;
		if(x.get_order() > y.get_order()) return 1;
		return -1;
	}
	,cleanOrder: function() {
		this.nodes.sort($bind(this,this.sortOnOrder));
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.nodes[i].order = i;
		}
	}
	,update: function() {
		if(this.size == 0) return;
		var node;
		this.nodes.sort($bind(this,this.sortOnOrder));
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
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.VerticalLine(this.get_vPadding(),this.x,this.y,this.jitterX,this.jitterY);
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
	,toString: function() {
		return "VerticalLine";
	}
	,set_order: function(value) {
		this.order = value;
		this.updateFunction();
		return this.get_order();
	}
	,get_order: function() {
		return this.order;
	}
	,order: null
	,set_vPadding: function(value) {
		this.vPadding = value;
		this.updateFunction();
		return this.get_vPadding();
	}
	,get_vPadding: function() {
		return this.vPadding;
	}
	,vPadding: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.VerticalLine
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_vPadding:"set_vPadding",get_vPadding:"get_vPadding",set_order:"set_order",get_order:"get_order"})
});
com.somerandomdude.coordy.layouts.twodee.Wave = function(width,height,x,y,frequency,waveFunction,jitterX,jitterY,alignType,alignOffset) {
	if(alignOffset == null) alignOffset = 0;
	if(alignType == null) alignType = "alignPerpendicular";
	if(jitterY == null) jitterY = 0;
	if(jitterX == null) jitterX = 0;
	if(waveFunction == null) waveFunction = "sineFunction";
	if(frequency == null) frequency = 1;
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.somerandomdude.coordy.layouts.twodee.Layout2d.call(this);
	this.set_width(width);
	this.set_height(height);
	this.set_x(x);
	this.set_y(y);
	this.set_jitterX(jitterX);
	this.set_jitterY(jitterY);
	this.set_frequency(frequency);
	this.set_waveFunction(waveFunction);
	this.set_alignType(alignType);
	this.set_alignAngleOffset(alignOffset);
	this.set_heightMultiplier(0);
	this.set_thetaOffset(0);
};
$hxClasses["com.somerandomdude.coordy.layouts.twodee.Wave"] = com.somerandomdude.coordy.layouts.twodee.Wave;
$hxExpose(com.somerandomdude.coordy.layouts.twodee.Wave, "Coordinates.layouts.twodee.Wave");
com.somerandomdude.coordy.layouts.twodee.Wave.__name__ = ["com","somerandomdude","coordy","layouts","twodee","Wave"];
com.somerandomdude.coordy.layouts.twodee.Wave.__interfaces__ = [com.somerandomdude.coordy.layouts.twodee.ILayout2d];
com.somerandomdude.coordy.layouts.twodee.Wave.__super__ = com.somerandomdude.coordy.layouts.twodee.Layout2d;
com.somerandomdude.coordy.layouts.twodee.Wave.prototype = $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype,{
	update: function() {
		var len = this.size;
		var c;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			c = this.nodes[i];
			c.x = i * (this.get_width() / len) + this.x + c.jitterX * this.jitterX;
			c.y = this._function(Math.PI * (i + 1) / (len / 2) * this.get_frequency() - this.get_thetaOffset() * Math.PI / 180) * ((this.get_height() + this.get_heightMultiplier() * i) / 2) + this.y + c.jitterY * this.jitterY;
			if(this._function == Math.sin) c.rotation = Math.cos(Math.PI * (i + 1) / (len / 2) * this.get_frequency()) * 180 / Math.PI; else if(this._function == Math.cos) c.rotation = Math.sin(Math.PI * (i + 1) / (len / 2) * this.get_frequency()) * 180 / Math.PI; else c.rotation = 0;
			if(this.get_alignType() == "alignPerpendicular") c.rotation += 90;
			c.rotation += this.get_alignAngleOffset();
		}
	}
	,render: function() {
		var c;
		var _g1 = 0, _g = this.size;
		while(_g1 < _g) {
			var i = _g1++;
			c = this.nodes[i];
			if(!c.get_link()) continue;
			c.get_link().x = c.x;
			c.get_link().y = c.y;
			c.get_link().rotation = this.get_alignType() == "noAlign"?0:c.rotation;
		}
	}
	,clone: function() {
		return new com.somerandomdude.coordy.layouts.twodee.Wave(this.get_width(),this.get_height(),this.x,this.y,this.get_frequency(),this.get_waveFunction(),this.jitterX,this.jitterY,this.get_alignType(),this.get_alignAngleOffset());
	}
	,addNode: function(object,moveToCoordinates) {
		if(moveToCoordinates == null) moveToCoordinates = true;
		if(object != null && !this.validateObject(object)) throw "Dynamic does not implement at least one of the following properties: \"x\", \"y\", \"z\", \"rotationX\", \"rotationY\", \"rotationZ\"";
		if(object != null && this.linkExists(object)) return null;
		var node = new com.somerandomdude.coordy.nodes.twodee.Node2d(object,0,0,(Math.random() > .5?-1:1) * Math.random(),(Math.random() > .5?-1:1) * Math.random());
		this.storeNode(node);
		this.update();
		if(object && moveToCoordinates) this.render();
		this.dispatchEvent(new com.somerandomdude.coordy.events.CoordyNodeEvent("coordyNodeAdd",node));
		return node;
	}
	,toString: function() {
		return "Wave";
	}
	,set_alignAngleOffset: function(value) {
		this.alignAngleOffset = value;
		this.updateFunction();
		return this.get_alignAngleOffset();
	}
	,get_alignAngleOffset: function() {
		return this.alignAngleOffset;
	}
	,alignAngleOffset: null
	,set_alignType: function(value) {
		this.alignType = value;
		this.updateFunction();
		return this.get_alignType();
	}
	,get_alignType: function() {
		return this.alignType;
	}
	,alignType: null
	,set_thetaOffset: function(value) {
		this.thetaOffset = value;
		this.updateFunction();
		return this.get_thetaOffset();
	}
	,get_thetaOffset: function() {
		return this.thetaOffset;
	}
	,thetaOffset: null
	,set_heightMultiplier: function(value) {
		this.heightMultiplier = value;
		this.updateFunction();
		return this.get_heightMultiplier();
	}
	,get_heightMultiplier: function() {
		return this.heightMultiplier;
	}
	,heightMultiplier: null
	,_function: null
	,set_waveFunction: function(value) {
		switch(value) {
		case "sineFunction":
			this.waveFunction = value;
			this._function = Math.sin;
			break;
		case "cosineFunction":
			this.waveFunction = value;
			this._function = Math.cos;
			break;
		case "tanFunction":
			this.waveFunction = value;
			this._function = Math.tan;
			break;
		case "arcsineFunction":
			this.waveFunction = value;
			this._function = Math.asin;
			break;
		case "arccosineFunction":
			this.waveFunction = value;
			this._function = Math.acos;
			break;
		case "arctanFunction":
			this.waveFunction = value;
			this._function = Math.atan;
			break;
		default:
			this.waveFunction = "sineFunction";
			this._function = Math.sin;
		}
		this.updateFunction();
		return this.get_waveFunction();
	}
	,get_waveFunction: function() {
		return this.waveFunction;
	}
	,waveFunction: null
	,set_frequency: function(value) {
		this.frequency = value;
		this.updateFunction();
		return this.get_frequency();
	}
	,get_frequency: function() {
		return this.frequency;
	}
	,frequency: null
	,__class__: com.somerandomdude.coordy.layouts.twodee.Wave
	,__properties__: $extend(com.somerandomdude.coordy.layouts.twodee.Layout2d.prototype.__properties__,{set_frequency:"set_frequency",get_frequency:"get_frequency",set_waveFunction:"set_waveFunction",get_waveFunction:"get_waveFunction",set_heightMultiplier:"set_heightMultiplier",get_heightMultiplier:"get_heightMultiplier",set_thetaOffset:"set_thetaOffset",get_thetaOffset:"get_thetaOffset",set_alignType:"set_alignType",get_alignType:"get_alignType",set_alignAngleOffset:"set_alignAngleOffset",get_alignAngleOffset:"get_alignAngleOffset"})
});
com.somerandomdude.coordy.nodes = {}
com.somerandomdude.coordy.nodes.INode = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.INode"] = com.somerandomdude.coordy.nodes.INode;
com.somerandomdude.coordy.nodes.INode.__name__ = ["com","somerandomdude","coordy","nodes","INode"];
com.somerandomdude.coordy.nodes.INode.prototype = {
	toObject: null
	,link: null
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
	toObject: function() {
		throw "Method must be called in Node descendant";
		return null;
	}
	,set_link: function(value) {
		return this.link = value;
	}
	,get_link: function() {
		return this.link;
	}
	,link: null
	,__class__: com.somerandomdude.coordy.nodes.Node
	,__properties__: {set_link:"set_link",get_link:"get_link"}
}
com.somerandomdude.coordy.nodes.threedee = {}
com.somerandomdude.coordy.nodes.threedee.INode3d = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.threedee.INode3d"] = com.somerandomdude.coordy.nodes.threedee.INode3d;
com.somerandomdude.coordy.nodes.threedee.INode3d.__name__ = ["com","somerandomdude","coordy","nodes","threedee","INode3d"];
com.somerandomdude.coordy.nodes.threedee.INode3d.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.threedee.INode3d.prototype = {
	clone: null
	,rotationZ: null
	,rotationY: null
	,rotationX: null
	,jitterY: null
	,jitterX: null
	,z: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.nodes.threedee.INode3d
	,__properties__: {set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_z:"set_z",get_z:"get_z",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_rotationX:"set_rotationX",get_rotationX:"get_rotationX",set_rotationY:"set_rotationY",get_rotationY:"get_rotationY",set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ"}
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
	toObject: function() {
		return { x : this.get_x(), y : this.get_y(), z : this.get_z(), rotationX : this.get_rotationX(), rotationY : this.get_rotationY(), rotationZ : this.get_rotationZ()};
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.Node3d(this.get_link(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		n.set_rotationX(this.get_rotationX());
		n.set_rotationY(this.get_rotationY());
		n.set_rotationZ(this.get_rotationZ());
		return n;
	}
	,set_rotationZ: function(value) {
		return this.rotationZ = value;
	}
	,get_rotationZ: function() {
		return this.rotationZ;
	}
	,set_rotationY: function(value) {
		return this.rotationY = value;
	}
	,get_rotationY: function() {
		return this.rotationY;
	}
	,set_rotationX: function(value) {
		return this.rotationX = value;
	}
	,get_rotationX: function() {
		return this.rotationX;
	}
	,set_jitterZ: function(value) {
		return this.jitterZ = value;
	}
	,get_jitterZ: function() {
		return this.jitterZ;
	}
	,set_jitterY: function(value) {
		return this.jitterY = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,get_jitterY: function() {
		return this.jitterY;
	}
	,set_jitterX: function(value) {
		return this.jitterX = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,get_jitterX: function() {
		return this.jitterX;
	}
	,set_z: function(value) {
		return this.z = value;
	}
	,get_z: function() {
		return this.z;
	}
	,set_y: function(value) {
		return this.y = value;
	}
	,get_y: function() {
		return this.y;
	}
	,set_x: function(value) {
		return this.x = value;
	}
	,get_x: function() {
		return this.x;
	}
	,rotationZ: null
	,rotationY: null
	,rotationX: null
	,jitterZ: null
	,jitterY: null
	,jitterX: null
	,z: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.nodes.threedee.Node3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.Node.prototype.__properties__,{set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_z:"set_z",get_z:"get_z",set_jitterX:"set_jitterX",get_jitterX:"get_jitterX",set_jitterY:"set_jitterY",get_jitterY:"get_jitterY",set_jitterZ:"set_jitterZ",get_jitterZ:"get_jitterZ",set_rotationX:"set_rotationX",get_rotationX:"get_rotationX",set_rotationY:"set_rotationY",get_rotationY:"get_rotationY",set_rotationZ:"set_rotationZ",get_rotationZ:"get_rotationZ"})
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
	toObject: function() {
		return { row : this.get_row(), column : this.get_column(), layer : this.get_layer(), x : this.get_x(), y : this.get_y(), z : this.get_z(), jitterX : this.get_jitterX(), jitterY : this.get_jitterY(), jitterZ : this.get_jitterZ()};
	}
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.threedee.GridNode3d(this.get_link(),this.get_column(),this.get_row(),this.get_layer(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
	}
	,set_layer: function(value) {
		return this.layer = value;
	}
	,get_layer: function() {
		return this.layer;
	}
	,layer: null
	,set_column: function(value) {
		return this.column = value;
	}
	,get_column: function() {
		return this.column;
	}
	,column: null
	,set_row: function(value) {
		return this.row = value;
	}
	,get_row: function() {
		return this.row;
	}
	,row: null
	,__class__: com.somerandomdude.coordy.nodes.threedee.GridNode3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype.__properties__,{set_row:"set_row",get_row:"get_row",set_column:"set_column",get_column:"get_column",set_layer:"set_layer",get_layer:"get_layer"})
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
	toObject: function() {
		return { order : this.get_order(), x : this.get_x(), y : this.get_y(), z : this.get_z()};
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.OrderedNode3d(this.get_link(),this.get_order(),this.get_x(),this.get_y(),this.get_z(),this.get_jitterX(),this.get_jitterY(),this.get_jitterZ());
		return n;
	}
	,set_order: function(value) {
		return this.order = value;
	}
	,get_order: function() {
		return this.order;
	}
	,order: null
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
	clone: function() {
		var n = new com.somerandomdude.coordy.nodes.threedee.ScatterNode3d(this.get_link(),this.get_x(),this.get_y(),this.get_z(),this.get_rotationX(),this.get_rotationY(),this.get_rotationZ());
		n.set_xRelation(this.get_xRelation());
		n.set_yRelation(this.get_yRelation());
		n.set_zRelation(this.get_zRelation());
		return n;
	}
	,set_zRelation: function(value) {
		this.zRelation = value;
		return this.get_zRelation();
	}
	,get_zRelation: function() {
		return this.zRelation;
	}
	,set_yRelation: function(value) {
		this.yRelation = value;
		return this.get_yRelation();
	}
	,get_yRelation: function() {
		return this.yRelation;
	}
	,set_xRelation: function(value) {
		this.xRelation = value;
		return this.get_xRelation();
	}
	,get_xRelation: function() {
		return this.xRelation;
	}
	,zRelation: null
	,yRelation: null
	,xRelation: null
	,__class__: com.somerandomdude.coordy.nodes.threedee.ScatterNode3d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.threedee.Node3d.prototype.__properties__,{set_xRelation:"set_xRelation",get_xRelation:"get_xRelation",set_yRelation:"set_yRelation",get_yRelation:"get_yRelation",set_zRelation:"set_zRelation",get_zRelation:"get_zRelation"})
});
com.somerandomdude.coordy.nodes.twodee = {}
com.somerandomdude.coordy.nodes.twodee.INode2d = function() { }
$hxClasses["com.somerandomdude.coordy.nodes.twodee.INode2d"] = com.somerandomdude.coordy.nodes.twodee.INode2d;
com.somerandomdude.coordy.nodes.twodee.INode2d.__name__ = ["com","somerandomdude","coordy","nodes","twodee","INode2d"];
com.somerandomdude.coordy.nodes.twodee.INode2d.__interfaces__ = [com.somerandomdude.coordy.nodes.INode];
com.somerandomdude.coordy.nodes.twodee.INode2d.prototype = {
	clone: null
	,rotation: null
	,jitterY: null
	,jitterX: null
	,y: null
	,x: null
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
	toObject: function() {
		return { x : this.x, y : this.y, rotation : this.rotation};
	}
	,clone: function() {
		var n = new com.somerandomdude.coordy.nodes.twodee.Node2d(this.get_link(),this.x,this.y,this.jitterX,this.jitterY);
		n.rotation = this.rotation;
		return n;
	}
	,setJitterY: function(value) {
		return this.jitterY = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,setJitterX: function(value) {
		return this.jitterX = Math.random() * value * (Math.random() > .5?-1:1);
	}
	,rotation: null
	,jitterY: null
	,jitterX: null
	,y: null
	,x: null
	,__class__: com.somerandomdude.coordy.nodes.twodee.Node2d
	,__properties__: $extend(com.somerandomdude.coordy.nodes.Node.prototype.__properties__,{set_jitterX:"setJitterX",set_jitterY:"setJitterY"})
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
	toObject: function() {
		return { row : this.row, column : this.column, x : this.x, y : this.y, rotation : this.rotation};
	}
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.twodee.GridNode(this.get_link(),this.column,this.row,this.x,this.y,this.jitterX,this.jitterY);
	}
	,column: null
	,row: null
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
	toObject: function() {
		return { order : this._order, x : this.x, y : this.y, rotation : this.rotation};
	}
	,clone: function() {
		return new com.somerandomdude.coordy.nodes.twodee.OrderedNode(this.get_link(),this.get_order(),this.x,this.y,this.jitterX,this.jitterY);
	}
	,set_order: function(value) {
		return this._order = value;
	}
	,get_order: function() {
		return this._order;
	}
	,order: null
	,_order: null
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
	clone: function() {
		var n = new com.somerandomdude.coordy.nodes.twodee.ScatterNode(this.get_link(),this.x,this.y,this.rotation);
		n.set_xRelation(this.get_xRelation());
		n.set_yRelation(this.get_yRelation());
		return n;
	}
	,set_yRelation: function(value) {
		return this.yRelation = value;
	}
	,get_yRelation: function() {
		return this.yRelation;
	}
	,yRelation: null
	,set_xRelation: function(value) {
		return this.xRelation = value;
	}
	,get_xRelation: function() {
		return this.xRelation;
	}
	,xRelation: null
	,__class__: com.somerandomdude.coordy.nodes.twodee.ScatterNode
	,__properties__: $extend(com.somerandomdude.coordy.nodes.twodee.Node2d.prototype.__properties__,{set_xRelation:"set_xRelation",get_xRelation:"get_xRelation",set_yRelation:"set_yRelation",get_yRelation:"get_yRelation"})
});
com.somerandomdude.coordy.proxyupdaters = {}
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater = function() { }
$hxClasses["com.somerandomdude.coordy.proxyupdaters.IProxyUpdater"] = com.somerandomdude.coordy.proxyupdaters.IProxyUpdater;
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater.__name__ = ["com","somerandomdude","coordy","proxyupdaters","IProxyUpdater"];
com.somerandomdude.coordy.proxyupdaters.IProxyUpdater.prototype = {
	update: null
	,name: null
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
	syncNodesTo: function(l) {
		if(l != null) this.layout = l;
		if($bind(this,this.tweenFunction) == null) {
			this.layout.updateAndRender();
			return;
		}
		var _g1 = 0, _g = this.layout.size;
		while(_g1 < _g) {
			var i = _g1++;
			this.tweenFunction(this.layout.nodes[i]);
		}
	}
	,tweenFunction: function(node) {
	}
	,layout: null
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
	parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			if(c == 34) break;
			if(c == 92) {
				buf.b += HxOverrides.substr(this.str,start,this.pos - start - 1);
				c = this.str.charCodeAt(this.pos++);
				switch(c) {
				case 114:
					buf.b += String.fromCharCode(13);
					break;
				case 110:
					buf.b += String.fromCharCode(10);
					break;
				case 116:
					buf.b += String.fromCharCode(9);
					break;
				case 98:
					buf.b += String.fromCharCode(8);
					break;
				case 102:
					buf.b += String.fromCharCode(12);
					break;
				case 47:case 92:case 34:
					buf.b += String.fromCharCode(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.b += String.fromCharCode(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(c != c) throw "Unclosed string";
		}
		buf.b += HxOverrides.substr(this.str,start,this.pos - start - 1);
		return buf.b;
	}
	,parseRec: function() {
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
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
					var c1 = this.str.charCodeAt(this.pos++);
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
				if(this.str.charCodeAt(this.pos++) != 114 || this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 97 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 115 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				this.pos--;
				if(!this.reg_float.match(HxOverrides.substr(this.str,this.pos,null))) throw "Invalid float at position " + this.pos;
				var v = this.reg_float.matched(0);
				this.pos += v.length;
				var f = Std.parseFloat(v);
				var i = f | 0;
				return i == f?i:f;
			default:
				this.invalidChar();
			}
		}
	}
	,nextChar: function() {
		return this.str.charCodeAt(this.pos++);
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.reg_float = new EReg("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?","");
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,quote: function(s) {
		this.buf.b += Std.string("\"");
		var i = 0;
		while(true) {
			var c = s.charCodeAt(i++);
			if(c != c) break;
			switch(c) {
			case 34:
				this.buf.b += Std.string("\\\"");
				break;
			case 92:
				this.buf.b += Std.string("\\\\");
				break;
			case 10:
				this.buf.b += Std.string("\\n");
				break;
			case 13:
				this.buf.b += Std.string("\\r");
				break;
			case 9:
				this.buf.b += Std.string("\\t");
				break;
			case 8:
				this.buf.b += Std.string("\\b");
				break;
			case 12:
				this.buf.b += Std.string("\\f");
				break;
			default:
				this.buf.b += String.fromCharCode(c);
			}
		}
		this.buf.b += Std.string("\"");
	}
	,toStringRec: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 8:
			this.buf.b += Std.string("\"???\"");
			break;
		case 4:
			this.objString(v);
			break;
		case 1:
		case 2:
			this.buf.b += Std.string(v);
			break;
		case 5:
			this.buf.b += Std.string("\"<fun>\"");
			break;
		case 6:
			var c = $e[2];
			if(c == String) this.quote(v); else if(c == Array) {
				var v1 = v;
				this.buf.b += Std.string("[");
				var len = v1.length;
				if(len > 0) {
					this.toStringRec(v1[0]);
					var i = 1;
					while(i < len) {
						this.buf.b += Std.string(",");
						this.toStringRec(v1[i++]);
					}
				}
				this.buf.b += Std.string("]");
			} else if(c == Hash) {
				var v1 = v;
				var o = { };
				var $it0 = v1.keys();
				while( $it0.hasNext() ) {
					var k = $it0.next();
					o[k] = v1.get(k);
				}
				this.objString(o);
			} else this.objString(v);
			break;
		case 7:
			var e = $e[2];
			this.buf.b += Std.string(v[1]);
			break;
		case 3:
			this.buf.b += Std.string(v?"true":"false");
			break;
		case 0:
			this.buf.b += Std.string("null");
			break;
		}
	}
	,objString: function(v) {
		this.fieldsString(v,Reflect.fields(v));
	}
	,fieldsString: function(v,fields) {
		var first = true;
		this.buf.b += Std.string("{");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var value = Reflect.field(v,f);
			if(Reflect.isFunction(value)) continue;
			if(first) first = false; else this.buf.b += Std.string(",");
			this.quote(f);
			this.buf.b += Std.string(":");
			this.toStringRec(value);
		}
		this.buf.b += Std.string("}");
	}
	,toString: function(v) {
		this.buf = new StringBuf();
		this.toStringRec(v);
		return this.buf.b;
	}
	,reg_float: null
	,pos: null
	,str: null
	,buf: null
	,__class__: haxe.Json
}
haxe.xml = {}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.getNodeName()) throw "Expected </" + parent.getNodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProlog(str1));
				state = 1;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
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
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
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
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
var d = Date;
d.fromTime = function(t) {
	var d1 = new Date();
	d1.setTime(t);
	return d1;
};
d.fromString = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d1 = new Date();
		d1.setTime(0);
		d1.setUTCHours(k[0]);
		d1.setUTCMinutes(k[1]);
		d1.setUTCSeconds(k[2]);
		return d1;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
d.prototype.toString = function() {
	var date = this;
	var m = date.getMonth() + 1;
	var d1 = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
d.prototype.__class__ = $hxClasses.Date = d;
d.__name__ = ["Date"];
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
if(typeof(JSON) != "undefined") haxe.Json = JSON;
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
com.somerandomdude.coordy.layouts.twodee.Wave.PI = Math.PI;
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
})();
