import express from 'express'
import { confrimationemailadmin, confrimationemailcust, confrimationemailEmp, confrimotp, loginallusers, regesteradmin, regestercustomer, regesterEmp, resrtpasswordallusers, restpassword } from '../services/loginandregisteralluser'
 const router= express.Router()
router.post('/registerAdmin',async(req:any,res)=>{
    const {name,email,password}=req.body
    const {data,STC}= await regesteradmin({name,email,password})
    if(STC!==200){
        res.send(data)
    }
    else{
    const add=await confrimationemailadmin({name,email,password})
    res.status(200).send(add)
    }
})
router.post('/login',async(req:any,res)=>{
    const {email,password}=req.body
    const {data}= await loginallusers({email,password})
   res.send(data)
})
router.post('/registeremp',async(req:any,res)=>{
    const {name,email,password}=req.body
    const {data,STC}= await regesterEmp({name,email,password})
    if(STC!==200){
        res.send(data)
    }
    else{
    const add=await confrimationemailEmp({name,email,password})
    res.status(200).send(add)
    }
})
router.post('/registercust',async(req:any,res)=>{
    const {name,email,password}=req.body
    const {data,STC}= await regestercustomer({name,email,password})
    if(STC!==200){
        res.send(data)
    }
    else{
    const add=await confrimationemailcust({name,email,password})
    res.status(200).send(add)
    }
})
router.post('/confirmeemail',async(req,res)=>{
    const {email}=req.body
    const ses=await resrtpasswordallusers({email})
    if(ses?.STC===false){
        res.send('the email is wrong')
    }
    else{
        res.send('confrin email plz')
    }
})
router.post('/confrimotp',async(req,res)=>{
    const {OTP}=req.body
    const ses=await confrimotp({OTP})
   res.send(ses)
})
router.post('/resetpassword',async(req,res)=>{
    const {email,newpassword}=req.body
    const ses=await restpassword({email,newpassword})
    res.send(ses)
})

export default router
