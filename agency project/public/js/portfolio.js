class PortfolioManager {
	constructor() {
		this.portfolioItems = [];
		this.form = document.getElementById("portfolioForm");
		this.modal = new bootstrap.Modal(document.getElementById("portfolioModal"));

		this.initializeEventListeners();
		this.loadPortfolioItems();
	}

	initializeEventListeners() {
		this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
		document.addEventListener("click", this.handleClick.bind(this));
	}

	async loadPortfolioItems() {
		try {
			const response = await fetch("/api/portfolio");
			this.portfolioItems = await response.json();
			this.renderPortfolioItems();
		} catch (error) {
			console.error("Error loading portfolio items:", error);
			this.showError("Failed to load portfolio items");
		}
	}

	async handleFormSubmit(event) {
		event.preventDefault();

		const formData = new FormData(this.form);
		const portfolioData = Object.fromEntries(formData.entries());
		const itemId = this.form.dataset.itemId;

		try {
			if (itemId) {
				await this.updatePortfolioItem(itemId, portfolioData);
			} else {
				await this.createPortfolioItem(portfolioData);
			}

			this.modal.hide();
			this.loadPortfolioItems();
		} catch (error) {
			console.error("Error submitting form:", error);
			this.showError("Failed to save portfolio item");
		}
	}

	async createPortfolioItem(data) {
		const response = await fetch("/api/portfolio", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error("Failed to create portfolio item");
		return response.json();
	}

	async updatePortfolioItem(id, data) {
		const response = await fetch(`/api/portfolio/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (!response.ok) throw new Error("Failed to update portfolio item");
		return response.json();
	}

	async deletePortfolioItem(id) {
		const response = await fetch(`/api/portfolio/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) throw new Error("Failed to delete portfolio item");
	}

	renderPortfolioItems() {
		const container = document.getElementById("portfolioContainer");
		container.innerHTML = this.portfolioItems
			.map((item) => this.createPortfolioItemHTML(item))
			.join("");
	}

	createPortfolioItemHTML(item) {
		return `
      <div class="col-lg-4 col-sm-6 mb-4">
        <div class="portfolio-item">
          <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal${item._id}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="${item.image}" alt="${item.title}" />
          </a>
          <div class="portfolio-caption">
            <div class="portfolio-caption-heading">${item.title}</div>
            <div class="portfolio-caption-subheading text-muted">${item.category}</div>
            <div class="portfolio-actions mt-2">
              <button class="btn btn-primary btn-sm edit-portfolio" data-id="${item._id}">
                Edit
              </button>
              <button class="btn btn-danger btn-sm delete-portfolio" data-id="${item._id}">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
	}

	showError(message) {
		// Implement error notification
		alert(message);
	}
}

// Initialize portfolio manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	new PortfolioManager();
});
