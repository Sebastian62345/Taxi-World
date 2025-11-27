// Reviews Module for Taxi Application
class ReviewsModule {
    constructor() {
        this.filters = {
            minRating: 1,
            maxRating: 5,
            sortBy: 'newest'
        };
    }

    // Filter reviews by rating
    filterReviewsByRating(reviews, minRating = 1, maxRating = 5) {
        return reviews.filter(review => {
            const rating = parseInt(review.rating);
            return rating >= minRating && rating <= maxRating;
        });
    }

    // Sort reviews
    sortReviews(reviews, sortBy = 'newest') {
        const sortedReviews = [...reviews];
        
        switch (sortBy) {
            case 'newest':
                return sortedReviews.sort((a, b) => b.timestamp - a.timestamp);
            case 'oldest':
                return sortedReviews.sort((a, b) => a.timestamp - b.timestamp);
            case 'highest':
                return sortedReviews.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
            case 'lowest':
                return sortedReviews.sort((a, b) => parseInt(a.rating) - parseInt(b.rating));
            default:
                return sortedReviews;
        }
    }

    // Get reviews statistics
    getReviewsStats(reviews) {
        if (!reviews || reviews.length === 0) {
            return {
                total: 0,
                average: 0,
                distribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
                recentCount: 0
            };
        }

        const total = reviews.length;
        const sum = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
        const average = (sum / total).toFixed(1);
        
        // Calculate rating distribution
        const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        reviews.forEach(review => {
            distribution[review.rating]++;
        });

        // Count recent reviews (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentCount = reviews.filter(review => 
            new Date(review.timestamp) > thirtyDaysAgo
        ).length;

        return {
            total,
            average,
            distribution,
            recentCount
        };
    }

    // Export reviews as JSON
    exportReviews(reviews) {
        const data = {
            exportedAt: new Date().toISOString(),
            totalReviews: reviews.length,
            reviews: reviews
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `taxi-reviews-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Validate review content
    validateReviewContent(text, rating) {
        const errors = [];

        if (!text || text.trim().length === 0) {
            errors.push('Treść recenzji nie może być pusta');
        }

        if (text && text.trim().length < 5) {
            errors.push('Recenzja musi mieć co najmniej 5 znaków');
        }

        if (text && text.trim().length > 500) {
            errors.push('Recenzja nie może przekraczać 500 znaków');
        }

        if (!rating || rating < 1 || rating > 5) {
            errors.push('Ocena musi być w zakresie 1-5 gwiazdek');
        }

        // Check for inappropriate content (basic check)
        const inappropriateWords = ['spam', 'reklama', 'http://', 'https://', 'www.'];
        const lowerText = text.toLowerCase();
        inappropriateWords.forEach(word => {
            if (lowerText.includes(word)) {
                errors.push('Recenzja zawiera niedozwoloną treść');
            }
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Get rating breakdown for display
    getRatingBreakdown(reviews) {
        const stats = this.getReviewsStats(reviews);
        const breakdown = [];
        
        for (let i = 5; i >= 1; i--) {
            const count = stats.distribution[i] || 0;
            const percentage = stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0;
            
            breakdown.push({
                stars: i,
                count: count,
                percentage: percentage,
                barWidth: percentage + '%'
            });
        }
        
        return breakdown;
    }

    // Format review date for display
    formatReviewDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'wczoraj';
        } else if (diffDays < 7) {
            return `${diffDays} dni temu`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} ${weeks === 1 ? 'tydzień' : 'tygodnie'} temu`;
        } else {
            return date.toLocaleDateString('pl-PL');
        }
    }
}

// Create global reviews module instance
const Reviews = new ReviewsModule();
