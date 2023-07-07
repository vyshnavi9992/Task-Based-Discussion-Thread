var express = require('express')
var app = express()

app.get(':image', function(req, res) {
    let reqSlug = req.params.image != undefined ?  req.params.image : '';
    console.log("index::"+reqSlug);
    res.status(200).send("https://static.productionready.io/images/smiley-cyrus.jpg"); 
})

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
