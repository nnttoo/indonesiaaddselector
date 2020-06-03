
const express = require('express')
const expApp = express() 

expApp.use('/',express.static( 'docs'))
expApp.listen("8080")
console.log("http://127.0.0.1:8080")