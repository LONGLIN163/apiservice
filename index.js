const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors());

// app.use(cors({
//     origin: '*'
// }));
const port = process.env.PORT || 8080;
var adminCtrl=require("./Ctrl/adminCtrl");
var clientCtrl=require("./Ctrl/clientCtrl");
//const pdUrl="https://ll-blog-client.vercel.app";

// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', pdUrl)
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Method', 'post')
//   res.header('Access-Control-Allow-Headers', '*')
//   res.send()
// })

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