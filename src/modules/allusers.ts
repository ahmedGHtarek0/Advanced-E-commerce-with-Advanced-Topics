import mongoose,{Schema,Document, model} from "mongoose";
interface Iusers extends Document{
    name:string,
    email:string,
    password:string,
    defultphoto:string
    profilephoto:any[]
}
const scemausers = new Schema<Iusers>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    defultphoto:{type:String,default:'../images/Cristiano Ronaldo icon.jpg'},
    profilephoto:{type:[]}
})
export const AdminModels= mongoose.model<Iusers>('Admin',scemausers)
export const EmpModels= mongoose.model<Iusers>('Emps',scemausers)
export const CustomerModels= mongoose.model<Iusers>('customer',scemausers)
