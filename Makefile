DATE=  `date +'%y.%m.%d %H:%M:%S'`
all: build test commit

build:
	grunt
	
commit:
	git add . 
	 git commit -am"update $(DATE)"
	
test:
	mocha  -R list --recursive --require "./build/Coordinate.next.js" --globals coordinate
	
.PHONY:  build test