import express from 'express'
import { Vendor } from '../schema.js'

const vendorRouter = express.Router()

vendorRouter.post('/newVendor', async(req, res)=>{
    if (!(req.body.venId || req.body.name || req.body.Location)){
        return res.status(400).json({
            "msg":"Missing Fields"
        })
    }
    const newVendor = {
        _id:req.body.venId,
        name:req.body.name,
        Location:req.body.Location
    }
    const newVen = new Vendor(newVendor)
    try {
        const ven = await Vendor.find({name:req.body.name})
        if (ven.length === 0){
            newVen.save()
            return res.status(200).json({
                "msg":"New Vendor added"
            })
        }
        return res.status(407).json({
            "msg":"Vendor entry already exist"
        })
    } catch (error) {
        return res.status(401).json({
            "msg":"Error in fetching data",
            "err":error
        })
    }
})

vendorRouter.get('/name/:name', async(req, res)=>{
    if (!req.params.name) return res.status(400).json({"msg":"Missing fields"})
    try{
        const ven = await Vendor.find({name:req.params.name})
        if (ven.length === 0){
            return res.status(402).json({"msg":'No vendor Found'})
        }
        return res.status(201).json({"msg":"Vendor found", detail:ven})
    }
    catch(error){
        return res.status(401).json({
            "msg":"Error in fetching data",
            "err":error
        })
    }
})

export default vendorRouter