import express from "express"
import { Store } from "../schema.js"

const storeRouter = express.Router()

storeRouter.get('/', async(req, res)=>{
    try {
        const store = await Store.find({})  
        if (store.length === 0){
            return res.status(402).json({
                "msg":"no Store found"
            })
        }
        return res.status(200).json(store)
    } catch (error) {
        console.log(error)
        res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

storeRouter.post('/AddStore', (req, res)=>{
    if (!(req.body.storeId || req.body.storeName || req.body.storeAddress || req.body.OwnerId)){
        return res.status(400).json({
            "msg":"Missing Fields"
        })
    }
    const newStore = {
        _id:req.body.storeId,
        StoreName:req.body.storeName,
        StoreAddress:req.body.storeAddress,
        TotalSales:0,
        TotalExp:0,
        toGive:0,
        toGet:0,
        OwnerId:req.body.OwnerId,
        UserId: (req.body.UserId) ? req.body.UserId : false
    }
    try {
        const newS = new Store(newStore)
        newS.save()
        console.log(newS)
        return res.status(200).json({
            "msg":"New store Added"
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})

storeRouter.get('/:id', async(req, res)=>{
    try {
        const store = await Store.find({_id:req.params.id})
        if (store.length != 0){
            return res.status(200).json(store[0])
        }
        else if (store.length > 1){
            return res.status(403).json({
                "msg":"Multiple data found"
            })
        }
        return res.status(402).json({"msg":"no store found"})
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error in fetching store"
        })
    }
})
storeRouter.get('/NameSearch/:name', async(req, res)=>{
    try {
        const store = await Store.find({StoreName:req.params.name})
        if (store.length != 0){
            return res.status(200).json(store[0])
        }
        else if (store.length > 1){
            return res.status(403).json({
                "msg":"Multiple data found"
            })
        }
        return res.status(402).json({"msg":"no store found"})
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error in fetching store"
        })
    }
})

export default storeRouter