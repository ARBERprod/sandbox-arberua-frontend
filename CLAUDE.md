# ARBER UA Frontend

E-commerce frontend for ARBER Ukraine clothing brand (arber.ua).

## Tech Stack
- Next.js 14, React 18, TypeScript 5
- Redux Toolkit + RTK Query, next-redux-wrapper (SSR)
- SCSS Modules, Feature-Sliced Design architecture
- i18n: next-i18next (uk/ru/en)
- Testing: Jest, React Testing Library, MSW, Storybook 7

## Architecture
- **Feature-Sliced Design**: `pages/ → views/ → widgets/ → features/ → entities/ → shared/`
- Path alias: `@/*` → `./src/*`
- RTK Query endpoints injected via `rtkApi.injectEndpoints()` in each entity/feature
- Dynamic reducer injection via ReducerManager (async reducers per feature)
- Backend API base: `NEXT_PUBLIC_API_URL_V2` (v2, primary), requests via Axios with CSRF

## Commands
```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run lint:types   # TypeScript check (tsc --noEmit)
npm run test:unit    # Jest watch mode
```

## Key Conventions
- All code comments in English
- Barrel exports via index.ts in each module
- Fire-and-forget for external integrations (analytics, eSputnik) — never block UX
- Cart/wishlist data comes from session response, not separate endpoints

## Docs-as-Memory (протокол памяти)
- Долгосрочная память проекта: `docs/wiki/` — перед нетривиальной работой прочитай `docs/wiki/index.md` и связанные страницы. Приватный слой (перенесённая user-dir память + детальные заметки): `docs/_local/memory/` (индекс `MEMORY.md`).
- **Весь `docs/` в этом репо gitignored (локально, не в git)** — осознанное решение; docs-as-memory здесь = личная память рабочей копии, не shared-through-git.
- Нетривиальная задача → change-пакет `docs/changes/YYYY-MM-DD-<slug>/proposal.md` (шаблоны в `docs/changes/_TEMPLATE/`). Код — после ревью proposal.
- Планы → `docs/plans/` (исполняются `/plan` / `/orchestrate-plan`).
- **Writeback обязателен:** завершил работу → обнови `docs/wiki/` + index и `docs/_local/memory/` (`/wiki sync`), закрой change-папку.
- Статус-хедер для всех доков кроме `wiki/`, `_local/`, README: EN closed-set (Draft/Proposed/Accepted/In progress/Done/Deferred/Cancelled/Superseded/Rejected).
