import express from "express"
import { Inv } from "../schema.js"

const InvRoute = express.Router()

InvRoute.post('/NewAdmin', async(req, res)=>{
    if (!(req.body.Name || req.body.MRP || req.body.Quantity || req.body.sID || req.body.RP || req.body.Category || 
        req.body.uB || req.body.uS || req.body.season || req.body.p )){
            return res.status(400).json({
                "msg":"Missing Fields"
            })
        }
        const newProduct = {
            productName:req.body.Name,
            MRP:req.body.MRP,
            Quantity:req.body.Quantity,
            storeID:req.body.sID,
            RetailPrice: req.body.RP,
            Category:req.body.Category,
            unitsBought: req.body.uB,
            unitsSold: req.body.uS,
            Seasonality: req.body.season,
            Promotion: req.body.p
        }

        try {
            const allEntry = await Inv.find({})
            var lastId = 1
            if (allEntry.lenght !=0) lastId = allEntry.at(-1)._id + 1
            newProduct._id = lastId
            const newEntry = new Inv(newProduct)
            newEntry.save()
            return res.status(200).json({
                "msg":"Added new Product"
            })
        } catch (error) {
            return res.status(401).json({
                "msg":"error in saving data"
            })
        }
})

InvRoute.get('/NameSearch/:name', async(req, res)=>{
    try {
        const pdt = await Inv.find({productName:req.params.name})
        if (pdt.length === 0){
            return res.status(402).json({
                "msg":"Record Not found"
            })
        }
        else{
            return res.status(201).json({
                "msg":"Record found",
                "data":pdt
        })}
    } catch (error) {
        console.log(error)
        res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

InvRoute.post('/IncreaseQuantity', async(req, res)=>{
    const id = req.body.id
    const quan = req.body.quan
    if (id && quan){
        try {
            const chkPdt = await Inv.find({_id:id})
            if (chkPdt.length === 1){
                chkPdt[0].Quantity += quan
            }
            else{
                return res.status(403).json({
                    "msg":"Multiple Entries have been found",
                    "data":chkPdt
                })
            }
        } catch (error) {
            console.error(error)
            return res.status(401).json({
                "msg":"Error in retrieving product"
            })
        }
    }
})

InvRoute.get('/IdSeach/:id', async(req, res)=>{
    try {
        const pdt = await Inv.find({_id:req.params.id})
        if (pdt.length === 0){
            res.status(402).json({
                "msg":"Record Not found"
            })
        }
        else{
            res.status(201).json({
                "msg":"Record found",
                "data":pdt
        })}
    } catch (error) {
        console.log(error)
        res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

InvRoute.get('/:storeID', async(req, res)=>{
    try {
        const inv = await Inv.find()
        if (inv.length === 0){
            return res.status(402).json({
                "msg":"No product found"
            })
        }
        return res.status(201).json(inv)
    } catch (error) {
        res.status(401).json({
            "msg":error
        })
    }
})

export default InvRoute