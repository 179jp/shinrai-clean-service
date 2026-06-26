# SHINRAI Clean Service — サイト設計ドキュメント

> LLM への更新依頼時の参照用。コードを変更する前にこのファイルを読むこと。

---

## 概要

京都市のハウスクリーニング業者「SHINRAIクリーンサービス」のコーポレートサイト。  
**Astro** 製の静的サイト。ページは `src/pages/index.astro` の **1ページのみ**（SPA ではない）。  
フォームは **Netlify Forms** で処理。デプロイ先も Netlify。

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Astro |
| スタイル | 素の CSS（CSS カスタムプロパティ使用） |
| 言語 | TypeScript（Astro frontmatter・helper） |
| フォント | Noto Sans JP / Poppins / DotGothic16（Google Fonts） |
| フォーム | Netlify Forms |

---

## ディレクトリ構造

```
src/
├── components/               # UI コンポーネント（.astro）
│   ├── CampaignContent.astro
│   ├── ContactDrawer.astro
│   ├── MonthTitle.astro
│   ├── ServiceCard.astro
│   └── ShinraiCar.astro
│
├── content/                  # ★ 編集頻度の高いコンテンツ定義
│   ├── campaign.mdx          # キャンペーン情報
│   ├── company.ts            # 会社情報
│   ├── shinraiCarComments.ts # シンライカー吹き出しテキスト
│   └── services/
│       ├── index.ts          # 料金データ（価格・メニュー）
│       └── notes.ts          # 注意書きテキスト
│
├── helper/                   # データ変換・型定義
│   ├── serviceSections.ts    # content → ServiceSection[] への変換
│   └── serviceTypes.ts       # TypeScript 型定義
│
├── layouts/
│   └── Layout.astro          # HTML の骨格・Google Fonts 読み込み
│
├── pages/
│   └── index.astro           # ページ本体（唯一のページ）
│
└── styles/
    ├── global.css            # リセット・ベースフォント
    ├── variables.css         # CSS カスタムプロパティ（色・フォント）
    ├── typography.css        # 文字スタイル
    ├── index.css             # ページ全体のレイアウト・コンポーネントスタイル
    └── shinrai-car.css       # ShinraiCar 専用スタイル

public/
└── img/
    ├── logo.svg
    ├── shinrai-car/          # 左向き車の画像 (car.png, tier-front.png, tier-back.png)
    └── shinrai-car-2/        # 右向き車の画像（同構成）
```

---

## ページ構成（`src/pages/index.astro`）

セクションの順番（上から）：

| セクション | HTML `id` | 担当コンポーネント |
|---|---|---|
| ヒーロー | なし | inline（index.astro 内） |
| キャンペーン | `#campaign` | `CampaignContent.astro` |
| サービス＆料金 | `#services` | `ServiceCard.astro` × N、`ShinraiCar.astro` |
| 会社情報 | `#company` | inline（`company.ts` のデータを直接描画） |
| フッター | なし | inline |
| お問い合わせ（ドロワー） | — | `ContactDrawer.astro`（常時 DOM に存在、非表示） |

**Services セクションの内部構造：**
```
#services
├── .section__header（見出し・更新日）
├── .service-tabs（モバイル用タブ、JS でスクロール連動）
├── .service-slider（標準カード group なし）
│   └── ServiceCard × n（水回り・浴室OP・エアコン）
├── .service-shinrai-car（ShinraiCar 左→右、コメントなし）
├── .service-special（group: 'special' のカード）
│   └── ServiceCard（定期プラン）
├── .notes（全体の注意書き）
├── .service-other（その他サービスの案内文）
└── .service-shinrai-car（ShinraiCar 右→左、コメントあり）
```

---

## content 各ファイルの役割と編集方法

### `src/content/company.ts`

会社情報オブジェクト。フッター・会社情報セクション・ContactDrawer の電話リンクに使われる。

```ts
export const company = {
  name: 'SHINRAIクリーンサービス',
  kana: 'シンライ クリーン サービス',
  representative: '西 直樹',
  address: '京都市左京区一乗寺東水干町7',
  phone: '080-3110-1948',
  email: 'shinrai.clean@gmail.com',
  instagram: 'https://www.instagram.com/shinrai_clean_service',
};
```

変更すればサイト全体に即反映される。

---

### `src/content/campaign.mdx`

キャンペーン情報を MDX で管理。`### ` でブロックを区切り、`- ` でリスト項目を記述する。

```mdx
### 夏を迎える前に...

- エアコン掃除キャンペーン
- 定期プランならトイレ・洗面台をセットでリフレッシュ
```

- `### タイトル` を追加すると新しいキャンペーンブロックが増える
- `CampaignContent.astro` がパースして `<article>` として表示する

---

### `src/content/services/index.ts`

料金表データ。3種のリストメニュー + 定期プランを管理する。

```ts
export const priceDate = '2026年5月31日';  // 表示される更新日

export const waterItems: ServiceListItem[] = [
  { name: 'キッチン', price: '¥19,000' },
  ...
];

export const bathOpsItems: ServiceListItem[] = [ ... ];

export const airconItems: ServiceListItem[] = [
  { name: 'ノーマル', price: '¥12,000/台' },
  { name: '　2台目以降', price: '¥10,000/台' },  // 先頭スペースでインデント表現
  ...
];

export const regularRows: RegularPlan[] = [
  { set: '浴室', monthly: '¥12,000', bimonthly: '¥14,000', threeMonthly: '¥16,000' },
  ...
];
```

**型：**
- `ServiceListItem` = `{ name: string; price: string }`
- `RegularPlan` = `{ set: string; monthly: string; bimonthly: string; threeMonthly: string }`

---

### `src/content/services/notes.ts`

注意書きテキスト。文字列配列で管理する。

```ts
export const notes = ['金額は全て税込価格です。'];            // 料金表の全体下部
export const airconNotes = ['製造から９年以上経過している...'];  // エアコンカード内
export const regularNotes = ['初回は別途料金となります...'];    // 定期プランカード内
```

---

### `src/content/shinraiCarComments.ts`

シンライカー（走る車アニメーション）の吹き出しテキスト一覧。

```ts
export const carComments: string[] = [
  'エアコン\nクリーニング\n今がチャンス！',
  '水回りも\nぴかぴかに！',
  '京都市内\n対応中です！',
  'お気軽に\nご相談を！',
];
```

- `\n` で改行
- 4〜5文字で改行する方が綺麗に見えるので推奨（長い場合は4〜5文字で改行するように勧める）
- 表示順は Fisher-Yates シャッフル後に順番に消化（連続で同じものが出にくい）
- 配列の追加・削除・変更だけで反映される
- 表示終了するコメントに関しては、今後の参考用に `carCommentsStock` へ残す
- ユーザーにコメント入れてもらう際の参考にする

---

## helper の役割

### `src/helper/serviceTypes.ts`

TypeScript 型定義のみ（ロジックなし）。`ServiceSection` は `list` 型と `table` 型の Union 型。

**`list` 型の主要フィールド：**

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | `string` | HTML の `id` 属性。タブのスクロールターゲットにも使われる |
| `label` | `string` | タブラベル・カードタイトル |
| `subtitle?` | `string` | タイトル直下の補足テキスト（オプション）。オレンジ色で表示 |
| `type` | `'list'` | 表示形式 |
| `items` | `ServiceListItem[]` | 料金リスト |
| `notes?` | `string[]` | カード下部の注意書き |
| `group?` | `'standard' \| 'special'` | `'special'` はメインスライダーから除外されて別エリアに表示 |
| `wide?` | `boolean` | グリッドで2カラム幅を占有 |

**`table` 型の追加フィールド：**

| フィールド | 型 | 説明 |
|---|---|---|
| `monthlyHeading` | `string` | 1列目ヘッダー |
| `bimonthlyHeading` | `string` | 2列目ヘッダー |
| `threeMonthlyHeading` | `string` | 3列目ヘッダー |
| `rows` | `RegularPlan[]` | 定期プラン行データ |

### `src/helper/serviceSections.ts`

`content/services/` のデータを `ServiceSection[]` にまとめる中間層。  
新しいカテゴリを追加する場合はここに push する。

```ts
export const serviceSections: ServiceSection[] = [
  { id: 'water',    label: '水回り',      type: 'list', items: waterItems },
  { id: 'bath-ops', label: '浴室OP',      type: 'list', items: bathOpsItems },
  { id: 'aircon',   label: 'エアコン',    subtitle: '家庭用壁掛けエアコン 120cm未満',
                                          type: 'list', notes: airconNotes, items: airconItems },
  { id: 'regular',  label: '定期（一例）', type: 'table', group: 'special', ... },
];
```

`group: 'special'` のセクションは `.service-special` エリアに表示される。

---

## コンポーネント詳細

### `ServiceCard.astro`

Props: `section: ServiceSection`、`className?: string`

`section.type` によって表示を切り替える：
- `list` → `<dl>` リスト形式（名前 / 価格）
- `table` → 4カラムグリッド表形式（月1・月2・月3）

`section.subtitle` がある場合、タイトル下にオレンジ小テキスト（`.panel__subtitle`）を表示。  
`section.notes` がある場合、カード下部に `※` 付き注意書きリストを表示。

---

### `ShinraiCar.astro`

**Props：**
- `direction?: 'left-right' | 'right-left'`（デフォルト `'left-right'`）
- `showComments?: boolean`（デフォルト `false`）

**`direction` について：**
- `'left-right'` → `public/img/shinrai-car/` の画像を使用
- `'right-left'` → `public/img/shinrai-car-2/` の画像を使用

**`showComments={true}` の動作：**
1. CSS アニメーション（`left-to-right-with-comment`）で画面中央まで走って停車
2. JS（`setTimeout` 制御）が停車タイミングで吹き出しを表示・非表示
3. `data-comments` 属性で `shinraiCarComments.ts` の内容を JSON として渡す
4. Fisher-Yates シャッフルで全件消化後に再シャッフル

**アニメーションのタイミング定数（`ShinraiCar.astro` の `<script>` 内）：**

| 定数 | デスクトップ | モバイル | 意味 |
|---|---|---|---|
| `TOTAL_MS` | 14000ms | 8000ms | 1サイクルの総時間 |
| `STOP_FRAC` | 0.33 | 0.32 | 停車開始位置（全体の何割目） |
| `RESUME_FRAC` | 0.71 | 0.76 | 発進位置（全体の何割目） |
| `BREATH_MS` | 200ms | 200ms | 停車後→吹き出し表示までの遅延 |
| `FADE_LEAD_MS` | 500ms | 500ms | 発進前に吹き出しを消し始めるリードタイム |

> ⚠️ `STOP_FRAC` / `RESUME_FRAC` は **CSS キーフレーム**（`shinrai-car.css`）と **JS 定数**（`ShinraiCar.astro`）の両方で同じ値を使っている。片方だけ変更するとズレる。

**複数インスタンスのスタッガリング：**  
同じページに複数の `showComments={true}` インスタンスがある場合、`animationDelay` に負のオフセットを設定して吹き出しが同時に出ないよう位相をずらす。

**`animationiteration` のバブルアップ対策：**  
`.car`（1s サイクル）や `.tier` の子要素アニメーションが `animationiteration` をバブルアップさせるため、`e.target === car` でフィルタリングしている（削除しないこと）。

---

### `ContactDrawer.astro`

- Netlify Forms で送信するお問い合わせドロワー
- `serviceSections` からサービスメニューの選択肢を自動生成（`group: 'special'` は除外）
- 「依頼したい」選択時のみ日時フィールドが表示される
- `data-contact-trigger` 属性を持つ任意の要素をクリックすると開く
- `data-contact-label` 属性でドロワーのタイトルを動的に変更できる

---

### `CampaignContent.astro`

`campaign.mdx` を `?raw` でテキストとして読み込み、`### ` で split してパースする。  
Astro の MDX コンパイルではなく、自前のテキストパースで動いている点に注意。

---

## スタイル設計

### CSS カスタムプロパティ

**`src/styles/variables.css`**（色・フォント）：
```css
--color-surface: #ffffff;
--color-text: #0f172a;
--color-lede: #334155;
--color-muted: #475569;
--color-subtle: #94a3b8;
--color-small: #64748b;
--border-strong: #0f172a;
--border-soft: #e5e7eb;
--border-muted: #cbd5e1;
--font-base: 'Noto Sans JP', 'Inter', system-ui, ...;
```

**`src/styles/index.css`（`:root`）**（背景色・ブランドカラー）：
```css
--color-primary: #ec6a26;   /* ブランドオレンジ。ボタン・アクセント・吹き出し枠線など */
--bkg-white0〜5: ...;       /* セクションごとに微妙に異なる背景色 */
```

ブランドカラーは `--color-primary` のみ。変更時はここだけ直す。

### フォント（`Layout.astro` の Google Fonts `<link>`）

```
DotGothic16            → ShinraiCar 吹き出しテキスト専用（ドットフォント）
Noto Sans JP           → 本文・UI 全般（wght 100..900 可変）
Poppins wght@500       → 英数字（一部 UI）
```

フォントを追加・変更する場合は `Layout.astro` の `<link href="https://fonts.googleapis.com/...">` URL を編集する。

### レスポンシブ

ブレークポイントは `768px` のみ（モバイル / デスクトップの2段階）。  
`@media (max-width: 768px)` で分岐。

---

## よくある更新パターン

### 料金を変更したい
→ `src/content/services/index.ts` の各 `items` 配列を直接編集。`price` は文字列なので書式は自由（例：`'¥12,000/台'`）。

### 料金表の更新日を変えたい
→ `src/content/services/index.ts` の `priceDate` を変更。

### キャンペーン情報を更新したい
→ `src/content/campaign.mdx` を編集。`### タイトル` でブロック追加、`- 項目` でリスト追加。

### 吹き出しのセリフを変えたい
→ `src/content/shinraiCarComments.ts` の配列を編集。改行は `\n`。

### 注意書きを変えたい
→ `src/content/services/notes.ts` の各配列を編集。

### カードに補足テキストを追加したい（エアコンの副題のような）
→ `src/helper/serviceSections.ts` の該当セクションに `subtitle: '...'` を追加する。

### 新しいサービスカテゴリを追加したい
1. `src/content/services/index.ts` に新しい `items` 配列を追加
2. `src/helper/serviceSections.ts` に `ServiceSection` オブジェクトを push
3. カテゴリ固有の注意書きは `notes.ts` に追記

### 会社情報を更新したい
→ `src/content/company.ts` のオブジェクトを直接編集。

### 吹き出しの表示タイミングを調整したい
→ `src/components/ShinraiCar.astro` の `<script>` 内の定数（`BREATH_MS` など）を変更。  
停車位置（`STOP_FRAC`/`RESUME_FRAC`）を変える場合は `shinrai-car.css` のキーフレームも同時に変更すること。

---

## 注意事項まとめ

- ページは `src/pages/index.astro` の **1ファイルのみ**
- `ContactDrawer` のフォーム選択肢は `serviceSections` から自動生成される。サービス追加時はフォームも自動更新される
- `ShinraiCar` の `animationiteration` は `e.target === car` でフィルタリングしている（子要素のバブルアップ対策。削除しないこと）
- CSS の停車パーセンテージ（`shinrai-car.css` のキーフレーム）と JS の `STOP_FRAC`/`RESUME_FRAC`（`ShinraiCar.astro`）は **必ず同じ値**にすること
- `CampaignContent.astro` は MDX をコンパイルせず `?raw` でテキスト読み込み→自前パースしている
