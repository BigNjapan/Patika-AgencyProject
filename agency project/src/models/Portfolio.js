const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required"],
		trim: true,
		maxLength: [100, "Title cannot be longer than 100 characters"],
	},
	description: {
		type: String,
		required: [true, "Description is required"],
		trim: true,
	},
	image: {
		type: String,
		required: [true, "Image URL is required"],
	},
	category: {
		type: String,
		required: [true, "Category is required"],
		enum: ["Web Design", "Graphic Design", "Photography", "Illustration"],
	},
	client: {
		type: String,
		required: [true, "Client name is required"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
