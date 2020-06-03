export PATH="$(pwd)/node_modules/.bin:$PATH"

  
case "$1" in
"extract") 
	node ./src/extract.js
	;; 

"compilejs")
	cd jsbuild
	webpack --mode production
	cd ../
	;;	

"runserver") 
	node ./src/expressrun.js

esac