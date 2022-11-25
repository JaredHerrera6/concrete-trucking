require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json())

//Drivers home Page
app.get("/api/v1/management", async(req,res) => {
    res.status(200).json({
        status:"Success", 
        data:{
            
        }
    })
})


const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log(`Server is up and running on port ${port}`)
})

