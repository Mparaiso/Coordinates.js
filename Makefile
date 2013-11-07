all: build test

build:
	grunt
	
commit:
	git add . 
	 git commit -am"update $*" << date
	
test:
	mocha  -R list --recursive --require "./build/Coordinate.next.js" --globals coordinate
	
.PHONY:  build test