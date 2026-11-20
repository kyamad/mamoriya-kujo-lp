# 迅速対応まもりや駆除 LP

合同会社K-TEC「迅速対応まもりや駆除」の静的ランディングページです。

## ローカル確認

プロジェクトルートから次を実行し、`http://127.0.0.1:8787/` を開きます。

```sh
npx -y http-server delivery/mamoriya-kujo -p 8787 -c-1
```

URLパラメータは不要です。採用済みデザインと表示修正は常時有効です。

## 計測設定

計測は初期状態で無効です。`/_mock/config.js` に自社で発行したIDと本番ホスト名を設定するまで、GTM・Google広告・GA4の外部スクリプトは読み込まれません。

- `ANALYTICS_ENABLED`
- `ALLOWED_HOSTS`
- `GTM_PRIMARY_ID`
- `GOOGLE_ADS_ID`
- `GA4_MEASUREMENT_ID`

GTM内でGA4・Google広告を管理する場合、GTM以外のIDは空欄のままにして二重計測を避けてください。

## 公開前の必須確認

- 電話番号 `0120-000-000` を確定番号へ置換する
- 仮設定のLINE URL `https://lin.ee/` を合同会社K-TECの正式URLへ置換する
- Adobe Stockの透かし入りプレビュー3点を、正規ライセンス画像または自社保有画像へ差し替える
- 価格、実績、保証、対応時間、対応エリア、支払方法の根拠を確認する
- プライバシーポリシーと特商法表記を事業者確認済みの内容へ確定する

## GitHub Pages

`main`ブランチへpushすると、`.github/workflows/pages.yml` が静的ファイルをGitHub Pagesへ公開します。現在はGitHub FreeでPagesを利用するため、リポジトリと閲覧URLの両方をPublicに設定しています。

Actions内では `scripts/build-pages.mjs` がGitHub Project Pages用のサブパスを付与し、`_site/` を生成して公開します。元のHTMLはローカルおよび独自ドメイン向けのルート相対パスを維持します。

