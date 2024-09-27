import multer from "multer";
import path from "path";
import { EmpModels } from "../modules/allusers";
import { ProductsModels } from "../modules/productsmodules";
import { FilterModels } from "../modules/Filter";
 const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
    }
 })
 const fileFilter = (req:any, file:any, cb:any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext==='.mp4') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Unsupported file type!'), false); // Reject the file
    }
};
export const productupolad=multer({storage:storage,fileFilter:fileFilter,limits:{fileSize:1024*60*60}})
interface addprodutcs{
    title:string,
    discription:string,
    img:any,
    price:number,
    stock:number,
    email:string,
    filtername:string
}
export const adddProD=async({title,discription,img,price,stock,email,filtername}:addprodutcs)=>{
    const searchabouyempp:any=await  EmpModels.findOne({email:email})
    if(!searchabouyempp){
        
        return('the emp is no provider')
    }
  const  searchabouyfilter = await FilterModels.findOne({nameoffilter:filtername})
  if(!searchabouyfilter){
  //  console.log(searchabouyempp?.email)
    return('the filter is not exsit')
  }
     const adddpro=await ProductsModels.create({title,discription,image:img,price,stock,idofowneremp:searchabouyempp._id,filtername:filtername})
     await adddpro.save()
     return(adddpro)
}
interface getdeleteproudtcs{
    email:string,
    id?:string
}
export const gtepro=async({email}:getdeleteproudtcs)=>{
    const searchabouyempp:any=await  EmpModels.findOne({email:email})
    if(!searchabouyempp){
        return('the emp is no provider')
    }
     const getprao=await ProductsModels.find({idofowneremp:searchabouyempp._id})
     return(getprao)
}
export const deletepro=async({email,id}:getdeleteproudtcs)=>{
    const searchabouyempp:any=await  EmpModels.findOne({email:email})
    if(!searchabouyempp){
        return('the emp is no right')
    }
     const getprao=await ProductsModels.findOneAndDelete({_id:id})
     return('deleted')
}
interface upd{
    img:[],
    title:string,
    discription:string,
    price:number,
    stock:number,
    filtername:string,
    email:string,
    id:string
}
export const updpro=async({img,title,discription,price,stock,filtername,email,id}:upd)=>{
    const searchabouyempp:any=await  EmpModels.findOne({email:email})
    if(!searchabouyempp){
        return('the emp is no right')
    }
    const  searchabouyfilter = await FilterModels.findOne({nameoffilter:filtername})
  if(!searchabouyfilter){
  //  console.log(searchabouyempp?.email)
    return('the filter is not exsit')
  }
    const updated= await ProductsModels.findOneAndUpdate({_id:id},{$set:{title,discription,price,stock,filtername,image:img}})
    await updated?.save()
     return('updated')
}