const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: { type: String, required: [true, "Title is required"], unique: true },
	description: { type: String },
	author: { type: String },
	state: {
		type: String,
		enum: ["draft", "published"],
		default: "draft",
	},
	read_count: { type: Number, default: 0 },
	reading_time: { type: Number },
	tags: [{ type: String }],
	body: { type: String, required: [true, "Body is required"] },
	timestamp: { type: Date, default: Date.now },
});

//Method to increment the read count
articleSchema.methods.incrementReadCount = function () {
	this.read_count++;
	return this.save();
};
//method to check published state & read time
articleSchema.pre("save", function (next) {
	if (this.isModified("state")) {
		if (this.state === "published") {
			this.timestamp = new Date();
			//Average reading speed of 200 words per minute will be used
			const wordsPerMinute = 200;
			const words = this.body.split(" ").length;
			this.reading_time = Math.ceil(words / wordsPerMinute);
		}
	}
	next();
});

module.exports = mongoose.model("Article", articleSchema);
