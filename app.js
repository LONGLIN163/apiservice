const express = require('express')
const mysql = require('mysql');

const app = express()
const port = process.env.port || 8081;
//var mainCtrl=require("./Ctrl/adminCtrl");


var db = mysql.createConnection({
  host: 'blog-db.camhq7invtrq.us-east-2.rds.amazonaws.com',
  port: '3306',
  user: 'longlin',
  password: '12345678',
  database: 'react_blog'
});


app.get('/', (req, res) => {
  db.query("SELECT * FROM type",function(err,data){
    if(err){
      console.log("access type info wrong",err);
    }else{
      console.log(data);
      res.json({"data":data})
    }
  })
  //res.send('Hello Worldhahahahahahhahahhaha!')
})


//app.get('/',                         adminCtrl.index);
//app.post('/admin/checkLogin',        adminCtrl.checkLogin);
//app.get('/admin/getTypeInfo',        adminCtrl.getTypeInfo);
//app.post('/admin/addArticle',        adminCtrl.addArticle);
//app.post('/admin/updateArticle',     adminCtrl.updateArticle);
//app.get('/admin/getArticleList',     adminCtrl.getArticleList);
//app.get('/admin/delArticle/:id',     adminCtrl.delArticle);
//app.get('/admin/getArticleById/:id', adminCtrl.getArticleById); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})