const AppError = require("../utils/appError");
const Article = require("./../models/articleModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

const createArticle = catchAsync(async (req, res, next) => {
	const article = await Article.create(req.body);
	res.status(201).json({
		status: "success",
		data: { article },
	});
});

const getAllArticles = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Article.find(), req.query)
		.filter()
		.sort()
		.limit()
		.paginate();

	const articles = await features.query;

	res.status(200).json({ status: "success", data: { articles } });
});

const getArticle = catchAsync(async (req, res, next) => {
	const article = await Article.findById(req.params.id);
	if (!article) {
		return next(new AppError("No article found with the Id", 404));
	}
	res.status(200).json({ status: "success", data: { article } });
});

const updateArticle = catchAsync(async (req, res, next) => {
	const updateArticle = { ...req.body };

	const article = await Article.findByIdAndUpdate(
		req.params.id,
		updateArticle,
		{
			new: true,
			runValidator: true,
		}
	);
	if (!article) {
		return next(new AppError("No article found with the Id", 404));
	}

	res.status(200).json({ status: "success", data: { article } });
});

const deleteArticle = catchAsync(async (req, res, next) => {
	const article = await Article.findByIdAndDelete(req.params.id);
	if (!article) {
		return next(new AppError("No article found with the Id", 404));
	}
	res.status(204).json({ status: "success", data: null });
});
////

///
/* const alaisMostImportantArticles = (req, res, next) => {
	const query = { priority: "high", completed: false };
	req.query = { ...req.query, ...query };
	req.query.limit = "10";
	req.query.priority = "high";
	req.query.sort = "dueDate";
	req.query.page = "1";
	req.query.fields = "title,actions,dueDate";
	next();
};
const getArticleStats = catchAsync(async (req, res, next) => {
	const stats = await Article.aggregate([
		{
			$match: { completed: true },
		},
		{
			$group: { _id: "$category", uncompleted: { $sum: 1 } },
		},
	]);
	res.status(200).json({ status: "success", data: { stats } });
}); */
module.exports = {
	createArticle,
	getAllArticles,
	getArticle,
	updateArticle,
	deleteArticle,
};
