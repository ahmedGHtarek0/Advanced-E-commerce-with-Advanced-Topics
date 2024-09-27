import mongoose,{Schema,Document, model} from "mongoose";
interface Iusers extends Document{
    email:string,
    otp:number,
    date:number
    edate:number
}
const scemausers = new Schema<Iusers>({
    email:{type:String,required:true},
    otp:{type:Number,required:true},
    date:{type:Number},
    edate:{type:Number}
})
export const OTPmodels= mongoose.model<Iusers>('OTP',scemausers)
