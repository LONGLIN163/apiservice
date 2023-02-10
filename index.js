const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = process.env.PORT || 8080;
var adminCtrl=require("./Ctrl/adminCtrl");
var clientCtrl=require("./Ctrl/clientCtrl");

app.get('/',                         adminCtrl.index);
app.post('/admin/checkLogin',        adminCtrl.checkLogin);
app.get('/admin/getTypeInfo',        adminCtrl.getTypeInfo);
app.post('/admin/addArticle',        adminCtrl.addArticle);
app.post('/admin/updateArticle',     adminCtrl.updateArticle);
app.get('/admin/getArticleList',     adminCtrl.getArticleList);
app.get('/admin/delArticle/:id',     adminCtrl.delArticle);
app.get('/admin/getArticleById/:id', adminCtrl.getArticleById); 

app.get('/blog/index',               clientCtrl.index);
app.get('/blog/getArticleList',      clientCtrl.getArticleList);
app.get('/blog/getArticleById/:id',  clientCtrl.getArticleById); 
app.get('/blog/getListById/:id',     clientCtrl.getListById);
app.get('/blog/getTypeInfo',         clientCtrl.getTypeInfo);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})