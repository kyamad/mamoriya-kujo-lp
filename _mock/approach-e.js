/* E: D's exact section sequence, redesigned as a series of advertising panels. */
(function () {
  'use strict';
  function mount() {
    if (!document.documentElement.classList.contains('review-e') && !document.documentElement.classList.contains('review-f')) return;
    var troubleHeading = document.querySelector('.trouble_top_heading');
    if (troubleHeading) troubleHeading.innerHTML = '<div class="e-trouble-head"><span>その違和感、見逃していませんか？</span><h2>害獣に暮らしを<br><strong>脅かされていませんか？</strong></h2></div>';
    document.querySelectorAll('main > section').forEach(function (section) {
      section.classList.add('e-ad-panel');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
