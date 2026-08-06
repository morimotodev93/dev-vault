/**
 * アイコン識別子（Lucide React などのアイコンライブラリのアイコン名文字列）
 */
export type IconName =
  | "home"
  | "code"
  | "folder"
  | "star"
  | "alert-circle"
  | "plus"
  | "settings"
  | "help-circle"
  | "github";

/**
 * 個々のナビゲーションリンク項目のインターフェース
 */
export interface NavItem {
  /** 一意の識別ID */
  id: string;
  /** 表示用テキスト (英語ベース) */
  label: string;
  /** 遷移先パス */
  href: string;
  /** アイコン名 (任意) */
  icon?: IconName;
  /** バッジ表示（例: お気に入りの数 "12" や "NEW" など） (任意) */
  badge?: string | number;
  /** 外部リンクかどうか (任意) */
  isExternal?: boolean;
  /** 階層構造（サブメニュー）用のネスト配列 (任意) */
  children?: NavItem[];
}

/**
 * ナビゲーションをセクションごとにグループ分けするための構造
 * （ハンバーガーメニューやサイドバーで区切り線・見出しを入れる際に使用）
 */
export interface NavGroup {
  /** グループID */
  id: string;
  /** グループの見出しタイトル（例: "Overview", "Filters", "System"） (任意) */
  title?: string;
  /** グループに含まれるアイテム一覧 */
  items: NavItem[];
}

/**
 * アプリ全体で管理するナビゲーション構成データの統合型
 */
export interface AppNavigation {
  /** デスクトップヘッダー用の主要メニュー */
  headerNav: NavItem[];
  /** ハンバーガーメニュー用のグループ化されたメニュー */
  hamburgerNav: NavGroup[];
  /** プライマリ操作ボタン（例: "+ New Snippet"） */
  actionButton: NavItem;
}
