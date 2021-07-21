
const mysql = require('mysql');
var formidable = require('formidable');

//const pdUrl="http://localhost:3000";
const pdUrl="https://ll-blog-client.vercel.app";

var db = mysql.createConnection({
    host: 'blog-db.camhq7invtrq.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'longlin',
    password: '12345678',
    database: 'react_blog'
  });


exports.index=function(req,res){
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Origin', pdUrl)

    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          //console.log(data);
          res.json({"data":data})
        }
    })
}


exports.getTypeInfo=function(req,res){
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Origin', pdUrl)

    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          //console.log(data);
          res.json({"data":data})
        }
    })
}


exports.getArticleList=function(req,res){
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Origin', pdUrl)

    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id'

    db.query(sql,function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          res.json({"data":data})
        }
    })  
}

exports.getArticleById=function(req,res){
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Origin', pdUrl)

    let id=req.params.id;
    console.log("client-getArticleById---",id)

    let sql='SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+ 
    'WHERE article.id='+id

    db.query(sql,function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          //console.log(data);
          res.json({"data":data})
        }
    })  
}


exports.getListById=function(req,res){
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Origin', pdUrl)

  let id=req.params.id;
  console.log("client-getListById---",id)

  let sql='SELECT article.id as id ,'+
  'article.title as title ,'+
  'article.introduce as introduce ,'+
  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ,"+
  'article.view_count as view_count ,'+
  'type.typeName as typeName '+
  'FROM article LEFT JOIN type ON article.type_id=type.Id '+
  'WHERE type_id='+id

  db.query(sql,function(err,data){
      if(err){
        console.log("access type info wrong",err);
      }else{
        //console.log(data);
        res.json({"data":data})
      }
  })  
}
