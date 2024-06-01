const ProductService = require("../../services/admin/ProductService")

const ProductController = {
    add: async(req, res) => {
        //console.log(req.body, req.file)
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { title, introduction, detail} = req.body
        await ProductService.add({title, introduction, detail, cover, editTime: new Date()})
        res.send({
            ActionType: 'ok'
        })
    },
    getList: async (req, res)=>{
        const result = await ProductService.getList({_id:req.params.id})

        res.send({
            ActionType: "ok",
            data: result
        })
    },
    delList: async (req, res)=>{
        await ProductService.delList(req.params)
        res.send({
            ActionType: "ok"
        })
    },
    updateList: async(req,res)=>{
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const {title, introduction, detail, _id} = req.body
        await ProductService.updateList({title, introduction, detail, _id, editTime: new Date(), cover})
        res.send({
            ActionType: "ok"
        })
    }
}

module.exports = ProductController