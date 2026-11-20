/*
 * 共通テーマJS（script.js）の読み込み制御。
 * 原本忠実モード：原本どおり全ページで読み込む（下層ページでは popup_bg が無く
 *   TypeError が出るのも原本どおり）。
 * 改善モード（F3）：.popup_bg が無いページでは読み込まない。
 * 原本と同じく「パーサが同期実行する通常script」として実行させるため、
 * document.write で挿入する（実行タイミングを原本と揃える目的）。
 */
(function () {
  if (window.MOCK_FIXES && !document.querySelector('.popup_bg')) return;
  document.write('<script src="/wp-content/themes/magokoroLP/js/script.js"><\/script>');
})();
