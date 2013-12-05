# Coordinate.js build file
#
# USAGE
# =====
#
# make [target]
#
# targets:
#
#	 doc:
#		build documentation
#	
#	
# 	compile:
#	 	compile typescript to javascript
#	
#	
#	 build:
#	 	compile and minify script to build folder
#
#	
# 	test:
#		compile and test project
#	
#
# 	install:
#		install npm dependencies


#VARIABLES
DATE=  `date +'%Y/%m/%d %H:%M:%S'`
#@see http://stackoverflow.com/q/1859113/750852
SOURCE="src/coordinate.js"
TS_SOURCE="src/coordinate.ts"
DOC_PATH="site/doc"
#TASKS
all: lint build test commit

compile:
	@node_modules/.bin/tsc $(TS_SOURCE) -t ES5

build: compile 
	@node_modules/.bin/uglifyjs $(SOURCE) -o build/coordinate.min.js
lint: compile
	@node_modules/.bin/jshint $(SOURCE)
commit:
	git add . 
	git commit -am"update $(DATE)"
	
test: compile
	@node_modules/.bin/tsc test/coordinate.test.ts -t ES5
	@npm test
doc: compile
	@node_modules/.bin/jsdoc $(SOURCE)  --lenient -d $(DOC_PATH) 
install:
	@npm install
#--require "./build/Coordinate.next.js" --globals coordinate -d -u tdd
	
.PHONY:  build test commit lint install doc