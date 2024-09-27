import mongoose,{Schema,Document} from "mongoose";
interface Iproducts extends Document{
    title:string,
    discription:string,
    image:[],
    price:number,
    stock:number,
    payproduct:number,
    idofowneremp:string,
    filtername:string
}
const scehmaofproducts= new Schema<Iproducts>({
    title:{type:String,required:true},
    discription:{type:String,required:true},
    image:{type:[],required:true},
    price:{type:Number,required:true,default:0},
    stock:{type:Number,required:true,default:0},
    payproduct:{type:Number,default:0},
    idofowneremp:{type:String,required:true},
    filtername:{type:String,required:true}
})
export const ProductsModels= mongoose.model<Iproducts>('products',scehmaofproducts)