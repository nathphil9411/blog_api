const AppError = require("../utils/appError");
const Article = require("./../models/articleModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

//Create a new article
const createArticle = catchAsync(async (req, res, next) => {
	const authorId = req.user._id;
	const article = await Article.create({ ...req.body, author: authorId });
	article.populate("author");
	res.status(201).json({
		status: "success",
		data: { article },
	});
});

//Get all article
const getAllArticles = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Article.find(), req.query)
		.filter()
		.searchTag()
		.sort()
		.limit()
		.paginate();

	const articles = await features.query.populate(
		"author",
		"first_name last_name"
	);

	res.status(200).json({
		status: "success",
		totalBlog: articles.length,
		data: { articles },
	});
});

//get a single article
const getArticle = catchAsync(async (req, res, next) => {
	const article = await Article.findById(req.params.id).populate(
		"author",
		"first_name last_name"
	);

	if (!article) {
		return next(new AppError("No article found with the Id", 404));
	}
	await article.incrementReadCount();
	res.status(200).json({ status: "success", data: { article } });
});

//Update /edit an article
const updateArticle = catchAsync(async (req, res, next) => {
	const updateArticle = { ...req.body };
	const article = await Article.findById(req.params.id);
	if (!article) {
		return next(new AppError("No article found with the provided ID", 404));
	}
	if (article.author.toString() !== req.user._id.toString()) {
		return next(
			new AppError("You are not authorized to update this article", 403)
		);
	}
	Object.assign(article, updateArticle);
	const savedArticle = await article.save();
	res
		.status(200)
		.json({ status: "success", data: { updatedarticle: savedArticle } });
});

//delete an article
const deleteArticle = catchAsync(async (req, res, next) => {
	const article = await Article.findByIdAndDelete(req.params.id);
	if (!article) {
		return next(new AppError("No article found with the Id", 404));
	}
	if (article.author.toString() !== req.user._id.toString()) {
		return next(
			new AppError("You are not authorized to delete this article", 403)
		);
	}
	res.status(204).json({ status: "success", data: null });
});

//Alais route controller to publish an article
const publishArticle = catchAsync(async (req, res, next) => {
	const publishedArticleData = { ...req.body, state: "publish" };
	const article = await Article.findById(req.params.id);
	if (!article) {
		return next(new AppError("No article found with the provided ID", 404));
	}
	if (article.author.toString() !== req.user._id.toString()) {
		return next(
			new AppError("You are not authorized to publish this article", 403)
		);
	}
	Object.assign(article, publishedArticleData);
	const savedArticle = await article.save();
	res.status(200).json({ status: "success", data: { article: savedArticle } });
});

// Alais route cotroller for owners of articles to get all their articles
const getMyArticles = catchAsync(async (req, res, next) => {
	const authorId = req.user._id.toString();
	if (req.query.state === "draft") {
		req.query = { author: authorId, state: "draft", isAuthenticated: true };
		return next();
	}
	if (req.query.state === "publish") {
		req.query = {
			author: authorId,
			state: "publish",
			isAuthenticated: true,
		};
		return next();
	}

	req.query = { author: authorId, isAuthenticated: true };
	next();
});

module.exports = {
	createArticle,
	getAllArticles,
	getArticle,
	updateArticle,
	deleteArticle,
	publishArticle,
	getMyArticles,
};
