#VARIABLES
DATE=  `date +'%Y/%m/%d %H:%M:%S'`
#@see http://stackoverflow.com/q/1859113/750852

#TASKS
all: build test commit

build: lint
	@cmd //C jsmin src/coordinate.js > coordinate.min.js
	@mv coordinate.min.js build
lint:
	@cmd //C  jshint src\coordinate.js
commit:
	git add . 
	git commit -am"update $(DATE)"
	
test:
	mocha  -R list --recursive 
#--require "./build/Coordinate.next.js" --globals coordinate -d -u tdd
	
.PHONY:  build test commit lint