import { text } from "express"
import { AdminModels, CustomerModels, EmpModels } from "../modules/allusers"
import nodemailer from 'nodemailer'
import { OTPmodels } from "../modules/otp"
import jwt from 'jsonwebtoken'
interface reqgisterAdmin{
    name:string,
    email:string,
    password:string
}
let Otpstore:any=[]
let Q=0;
let R=0;
let Otpstoreemp:any=[]
let E=0;
let OtpstoreCust:any=[]
export const regesteradmin=async({name,email,password}:reqgisterAdmin)=>{
    const searchabouyAdmin= await AdminModels.findOne({email})
    if(searchabouyAdmin){
        return({data:"the user alredy exsit",STC:400})
    }
    const OTP= generateOTp()
    const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
    await create.save()
    Q=OTP
    // Otpstore[Q]={otp:Q,expires: Date.now() + 5 * 60 * 1000}//5 minutes
    Email({useremail:email,subject:'any',OTP:Q})
    return({data:'plz confirm email',STC:200})
}
export const confrimationemailadmin=async({name,email,password}:reqgisterAdmin)=>{
    try{
        const searchaboutotp= await OTPmodels.findOne({otp:Q})
        if(searchaboutotp&&Date.now()<=searchaboutotp.edate){
            const find=await OTPmodels.findOneAndDelete({otp:Q})
            const addadmin= await AdminModels.create({name,email,password})
        await addadmin.save()
        return(generatJwtAdmin({email,password}))
            // return('accepted oytp')
        }
        else {
            const find=await OTPmodels.findOneAndDelete({otp:Q})
            return('expired otp ')
        }
    
        // OTP is valid; proceed with your logic (e.g., register the user)
        delete Otpstore[Q]; // Clear the OTP after successful verification
        
        const addadmin= await AdminModels.create({name,email,password})
        await addadmin.save()
        return(addadmin)
       }catch{
    return('the OTP is expired')
       }

}
export const confrimationemailEmp=async({name,email,password}:reqgisterAdmin)=>{
    try{
        const searchaboutotp= await OTPmodels.findOne({otp:R})
        if(searchaboutotp&&Date.now()<=searchaboutotp.edate){
            const find=await OTPmodels.findOneAndDelete({otp:R})
            const addadmin= await EmpModels.create({name,email,password})
        await addadmin.save()
        return(generatJwtEmp({email,password}))
            // return('accepted oytp')
        }
        else {
            const find=await OTPmodels.findOneAndDelete({otp:R})
            return('expired otp ')
        }
    
        // OTP is valid; proceed with your logic (e.g., register the user)
        delete Otpstoreemp[R]; // Clear the OTP after successful verification
        
        const addadmin= await EmpModels.create({name,email,password})
        await addadmin.save()
        return(addadmin)
       }catch{
    return('the OTP is expired')
       }

}
export const confrimationemailcust=async({name,email,password}:reqgisterAdmin)=>{
    try{
        const searchaboutotp= await OTPmodels.findOne({otp:E})
        if(searchaboutotp&&Date.now()<=searchaboutotp.edate){
            const find=await OTPmodels.findOneAndDelete({otp:E})
            const addadmin= await CustomerModels.create({name,email,password})
            await addadmin.save()
            return(generatJwtCust({email,password}))
            // return('accepted oytp')
        }
        else {
            const find=await OTPmodels.findOneAndDelete({otp:E})
            return('expired otp ')
        }
        // OTP is valid; proceed with your logic (e.g., register the user)
        delete Otpstore[E]; // Clear the OTP after successful verification
        const addadmin= await CustomerModels.create({name,email,password})
        await addadmin.save()
        return(addadmin)
       }catch{
    return('the OTP is expired')
       }

}
interface reqgisterEMP{
    name:string,
    email:string,
    password:string
}
export const regesterEmp=async({name,email,password}:reqgisterEMP)=>{
    const searchabouyempp= await EmpModels.findOne({email})
    if(searchabouyempp){
        return({data:"the user alredy exsit",STC:400})
    }
    const OTP= generateOTp()
    const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
    await create.save()
     R=OTP
    // Otpstoreemp[R]={otp:R,expires: Date.now() + 5 * 60 * 1000}//5 minutes
    Email({useremail:email,subject:'any',OTP:R})
    return({data:'plz confirm email',STC:200})
}
interface reqgistercustomer{
    name:string,
    email:string,
    password:string
}
export const regestercustomer=async({name,email,password}:reqgistercustomer)=>{
    const searchaboutCustomer= await CustomerModels.findOne({email})
    if(searchaboutCustomer){
        return({data:"the user alredy exsit",STC:400})
    }
    const OTP= generateOTp()
    const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
    await create.save()
     E=OTP
    // OtpstoreCust[E]={otp:E,expires: Date.now() + 5 * 60 * 1000}//5 minutes
    Email({useremail:email,subject:'any',OTP:E})
    return({data:'plz confirm email',STC:200})
}
interface loginallusers{
    email:string,
    password:string
}
export const loginallusers=async({email,password}:loginallusers)=>{
    const searchabouyAdmin= await AdminModels.findOne({email})
    if(searchabouyAdmin){
    if(password===searchabouyAdmin.password){
        return({data:generatJwtAdmin({email,password})})
    }
    }
    const searchabouyempp= await EmpModels.findOne({email})
    if(searchabouyempp){
    if(password===searchabouyempp.password){
        return({data:generatJwtEmp({email,password})})
    }
    }
    const searchaboutCustomer= await CustomerModels.findOne({email})
    if(searchaboutCustomer){
    if(password===searchaboutCustomer.password){
        return({data:generatJwtCust({email,password})})
    }
    }

    return({data:'the password or email is wrong'})
}
interface reses{
    email:string
}
export const resrtpasswordallusers=async({email}:reses)=>{
    const searchabouyAdmin= await AdminModels.findOne({email})
    if(searchabouyAdmin){
   const OTP= generateOTp()
   const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
   await create.save()
   E=OTP
   OtpstoreCust[E]={otp:E,expires: Date.now() + 5 * 60 * 1000}//5 minutes
   Email({useremail:email,subject:'any',OTP:OTP})
   return({data:'OKay',STC:true})
    }
    const searchabouyempp= await EmpModels.findOne({email})
    if(searchabouyempp){
        const OTP= generateOTp()
        const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
        await create.save()
        E=OTP
        OtpstoreCust[E]={otp:E,expires: Date.now() + 5 * 60 * 1000}//5 minutes
        Email({useremail:email,subject:'any',OTP:OTP})
        return({data:'Okay',STC:true})
    }
    const searchaboutCustomer= await CustomerModels.findOne({email})
    if(searchaboutCustomer){
        let OTP= generateOTp()
        const create= await OTPmodels.create({email,otp:OTP,date:Date.now(),edate:Date.now()+2*60*1000})
        await create.save()
        E=OTP
        OtpstoreCust[E]=OTP
        Email({useremail:email,subject:'any',OTP:OTP})
        return({data:'OkAY',STC:true})
    }

    return({data:'the  email is wrong',STC:false})
}
interface Otpp{
  
    OTP:any
}
export const confrimotp=async({OTP}:Otpp)=>{
    try{
        // if (Date.now() > OtpstoreCust[E].expires) {
        //     delete Otpstore[E]; // Clear expired OTP
        //     return ('OTP has expired');
        // }
    const searchaboutotp= await OTPmodels.findOne({otp:OTP})
    if(searchaboutotp&&Date.now()<=searchaboutotp.edate){
        const find=await OTPmodels.findOneAndDelete({otp:OTP})
        return('accepted oytp')
    }
    else {
        const find=await OTPmodels.findOneAndDelete({otp:OTP})
        return('expired otp ')
    }
       
        //console.log(OTP,' ',Otpstore[E])
        // OTP is valid; proceed with your logic (e.g., register the user)
        delete Otpstore[E]; // Clear the OTP after successful verification
       return(true)
       }catch{
    return(false)
       }

}
interface reset{
    email:string,
    newpassword:string
}
export const restpassword=async({email,newpassword}:reset)=>{
        const searchabouyAdmin= await AdminModels.findOne({email})
    if(searchabouyAdmin){
    const upd = await AdminModels.findOneAndUpdate({email},{$set:{password:newpassword}})
    await upd?.save()
    return('changes')
    }
    const searchabouyempp= await EmpModels.findOne({email})
    if(searchabouyempp){
        const upd = await EmpModels.findOneAndUpdate({email},{$set:{password:newpassword}})
        await upd?.save()
        return('chnages')
    }
    const searchaboutCustomer= await CustomerModels.findOne({email})
    if(searchaboutCustomer){
        const upd = await CustomerModels.findOneAndUpdate({email},{$set:{password:newpassword}})
        await upd?.save()
        return('chnages')
    }
      
}

const generateOTp=()=>{
    return Math.floor(100000+Math.random() *900000)//to 6 digits
}
interface Iemail{
    useremail:any,
    subject:any,
    OTP:any
}
const Email=async({useremail,subject,OTP}:Iemail)=>{
    const tarnsporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'sbdhdjdjdj0@gmail.com',
            pass:'eaap ojtc ekve woqn'
        }
    })
    const mailoption={
        from:"sbdhdjdjdj0@gmail.com",
        to:useremail,
        subject:subject,
        text:`hello ${useremail}`,
        html:` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #fff;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px;
            background-color: #007BFF;
            color: #fff;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eaeaea;
        }
        .logo {
            max-width: 100px; /* Adjust size as needed */
            margin: 20px auto;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome!</h1>
        </div>
        <div class="content">
            <img src="../images/Cristiano Ronaldo icon.jpg" alt="Company Logo" class="logo" />
            <h2> the OTP, ${OTP}</h2>
            <p>Thank you for being a part of our community. We’re excited to have you!</p>
            <p>If you have any questions, feel free to reach out to us.</p>
        </div>
        <div class="footer">
            
        </div>
    </div>
</body>
</html>
`
    }
    const info = await tarnsporter.sendMail(mailoption)
    console.log(info.response)
    return(info.response)
}
const generatJwtAdmin=(data:any)=>{
    return jwt.sign(data,'Admin')
}
const generatJwtEmp=(data:any)=>{
    return jwt.sign(data,'Emp')
}
const generatJwtCust=(data:any)=>{
    return jwt.sign(data,'Cust')
}
