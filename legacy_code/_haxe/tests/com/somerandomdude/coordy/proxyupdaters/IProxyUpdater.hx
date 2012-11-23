package com.somerandomdude.coordy.proxyupdaters;

interface IProxyUpdater {
	var name(default,default):String;
	function update():Void;
}