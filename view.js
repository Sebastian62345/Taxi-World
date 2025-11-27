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
                        <div class="favorite-btn" data-driver-id="${taxi.id}" style="cursor: pointer; font-size: 20px;">
                            ${taxi.driver.favorite ? '❤️' : '🤍'}
                        </div>
                    </div>
                </div>
                <div class="taxi-body">
                    <div class="taxi-details">
                        <span>${taxi.car.model} • ${taxi.car.color} (${taxi.car.year})</span>
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
                    <div class="driver-info-extra">
                        <div class="languages">🌐 ${taxi.driver.languages.join(', ')}</div>
                        <div class="experience">💼 ${taxi.driver.experience} • ${taxi.driver.trips} przejazdów</div>
                    </div>
                    <div class="car-features">
                        <h5>Wyposażenie:</h5>
                        <div class="features-list">
                            ${taxi.car.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                    </div>
                    <div class="reviews">
                        <h4>Opinie (${taxi.reviews.length}):</h4>
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

        // Add favorite button event listeners
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const driverId = parseInt(btn.getAttribute('data-driver-id'));
                const isFavorite = Model.toggleFavoriteDriver(driverId);
                btn.textContent = isFavorite ? '❤️' : '🤍';
            });
        });
    },

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    },

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    },

    showRideTracking(booking) {
        const rideDetailsElement = document.getElementById('ride-details');
        rideDetailsElement.innerHTML = `
            <div class="ride-info">
                <h3>Twój przejazd</h3>
                <p><strong>Kierowca:</strong> ${booking.taxi.driver.name}</p>
                <p><strong>Auto:</strong> ${booking.taxi.car.model} (${booking.taxi.car.plate})</p>
                <p><strong>Skąd:</strong> ${booking.pickup}</p>
                <p><strong>Dokąd:</strong> ${booking.dropoff}</p>
                <p><strong>Cena:</strong> ${booking.price} zł</p>
                <p><strong>Data:</strong> ${booking.date} ${booking.time}</p>
                <p><strong>Szacowany czas:</strong> ${booking.priceDetails.estimatedTime} min</p>
                <p><strong>Dystans:</strong> ${booking.priceDetails.distance} km</p>
            </div>
            <div class="driver-selection">
                <h4>Kierowca chce wybrać przejazd</h4>
                <div class="driver-choice">
                    <button id="accept-ride" class="driver-accept-btn" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin-right: 10px; font-size: 16px;">✓ Akceptuję przejazd</button>
                    <button id="decline-ride" class="driver-decline-btn" style="background: #dc3545; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">✗ Odrzucam przejazd</button>
                </div>
                <div id="driver-choice-message" style="margin-top: 15px; font-weight: bold;"></div>
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
        this.startRideTracking(booking.priceDetails.estimatedTime);
    },

    startRideTracking(estimatedTime) {
        const statuses = ['Szukam kierowcy...', 'Kierowca w drodze...', 'Kierowca dotarł', 'Podróż w trakcie...', 'Dotarłeś na miejsce!'];
        let statusIndex = 0;

        // Calculate interval based on estimated time (longer distance = longer intervals)
        const baseInterval = 2000; // 2 seconds base
        const timeMultiplier = Math.max(1, estimatedTime / 10); // Scale with distance
        const intervalTime = baseInterval * timeMultiplier;

        console.log(`Estimated time: ${estimatedTime} min, Interval: ${intervalTime} ms`);

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
        }, intervalTime);
    },

    renderBookingHistory(bookings) {
        const historyElement = document.getElementById('booking-history');
        historyElement.innerHTML = bookings.length > 0 ?
            bookings.map(booking => `
                <div class="booking-item">
                    <p><strong>Data:</strong> ${booking.date} ${booking.time || ''}</p>
                    <p><strong>Kierowca:</strong> ${booking.taxi.driver.name}</p>
                    <p><strong>Auto:</strong> ${booking.taxi.car.model} (${booking.taxi.car.plate})</p>
                    <p><strong>Skąd:</strong> ${booking.pickup}</p>
                    <p><strong>Dokąd:</strong> ${booking.dropoff}</p>
                    <p><strong>Cena:</strong> ${booking.price} zł</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                    ${booking.priceDetails ? `<p><strong>Dystans:</strong> ${booking.priceDetails.distance} km</p>` : ''}
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

    renderReviews(reviews) {
        const reviewsElement = document.getElementById('reviews-list');
        reviewsElement.innerHTML = reviews.length > 0 ?
            reviews.map(review => `
                <div class="review">
                    <strong>${review.user}</strong> (${review.date}): ⭐ ${review.rating}
                    ${review.text ? `<br><em>${review.text}</em>` : ''}
                </div>
            `).join('') : '<p>Brak opinii.</p>';
    },



    showRatingModal() {
        this.showModal('rating-modal');
    },

    updateOrderStatus(order) {
        const statusElement = document.getElementById('tracking-status');
        if (statusElement) {
            let statusText = 'Szukam kierowcy...';
            switch (order.status) {
                case 'searching':
                    statusText = 'Szukam kierowcy...';
                    break;
                case 'assigned':
                    statusText = `Kierowca ${order.driver.name} w drodze!`;
                    break;
                case 'on_way':
                    statusText = 'Kierowca w drodze...';
                    break;
                case 'arrived':
                    statusText = 'Kierowca dotarł!';
                    break;
                case 'completed':
                    statusText = 'Podróż zakończona!';
                    break;
            }
            statusElement.textContent = statusText;
        }
    },

    updateProgressBar(progress) {
        const progressElement = document.getElementById('progress-fill');
        if (progressElement) {
            progressElement.style.width = progress + '%';
        }
    }
};
