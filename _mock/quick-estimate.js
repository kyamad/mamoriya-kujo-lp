/* D-only two-question guide. No personal details are collected or sent. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-d')) return;
    var anchor = document.querySelector('.review-d-guarantee');
    if (!anchor || document.getElementById('quick-estimate')) return;
    var animals = [['rat', 'ネズミ'], ['bat', 'コウモリ'], ['weasel', 'イタチ'], ['raccoon', 'アライグマ'], ['civet', 'ハクビシン'], ['bedbug', 'トコジラミ'], ['unknown', 'わからない']];
    var section = document.createElement('section');
    section.id = 'quick-estimate';
    section.className = 'd-estimate';
    section.setAttribute('aria-labelledby', 'd-estimate-title');
    section.innerHTML = `
      <div class="d-estimate-inner">
        <header class="d-estimate-header"><p>質問に答えていただくだけで</p><h2 id="d-estimate-title">簡単<span>30秒</span>で<br class="d-estimate-mobile">見積もり相談</h2><p class="d-estimate-sub">2つ選んで、無料調査をお電話で依頼</p></header>
        <ol class="d-estimate-progress" aria-label="相談の手順"><li aria-current="step">害獣を選ぶ</li><li>住宅を選ぶ</li><li>料金・相談案内</li></ol>
        <div class="d-estimate-question"><img src="/_mock/adobe-stock/operator-670251878-preview.jpg" alt="電話相談のオペレーター（イメージ）" width="96" height="96" loading="lazy"><h3 tabindex="-1">どのような害獣で<br class="d-estimate-mobile">お困りですか？</h3></div>
        <div class="d-estimate-panel" data-step="animal"><p class="d-estimate-step">1 / 2 問目</p><div class="d-estimate-animals">${animals.map(function (a) { return '<button type="button" data-animal="' + a[1] + '">' + (a[0] === 'unknown' ? '<span class="d-estimate-unknown" aria-hidden="true">？</span>' : '<img src="/_mock/v3-animal-illustrations/' + a[0] + '.png" alt="" loading="lazy">') + '<span>' + a[1] + '</span></button>'; }).join('')}</div></div>
        <div class="d-estimate-panel" data-step="home" hidden><p class="d-estimate-step">2 / 2 問目</p><p class="d-estimate-selection"></p><div class="d-estimate-homes"><button type="button" data-home="戸建て"><strong>戸建て</strong><span>一軒家にお住まいの方</span></button><button type="button" data-home="集合住宅"><strong>集合住宅</strong><span>マンション・アパートなど</span></button></div><button type="button" class="d-estimate-back" data-back="animal">害獣を選び直す</button></div>
        <div class="d-estimate-panel" data-step="result" hidden><p class="d-estimate-campaign">今ならキャンペーン中！</p><p class="d-estimate-regular">通常基本料金 <s>20,000円〜</s></p><p class="d-estimate-price">基本料金 <strong>7,000</strong>円〜</p><p class="d-estimate-note">※被害状況・作業内容により料金は異なります。<br>詳しい金額は無料の現地調査後にお見積もりします。</p><div class="d-estimate-talk"><p>お電話で、このようにお伝えください</p><blockquote></blockquote></div><a class="d-estimate-phone"><span>無料調査を電話で依頼する</span><strong></strong><small>通話無料・24時間365日受付</small></a><p class="d-estimate-note">お電話でのご連絡後に、無料調査を受け付けます。</p><button type="button" class="d-estimate-back" data-back="home">住宅を選び直す</button><button type="button" class="d-estimate-back" data-back="animal">最初から選び直す</button></div>
      </div>`;
    anchor.insertAdjacentElement('afterend', section);
    var animal = '';
    var home = '';
    var titles = {animal: 'どのような害獣でお困りですか？', home: 'お住まいの住宅はどちらですか？', result: '無料調査で、まずは状況を確認しましょう'};
    var steps = ['animal', 'home', 'result'];
    function show(step) {
      section.querySelectorAll('[data-step]').forEach(function (panel) { panel.hidden = panel.dataset.step !== step; });
      section.querySelectorAll('.d-estimate-progress li').forEach(function (item, index) {
        if (index === steps.indexOf(step)) item.setAttribute('aria-current', 'step');
        else item.removeAttribute('aria-current');
      });
      var heading = section.querySelector('h3');
      heading.textContent = titles[step];
      heading.focus({preventScroll: true});
      if (section.getBoundingClientRect().top < 0) section.scrollIntoView({block: 'start', behavior: 'auto'});
    }
    var sourcePhone = anchor.querySelector('a[href^="tel:"]');
    var phone = section.querySelector('.d-estimate-phone');
    if (sourcePhone) {
      phone.href = sourcePhone.getAttribute('href');
      phone.querySelector('strong').textContent = sourcePhone.querySelector('strong').textContent;
    }
    section.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.animal) {
        animal = button.dataset.animal;
        section.querySelector('.d-estimate-selection').textContent = 'お困りの害獣：' + animal;
        show('home');
      } else if (button.dataset.home) {
        home = button.dataset.home;
        section.querySelector('blockquote').textContent = '「' + home + 'に住んでいるのですが、' + (animal === 'わからない' ? '害獣の種類がわからないので、無料調査をお願いします' : animal + 'の無料調査をお願いします') + '」';
        show('result');
      } else if (button.dataset.back) show(button.dataset.back);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
