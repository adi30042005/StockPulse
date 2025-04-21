import express from "express"
import cors from "cors"
import PurchaseRoute from "./Routes/Purchase.js"
import mongoose from "mongoose"
import InvRoute from "./Routes/Inventory.js"
import storeRouter from "./Routes/Store.js"
import SalesRouter from "./Routes/Sales.js"
import userRouter from "./Routes/Users.js"
import vendorRouter from "./Routes/Vendor.js"
import AggRoute from "./Routes/Aggregator.js"

const app = express()
mongoose.connect('mongodb+srv://aniruddhanarasimman:Anis301004@inventory.kuh1e.mongodb.net/SmartInventoryManagement?retryWrites=true&w=majority')
    .then(() => console.log("Connected to SmartInventoryManagement"))
    .catch(err => {
        console.error(err);
});

// app.use(cookieparser())
app.use(cors())
app.use(express.json())
app.use('/Vendor', vendorRouter)
app.use('/Purchase',PurchaseRoute )
app.use('/Inventory', InvRoute)
app.use('/Store', storeRouter)
app.use('/Sales',SalesRouter)
app.use('/User', userRouter)
app.use('/Aggregate', AggRoute)

app.get('/', (req, res, err)=>{
    return res.send('Working')
})

app.listen("1234",(err)=>{
    if (!err){
        console.log(`Listening at http:\\\\localhost:1234`)
    }
    else{
        console.error(err)
    }
})