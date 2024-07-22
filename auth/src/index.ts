import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose"
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/sign-in";
import { signoutRouter } from "./routes/sing-out";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";

const app = express()
app.set('trust proxy', true) // since nginix is proxying the traffic, and we should trust that traffic
const port = 4000;
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true // use cookie only when user on https: small security addon
    })
)

app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)

app.all('*', (req, res)=>{
    throw new NotFoundError();

})

app.get("/", (req, res)=>{
    res.send("zak zak zak")
})

app.get('/api/users/currentuser', (req, res)=>{
    res.send('Hi there')
})

const start = async () =>{
    try{
        if(!process.env.JWT_SECRET){

        }
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    }

    catch(err){
        console.error(err);
    }

    // port doesnt really matter when we use kubernetes cluster
    app.listen(port, ()=>{
        console.log(`Auth service started at port ${port}`)
    })
    
}

start()

