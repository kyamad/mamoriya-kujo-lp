/* Comparison guidance uses only promises already published in this LP. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-d')) return;
    var voice = document.querySelector('.voice');
    if (!voice || document.getElementById('provider-comparison')) return;
    var points = [
      {name:'料金', lead:'表示価格だけでなく、必要な作業を含めた総額を確認しましょう。', label:'キャンペーン基本料金', value:'7,000', unit:'円〜', benefits:['現地調査後に見積もりをご案内','作業内容と費用を事前にご説明'], checks:[['料金の内訳','基本料金に含まれる作業は？'],['追加費用','追加になる作業や費用は？'],['対策の範囲','清掃・消毒や封鎖も含まれる？']], note:'※被害状況・作業内容により料金は異なります。', tip:'初期費用だけでなく、再発防止まで含めた内容で比較。'},
      {name:'調査・見積もり', lead:'費用の有無に加えて、調査内容や説明の分かりやすさも大切です。', label:'現地調査・見積もり', value:'無料', unit:'', benefits:['被害状況と侵入経路を確認','必要な対策と費用をご説明'], checks:[['調査費用','現地調査と見積もりは無料？'],['調査内容','侵入経路まで調べてもらえる？'],['事前説明','作業範囲と費用が明確？']], note:'', tip:'分からないことは、施工前に確認しましょう。'},
      {name:'再発保証', lead:'保証期間だけでなく、対象となる箇所や条件を見比べましょう。', label:'施工後の安心をサポート', value:'最長10年', unit:'保証', benefits:['施工後もご相談に対応','再発防止まで見据えた対策'], checks:[['保証期間','いつから、何年間が対象？'],['対象範囲','どの施工箇所・害獣が対象？'],['再発時の対応','連絡方法や対応内容は？']], note:'※当社作業済み箇所に同じ害獣が再発した場合に限ります。', tip:'保証の期間・範囲・条件をセットで確認。'},
      {name:'対応スピード', lead:'到着までの時間と、相談を受け付けている時間を確認しましょう。', label:'お近くのスタッフが対応', value:'最短30', unit:'分', benefits:['24時間365日受付','お困りの状況をお電話で確認'], checks:[['到着の目安','自宅までどのくらいで来られる？'],['受付時間','夜間や休日も相談できる？'],['作業日程','調査や施工はいつになる？']], note:'※到着時間はエリア・交通状況・予約状況により異なります。', tip:'お急ぎの場合は、お電話で状況をお伝えください。'},
      {name:'対応エリア', lead:'お住まいの地域に対応しているか、訪問前に確認しましょう。', label:'首都圏の害獣被害に対応', value:'東京・神奈川', unit:'埼玉・千葉', benefits:['地域の被害状況に合わせて調査','現地調査から再侵入対策まで対応'], checks:[['訪問エリア','自宅の所在地は対応範囲内？'],['出張費','訪問時に費用がかかる？'],['施工後の相談','再発時も地域をカバーしている？']], note:'※詳しい訪問日程はご相談時にご案内します。', tip:'住所と被害状況を伝えると、相談がスムーズです。'}
    ];
    var section = document.createElement('section');
    section.id = 'provider-comparison'; section.className = 'd-comparison';
    section.setAttribute('aria-labelledby','d-comparison-title');
    section.innerHTML = `<div class="d-comparison-inner"><header class="d-comparison-heading"><p>安さだけで決める前に</p><h2 id="d-comparison-title">害獣駆除業者を<strong>徹底比較</strong></h2><span>駆除費用はもちろん、侵入口対策や保証内容まで。<br>安心して任せるためのポイントをご紹介します。</span></header>
      <div class="d-comparison-tabs" aria-label="比較ポイントを選ぶ">${points.map(function(p,i){return '<button type="button" data-index="'+i+'" aria-controls="d-comparison-track">'+p.name+'</button>';}).join('')}</div>
      <div class="d-comparison-track" id="d-comparison-track" tabindex="0" aria-label="比較カード。左右にスクロールできます">${points.map(function(p,i){return `<article class="d-comparison-card" aria-label="比較ポイント${i+1}：${p.name}"><div class="d-comparison-card-head"><span>比較ポイント <b>0${i+1}</b></span><h3><em>${p.name}</em>で比較</h3><p>${p.lead}</p></div><div class="d-comparison-columns"><div class="d-comparison-own"><div class="d-comparison-brand"><span>私たちの対応</span><strong>まもりや駆除</strong></div><div class="d-comparison-own-body"><p>${p.label}</p><div class="d-comparison-value ${i===4?'is-area':''}"><strong>${p.value}</strong><span>${p.unit}</span></div><ul>${p.benefits.map(function(b){return '<li>'+b+'</li>';}).join('')}</ul>${p.note?'<small>'+p.note+'</small>':''}</div></div><div class="d-comparison-other"><h4>他社と比べるときは</h4><dl>${p.checks.map(function(c){return '<div><dt>'+c[0]+'</dt><dd>'+c[1]+'</dd></div>';}).join('')}</dl></div></div><p class="d-comparison-tip"><span aria-hidden="true">✓</span>${p.tip}</p></article>`;}).join('')}</div>
      <div class="d-comparison-controls"><button type="button" data-direction="-1" aria-label="前の比較ポイント">前へ</button><span class="d-comparison-count" aria-live="polite"></span><button type="button" data-direction="1" aria-label="次の比較ポイント">次へ</button></div><p class="d-comparison-hint">左右にスワイプ、またはボタンで比較項目を切り替えられます</p></div>`;
    voice.insertAdjacentElement('afterend',section);
    var track=section.querySelector('.d-comparison-track');
    var tabs=section.querySelectorAll('[data-index]');
    var prev=section.querySelector('[data-direction="-1"]'), next=section.querySelector('[data-direction="1"]');
    var current=0;
    function update(){current=Math.max(0,Math.min(points.length-1,Math.round(track.scrollLeft/track.clientWidth)));tabs.forEach(function(tab,i){tab.setAttribute('aria-pressed',String(i===current));});prev.disabled=current===0;next.disabled=current===points.length-1;section.querySelector('.d-comparison-count').textContent=(current+1)+' / '+points.length;}
    function go(i){track.scrollTo({left:Math.max(0,Math.min(points.length-1,i))*track.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    tabs.forEach(function(tab){tab.addEventListener('click',function(){go(Number(tab.dataset.index));});});
    prev.addEventListener('click',function(){go(current-1);});next.addEventListener('click',function(){go(current+1);});
    track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});
    track.addEventListener('scroll',update,{passive:true});
    if ('ResizeObserver' in window) new ResizeObserver(function(){track.scrollTo({left:current*track.clientWidth,behavior:'instant'});update();}).observe(track);
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
