const express = require("express");
const productsRouters=require("./routes/productsRouters")

const app = express();
app.use(express.json());
app.use("/products",productsRouters)




app.listen(8080);
