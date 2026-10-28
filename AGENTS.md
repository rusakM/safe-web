# AGENTS.md — Globalna Instrukcja Operacyjna dla Agentów AI w SafeWeb

> [!IMPORTANT]
> Przed rozpoczęciem pracy nad jakimkolwiek zadaniem w projekcie SafeWeb:
> 1. Wczytaj główny kontekst z pliku [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md).
> 2. Zapoznaj się z odpowiednimi regułami w [`.ai/rules/`](./.ai/rules/) i umiejętnościami w [`.ai/skills/`](./.ai/skills/).
> 3. Pracuj ściśle w 6-fazowym procesie **Spec-Driven Development (SDD)** oraz **Test-Driven Development (TDD z Vitest)**.
> 4. Nie rozpoczynaj implementacji kodu produkcyjnego przed zatwierdzeniem planu przez użytkownika.

## Szybka Mapa Zasobów
- **Główny kontekst**: [`PROJECT_CONTEXT.md`](./PROJECT_CONTEXT.md)
- **Makiety i tokeny UI**: [`docs/figma-cache.yaml`](./docs/figma-cache.yaml)
- **Tłumaczenia (8 języków)**: [`translations/`](./translations/)
- **Bramka bezpieczeństwa i uprawnienia**: [`.ai/hooks.json`](./.ai/hooks.json) i [`.ai/scripts/command-gate.js`](./.ai/scripts/command-gate.js)

## Subagenci i Modele
- **Gemini Argon**: Główny Orkiestrator oraz zadania architektoniczne, Faza 1 (Research) i Faza 2 (SDD), bezpieczeństwo danych.
- **Gemini Flash**: Zadania wykonawcze, implementacja komponentów UI, serwisów, testów jednostkowych Vitest i tłumaczeń.
- Subagenci:
  - `research`: Badacz kodu, dokumentacji i Figmy (`model: argon`, [`.ai/agents/research.md`](./.ai/agents/research.md))
  - `frontend-dev`: Programista React 19 / Redux-Saga / SCSS (`model: flash`, [`.ai/agents/frontend-dev.md`](./.ai/agents/frontend-dev.md))
  - `backend-dev`: Programista Express / Mongoose / Security (`model: flash`, [`.ai/agents/backend-dev.md`](./.ai/agents/backend-dev.md))
  - `tester`: Inżynier QA Vitest / curl / Chromium Visual QA (`model: flash`, [`.ai/agents/tester.md`](./.ai/agents/tester.md))
  - `translations-specialist`: Specjalista ds. Tolgee (`model: flash`, [`.ai/agents/translations-specialist.md`](./.ai/agents/translations-specialist.md))
