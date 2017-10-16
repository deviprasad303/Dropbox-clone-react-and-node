const express = require('express');

const fs=require('fs-extra');
const mysql = require('mysql');
const app = express();
const pathone=require('path');
const process=require('process');
const cors=require('cors');
const bodyParser = require('body-parser');
const multipart=require('connect-multiparty');
const multipartMiddleware=multipart();
const glob=require('glob');
const http=require('http');
const session = require('express-session');
//const crypto = require('crypto');
const password = require('password-hash-and-salt');
const bcrypt = require('bcrypt');
// Generate a salt


app.set('port', (process.env.PORT || 3001));
app.use(cors());
app.use(multipartMiddleware);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);

app.use('/src',express.static(pathone.join(__dirname,'../client', "/src")));
app.use('/node_modules',express.static(pathone.join(__dirname ,'../client',"/node_modules")));



  // Return the main index.html, so react-router render the route in the client


app.get('/',function(req,res){
    res.sendFile(pathone.join(__dirname, './client', 'index.html'));});



const host = "localhost";
const user = "root";
const pswd = "Welcome02$";
const dbname = "test";

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Welcome02$',
    database: 'test',
});







// config db ====================================
const pool = mysql.createPool({
  host: host,
  user: user,
  password: pswd,
  port: "3306",
  database: dbname
});

const COLUMNS = [
  'filename'
];
const COLUMNS2 = [
    'groupname'
];

const COLUMNS3 = [
    'email','groupname'
];

const COLUMNS4 = [
    'email'
];
const COLUMNS23=[
    'email'
];

const COLUMNS5 = [
    'filename'
];

const COLUMNS55 = [
    'password'
];
const COLUMNS35 = [
    'bio',
    'work',
    'education',
    'contactinfo',
    'lifeevents',
    'interests',
    'music',
    'sports'
];

const COLUMNS37=['useractions'];


app.get('/filelist', (req, res) => {
    var  queryString = 'SELECT distinct filename from files WHERE email="'+req.query.email+'";';

    pool.query(queryString, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
        } else {
            res.json(
                rows.map((entry) => {
                    const e = {};
                    COLUMNS.forEach((c) => {
                        e[c] = entry[c];



                    });
                    console.log(e);
                    return e;
                })
            );
        }

    });



   // return res;

});










app.get('/getstarfiles', (req, res) => {
    var  queryString = 'SELECT distinct filename from files WHERE email="'+req.query.email+'" and  isstarred=1;';

    connection.query(queryString, function(err, rows, fields) {
        if (err) {
            console.log('Error', err);
        } else {
            res.json(
                rows.map((entry) => {
                    const e = {};
                    COLUMNS.forEach((c) => {
                        e[c] = entry[c];

                    });
                    console.log(e);
                    return e;
                })
            );
        }

    });



    // return res;

});







app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));




app.get('/api/books', (req, res) => {

  const firstName = req.query.firstName;

  if (!firstName) {
    res.json({
      error: 'Missing required parameters two',
    });
    return;
  }

  let queryString = ``;
  if(firstName=="*"){
    queryString = `SELECT * from authors`
  }else{
     queryString = `SELECT * from authors WHERE first_name REGEXP '^${firstName}'`
  }

  pool.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;

          if (rows.length > 0){
            res.json(
              rows.map((entry) => {
                const e = {};
                COLUMNS.forEach((c) => {
                  e[c] = entry[c];
                });
                return e;
                })
              );
            } else {
              res.json([]);
            }
      });

});

app.get('/downloadfile', function(req, res){

console.log(req);



        var file = pathone.join(__dirname, "./uploads/" + req.query.filename);
    pool.query('INSERT into userAct ( useractions,email) values("Downloaded files:'+ req.query.filename+'","'+req.query.email+'");', function(err, result) {
        // Neat!
        if (err) throw err;
    });

       res.download(file);

});


app.post('/newdirectory', function(req, res){

    console.log(req.body.directory);

    var dir = pathone.join(__dirname, "./uploads/" + req.body.directory);

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }



    pool.query('INSERT into files ( filename,email) values("'+req.body.directory+'","'+req.query.email+'");', function(err, result) {
        // Neat!

        pool.query('INSERT into userAct ( useractions,email) values("Created new directory'+req.body.directory+'","'+req.query.email+'");', function(err, result) {
            // Neat!
            if (err) throw err;
        });
        if (err) throw err;
    });

    res.end('success');
});


app.post('/newgroup', function(req, res){

    console.log(req.body.directory);

//    var dir = pathone.join(__dirname, "./uploads/" + req.body.directory);




    pool.query('INSERT into groups ( groupname,email) values("'+req.body.group+'","'+req.query.email+'");', function(err, result) {
        // Neat!

        pool.query('INSERT into userAct ( useractions,email) values("created newgroup:'+req.body.group+'","'+req.query.email+'");', function(err, result) {
            // Neat!
            if (err) throw err;
        });
        if (err) throw err;
    });

    res.end('success');
});

app.get('/groups', function(req, res) {

    var queryString = 'SELECT groupname from groups WHERE email="' + req.query.email + '";';

    pool.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log('Error', err);
        } else {
            res.json(
                rows.map((entry) => {
                    const e = {};
                    COLUMNS2.forEach((c) => {
                        e[c] = entry[c];

                    });
                    console.log(e);
                    return e;
                })
            );
        }
    });
});



app.get('/userActivity', function(req, res) {

    var queryString = 'SELECT * from userAct where  email="' + req.query.email + '";';

    pool.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log('Error', err);
        } else {
            res.json(
                rows.map((entry) => {
                    const e = {};
                    COLUMNS37.forEach((c) => {
                        e[c] = entry[c];

                    });
                    console.log(e);
                    return e;
                })
            );

        }
    });

});


app.get('/getuserinfo', function(req, res) {

    var queryString = 'SELECT * from userinfo ;';

    pool.query(queryString, function (err, rows, fields) {
        if (err) {
            console.log('Error', err);
        } else {
            res.json(
                rows.map((entry) => {
                    const e = {};
                    COLUMNS35.forEach((c) => {
                        e[c] = entry[c];

                    });
                    console.log(e);
                    return e;
                })
            );

        }
    });

});

    app.get('/groupmembers', function(req, res) {

        var queryString = 'SELECT email,groupname from groups WHERE groupname="' + req.query.groupname + '";';

        pool.query(queryString, function (err, rows, fields) {
            if (err) {
                console.log('Error', err);
            } else {
                res.json(
                    rows.map((entry) => {
                        const e = {};
                        COLUMNS3.forEach((c) => {
                            e[c] = entry[c];

                        });
                        console.log(e);
                        return e;
                    })
                );

            }
        });

    });
app.post('/deletegroup', function(req, res) {
    var queryString = 'Delete from groups WHERE groupname="' + req.body.groupname + '";';

    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;


                // connection.query()

                pool.query('Delete from groups WHERE groupname="' + req.body.groupname + '";', function (err, result) {
                // Neat!
                if (err) throw err;

                });

                res.end('success');
            }


    );

});



app.post('/deleteuserfromgroup', function(req, res) {
    var queryString = 'SELECT * from groups WHERE email="' + req.query.email + '";';

    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
                // connection.query()

                pool.query('Delete from groups WHERE  email="'+req.query.email+'";', function (err, result) {
                    // Neat!
                    if (err) throw err;

                });

                res.end('success');
            }
            else

                res.json('wrong user entered');
        }
    );

});





app.post('/addgroup', function(req, res) {

    console.log(req.body.directory);


    var queryString = 'SELECT * from users WHERE email="' + req.query.email + '";';

    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
               // connection.query()

                pool.query('INSERT into groups ( groupname,email) values("' + req.body.groupname + '","' + req.query.email + '");', function (err, result) {
                    // Neat!
                    if (err) throw err;
                });

                res.end('success');
            }
            else

                res.json('wrong user entered');
        }
    );


});



app.post('/sharegroupfile', function(req, res) {

    console.log(req.body.directory);
    var querystring2 = 'select distinct email from groups where groupname="' + req.query.sharee + '";';
    pool.query(querystring2,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
                rows.map((entry) => {
                    const e = {};
                    COLUMNS4.forEach((c) => {
                        var queryString = 'SELECT * from users WHERE email="' + entry[c] + '";';
                        pool.query(queryString,
                            function (err, rows, fields) {
                                if (err) throw err;

                                if (rows.length > 0) {
                                    //pool.query();

                                    pool.query('INSERT into files ( filename,email) values("' + req.body.filename + '","' + entry[c] + '");', function (err, result) {
                                        // Neat!
                                        if (err) throw err;
                                    });


                                }

                            });
                    });
                   // return e;
                });
                res.end('success');
            }
            else
            {
                res.json('wrong user entered');
            }
        });


});

app.post('/sharefile', function(req, res) {

   // console.log(req.body.directory);


    var queryString = 'SELECT * from users WHERE email="' + req.query.sharee + '";';

    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
                //connection.query();
                var queryString12 = 'SELECT distinct filename from files WHERE filename like "' + req.body.filename + '/%" OR filename="'+req.body.filename+'";';
                pool.query(queryString12,
                    function (err, rows, fields) {
                        if (err) throw err;

                        if (rows.length > 0) {
                            rows.map((entry) => {
                                const e = {};
                                COLUMNS5.forEach((c) => {
                                    //connection.query();
                                    pool.query('INSERT into files ( filename,email) values("' +   entry[c] + '","' + req.query.sharee + '");', function (err, result) {
                                        // Neat!
                                        if (err) throw err;

                                    });
                                });
                            });
                        }
                        res.end('success');
                    });
            }
else

            res.json('wrong user entered');
        }
    );


});




app.post('/addgroup', function(req, res) {

    console.log(req.body.directory);


    var queryString = 'SELECT * from users WHERE email="' + req.query.email + '";';

    pool.query(queryString,
        function (err, rows, fields) {
            if (err) throw err;

            if (rows.length > 0) {
                pool.query()

                pool.query('INSERT into groups ( groupname,email) values("' + req.body.groupname + '","' + req.query.email + '");', function (err, result) {
                    // Neat!
                    if (err) throw err;
                });

                res.end('success');
            }
            else

                res.json('wrong user entered');
        }
    );


});


app.post('/userAuthenticate', function(req, res){

    console.log(req.body.email);

   // var dir = pathone.join(__dirname, "./uploads/" + req.body.directory);

   var  queryString = 'SELECT distinct password from users WHERE email="'+req.body.email+'" ;';

    pool.query(queryString,
        function(err, rows, fields) {
            if (err) throw err;



            if (rows.length > 0) {


                    rows.map((entry) => {
                        const e = {};
                        COLUMNS55.forEach((c) => {
                            if(bcrypt.compareSync(req.body.password, entry[c]))
                                req.session.email = req.body.email;

                        });

                        console.log(req.session.email);
                        console.log(e);

                    });
                res.end(req.session.email);




                //res.end(req.session.email);

              //  res.end('Success');

            } else {
                res.end('failure');
            }
        });


    res.end('success');





});




app.post('/users', function(req, res) {
    // Get sent data.
    var user = req.body;
    // Do a MySQL query.
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
    var hash = bcrypt.hashSync(req.body.password, salt);
    var query =  pool.query('INSERT into users ( email,password,firstname,lastname) values("'+req.body.email+'","'+hash+'","'+req.body.firstname+'","'+req.body.lastname+'");', function(err, result) {
        // Neat!
        if (err) throw err;
    });

    res.end('Success');
});



app.post('/starfile', function(req, res) {
    // Get sent data.
    var user = req.body;
    // Do a MySQL query.
    console.log(req.body);
    var query = pool.query('Update files SET isstarred=1 where filename="'+req.body.filename+'" and email="'+req.query.sharee+'";', user, function(err, result) {
        // Neat!
    });

    res.end('Success');
});


app.post('/unstarfile', function(req, res) {
    // Get sent data.
    var user = req.body;
    // Do a MySQL query.
    console.log(req.body);
    var query = pool.query('Update files SET isstarred=0 where filename="'+req.body.filename+'" and email="'+req.query.sharee+'";', user, function(err, result) {
        // Neat!
    });

    res.end('Success');
});


app.post('/files', function(req, res) {
    // Get sent data.



    var files=req.files;

    var email=req.query.email;
    if(req.query.dir) {
        console.log(req.query.dir);

        var res = req.query.dir.split("./.");
        var direct=res[0];
        var email2=res[1];
    }
    var uploadDate1=new Date();
    var uploadDate = uploadDate1.getFullYear() + "-" + (uploadDate1.getMonth() + 1) + "-" + uploadDate1.getDate() + "-" + uploadDate1.getHours() + "H-" +  uploadDate1.getMinutes() + "M";
for(var i in files) {

    console.log(files[0]);


    var path = files[i];

    for (var key in path) {
        var path123 = path[key].path;

        var name = path[key].name;
        var tempPath = path[key].path;

        if(req.query.dir)
        {
            var targetPath = pathone.join(__dirname, "./uploads/"+direct +"/" + name);

        }
else
        var targetPath = pathone.join(__dirname, "./uploads/" + name);

       // var savepath = "/uploads/" + uploadDate +  path[key].path;
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                console.log(err);

            }


        });

        if(!req.query.dir)
        {
         pool.query('INSERT into files ( filename,email) values("'+name+'","'+req.query.email+'");', function(err, result) {
             // Neat!
             if (err) throw err;

        });

        }
        else {
            name=direct+"/"+name;
            pool.query('INSERT into files ( filename,email) values("'+name+'","'+email2+'");', function(err, result) {
                // Neat!
                if (err) throw err;

            });

        }



    }


}

    var obj = {};



    //console.log(obj);


    res.end('Success');
});






app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
