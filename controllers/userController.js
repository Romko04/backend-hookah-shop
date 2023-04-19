const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User, Basket } = require('../models/models')
const { json } = require('sequelize')

const generateToken = (id, email, role) => {
    return jwt.sign(
        { id: id, email, role },
        process.env.DB_KEY,
        { expiresIn: '24h' })
}

class userController {
    async redistration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоректний пароль або email'))
        }
        const candidate = await User.findOne({where: {email} })
        if (candidate) {
            return next(ApiError.badRequest('Користувач під таким email вже існує'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateToken(user.id, email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Користувач не знайдений'))
        }
        let comparedPassword = bcrypt.compareSync(password, user.password)
        if (!comparedPassword) {
            return next(ApiError.badRequest('Неправильний пароль'))
        }
        const token =  generateToken(user.id, email, user.role)
        return res.json({ token })

    }

    async check(req, res, next) {
        const token = generateToken(req.user.id,req.user.email,req.user.role)
        res.json({token})
    }
}

module.exports = new userController()