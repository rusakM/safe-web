# Skill: Test-Driven Development (Vitest) i Optymalizacja I/O

Rozwój kodu przebiega w ścisłym cyklu **TDD (RED -> GREEN -> REFACTOR)** przy użyciu **Vitest**.

## 1. Cykl Pracy
1. **RED**: Napisz test definiujący wymagane zachowanie na podstawie kontraktu/specyfikacji i upewnij się, że test oblewa z właściwego powodu.
2. **GREEN**: Napisz minimalny kod produkcyjny niezbędny do przejścia testu.
3. **REFACTOR**: Uporządkuj kod, typy i style, utrzymując zielony wynik testu.

## 2. Optymalizacja I/O i Czasu (Targeted Testing)
Aby unikać niepotrzebnego obciążenia dysku i zapewnić natychmiastową pętlę zwrotną:
- **W trakcie implementacji (Faza 4)**: Uruchamiaj Vitest **wyłącznie dla aktualnie edytowanego pliku testowego**:
  ```bash
  # Backend:
  npx vitest run tests/services/course.service.test.ts
  # Frontend:
  npx vitest run tests/page-components/questions/multi-choose.test.tsx
  ```
  Nie uruchamiaj pełnego zestawu testów projektu po każdej pojedynczej linijce kodu.
- **W fazie weryfikacji (Faza 5 — Tester)**: Dopiero po zakończeniu całości prac uruchom pełną regresję (`npm test` w obu paczkach) oraz pełny `typecheck`.

## 3. Jakość Testów i Regresja
- Testuj zachowania biznesowe i kontrakty (odpowiedzi API, status 404 przy braku dostępu, interakcje użytkownika w UI, wywołania akcji Reduxa), a nie wewnętrzne detale implementacji.
- **Zasada bezpieczeństwa**: Nigdy nie usuwaj i nie osłabiaj asercji w testach wyłącznie po to, aby uzyskać zielony wynik.
