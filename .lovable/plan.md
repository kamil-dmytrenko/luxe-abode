
# Klimat — zunifikowane sterowanie temperaturą

Zamiast dwóch osobnych ekranów (Ogrzewanie + Klimatyzacja) jedna zakładka **Klimat**, gdzie w każdym pomieszczeniu ustawiasz **jedną temperaturę docelową**, a system sam decyduje czy użyć **podłogówki** (zima) czy **klimatyzacji** (lato) — albo obu, gdy trzeba szybko schłodzić/ogrzać.

## Koncepcja UX

Każde pomieszczenie = jedna karta strefy z:
- **Jedną zadaną temperaturą** (duży, centralny dial 16–28°C, krok 0,5°)
- **Aktualną temperaturą + wilgotnością**
- **Aktywnym źródłem** (badge): „Podłogówka grzeje", „Klimatyzacja chłodzi", „Komfort — bezczynny", „Hybrydowo (boost)"
- **Trybem strefy**: `Auto` (system decyduje) · `Komfort` · `Eco` · `Boost` · `Off`
- **Harmonogramem dziennym** (mini timeline: noc 20°, rano 22°, dzień 21°, wieczór 22°)

## Logika auto-przełączania (klient, mock)

```
delta = target - current
sezon = global (Lato | Zima | Auto wg daty)

jeśli delta > +0.3  → grzanie (podłogówka jeśli dostępna, inaczej grzejnik)
jeśli delta < -0.3  → chłodzenie (klimatyzacja)
|delta| ≤ 0.3       → idle (komfort)
tryb Boost           → włącz oba źródła równolegle do osiągnięcia celu
tryb Eco             → poszerz histerezę do ±1° i ogranicz moc
```

Sezon globalny przełączany w pasku nad listą (Auto/Lato/Zima) — wymusza preferencję źródła gdy delta mała.

## Ekstra funkcje (żeby było ciekawie)

1. **Globalny pasek stanu domu** — średnia temperatura, łączny pobór mocy klimatu (kW), CO₂ dzisiaj, dominujący tryb (np. „Dom chłodzi — 1.2 kW")
2. **Globalne presety** — `Wszędzie 21°`, `Tryb nocny`, `Wyjście (Eco)`, `Wracam za 30 min` (boost stref użytkowanych)
3. **Quick toggle sezonu** Auto/Lato/Zima w nagłówku
4. **Karta strefy z gradientem reaktywnym** — chłodny niebieski gdy AC, ciepły bursztyn gdy podłogówka, neutralny gdy idle, animowane „oddychanie" gdy aktywne
5. **Wskaźnik źródła** z mini-ikonami (fale ciepła ↑ z dołu = podłogówka; płatek + strzałki = AC) i ETA do celu („~12 min")
6. **Harmonogram per strefa** — 4 punkty dnia, przeciągalne (suwak temperatur), domyślne presety
7. **Wilgotność i jakość** — gdy AC w trybie Dry pokazujemy spadek wilgotności
8. **Powiadomienia kontekstowe** w karcie: „Otwarte okno — wstrzymano grzanie 10 min" (jeśli zaciemniona automatyzacja aktywna)
9. **Tryb wakacyjny** — globalnie utrzymuj 16° (zima) / wyłącz AC (lato), jedno wciśnięcie
10. **Sub-ekran szczegółów strefy** (klik w kartę) — historia 24h (line chart: target vs current vs outdoor), zużycie energii klimatu strefy, ustawienia źródeł (wybór: tylko podłogówka / tylko AC / hybryda)

## Zmiany w kodzie

### Dane (`src/lib/mock-data.ts`)
- Wprowadzić nowy typ `ClimateZone` zastępujący `Heating` + `AC` z perspektywy UI:
  ```ts
  type ClimateZone = {
    id; room; current; humidity; target;
    mode: "auto" | "comfort" | "eco" | "boost" | "off";
    hasUnderfloor: boolean;
    hasAC: boolean;
    activeSource: "heating" | "cooling" | "idle" | "hybrid"; // wyliczane
    schedule: { time: string; target: number }[]; // 4 punkty
  };
  ```
- Wygenerować `climateZones` na bazie istniejących `heating`/`acs` (Salon/Sypialnia/Gabinet mają AC, wszystkie mają podłogówkę).
- Zostawić stare `heating`/`acs` (używane w widgetach `TempWidget`) lub zaktualizować widgety.

### Nowy ekran `src/pages/Climate.tsx` (przepisany)
- Nagłówek: sezon (Auto/Lato/Zima) + globalny pasek stanu + presety globalne
- Grid kart stref z dialem, statusem źródła, trybem, mini-harmonogramem
- Klik karty → otwiera `Sheet`/`Dialog` z detalami strefy (chart 24h, wybór źródeł, pełny harmonogram)

### Routing (`src/App.tsx`)
- Zostaje `/climate` jako jedyna zakładka
- Usunąć route `/heating` (lub przekierować na `/climate`)

### Nawigacja (`src/components/Layout.tsx`)
- Usunąć osobne wpisy Ogrzewanie/Klimatyzacja → jeden wpis **Klimat** (ikona np. `Thermometer` lub `Wind`/`Flame` kompozycja)

### Widget na dashboardzie (`src/components/widgets/TempWidget.tsx` + rejestr)
- Po kliknięciu prowadzi do `/climate` (już prowadzi do `/heating` — zmienić w `widgets-registry`)
- Pokazuje zadaną temp i aktywne źródło zamiast samej wilgotności

### Usunięcia
- `src/pages/Heating.tsx` — usunąć
- Stary kod AC w `Climate.tsx` — zastąpić nową implementacją

## Co zostaje bez zmian
- Reszta aplikacji (Rooms, Lights, Blinds, Scenes, Alarm, Cameras, Energy, Automations, Settings, Intercom, Dashboard edycja)
- Design system, tokeny kolorów, glass cards
- Mock-only, brak backendu
