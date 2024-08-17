const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
app.use(express.json())
const db = require("./database")

require("dotenv").config()

app.get("/",(req,res)=>{
     res.send("hello wolrd")
})

app.get("/assignments",authenicateToken,(req,res)=>{
     db.getMobiles().then((result)=>{
      res.send(result)            
     })  
     .catch(()=>{console.log("error")})             
                    
})
app.post("/assignments",authenicateToken,(req,res)=>{
      db.addMobile(req.body.id,req.body.student,req.body.assignment).then((result)=>{
      res.send(req.body)            
     })  
     .catch(()=>{console.log("error")})              
})
app.put("/assignments",authenicateToken,(req,res)=>{
     if(req.body.id>0){
          db.updateMobile(req.body.student,req.body.assignment,req.body.id).then(()=>{
               res.send("updated successfully")            
              })  
              .catch(()=>{console.log("error")}) 
     }else{
        res.send("plz enter a id")
     }            
})
app.delete("/assignments",authenicateToken,(req,res)=>{
    if(req.body.id>0){
     db.deleteMobiles(req.body.id).then(()=>{
          res.send("deleted successfully...!")            
         })  
         .catch(()=>{console.log("error")}) 
    }else{
     res.send("plz enter a id")
  }             
})


app.post("/login",(req,res)=>{
  try{
   const username = req.body.username;
   const password = req.body.password
   const user = {name:username,password:password}
    if (!username || !password) {
      return res.status(400).send("Please enter both username and password");
    }else{
     const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
     res.json({accessToken}) 
   }
   
  }catch(err){
     console.log(err.message)
  }

})

function authenicateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader &&  authHeader.split(" ")[1] 
    if(token==null) return res.sendStatus(401)  

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
         req.user=user
          next()
    })
}

 app.listen(5000,()=>{console.log("port is running 5000")})




