let products = require("../data");
const { default: slugify } = require("slugify");


exports.productsCreate=(req,res)=>{
    req.body.id = products[products.length-1].id+1
    req.body.slug= slugify(req.body.name.toLowerCase(),"-")
    const newProduct ={
        name:req.body.name,
        id:req.body.id,
        slug: req.body.slug,
    }
     products.push(newProduct);
     res.status(201).json(newProduct);
 }

 exports.productsDelete =(req,res)=>{
    const foundProduct=products.find((product)=>product.id=== +req.params.productId);
    if (foundProduct){
        products= products.filter((product)=>product.id !== +req.params.productId)
        res.status(204).end();
    }else {
        res.status(404).json({"message":`the product with id ${req.params.productId} doesn't exist `})
    }
 }

 exports.productsList=(req, res) => {
    res.json(products);
  }