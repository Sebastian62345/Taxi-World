// Reviews Module: Handles displaying user reviews
const ReviewsModule = {
    showAllReviews(taxiId) {
        const taxi = TaxiModel.getTaxiById(taxiId);
        if (!taxi) return;

        const reviewsHtml = `
            <div class="reviews-modal-content">
                <h2>Opinie dla ${taxi.name}</h2>
                <div class="reviews-summary">
                    <div class="average-rating">
                        <span class="rating-number">${taxi.rating}</span>
                        <span class="rating-stars">${'⭐'.repeat(Math.floor(taxi.rating))}</span>
                        <span class="total-reviews">(${taxi.reviews.length} opinii)</span>
                    </div>
                </div>
                <div class="reviews-list">
                    ${taxi.reviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <strong>${review.user}</strong>
                                <span class="review-rating">⭐ ${review.rating}/5</span>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                            <small class="review-date">${review.date || 'Niedawno'}</small>
                        </div>
                    `).join('')}
                </div>
                <button onclick="ReviewsModule.closeReviewsModal()">Zamknij</button>
            </div>
        `;

        // Create modal if it doesn't exist
        let modal = document.getElementById('reviews-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'reviews-modal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = reviewsHtml;
        modal.style.display = 'flex';
    },

    closeReviewsModal() {
        const modal = document.getElementById('reviews-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
};
