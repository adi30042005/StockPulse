import express from "express"
import { Purchase } from "../schema.js"
import { Store, Inv } from "../schema.js"

const PurchaseRoute = express.Router()

PurchaseRoute.post('/', async (req, res)=>{
    if (!(req.body.productId || req.body.storeID || req.body.Date || req.body.RetailPrice ||  req.body.Quantity || req.body.Paid)){
        return res.status(400).json({
            "msg":"Missing fields"

        })
    }
    const newPurchase = {
        Date:req.body.Date,
        productId: req.body.productId,
        storeID: req.body.storeID,
        RetailPrice: req.body.RetailPrice,
        Quantity: req.body.Quantity,
        Paid:req.body.Paid
    }

    try {    
        const purchases = await Purchase.find({})
        var lastid = 1
        if (purchases.length != 0) lastid = purchases.at(-1)._id + 1
        newPurchase._id = lastid
        const newP = new Purchase(newPurchase)
        newP.save()
        const newS = await Store.find({_id:req.body.storeID})
        if (newS.length === 1){
            if (req.body.Paid){
                newS[0].TotalExp += Number(req.body.RetailPrice*req.body.Quantity)       
            }
            else{
                newS[0].toGive += Number(req.body.RetailPrice*req.body.Quantity)
            }
            await newS[0].save()
        }
        else{
            return res.status(403).json({
                "msg":"Multiple Stores found",
                "data":newS
            })
        }
        const inv = await Inv.find({_id:newPurchase.productId})
        if (inv.length === 1){
            inv[0].Quantity += newPurchase.Quantity
            inv[0].unitsBought += newPurchase.Quantity
        }
        return res.status(200).json({
            "msg":"New Purchase Invoice Entry Done"
        })   
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

PurchaseRoute.get('/', async (req, res, err)=>{
    try {
        const purchase = await Purchase.find({})
        if (purchase.length === 0 ){
            return res.status(402).json({
                "msg":"No purchase entry found"
            })
        }
        return res.status(200).json(purchase)
    } catch (error) {
        console.error(error)
        return res.status(401).json({"msg":"Error in fetching data"})
    }
})
PurchaseRoute.get('/IdSearch/:id', async(req, res, err)=>{
    try {
        const purchase = await Purchase.find({_id:req.params.id})
        if (purchase.length === 0 ){
            return res.status(402).json({
                "msg":"No purchase entry found"
            })
        }
        return res.status(200).json(purchase)
    } catch (error) {
        console.error(error)
        return res.status(401).json({"msg":"Error in fetching data"})
    }
})
PurchaseRoute.get('/NameSearch/:Name', async(req, res, err)=>{
    try {
        const purchase = await Purchase.find({productName:req.params.Name})
        if (purchase.length === 0){
            res.status(402).json({
                "msg":"no Purhcase data is present"
            })
        }
        else{
            res.status(201).json({
                "msg":"Purchase retrieved",
                "id":purchase[0]._id
            })
        }
    } catch (err) {
        console.error(err)
        res.status(401).json({
            "msg":"Error at fetching record"
        })
    }
})

export default PurchaseRoute