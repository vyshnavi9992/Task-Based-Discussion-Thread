var express = require('express')
var app = express()

// SHOW LIST OF TAGS
app.get('', function(req, res, next){
	req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM tags ', function(err, rows, fields) {
				
				if(err) console.log(err);
					// if tags not found
				if (rows.length <= 0) {
					res.status(500).send({'message':"No tags"});
				}
				else {
                    let tagsArray = [];
                    for(let row of rows){
                        tagsArray.push(row.tagname);
                    } 

					res.status(200).send({'tags':tagsArray});
				}			
			
			})
		})
	})



module.exports = app