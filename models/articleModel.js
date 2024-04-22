const mongoose = require("mongoose");
const User = require("./userModel");

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			unique: true,
		},
		description: { type: String },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		state: {
			type: String,
			enum: ["draft", "publish"],
			default: "draft",
		},
		read_count: { type: Number, default: 0 },
		reading_time: { type: Number },
		tags: [{ type: String }],
		body: { type: String, required: [true, "Body is required"] },
	},
	{ timestamps: true }
);

//Method to increment the read count
articleSchema.methods.incrementReadCount = function () {
	this.read_count++;
	return this.save();
};
//method to check published state & read time
articleSchema.pre("save", function (next) {
	if (this.isModified("state")) {
		if (this.state === "publish") {
			//Average reading speed of 200 words per minute will be used
			const wordsPerMinute = 200;
			const words = this.body.split(" ").length;
			this.reading_time = Math.ceil(words / wordsPerMinute);
		}
	}
	next();
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
