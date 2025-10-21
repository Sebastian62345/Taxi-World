// Model: Handles data for taxi schedules and bookings
const TaxiModel = {
    rideTypes: [
        { id: 'uberx', name: 'UberX', price: '25-35 zł', time: '2 min', capacity: 4, description: 'Tanie i wygodne' },
        { id: 'uberxl', name: 'UberXL', price: '35-50 zł', time: '3 min', capacity: 6, description: 'Więcej miejsca' },
        { id: 'uberblack', name: 'UberBlack', price: '50-70 zł', time: '4 min', capacity: 4, description: 'Luksusowe auto' },
        { id: 'ubervan', name: 'UberVAN', price: '45-65 zł', time: '5 min', capacity: 8, description: 'Dla większej grupy' }
    ],

    taxis: [
        {
            id: 1,
            name: 'City Cab',
            location: 'Centrum',
            phone: '+48-555-0101',
            rating: 4.5,
            available: true,
            driver: { name: 'Jan Kowalski', photo: '👨‍✈️', rating: 4.8 },
            car: { model: 'Toyota Corolla', color: 'Czarny', plate: 'WA 12345' },
            reviews: [
                { user: 'Jan K.', rating: 5, comment: 'Świetna usługa!' },
                { user: 'Anna M.', rating: 4, comment: 'Punktualny kierowca.' }
            ],
            price: 28,
            eta: '2 min',
            estimatedCost: '28-35 zł'
        },
        {
            id: 2,
            name: 'Quick Ride',
            location: 'Uptown',
            phone: '+48-555-0102',
            rating: 4.8,
            available: true,
            driver: { name: 'Piotr Wiśniewski', photo: '👨‍💼', rating: 4.9 },
            car: { model: 'Honda Civic', color: 'Srebrny', plate: 'WA 23456' },
            reviews: [
                { user: 'Piotr W.', rating: 5, comment: 'Bardzo szybka usługa.' },
                { user: 'Maria L.', rating: 4, comment: 'Przyjazny kierowca.' }
            ],
            price: 32,
            eta: '3 min',
            estimatedCost: '32-40 zł'
        },
        {
            id: 3,
            name: 'Suburb Shuttle',
            location: 'Przedmieścia',
            phone: '+48-555-0103',
            rating: 4.2,
            available: false,
            driver: { name: 'Katarzyna Nowak', photo: '👩‍💼', rating: 4.5 },
            car: { model: 'Ford Focus', color: 'Niebieski', plate: 'WA 34567' },
            reviews: [
                { user: 'Katarzyna Z.', rating: 4, comment: 'Dobra lokalizacja.' },
                { user: 'Tomasz R.', rating: 3, comment: 'Czasami spóźnienia.' }
            ],
            price: 35,
            eta: '5 min',
            estimatedCost: '35-45 zł'
        },
        {
            id: 4,
            name: 'Express Taxi',
            location: 'Śródmieście',
            phone: '+48-555-0104',
            rating: 4.7,
            available: true,
            driver: { name: 'Michał Dombrowski', photo: '👨‍🎓', rating: 4.7 },
            car: { model: 'BMW 3', color: 'Czarny', plate: 'WA 45678' },
            reviews: [
                { user: 'Michał D.', rating: 5, comment: 'Expressowa usługa!' },
                { user: 'Ewa S.', rating: 4, comment: 'Zawsze na czas.' }
            ],
            price: 45,
            eta: '4 min',
            estimatedCost: '45-55 zł'
        },
        {
            id: 5,
            name: 'Night Rider',
            location: 'Centrum',
            phone: '+48-555-0105',
            rating: 4.6,
            available: true,
            driver: { name: 'Robert Kowalewski', photo: '👨‍🎤', rating: 4.8 },
            car: { model: 'Mercedes C-Class', color: 'Szary', plate: 'WA 56789' },
            reviews: [
                { user: 'Robert K.', rating: 5, comment: 'Doskonała nocna usługa.' },
                { user: 'Agnieszka P.', rating: 4, comment: 'Bezpieczna podróż.' }
            ],
            price: 55,
            eta: '6 min',
            estimatedCost: '55-70 zł'
        },
        {
            id: 6,
            name: 'Family Van',
            location: 'Przedmieścia',
            phone: '+48-555-0106',
            rating: 4.4,
            available: true,
            driver: { name: 'Barbara Tomaszewska', photo: '👩‍👧‍👦', rating: 4.6 },
            car: { model: 'VW Crafter', color: 'Biały', plate: 'WA 67890' },
            reviews: [
                { user: 'Barbara T.', rating: 5, comment: 'Przestronny van dla rodziny.' },
                { user: 'Andrzej M.', rating: 4, comment: 'Wygodna podróż z dziećmi.' }
            ],
            price: 65,
            eta: '7 min',
            estimatedCost: '65-85 zł'
        },
        {
            id: 7,
            name: 'Eco Ride',
            location: 'Centrum',
            phone: '+48-555-0107',
            rating: 4.9,
            available: true,
            driver: { name: 'Marek Zielony', photo: '👨‍🌾', rating: 4.9 },
            car: { model: 'Tesla Model 3', color: 'Biały', plate: 'WA 78901' },
            reviews: [
                { user: 'Ewa G.', rating: 5, comment: 'Ekologiczna jazda!' },
                { user: 'Tomasz B.', rating: 5, comment: 'Cichy i płynny.' }
            ],
            price: 38,
            eta: '3 min',
            estimatedCost: '38-48 zł'
        },
        {
            id: 8,
            name: 'Luxury Limo',
            location: 'Śródmieście',
            phone: '+48-555-0108',
            rating: 4.8,
            available: true,
            driver: { name: 'Karolina Luksusowa', photo: '👩‍💎', rating: 4.8 },
            car: { model: 'Mercedes S-Class', color: 'Czarny', plate: 'WA 89012' },
            reviews: [
                { user: 'Paweł R.', rating: 5, comment: 'Luksusowa podróż.' },
                { user: 'Magda K.', rating: 4, comment: 'Elegancki kierowca.' }
            ],
            price: 80,
            eta: '5 min',
            estimatedCost: '80-100 zł'
        },
        {
            id: 9,
            name: 'Budget Cab',
            location: 'Przedmieścia',
            phone: '+48-555-0109',
            rating: 4.1,
            available: true,
            driver: { name: 'Adam Tani', photo: '👨‍🔧', rating: 4.2 },
            car: { model: 'Skoda Fabia', color: 'Zielony', plate: 'WA 90123' },
            reviews: [
                { user: 'Kasia S.', rating: 4, comment: 'Tanie i niezawodne.' },
                { user: 'Janusz P.', rating: 3, comment: 'Prosty wóz.' }
            ],
            price: 22,
            eta: '4 min',
            estimatedCost: '22-28 zł'
        },
        {
            id: 10,
            name: 'Speed Taxi',
            location: 'Centrum',
            phone: '+48-555-0110',
            rating: 4.6,
            available: true,
            driver: { name: 'Rafał Szybki', photo: '👨‍🏃', rating: 4.7 },
            car: { model: 'Audi A4', color: 'Czerwony', plate: 'WA 01234' },
            reviews: [
                { user: 'Monika W.', rating: 5, comment: 'Bardzo szybka jazda!' },
                { user: 'Darek L.', rating: 4, comment: 'Dynamiczny styl.' }
            ],
            price: 42,
            eta: '2 min',
            estimatedCost: '42-52 zł'
        },
        {
            id: 11,
            name: 'Senior Shuttle',
            location: 'Przedmieścia',
            phone: '+48-555-0111',
            rating: 4.7,
            available: true,
            driver: { name: 'Helena Spokojna', photo: '👵', rating: 4.8 },
            car: { model: 'Opel Astra', color: 'Beżowy', plate: 'WA 12346' },
            reviews: [
                { user: 'Wojciech M.', rating: 5, comment: 'Spokojna jazda dla seniorów.' },
                { user: 'Irena K.', rating: 4, comment: 'Przyjazna atmosfera.' }
            ],
            price: 30,
            eta: '6 min',
            estimatedCost: '30-38 zł'
        },
        {
            id: 12,
            name: 'Party Bus',
            location: 'Centrum',
            phone: '+48-555-0112',
            rating: 4.5,
            available: true,
            driver: { name: 'Tomek Imprezowy', photo: '👨‍🎉', rating: 4.6 },
            car: { model: 'VW Multivan', color: 'Żółty', plate: 'WA 23457' },
            reviews: [
                { user: 'Ania P.', rating: 5, comment: 'Świetne na imprezy!' },
                { user: 'Marcin Z.', rating: 4, comment: 'Dużo miejsca na bagaż.' }
            ],
            price: 75,
            eta: '8 min',
            estimatedCost: '75-95 zł'
        },
        {
            id: 13,
            name: 'Airport Express',
            location: 'Lotnisko',
            phone: '+48-555-0113',
            rating: 4.8,
            available: true,
            driver: { name: 'Zofia Lotnicza', photo: '👩‍✈️', rating: 4.9 },
            car: { model: 'Toyota Prius', color: 'Niebieski', plate: 'WA 34568' },
            reviews: [
                { user: 'Piotr A.', rating: 5, comment: 'Szybki transport na lotnisko.' },
                { user: 'Katarzyna L.', rating: 5, comment: 'Punktualna.' }
            ],
            price: 50,
            eta: '10 min',
            estimatedCost: '50-65 zł'
        },
        {
            id: 14,
            name: 'City Hopper',
            location: 'Śródmieście',
            phone: '+48-555-0114',
            rating: 4.4,
            available: true,
            driver: { name: 'Łukasz Miejski', photo: '👨‍🏙️', rating: 4.5 },
            car: { model: 'Renault Clio', color: 'Szary', plate: 'WA 45679' },
            reviews: [
                { user: 'Beata R.', rating: 4, comment: 'Dobra znajomość miasta.' },
                { user: 'Grzegorz T.', rating: 4, comment: 'Przyjazny dla krótkich tras.' }
            ],
            price: 25,
            eta: '3 min',
            estimatedCost: '25-32 zł'
        },
        {
            id: 15,
            name: 'Weekend Cruiser',
            location: 'Przedmieścia',
            phone: '+48-555-0115',
            rating: 4.6,
            available: true,
            driver: { name: 'Natalia Weekendowa', photo: '👩‍🚗', rating: 4.7 },
            car: { model: 'Mazda CX-5', color: 'Czarny', plate: 'WA 56780' },
            reviews: [
                { user: 'Robert S.', rating: 5, comment: 'Wygodna na dłuższe trasy.' },
                { user: 'Ewa N.', rating: 4, comment: 'Miła muzyka w samochodzie.' }
            ],
            price: 40,
            eta: '5 min',
            estimatedCost: '40-50 zł'
        }
    ],

    bookings: [],
    users: [],
    notifications: [
        { id: 1, message: 'Twoja rezerwacja została potwierdzona.', date: '2023-10-01' },
        { id: 2, message: 'Przypomnienie o nadchodzącej podróży.', date: '2023-10-02' }
    ],
    currentRide: null,
    discounts: [
        { code: 'LOYAL10', description: '10% zniżki dla stałych klientów', discount: 0.1, minRides: 5 },
        { code: 'FIRST15', description: '15% zniżki na pierwszą podróż', discount: 0.15, firstTime: true },
        { code: 'NIGHT20', description: '20% zniżki na nocne przejazdy', discount: 0.2, timeRange: [22, 6] },
        { code: 'WEEKEND25', description: '25% zniżki na weekendowe przejazdy', discount: 0.25, days: ['saturday', 'sunday'] },
        { code: 'STUDENT30', description: '30% zniżki dla studentów', discount: 0.3, student: true },
        { code: 'SENIOR20', description: '20% zniżki dla seniorów', discount: 0.2, senior: true },
        { code: 'GROUP15', description: '15% zniżki dla grup powyżej 3 osób', discount: 0.15, minPassengers: 3 },
        { code: 'ECO10', description: '10% zniżki za wybór ekologicznego pojazdu', discount: 0.1, eco: true },
        { code: 'VIP50', description: '50% zniżki dla VIP klientów', discount: 0.5, vip: true },
        { code: 'HOLIDAY40', description: '40% zniżki na święta', discount: 0.4, holiday: true }
    ],
    userProfile: {
        rides: 0,
        isFirstTime: true,
        discountCode: null
    },

    getRideTypes() {
        return this.rideTypes;
    },

    getTaxis() {
        return this.taxis;
    },

    getTaxiById(id) {
        return this.taxis.find(taxi => taxi.id === id);
    },

    searchTaxis(query) {
        return this.taxis.filter(taxi =>
            taxi.location.toLowerCase().includes(query.toLowerCase()) ||
            taxi.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    filterTaxis(rating, availability) {
        return this.taxis.filter(taxi => {
            const ratingMatch = !rating || taxi.rating >= parseFloat(rating);
            const availabilityMatch = !availability ||
                (availability === 'available' && taxi.available) ||
                (availability === 'unavailable' && !taxi.available);
            return ratingMatch && availabilityMatch;
        });
    },

    bookTaxi(taxiId, bookingData) {
        const taxi = this.getTaxiById(taxiId);
        if (taxi && taxi.available) {
            const booking = {
                id: Date.now(),
                taxiId,
                ...bookingData,
                status: 'confirmed',
                date: new Date().toLocaleDateString('pl-PL'),
                driver: taxi.driver,
                car: taxi.car
            };
            this.bookings.push(booking);
            this.currentRide = booking;
            return booking;
        }
        return false;
    },

    getBookings() {
        return this.bookings;
    },

    getNotifications() {
        return this.notifications;
    },

    loginUser(username, password) {
        // Simple mock login
        if (username && password) {
            this.users.push({ username, password });
            return true;
        }
        return false;
    },

    getCurrentRide() {
        return this.currentRide;
    },

    updateRideStatus(status) {
        if (this.currentRide) {
            this.currentRide.status = status;
            return true;
        }
        return false;
    },

    applyDiscount(price, discountCode) {
        const discount = this.discounts.find(d => d.code === discountCode);
        if (discount) {
            const currentHour = new Date().getHours();
            const isEligible = (
                (discount.minRides && this.userProfile.rides >= discount.minRides) ||
                (discount.firstTime && this.userProfile.isFirstTime) ||
                (discount.timeRange && (currentHour >= discount.timeRange[0] || currentHour <= discount.timeRange[1]))
            );
            if (isEligible) {
                return price * (1 - discount.discount);
            }
        }
        return price;
    },

    getAvailableDiscounts() {
        const currentHour = new Date().getHours();
        const currentDay = new Date().getDay(); // 0 = Sunday, 6 = Saturday
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDayName = dayNames[currentDay];

        return this.discounts.filter(discount => {
            return (
                (discount.minRides && this.userProfile.rides >= discount.minRides) ||
                (discount.firstTime && this.userProfile.isFirstTime) ||
                (discount.timeRange && (currentHour >= discount.timeRange[0] || currentHour <= discount.timeRange[1])) ||
                (discount.days && discount.days.includes(currentDayName)) ||
                (discount.student && this.userProfile.student) ||
                (discount.senior && this.userProfile.senior) ||
                (discount.minPassengers && this.userProfile.passengers >= discount.minPassengers) ||
                (discount.eco && this.userProfile.ecoPreference) ||
                (discount.vip && this.userProfile.vip) ||
                (discount.holiday && this.isHoliday())
            );
        });
    },

    isHoliday() {
        // Simple holiday check - can be expanded
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // Example: Christmas, New Year, etc.
        return (month === 12 && day === 25) || (month === 1 && day === 1) || (month === 5 && day === 1);
    },

    updateTaxiStatus(taxiId, status) {
        const taxi = this.getTaxiById(taxiId);
        if (taxi) {
            taxi.available = status === 'available';
            taxi.status = status; // 'available', 'busy', 'moving'
            return true;
        }
        return false;
    },

    getTaxiLocations() {
        return this.taxis.map(taxi => ({
            id: taxi.id,
            name: taxi.name,
            location: taxi.location,
            available: taxi.available,
            status: taxi.status || (taxi.available ? 'available' : 'busy'),
            lat: taxi.lat || Math.random() * 0.1 + 52.23, // Warsaw area
            lng: taxi.lng || Math.random() * 0.1 + 21.01
        }));
    },

    simulateTaxiMovement() {
        this.taxis.forEach(taxi => {
            if (taxi.status === 'moving' || Math.random() > 0.7) {
                taxi.lat = (taxi.lat || 52.23) + (Math.random() - 0.5) * 0.01;
                taxi.lng = (taxi.lng || 21.01) + (Math.random() - 0.5) * 0.01;
                taxi.status = 'moving';
            } else if (taxi.available) {
                taxi.status = 'available';
            } else {
                taxi.status = 'busy';
            }
        });
    },

    submitRating(bookingId, rating, comment) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.rating = rating;
            booking.comment = comment;
            this.userProfile.rides += 1;
            this.userProfile.isFirstTime = false;
            return true;
        }
        return false;
    }
};
