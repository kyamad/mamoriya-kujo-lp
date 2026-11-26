/* Approved section 5 option A. Keep the desktop presentation intact. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-d')) return;
    var section = document.querySelector('.solution');
    if (!section || section.querySelector('.d-solution-mobile')) return;
    var panel = document.createElement('div');
    panel.className = 'd-solution-mobile';
    panel.innerHTML = `
      <div class="d-solution-head">
        <img class="d-solution-portrait" src="/_mock/adobe-stock/staff-495390612-preview.jpg" alt="男性スタッフ（イメージ）" loading="lazy">
        <p class="d-solution-eyebrow">そのお悩み、プロにご相談ください</p>
        <h2>駆除だけでなく、<br><strong>原因から解決。</strong></h2>
      </div>
      <p class="d-solution-intro">侵入経路を見つけ、清掃・消毒から<br>再侵入の防止まで、一貫して対応します。</p>
      <ol class="d-solution-steps"><li><b>01</b><span>現地調査</span></li><li><b>02</b><span>駆除・清掃</span></li><li><b>03</b><span>侵入口の封鎖</span></li></ol>
      <div class="d-solution-actions"></div>
      <p class="d-solution-foot">24時間365日、ご相談を受け付けています</p>`;
    var actions = panel.querySelector('.d-solution-actions');
    var sourcePhone = section.querySelector('a[href^="tel:"]');
    var sourceLine = section.querySelector('.v4-hero-line');
    if (sourcePhone) {
      var phone = sourcePhone.cloneNode(true);
      phone.className = 'd-solution-phone';
      phone.querySelector('small').textContent = '相談・現地調査・見積もり無料';
      actions.appendChild(phone);
    }
    if (sourceLine) {
      var line = sourceLine.cloneNode(true);
      line.className = 'd-solution-line';
      line.textContent = 'LINEで気軽に相談する →';
      actions.appendChild(line);
    }
    section.appendChild(panel);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
