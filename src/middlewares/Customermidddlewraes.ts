import { NextFunction } from "express";
import jwt  from 'jsonwebtoken'
import { AdminModels, CustomerModels, EmpModels } from "../modules/allusers";
export const Custmonermildewares=(req:any,res:any,next:NextFunction)=>{
    const authorization= req.get('authorization')
    if(!authorization){
        res.send('where is the authorization ')
    }
    const token= authorization.split(' ')[1]
    if(!token){
        res.send('where is token')
    }
jwt.verify(token,'Cust',async(err:any,payload:any)=>{
if(err){
    res.send('the token is no right')
}
if(!payload){
    res.send('the token is erro from payload ')
}
const admin=await CustomerModels.findOne({email:payload.email})
if(!admin){
    res.send('the email or password was deleted or not exsit')
}
req.cust=admin
next()
})
}