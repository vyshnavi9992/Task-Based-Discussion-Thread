var express = require('express');
var uniqid = require('uniqid');
const jwtDecode = require('jwt-decode');
var app = express()

var articles = {
    "articles": [
      {
        "title": "Angular 7",
        "slug": "lorem-69kvf5",
        "body": "want to know more about the changes made in angular 7",
        "createdAt": "2019-07-24T11:51:52.065Z",
        "updatedAt": "2019-07-24T11:51:52.065Z",
        "tagList": [
            "Angular7"
        ],
        "description": "What's new in Angular 7?" ,
        "author": {
          "username": "lorem1321",
          "bio": "Hey! I'm Lorem",
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 4,
        "comments": [ 
        ]
      },
      {
        "title": "Heap overflow",
        "slug": "just-testing-dr3msv",
        "body": " ",
        "createdAt": "2019-07-24T11:45:51.631Z",
        "updatedAt": "2019-07-24T11:45:51.631Z",
        "tagList": [ "Cprogramming"
          
        ],
        "description": "Heap is a region of process’s memory which is used to store dynamic variables. Heap overflow occurs for two main reasons. They are: If we continuously allocate memory and we do not free that memory space after use it may result in memory leakage – memory is still being used but not available for other processes and if we dynamically allocate large number of variables.",
        "author": {
          "username": "emailaru",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 2,
        "comments": [
        ]
      },
      {
        "title": "compile time error in python",
        "slug": "4674567-lt9ojb",
        "body": "Improper use of indentation can result in compile-time error. We should avoid mixing both tabs and spaces for indentation. use command python -tt yourscript.py to know exact locations and replace them with spaces.",
        "createdAt": "2019-07-24T11:34:57.547Z",
        "updatedAt": "2019-07-24T11:34:57.547Z",
        "tagList": [ "python"
          
        ],
        "description": " ",
        "author": {
          "username": "josh",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 2,
        "comments": [
        ]
      },
      {
        "title": "C programming",
        "slug": "-zgtwu0",
        "body": " ",
        "createdAt": "2019-07-24T11:37:31.915Z",
        "updatedAt": "2019-07-24T11:37:31.915Z",
        "tagList": [ "Cprogramming"
          
        ],
        "description": "which websites are best for to learn C programming?",
        "author": {
          "username": "ravi prasad",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": true,
        "favoritesCount": 18,
        "comments": [
        ]
      },
      {
        "title": "Exceptions in java",
        "slug": "4678678-rpz1qe",
        "body": "checked vs unchecked exception in java?",
        "createdAt": "2019-07-24T11:33:11.394Z",
        "updatedAt": "2019-07-24T11:33:11.394Z",
        "tagList": [ "java"
          
        ],
        "description": " ",
        "author": {
          "username": "Niha",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 0,
        "comments": [
        ]
      },
      {
        "title": "cors installation",
        "slug": "wee-l06pdg",
        "body": " ",
        "createdAt": "2019-07-24T11:25:56.984Z",
        "updatedAt": "2019-07-24T11:25:56.984Z",
        "tagList": [ "cors","Angular7"
          
        ],
        "description": "How to handle cors in express application?",
        "author": {
          "username": "venus",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 1,
        "comments": [
        ]
      },
      {
        "title": "Why to use node.js",
        "slug": "retw-5e53yz",
        "body": "node.js compared to other technologies",
        "createdAt": "2019-07-24T10:52:03.727Z",
        "updatedAt": "2019-07-24T10:52:03.727Z",
        "tagList": [
          
        ],
        "description": "Node.js uses server for the execution of JavaScript.Node.js excels at concurrent connections which makes it beneficial for multi-user, real-time web applications.Node.js is the most widely used software platform since the scaling is higher than contemporary applications such as PHP and C.",
        "author": {
          "username": "alpha123",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": true,
        "favoritesCount": 1,
        "comments": [
        ]
      },
      {
        "title": "Singleton class",
        "slug": "demonz-i3pftj",
        "body": " ",
        "createdAt": "2019-07-24T10:07:36.949Z",
        "updatedAt": "2019-07-24T10:07:36.949Z",
        "tagList": [ "java"
          
        ],
        "description": "Singleton class control object creation, limiting the number to one but allowing the flexibility to create more objects if the situation changes.",
        "author": {
          "username": "kane",
          "bio": null,
          "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
          "following": false
        },
        "favorited": false,
        "favoritesCount": 0,
        "comments": [
        ]
      },
      
    ],
    "articlesCount": 10
  };


 app.post('/', function(req, res, next){
    let requestBody = req.body.article;
    console.log("Request::"+JSON.stringify(requestBody));
    let user = null;
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      user = jwtDecode(token);
    }

    let newArticle = {
      "title": requestBody.title,
      "slug": uniqid((requestBody.title.slice(0, (requestBody.title.length/2))+'-').replace(' ', '')),
      "body": requestBody.body,
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "tagList": requestBody.tagList != undefined && requestBody.tagList.length > 0 ? requestBody.tagList : [],
      "description": requestBody.description,
      "author": {
        "username": user.email,
        "bio": null,
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      },
      "favorited": false,
      "favoritesCount": 0,
      "comments":[]
     };
    if(newArticle.tagList.length > 0) {
      req.getConnection(function(error, conn) {
        newArticle.tagList.forEach(tag => {  
          conn.query('INSERT INTO tags VALUES (?)', tag , function(err, result) {
            if (err) {
              console.log(err);
              //res.status(500).send(err);
            } else {
              console.log(result);
            }
          })
        })
      })
    }

    articles.articles.push(newArticle);
    articles.articlesCount = articles.articlesCount + 1;
    res.status(200).send({'article':newArticle});
 }) 

// SHOW LIST OF TAGS
app.get('', function(req, res, next){
    let tags = req.query.tag != undefined ? req.query.tag : '';
    let author = req.query.author != undefined ? req.query.author : '';
    let favorited = req.query.favorited != undefined ? req.query.favorited : '';
    let offset = req.query.offset != undefined ? req.query.offset : '';
    let respArr = {"articles": [], "articlesCount": 0};
    let i = 0, count = 0;
    let total = offset + 10;
    if(tags != '') {
       i = 0;
       for(let article of articles.articles) {
           if(article.tagList.indexOf(tags) > -1) {
                i++;
                if(i > offset && i <= total) {
                  respArr.articles.push(article);
                  respArr.articlesCount = respArr.articlesCount + 1;
                }
           }
       }
       res.status(200).send(respArr);
    } else if(author != '') {
      i = 0;
      for(let article of articles.articles) {
          if(article.author.username == author) {
            i++;
            if(i > offset && i <= total) {
              respArr.articles.push(article);
              respArr.articlesCount = respArr.articlesCount + 1;
            }
          }
      }
      res.status(200).send(respArr); 
   } else if(favorited != '') {
      i = 0;
      for(let article of articles.articles) {
        if(article.author.username == favorited && article.favorited) {
          i++;
          if(i > offset && i <= total) {
            respArr.articles.push(article);
            respArr.articlesCount = respArr.articlesCount + 1;
          }
      }
    }
    res.status(200).send(respArr); 
  } else {
    i = 0;
    for(let article of articles.articles) {
      i++;
      if(i > offset && i <= total) {
        respArr.articles.push(article);
      }
    }
    respArr.articlesCount = articles.articlesCount;
    res.status(200).send(respArr);
  }
})

app.get('/feed', function(req, res, next){
  let respArr = {"articles": [], "articlesCount": 0};
  let user = null;
    if (!req.headers.authorization) {
      return res.status(403).json({ error: 'No credentials sent!' });
    } else {
      const token = req.headers.authorization.split(" ")[1];
      user = jwtDecode(token);
    }

  for(let article of articles.articles) {
    if(article.author != undefined && article.author.username == user.email) {
        respArr.articles.push(article);
        respArr.articlesCount++; 
      }
    }
    res.status(200).send(respArr);
})

app.get('/:slug', function(req, res, next){
    let reqSlug = req.params.slug != undefined ?  req.params.slug : '';
    let respArticle = {"article":''};
    if(reqSlug != '') {
       for(let article of articles.articles) {
           if(article.slug == reqSlug) {
                respArticle.article = article;
                break;
           }
       }
       res.status(200).send(respArticle); 
    } else {
        res.status(404).send({'Message':"no data found"});
    }
    
})

//articles/things-c7v2gy/comments
app.get('/:slug/comments', function(req, res, next){
  let reqSlug = req.params.slug != undefined ?  req.params.slug : '';
  console.log(reqSlug);
  //res.status(200).send([]);

  let response = {"comments":[]};

  for(let article of articles.articles) {
    if(article.slug == reqSlug) {
        response = {"comments":article.comments};
        break;
    }
  }
  res.status(200).send(response);
  
})

app.post('/:slug/comments', function(req, res, next){
  let reqSlug = req.params.slug != undefined ?  req.params.slug : '';
  console.log(reqSlug);

  let response = null;
  
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  } else {
		const token = req.headers.authorization.split(" ")[1];
		let userToken = jwtDecode(token);
		console.log("token::"+JSON.stringify(userToken));
    
    let comments = {
    "id": 0,
    "createdAt": new Date(),
    "updatedAt": new Date(),
    "body": req.body.comment.body,
    "author": {
      "username": userToken.email,
      "bio": null,
      "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
      "following": false
    }
  };
  for(let article of articles.articles) {
    if(article.slug == reqSlug) {
        article.comments.push(comments);
        response = {"comment":comments};
        break;
    }
  }
  res.status(200).send(response);
  } 
})


///articles/retw-5e53yz/favorite
app.post('/:slug/favorite', function(req, res, next){
  let reqSlug = req.params.slug != undefined ?  req.params.slug : '';
  console.log(reqSlug);

  let response = null;
  for(let article of articles.articles) {
    if(article.slug == reqSlug) {
      
      if(article.favorited){
        article.favoritesCount = article.favoritesCount - 1;
        article.favorited = false;
        response = article;
      } else {
        article.favoritesCount = article.favoritesCount + 1;
        article.favorited = true;
        response = article;
      }
      break;
    }
  }
  res.status(200).send({"favoritesCount":response.favoritesCount});
})

app.delete('/:slug/favorite', function(req, res, next){
  let reqSlug = req.params.slug != undefined ?  req.params.slug : '';
  console.log(reqSlug);
  let response = null;
  for(let article of articles.articles) {
    if(article.slug == reqSlug) {
      if(article.favorited){
        article.favoritesCount = article.favoritesCount - 1;
        article.favorited = false;
        response = article;
      }
      break;
    }
  }
  res.status(200).send({"favoritesCount":response.favoritesCount});
})

//

//{"comment":{"body":"TEST Comments"}}

module.exports = app