const express = require("express");
const productsRouters=require("./routes/productsRouters")
const db = require("./db/models")


const app = express();
app.use(express.json());
app.use("/products",productsRouters)


// db.sequelize.sync();
db.sequelize.sync()

app.listen(8080);
