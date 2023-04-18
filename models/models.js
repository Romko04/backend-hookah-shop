const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const User = sequelize.define('user', {
    id: {type:DataTypes.INTEGER,primaryKey: true,autoIncrement:true},
    email: {type:DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "USER"}
})
const Basket = sequelize.define('basket',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})
const BasketHookah = sequelize.define('basketHookah',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
})
const Hookah = sequelize.define('hookah',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
    price:{type:DataTypes.INTEGER, allowNull:false},
    rating:{type:DataTypes.INTEGER, defaultValue:0},
    img:{type:DataTypes.STRING, allowNull:false}    
})
const Brand = sequelize.define('brand',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})
const Rating = sequelize.define('rating',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    rate:{type:DataTypes.STRING, allowNull:false},
})
const HookahInfo = sequelize.define('hookahInfo',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketHookah)
BasketHookah.belongsTo(Basket)

Hookah.hasMany(HookahInfo)
HookahInfo.belongsTo(Hookah)

Hookah.hasMany(BasketHookah)
BasketHookah.belongsTo(Hookah)

Hookah.hasMany(HookahInfo,{as:'info'})
HookahInfo.belongsTo(Hookah)

Brand.hasMany(Hookah)
Hookah.belongsTo(Brand)

module.exports = {
    User,
    Basket,
    BasketHookah,
    Rating,
    Hookah,
    HookahInfo,
    Brand, 

}
