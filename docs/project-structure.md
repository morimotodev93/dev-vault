# Project Structure

## Overview

このプロジェクトは、Next.js アプリケーションとして構成され、UI を再利用可能なコンポーネント単位で整理する方針です。

主な目的は、以下の通りです。

- ページを構造的に管理する
- UI を再利用しやすい粒度で分割する
- 機能ごとに責務を分ける
- 今後の拡張をしやすい構成にする

---

## Top Page

### Page Directory

```text
app/
├── page.tsx
├── page.module.css
└── components/
    └── page/
        ├── Hero/
        ├── QuickStats/
        ├── RecentSnippets/
        ├── CategorySection/
        ├── FavoriteSection/
        └── RecentActivity/
```

### Page Structure

```text
Header

Hero
├── Title
├── Description
├── Search
└── New Snippet Button

Quick Stats
├── Snippets
├── Components
├── Favorites
└── Recent

Recent Snippets
└── Card × N

Categories
├── JavaScript
├── React
├── Next.js
├── CSS
├── TypeScript
└── Python

Favorites
└── Favorite Card

Recent Activity
├── Updated ○○
├── Created ○○
└── Added Memo

Footer
```

---

## UI Component Structure

### Directory

```text
components/
├── primitives/
│   ├── Box/
│   ├── Button/
│   ├── Container/
│   ├── Grid/
│   ├── Heading/
│   ├── Icon/
│   ├── Image/
│   ├── Link/
│   ├── Spacer/
│   ├── Stack/
│   ├── Surface/
│   ├── Text/
│   └── index.ts
│
├── common/
│   ├── EmptyState/
│   ├── Loading/
│   ├── SearchInput/
│   ├── Tag/
│   └── Pagination/
│
├── layout/
│   ├── Header/
│   ├── Footer/
│   ├── Sidebar/
│   └── MainLayout/
│
└── features/
    ├── snippets/
    ├── notes/
    ├── tags/
    └── favorites/
```

### Component Layer Responsibilities

- `primitives`
  - 最小単位の再利用可能な UI 部品
  - 例: Box, Button, Text, Heading

- `common`
  - 複数の primitives を組み合わせた共通パターン
  - 例: SearchInput, EmptyState, Tag

- `layout`
  - ページ構造やレイアウトを担う部品
  - 例: Header, Footer, Sidebar, MainLayout

- `features`
  - 機能単位の実装
  - 例: snippets, notes, favorites

---

## Shared Library

```text
lib/
├── fonts.ts
└── ...
```

`lib` には、UI 以外の共通ユーティリティや補助ロジックを配置する想定です。

---

## Design Notes

- ページごとの構成は `app/` 配下にまとめる
- 再利用する見た目要素は `components/primitives/` に置く
- 複数要素を組み合わせた共通部品は `components/common/` に置く
- 画面構造に関わるものは `components/layout/` に置く
- 特定機能に依存する実装は `components/features/` に置く
- 1つのコンポーネントに責務を詰め込みすぎないようにする

---

## Future Extension

今後、以下の機能を追加したときも、この構成をベースに拡張する。

- 認証
- 検索
- 詳細画面
- ダークモード
- 多言語対応
