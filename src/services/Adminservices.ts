import { FilterModels } from "../modules/Filter"
import multer from 'multer'
import path from 'path'
interface filter{
    nameoffilter:string
}
export const Addfilter=async({nameoffilter}:filter)=>{
const searchaboutfilter= await FilterModels.findOne({nameoffilter})
if(searchaboutfilter){
    return('the filter ia slerdy exsit')
}
const addfilter = await FilterModels.create({nameoffilter})
await addfilter.save()
return(addfilter)
}
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images'))
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
    }
})
const fileFilter = (req:any, file:any, cb:any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.pdf'||ext==='.mp4'||ext==='.xlsx') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Unsupported file type!'), false); // Reject the file
    }
};
 export let upload=multer({storage:storage,fileFilter:fileFilter,limits: { fileSize: 1024 * 60 *60 } })// 60MB size limit

