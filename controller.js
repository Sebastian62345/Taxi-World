
// Controller: Handles user interactions and updates model/view
const TaxiController = {
    currentTaxis: [],
    selectedRideType: null,

    init() {
        this.currentTaxis = Model.getTaxis();
        TaxiView.renderRideTypes(Model.getRideTypes());
        TaxiView.renderTaxis(this.currentTaxis);
        this.bindEvents();
    },

    bindEvents() {
        // Book button clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('book-btn')) {
                const taxiId = parseInt(e.target.getAttribute('data-taxi-id'));
                console.log('Book button clicked for taxi ID:', taxiId);
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

        document.getElementById('reviews-btn').addEventListener('click', () => {
            this.showReviews();
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

        // Driver ride acceptance/decline
        document.addEventListener('click', (e) => {
            if (e.target.id === 'accept-ride') {
                this.driverAcceptRide();
            } else if (e.target.id === 'decline-ride') {
                this.driverDeclineRide();
            }
        });
    },

    confirmRide(taxiId) {
        console.log('confirmRide called with taxiId:', taxiId);
        const pickup = document.getElementById('pickup-location').value;
        const dropoff = document.getElementById('dropoff-location').value;

        console.log('Pickup:', pickup, 'Dropoff:', dropoff);

        if (!pickup || !dropoff) {
            alert('Proszę wypełnić miejsca odbioru i docelowe.');
            return;
        }

        if (!this.selectedRideType) {
            alert('Proszę wybrać rodzaj przejazdu.');
            return;
        }

        const bookingData = {
            pickup,
            dropoff,
            passengers: 1,
            rideType: this.selectedRideType,
            paymentMethod: 'card',
            specialRequests: ''
        };

        console.log('Booking data:', bookingData);

        const booking = Model.createDetailedBooking(taxiId, bookingData);
        console.log('Booking result:', booking);

        if (booking) {
            console.log('Showing ride tracking modal');
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
            rideType: this.selectedRideType,
            paymentMethod: 'card',
            specialRequests: ''
        };

        const booking = Model.createDetailedBooking(taxi.id, bookingData);
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
        const bookings = Model.getBookings();
        TaxiView.renderBookingHistory(bookings);
        TaxiView.showModal('history-modal');
    },

    showNotifications() {
        const notifications = Model.getNotifications();
        TaxiView.renderNotifications(notifications);
        TaxiView.showModal('notifications-modal');
    },

    loginUser() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (Model.loginUser(username, password)) {
            alert('Zalogowano pomyślnie!');
            TaxiView.hideModal('login-modal');
        } else {
            alert('Błąd logowania. Spróbuj ponownie.');
        }
    },

    showReviews() {
        const reviews = Model.getReviews();
        TaxiView.renderReviews(reviews);
        TaxiView.showModal('reviews-modal');
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
        if (this.selectedRating) {
            Model.submitRating(null, this.selectedRating, comment);
            alert('Dziękujemy za ocenę!');
            TaxiView.hideModal('rating-modal');
        } else {
            alert('Proszę wybrać ocenę.');
        }
    },



    driverAcceptRide() {
        const messageElement = document.getElementById('driver-choice-message');
        const acceptBtn = document.getElementById('accept-ride');
        const declineBtn = document.getElementById('decline-ride');

        // Disable buttons
        acceptBtn.disabled = true;
        declineBtn.disabled = true;
        acceptBtn.style.opacity = '0.5';
        declineBtn.style.opacity = '0.5';

        // Show success message
        messageElement.textContent = '✓ Kierowca zaakceptował przejazd! Rozpoczynamy podróż...';
        messageElement.style.color = 'green';
        messageElement.style.fontWeight = 'bold';

        // Start ride tracking with 15 minutes estimated time
        setTimeout(() => {
            TaxiView.startRideTracking(15);
        }, 2000);
    },

    driverDeclineRide() {
        const messageElement = document.getElementById('driver-choice-message');
        const acceptBtn = document.getElementById('accept-ride');
        const declineBtn = document.getElementById('decline-ride');

        // Disable buttons
        acceptBtn.disabled = true;
        declineBtn.disabled = true;
        acceptBtn.style.opacity = '0.5';
        declineBtn.style.opacity = '0.5';

        // Show decline message
        messageElement.textContent = '✗ Kierowca odrzucił przejazd. Szukamy innego kierowcy...';
        messageElement.style.color = 'red';
        messageElement.style.fontWeight = 'bold';

        // Simulate finding another driver
        setTimeout(() => {
            messageElement.textContent = 'Szukam innego kierowcy...';
            messageElement.style.color = 'orange';
        }, 2000);

        setTimeout(() => {
            messageElement.textContent = '✓ Znaleziono innego kierowcę! Rozpoczynamy podróż...';
            messageElement.style.color = 'green';

            // Start ride tracking with 12 minutes estimated time
            setTimeout(() => {
                TaxiView.startRideTracking(12);
            }, 2000);
        }, 4000);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    TaxiController.init();
});
