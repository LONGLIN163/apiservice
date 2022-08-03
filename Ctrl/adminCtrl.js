

var formidable = require('formidable');
//const pdUrl="http://localhost:3001";// when testing, start client(3000) first.
const pdUrl="http://localhost:3000"; // when client is running on server, this one is just for running on local
const db = require("../config/db")

db.connect()

exports.checkLogin=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
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
               console.log("sever error---",err);
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
            console.log("session******openId*******:"+openId)
        }) 
    
    })
}
exports.index=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("server error---",err);
        }else{
          res.json({"data":data})
        }
    })
}
exports.getTypeInfo=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
    db.query("SELECT * FROM type",function(err,data){
        if(err){
          console.log("server error---",err);
        }else{
          res.json({"data":data})
        }
    })
}
exports.addArticle=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        let temArticle=fields;
        function toLiteral(str) {
          var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r' };
          return str.replace(/([\\'"\b\t\n\v\f\r])/g, function($0, $1) {
              return '\\' + (dict[$1] || $1);
          });
        }
        const sql = 'INSERT INTO '+
            'article VALUES('+0+','
            +temArticle.type_id+
            ',"'+temArticle.title+'","'
            +`${toLiteral(temArticle.article_content)}`+'","'
            +temArticle.introduce+'","'
            +temArticle.addTime+'",'
            +temArticle.view_count+')';
        console.log("sql:",sql)
        db.query(sql,(error, results, fields) => {
          if (error) {
            throw error;
          }
          console.log("addArticle---results----------",results);
          const insertSuccess = results.affectedRows === 1; // if there is one row changed, it will be true
          const insertId = results.insertId
        
          res.json({
              isScuccess:insertSuccess,
              insertId
            })
        });
    })
}
exports.updateArticle=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, file) => {
        let temArticle=fields;
        //console.log("updateArticle------>",temArticle)
        function toLiteral(str) {
          var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r' };
          return str.replace(/([\\'"\b\t\n\v\f\r])/g, function($0, $1) {
              return '\\' + (dict[$1] || $1);
          });
        }
        const sql = 'UPDATE article '+ 
        'SET type_id='+temArticle.type_id+
        ',title="'+ temArticle.title+'",'+
        'article_content="'+`${ toLiteral(temArticle.article_content)}`+'",'+
        'introduce="'+temArticle.introduce+'",'+
        'addTime="'+temArticle.addTime+'" '+
        'WHERE article.id='+temArticle.id;
      
        console.log("sql-----:",sql)
        db.query(sql,(error, results, fields) => {
          if (error) {
            throw error;
          }
          console.log("updateresults----------",results);
          const updateSuccess = results.affectedRows === 1; // if there is one row changed, it will be true
        
          res.json({
              isSuccess:updateSuccess
          })
        });
    })
}
exports.getArticleList=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
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
          console.log("server error---",err);
        }else{
          res.json({"data":data})
        }
    })  
}
exports.getArticleById=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
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
          //console.log(data);
          res.json({"data":data})
        }
    })  
}
exports.delArticle=function(req,res){
    res.header('Access-Control-Allow-Origin', pdUrl)
    
    let id=req.params.id;
    console.log("id---",id)
    let sql = `DELETE FROM article WHERE id = ${id}`
    console.log("sql---",sql)
    db.query(sql,function(err,data){
        if(err){
          console.log("access type info wrong",err);
        }
        res.json({"data":data})
    })
}