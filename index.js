//declaración de objetos a emplear

"use strict"
var express = require('express');
//const PATH = require('path');
var app = express();
const mysql = require("mysql");
const util = require ("util");

//empleo el puerto 3000 para la comunicación con el server
const port = 3000;

app.listen(port, ()=> {
    console.log('Example app listening on port ', port);
    });


//agrego el body-parse para facilitar el post
var body_parser = require("body-parser");
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());



