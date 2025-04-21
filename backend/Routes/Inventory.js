// import express from "express"
// import { Inv } from "../schema.js"

// const InvRoute = express.Router()

// InvRoute.post('/NewAdmin', async(req, res)=>{
//     if (!(req.body.Name || req.body.MRP || req.body.Quantity || req.body.sID || req.body.RP || req.body.Category || 
//         req.body.uB || req.body.uS || req.body.season || req.body.p )){
//             return res.status(400).json({
//                 "msg":"Missing Fields"
//             })
//         }
//         const newProduct = {
//             productName:req.body.Name,
//             MRP:req.body.MRP,
//             Quantity:req.body.Quantity,
//             storeID:req.body.sID,
//             RetailPrice: req.body.RP,
//             Category:req.body.Category,
//             unitsBought: req.body.uB,
//             unitsSold: req.body.uS,
//             Seasonality: req.body.season,
//             Promotion: req.body.p
//         }

//         try {
//             const allEntry = await Inv.find({})
//             var lastId = 1
//             if (allEntry.lenght !=0) lastId = allEntry.at(-1)._id + 1
//             newProduct._id = lastId
//             const newEntry = new Inv(newProduct)
//             newEntry.save()
//             return res.status(200).json({
//                 "msg":"Added new Product"
//             })
//         } catch (error) {
//             return res.status(401).json({
//                 "msg":"error in saving data"
//             })
//         }
// })

// InvRoute.get('/NameSearch/:name', async(req, res)=>{
//     try {
//         const pdt = await Inv.find({productName:req.params.name})
//         if (pdt.length === 0){
//             return res.status(402).json({
//                 "msg":"Record Not found"
//             })
//         }
//         else{
//             return res.status(201).json({
//                 "msg":"Record found",
//                 "data":pdt
//         })}
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({
//             "msg":"Error in fetching data"
//         })
//     }
// })

// InvRoute.post('/IncreaseQuantity', async(req, res)=>{
//     const id = req.body.id
//     const quan = req.body.quan
//     if (id && quan){
//         try {
//             const chkPdt = await Inv.find({_id:id})
//             if (chkPdt.length === 1){
//                 chkPdt[0].Quantity += quan
//             }
//             else{
//                 return res.status(403).json({
//                     "msg":"Multiple Entries have been found",
//                     "data":chkPdt
//                 })
//             }
//         } catch (error) {
//             console.error(error)
//             return res.status(401).json({
//                 "msg":"Error in retrieving product"
//             })
//         }
//     }
// })

// InvRoute.get('/IdSeach/:id', async(req, res)=>{
//     try {
//         const pdt = await Inv.find({_id:req.params.id})
//         if (pdt.length === 0){
//             res.status(402).json({
//                 "msg":"Record Not found"
//             })
//         }
//         else{
//             res.status(201).json({
//                 "msg":"Record found",
//                 "data":pdt
//         })}
//     } catch (error) {
//         console.log(error)
//         res.status(401).json({
//             "msg":"Error in fetching data"
//         })
//     }
// })

// InvRoute.get('/:storeID', async(req, res)=>{
//     try {
//         const inv = await Inv.find()
//         if (inv.length === 0){
//             return res.status(402).json({
//                 "msg":"No product found"
//             })
//         }
//         return res.status(201).json(inv)
//     } catch (error) {
//         res.status(401).json({
//             "msg":error
//         })
//     }
// })

// export default InvRoute

import express from "express";
import { Inv } from "../schema.js";

const InvRoute = express.Router();

// Add a New Product
InvRoute.post('/NewAdmin', async (req, res) => {
    if (!(req.body.Name || req.body.MRP || req.body.Quantity || req.body.sID || req.body.RP || req.body.Category ||
        req.body.uB || req.body.uS || req.body.season || req.body.p)) {
        return res.status(400).json({ "msg": "Missing Fields" });
    }

    const newProduct = {
        productName: req.body.Name,
        MRP: req.body.MRP,
        Quantity: req.body.Quantity,
        storeID: req.body.sID,
        RetailPrice: req.body.RP,
        Category: req.body.Category,
        unitsBought: req.body.uB,
        unitsSold: req.body.uS,
        Seasonality: req.body.season,
        Promotion: req.body.p
    };

    try {
        const allEntry = await Inv.find({});
        var lastId = 1;
        if (allEntry.length !== 0) lastId = allEntry.at(-1)._id + 1;
        newProduct._id = lastId;
        const newEntry = new Inv(newProduct);
        await newEntry.save();
        return res.status(200).json({ "msg": "Added new Product" });
    } catch (error) {
        return res.status(401).json({ "msg": "Error in saving data" });
    }
});

// Search Product by Name
InvRoute.get('/NameSearch/:name', async (req, res) => {
    try {
        const pdt = await Inv.find({ productName: req.params.name });
        if (pdt.length === 0) {
            return res.status(402).json({ "msg": "Record Not found" });
        } else {
            return res.status(201).json({ "msg": "Record found", "data": pdt });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ "msg": "Error in fetching data" });
    }
});

// Increase Quantity of Product
InvRoute.post('/IncreaseQuantity', async (req, res) => {
    const id = req.body.id;
    const quan = req.body.quan;
    
    if (id && quan) {
        try {
            const chkPdt = await Inv.findOne({ _id: id });
            if (chkPdt) {
                chkPdt.Quantity += quan;
                await chkPdt.save();
                return res.status(200).json({ "msg": "Quantity Updated", "data": chkPdt });
            } else {
                return res.status(403).json({ "msg": "Product Not Found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ "msg": "Error in retrieving product" });
        }
    } else {
        return res.status(400).json({ "msg": "Missing ID or Quantity" });
    }
});

// Get Product by ID
InvRoute.get('/IdSearch/:id', async (req, res) => {
    try {
        const pdt = await Inv.find({ _id: req.params.id });
        if (pdt.length === 0) {
            res.status(402).json({ "msg": "Record Not found" });
        } else {
            res.status(201).json({ "msg": "Record found", "data": pdt });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ "msg": "Error in fetching data" });
    }
});

// Get Inventory for a Store
InvRoute.get('/', async (req, res) => {
    try {
        // console.log('here')
        const inv = await Inv.find();
        if (inv.length === 0) {
            return res.status(402).json({ "msg": "No product found" });
        }
        return res.status(201).json(inv);
    } catch (error) {
        res.status(401).json({ "msg": error });
    }
});

// **NEW: Update an Existing Product**
InvRoute.put('/update/:id', async (req, res) => {
    try {
        // console.log(req)
        const updatedProduct = await Inv.findByIdAndUpdate(
            req.params.id,
            {
                productName: req.body.Name,
                MRP: req.body.MRP,
                Quantity: req.body.Quantity,
                storeID: req.body.sID,
                RetailPrice: req.body.RP,
                Category: req.body.Category,
                unitsBought: req.body.uB,
                unitsSold: req.body.uS,
                Seasonality: req.body.season,
                promotion: req.body.p
            },
            { new: true } // Return updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ "msg": "Product Not Found" });
        }

        return res.status(200).json({ "msg": "Product Updated Successfully", "data": updatedProduct });
    } catch (error) {
        return res.status(500).json({ "msg": "Error Updating Product", "error": error.message });
    }
});

export default InvRoute;
