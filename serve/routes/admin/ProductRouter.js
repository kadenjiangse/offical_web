var express = require('express')
var ProductRouter = express.Router()
const ProductController = require('../../controllers/admin/ProductController')
const multer = require('multer')

const upload = multer( {dest: 'public/productuploads'} )

ProductRouter.post("/adminapi/product/add", upload.single('file'), ProductController.add)


//新闻列表增删改查

ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList)
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList)
ProductRouter.post("/adminapi/product/list", upload.single('file'), ProductController.updateList)

module.exports =  ProductRouter;