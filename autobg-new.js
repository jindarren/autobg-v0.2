"use strict";

var mongoose = require('mongoose');
var async = require('async');
var csvdata = require('csvdata');
var multer  = require('multer')


// Load the Mongoose schema for User, Photo, and SchemaInfo
var FormData = require('./schema/userData.js');

var express = require('express');
var app = express();


//Modules
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require("fs");
// var router = express.Router();

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var uploadFolder = './js';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, "positive.csv");  
    }
});

var upload = multer({ storage: storage })

app.post('/upload', upload.single('myfile'), function(req, res, next){
    var file = req.file;
    res.send("Upload successfully :)");
});


// mongoose.connect('mongodb://localhost:27017/poster', function (err) {
//     if (err) {
//         console.log("connection error", err);

//     } else {
//         console.log('connection successful!');
//     }
// });

app.listen(3005);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));
//app.use(express.static('./'))


app.get('/', function (request, response) {
    //response.send('Simple web server of files from ' + __dirname);
    response.redirect('svg.html');
});

app.get('/generator', function (request, response) {
    //response.send('Simple web server of files from ' + __dirname);
    response.redirect('generator.html');
});

app.get('/upload', function (request, response) {
    //response.send('Simple web server of files from ' + __dirname);
    response.redirect('upload.html');
});

app.use(bodyParser.urlencoded({extended:true}));

// app.get('/submitForm', function(request, response) {
// 	FormData.create({client_name:request.body.client_name, city:request.body.city, contact_info:request.body.contact_info,
// 		div_track:request.body.div_track, btn_track: request.body.btn_track});
//     response.send("User added");
// });


app.post("/saveRecord", function(req, res){

    var goodParameters = JSON.parse(req.body.data)

    console.log(goodParameters)
    var recordList = goodParameters.features.split("|")
    var conditionList = goodParameters.conditions.split("|")
    var processedList = []
    var processedList2 = []
    for(var rec in recordList){
        var record = [recordList[rec]]
        processedList.push(record)
    }
    for(var rec in conditionList){
        var record = [conditionList[rec]]
        processedList2.push(record)
    }
    csvdata.write("js/record_new.csv", processedList,{delimiter: ',', append: "true"})
    csvdata.write("js/condition_new.csv", processedList2,{delimiter: ',', append: "true"})
});


app.get("/getRecord", function(req, res){
    csvdata.load("js/record_new.csv").then(function(data){
        res.json(data.length+1)
    })
});

// app.get("/getStat", function(req, res){
//     FormData.find({},function (err, user) {
//         if (err)
//             res.send(err);
//         else{

//             // var result = user[user.length-1].div_track.size

//             // res.json({"div":result})
//             res.json(user)
//         }
//     })
// });

// app.post("/submitForm", function(req, res){
// 	var user = new FormData({
//         session_time: req.body.session_time,
//         session_id: req.body.session_id,
// 	    client_name:req.body.client_name, 
// 	    city:req.body.city,
// 	    contact_info:req.body.contact_info,
// 		div_track:req.body.div_track, 
// 		btn_track:req.body.btn_track
// 	});

//     user.save(function (err) {
//         if (err)
//             res.send(err);
//         // res.json({message: "user profile is updated"})
//         res.json(user)
//     })
// });
