const ApiError = require('../error/ApiError')
class userController{
    async redistration(req, res){

    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query
        if (!id) {
           return next(ApiError.badRequest('Не заданий ID'))
        }
        res.json(id)
    }
}

module.exports = new userController()