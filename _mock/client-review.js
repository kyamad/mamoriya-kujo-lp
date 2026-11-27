/* Client review variants and common readability improvements. */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var requested = (params.get('approach') || 'a').toLowerCase();
  var approach = ['a', 'b', 'c', 'd', 'e'].indexOf(requested) >= 0 ? requested : 'a';
  document.documentElement.classList.add('client-review', 'review-' + approach);
  // D compares the content sequence while keeping the approved A hero.
  if (approach === 'd' || approach === 'e') document.documentElement.classList.add('review-a');
  if (approach === 'e') document.documentElement.classList.add('review-d');

  function pestItems() {
    return [
      ['rat.jpg', 'ネズミ'],
      ['civet.jpg', 'ハクビシン'],
      ['bat.jpg', 'コウモリ'],
      ['raccoon.jpg', 'アライグマ'],
      ['weasel.jpg', 'イタチ'],
      ['bedbug.jpg', 'トコジラミ']
    ].map(function (item) {
      return '<span class="review-pest-item"><img src="/_mock/v3-assets/' + item[0] + '?rev=20261125c" alt=""><strong>' + item[1] + '</strong></span>';
    }).join('');
  }

  function addPestTicker() {
    var hero = document.querySelector('.fv');
    if (!hero || hero.querySelector('.review-pest-ticker')) return;
    var ticker = document.createElement('div');
    ticker.className = 'review-pest-ticker';
    ticker.setAttribute('aria-label', '対応可能な害獣・害虫');
    ticker.innerHTML = '<span class="review-pest-label">対応可能</span><div class="review-pest-window"><div class="review-pest-track">' + pestItems() + pestItems() + '</div></div>';
    hero.appendChild(ticker);
  }

  function addAccordions() {
    document.querySelectorAll('.add_content').forEach(function (section, index) {
      var list = section.querySelector('.add_list');
      var intro = section.querySelector('.add_top_txt');
      var title = section.querySelector('.add_title h2');
      if (!list || !intro || section.querySelector('.review-details-toggle')) return;

      var id = 'pest-details-' + (index + 1);
      list.id = id;
      list.hidden = true;
      intro.classList.add('is-clamped');

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'review-details-toggle';
      button.setAttribute('aria-controls', id);
      button.setAttribute('aria-expanded', 'false');
      var closedLabel = title ? title.textContent + '詳しく見る' : '詳しい内容を見る';
      button.innerHTML = '<span>' + closedLabel + '</span><i aria-hidden="true">＋</i>';
      intro.insertAdjacentElement('afterend', button);

      button.addEventListener('click', function () {
        var open = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!open));
        list.hidden = open;
        intro.classList.toggle('is-clamped', open);
        button.querySelector('span').textContent = open
          ? closedLabel
          : '詳細を閉じる';
        button.querySelector('i').textContent = open ? '＋' : '−';
      });
    });
  }

  function improveAccessibility() {
    var heading = document.querySelector('.example_heading_txt');
    if (heading) heading.setAttribute('aria-label', '駆除対象の害獣・害虫はこちら');

    document.querySelectorAll('.v3-example-card img').forEach(function (image) {
      image.loading = 'lazy';
      image.decoding = 'async';
    });
  }

  function arrangeExistingContent() {
    if (approach !== 'd' && approach !== 'e') return;
    var main = document.querySelector('main');
    if (!main || main.dataset.reviewDReady) return;
    main.dataset.reviewDReady = 'true';

    // Preserve the blank first line while matching the approved survey wording.
    var evaluationHeading = document.querySelector('.evaluation_heading > p');
    if (evaluationHeading) evaluationHeading.innerHTML = '<br>インターネット調査に基づく<br class="pc_M_display">アンケート結果において';
    var evaluationNote = document.querySelector('.evaluation_bottom');
    if (evaluationNote) evaluationNote.innerHTML = '※インターネット調査機関の<br class="tab_display">インターネットアンケート結果による調査';

    var actions = document.querySelector('.v4-hero-actions');
    function addContact(target) {
      if (!target || !actions) return;
      var contact = document.createElement('div');
      contact.className = 'review-d-contact';
      var message = document.createElement('p');
      message.textContent = 'まずは無料でご相談ください';
      contact.appendChild(message);
      contact.appendChild(actions.cloneNode(true));
      target.appendChild(contact);
    }

    // The short opening guarantee reuses the existing promise and condition.
    var guarantee = document.querySelector('.guarantee');
    var brief = document.createElement('section');
    brief.className = 'review-d-guarantee';
    brief.setAttribute('aria-labelledby', 'review-d-guarantee-title');
    var inner = document.createElement('div');
    inner.className = 'review-d-guarantee-inner';
    inner.innerHTML = `
      <div class="d-warranty-banner">
        <img class="d-house-photo" src="/_mock/adobe-stock/house-80549115-preview.jpg" alt="青空の下の戸建て住宅（イメージ）" loading="lazy">
        <div class="d-warranty-copy">
          <p class="d-support-pill">相談から施工後まで、丁寧にサポート</p>
          <h2 id="review-d-guarantee-title">対策工事後も安心の<span class="d-guarantee-main"><small>最長</small><b>10</b>年保証</span></h2>
          <p class="d-warranty-message">まずは状況をお聞かせください。<br>施工後も、安心をサポートします。</p>
        </div>
        <div class="d-service-pills"><span>現地調査 <b>無料</b></span><span>見積もり <b>無料</b></span><span>施工後サポート</span></div>
      </div>
      <div class="d-call-banner">
        <div class="d-operator-photo"><img src="/_mock/adobe-stock/operator-670251878-preview.jpg" alt="電話相談を受ける女性オペレーター（イメージ）" loading="lazy"><span class="d-consult-badge">相談だけでも<strong>OK!</strong></span></div>
        <div class="d-call-copy"><p class="d-call-intro">少しでも不安を感じたら</p><h3><span>まずは</span><strong>お電話</strong>で<br>ご相談ください</h3><p class="d-call-free">現地調査・見積もり <strong>無料</strong></p><p class="d-call-area">東京・神奈川・埼玉・千葉に対応</p></div>
        <a class="d-call-number"><span>通話<br>無料</span><strong></strong></a>
        <p class="d-call-footer">24時間365日、ご相談を受け付けています</p>
      </div>`;
    var condition = document.createElement('p');
    condition.className = 'review-d-guarantee-note';
    condition.textContent = guarantee.querySelector('.guarantee_bottom').textContent.trim();
    inner.querySelector('.d-warranty-banner').appendChild(condition);
    var sourcePhone = actions && actions.querySelector('a[href^="tel:"]');
    var bannerPhone = inner.querySelector('.d-call-number');
    if (sourcePhone) {
      bannerPhone.href = sourcePhone.getAttribute('href');
      var number = sourcePhone.textContent.match(/0[\d-]{9,}/);
      bannerPhone.querySelector('strong').textContent = number ? number[0] : bannerPhone.href.replace('tel:', '');
      bannerPhone.setAttribute('aria-label', '無料電話相談 ' + bannerPhone.querySelector('strong').textContent);
    }
    brief.appendChild(inner);

    // D now explains damage in the photo guide; retain only the existing consultation.
    var growthContent = document.querySelector('.trouble_bottom');
    if (growthContent) growthContent.remove();
    var risk = document.querySelector('.risk');
    if (risk) {
      risk.classList.add('review-d-reassurance');
      risk.querySelectorAll('.risk_heading, .risk_title, .risk_list, .risk_effect_top, .risk_effect_bottom').forEach(function (element) { element.remove(); });
    }

    var solution = document.querySelector('.solution');
    addContact(solution);

    // Missing source material (forms, case studies, comparisons) is omitted.
    // Related existing content stays together instead of inventing new claims.
    var order = [
      document.querySelector('.fv'), brief,
      document.querySelector('.evaluation'), document.querySelector('.trouble'),
      solution, document.querySelector('.declare'), document.querySelector('.notice'),
      risk, document.querySelector('.example:not(.v4-duplicate-section)'),
      document.querySelector('.start'), document.querySelector('.voice'),
      document.querySelector('.reasons'), guarantee,
      document.querySelector('.flow'), document.querySelector('.qa'),
      document.querySelector('.add'), document.querySelector('.campany')
    ];
    order.forEach(function (section) { if (section) main.appendChild(section); });
  }

  function alignMobileHeroArtwork() {
    if (approach !== 'd' && approach !== 'e') return;
    var content = document.querySelector('.fv_content');
    var artwork = content && content.querySelector('.v4-mobile-hero-art');
    var phone = content && content.querySelector('.v4-hero-tel');
    if (!artwork || !phone) return;
    var pending = false;
    function align() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        if (!window.matchMedia('(max-width: 700px)').matches) {
          content.style.removeProperty('--d-hero-art-top');
          return;
        }
        var bottom = phone.getBoundingClientRect().top;
        var top = bottom - content.getBoundingClientRect().top - artwork.getBoundingClientRect().height;
        content.style.setProperty('--d-hero-art-top', top + 'px');
      });
    }
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(align);
      [content, artwork, phone].forEach(function (element) { observer.observe(element); });
    }
    window.addEventListener('resize', align);
    if (document.fonts) document.fonts.ready.then(align);
    align();
  }

  function enhance() {
    addPestTicker();
    addAccordions();
    improveAccessibility();
    arrangeExistingContent();
    alignMobileHeroArtwork();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
