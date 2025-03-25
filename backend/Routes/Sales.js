import express from "express"
import { Sales,Inv, Store } from "../schema.js"

const SalesRouter = express.Router()

SalesRouter.get('/:id', async(req, res)=>{
    try {
        const salesData = await Sales.find({_id:req.body.saleId})
        if (salesData.length != 0 ){  
            return res.status(201).json({
                "msg":"Data Fetched",
                salesData
            })
        }
        else if(salesData.length > 2){
            return res.status(403).json({
                "msg":"Multiple items found", salesData
            })
        }
    
        return res.status(402).json({
            "msg":"No sales found"
        })
    
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

SalesRouter.post('/newSales', async(req, res)=>{
    if (!(req.body.StoreId || req.body.productId || req.body.Quantity )){
        return res.status(400).json({
            "msg":"Missing fields"
        })
    }
    try {
        const price = await Inv.find({_id:req.body.productId})[0].price
        const newSale = {
        StoreId:req.body.StoreId,
        productId:req.body.productId,
        Quantity:req.body.Quantity,
        totalCost: req.body.Quantity *price
        }
        const sales = await Sales.find()
        var lastid = 1
        if (sales.length != 0) lastid = sales.at(-1)._id + 1 
        newSale._id = lastid
        const newS = new Sales(newSale)
        await newS.save()
        const pdt = await Inv.find({_id:req.body.productId})
        pdt[0].Quantity -= req.body.Quantity
        await pdt[0].save()
        const newSt = await Store.find({_id:req.body.StoreId})
        if (newSt.length === 1){
            if (req.body.Paid){
                newSt[0].TotalSales += Number(newSale.totalCost)       
            }
            else{
                newSt[0].toGet += Number(newSale.totalCost)
            }
            await newSt[0].save()
        }
        else if(newSt.length === 0){
            return res.status(402).json({
                "msg":"store Not found"
            })
        }
        const inv = await Inv.find({_id:newSale.productId})
        if (inv.length === 1){
            inv[0].Quantity -= newPurchase.Quantity
            inv[0].unitsSold += newPurchase.Quantity
        }
        return res.status(200).json({
            "msg":"New Sales entry added"
        })
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error fetching product"
        })
    }
})

export default SalesRouter