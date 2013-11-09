#VARIABLES
DATE=  `date +'%Y/%m/%d %H:%M:%S'`
#@see http://stackoverflow.com/q/1859113/750852

#TASKS
all: build test commit

build:
	grunt -v
	
commit:
	git add . 
	 git commit -am"update $(DATE)"
	
test:
	mocha  -R list --recursive --require "./build/Coordinate.next.js" --globals coordinate
	
.PHONY:  build test commit