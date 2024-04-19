const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middlewares/auth.midlleware");

router
	.route("/")
	.get(articleController.getAllArticles)
	.post(authMiddleware, articleController.createArticle);

router
	.route("/:id")
	.get(articleController.getArticle)
	.patch(authMiddleware, articleController.updateArticle)
	.delete(authMiddleware, articleController.deleteArticle);

module.exports = router;
