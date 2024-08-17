
const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());

const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12726579",
  password: "I2Ru9K1xtv",
  database: "sql12726579"
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
  } else {
    console.log("Database is connected");
  }
});




function getMobiles(){
  return new Promise(function(success,reject){
    con.query(`SELECT * FROM assignments`,function(err,rows,col){
      if(err){
        reject(err)
      }else{
        success(rows)
      }
    })
  })
}

function addMobile(id,name,assignment){
  return new Promise(function(success,reject){
    con.query(`INSERT INTO assignments (id,student,assignment) VALUES (?,?,?)`,[id,name,assignment],function(err,rows,col){
      if(err){
        reject(err)
      }else{
        success(rows)
      }
    })
  })
}


function updateMobile(name,assignment,id){
  return new Promise(function(success,reject){
  con.query(`UPDATE assignments SET student=?,assignment=? WHERE id=?`,[name,assignment,id],function(err,rows){
     if(err){
      reject(err)
     }else{
      success(rows)
     }
  })
})}

function deleteMobiles(id){
  return new Promise(function(success,reject){
  con.query(`DELETE FROM assignments WHERE id=?`,[id],function(err,rows){
    if(err){
      reject(err)
    }else{
      success(rows)
    }
  })
})
}



module.exports={getMobiles,addMobile,updateMobile,deleteMobiles,con}














































// app.post("/login",(req,res)=>{
//     const sql = "SELECT * FROM login WHERE `username`=? AND `password`=?";
//     db.query(sql,[req.body.username,req.body.password],(err,data)=>{
//          if(err){
//               return res.json("Error")      
//          }  
//          if(data.length>0) {
//              const id = data[0].id;
//              const token = jwt.sign({id},"jwtSecretKey",{expiresIn:300});
//              return res.json({Login:true,token,data})       
//          } else{
//              return res.json("Failed")       
//          }       
//     })
// })