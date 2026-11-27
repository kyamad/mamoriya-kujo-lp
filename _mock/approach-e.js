/* E is a separate conversion-focused sequence. D is intentionally unchanged. */
(function () {
  'use strict';
  var pests = [
    ['rat', 'ネズミ'], ['tanuki', 'タヌキ'], ['badger', 'アナグマ'],
    ['raccoon', 'アライグマ'], ['snake', 'ヘビ'], ['civet', 'ハクビシン'],
    ['weasel', 'イタチ'], ['bat', 'コウモリ'], ['bedbug', 'トコジラミ']
  ];
  function photo(pest) { return '/_mock/v3-assets/' + pest[0] + '.jpg'; }
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

    var ticker = document.querySelector('.review-pest-track');
    var items = pests.map(function (p) { return '<span class="review-pest-item"><img src="' + photo(p) + '" alt=""><strong>' + p[1] + '</strong></span>'; }).join('');
    ticker.innerHTML = items + items;
    var pestPanel = document.querySelector('.d-damage-pests');
    pestPanel.querySelector('h3').textContent = '対応害獣・害虫';
    pestPanel.querySelector('ul').innerHTML = pests.map(function (p) { return '<li><img src="' + photo(p) + '" alt="" loading="lazy"><span>' + p[1] + '</span></li>'; }).join('');
    pestPanel.querySelector('p').textContent = '上記9種に対応しています。種類が分からない場合もご相談ください。';
    document.querySelectorAll('.d-estimate-animals').forEach(function (list) {
      list.innerHTML = pests.map(function (p) { return '<button type="button" data-animal="' + p[1] + '"><img src="' + photo(p) + '" alt="" loading="lazy"><span>' + p[1] + '</span></button>'; }).join('') + '<button type="button" data-animal="わからない"><span class="d-estimate-unknown" aria-hidden="true">？</span><span>わからない</span></button>';
    });
    document.querySelectorAll('.campany_item').forEach(function (row) {
      if (row.querySelector('.campany_item_title').textContent.indexOf('対象害獣') !== -1) row.querySelector('.campany_item_des').textContent = pests.map(function (p) { return p[1]; }).join('・');
    });

    var icons = [
      '<rect x="10" y="5" width="28" height="38" rx="3"/><path d="M17 15h14M17 23h14M17 31h8"/>',
      '<path d="M24 4l17 7v12c0 11-17 21-17 21S7 34 7 23V11z"/><path d="M16 24l6 6 11-13"/>',
      '<circle cx="24" cy="25" r="17"/><path d="M24 14v12l8 5M18 3h12"/>',
      '<path d="M8 24l11 11L41 12M7 10h13M7 10v13"/>'
    ];
    var promises = [
      ['調査・見積もり無料', '出張調査も無料です'],
      ['料金は作業前にご案内', '内容・金額にご納得後、作業'],
      ['最短即日対応', '最短30分でお伺い'],
      ['現地キャンセルOK', '見積もり後にご判断ください']
    ];
    document.querySelector('.declare').innerHTML = '<div class="e-assurance-inner"><h2><b>4</b>つの安心宣言</h2><div class="e-assurance-grid">' + promises.map(function (p, i) { return '<div><svg viewBox="0 0 48 48" aria-hidden="true">' + icons[i] + '</svg><h3>' + p[0] + '</h3><p>' + p[1] + '</p></div>'; }).join('') + '</div><p class="e-assurance-note">料金は被害状況・作業内容により異なります。追加作業が必要な場合も、事前に内容と費用をご説明します。<br>※到着時間は交通状況・予約状況により異なります。</p></div>';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
