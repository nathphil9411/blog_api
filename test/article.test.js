const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
require("dotenv").config();
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);
beforeEach(async () => {
	await mongoose.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});
afterEach(async () => {
	await mongoose.connection.close();
});

describe("POST /api/v1/articles", () => {
	test("should get all articles", async () => {
		const response = await request(app).get("/api/v1/articles");
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toEqual({ article: savedArticle });
	});
});
