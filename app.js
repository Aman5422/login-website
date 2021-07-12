// module install
const express = require("express")
const app = express()

// use for encryption
const bcrypt = require("bcrypt")
const path = require("path")

// import database
const mysql = require("mysql")
var connection = require('./databases');

//provide body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json());
// app.use(bodyPaser.json())

//used for uploading files
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

  
const fileFilter=(req, file, cb) => {
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/jpg" || file.mimetype==="image/png"){
        cb(null,true);
    }else{
        cb(null, false)
    }
}
//set a file size
const upload = multer({ storage:storage,limits:{fieldSize: 1024 * 1024 *1},fileFilter:fileFilter});
const port = 44332

// set templating engine
app.set("view-engin", 'ejs')
app.use(express.urlencoded({ extended: false}))

var session = require("express-session")
const { select } = require("async")
const { ESRCH } = require("constants")
const { stringify } = require("querystring")



// create server
app.get('/', (req, res) => {
    res.render("index.ejs", { name: "User" })
    return res.redirect("/register")
})

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})

app.get('/dashboard', (req, res) => {
    var sql="select title, content from list";
    
    
    connection.query(sql, function(err, result){
        if (err) throw err
            
            // var normalResults = result.map((mysqlObj, index) => {
            //     return Object.assign({}, mysqlObj);
            // });
            var objs = [];
            for (var i = 0;i < result.length; i++) {
                objs.push({"title": result[i].title ,  "content": result[i].content });
            }
            console.log(objs)
            res.render("dashboard.ejs", { lists: objs })

            // res.send(objs)
    })
    
    // res.render("dashboard.ejs")
    
})


app.get("/listpost", function(req, res) {
    res.render("list.ejs")
})

app.get("/logout", function(req, res) {
    res.render("register.ejs")
})


app.post("/listpost", function(req, res) {
    try {

        var sql = "insert into list values(null,  '"+ req.body.title +"', '"+ req.body.content +"')"
        connection.query(sql, function(err, result){
            if (err) throw err
                console.log(result)
        })
        res.redirect("/dashboard")
    } catch {
        res.redirect("/listpost")
    }
})

app.post("/post",urlencodedParser, function(req,res) {
    console.log(req.body)
    res.render("index.ejs", {data: req.body})
    return res.redirect("/login")
})

app.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    console.log(email, password, hashedPassword)
    var sql = "select fullname, password from users where fullname='"+email+"' AND password='"+password+"'"
    console.log(sql)
    // var sql = "insert into users  values(null,  '" + req.body.name + "', '"+ req.body.email +"', '"+ hashedPassword +"')"
    connection.query(sql, function(err, result, fields){
        console.log(result)
        try {
            if (result[0].fullname===email && result[0].password===password){
                res.redirect("/dashboard")
            }else{
                res.redirect("/login")
            }    
        } catch (error) {
            res.redirect("/login")
        }
        
    })
    

    
})


app.post('/logout', function(req, res) {
    logout.logoutUser(req, res, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("succesfull")
      }
    });
  });


app.post('/register', async (req, res) => {
    console.log(req.file);
    try {
        upload.single('productimage')
        // const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(req.body);

        var sql = "insert into users  values(null,  '"+ req.body.name +"', '"+ req.body.email +"', '"+ req.body.password +"')"
        connection.query(sql, function(err, result){
            if (err) throw err
                console.log(result)
        })
        res.redirect("/login")
    } catch {
        res.redirect("/register")

    }
})



// for connection
app.listen(port, () =>{
    console.log(`listening to the port ${port}`)
})


