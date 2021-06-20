let {Product} = require("../db/models");

exports.productsCreate = async (req, res) => {
    try {
        const newProduct =await Product.create(req.body);
        res.status(201).json(newProduct)

    } catch (error) {
        res.status(500).json({message: error.message??"server error"})
    }  
};

exports.productsDelete =async (req, res) => {
    try {
        const foundProduct= await Product.findByPk(req.params.productId);
        if(foundProduct){
           await foundProduct.destroy();
            res.status(204).end();
        }else { 
            res.status(404).json({message : "product is not found"})
        }
    } catch (error) {
        res.status(500).json({message: error.message??"server error"})
    }
 
};

exports.productsList = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes : {exclude: ["createdAt","updatedAt"]}
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message?? "server error"})
    }

};

exports.productUpdate = async (req,res)=>{
    try {
        const foundProduct= await Product.findByPk(req.params.productId);
    if(foundProduct){
        await foundProduct.update(req.body)
        res.status(204).end();
    }else{
        res.status(404).json({message : "product is not found"})
    }
    } catch (error) {
        res.status(500).json({message: error.message??"server error"})
    }
    
}