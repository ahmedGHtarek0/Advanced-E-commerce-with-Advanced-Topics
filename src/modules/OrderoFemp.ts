import mongoose,{Schema,Document} from "mongoose";
interface Icart {
    title:string,
    discription:string,
    image:[],
    price:number,
    quantaty:number,
    idofowneremp:string,
    idofpro:string,
}
const scehmaofproducts= new Schema<Icart>({
    title:{type:String,required:true},
    discription:{type:String,required:true},
    image:{type:[],required:true},
    price:{type:Number,required:true,default:0},
    quantaty:{type:Number,required:true,default:1},
    idofowneremp:{type:String,required:true},
    idofpro:{type:String,required:true},

})
interface Iallcart extends Document{
    nameofcust:string,
    emailofcust:string,
    emailofemp:string
    Ordercart:Icart[],
    totalAmount:number
}
const allcart= new Schema<Iallcart>({
    nameofcust:{type:String,required:true},
    emailofcust:{type:String,required:true},
    emailofemp:{type:String,required:true},
    Ordercart:[scehmaofproducts],
    totalAmount:{type:Number,default:0},
})
export const EmpOrderModles= mongoose.model<Iallcart>('OrderEmp',allcart)