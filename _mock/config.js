/*
 * 迅速対応まもりや駆除：本番環境設定
 * ------------------------------------------------------------
 * ・計測は既定でOFF。自社で発行した計測IDが確定するまで外部送信しない。
 * ・本番で計測する場合は、自社で発行したIDだけをここに設定し、
 *   ANALYTICS_ENABLED を true、ALLOWED_HOSTS に本番ホスト名を入れる。
 * ・本番では ANALYTICS_ENABLED、ALLOWED_HOSTS、各計測IDを更新する。
 */
window.MOCK_CONFIG = {
  ANALYTICS_ENABLED: false,

  // 本番用ID（空欄のままなら何も読み込まない）
  GTM_PRIMARY_ID: '',      // 例: 'GTM-XXXXXXX'
  GTM_SECONDARY_ID: '',    // 2コンテナ構成が本当に必要な場合のみ
  GOOGLE_ADS_ID: '',       // 例: 'AW-XXXXXXXXXX'（GTM内で設定するなら空欄）
  GOOGLE_ADS_PHONE_CONVERSION_NUMBER: '', // 電話番号置換を使う場合のみ
  GA4_MEASUREMENT_ID: '',  // 例: 'G-XXXXXXXXXX'（GTM内で設定するなら空欄）

  // タグを読み込んでよいホスト名。空配列なら、どのホストでも読み込まない。
  ALLOWED_HOSTS: [],

  // 連絡先（正式なLINE URLが確定したら更新）
  PHONE_NUMBER: '0120-000-000',
  LINE_URL: 'https://lin.ee/',

  // 電話リンククリック後30秒の近似イベント（原GTMの correctTel 相当）を出すか
  TEL_30S_APPROX: false,

  // イベントを console に出す（計測OFFでもローカル配列 window.mockEventLog に記録）
  DEBUG_EVENTS: true,

  // 納品版は表示修正を常時有効にする
  FIXES_ENABLED: true,

  // 採用デザインを固定（比較用URLパラメータは使用しない）
  BRAND_THEME: 'v3'
};
