const {User} = require("../db/models")
const bcrypt = require("bcrypt")
const {JWT_SECRET,JWT_EXPIRATION_MS} = require("../config/keys")
const jwt = require("jsonwebtoken")

exports.signup = async (req,res,next)=> {
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound)
        req.body.password=hashedPassword;
        const newUser = await User.create(req.body);
        const token = generateToken(newUser);
        res.status(201).json({token});
    } catch (error) {
        next(error)
    }
}

exports.signin = (req,res,next)=>{
    const token = generateToken(req.user);
    res.json({token});
}

const generateToken = (user)=>{
    const payload = {
        id: user.id,
        username:user.username,
        exp: Date.now()+ JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(payload,JWT_SECRET);
    return token
}