/* Client review variants and common readability improvements. */
(function () {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var requested = (params.get('approach') || 'a').toLowerCase();
  var approach = ['a', 'b', 'c'].indexOf(requested) >= 0 ? requested : 'a';
  document.documentElement.classList.add('client-review', 'review-' + approach);

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
      button.innerHTML = '<span>' + (title ? title.textContent.replace('について', '') : '詳しい内容') + 'を続きを読む</span><i aria-hidden="true">＋</i>';
      intro.insertAdjacentElement('afterend', button);

      button.addEventListener('click', function () {
        var open = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!open));
        list.hidden = open;
        intro.classList.toggle('is-clamped', open);
        button.querySelector('span').textContent = open
          ? (title ? title.textContent.replace('について', '') : '詳しい内容') + 'を続きを読む'
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

  function enhance() {
    addPestTicker();
    addAccordions();
    improveAccessibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
