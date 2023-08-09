const express = require("express")
const {Router} = express

const router = new Router()

function auth(req, res, next){
    let userlogin = req.body
}

router.get("/login-view" , (req, res)=>{
    res.render("login", {})
})

router.get("/register-view" , (req, res)=>{
    res.render("register", {})
})

router.get("/perfil-view" , (req, res)=>{
    res.render("perfil", { })
})


module.exports = router

