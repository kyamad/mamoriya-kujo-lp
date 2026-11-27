/* E is a separate conversion-focused sequence. Shared D/E content is maintained in review-de-common.js. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-e')) return;
    var hero = document.querySelector('.fv');
    hero.insertAdjacentElement('afterend', document.querySelector('.trouble'));
    document.querySelector('.trouble').insertAdjacentElement('afterend', document.querySelector('.solution'));

    // Two phone panels and one estimate guide, in addition to the hero/fixed actions.
    document.querySelectorAll('.review-d-guarantee, #quick-estimate, #quick-estimate-before-company, #trust-after-reasons, #consultation-after-reasons, #consultation-before-company, .risk.review-d-reassurance, .solution .review-d-contact, .solution .d-solution-actions, .solution .d-solution-foot').forEach(function (el) { el.remove(); });

    var price = document.createElement('div');
    price.className = 'e-hero-price';
    price.innerHTML = '<p>キャンペーン基本料金 <span>約65%OFF</span></p><div><s>通常20,000円〜</s><strong>7,000<small>円〜</small></strong></div><p class="e-price-note">※基本料金の比較です。総額は被害状況・作業内容により異なり、無料の現地調査後にご案内します。</p>';
    hero.querySelector('.v4-hero-description').insertAdjacentElement('afterend', price);

  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
