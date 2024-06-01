const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add: async ({ title, content, category, cover, isPublish, editTime, author }) => {
        //console.log("数据库处理")
        return NewsModel.create({
            title, content, category, cover, isPublish, editTime, author
        })
    },
    getList: async ({ id, username }) => {
        return id ? NewsModel.find({ _id: id }) : NewsModel.find({author:username})
    },
    publish: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne({
            _id
        }, {
            _id, isPublish, editTime
        })
    },
    delete: async ({ _id }) => {
        return NewsModel.deleteOne({ _id })
    },
    updateList: async ({ _id, content, category, isPublish, editTime, cover, title }) => {
        //console.log(_id)
        if (cover) {
            return NewsModel.updateOne({
                _id
            }, { content, category, isPublish, editTime, cover, title })

        } else {
            return NewsModel.updateOne({
                _id
            }, { content, category, isPublish, editTime, title })
        }

    }
}

module.exports = NewsService