/* D-only price banner below the first-view contact buttons. */
(function () {
  'use strict';
  function mount() {
    var root = document.documentElement;
    if (!root.classList.contains('review-d') || root.classList.contains('review-e')) return;
    var actions = document.querySelector('.fv .v4-hero-actions');
    if (!actions) return;
    var offer = document.createElement('div');
    offer.className = 'd-hero-offer';
    offer.innerHTML = '<div class="d-offer-card"><div class="d-offer-main"><div class="d-offer-regular">通常基本料金<strong>20,000円〜</strong></div><div class="d-offer-price"><span>特別価格</span><strong>7,000<small>円〜</small></strong></div><div class="d-offer-discount"><span>約<b>65</b>%</span><strong>OFF</strong></div></div><p class="d-offer-footer">まずは無料でご相談ください</p></div><p class="d-offer-note">※基本料金の比較です。総額は被害状況・作業内容により異なり、無料の現地調査後にご案内します。</p>';
    var preview = new URLSearchParams(window.location.search).get('offer') || 'b';
    if (['a', 'b', 'c'].indexOf(preview) !== -1) {
      offer.classList.add('d-offer-slim', 'd-offer-slim-' + preview);
      offer.querySelector('.d-offer-card').innerHTML = '<div class="d-slim-intro"><b>特別価格</b><span>通常基本料金<br><s>20,000円〜</s></span></div><div class="d-slim-price"><small>キャンペーン基本料金</small><strong>7,000<span>円〜</span></strong></div><div class="d-slim-off"><span>約<b>65</b>%</span><strong>OFF</strong></div>';
    }
    actions.insertAdjacentElement('afterend', offer);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
