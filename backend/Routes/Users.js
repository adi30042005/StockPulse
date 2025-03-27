import express from 'express'
import { User, Log } from '../schema.js'
import Cookies from 'js-cookie'

const userRouter = express.Router()

userRouter.get('/', async(req, res)=>{
    try {
        const allUsers = await User.find()
        if (allUsers.length === 0){
            return res.status(402).json({
                "msg":"No users found"
            })
        }
        return res.status(201).json(allUsers)
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"error in fetching data"
        })
    }
})

userRouter.post('/Register', async(req, res)=>{
    if (!(req.body.Name || req.body.userName || req.body.passwd || req.body.Role)){
        return res.status(400).json({
            "msg":"Missing fields"
        })
    }
    try {
        const lastUser = await User.find()
        var lastId
        if (lastUser.length != 0){
            lastId = lastUser.at(-1)._id
        }
        else{
            lastId = 1
        }
        const newUser = {
            _id:lastId + 1,
            Name:req.body.Name,
            userName:req.body.userName,
            passwd:req.body.passwd,
            Role:req.body.Role
        }
        if (req.body.StoreAccess){
            newUser["StoreAccess"] = req.body.StoreAccess
        }
        const newU = new User(newUser)
        newU.save()
        return res.status(200).json({
            "msg":"New User added",
            id:_id
        })
        
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error in fetching and adding data"
        })
    }
})
userRouter.get('/changePasswd/:passwd', async(req,res)=>{
    const user = Cookies.get('username');
    const passwd = req.params.passwd
    try {
        const users = await User.find({userName:user})
        if (user.length === 0){
            return res.status(402).json({
                "msg":"no user found"
            })
        }
        else if (user.length >= 1){
            return res.status(403).json({
                "msg":"Multiple Entries found"
            });
        }
        else{
            users[0].passwd = passwd;
            return res.status(204).json({
                "msg":"Password Updated Successfully"
            })
        }
    } catch (error) {
        return res.json(error).status(401)
    }
})

userRouter.get('/userName/:name', async(req, res)=>{
    try {
        const user = await User.find({userName:req.params.name})
        if (user.length === 1){
            return res.status(201).json(user[0])
        }
        else if (length(user) === 0){
            return res.status(402).json({"msg":"No user found"})
        }
        
        return res.status(403).json({'msg':"Multiple users found", data:user})

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            "msg":"Error in fetching data"
        })
    }
})
userRouter.post('/Login',async(req, res)=>{
    try {
        console.log(req.body)
        if ((req.body.uName==null || req.body.Passwd==null)){
            return res.status(400).json({
                "msg":"Mising Fields"
            })
        }
        const uname = req.body.uName
        const passwd = req.body.Passwd
        const user = User.find({userName:uname,passwd:passwd })
        if (user.length === 0){
            return res.status(405).json({
                "msg":"Login Failed"
            })
        }
        const lastUser = await Log.find()
        var lastId
        if (lastUser.length != 0){
            lastId = lastUser.at(-1)._id
        }
        else{
            lastId = 1
        }
        const log = {
            _id:lastId + 1,
            userName:uname,
            lastLogon:Date.now(),
            status:true
        }
        try {
        const newLog = new Log(log)
        newLog.save()   
        } catch (error) {
            console.log(error)   
        }
        Cookies.set('username',uname )
        return res.status(202).json({
            "msg":"Login Success",
            id:uname
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            "msg":"Error in fetchin data",
            "err":error
        })
    }
        
})
userRouter.get('/Logout', async(req, res)=>{
    if (!req.body.uname){
        return res.status(400).json({
            "msg":"Error mising field: uname"
        })
    }
    const uname = req.body.uname
    if (uname in req.cookies){
        Cookies.remove('username')
        return res.status(203).json({
            "msg":"Logged Out Successfully"
        })
    }
    const user = await Log.find({userName:uname})
    if (user.length != 0){
        user.status = false
        user.save()
    }
    return res.status(406).json({
        "msg":"Not Logged in"
    })
    
})
export default userRouter