# Reguły Globalne: TypeScript, Git, Bezpieczeństwo Środowiska i Skrypty

## 1. Czysty Kod i TypeScript
1. **Zero zgadywania**: Nigdy nie inferuj nazw modeli, pól w bazie danych, endpointów ani typów bez weryfikacji w plikach źródłowych.
2. **Silne typowanie**: Bezwzględny zakaz używania typu `any` (zawsze stosuj precyzyjne interfejsy lub `unknown`).
3. **Języki w projekcie**: Komentarze w kodzie i nazwy identyfikatorów po angielsku; dokumentacja, plany SDD i komunikacja z użytkownikiem po polsku.
4. **Reużywalność**: Wykorzystuj istniejące serwisy, hooki i komponenty bazowe zamiast tworzyć duplikaty.

## 2. Praca z Gitem i Zakres Zadań
1. **Weryfikacja stanu**: Zawsze przed rozpoczęciem pracy sprawdź `git status` i `git diff`.
2. **Zakaz operacji destrukcyjnych**: Bezwzględny zakaz używania `git reset --hard`, `git checkout -- .`, `git clean -fd`, `git commit` oraz `git push` bez wyraźnego polecenia użytkownika.
3. **Ścisły zakres**: Pracuj wyłącznie nad plikami powiązanymi z bieżącym zadaniem. Problemy poboczne zgłaszaj w raporcie końcowym.

## 3. Ochrona Sekretów i Zakaz Bezpośredniego Dostępu do Bazy Danych
1. **Zakaz odczytu `.env`**: Bezwzględny zakaz odczytywania, wyświetlania (`cat`, `head`, `grep`) i modyfikowania plików `.env`, `.env.*`, `*.pem`, `*.key` oraz jakichkolwiek plików z poświadczeniami. Zakładaj, że konfiguracja środowiskowa działa poprawnie.
2. **Zakaz używania `docker exec` i CLI baz danych**: Bezwzględny zakaz wchodzenia do kontenerów (`docker exec`) oraz uruchamiania bezpośrednich klientów bazodanowych (`mongo`, `mongosh`, `redis-cli` itp.). Wszelkie operacje na danych muszą odbywać się wyłącznie przez kod aplikacji (modele Mongoose, serwisy) lub zatwierdzone przez użytkownika skrypty migracyjne/seedujące.

## 4. Polityka Fail-Fast dla Zewnętrznych API i Narzędzi
1. **Natychmiastowy STOP przy błędach autoryzacji i limitów**: Jeśli serwer MCP (Figma, Trello) lub zewnętrzne API zwróci błąd `401 Unauthorized`, `403 Forbidden`, `429 Too Many Requests` (wyczerpany limit zapytań) lub timeout, **NATYCHMIAST PRZERWIJ PRACĘ** i poinformuj użytkownika.
2. **Fallback do lokalnego cache'u**: Jeśli API Figmy jest niedostępne, sprawdź lokalny plik `docs/figma-cache.yaml` oraz katalog zrzutów ekranu w materiałach. Jeśli brakuje tam danych — zatrzymaj się i zapytaj użytkownika.
3. **Zakaz nieautoryzowanego ruchu sieciowego**: Nie łącz się z nieznanymi zewnętrznymi hostami. Narzędzie `curl` oraz headless Chromium są natomiast dozwolone i wymagane do testowania lokalnie uruchomionego backendu i frontendu (`http://localhost:3000`).

## 5. Zasady Tworzenia Tymczasowych Skryptów Pomocniczych (Python / Node.js)
1. **Dozwolone zastosowanie**: Możesz pisać jednorazowe skrypty pomocnicze do deterministycznej obróbki lokalnych danych (np. parsowanie kursów do JSON, ekstrakcja tłumaczeń dla Tolgee).
2. **Izolacja w `/tmp/`**: Wszystkie tymczasowe skrypty pomocnicze muszą być tworzone i uruchamiane **wyłącznie w katalogu `/tmp/`** (np. `/tmp/parse_courses.js`). Bezwzględny zakaz zaśmiecania repozytorium roboczymi skryptami.
3. **Praca offline**: Skrypty pomocnicze mogą czytać i zapisywać wyłącznie lokalne pliki projektu — nie mogą wykonywać żadnych zewnętrznych połączeń sieciowych.
