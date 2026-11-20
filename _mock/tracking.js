/*
 * 迅速対応まもりや駆除：計測ローダー＋イベント設計
 * ------------------------------------------------------------
 * ・ANALYTICS_ENABLED=false（既定）のとき：外部スクリプトは一切読み込まず、
 *   window.dataLayer にも push しない。イベントはローカルログにだけ残る。
 * ・true のとき：ALLOWED_HOSTS に一致するホストで、設定済みIDだけを読み込み、
 *   イベントを dataLayer に pushする。
 */
(function () {
  'use strict';
  var C = window.MOCK_CONFIG || {};
  window.mockEventLog = window.mockEventLog || [];

  function hostAllowed() {
    var hosts = C.ALLOWED_HOSTS || [];
    return hosts.indexOf(location.hostname) !== -1;
  }

  var ids = {
    gtm1: C.GTM_PRIMARY_ID, gtm2: C.GTM_SECONDARY_ID,
    ads: C.GOOGLE_ADS_ID, ga4: C.GA4_MEASUREMENT_ID
  };
  var enabled = C.ANALYTICS_ENABLED === true && hostAllowed();

  if (C.ANALYTICS_ENABLED === true && !hostAllowed()) {
    console.warn('[mock-tracking] ALLOWED_HOSTS に ' + location.hostname + ' が無いため計測を無効化しました');
  }
  window.MOCK_TRACKING = { enabled: enabled };

  // ---- ローダー（有効時のみ）
  function loadGTM(id) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  if (enabled) {
    if (ids.gtm1) loadGTM(ids.gtm1);
    if (ids.gtm2) loadGTM(ids.gtm2);
    var gtagId = ids.ads || ids.ga4;
    if (gtagId) {
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gtagId);
      document.head.appendChild(g);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      if (ids.ads) {
        var adsCfg = {};
        if (C.GOOGLE_ADS_PHONE_CONVERSION_NUMBER) adsCfg.phone_conversion_number = C.GOOGLE_ADS_PHONE_CONVERSION_NUMBER;
        window.gtag('config', ids.ads, adsCfg);
      }
      if (ids.ga4) window.gtag('config', ids.ga4);
    }
  }

  // ---- イベント送出
  function track(event, params) {
    var payload = { event: event };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    payload.page_path = location.pathname;
    window.mockEventLog.push(payload);
    if (enabled) { window.dataLayer = window.dataLayer || []; window.dataLayer.push(payload); }
    if (C.DEBUG_EVENTS) console.info('[mock-tracking]' + (enabled ? '' : '[OFF]'), event, payload);
  }
  window.mockTrack = track;

  function position(el) {
    if (el.closest('.popup')) return 'popup';
    if (el.closest('.cta')) return 'cta_fixed';
    if (el.closest('.header')) return 'header';
    if (el.closest('footer')) return 'footer';
    return 'body';
  }

  // 電話・LINE・キャンペーン・FAQ（クリック委譲。原本のDOM/JSには手を入れない）
  var telTimer = null;
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    var a = t.closest('a[href]');
    if (a) {
      var href = a.getAttribute('href');
      if (/^tel:/i.test(href)) {
        track('tel_click', { link_url: href, cta_position: position(a) });
        if (C.TEL_30S_APPROX) {
          clearTimeout(telTimer);
          var started = Date.now();
          telTimer = setTimeout(function () { telTimer = null; track('tel_click_30s', { link_url: href }); }, 30000);
          var cancel = function () {
            if (!telTimer) return;
            clearTimeout(telTimer); telTimer = null;
            track('tel_click_cancel', { duration_sec: Math.round((Date.now() - started) / 1000) });
          };
          setTimeout(function () {
            document.addEventListener('touchstart', cancel, { once: true, passive: true });
            document.addEventListener('mousemove', cancel, { once: true, passive: true });
          }, 500);
        }
      } else if (href.indexOf('lin.ee/') !== -1 || href === C.LINE_URL) {
        track('line_click', { link_url: href, cta_position: position(a) });
      } else if (a.closest('footer')) {
        track('footer_link_click', { link_url: href });
      }
    }
    var opener = t.closest('.popup-open');
    if (opener) {
      track('campaign_popup_open', { trigger: opener.classList.contains('fv_campaign') ? 'fv_campaign' : (opener.classList.contains('notice_campaign') ? 'notice_campaign' : 'other') });
    }
    if (t.closest('.popup_bg')) track('campaign_popup_close_click', { method: 'background' });
    if (t.closest('.popup-close')) track('campaign_popup_close_click', { method: 'close_button' });
    var q = t.closest('.js-qa_title');
    if (q) {
      // script.js の slideToggle/toggleClass より前（capture）に呼ばれるので、反転後の状態を記録
      track('faq_toggle', { question: (q.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80), state: q.classList.contains('open') ? 'close' : 'open' });
    }
  }, true);
})();
