import express from "express";
import { json } from "body-parser";

const app = express()
app.use(json())


// port doesnt really matter when we use kubernetes cluster
app.listen(4000, ()=>{
    console.log("Auth service started at port 4000")
})