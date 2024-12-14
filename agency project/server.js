const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const portfolioRoutes = require("./src/routes/portfolioRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/portfolio", portfolioRoutes);

// Error Handler
app.use(errorHandler);

// Database Connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/agency-portfolio", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
