var express = require('express')
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
var app = express()

app.put('', function(req, res) {
    let user = req.body.user;
    console.log("User DATA::"+JSON.stringify(user));
    let responeObject = {};
    let userToken = null;

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
      } else {
        const token = req.headers.authorization.split(" ")[1];
        userToken = jwtDecode(token);
      }

    req.getConnection(function(error, conn) {
        conn.query('UPDATE users SET name = ?, password = ? WHERE email = ?', [user.username, user.password, user.email] , function(err, result) {
            //if(err) throw err
            if (err) {
                res.status(500).send(err);
            } else {
                const JWTToken = jwt.sign(user, user.password,{ expiresIn: '1h'});

                responeObject.email = user.email;
                responeObject.username = user.username != null ? user.username:'';
                responeObject.token = JWTToken;
                responeObject.bio = "This is some zzzz";
                responeObject.image = "https://static.productionready.io/images/smiley-cyrus.jpg";

                res.status(200).send(responeObject);
            }
        })
    })
})

module.exports = app;