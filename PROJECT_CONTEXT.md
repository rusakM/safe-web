# PROJECT_CONTEXT.md — Główny Kontekst Projektu SafeWeb dla Agenta AI

> [!IMPORTANT] Nie rozpoczynaj implementacji podczas samej inicjalizacji kontekstu, dopóki użytkownik nie zleci konkretnego zadania.

---

## 1. O projekcie

**SafeWeb** (KA220-VET) to wielojęzyczna platforma edukacyjna RWD (Responsive Web Design) oraz gra edukacyjna z zakresu cyberbezpieczeństwa (*Cyber-champion*). Celem projektu jest podnoszenie kompetencji cyfrowych oraz świadomości zagrożeń w sieci (zarówno technicznych, jak i społecznych/socjotechnicznych).

- **Języki platformy (8)**: Angielski (`en` - język źródłowy), Polski (`pl`), Duński (`da`), Grecki (`el`), Włoski (`it`), Portugalski (`pt`), Słoweński (`sl`), Szwedzki (`sv`).
- **Główne filary platformy**:
  1. **Uwierzytelnianie & Profil**: Rejestracja, Logowanie, Potwierdzenie kodem e-mail (z blokadą ponownego wysłania na 120s), profil użytkownika. W projekcie **nie ma podziału na role** — każdy użytkownik posiada standardowy profil uczestnika.
  2. **Kursy i 7 Modułów tematycznych**:
     - *Fake news (non-technical risks)*
     - *Cyberbullying (non-technical threats)*
     - *Internet scams*
     - *Online threats (technical threats)*
     - *Using the web safely*
     - i pozostałe obszary cyberbezpieczeństwa.
     - Każdy moduł zawiera ścieżkę heksagonalną (układ 4 góra / 3 dół), bibliografię oraz zestaw pytań i slajdów.
  3. **Typy pytań i slajdów edukacyjnych**:
     - `CONTENT_TEXT`: Teoria z tekstem i mediami (mobile: na górze; desktop: 40% szerokości po prawej stronie).
     - `CONTENT_VIDEO`: Slajd z materiałem wideo.
     - `SINGLE_CHOOSE`: Skala samooceny 1–10 (GameButton scale).
     - `SELECT_CORRECT_ANSWER`: Wybór binarny (2 opcje) z opcjonalnym zdjęciem pod pytaniem.
     - `MULTI_CHOOSE`: Wybór wielokrotny (4 opcje).
     - `FIT_TILES`: Łączenie w pary (6 lub 8 kafelków numerycznych).
     - `TRUE_FALSE`: Prawda / Fałsz z opcjonalnym zdjęciem.
  4. **Gra Cyber-champion (WP2)**: 24-godzinny turniej wiedzy z 2-godzinnym oknem na ukończenie poziomów, minigrami i rankingiem zespołów.

---

## 2. Stack Technologiczny

- **Monorepo**:
  - `package/backend/`: Node.js, Express 5, TypeScript, Mongoose (MongoDB), Redis, Joi, JWT, Nodemailer, Vitest.
  - `package/safe-web/`: React 19, Vite, TypeScript, Redux Toolkit, Redux-Saga (`takeLatest`), `reselect`, Tolgee (`@tolgee/react`), SCSS Modules, Vitest, `@testing-library/react`, `jsdom`.
- **Weryfikacja QA**: Vitest (TDD), live `curl` dla lokalnego API, headless Chromium dla zrzutów ekranu UI (`1920x1080` i `402x874`).

---

## 3. Aktualny Stan Zaawansowania (~40%)

- **Gotowe**:
  - Moduł uwierzytelniania: `SignIn`, `SignUp` (z automatycznym przenoszeniem e-maila z logowania), `Confirm` (z obsługą timera 120s). Obsługa klawisza Enter podpięta bezpośrednio do `onKeyDown` bez zaburzania struktury stylów.
  - Hub kursu: `CourseModulesPath` (układ 2 rzędów heksagonów 160px desktop / 130px mobile z efektem dark glass i ramką gradientową), `CourseHeader`, `CourseBibliography`.
  - Endpointy backendu: pobieranie listy kursów (`/api/course/list`), pobieranie kursu, postępu gracza i wysyłanie odpowiedzi (`/api/course/:courseId/answer`).
  - Slajd `CONTENT_TEXT`: wdrożony, ostylowany, zintegrowany z `QuestionRenderer`.
  - Pytanie `SINGLE_CHOOSE`: obsługa wyboru odpowiedzi podpięta pod akcję Reduksa `SEND_ANSWER_START`.
  - Środowisko testowe Vitest: w pełni skonfigurowane w obu paczkach (`package/backend` i `package/safe-web`).
- **W toku / Do zrobienia**:
  - Podpięcie logiki wyboru i testów TDD pod pozostałe pytania: `SELECT_CORRECT_ANSWER`, `MULTI_CHOOSE`, `FIT_TILES`, `TRUE_FALSE`.
  - Implementacja komponentu `CONTENT_VIDEO`.
  - Implementacja modułu gry turniejowej *Cyber-champion*.
  - Rozbudowa bazy testów regresyjnych.

---

## 4. Mapa Repozytorium

- `package/backend/` — Serwer Express + TypeScript:
  - `src/controllers/`: Cienkie kontrolery parsujące żądania.
  - `src/services/`: Logika biznesowa i operacje Mongoose (`Account`, `Course`, `PlayerCourse`, `Material`).
  - `src/models/`: Schematy Mongoose.
  - `tests/`: Testy jednostkowe i integracyjne Vitest.
  - `vitest.config.mts`: Konfiguracja Vitest dla środowiska Node.
- `package/safe-web/` — Aplikacja React 19 + Vite:
  - `src/pages/`: Widoki stron (`sign-in`, `sign-up`, `confirm`, `course`, itp.).
  - `src/page-components/questions/`: Komponenty pytań i `QuestionRenderer`.
  - `src/components/`: Reużywalne komponenty (`GameButton`, `TextInput`, `PrimaryButton` itp.).
  - `src/redux/`: Dział domenowy store (`user`, `course`) — akcje, sagas, reducers, selectors.
  - `src/styles/`: Zmienne SCSS (`colors.scss`, `breakpoints.scss`, `common.module.scss`).
  - `tests/`: Testy Vitest i `tests/setup.ts` (konfiguracja jsdom i mocków).
- `docs/` — Dokumentacja i cache:
  - `docs/figma-cache.yaml`: Cache identyfikatorów węzłów Figmy, palety kolorów i rozdzielczości.
- `translations/` — Słowniki tłumaczeń w 8 językach.
- `.ai/` (oraz symlink `.agents/`) — Konfiguracja AI, reguły, skille, profile agentów i bramka bezpieczeństwa hooks.

---

## 5. Źródła Wiedzy i Hierarchia Prawdy

1. **Wygląd UI**: Figma ([Link do projektu SafeWeb](https://www.figma.com/design/9fzBoQ6Gs5gIgBEr4MHByo/SafeWeb?node-id=0-1&t=aPw0dv7xBdQWdF9g-1)), cache w `docs/figma-cache.yaml` oraz zrzuty w `safe-web-materials/screenshoots/`.
2. **Wymagania biznesowe**: `safe-web-materials/SafeWeb - brief IT.md`, `prompt-utworzenie lekcji.md` oraz zadania w Trello.
3. **Architektura**: Kod źródłowy w `package/` oraz testy Vitest.
*W razie sprzeczności zawsze skonsultuj się z użytkownikiem.*

---

## 6. Workflow Realizacji Zadania (6 Faz: SDD + TDD)

1. **Faza 1 (Research)**: Analiza wymagań, dokumentacji, Figmy i kodu (subagent `research`).
2. **Faza 2 (SDD)**: Stworzenie planu `*_plan.md` oraz fizycznego kontraktu TypeScript (`*.contract.ts`) wg `.ai/skills/sdd-planning.md`.
3. **Faza 3 (Akceptacja)**: Zatwierdzenie planu i kontraktu przez użytkownika.
4. **Faza 4 (Implementacja & TDD)**:
   - Cykl **RED -> GREEN -> REFACTOR** wg `.ai/skills/tdd-vitest.md`.
   - Targeted testing: w trakcie prac uruchamiaj testy wyłącznie dla modyfikowanego pliku (`npx vitest run path/to/test.ts`).
   - Podział prac: `frontend-dev`, `backend-dev`, `translations-specialist`.
5. **Faza 5 (Weryfikacja)**: Subagent `tester` wykonuje pełną regresję (`npm test`), sprawdza API przez `curl` i weryfikuje zrzuty ekranu UI w headless Chromium.
6. **Faza 6 (Raport)**: Zwięzłe podsumowanie dla użytkownika i propozycja commita.

---

## 7. Podział Modeli LLM (Gemini Flash vs Gemini Argon)

W projekcie **nie korzystamy z modeli lokalnych**. Wszystkie zadania dzielimy pomiędzy dwa modele chmurowe:
- **Gemini Argon**: Faza 1 (Research), Faza 2 (tworzenie planu SDD i kontraktu TS), architektura, bezpieczeństwo (IDOR, JWT) oraz złożony debugging wielowarstwowy.
- **Gemini Flash**: Faza 4 (implementacja komponentów React i endpointów według specyfikacji), pisanie testów jednostkowych Vitest (TDD), obsługa tłumaczeń Tolgee oraz proste poprawki TypeScript/lintera.

---

## 8. Bezpieczeństwo i Zasady Operacyjne

1. **Ochrona IDOR**: Użytkownik ma dostęp wyłącznie do własnych postępów (`PlayerCourse`). Próba nieautoryzowanego dostępu **musi zwracać status 404**, a nie 403.
2. **Ochrona Sekretów**: Bezwzględny zakaz odczytu `.env*`, `*.pem`, `*.key`.
3. **Zakaz bezpośredniego CLI bazy danych**: Nie używaj `mongosh`, `mongo` ani `redis-cli`.
4. **Skrypty pomocnicze**: Twórz wyłącznie w `/tmp/` (np. `/tmp/helper.js`).
5. **Bramka bezpieczeństwa (`.ai/hooks.json`)**: Komendy odczytu i testów (`ls`, `grep`, `git status`, `vitest`) są automatycznie dozwolone; operacje niszczące (`git push`, `git reset`, `rm -rf`, `sudo`) są trwale zablokowane.
