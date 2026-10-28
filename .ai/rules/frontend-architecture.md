# Reguły Architektury Frontend (React 19, Redux-Saga, SCSS Modules)

1. **Importy typów**: Zawsze używaj jawnego `import type { ... } from '...'`.
2. **Redux Toolkit & Redux-Saga**:
   - Podział domenowy w `src/redux/`: `user`, `course`.
   - Akcje definiowane przez `createAction`.
   - Zapytania sieciowe i efekty uboczne wyłącznie w sagach (`*.sagas.ts`) z użyciem `takeLatest`.
   - Odczyt ze store wyłącznie przez memoizowane selektory `reselect` (`*.selectors.ts`).
3. **Stylowanie Mobile-First & Tokeny SCSS**:
   - Najpierw pisz style bazowe dla ekranów mobilnych, następnie `@media (min-width: breakpoints.$desktop)`.
   - **Bezwzględny zakaz hardcodowania kolorów HEX**, fontów i wymiarów. Używaj wyłącznie zmiennych z:
     - `src/styles/colors.scss` (np. `$violet`, `$light-grey`, `$dark-background`),
     - `src/styles/breakpoints.scss` (`$mobile: 402px`, `$desktop: 768px`, `$template-desktop: 1280px`, `$max-page-width: 1440px`),
     - `src/styles/common.module.scss`.
   - Zachowaj integralność DOM: **nie wprowadzaj zbędnych elementów `<form>`** zaburzających układ Flexbox/CSS. Obsługę klawisza Enter wykonuj przez prop `onKeyDown` na komponencie `TextInput`.
4. **Responsywność w TSX**: Do warunkowego renderowania używaj hooka `useDeviceType()` (`const { isMobile } = useDeviceType()`) z `src/helpers/responsiveContainers.tsx`.
5. **Zarządzanie Tłumaczeniami**: Zawsze stosuj `useTranslate()` z Tolgee z obowiązkowym tekstem domyślnym (fallback):
   ```tsx
   const { t } = useTranslate();
   <h1>{t('main.title', 'SafeWeb Platform')}</h1>
   ```
