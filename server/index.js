const express = require ('express')
const connectDB = require ('./db.js')
const itemModel = require ('./models/items.js')
const cors = require ('cors')

const app = express ()
app.use(express.json())

connectDB()
app.get ('/',async(req , res) => { 
    const responce = await itemModel.find()
    return res.json({items : responce}) 
})

app.listen(5173, () =>{

    console.log("app is running");
  
})