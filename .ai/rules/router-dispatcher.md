# Reguły Dyspozytora i Routingu Modeli (Gemini Flash vs Gemini Argon)

> [!IMPORTANT]
> W projekcie **SafeWeb nie korzystamy z modeli lokalnych (np. Ollama)**. Wszystkie zadania realizowane są wyłącznie w oparciu o dwa chmurowe poziomy modeli: **Gemini Flash** (zadania prostsze / wykonawcze) oraz **Gemini Argon** (architektura / zadania złożone).

Przed rozpoczęciem zadania lub powołaniem subagenta, Główny Orkiestrator ocenia złożoność podzadania i przypisuje je do odpowiedniego modelu.

---

## 1. Poziom Wykonawczy: Gemini Flash
**Oznaczenie routingu**: `[ROUTE: FLASH]`  
**Rola w subagentach**: `Model: "flash"`

Kieruj tutaj standardowe, prostsze i powtarzalne zadania implementacyjne oparte o gotową specyfikację:
- **Implementacja komponentów UI**: Kodowanie widoków i komponentów React 19 oraz stylów SCSS Modules, gdy istnieje już zatwierdzony plan `*_plan.md` oraz kontrakt TypeScript.
- **Implementacja backendu**: Kodowanie endpointów Express, serwisów Mongoose i walidacji Joi według gotowego kontraktu API.
- **Testy jednostkowe (TDD)**: Pisanie i uruchamianie testów Vitest (`npx vitest run ...`) dla modyfikowanych plików.
- **Zarządzanie tłumaczeniami**: Ekstrakcja tekstów z komponentów `.tsx` do plików w `translations/` (subagent `translations-specialist`).
- **Utrzymanie kodu**: Rozwiązywanie prostych błędów typowania TypeScript, lintera ESLint, formatowanie plików i parsowanie danych testowych JSON.

---

## 2. Poziom Architektoniczny: Gemini Argon
**Oznaczenie routingu**: `[ROUTE: ARGON]`  
**Rola w subagentach**: `Model: "inherit"` (lub model główny)

Kieruj tutaj wyłącznie zadania wymagające głębokiego wnioskowania, projektowania systemowego i podejmowania kluczowych decyzji:
- **Faza 1 (Research)**: Analiza makiet Figmy (`docs/figma-cache.yaml`), dokumentacji biznesowej w `safe-web-materials/` oraz stanu kodu źródłowego.
- **Faza 2 (SDD - Spec-Driven Development)**: Projektowanie architektury modułów, tworzenie planów `*_plan.md` oraz definiowanie fizycznych kontraktów TypeScript (`*.contract.ts`).
- **Bezpieczeństwo i Autoryzacja**: Projektowanie i weryfikacja przepływu JWT, ochrona zasobów `PlayerCourse` przed IDOR oraz wymuszanie statusu `404 Not Found`.
- **Złożony Debugging**: Diagnozowanie problemów przenikających wiele warstw monorepo (Frontend <-> Backend <-> Redux-Saga <-> Baza danych) lub sytuacji, w których model wykonawczy nie poradził sobie z naprawą błędu w testach.

---

## Zasada Egzekucji dla Orkiestratora
1. Nigdy nie używaj modelu **Gemini Argon** do generowania powtarzalnego boilerplate'u, mechanicznych plików tłumaczeń czy prostych stylów — oddeleguj to do subagenta pracującego na modelu **Gemini Flash**.
2. Zadania wieloetapowe dziel w sposób modułowy: architektura i kontrakt powstają na modelu **Gemini Argon**, a właściwa implementacja poszczególnych komponentów i testów jednostkowych zlecana jest do **Gemini Flash**.
