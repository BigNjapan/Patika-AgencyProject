/*!
 * Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
	// Navbar shrink function
	var navbarShrink = function () {
		const navbarCollapsible = document.body.querySelector("#mainNav");
		if (!navbarCollapsible) {
			return;
		}
		if (window.scrollY === 0) {
			navbarCollapsible.classList.remove("navbar-shrink");
		} else {
			navbarCollapsible.classList.add("navbar-shrink");
		}
	};

	// Shrink the navbar
	navbarShrink();

	// Shrink the navbar when page is scrolled
	document.addEventListener("scroll", navbarShrink);

	//  Activate Bootstrap scrollspy on the main nav element
	const mainNav = document.body.querySelector("#mainNav");
	if (mainNav) {
		new bootstrap.ScrollSpy(document.body, {
			target: "#mainNav",
			rootMargin: "0px 0px -40%",
		});
	}

	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector(".navbar-toggler");
	const responsiveNavItems = [].slice.call(
		document.querySelectorAll("#navbarResponsive .nav-link")
	);
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener("click", () => {
			if (window.getComputedStyle(navbarToggler).display !== "none") {
				navbarToggler.click();
			}
		});
	});

	// CRUD Operations for Portfolio Section

	// Create a new portfolio item
	function addPortfolioItem(data) {
		fetch("/api/portfolio", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((portfolioItem) => {
				// Close the modal
				const modal = bootstrap.Modal.getInstance(
					document.getElementById("portfolioModal")
				);
				modal.hide();
				// Refresh the portfolio items
				fetchPortfolioItems();
			})
			.catch((error) => console.error("Error adding portfolio item:", error));
	}

	// Read/fetch all portfolio items
	function fetchPortfolioItems() {
		fetch("/api/portfolio")
			.then((response) => response.json())
			.then((data) => {
				const portfolioSection = document.getElementById("portfolioSection");
				portfolioSection.innerHTML = "";
				data.forEach((item) => {
					const portfolioItem = document.createElement("div");
					portfolioItem.classList.add("portfolio-item");
					portfolioItem.innerHTML = `
					<img src="${item.image}" alt="${item.title}">
					<h4>${item.title}</h4>
					<p>${item.description}</p>
					<button class="btn btn-secondary edit-portfolio-item" data-id="${item.id}" data-title="${item.title}" data-description="${item.description}" data-image="${item.image}" data-bs-toggle="modal" data-bs-target="#portfolioModal">Edit</button>
					<button class="btn btn-danger delete-portfolio-item" data-id="${item.id}">Delete</button>
				`;
					portfolioSection.appendChild(portfolioItem);
				});
				// Attach event listeners to new buttons
				attachEventListeners();
			})
			.catch((error) =>
				console.error("Error fetching portfolio items:", error)
			);
	}

	// Update an existing portfolio item
	function editPortfolioItem(id, updatedData) {
		fetch(`/api/portfolio/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		})
			.then((response) => response.json())
			.then((portfolioItem) => {
				// Close the modal
				const modal = bootstrap.Modal.getInstance(
					document.getElementById("portfolioModal")
				);
				modal.hide();
				// Refresh the portfolio items
				fetchPortfolioItems();
			})
			.catch((error) => console.error("Error updating portfolio item:", error));
	}

	// Delete a portfolio item
	function deletePortfolioItem(id) {
		if (!confirm("Are you sure you want to delete this portfolio item?")) {
			return;
		}
		fetch(`/api/portfolio/${id}`, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					// Refresh the portfolio items
					fetchPortfolioItems();
				} else {
					console.error("Failed to delete portfolio item.");
				}
			})
			.catch((error) => console.error("Error deleting portfolio item:", error));
	}

	// Attach event listeners to edit and delete buttons
	function attachEventListeners() {
		const editButtons = document.querySelectorAll(".edit-portfolio-item");
		editButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const id = button.dataset.id;
				const title = button.dataset.title;
				const description = button.dataset.description;
				const image = button.dataset.image;
				// Populate the form with existing data
				document.getElementById("portfolioId").value = id;
				document.getElementById("portfolioTitle").value = title;
				document.getElementById("portfolioDescription").value = description;
				document.getElementById("portfolioImage").value = image;
				// Change the modal title
				document.getElementById("portfolioModalLabel").textContent =
					"Edit Portfolio Item";
			});
		});

		const deleteButtons = document.querySelectorAll(".delete-portfolio-item");
		deleteButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const id = button.dataset.id;
				deletePortfolioItem(id);
			});
		});
	}

	// Handle form submission for adding/editing portfolio items
	document.getElementById("portfolioForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const id = document.getElementById("portfolioId").value;
		const title = document.getElementById("portfolioTitle").value;
		const description = document.getElementById("portfolioDescription").value;
		const image = document.getElementById("portfolioImage").value;

		const data = { title, description, image };

		if (id) {
			// Edit existing portfolio item
			editPortfolioItem(id, data);
		} else {
			// Add new portfolio item
			addPortfolioItem(data);
		}
	});

	// Initial fetch of portfolio items on page load
	document.addEventListener("DOMContentLoaded", () => {
		fetchPortfolioItems();
	});
});
