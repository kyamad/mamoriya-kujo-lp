/*
 * 迅速対応まもりや駆除：表示修正
 * ------------------------------------------------------------
 * 原本の不具合を、原本ファイル（テーマCSS/JS）を書き換えずに上書きで直す。
 * 納品版では常時有効。比較用URLパラメータやsessionStorageは使用しない。
 *
 * このファイルは2回読み込まれる：
 *   1) head（viewport直後）  … F1 viewport修正、モード判定
 *   2) body末尾（script.jsの後）… F2〜F4
 * 一覧と原本との差分は docs/mock-完了報告.md「忠実再現と改善差分」。
 */
(function () {
  'use strict';
  var C = window.MOCK_CONFIG || {};
  if (typeof window.MOCK_FIXES === 'undefined') {
    window.MOCK_FIXES = C.FIXES_ENABLED !== false;
  }
  if (!window.MOCK_FIXES) return;

  var phase = document.body ? 'body' : 'head';
  if (phase === 'head') {
    // F1: viewport 誤字（widivh=device-widivh）を width=device-width に
    var vp = document.querySelector('meta[name="viewport"]');
    if (vp) vp.setAttribute('content', 'width=device-width, initial-scale=1.0');
    document.documentElement.classList.add('mock-fixes');
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/_mock/fixes.css';
    document.head.appendChild(link);
    return;
  }

  // ---- body 末尾フェーズ
  var popup = document.querySelector('.popup');
  function closePopup() { if (popup) popup.classList.remove('active'); }

  // F2: × ボタンで閉じる＋Escapeキーで閉じる
  if (popup) {
    var x = popup.querySelector('.popup-close');
    if (x) {
      x.setAttribute('role', 'button');
      x.setAttribute('aria-label', '閉じる');
      x.setAttribute('tabindex', '0');
      x.addEventListener('click', closePopup);
      x.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closePopup(); } });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        if (window.mockTrack) window.mockTrack('campaign_popup_close_click', { method: 'escape' });
        closePopup();
      }
    });
  }

  // F4: 固定CTAの高さ分だけページ下端に余白を確保し、フッターが隠れないようにする
  var cta = document.querySelector('.cta');
  if (cta) {
    var pad = function () { document.body.style.paddingBottom = cta.getBoundingClientRect().height + 'px'; };
    pad();
    window.addEventListener('resize', pad);
    window.addEventListener('load', pad);
    if (window.ResizeObserver) new ResizeObserver(pad).observe(cta);
  }
})();
