# Taxi Świat - Aplikacja do Zamawiania Taksówek             Autor: Sebastian Woźniak 159851

Aplikacja webowa do zamawiania taksówek w stylu Uber, stworzona bez użycia backendu. Umożliwia użytkownikom przeglądanie dostępnych taksówek, sprawdzanie opinii klientów oraz zamawianie przejazdów.

## 🚀 Funkcje

### Główne Funkcjonalności
- **Przeglądanie taksówek**: Wyświetlanie listy dostępnych taksówek z informacjami o kierowcach, samochodach i cenach
- **Mapa lokalizacji**: Interaktywna mapa pokazująca pozycje wszystkich taksówek w czasie rzeczywistym
- **Opinie klientów**: Szczegółowe recenzje użytkowników dla każdej taksówki
- **System rezerwacji**: Możliwość zamówienia taksówki z wybranymi parametrami
- **Śledzenie przejazdu**: Monitorowanie statusu zamówienia w czasie rzeczywistym
- **System oceniania**: Możliwość oceniania przejazdów po zakończeniu
- **Historia zamówień**: Przeglądanie poprzednich przejazdów
- **Powiadomienia**: System powiadomień o statusie zamówień
- **Zniżki i promocje**: Dostępne kody rabatowe i promocje

### Rodzaje Przejazdów
- **UberX**: Tanie i wygodne (25-35 zł, 2 min)
- **UberXL**: Więcej miejsca (35-50 zł, 3 min)
- **UberBlack**: Luksusowe auto (50-70 zł, 4 min)
- **UberVAN**: Dla większej grupy (45-65 zł, 5 min)

## 🛠️ Technologie

- **HTML5**: Struktura aplikacji
- **CSS3**: Stylizacja i responsywny design
- **JavaScript (ES6+)**: Logika aplikacji
- **Leaflet.js**: Biblioteka do obsługi mapy
- **MVC Pattern**: Architektura aplikacji (Model-View-Controller)

## 📁 Struktura Projektu

```
TaxiWorld/
├── index.html          # Główny plik HTML aplikacji
├── model.js           # Model danych (taksówki, zamówienia, użytkownicy)
├── view.js            # Widok (renderowanie interfejsu użytkownika)
├── controller.js      # Kontroler (obsługa zdarzeń i logika biznesowa)
├── map.js             # Moduł mapy z lokalizacjami taksówek
├── reviews.js         # Moduł obsługi opinii klientów
└── README.md          # Ten plik
```

## 🚀 Instalacja i Uruchomienie

1. **Pobierz pliki projektu**:
   ```bash
   git clone <repository-url>
   cd TaxiWorld
   ```

2. **Uruchom aplikację**:
   - Otwórz plik `index.html` w przeglądarce internetowej
   - Aplikacja działa całkowicie lokalnie bez serwera

## 📱 Jak Korzystać

### Zamawianie Taksówki
1. Wprowadź miejsce odbioru i docelowe
2. Wybierz rodzaj przejazdu (UberX, UberXL, etc.)
3. Przejrzyj dostępne taksówki na liście lub mapie
4. Sprawdź opinie klientów dla wybranej taksówki
5. Kliknij "Zamów" aby zarezerwować taksówkę
6. Wybierz metodę płatności
7. Śledź status zamówienia w czasie rzeczywistym

### Sprawdzanie Opinii
- W kartach taksówek widoczne są wszystkie opinie klientów
- Kliknij w sekcję opinii aby zobaczyć szczegóły
- Opinie zawierają ocenę w gwiazdkach, komentarz i datę

### Korzystanie z Mapy
- Mapa pokazuje lokalizacje wszystkich taksówek
- Ikony oznaczają status: 🚕 dostępna, 🚗 w ruchu, 🚙 zajęta, ⛔ niedostępna
- Kliknij w znacznik taksówki aby zobaczyć szczegóły i zamówić

## 🎨 Architektura MVC

### Model (model.js)
- Zarządza danymi aplikacji
- Przechowuje informacje o taksówkach, zamówieniach, użytkownikach
- Obsługuje logikę biznesową (rezerwacje, płatności, zniżki)

### Widok (view.js)
- Renderuje interfejs użytkownika
- Wyświetla taksówki, mapę, modali z opiniami
- Obsługuje interakcje użytkownika z UI

### Kontroler (controller.js)
- Łączy Model z Widokiem
- Obsługuje zdarzenia użytkownika
- Zarządza przepływem danych między komponentami

## 📊 Dane Testowe

Aplikacja zawiera przykładowe dane:
- **15 taksówek** z różnymi kierowcami i samochodami
- **Opinie klientów** dla każdej taksówki
- **System zniżek** z różnymi kodami rabatowymi
- **Historia zamówień** i powiadomienia

## 🔧 Rozszerzenia

Możliwe rozszerzenia aplikacji:
- Integracja z prawdziwym API map (Google Maps, MapBox)
- System płatności online
- Rejestracja i logowanie użytkowników
- Powiadomienia push
- Integracja z GPS urządzenia
- Wielojęzyczność
- Tryb ciemny
