import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

interface UserPayload{
    id: string,
    email: string
}

// Augmented definition of Request - reach into existing type definition and modify exisiting user interface
declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    if(!req.session?.jwt){
        // whether or not user logged in 
        return next()
    }

    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    } catch(err){

    }

    next()

};