Array.prototype.indexOf = Array.prototype.indexOf || function(object){
	for(var i=0; i<this.length ; i ++){
		if(object == this[i])return i ;
	}
	return -1;
}