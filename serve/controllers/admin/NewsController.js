const NewsService = require("../../services/admin/NewsService")

const NewsController = {
    add: async (req, res) => {
        //console.log(req.file, req.body)
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const { title, content, category, isPublish, author} = req.body
        await NewsService.add({ title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date(), author })
        res.send({
            ActionType: "ok"
        })
    },
    getList: async (req, res) => {
        //console.log(req.params)
        const result = await NewsService.getList(req.params)
        //console.log(result)
        res.send({
            ActionType: "ok",
            data: result
        })
    },
    publish: async (req, res) => {
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType: "ok",
        })
    },
    delete: async(req,res)=>{
        await NewsService.delete({_id:req.params.id})
        res.send({
            ActionType: "ok"
        })
    },
    updateList: async (req, res)=>{
        const {title, content, category, isPublish, _id} = req.body
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        await NewsService.updateList({_id, title, content, category: Number(category), cover, isPublish: Number(isPublish), editTime: new Date()})
        res.send({
            ActionType: "ok",
            data: 1
        })
    }
}

module.exports = NewsController