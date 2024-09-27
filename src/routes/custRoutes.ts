import express from 'express'
import { Custmonermildewares } from '../middlewares/Customermidddlewraes'
import { addCart, Checkout, DelCrat, makecart, updcart } from '../services/Custrevices'
const router = express.Router()
router.post('/addtocart/:id',Custmonermildewares,async(req:any,res)=>{
    // we will continue T ensah2 allah :)
    const email= req.cust.email
    const {id} = req.params
    const cart= await makecart({email})
    const addtpcart= await addCart({cart,id})
    res.send(addtpcart)
})
router.delete('/deleteincart/:id',Custmonermildewares,async(req:any,res)=>{
    // we will continue T ensah2 allah :)
    const email= req.cust.email
    const {id} = req.params
    const cart= await makecart({email})
    const addtpcart= await DelCrat({cart,id})
    res.send(addtpcart)
})
router.put('/updincart/:id',Custmonermildewares,async(req:any,res)=>{
    // we will continue T ensah2 allah :)
    const email= req.cust.email
    const {id} = req.params
    const {quantaty}=req.body
    const cart= await makecart({email})
    const addtpcart= await updcart({cart,id,quantaty})
    res.send(addtpcart)
})
router.post('/checkout',Custmonermildewares,async(req:any,res)=>{
    const email= req.cust.email
    const cart= await makecart({email})
    const checkout= await Checkout({cart})
    res.send(checkout)
})

export default router