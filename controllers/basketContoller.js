const ApiError = require('../error/ApiError')
const { Hookah, BasketHookah, Basket } = require('../models/models')
const jwt = require("jsonwebtoken")
const incrementBasketHookah = async (existingBasketHookah) => {
    existingBasketHookah.count += 1;
    return await existingBasketHookah.save();
}

const getBasket = async (req) =>{
    const token = await req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.DB_KEY)
    const basket = await Basket.findOne({ where: { userId: decode.id } })
    return basket
}

const decrementBasketHookah = async (existingBasketHookah, res) => {
    if (existingBasketHookah.count > 1) {
        existingBasketHookah.count -= 1;
    } else {
        await existingBasketHookah.destroy()
        return res.json({message: "Товар видалений з кошика"})
    }
    return await existingBasketHookah.save();
}
class basketController {
    async create(req, res, next) {
        try {
            const { id } = req.params
            const basket = await getBasket(req)
            const hookah = await Hookah.findOne({ where: { id }, })
            let basketHookah
            const existingBasketHookah = await BasketHookah.findOne({ where: { basketId: basket.id, hookahId: hookah.id } });
            if (existingBasketHookah) {
                basketHookah = await incrementBasketHookah(existingBasketHookah)
            } else {
                basketHookah = await BasketHookah.create({ basketId: basket.id, hookahId: hookah.id })
            }
            return res.json(basketHookah)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const basket = await getBasket(req)
        const basketHookahs = await BasketHookah.findAll({
            where: { basketId: basket.id },
            include: {
                model: Hookah,
                attributes: ['id', 'name', 'price', 'img']
            }
        })
        return res.json(basketHookahs)
    }
    async deleteOne(req, res) {
        try {
            const { id } = req.params
            const basket = await getBasket(req)
            const hookah = await Hookah.findOne({ where: { id }, })
            let basketHookah
            const existingBasketHookah = await BasketHookah.destroy({ where: { basketId: basket.id, hookahId: hookah.id } });
            return res.json({ message: "Товар видалено" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async deleteAll(req, res) {
        try {
            const basket = await getBasket(req)
            const existingBasketHookah = await BasketHookah.destroy({ where: { basketId: basket.id } });
            return res.json({ message: "Товари видалено" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async incrementHookah(req, res, next) {
        try {
            const { id } = req.params
            const basket = await getBasket(req)
            const hookah = await Hookah.findOne({ where: { id }, })
            let basketHookah
            const existingBasketHookah = await BasketHookah.findOne({ where: { basketId: basket.id, hookahId: hookah.id } });
            if (existingBasketHookah) {
                basketHookah = await incrementBasketHookah(existingBasketHookah)
            }
            return res.json(basketHookah)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async decrementHookah(req, res, next) {
        try {
            const { id } = req.params
            const basket = await getBasket(req)
            const hookah = await Hookah.findOne({ where: { id }, })
            let basketHookah
            const existingBasketHookah = await BasketHookah.findOne({ where: { basketId: basket.id, hookahId: hookah.id } });
            if (existingBasketHookah) {
                basketHookah = await decrementBasketHookah(existingBasketHookah,res)
            } 
            return res.json(basketHookah)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new basketController()