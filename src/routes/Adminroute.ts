import express, { response } from 'express'
import { Adminmiiddlwrse } from '../middlewares/Adminmiddlwares'
import { Addfilter, upload } from '../services/Adminservices'
import { AdminModels } from '../modules/allusers'
const router= express.Router()
router.post('/addfilter',Adminmiiddlwrse,async(req:any,res)=>{
    const{nameoffilter}=req.body
    const addfilter= await Addfilter({nameoffilter})
    res.send(addfilter)
})
router.post('/profilephoto',Adminmiiddlwrse,upload.single('img'),async(req:any,res)=>{
    const EMail:any=req.Admin.email
    const imgg=req.file
    console.log(imgg)
    const addphoto=await AdminModels.findOneAndUpdate({email:EMail},{$set:{profilephoto:imgg}})
    res.send('add '+imgg)
})
export default router