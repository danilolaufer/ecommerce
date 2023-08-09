const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const userModel = require("../models/user.model")
const {createHash, isValidPassword} =  require("../utils/bcrypts")


const initializePassport = () =>{
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"},
        async (req, username, password, done)=>{
            try{
                let userData = req.body
                let user = await userModel.findOne({email:username})
                if (user) {
                    console.log("User preparado");
                    done(null, false)
                }
                let userNew =  {
                    name: userData.name,
                    email: userData.email,
                    lastname: userData.lastname,
                    password: createHash(userData.password),
                    tel: userData.tel
                }
                let result = await userModel.create(userNew)
                return done(null, result )
            }catch(err){
                return done("errror al crear usuario" + err)
            }
        } ,
        
        
        passport.serializeUser((user, done)=>{
        done(null, user._id)
        }),

        passport.deserializeUser(async(id, done) =>{
        let user = await userModel.findById(id)
        done(null, user)
        }),  
    
    ))

}
module.exports = initializePassport

