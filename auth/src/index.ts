import express from "express";
import { json } from "body-parser";

const app = express()
const port = 4000;
app.use(json())


// port doesnt really matter when we use kubernetes cluster
app.listen(port, ()=>{
    console.log(`Auth service started at port ${port}`)
})