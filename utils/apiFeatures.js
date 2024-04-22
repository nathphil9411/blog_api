class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filter() {
		const queryObj = { ...this.queryString };
		const excludedField = ["page", "sort", "limit", "fields", "tag"];
		excludedField.forEach((el) => delete queryObj[el]);
		const isAuthenticated = this.queryString.isAuthenticated;

		if (isAuthenticated) {
			this.query = this.query.find({
				$or: [{ state: "publish" }, { state: "draft" }],
				author: this.queryString.author,
			});
			if (this.queryString.state === "draft") {
				this.query = this.query.find({
					state: "draft",
					author: this.queryString.author,
				});
			}
			if (this.queryString.state === "publish") {
				this.query = this.query.find({
					state: "publish",
					author: this.queryString.author,
				});
			}
		} else {
			this.query = this.query.find({ state: "publish" });
		}
		return this;
	}
	searchTag() {
		if (this.queryString.tag) {
			const searchByTag = this.queryString.tag;
			this.query.find({ tags: { $in: [searchByTag] } });
		}
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}
	limit() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}
	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 20;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = APIFeatures;
