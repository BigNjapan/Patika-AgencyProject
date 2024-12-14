const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let portfolioItems = []; // This should be replaced with a database in production

// Create a new portfolio item
app.post("/api/portfolio", (req, res) => {
	const { title, description, image } = req.body;
	const newItem = {
		id: portfolioItems.length + 1,
		title,
		description,
		image,
	};
	portfolioItems.push(newItem);
	res.status(201).json(newItem);
});

// Read all portfolio items
app.get("/api/portfolio", (req, res) => {
	res.json(portfolioItems);
});

// Update a portfolio item
app.put("/api/portfolio/:id", (req, res) => {
	const { id } = req.params;
	const { title, description, image } = req.body;
	const item = portfolioItems.find((item) => item.id === parseInt(id));
	if (item) {
		item.title = title;
		item.description = description;
		item.image = image;
		res.json(item);
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

// Delete a portfolio item
app.delete("/api/portfolio/:id", (req, res) => {
	const { id } = req.params;
	const index = portfolioItems.findIndex((item) => item.id === parseInt(id));
	if (index !== -1) {
		portfolioItems.splice(index, 1);
		res.status(204).send();
	} else {
		res.status(404).json({ message: "Item not found" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
