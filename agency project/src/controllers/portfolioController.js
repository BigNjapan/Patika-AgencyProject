const Portfolio = require("../models/Portfolio");
const asyncHandler = require("../utils/asyncHandler");

class PortfolioController {
	// Get all portfolio items
	getAllItems = asyncHandler(async (req, res) => {
		const portfolioItems = await Portfolio.find().sort("-createdAt");
		res.status(200).json(portfolioItems);
	});

	// Create new portfolio item
	createItem = asyncHandler(async (req, res) => {
		const { title, description, image, category, client } = req.body;

		const portfolioItem = await Portfolio.create({
			title,
			description,
			image,
			category,
			client,
		});

		res.status(201).json(portfolioItem);
	});

	// Update portfolio item
	updateItem = asyncHandler(async (req, res) => {
		const { id } = req.params;
		const { title, description, image, category, client } = req.body;

		const portfolioItem = await Portfolio.findByIdAndUpdate(
			id,
			{ title, description, image, category, client },
			{ new: true, runValidators: true }
		);

		if (!portfolioItem) {
			return res.status(404).json({ message: "Portfolio item not found" });
		}

		res.status(200).json(portfolioItem);
	});

	// Delete portfolio item
	deleteItem = asyncHandler(async (req, res) => {
		const { id } = req.params;

		const portfolioItem = await Portfolio.findByIdAndDelete(id);

		if (!portfolioItem) {
			return res.status(404).json({ message: "Portfolio item not found" });
		}

		res.status(204).send();
	});
}

module.exports = new PortfolioController();
