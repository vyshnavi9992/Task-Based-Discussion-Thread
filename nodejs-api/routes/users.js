var express = require('express')
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode')
var app = express()

// ADD NEW USER POST ACTION
app.post('', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('password', 'Password is required').notEmpty()             //Validate password
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var user = {
			name: req.sanitize('name').escape().trim(),
			password: req.sanitize('password').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO users SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "Added user Details"})
					//res.send({message : "Added user Details"})				
					//req.flash('success', 'Data added successfully!')
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})

// SHOW USER LOGIN
app.post('/login', function(req, res, next){
	req.assert('password', 'Password is required').notEmpty()             //Validate password
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var user = {
			password: req.sanitize('password').escape().trim(),
			email: req.sanitize('email').escape().trim()
		}

		let responeObject = {};
		
		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [user.email, user.password], function(err, rows, fields) {
				if(err) console.log(err);
				
				// if user not found
				if (rows.length <= 0) {
					res.status(500).send({'errors':{"Error:":"Inalid user credentials"}});
				}
				else { // if user found

					const JWTToken = jwt.sign(user,
					user.password,
					 {
						 expiresIn: '1h'
					 });

					responeObject.email = rows[0].email;
					responeObject.username = rows[0].name;
					responeObject.token =JWTToken;
					responeObject.bio ="This is some zzzz";
					responeObject.image ="https://static.productionready.io/images/smiley-cyrus.jpg";

					res.status(200).send(responeObject);
				}			
			})
		})
	} else {
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});
	}
})

app.get('', function(req, res, next){
	if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  } else {
		const token = req.headers.authorization.split(" ")[1];
		let userToken = jwtDecode(token);
		console.log("token::"+JSON.stringify(user));

		var user = {
			password: userToken.password,
			email: userToken.email
		}

		let responeObject = {};
		
		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [user.email, user.password], function(err, rows, fields) {
				if(err) console.log(err);
				
				// if user not found
				if (rows.length <= 0) {
					res.status(500).send({'message':"Inalid user credentials."});
				}
				else { // if user found

					const JWTToken = token;

					responeObject.email = rows[0].email;
					responeObject.username = rows[0].name;
					responeObject.token =JWTToken;
					responeObject.bio ="This is some zzzz";
					responeObject.image ="imag2e";

					res.status(200).send({"user":responeObject});
				}			
			})
		})
	}
})



// EDIT USER PUT ACTION
app.put('/edit/(:id)', function(req, res, next){	
	
	req.assert('name', 'Name is required').notEmpty()           //Validate name
	req.assert('password', 'Password is required').notEmpty()             //Validate password
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var users = {
			name: req.sanitize('name').escape().trim(),
			password: req.sanitize('password').escape().trim(),
			email: req.sanitize('email').escape().trim()
		
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE users SET ? WHERE id = ' + req.params.id, users,function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "updated user Details"})
					
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})


// SHOW LIST OF USERS
app.get('/list', function(req, res, next){
	req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM users ', function(err, rows, fields) {
				
				if(err) console.log(err);
					// if user not found
				if (rows.length <= 0) {
					res.status(500).send({'message':"No data"});
				}
				else { // if user found
					/*user.email = rows[0].email;
					user.name = rows[0].name;
					user.password = '';
					user.id = rows[0].id;*/

					res.status(200).send(rows);
				}			
			
			})
		})
	})

// ADD NEW TASK POST ACTION
app.post('/task', function(req, res, next){	
	req.assert('taskid', 'taskid is required').notEmpty()  
	req.assert('description', 'Description is required').notEmpty()           //Validate description
	req.assert('keyword', 'keyword is required').notEmpty()             //Validate keyword
	req.assert('id', 'id is required').notEmpty() 
    req.assert('name', 'name is required').notEmpty()  //Validate name

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var task = {
			taskid: req.sanitize('taskid').escape().trim(),
			description: req.sanitize('description').escape().trim(),
			keyword: req.sanitize('keyword').escape().trim(),
			id: req.sanitize('id').escape().trim(),
			name: req.sanitize('name').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO task SET ?', task , function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "Added task Details"})
					//res.send({message : "Added user Details"})				
					//req.flash('success', 'Data added successfully!')
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})
// EDIT TASK PUT ACTION
app.put('/edittask/(:id)', function(req, res, next){	
	
	
	req.assert('description', 'Description is required').notEmpty()           //Validate description
	req.assert('keyword', 'keyword is required').notEmpty()             //Validate keyword

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var task = {
			
			description: req.sanitize('description').escape().trim(),
			keyword: req.sanitize('keyword').escape().trim()
		
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE task SET ? WHERE id = ' + req.params.id, task ,function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "updated task Details"})
					
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})


// SHOW LIST OF TASKS
app.get('/list/task', function(req, res, next){
	req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM task ', function(err, rows, fields) {
				
				if(err) console.log(err);
					// if user not found
				if (rows.length <= 0) {
					res.status(500).send({'message':"No data"});
				}
				else { // if user found
					/*user.email = rows[0].email;
					user.name = rows[0].name;
					user.password = '';
					user.id = rows[0].id;*/

					res.status(200).send(rows);
				}			
			
			})
		})
	})


// ADD NEW ANSWER POST ACTION
app.post('/answer', function(req, res, next){	
	req.assert('answerid', 'answerid is required').notEmpty()  
	req.assert('description', 'Description is required').notEmpty()           //Validate description
	req.assert('taskid', 'taskid is required').notEmpty()             //Validate taskid
    req.assert('id', 'id is required').notEmpty()  //Validate id

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var answer = {
			answerid: req.sanitize('answerid').escape().trim(),
			description: req.sanitize('description').escape().trim(),
			taskid: req.sanitize('taskid').escape().trim(),
			id: req.sanitize('id').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO answer SET ?', answer , function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "Added answer Details"})
					//res.send({message : "Added user Details"})				
					//req.flash('success', 'Data added successfully!')
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})
// EDIT ANSWER PUT ACTION
app.put('/edit/answer/(:taskid)', function(req, res, next){	
	
	req.assert('description', 'Description is required').notEmpty()           //Validate Description
	

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		var users = {
			description: req.sanitize('description').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE answer SET ? WHERE taskid = ' + req.params.taskid, users,function(err, result) {
				//if(err) throw err
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({message : "updated answer Details"})
					
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		});
		res.status(500).send({"validation":error_msg});				
		//res.send({"validation":error_msg});
    }
})


// SHOW LIST OF ANSWERS
app.get('/list/answer', function(req, res, next){
	req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM answer ', function(err, rows, fields) {
				
				if(err) console.log(err);
					// if user not found
				if (rows.length <= 0) {
					res.status(500).send({'message':"No data"});
				}
				else { // if user found
					/*user.email = rows[0].email;
					user.name = rows[0].name;
					user.password = '';
					user.id = rows[0].id;*/

					res.status(200).send(rows);
				}			
			
			})
		})
	})

	///profiles/demo1321


module.exports = app
