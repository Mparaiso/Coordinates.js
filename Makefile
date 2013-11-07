all: build test commit

build:
	grunt
	
commit:
	git add . 
	 git commit -am"update"
	
test:
	mocha  -R list --recursive --require "./build/Coordinate.next.js" --globals coordinate
	
.PHONY:  build test