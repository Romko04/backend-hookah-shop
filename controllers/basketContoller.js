const { Hookah, BasketHookah, Basket } = require('../models/models')
const jwt = require("jsonwebtoken")
class basketController {
    async create(req, res) {
        const { id } = req.params
        const token = await req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.DB_KEY)
        const basket = await Basket.findOne({ where: { userId: decode.id } })
        const hookah = await Hookah.findOne({ where: { id }, })
        let basketHookah
        const existingBasketHookah = await BasketHookah.findOne({ where: { basketId: basket.id, hookahId: hookah.id } });
        if (existingBasketHookah) {
            // Якщо товар уже є в кошику, збільшуємо кількість
            existingBasketHookah.count += 1;
            basketHookah = await existingBasketHookah.save();
        } else {
            // Якщо товару ще немає в кошику, створюємо новий запис
            basketHookah = await BasketHookah.create({ basketId: basket.id, hookahId: hookah.id })
        }
        return res.json(basketHookah)
    }

    async getAll(req, res) {
        const token = await req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.DB_KEY)
        const basket = await Basket.findOne({ where: { userId: decode.id } })
        const basketHookahs = await BasketHookah.findAll({
             where: { basketId: basket.id },
             include: {
                model: Hookah,
                attributes: ['id', 'name', 'price', 'img']
            }
            })
        return res.json(basketHookahs)
    }

}

module.exports = new basketController()