/* Reference design preview: never send enquiries or visitor data to the source. */
(function () {
  'use strict';
  function notice() { window.alert('G案は参考サイトの再現プレビューです。電話・外部リンク・お問い合わせ送信は停止しています。'); }
  document.addEventListener('submit', function (event) { event.preventDefault(); event.stopImmediatePropagation(); notice(); }, true);
  document.addEventListener('click', function (event) {
    if (event.target.closest('.hg-sf__submit')) { event.preventDefault(); event.stopImmediatePropagation(); notice(); return; }
    var a = event.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.charAt(0) === '#') return;
    var url;
    try { url = new URL(href, location.href); } catch (_) { return; }
    if (url.protocol === 'tel:' || url.protocol === 'mailto:' || url.origin !== location.origin) {
      event.preventDefault(); event.stopImmediatePropagation(); notice();
    }
  }, true);
  var nativeFetch = window.fetch;
  window.fetch = function (input, options) {
    var method = (options && options.method) || (input && input.method) || 'GET';
    var url = new URL(typeof input === 'string' ? input : input.url, location.href);
    if (!/^(GET|HEAD)$/i.test(method) || url.origin !== location.origin) return Promise.reject(new Error('Reference preview: remote requests disabled'));
    return nativeFetch.apply(this, arguments);
  };
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (!/^(GET|HEAD)$/i.test(method) || new URL(url, location.href).origin !== location.origin) throw new Error('Reference preview: remote requests disabled');
    return open.apply(this, arguments);
  };
  if (navigator.sendBeacon) navigator.sendBeacon = function () { return false; };
})();
