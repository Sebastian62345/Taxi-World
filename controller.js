// Controller: Handles user interactions and updates model/view
const TaxiController = {
    currentTaxis: [],
    selectedRideType: null,

    init() {
        this.currentTaxis = TaxiModel.getTaxis();
        TaxiView.renderRideTypes(TaxiModel.getRideTypes());
        TaxiView.renderTaxis(this.currentTaxis);
        this.bindEvents();
    },

    bindEvents() {
        // Book button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('book-btn')) {
                const taxiId = parseInt(e.target.getAttribute('data-taxi-id'));
                this.confirmRide(taxiId);
            }
        });

        // Confirm ride button
        document.getElementById('confirm-ride-btn').addEventListener('click', () => {
            this.confirmRideBooking();
        });

        // Navigation buttons
        document.getElementById('login-btn').addEventListener('click', () => {
            TaxiView.showModal('login-modal');
        });

        document.getElementById('history-btn').addEventListener('click', () => {
            this.showBookingHistory();
        });

        document.getElementById('notifications-btn').addEventListener('click', () => {
            this.showNotifications();
        });

        document.getElementById('discounts-btn').addEventListener('click', () => {
            this.showDiscounts();
        });

        // Login form
        document.getElementById('login-submit').addEventListener('click', () => {
            this.loginUser();
        });

        // Rating stars
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                this.selectRating(parseInt(e.target.getAttribute('data-rating')));
            }
        });

        // Submit rating
        document.getElementById('submit-rating').addEventListener('click', () => {
            this.submitRating();
        });
    },

    confirmRide(taxiId) {
        const pickup = document.getElementById('pickup-location').value;
        const dropoff = document.getElementById('dropoff-location').value;

        if (!pickup || !dropoff) {
            alert('Proszę wypełnić miejsca odbioru i docelowe.');
            return;
        }

        const taxi = TaxiModel.getTaxiById(taxiId);
        const bookingData = {
            pickup,
            dropoff,
            passengers: 1, // Default for now
            taxiName: taxi.name
        };

        const booking = TaxiModel.bookTaxi(taxiId, bookingData);
        if (booking) {
            TaxiView.showRideTracking(booking);
        } else {
            alert('Zamówienie nie powiodło się. Spróbuj ponownie.');
        }
    },

    confirmRideBooking() {
        const pickup = document.getElementById('pickup-location').value;
        const dropoff = document.getElementById('dropoff-location').value;

        if (!pickup || !dropoff) {
            alert('Proszę wypełnić miejsca odbioru i docelowe.');
            return;
        }

        if (!this.selectedRideType) {
            alert('Proszę wybrać rodzaj przejazdu.');
            return;
        }

        // Find available taxi for selected ride type
        const availableTaxis = this.currentTaxis.filter(taxi => taxi.available);
        if (availableTaxis.length === 0) {
            alert('Brak dostępnych taksówek.');
            return;
        }

        const taxi = availableTaxis[0]; // Select first available
        const bookingData = {
            pickup,
            dropoff,
            passengers: 1,
            taxiName: taxi.name
        };

        const booking = TaxiModel.bookTaxi(taxi.id, bookingData);
        if (booking) {
            TaxiView.showRideTracking(booking);
        } else {
            alert('Zamówienie nie powiodło się. Spróbuj ponownie.');
        }
    },

    closeModal(modalId) {
        TaxiView.hideModal(modalId);
    },

    showBookingHistory() {
        const bookings = TaxiModel.getBookings();
        TaxiView.renderBookingHistory(bookings);
        TaxiView.showModal('history-modal');
    },

    showNotifications() {
        const notifications = TaxiModel.getNotifications();
        TaxiView.renderNotifications(notifications);
        TaxiView.showModal('notifications-modal');
    },

    loginUser() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (TaxiModel.loginUser(username, password)) {
            alert('Zalogowano pomyślnie!');
            TaxiView.hideModal('login-modal');
        } else {
            alert('Błąd logowania. Spróbuj ponownie.');
        }
    },

    showDiscounts() {
        const discounts = TaxiModel.getAvailableDiscounts();
        TaxiView.renderDiscounts(discounts);
        TaxiView.showModal('discounts-modal');
    },

    selectRating(rating) {
        this.selectedRating = rating;
        const stars = document.querySelectorAll('#rating-stars .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    },

    submitRating() {
        const comment = document.getElementById('rating-comment').value;
        const currentRide = TaxiModel.getCurrentRide();
        if (currentRide && this.selectedRating) {
            TaxiModel.submitRating(currentRide.id, this.selectedRating, comment);
            alert('Dziękujemy za ocenę!');
            TaxiView.hideModal('rating-modal');
        } else {
            alert('Proszę wybrać ocenę.');
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    TaxiController.init();
});
