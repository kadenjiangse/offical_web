var express = require('express');
var NewsRouter = express.Router()
const NewsController = require("../../controllers/admin/NewsController")
const multer = require('multer');

const upload = multer({ dest: 'public/newsuploads/' })

NewsRouter.post("/adminapi/news/add", upload.single('file'), NewsController.add)

//新闻列表增删改查
NewsRouter.get("/adminapi/news/list", NewsController.getList)
NewsRouter.get("/adminapi/news/authorlist/:username", NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single('file'), NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList)
NewsRouter.put("/adminapi/news/publish", NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delete)


module.exports = NewsRouter;