import express from 'express'
import { Aggregate } from '../schema.js'

const AggRoute = express.Router()

AggRoute.get('/', async(req, res)=>{
    try {
        const agg = await Aggregate.find({})
        if (length(agg) === 0) return res.status(402).json({"msg":"No data found"})
        else return res.status(201).json({"data":agg})
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            "msg":"Error in fetching data",
            error
        })
        
    }
})

// AggRoute.post('/AddData', (req, res)=>{
//     if ()
// })

export default AggRoute