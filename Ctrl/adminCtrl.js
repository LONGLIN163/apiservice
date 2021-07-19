
const mysql = require('mysql');
var formidable = require('formidable');

var db = mysql.createConnection({
    host: 'blog-db.camhq7invtrq.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'longlin',
    password: '12345678',
    database: 'react_blog'
  });

exports.checkLogin=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //console.log(req)
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        console.log(fields)
        let userName=fields.userName;
        let password=fields.password;
  
        let sql = "SELECT userName FROM admin_user WHERE userName='"+userName + 
                  "' AND password = '"+password+"'"
    
        db.query(sql, function(err,data){
            let openId=new Date().getTime();

            if(err){
               console.log("sever error ",err);
               return;
            }else if(data.length>0){
              res.json({
                    "data":"login success",
                    "openId":openId
                })
            }else{
              res.json({
                    "data":"login failed"
                })
            }

            console.log("session***************:"+openId)
        }) 
    
    })
}


exports.index=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          console.log(data);
          res.json({"data":data})
        }
    })
}


exports.getTypeInfo=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          console.log(data);
          res.json({"data":data})
        }
    })
}

exports.addArticle=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        //const inputValue=fields.input;
        console.log(fields)
        const result = mergeLetters(inputValue)
        //console.log(result)
        res.json({"result":result})
    })
}


exports.getArticleList=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'ORDER BY article.id DESC'

    db.query(sql,function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }else{
          console.log(data);
          res.json({"data":data})
        }
    })  
}

exports.getArticleById=function(req,res){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    
    let id=req.params.id;
    console.log("id---",id)

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
          console.log(data);
          res.json({"data":data})
        }
    })  
}
