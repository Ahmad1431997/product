const express=require("express");

const { default: slugify } = require("slugify");
const router = express.Router();
const {productsCreate , productsDelete , productsList} =require("../controllers/productsController");



router.post("/",productsCreate);
 
router.delete("/:productId",productsDelete)

router.get("/", productsList) 





module.exports=router;