import express from "express";
import { json } from "body-parser";

import { signinRouter } from "./routes/sign-in";
import { signoutRouter } from "./routes/sing-out";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";

const app = express()
const port = 4000;
app.use(json())

app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.get("/", (req, res)=>{
    res.send("zak zak zak")
})

app.get('/api/users/currentuser', (req, res)=>{
    res.send('Hi there')
})

// port doesnt really matter when we use kubernetes cluster
app.listen(port, ()=>{
    console.log(`Auth service started at port ${port}`)
})