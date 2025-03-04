import express from "express"
import session from "express-session"

const app = express()

app.use(session({
    secret: 'SIM2025',
    resave: true,
    saveUninitialized: false,
    cookie: {
        // Enable only for HTTPS
        httpOnly: true,
        // Prevent client-side access to cookies
        sameSite: 'strict'
        // Mitigate CSRF attacks
    }
}));

app.get('/set', (req, res)=>{
    req.session.user = {id:1, username:"Aniruddha"}
    res.send(`Session Set: ${req.session.user.username}`)
})
app.get('/get', (req, res)=>{
    res.send(req.session.user.id)
})
app.listen(1234)