import mongoose from "mongoose";

const storeSchema = mongoose.Schema({
    _id:{
        type:Number, 
        required:true
    },
    StoreName:{
        type:Number,
        required:true
    },
    StoreAddress:Number,
    TotalSales:Number,
    TotalExp :Number,
    toGive:Number,
    toGet:Number,
    OwnerId:Number,
    UserId:{
        type:Array,
        default:false
    }
})

//Purchase Invoice schema
const purchaseSchema = mongoose.Schema({
    _id:{
        type:Number, 
        required:true
    }, 
    date:Date,
    productId: Number,
    storeID: Number,
    Quantity: Number,
    Paid:{
        type:Boolean,
        default:true
    }
})

//Sales invoice schema
const salesSchema = mongoose.Schema({
    // Sales invoice id
    _id:{
        type:Number, 
        required:true
    },
    Date:Date,
    StoreId:{
        type:Number,
        required:true
    },
    productID:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        default:1
    },
    totalCost:Number,
    Collected:{
        type:Boolean,
        default:true
    },
    Discount:{
        type:Number,
        default:0
    }
})

//Users
const userSchema = mongoose.Schema({
    _id:{
        type:Number, 
        required: true
    },
    Name:String,
    userName:String,
    passwd:String,
    Role:String,
    StoreAccess:{
        type:Array,
        default:"All"
    }
})

// Product Detail schema
const inventorySchema=mongoose.Schema({
    _id:{
        type:Number, 
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    MRP:Number,
    Quantity:{
        type:Number
    },
    storeID:{
        type:String, 
        required:true
    },
    RetailPrice:{
        type:Number,
        required:true
    },
    Category:String,
    unitsBought:Number,
    unitsSold:Number,
    seasonality:String,
    Promotion:String
})

//Log
const logSchema = mongoose.Schema({
    _id:{
        type:Number, 
        required:true
    },
    userName:String,
    lastLogon:Date,
    status:{
        type:Boolean,
        default:true
    }
})
export const Store =  mongoose.model('Store',storeSchema, "Store")
export const Purchase =  mongoose.model('Purchase',purchaseSchema, "Purchase")
export const Sales =  mongoose.model('Sales',salesSchema, "Sales")
export const Inv =  mongoose.model('Inventory',inventorySchema, "Inventory")
export const User = mongoose.model('User', userSchema, 'User')
export const Log = mongoose.model('Log', logSchema, 'Log')