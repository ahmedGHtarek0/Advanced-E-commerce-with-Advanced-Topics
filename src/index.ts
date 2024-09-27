import mongoose  from "mongoose";
import express from 'express'
import cors from 'cors'
import path from "path";
import all from "./routes/all";
import Adminroute from "./routes/Adminroute";
import emproutes from "./routes/emproutes";
import custRoutes from "./routes/custRoutes";
const app=express()
const port=3001
mongoose
.connect('mongodb://localhost:27017/testname')
.then(()=> console.log('DB GOOD'))
.catch((err)=>console.log('faild to connect',err))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'./images')))
app.use('/Auth',all)
app.use('/Admin',Adminroute)
app.use('/Emp',emproutes)
app.use('/Cust',custRoutes)
app.listen(port,()=>{
    console.log(`srever i run at http://localhost:${port}`)
})