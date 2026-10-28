# Skill: Zarządzanie Tłumaczeniami Tolgee (8 Języków SafeWeb)

Platforma SafeWeb obsługuje 8 języków:
- Angielski (`en` - język źródłowy)
- Polski (`pl`)
- Francuski (`fr`)
- Grecki (`el`)
- Włoski (`it`)
- Portugalski (`pt`)
- Słoweński (`sl`)
- Szwedzki (`sv`)

## 1. Użycie w Komponentach React
Zawsze stosuj hook `useTranslate()` z obowiązkowym tekstem domyślnym (fallback):
```tsx
const { t } = useTranslate();
<p>{t("main.signin", "Sign In")}</p>
<button>{t("main.back", "Back")}</button>
```

## 2. Konwencja Nazewnictwa Kluczy
- **Wspólne elementy UI**: `main.signin`, `main.signup`, `main.back`, `main.confirm`.
- **Moduły kursu**: `active.course.hub.module.title.1` ... `active.course.hub.module.title.7`.
- **Komponenty pytań**: `signin.confirm.header.enter-code`, `course.question.submit`.

## 3. Lokalizacja Słowników
- Tłumaczenia w repozytorium znajdują się w katalogu `docs/translations/`.
- Nowe teksty dodawaj z domyślnym wpisem w języku angielskim.
- Każdy page component posiada osobny plik csv z tłumaczeniami. Plik nosi nazwę komponentu oraz posiada dwie kolumny: key oraz en.
