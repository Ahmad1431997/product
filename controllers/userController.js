const {User} = require("../db/models")
const bcrypt = require("bcrypt")

exports.signup = async (req,res,next)=> {
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound)
        req.body.password=hashedPassword;
        const newUser = await User.create(req.body);
        res.status(201).json({message : "New User Created"});
    } catch (error) {
        next(error)
    }
}