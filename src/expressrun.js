
const express = require('express')
const expApp = express() 

expApp.use('/',express.static( 'docs'))
expApp.listen("9090",'0.0.0.0')
console.log("http://127.0.0.1:9090")