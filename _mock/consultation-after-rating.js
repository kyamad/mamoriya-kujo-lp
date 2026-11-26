/* Repeat the approved consultation banner after the service launch and media section in D. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-d')) return;
    var service = document.querySelector('.start');
    var original = document.querySelector('.review-d-guarantee .d-call-banner');
    if (!service || !original || document.getElementById('consultation-after-rating')) return;
    var section = document.createElement('section');
    section.id = 'consultation-after-rating';
    section.className = 'd-rating-consultation';
    section.setAttribute('aria-labelledby', 'd-rating-consultation-title');
    section.innerHTML = `<div class="d-rating-consultation-inner">
      <header class="d-consult-invitation"><p>どの業者へ相談するか迷っている方へ</p><h2 id="d-rating-consultation-title">まずは<span>まもりや駆除</span>の<br><strong>無料現地調査</strong>をご利用ください</h2></header>
      <div class="d-consult-reception"><p><span aria-hidden="true">◷</span> <strong>24時間365日</strong>、お電話でのご相談を受付中</p><p>害獣の種類が分からなくても、<b>お気軽にご相談ください</b></p></div>
    </div>`;
    section.firstElementChild.appendChild(original.cloneNode(true));
    service.insertAdjacentElement('afterend', section);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
