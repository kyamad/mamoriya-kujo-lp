/* D: campaign follow-up, damage examples and prevention guidance. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-d')) return;
    var campaign = document.querySelector('.notice');
    if (!campaign || document.getElementById('damage-guide')) return;
    var section = document.createElement('section');
    section.id = 'damage-guide';
    section.className = 'd-damage-guide';
    section.setAttribute('aria-labelledby', 'd-damage-title');
    var pests = [['rat', 'ネズミ'], ['bat', 'コウモリ'], ['weasel', 'イタチ'], ['civet', 'ハクビシン'], ['raccoon', 'アライグマ']];
    var cases = [
      {title: '通気口の侵入口', image: 'vent-1870492948', alt: '住宅基礎の通気口', warning: '床下の通気口にすき間は？', risk: 'ネズミが入り込む原因に', condition: '通気口まわりにすき間があるなら', action: '侵入口の点検・封鎖をご相談ください'},
      {title: '屋根裏の糞被害', image: 'droppings-2254921801', alt: '木部に残されたネズミの糞', warning: '屋根裏に糞が落ちている…', risk: '害獣が住み着いているサインかも', condition: '糞を見つけたら、放置せずに', action: '早めの調査・駆除をご相談ください'},
      {title: '配線かじり', image: 'wiring-543079019', alt: 'ネズミにかじられた電源コード', warning: '配線にかじられた跡が…', risk: '漏電や火災につながる恐れ', condition: '配線の傷みが気になったら', action: '被害の確認と再侵入対策が大切です'}
    ];
    section.innerHTML = `
      <div class="d-damage-inner">
        <header class="d-damage-intro"><p>つい後回しにしてしまう、害獣の被害。</p><h2 id="d-damage-title">そのままにしておくと、<br><em>住まいの被害が広がる</em>ことも。</h2><p>目に見えるサインから、早めに対策を。</p></header>
        <div class="d-return-panel">
          <h3>駆除したのに、<strong>また戻ってくる？</strong></h3>
          <p class="d-return-reason"><span aria-hidden="true">✓</span><span>追い出しただけでは、残ったすき間から<br class="d-desktop-break"><b>再び侵入される可能性があります。</b><br>住み着いた原因まで調べることが大切です。</span></p>
          <div class="d-return-answer"><img src="/_mock/adobe-stock/staff-114098946-preview.jpg" alt="専門スタッフ（イメージ）" loading="lazy"><div><p>再発を防ぐために、<br><mark>侵入経路を調査して封鎖。</mark></p><h4>専門家による<br><strong>対策が重要です。</strong></h4></div></div>
        </div>
        <div class="d-damage-pests"><h3>対応害獣</h3><ul>${pests.map(function (p) { return '<li><img src="/_mock/v3-assets/' + p[0] + '.jpg" alt="" loading="lazy"><span>' + p[1] + '</span></li>'; }).join('')}</ul><p>ネズミ・コウモリ・イタチ・ハクビシン・アライグマなど<br><strong>さまざまな害獣に対応します。</strong></p></div>
        <div class="d-damage-cases">${cases.map(function (c, i) { return '<article class="d-damage-case"><h3><span>0' + (i + 1) + '</span>' + c.title + '</h3><figure class="d-damage-photo"><img src="/_mock/adobe-stock/' + c.image + '-preview.jpg" alt="' + c.alt + '（イメージ）" loading="lazy"><div class="d-damage-tag"><b>' + c.warning + '</b><strong>' + c.risk + '</strong><span>どんな対策が必要？</span></div><figcaption><span>' + c.condition + '</span><strong>' + c.action + '</strong></figcaption></figure></article>'; }).join('')}</div>
        <p class="d-damage-photo-note">※写真は被害や侵入箇所を説明するためのイメージです。</p>
        <div class="d-damage-closing"><p>少しでも気になることがあれば</p><span>害獣駆除・再発防止のご相談は</span><h3><strong>まもりや駆除</strong>に<br>お任せください。</h3></div>
      </div>`;
    campaign.insertAdjacentElement('afterend', section);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
