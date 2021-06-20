
module.exports = (sequelize, DataTypes) => sequelize.define("Product",{

    name: {type:DataTypes.STRING , allowNull:false},
    
    price:{type:DataTypes.INTEGER ,defaultValue:5, validate : {min : 5 }},
    image : {type:DataTypes.STRING, validate: {isUrl: true} , allowNull:false},
    description: {type:DataTypes.STRING},
    })

    