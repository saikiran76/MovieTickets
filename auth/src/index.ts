import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose"
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/sign-in";
import { signoutRouter } from "./routes/sign-out";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";
import { currentUserRouter } from "./routes/current-user";

const app = express()
app.set('trust proxy', true) // since nginix is proxying the traffic, and we should trust that traffic
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true // use cookie only when user on https: small security addon
    })
)
const port = 4000;

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', (req, res)=>{
    throw new NotFoundError();

})

app.use(errorHandler)

const start = async () =>{
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try{
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

