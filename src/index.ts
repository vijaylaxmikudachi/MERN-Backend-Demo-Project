import express from "express";
import mongoose from "mongoose";
import router from "./routes";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const MONGo_URL = 'mongodb://localhost:27017';
mongoose.connect(MONGo_URL,{
    dbName:"bridgeLabz",
}).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});
app.use('/',router);

app.listen(400,()=>{
    console.log(`Server running on port 400`);
})
