# e-party
- プランニングポーカーアプリ


# 開発起動
## Supabaseを初期化（初回のみ）
supabase init

## Supabaseを起動
supabase start


# 技術構成

## **1. フロントエンド**
- **フレームワーク**: Next.js(App router)
- **スタイリング**: Tailwind CSS
- **ホスティング**: Vercel

---

## **2. バックエンド**
- **フレームワーク**: Hono
- **データベース ORM**: Prisma
- **認証**: Supabase Auth
- **API仕様**: REST
- **ホスティング**: Render

---

## **3. データベース**
- **種類**: PostgreSQL
- **データベース操作**: Prisma
---

## **4. 認証と認可**
- **認証**: Supabase Auth
  - **対応する認証プロバイダー**:
    - Google
---

## **5. インフラ構成**

| **カテゴリ**    | **技術**          |
|-----------------|-------------------|
| フロントエンド  | Vercel(ホスティング)           |
| バックエンド    | Render           |
| データベース    | Supabase (PostgreSQL) |


---

## **技術スタックまとめ**

| **カテゴリ**        | **技術**                    |
|---------------------|-----------------------------|
| フロントエンド      | Next.js, Tailwind CSS |
| バックエンド        | Hono, Prisma               |
| データベース        | Supabase (PostgreSQL)       |
| 認証               | Supabase Auth               |
| インフラ           | Vercel (フロントエンド), Render (バックエンド) |
