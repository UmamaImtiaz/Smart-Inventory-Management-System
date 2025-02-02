const express = require ('express')
const connectDB = require ('./db.js')
const userModel = require ('./models/userModel.js')
const cors = require ('cors')
const bodyParser = require ('body-parser');
const userRoute = require('./routes/userRoute')
const errorHandler = require("./middleWare/errorMiddleware")

const app = express ()


// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes Middlewares
app.use("/api/users", userRoute);

// Routes
app.get("/", (req,res) => {
   res.send("Home Page");
});

// Error Middleware
  app.use(errorHandler);

connectDB()
app.get ('/',async(req , res) => { 
    const responce = await itemModel.find()
    return res.json({items : responce}) 
})

app.listen(5173, () =>{

    console.log("app is running");
  
})