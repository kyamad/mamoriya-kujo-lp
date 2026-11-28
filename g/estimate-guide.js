/* Same two-question consultation flow as D, inside G's existing frame. */
(function () {
  'use strict';
  document.querySelectorAll('.g-estimate').forEach(function (root) {
    var animal = '', home = '';
    var titles = {animal: 'どのような害獣でお困りですか？', home: 'お住まいの住宅はどちらですか？', result: '無料調査で、まずは状況を確認しましょう'};
    function show(step) {
      root.querySelectorAll('.g-estimate-step').forEach(function (panel) { panel.hidden = panel.dataset.step !== step; });
      root.querySelector('.hg-sf__progress').textContent = step === 'result' ? '料金・相談案内' : (step === 'animal' ? '1' : '2') + ' / 2 問目';
      var heading = root.querySelector('.hg-sf__bubble-text');
      heading.textContent = titles[step];
      heading.focus({preventScroll: true});
      if (root.getBoundingClientRect().top < 0) root.scrollIntoView({block: 'start', behavior: 'auto'});
    }
    root.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.animal) {
        animal = button.dataset.animal;
        root.querySelector('.g-estimate-selection').textContent = 'お困りの害獣：' + animal;
        show('home');
      } else if (button.dataset.home) {
        home = button.dataset.home;
        root.querySelector('blockquote').textContent = '「' + home + 'に住んでいるのですが、' + (animal === 'わからない' ? '害獣の種類がわからないので、無料調査をお願いします' : animal + 'の無料調査をお願いします') + '」';
        show('result');
      } else if (button.dataset.back) show(button.dataset.back);
    });
  });
})();
