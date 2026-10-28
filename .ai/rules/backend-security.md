# Reguły Architektury Backend i Bezpieczeństwa (Express, Mongoose, IDOR)

1. **Podział warstw**:
   - **Cienkie kontrolery (`src/controllers/`)**: Tylko parsowanie requestu HTTP, weryfikacja JWT i wywołanie odpowiedniego serwisu.
   - **Grube serwisy (`src/services/`)**: Cała logika biznesowa, operacje na modelach Mongoose (`Account`, `Course`, `PlayerCourse`, `Material`), kalkulacje punktów za pytania i walidacja odpowiedzi.
2. **Ochrona przed IDOR (Insecure Direct Object References)**:
   - W operacjach na postępach kursów (`PlayerCourse`, wysyłanie odpowiedzi `sendAnswer`):
     - Użytkownik ma dostęp **wyłącznie** do własnych rekordów (`playerId === req.user.id`).
     - Zabronione jest pobieranie lub modyfikowanie wyników i odpowiedzi innego użytkownika.
3. **Zapobieganie enumeracji ID (Data Leak)**:
   - Próba dostępu do zasobu bez uprawnień **musi zwracać status 404 (`RESOURCE_NOT_FOUND`)**, a NIE `403 Forbidden`.
4. **Walidacja danych wejściowych**:
   - Wszystkie parametry i ciała żądań (POST/PUT) muszą być walidowane za pomocą schematów `Joi` przed przekazaniem do logiki serwisowej.
