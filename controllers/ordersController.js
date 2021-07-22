const{ Order} = require("../db/models")
const {Cart} = require("../db/models")

exports.checkout = async (req,res,next)=>{
    try {
       const newOrder = await Order.create({customerId:req.user.id}) 
       const cart= req.body.map(item=>({...item,orderId:newOrder.id}))
       await Cart.bulkCreate(cart);
        const finalOrder={
            
            ...newOrder.toJSON,
            products:req.body,
            orderId:newOrder.id,
        }

   

    console.log(finalOrder)
       res.status(201).json(finalOrder)
    } catch (error) {
        next(error)
    }
    // res.json("I'm in checkout")
}