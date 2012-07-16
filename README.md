#coordy.hx

##coordy is a haxe layout toolkit that allows you to easily organize items in various layout patterns.


##Live DEMO ( HTML5 ) : http://paraiso.alwaysdata.net/haxe/coordy/examples/
	
	
##Targets
+ flash
+ html5
+ cpp (Windows , Linux, IOs, Android , ... )

###Author M.Paraiso

####Contact  : mparaiso@online.fr

#####ported from the original coordy library by P.J. Onori : http://somerandomdude.com/work/coordy/

###Haxe Port by M.Paraiso mparaiso@online.fr


### Available Layouts :

+ twodee
	+ grid
	+ flow
	+ horizontal line
	+ vertical line
	+ scatter
	+ stack
	+ wave
	+ spiral
	+ lattice
	
+ threedee
  + stack
	
###TODO

+ fix all the bugs

###IMPORTANT

+ if you are targetting js with jeash , use the flag -D jeash when compiling with haxe, or
	override render and validate methods of the layout to fix the proper layout item structure.
	
	
