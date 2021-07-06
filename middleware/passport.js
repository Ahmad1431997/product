const LocalStrategy = require("passport-local").Strategy;
const {User} = require("../db/models");
const bcrypt = require("bcrypt")
const JWT_SECRET = require("../config/keys")
const JWTStrategy=require("passport-jwt").Strategy
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(
    async(username,password,done)=>{
        try {
            const user = await User.findOne({
                where:{username:username}
            })
            const passwordsMatch = user ? await bcrypt.compare(password,user.password): false;

            if(passwordsMatch){
                return done(null,user)
            }else return done({status : 401 , message : "Incorrect username and password"})


        } catch (error) {
            done(error)
        }
    }
)

exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey",
},
    async(payload,done)=>{
        if(Date.now()>payload.exp){
            return done(null,false)
        }
        try {
            const user = await User.findByPk(payload.id)
            return done(null,user)
        } catch (error) {
            done(error)
        }
    }
)