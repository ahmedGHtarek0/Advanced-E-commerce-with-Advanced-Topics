import { CustomerModels, EmpModels } from "../modules/allusers"
import { CustCartModles } from "../modules/Cartmoldes"
import { CustOrderModles } from "../modules/Oderincust"
import { EmpOrderModles } from "../modules/OrderoFemp"
import { ProductsModels } from "../modules/productsmodules"

interface addcaet{
    cart:any,
    id?:string
    quantaty?:number
}
interface carts{
    email:string
}
export const makecart=async({email}:carts)=>{
    const findcust= await CustomerModels.findOne({email})
    const nameofcust= await CustCartModles.findOne({emailofcust:email})
    if(!nameofcust){
       const addnewcart= await CustCartModles.create({emailofcust:email,nameofcust:findcust?.name})
       await addnewcart.save()
       return( addnewcart)
    }
    return(nameofcust)
}
export const addCart=async({cart,id}:addcaet)=>{
    const seacrhaboutpro= await ProductsModels.findOne({_id:id})
    if(!seacrhaboutpro){
        return('the product is not here')
    }
    for(const p of cart.cart){
        if(p.idofpro===id){
            return('the item is laredy in the cart')
        }
    }
    cart.cart.push({title:seacrhaboutpro.title,discription:seacrhaboutpro.discription,image:seacrhaboutpro.image,price:seacrhaboutpro.price,idofowneremp:seacrhaboutpro.idofowneremp,idofpro:id})
    await cart.save()
    cart.totalAmount=0
    for(const p of cart.cart){
        cart.totalAmount+=p.price*p.quantaty
    }
    await cart.save()
    return (cart)
}
export const DelCrat=async({cart,id}:addcaet)=>{
    const deletedcart= cart.cart.filter((p:any)=>{
        return(p.idofpro!==id)
    })
    cart.cart=deletedcart
    await cart.save()
    cart.totalAmount=0
    for(const p of cart.cart){
        cart.totalAmount+=p.price*p.quantaty
    }
    await cart.save()
    return(cart)
}
export const updcart=async({cart,id,quantaty}:addcaet)=>{
    for(const p of cart.cart){
        if(p.idofpro===id){
            p.quantaty=quantaty
        }
    }  
    await cart.save()
    cart.totalAmount=0
    for(const p of cart.cart){
        cart.totalAmount+=p.price*p.quantaty
    }
    await cart.save()
    return(cart)
}
interface Order{
    cart:any
}
export const Checkout=async({cart}:Order)=>{
    const addorder= await CustOrderModles.create({nameofcust:cart.nameofcust,emailofcust:cart.emailofcust,totalAmount:cart.totalAmount,Ordercart:cart.cart})
    await addorder.save()
    for(let p of cart.cart){
       const paypro:any= await ProductsModels.findOne({_id:p.idofpro})
       paypro.payproduct+=1
       await paypro.save()
    }
    //
let cachCart:any=[],test=0,total=0,index=0;
const  T=cart.cart
    for(let p of T){
        const findidofEmp =await EmpModels.findOne({_id:p.idofowneremp})
        index=0
        for(let Q of cart.cart){
            if(p.idofowneremp===Q.idofowneremp&&Q.quantaty!==-1){
                test++
                total+=Q.price*Q.quantaty
                cachCart.push(T[index])
                Q.quantaty=-1
            }
            index++
        }
        if(test>0){
            const adddorderemp= await EmpOrderModles.create({nameofcust:cart.nameofcust,emailofcust:cart.emailofcust,totalAmount:total,emailofemp:findidofEmp?.email,Ordercart:cachCart})
            await adddorderemp.save()
            // cachCart.length=0
            cachCart=[]
            test=0
            total=0
            await  cart.save()
        }
    }
    return('checkout good')
}