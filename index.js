const express = require('express')
const server = express()
const mysql = require('./Connection/conn')
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set('view engine','ejs')

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html')
});

server.post('/', (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var mobile = req.body.mobile

// First method to call a query

// var sql ="INSERT INTO REGISTER(name, email, mobile)VALUES('"+name+"','"+email+"','"+mobile+"')";
// mysql.query(sql,(error,result)=>{
    //     if(error) throw error
    //     res.send("Record Inserted Successfully");
    // });

// Second method to call a query
// var sql = "INSERT INTO REGISTER(name, email, mobile)VALUES(?,?,?)";
// mysql.query(sql,[name,email,mobile], (error, result) => {
    //     if (error) throw error
    //     res.send("Record Inserted Successfully");
    // });
    
// Third method to call a query
    var sql = "INSERT INTO REGISTER(name, email, mobile)VALUES ?";
    var values =[
        [name,email,mobile]
    ]
    mysql.query(sql,[values], (error, result) => {
        if (error) throw error
        res.redirect("/students")
        // res.send("Record Inserted Successfully");
    });
});

server.get('/students',(req,res)=>{
    var sql ="Select * from register"
    mysql.query(sql,(err,result)=>{
        if(err) throw err
        res.render(__dirname+"/students.ejs",{students:result});
    });
});

server.get('/delete_student',(req,res)=>{

    var id=req.query.id
    var sql ="delete from register where id=?"
    mysql.query(sql,[id],(err,result)=>{
        if(err) throw err
        res.redirect("/students")
    });
})
server.get('/update_student',(req,res)=>{

    var id=req.query.id
    var sql ="select * from register where id=?"
    mysql.query(sql,[id],(err,result)=>{
        if(err) throw err
        res.render(__dirname+"/update_student",{student:result})
    });
})

server.post('/update_student',(req,res)=>{
    var name = req.body.name
    var email = req.body.email
    var mobile = req.body.mobile
    var id = req.body.id

    var sql = "UPDATE REGISTER SET name=?, email=?, mobile=? where id='"+id+"'"
    mysql.query(sql,[name,email,mobile],(err,result)=>{
        if(err) throw err
        res.redirect("/students")
    });
})
server.listen(5000,()=>{console.log("Server Running at 5000")})

