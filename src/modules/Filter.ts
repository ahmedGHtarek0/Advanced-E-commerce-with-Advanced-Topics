import mongoose,{Schema,Document, model} from "mongoose";
interface Iusers extends Document{
    nameoffilter:string,
    
}
const scemausers = new Schema<Iusers>({
    nameoffilter:{type:String,required:true},
    
})
export const FilterModels= mongoose.model<Iusers>('Filter',scemausers)
