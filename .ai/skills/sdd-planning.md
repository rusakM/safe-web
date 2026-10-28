# Skill: Spec-Driven Development (Tworzenie Specyfikacji i Kontraktów)

Podczas Fazy 2 (SDD) przed napisaniem jakiegokolwiek kodu implementacyjnego przygotuj formalną specyfikację zadania:

## 1. Artefakt Planu (`*_plan.md`)
- **Cel biznesowy i zakres**: Na podstawie wymagań, dokumentacji w `safe-web-materials` oraz makiet Figmy.
- **Architektura UI**: Drzewo komponentów, routing, stany *Loading / Empty / Error / Success*, zachowanie responsywne (Mobile `402x874` vs Desktop `1920x1080`), mapowanie na tokeny SCSS.
- **Polityka bezpieczeństwa**: Weryfikacja JWT, ochrona przed IDOR (wymuszony status 404).
- **Plan testów Vitest**: Wykaz przypadków testowych (happy path, walidacje, edge-cases).
- **Propozycja routingu modeli**: Wskazanie, które kroki planu wykona `FLASH` (implementacja komponentów, serwisów, testy), a które `ARGON` (architektura, kontrakty, logika bezpieczeństwa).

## 2. Fizyczny Kontrakt TypeScript (`*.contract.ts`)
- Jeśli zadanie obejmuje komunikację Frontend <-> Backend lub nową strukturę stanu, zdefiniuj precyzyjne interfejsy TypeScript (payloady requestów, format odpowiedzi, kody błędów).
- Po zatwierdzeniu planu przez użytkownika (Faza 3), jako pierwszy krok implementacji utwórz fizyczny plik z typami, aby kod backendu i frontendu importował dokładnie te same definicje bez ryzyka rozbieżności.
