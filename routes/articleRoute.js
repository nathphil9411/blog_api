const express = require("express");
const router = express.Router();
const articleController = require("../controller/authController");

router.route("/").get(articleController.getAllArticles).post(articleController.createArticle)

router.route("/:id").get(articleController.getArticleById).patch(articleController.updateArticleById).delete(articleController.updateArticleById)

module.exports = router;
