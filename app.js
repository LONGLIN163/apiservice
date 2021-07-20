const express = require('express')

const app = express()
const port = process.env.port || 8081;
var adminCtrl=require("./Ctrl/adminCtrl");

const pdUrl="http://ll-blog-admin.s3-website.eu-west-3.amazonaws.com";

app.options('*', (req, res) => {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Origin', pdUrl)
  res.header('Access-Control-Allow-Method', 'post')
  res.header('Access-Control-Allow-Headers', '*')
  res.send()
})


app.get('/',                         adminCtrl.index);
app.post('/admin/checkLogin',        adminCtrl.checkLogin);
app.get('/admin/getTypeInfo',        adminCtrl.getTypeInfo);
app.post('/admin/addArticle',        adminCtrl.addArticle);
app.post('/admin/updateArticle',     adminCtrl.updateArticle);
app.get('/admin/getArticleList',     adminCtrl.getArticleList);
app.get('/admin/delArticle/:id',     adminCtrl.delArticle);
app.get('/admin/getArticleById/:id', adminCtrl.getArticleById); 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})