# Skill: Weryfikacja Live Backend API (curl) oraz UI (Headless Chromium)

W Fazie 5 (Weryfikacja) oprócz testów automatycznych Vitest weryfikujemy rzeczywiste działanie serwerów na `localhost`.

## Część 1: Weryfikacja Backend API przez `curl`
Każdy nowy lub zmodyfikowany endpoint Express musi zostać sprawdzony „na żywo” przeciwko lokalnemu serwerowi backendu (`http://localhost:8082`):
1. **Bezpieczeństwo**: Używaj `curl` wyłącznie do adresów lokalnych (`localhost` / `127.0.0.1`). Pliki tymczasowe zapisuj wyłącznie w `/tmp/`.
2. **Obowiązkowe scenariusze**:
   - **Happy Path (`200 OK` / `201 Created`)**: Prawidłowe wywołanie z weryfikacją poprawności schematu JSON.
   - **Walidacja danych (`400 Bad Request`)**: Próba wysłania niekompletnego payloadu.
   - **Brak autoryzacji (`401 Unauthorized`)**: Wywołanie chronionego endpointu bez nagłówka `Authorization`.
   - **Ochrona zasobów (`404 Not Found`)**: Próba odpytania o zasób nieprzypisany do danego konta.

## Część 2: Weryfikacja Wizualna UI w Headless Chromium
Każdy nowy ekran lub komponent pytań musi zostać zweryfikowany wizualnie w przeglądarce:
1. **Lokalizacja zrzutów**: Twórz i zapisuj zrzuty ekranu wyłącznie w `/tmp/ai-screenshots/` (`mkdir -p /tmp/ai-screenshots`).
2. **Procedura testowa**:
   - Uruchom Chrome w trybie headless:
     ```bash
     google-chrome --headless --no-sandbox --screenshot=/tmp/ai-screenshots/desktop.png --window-size=1920,1080 http://localhost:3000/course/1
     google-chrome --headless --no-sandbox --screenshot=/tmp/ai-screenshots/mobile.png --window-size=402,874 http://localhost:3000/course/1
     ```
   - Adres url do frontendu zawsze jest `http://localhost:3000`.
   - Endpointy logowania i rejestracji nowego użytkownika na developerskim środowisku zasze zwracają w odpowiedzi kod do zatwierdzenia logowania, skorzystaj z devtools aby odczytywać kod i móc zalogować się do platformy.
   - Porównaj zrzuty z makietami w Figmie i wytycznymi w `docs/figma-cache.yaml`:
     - Brak uciętych tekstów, nakładających się kontenerów flex i rozjechanych marginesów.
     - Sprawdź brak błędów wykonania w konsoli przeglądarki.
3. **Sprzątanie**: Po zakończeniu weryfikacji usuń pliki tymczasowe z `/tmp/ai-screenshots/`.
