// View: Handles rendering the UI
const TaxiView = {
    taxiListElement: document.getElementById('taxi-list'),
    rideTypesElement: document.getElementById('ride-types'),

    renderRideTypes(rideTypes) {
        this.rideTypesElement.innerHTML = '';
        rideTypes.forEach(type => {
            const rideTypeElement = document.createElement('div');
            rideTypeElement.className = 'ride-type';
            rideTypeElement.dataset.typeId = type.id;
            rideTypeElement.innerHTML = `
                <h4>${type.name}</h4>
                <div class="price">${type.price}</div>
                <div class="time">${type.time}</div>
            `;
            rideTypeElement.addEventListener('click', () => {
                this.selectRideType(type.id);
            });
            this.rideTypesElement.appendChild(rideTypeElement);
        });
    },

    selectRideType(typeId) {
        // Remove selected class from all ride types
        document.querySelectorAll('.ride-type').forEach(el => el.classList.remove('selected'));
        // Add selected class to clicked ride type
        document.querySelector(`[data-type-id="${typeId}"]`).classList.add('selected');
        TaxiController.selectedRideType = typeId;
    },

    renderTaxis(taxis) {
        this.taxiListElement.innerHTML = '';
        taxis.forEach(taxi => {
            const taxiCard = document.createElement('div');
            taxiCard.className = 'taxi-card';
            taxiCard.innerHTML = `
                <div class="driver-info">
                    <div class="driver-photo">${taxi.driver.photo}</div>
                    <div class="driver-details">
                        <h3>${taxi.driver.name}</h3>
                        <div class="rating">⭐ ${taxi.driver.rating}</div>
                    </div>
                </div>
                <div class="taxi-body">
                    <div class="taxi-details">
                        <span>${taxi.car.model} • ${taxi.car.color}</span>
                        <span>${taxi.car.plate}</span>
                    </div>
                    <div class="taxi-details">
                        <span>📍 ${taxi.location}</span>
                        <span>⏱️ ${taxi.eta}</span>
                    </div>
                    <div class="taxi-details">
                        <span>💰 ${taxi.estimatedCost}</span>
                        <span>⭐ ${taxi.rating}</span>
                    </div>
                    <div class="reviews">
                        <h4>Opinie:</h4>
                        ${taxi.reviews.slice(0, 2).map(review => `
                            <div class="review">
                                <strong>${review.user}</strong> (⭐ ${review.rating}): ${review.comment}
                            </div>
                        `).join('')}
                    </div>
                    <button class="book-btn" data-taxi-id="${taxi.id}" ${!taxi.available ? 'disabled' : ''}>
                        ${taxi.available ? 'Zamów' : 'Niedostępny'}
                    </button>
                </div>
            `;
            this.taxiListElement.appendChild(taxiCard);
        });
    },

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    },

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    },

    showRideTracking(ride) {
        const rideDetailsElement = document.getElementById('ride-details');
        rideDetailsElement.innerHTML = `
            <div class="ride-info">
                <h3>Twój przejazd</h3>
                <p><strong>Kierowca:</strong> ${ride.driver.name}</p>
                <p><strong>Auto:</strong> ${ride.car.model} (${ride.car.plate})</p>
                <p><strong>Skąd:</strong> ${ride.pickup}</p>
                <p><strong>Dokąd:</strong> ${ride.dropoff}</p>
                <p><strong>Cena:</strong> ${TaxiModel.getTaxiById(ride.taxiId).price} zł</p>
            </div>
            <div class="payment-methods">
                <h4>Wybierz metodę płatności</h4>
                <div class="payment-method" data-method="card">💳 Karta</div>
                <div class="payment-method" data-method="cash">💵 Gotówka</div>
                <div class="payment-method" data-method="paypal">🅿️ PayPal</div>
            </div>
        `;

        // Add payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', () => {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
            });
        });

        this.showModal('ride-modal');
        this.startRideTracking();
    },

    startRideTracking() {
        const statuses = ['Szukam kierowcy...', 'Kierowca w drodze...', 'Kierowca dotarł', 'Podróż w trakcie...', 'Dotarłeś na miejsce!'];
        let statusIndex = 0;

        const interval = setInterval(() => {
            if (statusIndex < statuses.length) {
                document.getElementById('tracking-status').textContent = statuses[statusIndex];
                document.getElementById('progress-fill').style.width = `${(statusIndex + 1) / statuses.length * 100}%`;
                statusIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    this.hideModal('ride-modal');
                    TaxiView.showRatingModal();
                }, 2000);
            }
        }, 3000);
    },

    renderBookingHistory(bookings) {
        const historyElement = document.getElementById('booking-history');
        historyElement.innerHTML = bookings.length > 0 ?
            bookings.map(booking => `
                <div class="booking-item">
                    <p><strong>Data:</strong> ${booking.date}</p>
                    <p><strong>Kierowca:</strong> ${booking.driver.name}</p>
                    <p><strong>Auto:</strong> ${booking.car.model}</p>
                    <p><strong>Skąd:</strong> ${booking.pickup}</p>
                    <p><strong>Dokąd:</strong> ${booking.dropoff}</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
            `).join('') : '<p>Brak historii przejazdów.</p>';
    },

    renderNotifications(notifications) {
        const notificationsElement = document.getElementById('notifications-list');
        notificationsElement.innerHTML = notifications.map(notification => `
            <div class="notification">
                <p>${notification.message}</p>
                <small>${notification.date}</small>
            </div>
        `).join('');
    },

    renderDiscounts(discounts) {
        const discountsElement = document.getElementById('discounts-list');
        discountsElement.innerHTML = discounts.length > 0 ?
            discounts.map(discount => `
                <div class="discount-item">
                    <div class="discount-code">${discount.code}</div>
                    <div class="discount-description">${discount.description}</div>
                </div>
            `).join('') : '<p>Brak dostępnych zniżek.</p>';
    },

    showRatingModal() {
        this.showModal('rating-modal');
    }
};
