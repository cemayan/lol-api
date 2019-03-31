#!/usr/bin/env node
import express from "express";
const app = express();
import bodyParser  from "body-parser";
import  http from 'http';
import GameController  from "./controller/GameController"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": false,
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


app.use('/gamedata',GameController);

http.createServer(app).listen(3000);

 
module.exports = app;

