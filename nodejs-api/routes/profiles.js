var express = require('express')
const jwtDecode = require('jwt-decode');
var app = express()

app.get('/:id', function(req, res) {
    let reqId = req.params.id != undefined ?  req.params.id : '';
    console.log(reqId);
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
      } else {
            const token = req.headers.authorization.split(" ")[1];
            let userToken = jwtDecode(token);
            console.log("token::"+JSON.stringify(userToken));

            res.status(200).send(
                {"profile":
                    {
                        "username":userToken.email,
                        "bio":null,
                        "image":"https://static.productionready.io/images/smiley-cyrus.jpg",
                        "following":false
                    }
                }
            );
      }
})

app.post('/:id/follow', function(req, res) {
    let reqId = req.params.id != undefined ?  req.params.id : '';
    console.log(reqId);

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const token = req.headers.authorization.split(" ")[1];
        let userToken = jwtDecode(token);
        console.log("token::"+JSON.stringify(userToken));
        res.status(200).send(
            {"profile":
                {
                    "username":userToken.email,
                    "bio":null,
                    "image":"https://static.productionready.io/images/smiley-cyrus.jpg",
                    "following":true
                }
            }
        );
    }
})

app.delete('/:id/follow', function(req, res) {
    let reqId = req.params.id != undefined ?  req.params.id : '';
    console.log(reqId);

    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        const token = req.headers.authorization.split(" ")[1];
        let userToken = jwtDecode(token);
        console.log("token::"+JSON.stringify(userToken));
        res.status(200).send(
            {"profile":
                {
                    "username":userToken.email,
                    "bio":null,
                    "image":"https://static.productionready.io/images/smiley-cyrus.jpg",
                    "following":false
                }
            }
        );
    }
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
