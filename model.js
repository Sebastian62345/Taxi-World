// Model for Taxi Application (Uber/Taxi Style)
class TaxiModel {
    constructor() {
        this.taxis = [];
        this.orders = [];
        this.reviews = [];
        this.bookings = [];
        this.notifications = [];
        this.currentOrder = null;
        this.currentUser = null;
        this.appStatus = 'ready';
        this.selectedRideType = null;

        // Initialize data
        this.initializeTaxis();
        this.initializeRideTypes();
        this.initializeNotifications();
        this.initializeSampleReviews();
    }

    initializeTaxis() {
        this.taxis = [
            // Warszawa (Warsaw)
            {
                id: 1,
                driver: {
                    name: 'Jan Kowalski',
                    photo: '👨‍💼',
                    rating: 4.8,
                    experience: '5 lat',
                    trips: 1247,
                    languages: ['Polski', 'Angielski'],
                    favorite: false
                },
                car: {
                    model: 'Toyota Corolla',
                    color: 'Czarny',
                    plate: 'WA 12345',
                    year: 2020,
                    features: ['Klimatyzacja', 'WiFi', 'USB']
                },
                location: 'Centrum Warszawy',
                eta: '2 min',
                estimatedCost: '25 zł',
                rating: 4.8,
                available: true,
                reviews: [
                    { user: 'Anna M.', rating: 5, comment: 'Świetny kierowca, punktualny!' },
                    { user: 'Piotr K.', rating: 4, comment: 'Dobry przejazd, czysta taksówka.' },
                    { user: 'Marek Z.', rating: 3, comment: 'OK, ale kierowca rozmawiał przez telefon.' }
                ]
            },
            // Kraków
            {
                id: 21,
                driver: {
                    name: 'Marcin Zieliński',
                    photo: '👨‍🎨',
                    rating: 4.7,
                    experience: '6 lat',
                    trips: 1456,
                    languages: ['Polski', 'Angielski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Volkswagen Passat',
                    color: 'Srebrny',
                    plate: 'KR 56789',
                    year: 2019,
                    features: ['Klimatyzacja', 'Nawigacja GPS', 'Bluetooth']
                },
                location: 'Stare Miasto Kraków',
                eta: '3 min',
                estimatedCost: '28 zł',
                rating: 4.7,
                available: true,
                reviews: [
                    { user: 'Katarzyna W.', rating: 5, comment: 'Świetny kierowca, zna wszystkie uliczki Krakowa!' },
                    { user: 'Tomasz L.', rating: 4, comment: 'Przyjemna podróż po historycznym mieście.' }
                ]
            },
            // Wrocław
            {
                id: 22,
                driver: {
                    name: 'Agnieszka Nowak',
                    photo: '👩‍💼',
                    rating: 4.9,
                    experience: '4 lata',
                    trips: 987,
                    languages: ['Polski', 'Angielski', 'Czeski'],
                    favorite: false
                },
                car: {
                    model: 'Skoda Superb',
                    color: 'Granatowy',
                    plate: 'DW 11223',
                    year: 2021,
                    features: ['Klimatyzacja', 'Apple CarPlay', 'Kamera cofania']
                },
                location: 'Rynek Wrocław',
                eta: '2 min',
                estimatedCost: '26 zł',
                rating: 4.9,
                available: true,
                reviews: [
                    { user: 'Robert M.', rating: 5, comment: 'Doskonale zna Wrocław, szybki i bezpieczny przejazd!' },
                    { user: 'Ewa K.', rating: 5, comment: 'Przyjazna kierowczyni, polecam.' }
                ]
            },
            // Poznań
            {
                id: 23,
                driver: {
                    name: 'Piotr Lewandowski',
                    photo: '👨‍🏫',
                    rating: 4.6,
                    experience: '7 lat',
                    trips: 1678,
                    languages: ['Polski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Ford Mondeo',
                    color: 'Czarny',
                    plate: 'PO 44556',
                    year: 2018,
                    features: ['Klimatyzacja', 'Nawigacja GPS']
                },
                location: 'Stare Miasto Poznań',
                eta: '4 min',
                estimatedCost: '27 zł',
                rating: 4.6,
                available: true,
                reviews: [
                    { user: 'Magdalena S.', rating: 4, comment: 'Solidny kierowca, zna Poznań jak własną kieszeń.' },
                    { user: 'Adam P.', rating: 5, comment: 'Punktualny i uprzejmy.' }
                ]
            },
            // Gdańsk
            {
                id: 24,
                driver: {
                    name: 'Katarzyna Wiśniewska',
                    photo: '👩‍🎤',
                    rating: 4.8,
                    experience: '5 lat',
                    trips: 1234,
                    languages: ['Polski', 'Angielski', 'Szwedzki'],
                    favorite: false
                },
                car: {
                    model: 'Volvo XC60',
                    color: 'Biały',
                    plate: 'GD 77889',
                    year: 2020,
                    features: ['Klimatyzacja', 'Bezpieczeństwo Volvo', 'Ładowarka indukcyjna']
                },
                location: 'Śródmieście Gdańsk',
                eta: '3 min',
                estimatedCost: '32 zł',
                rating: 4.8,
                available: true,
                reviews: [
                    { user: 'Marek Z.', rating: 5, comment: 'Luksusowe auto, doskonała obsługa!' },
                    { user: 'Joanna L.', rating: 4, comment: 'Bezpieczna jazda, polecam dla rodzin.' }
                ]
            },
            // Szczecin
            {
                id: 25,
                driver: {
                    name: 'Robert Malinowski',
                    photo: '👨‍🚀',
                    rating: 4.4,
                    experience: '8 lat',
                    trips: 1987,
                    languages: ['Polski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Mercedes-Benz E-Class',
                    color: 'Szary',
                    plate: 'ZS 99001',
                    year: 2019,
                    features: ['Klimatyzacja', 'Automatyczna skrzynia biegów', 'Kamera cofania']
                },
                location: 'Centrum Szczecin',
                eta: '5 min',
                estimatedCost: '29 zł',
                rating: 4.4,
                available: true,
                reviews: [
                    { user: 'Barbara K.', rating: 4, comment: 'Doświadczony kierowca, bezpieczna jazda.' },
                    { user: 'Krzysztof M.', rating: 5, comment: 'Mercedes premium, czystość idealna.' }
                ]
            },
            // Bydgoszcz
            {
                id: 26,
                driver: {
                    name: 'Ewa Szymankowska',
                    photo: '👩‍🎨',
                    rating: 4.5,
                    experience: '3 lata',
                    trips: 756,
                    languages: ['Polski', 'Angielski'],
                    favorite: false
                },
                car: {
                    model: 'Kia Sportage',
                    color: 'Czerwony',
                    plate: 'CB 22334',
                    year: 2021,
                    features: ['Klimatyzacja', 'Android Auto', 'Ładowarka bezprzewodowa']
                },
                location: 'Śródmieście Bydgoszcz',
                eta: '3 min',
                estimatedCost: '24 zł',
                rating: 4.5,
                available: true,
                reviews: [
                    { user: 'Tomasz R.', rating: 5, comment: 'Nowoczesny SUV, świetna muzyka!' },
                    { user: 'Anna W.', rating: 4, comment: 'Przyjazny kierowca, szybki przejazd.' }
                ]
            },
            // Lublin
            {
                id: 27,
                driver: {
                    name: 'Andrzej Kowalewski',
                    photo: '👨‍🏭',
                    rating: 4.3,
                    experience: '9 lat',
                    trips: 2341,
                    languages: ['Polski', 'Ukraiński'],
                    favorite: false
                },
                car: {
                    model: 'Opel Insignia',
                    color: 'Niebieski',
                    plate: 'LU 55667',
                    year: 2017,
                    features: ['Klimatyzacja', 'Radio CD']
                },
                location: 'Stare Miasto Lublin',
                eta: '4 min',
                estimatedCost: '25 zł',
                rating: 4.3,
                available: true,
                reviews: [
                    { user: 'Maria Z.', rating: 4, comment: 'Doświadczony kierowca, zna Lublin doskonale.' },
                    { user: 'Janusz K.', rating: 3, comment: 'Samochód trochę starszy, ale czysty.' }
                ]
            },
            // Katowice
            {
                id: 28,
                driver: {
                    name: 'Monika Zalewska',
                    photo: '👩‍💻',
                    rating: 4.6,
                    experience: '4 lata',
                    trips: 1123,
                    languages: ['Polski', 'Angielski', 'Słowacki'],
                    favorite: false
                },
                car: {
                    model: 'Mazda 6',
                    color: 'Szary',
                    plate: 'SK 88990',
                    year: 2020,
                    features: ['Klimatyzacja', 'Apple CarPlay', 'Android Auto']
                },
                location: 'Śródmieście Katowice',
                eta: '3 min',
                estimatedCost: '26 zł',
                rating: 4.6,
                available: true,
                reviews: [
                    { user: 'Piotr S.', rating: 5, comment: 'Nowoczesny samochód, fantastyczna!' },
                    { user: 'Katarzyna M.', rating: 4, comment: 'Kierowczyni zawsze uśmiechnięta i pomocna.' }
                ]
            },
            // Białystok
            {
                id: 29,
                driver: {
                    name: 'Tomasz Grabowski',
                    photo: '👨‍🍳',
                    rating: 4.4,
                    experience: '6 lat',
                    trips: 1456,
                    languages: ['Polski', 'Białoruski'],
                    favorite: false
                },
                car: {
                    model: 'Hyundai Tucson',
                    color: 'Czarny',
                    plate: 'BI 00112',
                    year: 2019,
                    features: ['Klimatyzacja', '4x4', 'Nawigacja GPS']
                },
                location: 'Centrum Białystok',
                eta: '4 min',
                estimatedCost: '23 zł',
                rating: 4.4,
                available: true,
                reviews: [
                    { user: 'Ewa L.', rating: 5, comment: 'Świetny SUV na dłuższe trasy!' },
                    { user: 'Marek W.', rating: 4, comment: 'Przyjazny kierowca, dobra rozmowa.' }
                ]
            },
            // Łódź
            {
                id: 30,
                driver: {
                    name: 'Barbara Nowakowska',
                    photo: '👩‍🏢',
                    rating: 4.2,
                    experience: '10 lat',
                    trips: 2789,
                    languages: ['Polski', 'Rosyjski'],
                    favorite: false
                },
                car: {
                    model: 'Fiat Tipo',
                    color: 'Biały',
                    plate: 'EL 33445',
                    year: 2018,
                    features: ['Klimatyzacja', 'Radio CD']
                },
                location: 'Śródmieście Łódź',
                eta: '3 min',
                estimatedCost: '22 zł',
                rating: 4.2,
                available: true,
                reviews: [
                    { user: 'Stanisław R.', rating: 3, comment: 'Samochód OK, ale mógłby być czystszy.' },
                    { user: 'Maria Z.', rating: 4, comment: 'Doświadczona kierowczyni.' }
                ]
            },
            {
                id: 2,
                driver: {
                    name: 'Anna Nowak',
                    photo: '👩‍💼',
                    rating: 4.9,
                    experience: '3 lata',
                    trips: 892,
                    languages: ['Polski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Skoda Octavia',
                    color: 'Srebrny',
                    plate: 'WA 67890',
                    year: 2021,
                    features: ['Klimatyzacja', 'Nawigacja GPS']
                },
                location: 'Śródmieście',
                eta: '3 min',
                estimatedCost: '28 zł',
                rating: 4.9,
                available: false,
                reviews: [
                    { user: 'Marek L.', rating: 5, comment: 'Bardzo miła kierowczyni!' },
                    { user: 'Katarzyna W.', rating: 5, comment: 'Doskonale, polecam.' }
                ]
            },
            {
                id: 3,
                driver: {
                    name: 'Piotr Wiśniewski',
                    photo: '👨‍🔧',
                    rating: 4.7,
                    experience: '7 lat',
                    trips: 2156,
                    languages: ['Polski', 'Rosyjski'],
                    favorite: false
                },
                car: {
                    model: 'Volkswagen Golf',
                    color: 'Biały',
                    plate: 'WA 54321',
                    year: 2019,
                    features: ['Klimatyzacja', 'Bluetooth']
                },
                location: 'Wola',
                eta: '5 min',
                estimatedCost: '30 zł',
                rating: 4.7,
                available: false,
                reviews: [
                    { user: 'Tomasz R.', rating: 4, comment: 'Dobry kierowca, ale spóźnił się.' },
                    { user: 'Ewa S.', rating: 5, comment: 'Profesjonalna obsługa.' },
                    { user: 'Karolina M.', rating: 1, comment: 'Jeździł jak wariat, nigdy więcej!' }
                ]
            },
            {
                id: 4,
                driver: {
                    name: 'Maria Dąbrowska',
                    photo: '👩‍🏫',
                    rating: 4.6,
                    experience: '4 lata',
                    trips: 1034,
                    languages: ['Polski', 'Francuski'],
                    favorite: false
                },
                car: {
                    model: 'Ford Focus',
                    color: 'Niebieski',
                    plate: 'WA 98765',
                    year: 2022,
                    features: ['Klimatyzacja', 'Apple CarPlay']
                },
                location: 'Mokotów',
                eta: '4 min',
                estimatedCost: '26 zł',
                rating: 4.6,
                available: true,
                reviews: [
                    { user: 'Robert Z.', rating: 4, comment: 'Przejazd przebiegł bez problemów.' },
                    { user: 'Joanna P.', rating: 5, comment: 'Kierowczyni bardzo pomocna.' }
                ]
            },
            {
                id: 5,
                driver: {
                    name: 'Tomasz Lewandowski',
                    photo: '👨‍🎓',
                    rating: 4.5,
                    experience: '2 lata',
                    trips: 567,
                    languages: ['Polski', 'Angielski', 'Hiszpański'],
                    favorite: false
                },
                car: {
                    model: 'Kia Ceed',
                    color: 'Czerwony',
                    plate: 'WA 11111',
                    year: 2023,
                    features: ['Klimatyzacja', 'Android Auto', 'Ładowarka bezprzewodowa']
                },
                location: 'Praga-Północ',
                eta: '6 min',
                estimatedCost: '32 zł',
                rating: 4.5,
                available: false,
                reviews: [
                    { user: 'Karolina M.', rating: 5, comment: 'Nowoczesny samochód, świetna muzyka!' },
                    { user: 'Adam K.', rating: 4, comment: 'Przyjazny kierowca, szybki przejazd.' }
                ]
            },
            {
                id: 6,
                driver: {
                    name: 'Ewa Szymankowska',
                    photo: '👩‍🎨',
                    rating: 4.9,
                    experience: '6 lat',
                    trips: 1789,
                    languages: ['Polski', 'Angielski', 'Włoski'],
                    favorite: false
                },
                car: {
                    model: 'Audi A4',
                    color: 'Szary',
                    plate: 'WA 22222',
                    year: 2021,
                    features: ['Klimatyzacja', 'Nawigacja GPS', 'Skórzane fotele']
                },
                location: 'Żoliborz',
                eta: '3 min',
                estimatedCost: '45 zł',
                rating: 4.9,
                available: true,
                reviews: [
                    { user: 'Michał W.', rating: 5, comment: 'Luksusowy samochód, doskonała obsługa!' },
                    { user: 'Natalia P.', rating: 5, comment: 'Kierowczyni zna wszystkie skróty!' }
                ]
            },
            {
                id: 7,
                driver: {
                    name: 'Robert Malinowski',
                    photo: '👨‍🚀',
                    rating: 4.4,
                    experience: '8 lat',
                    trips: 2341,
                    languages: ['Polski', 'Niemiecki', 'Czeski'],
                    favorite: false
                },
                car: {
                    model: 'Mercedes-Benz C-Class',
                    color: 'Czarny',
                    plate: 'WA 33333',
                    year: 2020,
                    features: ['Klimatyzacja', 'Automatyczna skrzynia biegów', 'Kamera cofania']
                },
                location: 'Ursynów',
                eta: '7 min',
                estimatedCost: '50 zł',
                rating: 4.4,
                available: true,
                reviews: [
                    { user: 'Barbara L.', rating: 4, comment: 'Solidny kierowca, bezpieczna jazda.' },
                    { user: 'Krzysztof M.', rating: 5, comment: 'Mercedes jak nowy, czystość idealna.' }
                ]
            },
            {
                id: 8,
                driver: {
                    name: 'Katarzyna Wojcik',
                    photo: '👩‍⚕️',
                    rating: 4.7,
                    experience: '5 lat',
                    trips: 1456,
                    languages: ['Polski', 'Angielski', 'Szwedzki'],
                    favorite: false
                },
                car: {
                    model: 'Volvo V60',
                    color: 'Biały',
                    plate: 'WA 44444',
                    year: 2022,
                    features: ['Klimatyzacja', 'Bezpieczeństwo Volvo', 'Ładowarka indukcyjna']
                },
                location: 'Bielany',
                eta: '5 min',
                estimatedCost: '42 zł',
                rating: 4.7,
                available: true,
                reviews: [
                    { user: 'Daniel K.', rating: 5, comment: 'Najbezpieczniejszy przejazd w życiu!' },
                    { user: 'Magdalena R.', rating: 4, comment: 'Spokojna jazda, polecam dla rodzin.' }
                ]
            },
            {
                id: 9,
                driver: {
                    name: 'Andrzej Kowalewski',
                    photo: '👨‍🏭',
                    rating: 4.3,
                    experience: '10 lat',
                    trips: 3124,
                    languages: ['Polski', 'Rosyjski', 'Ukraiński'],
                    favorite: false
                },
                car: {
                    model: 'Opel Astra',
                    color: 'Zielony',
                    plate: 'WA 55555',
                    year: 2018,
                    features: ['Klimatyzacja', 'Radio CD']
                },
                location: 'Targówek',
                eta: '8 min',
                estimatedCost: '24 zł',
                rating: 4.3,
                available: true,
                reviews: [
                    { user: 'Irena W.', rating: 4, comment: 'Doświadczony kierowca, zna Warszawę jak własną kieszeń.' },
                    { user: 'Stanisław M.', rating: 3, comment: 'Samochód trochę starszy, ale czysty.' }
                ]
            },
            {
                id: 10,
                driver: {
                    name: 'Monika Zalewska',
                    photo: '👩‍💻',
                    rating: 4.8,
                    experience: '3 lata',
                    trips: 789,
                    languages: ['Polski', 'Angielski', 'Japoński'],
                    favorite: false
                },
                car: {
                    model: 'Mazda 3',
                    color: 'Fioletowy',
                    plate: 'WA 66666',
                    year: 2023,
                    features: ['Klimatyzacja', 'Apple CarPlay', 'Android Auto', 'Panoramiczny dach']
                },
                location: 'Saska Kępa',
                eta: '4 min',
                estimatedCost: '38 zł',
                rating: 4.8,
                available: false,
                reviews: [
                    { user: 'Tomasz L.', rating: 5, comment: 'Najnowszy model Mazdy, fantastyczna!' },
                    { user: 'Agnieszka P.', rating: 5, comment: 'Kierowczyni zawsze uśmiechnięta i pomocna.' }
                ]
            },
            {
                id: 11,
                driver: {
                    name: 'Marcin Grabowski',
                    photo: '👨‍🍳',
                    rating: 4.6,
                    experience: '4 lata',
                    trips: 967,
                    languages: ['Polski', 'Angielski'],
                    favorite: false
                },
                car: {
                    model: 'Hyundai Tucson',
                    color: 'Czarny',
                    plate: 'WA 77777',
                    year: 2021,
                    features: ['Klimatyzacja', '4x4', 'Nawigacja GPS']
                },
                location: 'Wilanów',
                eta: '6 min',
                estimatedCost: '35 zł',
                rating: 4.6,
                available: true,
                reviews: [
                    { user: 'Paweł S.', rating: 5, comment: 'Świetny SUV na dłuższe trasy!' },
                    { user: 'Joanna K.', rating: 4, comment: 'Przyjazny kierowca, dobra rozmowa.' }
                ]
            },
            {
                id: 12,
                driver: {
                    name: 'Beata Michalska',
                    photo: '👩‍🎤',
                    rating: 4.9,
                    experience: '6 lat',
                    trips: 1876,
                    languages: ['Polski', 'Angielski', 'Francuski', 'Włoski'],
                    favorite: false
                },
                car: {
                    model: 'BMW 3 Series',
                    color: 'Granatowy',
                    plate: 'WA 88888',
                    year: 2022,
                    features: ['Klimatyzacja', 'Sportowy tryb jazdy', 'HiFi audio']
                },
                location: 'Ochota',
                eta: '3 min',
                estimatedCost: '55 zł',
                rating: 4.9,
                available: false,
                reviews: [
                    { user: 'Rafał Z.', rating: 5, comment: 'BMW premium, muzyka doskonała!' },
                    { user: 'Elżbieta M.', rating: 5, comment: 'Kierowczyni zna wszystkie najlepsze trasy.' }
                ]
            },
            {
                id: 13,
                driver: {
                    name: 'Krzysztof Jankowski',
                    photo: '👨‍⚖️',
                    rating: 3.8,
                    experience: '9 lat',
                    trips: 2897,
                    languages: ['Polski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Renault Megane',
                    color: 'Szary',
                    plate: 'WA 99999',
                    year: 2017,
                    features: ['Klimatyzacja', 'Radio']
                },
                location: 'Praga-Południe',
                eta: '9 min',
                estimatedCost: '22 zł',
                rating: 3.8,
                available: true,
                reviews: [
                    { user: 'Tomasz B.', rating: 2, comment: 'Kierowca jeździł agresywnie, bałem się o życie!' },
                    { user: 'Anna K.', rating: 4, comment: 'Przejazd OK, ale samochód stary.' },
                    { user: 'Marek P.', rating: 1, comment: 'Spóźnił się 20 minut, nieuprzejmy.' }
                ]
            },
            {
                id: 14,
                driver: {
                    name: 'Iwona Kowalczyk',
                    photo: '👩‍🌾',
                    rating: 4.2,
                    experience: '2 lata',
                    trips: 456,
                    languages: ['Polski', 'Angielski'],
                    favorite: false
                },
                car: {
                    model: 'Dacia Logan',
                    color: 'Biały',
                    plate: 'WA 00000',
                    year: 2020,
                    features: ['Klimatyzacja']
                },
                location: 'Ursus',
                eta: '7 min',
                estimatedCost: '20 zł',
                rating: 4.2,
                available: true,
                reviews: [
                    { user: 'Paweł M.', rating: 5, comment: 'Tania i punktualna!' },
                    { user: 'Katarzyna L.', rating: 3, comment: 'Samochód czysty, ale kierowczyni nie rozmawiała.' },
                    { user: 'Robert S.', rating: 2, comment: 'Zła nawigacja, jechaliśmy okrężną drogą.' }
                ]
            },
            {
                id: 15,
                driver: {
                    name: 'Damian Wojciechowski',
                    photo: '👨‍🎮',
                    rating: 4.1,
                    experience: '1 rok',
                    trips: 234,
                    languages: ['Polski', 'Angielski', 'Hiszpański'],
                    favorite: false
                },
                car: {
                    model: 'Seat Ibiza',
                    color: 'Czerwony',
                    plate: 'WA 11112',
                    year: 2021,
                    features: ['Klimatyzacja', 'Bluetooth']
                },
                location: 'Bemowo',
                eta: '6 min',
                estimatedCost: '24 zł',
                rating: 4.1,
                available: true,
                reviews: [
                    { user: 'Natalia W.', rating: 5, comment: 'Młody kierowca, ale bardzo uprzejmy!' },
                    { user: 'Michał K.', rating: 4, comment: 'Dobry początek, ale brakuje doświadczenia.' },
                    { user: 'Ewa T.', rating: 1, comment: 'Nie znał miasta, jechaliśmy w kółko.' }
                ]
            },
            {
                id: 16,
                driver: {
                    name: 'Barbara Nowakowska',
                    photo: '👩‍🏢',
                    rating: 3.5,
                    experience: '11 lat',
                    trips: 3456,
                    languages: ['Polski', 'Rosyjski'],
                    favorite: false
                },
                car: {
                    model: 'Fiat Tipo',
                    color: 'Niebieski',
                    plate: 'WA 22223',
                    year: 2016,
                    features: ['Klimatyzacja', 'Radio CD']
                },
                location: 'Włochy',
                eta: '10 min',
                estimatedCost: '21 zł',
                rating: 3.5,
                available: false,
                reviews: [
                    { user: 'Stanisław R.', rating: 2, comment: 'Samochód śmierdział papierosami, nieprzyjemnie.' },
                    { user: 'Maria Z.', rating: 4, comment: 'Doświadczona, ale samochód stary.' },
                    { user: 'Janusz K.', rating: 1, comment: 'Kierowczyni rozmawiała cały czas przez telefon.' }
                ]
            },
            {
                id: 17,
                driver: {
                    name: 'Łukasz Szymański',
                    photo: '👨‍🚒',
                    rating: 4.4,
                    experience: '5 lat',
                    trips: 1234,
                    languages: ['Polski', 'Angielski', 'Niemiecki'],
                    favorite: false
                },
                car: {
                    model: 'Peugeot 308',
                    color: 'Czarny',
                    plate: 'WA 33334',
                    year: 2019,
                    features: ['Klimatyzacja', 'Nawigacja GPS', 'Kamera cofania']
                },
                location: 'Rembertów',
                eta: '8 min',
                estimatedCost: '27 zł',
                rating: 4.4,
                available: true,
                reviews: [
                    { user: 'Agnieszka M.', rating: 5, comment: 'Bezpieczna jazda, polecam!' },
                    { user: 'Piotr W.', rating: 4, comment: 'Dobry kierowca, samochód wygodny.' },
                    { user: 'Karolina S.', rating: 2, comment: 'Spóźnił się, nie przeprosił.' }
                ]
            },
            {
                id: 18,
                driver: {
                    name: 'Magdalena Pawlak',
                    photo: '👩‍🎨',
                    rating: 4.0,
                    experience: '3 lata',
                    trips: 678,
                    languages: ['Polski', 'Angielski', 'Francuski'],
                    favorite: false
                },
                car: {
                    model: 'Citroen C4',
                    color: 'Srebrny',
                    plate: 'WA 44445',
                    year: 2020,
                    features: ['Klimatyzacja', 'Apple CarPlay']
                },
                location: 'Wawer',
                eta: '5 min',
                estimatedCost: '29 zł',
                rating: 4.0,
                available: true,
                reviews: [
                    { user: 'Tomasz L.', rating: 5, comment: 'Przyjemna podróż, dobra muzyka!' },
                    { user: 'Joanna P.', rating: 3, comment: 'Średnio, kierowczyni była nieuprzejma.' },
                    { user: 'Adam R.', rating: 1, comment: 'Samochód brudny, nie polecam.' }
                ]
            },
            {
                id: 19,
                driver: {
                    name: 'Grzegorz Malinowski',
                    photo: '👨‍🏭',
                    rating: 3.9,
                    experience: '7 lat',
                    trips: 1987,
                    languages: ['Polski', 'Ukraiński'],
                    favorite: false
                },
                car: {
                    model: 'Skoda Fabia',
                    color: 'Zielony',
                    plate: 'WA 55556',
                    year: 2018,
                    features: ['Klimatyzacja', 'Radio']
                },
                location: 'Targówek',
                eta: '11 min',
                estimatedCost: '23 zł',
                rating: 3.9,
                available: true,
                reviews: [
                    { user: 'Irena W.', rating: 4, comment: 'Tani przejazd, kierowca zna Warszawę.' },
                    { user: 'Marek S.', rating: 3, comment: 'OK, ale samochód mógłby być czystszy.' },
                    { user: 'Barbara K.', rating: 2, comment: 'Jeździł za szybko, stresujące.' }
                ]
            },
            {
                id: 20,
                driver: {
                    name: 'Patrycja Wojciechowska',
                    photo: '👩‍💼',
                    rating: 4.3,
                    experience: '4 lata',
                    trips: 987,
                    languages: ['Polski', 'Angielski', 'Włoski'],
                    favorite: false
                },
                car: {
                    model: 'Toyota Yaris',
                    color: 'Różowy',
                    plate: 'WA 66667',
                    year: 2022,
                    features: ['Klimatyzacja', 'Android Auto', 'Ładowarka bezprzewodowa']
                },
                location: 'Śródmieście',
                eta: '4 min',
                estimatedCost: '31 zł',
                rating: 4.3,
                available: true,
                reviews: [
                    { user: 'Daniel M.', rating: 5, comment: 'Śliczny samochodzik, kierowczyni super!' },
                    { user: 'Elżbieta R.', rating: 4, comment: 'Przyjemna podróż, polecam dla kobiet.' },
                    { user: 'Krzysztof Z.', rating: 2, comment: 'Za drogi jak na taki mały samochód.' }
                ]
            }
        ];
    }

    initializeRideTypes() {
        this.rideTypes = [
            { id: 'uberx', name: 'UberX', price: '25-35 zł', time: '2 min', icon: '🚗' },
            { id: 'uberxl', name: 'UberXL', price: '35-50 zł', time: '3 min', icon: '🚐' },
            { id: 'uberblack', name: 'UberBlack', price: '50-70 zł', time: '4 min', icon: '🚙' },
            { id: 'ubervan', name: 'UberVAN', price: '45-65 zł', time: '5 min', icon: '🚛' }
        ];
    }



    initializeNotifications() {
        this.notifications = [
            { message: 'Witaj w Taxi Świat! Gotowy na pierwszą podróż?', date: '2024-01-15' },
            { message: 'Nowa promocja: 10% zniżki na wszystkie przejazdy', date: '2024-01-14' },
            { message: 'Twoja opinia została dodana. Dziękujemy!', date: '2024-01-13' }
        ];
    }

    initializeSampleReviews() {
        this.reviews = [
            { id: 1, text: 'Świetna aplikacja, szybka obsługa! Kierowca był bardzo miły.', rating: 5, date: '2024-01-15', user: 'Anna M.' },
            { id: 2, text: 'Podróż przebiegła sprawnie, samochód czysty i wygodny.', rating: 4, date: '2024-01-14', user: 'Piotr K.' },
            { id: 3, text: 'Trochę długo czekałem na kierowcę, ale podróż była OK.', rating: 3, date: '2024-01-13', user: 'Marek L.' }
        ];
    }

    // Taxi management
    getTaxis() {
        return this.taxis;
    }

    getTaxiById(id) {
        return this.taxis.find(taxi => taxi.id === id);
    }

    // Ride types
    getRideTypes() {
        return this.rideTypes;
    }

    // Order management
    createOrder(pickup, destination, transportType = 'uberx') {
        const rideType = this.rideTypes.find(type => type.id === transportType) || this.rideTypes[0];
        const distance = Math.floor(Math.random() * 20) + 5; // 5-25 km
        const basePrice = parseInt(rideType.price.split('-')[0]);
        const price = Math.round(basePrice + (distance * 1.5));

        const order = {
            id: Date.now(),
            pickup: pickup,
            destination: destination,
            transportType: transportType,
            rideType: rideType,
            status: 'searching',
            driver: null,
            estimatedTime: Math.floor(distance * 2) + 5,
            distance: distance,
            price: price,
            createdAt: new Date(),
            progress: 0
        };

        this.orders.push(order);
        this.currentOrder = order;
        this.appStatus = 'order_created';

        // Simulate order progression
        this.simulateOrderProgress(order);

        return order;
    }

    simulateOrderProgress(order) {
        order.progress = 0;

        // Simulate driver assignment (2 seconds)
        setTimeout(() => {
            if (order.status === 'searching') {
                order.status = 'assigned';
                order.driver = this.getRandomDriver();
                order.progress = 25;
                this.appStatus = 'driver_assigned';
                if (typeof TaxiView !== 'undefined') {
                    TaxiView.updateOrderStatus(order);
                    TaxiView.updateProgressBar(25);
                }
            }
        }, 2000);

        // Simulate driver on the way (5 seconds)
        setTimeout(() => {
            if (order.status === 'assigned') {
                order.status = 'on_way';
                order.progress = 50;
                this.appStatus = 'driver_on_way';
                if (typeof TaxiView !== 'undefined') {
                    TaxiView.updateOrderStatus(order);
                    TaxiView.updateProgressBar(50);
                }
            }
        }, 5000);

        // Simulate arrival (8 seconds)
        setTimeout(() => {
            if (order.status === 'on_way') {
                order.status = 'arrived';
                order.progress = 75;
                this.appStatus = 'driver_arrived';
                if (typeof TaxiView !== 'undefined') {
                    TaxiView.updateOrderStatus(order);
                    TaxiView.updateProgressBar(75);
                }
            }
        }, 8000);

        // Simulate completion (10 seconds)
        setTimeout(() => {
            if (order.status === 'arrived') {
                order.status = 'completed';
                order.progress = 100;
                this.appStatus = 'order_completed';
                if (typeof TaxiView !== 'undefined') {
                    TaxiView.updateOrderStatus(order);
                    TaxiView.updateProgressBar(100);
                }
            }
        }, 10000);
    }

    getRandomDriver() {
        const drivers = [
            { name: 'Jan Kowalski', car: 'Toyota Corolla', rating: 4.8, photo: '👨‍💼' },
            { name: 'Anna Nowak', car: 'Skoda Octavia', rating: 4.9, photo: '👩‍💼' },
            { name: 'Piotr Wiśniewski', car: 'Volkswagen Golf', rating: 4.7, photo: '👨‍🔧' },
            { name: 'Maria Dąbrowska', car: 'Ford Focus', rating: 4.6, photo: '👩‍🏫' }
        ];
        return drivers[Math.floor(Math.random() * drivers.length)];
    }

    // Booking management
    bookTaxi(taxiId, bookingData) {
        const taxi = this.getTaxiById(taxiId);
        if (!taxi || !taxi.available) {
            return null;
        }

        const booking = {
            id: Date.now(),
            taxiId: taxiId,
            taxi: taxi,
            pickup: bookingData.pickup,
            dropoff: bookingData.dropoff,
            passengers: bookingData.passengers || 1,
            status: 'confirmed',
            date: new Date().toLocaleDateString('pl-PL'),
            price: taxi.estimatedCost
        };

        this.bookings.push(booking);
        return booking;
    }

    getBookings() {
        return this.bookings;
    }

    getCurrentRide() {
        return this.currentOrder;
    }

    // Reviews management
    addReview(text, rating) {
        const review = {
            id: Date.now(),
            text: text || '',
            rating: rating,
            date: new Date().toLocaleDateString('pl-PL'),
            timestamp: new Date(),
            user: this.currentUser ? this.currentUser.name : 'Anonimowy użytkownik'
        };

        this.reviews.push(review);
        this.reviews.sort((a, b) => b.timestamp - a.timestamp);
        return review;
    }

    getReviews() {
        return this.reviews;
    }

    getAllReviews() {
        return this.reviews;
    }

    getAverageRating() {
        if (this.reviews.length === 0) return 0;
        const sum = this.reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
        return (sum / this.reviews.length).toFixed(1);
    }

    submitRating(rideId, rating, comment) {
        // Add rating to reviews
        this.addReview(comment, rating);
        return true;
    }

    // User management
    loginUser(username, password) {
        // Simple mock login
        if (username && password) {
            this.currentUser = { name: username, email: username };
            return true;
        }
        return false;
    }

    // Notifications
    getNotifications() {
        return this.notifications;
    }

    // Discounts
    getAvailableDiscounts() {
        return this.discounts;
    }

    validateDiscountCode(code) {
        const discount = this.discounts.find(d => d.code.toUpperCase() === code.toUpperCase());
        return discount || null;
    }

    applyDiscountToPrice(basePrice, discountCode) {
        const discount = this.validateDiscountCode(discountCode);
        if (!discount) return basePrice;

        // Extract percentage from description (e.g., "10% zniżki" -> 10)
        const percentageMatch = discount.description.match(/(\d+)%/);
        if (!percentageMatch) return basePrice;

        const percentage = parseInt(percentageMatch[1]);
        const discountAmount = (basePrice * percentage) / 100;
        return Math.max(0, basePrice - discountAmount); // Ensure price doesn't go below 0
    }

    // Application status
    getAppStatus() {
        return this.appStatus;
    }

    setAppStatus(status) {
        this.appStatus = status;
    }

    getCurrentOrder() {
        return this.currentOrder;
    }

    // New features: Favorite drivers
    toggleFavoriteDriver(driverId) {
        const driver = this.taxis.find(t => t.id === driverId);
        if (driver) {
            driver.driver.favorite = !driver.driver.favorite;
            return driver.driver.favorite;
        }
        return false;
    }

    getFavoriteDrivers() {
        return this.taxis.filter(taxi => taxi.driver.favorite);
    }

    // Driver search and filtering
    searchDrivers(query) {
        const lowercaseQuery = query.toLowerCase();
        return this.taxis.filter(taxi =>
            taxi.driver.name.toLowerCase().includes(lowercaseQuery) ||
            taxi.car.model.toLowerCase().includes(lowercaseQuery) ||
            taxi.location.toLowerCase().includes(lowercaseQuery) ||
            taxi.driver.languages.some(lang => lang.toLowerCase().includes(lowercaseQuery))
        );
    }

    filterDrivers(filters) {
        return this.taxis.filter(taxi => {
            // Availability filter
            if (filters.availableOnly && !taxi.available) return false;

            // Rating filter
            if (filters.minRating && taxi.rating < filters.minRating) return false;

            // Price range filter
            if (filters.maxPrice) {
                const price = parseInt(taxi.estimatedCost);
                if (price > filters.maxPrice) return false;
            }

            // Car features filter
            if (filters.requiredFeatures && filters.requiredFeatures.length > 0) {
                const hasAllFeatures = filters.requiredFeatures.every(feature =>
                    taxi.car.features.includes(feature)
                );
                if (!hasAllFeatures) return false;
            }

            // Languages filter
            if (filters.requiredLanguages && filters.requiredLanguages.length > 0) {
                const hasLanguage = filters.requiredLanguages.some(language =>
                    taxi.driver.languages.includes(language)
                );
                if (!hasLanguage) return false;
            }

            return true;
        });
    }

    // Enhanced price calculation
    calculatePrice(pickup, dropoff, rideType = 'uberx', surgeMultiplier = 1) {
        // Calculate distance (simplified)
        const baseDistance = Math.floor(Math.random() * 20) + 5; // 5-25 km
        const basePrice = this.getBasePriceForRideType(rideType);
        const distanceCost = baseDistance * 1.5;
        const timeCost = baseDistance * 0.8; // Time-based cost
        const surgeCost = (basePrice + distanceCost + timeCost) * (surgeMultiplier - 1);

        return {
            basePrice: Math.round(basePrice),
            distanceCost: Math.round(distanceCost),
            timeCost: Math.round(timeCost),
            surgeCost: Math.round(surgeCost),
            total: Math.round((basePrice + distanceCost + timeCost) * surgeMultiplier),
            distance: baseDistance,
            estimatedTime: Math.floor(baseDistance * 2) + 5,
            surgeMultiplier: surgeMultiplier
        };
    }

    getBasePriceForRideType(rideType) {
        const prices = {
            'uberx': 15,
            'uberxl': 25,
            'uberblack': 40,
            'ubervan': 30
        };
        return prices[rideType] || 15;
    }

    // Surge pricing simulation
    getSurgeMultiplier(location, timeOfDay) {
        // Simulate surge pricing based on location and time
        const busyLocations = ['Centrum Warszawy', 'Śródmieście', 'Lotnisko Chopina'];
        const busyHours = [7, 8, 9, 17, 18, 19, 20]; // Morning and evening rush hours

        let multiplier = 1.0;

        if (busyLocations.includes(location)) multiplier += 0.3;
        if (busyHours.includes(timeOfDay)) multiplier += 0.4;

        // Random factor
        multiplier += Math.random() * 0.3;

        return Math.round(multiplier * 10) / 10;
    }

    // User profile management
    updateUserProfile(profileData) {
        if (!this.currentUser) return false;

        this.currentUser = { ...this.currentUser, ...profileData };
        return true;
    }

    getUserProfile() {
        return this.currentUser || null;
    }

    // Payment methods
    addPaymentMethod(method) {
        if (!this.currentUser) return false;

        if (!this.currentUser.paymentMethods) {
            this.currentUser.paymentMethods = [];
        }

        this.currentUser.paymentMethods.push({
            id: Date.now(),
            ...method,
            isDefault: this.currentUser.paymentMethods.length === 0
        });

        return true;
    }

    getPaymentMethods() {
        return this.currentUser?.paymentMethods || [];
    }

    setDefaultPaymentMethod(methodId) {
        if (!this.currentUser?.paymentMethods) return false;

        this.currentUser.paymentMethods.forEach(method => {
            method.isDefault = method.id === methodId;
        });

        return true;
    }

    // Enhanced booking with more details
    createDetailedBooking(taxiId, bookingData) {
        const taxi = this.getTaxiById(taxiId);
        if (!taxi || !taxi.available) {
            return null;
        }

        const pickup = bookingData.pickup;
        const dropoff = bookingData.dropoff;
        const priceDetails = this.calculatePrice(pickup, dropoff, bookingData.rideType);

        const booking = {
            id: Date.now(),
            taxiId: taxiId,
            taxi: taxi,
            pickup: pickup,
            dropoff: dropoff,
            passengers: bookingData.passengers || 1,
            rideType: bookingData.rideType || 'uberx',
            status: 'confirmed',
            date: new Date().toLocaleDateString('pl-PL'),
            time: new Date().toLocaleTimeString('pl-PL'),
            price: priceDetails.total,
            priceDetails: priceDetails,
            paymentMethod: bookingData.paymentMethod || 'card',
            specialRequests: bookingData.specialRequests || '',
            createdAt: new Date(),
            estimatedArrival: new Date(Date.now() + (priceDetails.estimatedTime * 60000)),
            tracking: {
                status: 'confirmed',
                progress: 0,
                currentLocation: taxi.location,
                eta: priceDetails.estimatedTime
            }
        };

        this.bookings.push(booking);
        return booking;
    }

    // Real-time tracking updates
    updateBookingStatus(bookingId, status, progress) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            booking.tracking.status = status;
            booking.tracking.progress = progress;

            // Update ETA based on progress
            if (progress < 100) {
                const remainingTime = Math.round((100 - progress) / 10); // Rough estimate
                booking.tracking.eta = remainingTime;
            }

            return true;
        }
        return false;
    }

    // Emergency contact
    addEmergencyContact(contact) {
        if (!this.currentUser) return false;

        if (!this.currentUser.emergencyContacts) {
            this.currentUser.emergencyContacts = [];
        }

        this.currentUser.emergencyContacts.push({
            id: Date.now(),
            ...contact
        });

        return true;
    }

    getEmergencyContacts() {
        return this.currentUser?.emergencyContacts || [];
    }

    // Trip statistics
    getTripStatistics() {
        const totalTrips = this.bookings.length;
        const totalSpent = this.bookings.reduce((sum, booking) => sum + booking.price, 0);
        const averageRating = this.bookings.length > 0 ?
            this.bookings.reduce((sum, booking) => sum + (booking.rating || 0), 0) / this.bookings.length : 0;

        const favoriteRideType = this.getMostFrequentRideType();

        return {
            totalTrips,
            totalSpent,
            averageRating: averageRating.toFixed(1),
            favoriteRideType,
            favoriteDrivers: this.getFavoriteDrivers().length,
            totalDistance: this.bookings.reduce((sum, booking) => sum + (booking.priceDetails?.distance || 0), 0)
        };
    }

    getMostFrequentRideType() {
        const rideTypeCount = {};
        this.bookings.forEach(booking => {
            rideTypeCount[booking.rideType] = (rideTypeCount[booking.rideType] || 0) + 1;
        });

        let mostFrequent = 'uberx';
        let maxCount = 0;

        for (const [type, count] of Object.entries(rideTypeCount)) {
            if (count > maxCount) {
                maxCount = count;
                mostFrequent = type;
            }
        }

        return mostFrequent;
    }

    // Driver availability simulation
    simulateDriverAvailability() {
        this.taxis.forEach(taxi => {
            // Randomly change availability (90% chance to stay available)
            taxi.available = Math.random() > 0.1;
        });
    }

    // Location-based features
    getNearbyDrivers(location, radius = 5) {
        // Simplified location-based filtering
        return this.taxis.filter(taxi => taxi.available).slice(0, 6);
    }

    // Promo codes
    applyPromoCode(code, price) {
        const validCodes = {
            'WELCOME10': 0.1,
            'FRIDAY15': 0.15,
            'STUDENT20': 0.2,
            'LOYALTY5': 0.05
        };

        const discount = validCodes[code.toUpperCase()];
        if (discount) {
            return {
                originalPrice: price,
                discountAmount: Math.round(price * discount),
                finalPrice: Math.round(price * (1 - discount)),
                discountPercent: discount * 100
            };
        }

        return null;
    }

    // Weather-based pricing (simplified)
    getWeatherMultiplier(weather) {
        const weatherMultipliers = {
            'clear': 1.0,
            'cloudy': 1.05,
            'rain': 1.15,
            'snow': 1.25,
            'storm': 1.3
        };

        return weatherMultipliers[weather] || 1.0;
    }
}

// Create global model instance
const Model = new TaxiModel();
