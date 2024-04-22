require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const articleRouter = require("./routes/articleRoute");
const userRouter = require("./routes/userRoute");
const morgan = require("morgan");
const logger = require("./utils/logger");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorController");

//midlewares

app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(cookieParser());

//routes

app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalError);

module.exports = app;
