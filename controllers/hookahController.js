const uuid = require("uuid")
const path = require("path")
const { Hookah, HookahInfo } = require("../models/models")
const ApiError = require("../error/ApiError")

class hookahController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, info} = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const hookah = await Hookah.create({ name, price, brandId, img: fileName })
            
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    HookahInfo.create({
                        title: i.title,
                        description: i.description,
                        hookahId: hookah.id
                    })
                });
            }
            return res.json(hookah)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res ) {
        let { brandId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        const offset = page * limit - limit
        let hookahs
        if (!brandId) {
            hookahs = await Hookah.findAndCountAll({limit,offset})
        }
        if (brandId) {
            hookahs = await Hookah.findAndCountAll({ where: {brandId}, limit,offset })
        }

        return res.json(hookahs)
    }
    async getOne(req, res) {
        const {id} = req.params
        const hookah = await Hookah.findOne({
            where: {id},
            include: [{model: HookahInfo, as: 'info'}]
        })
        return res.json(hookah)
    }

}

module.exports = new hookahController()