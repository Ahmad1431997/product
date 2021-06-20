const express=require("express");


const router = express.Router();
const {productsCreate , productsDelete , productsList,productUpdate} =require("../controllers/productsController");



router.post("/",productsCreate);
 
router.delete("/:productId",productsDelete)

router.get("/", productsList) 

router.put("/:productId",productUpdate)




module.exports=router;