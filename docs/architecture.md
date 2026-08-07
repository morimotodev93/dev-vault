# Architecture

## Purpose

このプロジェクトは、snippets / notes / tags / favorites を管理するための、シンプルで拡張しやすい知識管理アプリケーションです。

主な目的は、次の 4 点です。

- UI を再利用可能な部品として整理する
- 機能ごとに責務を分ける
- 画面構成を明確に保つ
- 今後の拡張をしやすくする

---

## Design Principles

このアプリケーションは、以下の考え方をもとに設計します。

- Component Driven
  - UI は小さな部品から組み立てる
- Feature First
  - 機能ごとに責務を分離する
- Mobile First
  - まず小さな画面で使いやすい構成を考える
- Server First
  - 初期表示やデータ取得はサーバー側で扱い、必要な場合のみクライアント側に寄せる
- Type Safe
  - TypeScript を使い、型によって構造を明確にする

---

## System Overview

全体の構成は、次のようなレイヤーで考えます。

- `app/`
  - ルーティングとページの組み立て
- `components/`
  - UI コンポーネントの実装
- `lib/`
  - 共通ユーティリティや補助ロジック
- `database/` または data layer
  - データ取得・保存の責務

基本的な流れとしては、ページが表示されるときに必要なデータを取得し、各機能のコンポーネントへ渡して構成します。

---

## Layer Architecture

```text
app/
  └── page / route components

components/
  ├── primitives
  ├── common
  ├── layout
  └── features

lib/
  └── utilities / helpers / shared logic

database/
  └── data access layer
```
