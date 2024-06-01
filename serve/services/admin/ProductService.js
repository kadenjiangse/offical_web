const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, cover, detail, editTime }) => {
        return ProductModel.create({
            title, introduction, cover, detail:detail, editTime
        })
    },
    getList: async ({_id}) => {
        return _id ? ProductModel.find({_id}) : ProductModel.find({})
    },
    delList: async ({ id }) => {
        return ProductModel.deleteOne({ _id: id })
    },
    updateList: async ({_id, title, introduction, detail, cover, editTime})=>{
        if(cover){
            return ProductModel.updateOne({
                _id
            },{ title, introduction, detail, cover, editTime})
        }else{
            return ProductModel.updateOne({
                _id
            },{title, introduction, detail, editTime})
        }
    }

}

module.exports = ProductService