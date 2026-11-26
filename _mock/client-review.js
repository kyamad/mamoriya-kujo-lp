/* Client review variants and common readability improvements. */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var requested = (params.get('approach') || 'a').toLowerCase();
  var approach = ['a', 'b', 'c', 'd'].indexOf(requested) >= 0 ? requested : 'a';
  document.documentElement.classList.add('client-review', 'review-' + approach);
  // D compares the content sequence while keeping the approved A hero.
  if (approach === 'd') document.documentElement.classList.add('review-a');

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
    if (approach !== 'd') return;
    var main = document.querySelector('main');
    if (!main || main.dataset.reviewDReady) return;
    main.dataset.reviewDReady = 'true';

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
    var heading = document.createElement('h2');
    heading.id = 'review-d-guarantee-title';
    heading.textContent = guarantee.querySelector('.guarantee_top').textContent;
    inner.appendChild(heading);
    var condition = document.createElement('p');
    condition.className = 'review-d-guarantee-note';
    condition.textContent = guarantee.querySelector('.guarantee_bottom').textContent.trim();
    inner.appendChild(condition);
    addContact(inner);
    brief.appendChild(inner);

    // Separate the symptoms from the later explanation of escalating damage.
    var growth = document.createElement('section');
    growth.className = 'trouble review-d-growth';
    growth.setAttribute('aria-label', '害獣を放置した場合の繁殖リスク');
    var growthWrap = document.createElement('div');
    growthWrap.className = 'trouble_wrap';
    var growthContent = document.querySelector('.trouble_bottom');
    if (growthContent) growthWrap.appendChild(growthContent);
    growth.appendChild(growthWrap);

    var solution = document.querySelector('.solution');
    addContact(solution);

    // Missing source material (forms, case studies, comparisons) is omitted.
    // Related existing content stays together instead of inventing new claims.
    var order = [
      document.querySelector('.fv'), brief,
      document.querySelector('.evaluation'), document.querySelector('.trouble'),
      solution, document.querySelector('.declare'), document.querySelector('.notice'),
      growth, document.querySelector('.risk'), document.querySelector('.example:not(.v4-duplicate-section)'),
      document.querySelector('.start'), document.querySelector('.voice'),
      document.querySelector('.reasons'), guarantee,
      document.querySelector('.flow'), document.querySelector('.qa'),
      document.querySelector('.add'), document.querySelector('.campany')
    ];
    order.forEach(function (section) { if (section) main.appendChild(section); });
  }

  function enhance() {
    addPestTicker();
    addAccordions();
    improveAccessibility();
    arrangeExistingContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
