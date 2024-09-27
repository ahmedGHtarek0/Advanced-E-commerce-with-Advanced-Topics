import express from 'express'
import { Empmiddlewraes } from '../middlewares/empmiddlewares'
import { adddProD, deletepro, gtepro, productupolad, updpro } from '../services/empservices'
const router = express.Router()
// [[{}]]
router.post('/addpro',Empmiddlewraes,productupolad.fields([{name:'IV',maxCount:5}]),async(req:any,res)=>{
    const email=req.emp.email
    const {title,discription,price,stock,filtername}=req.body
    const img=req.files
    const addproduct= await adddProD({title,discription,img,price,stock,email,filtername})
    res.send(addproduct)
})
router.get('/getpro',Empmiddlewraes,async(req:any,res)=>{
    const email=req.emp.email
    const addproduct= await gtepro({email})
    res.send(addproduct)
})
router.delete('/deletepro/:id',Empmiddlewraes,async(req:any,res)=>{
    const email=req.emp.email
    const id=req.params.id
    const addproduct= await deletepro({email,id})
    res.send(addproduct)
})
router.put('/updpro/:id',Empmiddlewraes,productupolad.fields([{name:'IV',maxCount:5}]),async(req:any,res)=>{
    const email=req.emp.email
    const id=req.params.id
    const {title,discription,price,stock,filtername}=req.body
    const img=req.files
    const addproduct= await updpro({img,title,discription,price,stock,filtername,email,id})
    res.send(addproduct)
})

 export default router
