const errorHandler = (err, req, res, next) => {
	console.error(err.stack);

	const error = {
		statusCode: err.statusCode || 500,
		message: err.message || "Internal Server Error",
	};

	if (err.name === "ValidationError") {
		error.statusCode = 400;
		error.message = Object.values(err.errors)
			.map((val) => val.message)
			.join(", ");
	}

	res.status(error.statusCode).json({
		success: false,
		error: error.message,
	});
};

module.exports = errorHandler;
