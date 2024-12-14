const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router
	.route("/")
	.get(portfolioController.getAllItems)
	.post(portfolioController.createItem);

router
	.route("/:id")
	.put(portfolioController.updateItem)
	.delete(portfolioController.deleteItem);

module.exports = router;
