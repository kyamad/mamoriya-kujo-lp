/*
 * 迅速対応まもりや駆除：採用デザインローダー
 * ------------------------------------------------------------
 * 採用済みの最新版を固定表示する。比較用URLパラメータは使用しない。
 */
(function () {
  'use strict';

  var requestedTheme = 'v3';
  var theme = 'v4';
  var licensedStock = true;
  var animalIllustrationPreview = true;

  window.MOCK_BRAND_THEME = requestedTheme;
  window.MOCK_BRAND_IMPLEMENTATION_THEME = theme;
  window.SITE_LICENSED_STOCK = licensedStock;
  window.MOCK_ANIMAL_ILLUSTRATION_PREVIEW = animalIllustrationPreview;
  if (theme === 'v1') return;

  if (licensedStock) document.documentElement.classList.add('licensed-stock');
  if (animalIllustrationPreview) document.documentElement.classList.add('animal-illustration-preview');

  if (theme === 'v2' || theme === 'v3') {
    document.documentElement.classList.add('brand-v2');
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/_mock/brand-v2.css';
    document.head.appendChild(stylesheet);
  }
  if (theme === 'v3') {
    document.documentElement.classList.add('brand-v3');
    var v3Stylesheet = document.createElement('link');
    v3Stylesheet.rel = 'stylesheet';
    v3Stylesheet.href = '/_mock/brand-v3.css';
    document.head.appendChild(v3Stylesheet);
  }
  if (theme === 'v4') {
    document.documentElement.classList.add('brand-v4');
    var v4Stylesheet = document.createElement('link');
    v4Stylesheet.rel = 'stylesheet';
    v4Stylesheet.href = '/_mock/brand-v4.css?layout-fixes=20261123k' + (licensedStock ? '&licensed-stock=1' : '');
    document.head.appendChild(v4Stylesheet);
  }

  function appendMarkup(target, className, markup) {
    if (!target || target.querySelector('.' + className)) return;
    var wrapper = document.createElement('div');
    wrapper.className = className;
    wrapper.innerHTML = markup;
    target.appendChild(wrapper);
  }

  function appendSimpleHeading(selector, kicker, title, text) {
    appendMarkup(document.querySelector(selector), 'v2-simple-heading',
      (kicker ? '<span>' + kicker + '</span>' : '') +
      '<h2>' + title + '</h2>' +
      (text ? '<p>' + text + '</p>' : ''));
  }

  function replaceLicensedImage(selector, src, alt) {
    var image = document.querySelector(selector);
    if (!image) return;
    image.classList.remove('lazyload');
    image.classList.add('adobe-licensed-stock');
    image.src = src;
    image.removeAttribute('data-src');
    image.alt = alt;
  }

  function applyLicensedStockImages() {
    if (!licensedStock) return;

    // 正規ライセンス取得済みのAdobe Stock写真。
    replaceLicensedImage('.risk_bottom_img', '/_mock/adobe-stock/customer-547072089.jpg', '住まいの害獣被害に悩むお客様');
    replaceLicensedImage('.reasons_item:first-child .reasons_img', '/_mock/adobe-stock/inspection-628511626.jpg', '天井裏を確認する専門スタッフ');
    replaceLicensedImage('.flow_item:nth-child(3) .flow_item_img', '/_mock/adobe-stock/consultation-2150844450.jpg', '契約内容を説明する専門スタッフ');
  }

  function enhance() {
    if (!document.body || document.body.dataset.brandV2Ready === 'true') return;
    document.body.dataset.brandV2Ready = 'true';

    var usesFocusedHero = theme === 'v3' || theme === 'v4';
    var isImpactTheme = theme === 'v4';
    var heroMarkup = isImpactTheme
      ? '<span class="v2-hero-kicker">東京・神奈川・埼玉・千葉｜24時間365日受付</span>' +
        '<h1>害獣の侵入を、<strong>今日で止める。</strong></h1>' +
        '<p>ネズミ・ハクビシン・コウモリなど、原因を調査し、駆除・清掃・消毒・侵入口の封鎖まで一貫して対応します。</p>' +
        '<div class="v2-hero-trust"><span>現地調査0円</span><span>最短30分</span><span>再発防止保証</span></div>' +
        '<div class="v4-hero-actions"><a class="v4-hero-tel" href="tel:0120-000-000"><small>相談・見積り無料</small><strong>0120-000-000</strong></a><a class="v4-hero-line" href="https://lin.ee/" target="_blank" rel="noopener">LINEで相談</a></div>'
      : usesFocusedHero
      ? '<span class="v2-hero-kicker">24時間365日受付・最短30分でお伺い</span>' +
        '<h1>害獣の不安を、<strong>確かな技術で解決します</strong></h1>' +
        '<p>現地調査・お見積り無料。状況と費用をご説明してから、駆除と再発防止を行います。</p>' +
        '<div class="v2-hero-trust"><span>最短30分</span><span>見積り0円</span><span>再発防止保証</span></div>' +
        '<a class="v3-hero-call" href="tel:0120-000-000"><small>相談・見積り無料</small><strong>0120-000-000</strong></a>'
      : '<span class="v2-hero-kicker">24時間365日受付・最短30分でお伺い</span>' +
        '<h1>住まいの害獣、<br><strong>プロが原因から解決します</strong></h1>' +
        '<p>現地調査・お見積り無料。駆除から再発防止まで、丁寧にご説明します。</p>' +
        '<div class="v2-hero-trust"><span>最短30分</span><span>見積り0円</span><span>再発防止保証</span></div>';
    appendMarkup(document.querySelector('.fv_txt'), 'v2-hero-copy', heroMarkup);

    if (isImpactTheme) {
      var brandMark = '<span class="v4-brand-mark" aria-hidden="true"><img src="/_mock/v4-top-assets/icon_01_home_shield.png" alt=""></span>';
      var headerLogo = document.querySelector('.header_logo');
      if (headerLogo && !headerLogo.querySelector('.v4-brand-mark')) {
        headerLogo.insertAdjacentHTML('afterbegin', brandMark);
      }
      appendMarkup(document.querySelector('.v2-hero-copy'), 'v4-hero-brand',
        brandMark + '<span><small>害獣駆除専門業者</small><strong>迅速対応まもりや駆除</strong></span>');
    }

    if (usesFocusedHero && !isImpactTheme) {
      appendMarkup(document.querySelector('.fv_content'), 'v3-hero-portrait',
        '<img src="/wp-content/uploads/2025/03/%E5%90%8D%E7%A7%B0%E6%9C%AA%E8%A8%AD%E5%AE%9A-2.png.webp" alt="害獣駆除スタッフ">' +
        '<span>専門スタッフが丁寧に対応します</span>');
    }

    if (isImpactTheme) {
      var heroContent = document.querySelector('.fv_content');
      if (heroContent && !heroContent.querySelector('.v4-mobile-hero-art')) {
        heroContent.insertAdjacentHTML('afterbegin', '<div class="v4-mobile-hero-art" role="img" aria-label="害獣から家を守る、まもりや駆除のスタッフのイラスト"></div>');
      }
    }

    document.querySelectorAll('.fv_campaign, .notice_campaign').forEach(function (target) {
      appendMarkup(target, 'v2-campaign-card',
        '<span class="v2-campaign-label">このページをご覧の方限定</span>' +
        '<span class="v2-campaign-normal">通常価格 20,000円</span>' +
        '<strong>7,000<small>円（税込）〜</small></strong>' +
        '<span class="v2-campaign-note">まずは無料でご相談ください</span>');
    });

    appendMarkup(document.querySelector('.cta_left'), 'v2-cta-copy',
      '<strong>24時間365日 受付中</strong><span>相談・現地調査・お見積り無料</span>');

    document.querySelectorAll('.cta_right_top').forEach(function (copy) {
      copy.innerHTML = '<span>最短30分で到着</span>｜まずは無料でご相談ください';
    });

    var pointLabels = ['最短30分', '見積り0円', '再発防止保証'];
    document.querySelectorAll('.point_item').forEach(function (item, index) {
      appendMarkup(item, 'v2-point-icon', '<span>' + (pointLabels[index] || '安心対応') + '</span>');
    });

    var exampleLabels = ['ネズミ', 'タヌキ', 'アナグマ', 'アライグマ', 'ヘビ', 'ハクビシン', 'イタチ', 'コウモリ', 'トコジラミ'];
    appendMarkup(document.querySelector('.example_wrap'), 'v2-example-list',
      exampleLabels.map(function (label, index) {
        return '<div class="v2-example-card"><div><img src="/wp-content/themes/magokoroLP/img/example_img' + (index + 1) + '.webp" alt="' + label + '"></div><span>' + label + '</span></div>';
      }).join(''));

    if (usesFocusedHero) {
      var v3Examples = [
        ['rat.jpg', 'ネズミ', '天井裏の足音、食品や配線のかじり被害'],
        ['tanuki.jpg', 'タヌキ', '屋根裏への侵入、糞尿による悪臭や騒音'],
        ['badger.jpg', 'アナグマ', '床下への侵入、庭や基礎周りの掘り返し'],
        ['raccoon.jpg', 'アライグマ', '天井裏の騒音、糞尿や断熱材の被害'],
        ['snake.jpg', 'ヘビ', '床下・屋根裏への侵入、突然の出現'],
        ['civet.jpg', 'ハクビシン', '夜間の足音、同じ場所に溜まる糞尿'],
        ['weasel.jpg', 'イタチ', '天井裏を走る音、糞尿による強い臭い'],
        ['bat.jpg', 'コウモリ', '換気口や屋根の隙間、糞の堆積や悪臭'],
        ['bedbug.jpg', 'トコジラミ', '就寝中の刺咬、かゆみと室内での繁殖']
      ];
      appendMarkup(document.querySelector('.example_wrap'), 'v4-example-lead',
        '<strong>被害のサインから探せます</strong><p>種類が分からない場合でも大丈夫です。音・臭い・フン・かじり跡など、気になる状況をお聞かせください。</p>');
      appendMarkup(document.querySelector('.example_wrap'), 'v3-example-list',
        v3Examples.map(function (item) {
          var assetBase = animalIllustrationPreview ? '/_mock/v3-animal-illustrations/' : '/_mock/v3-assets/';
          var assetName = animalIllustrationPreview ? item[0].replace(/\.jpg$/, '.png') : item[0];
          return '<figure class="v3-example-card"><img src="' + assetBase + assetName + '" alt="' + item[1] + '"><figcaption><strong>' + item[1] + '</strong><span>主な被害</span><p>' + item[2] + '</p></figcaption></figure>';
        }).join(''));
    }

    appendMarkup(document.querySelector('.evaluation_heading'), 'v2-section-heading',
      '<span>確かな実績</span><h2>お客様から選ばれる害獣駆除サービス</h2>');

    appendMarkup(document.querySelector('.evaluation_content'), 'v2-evaluation-grid',
      '<div><strong>3部門</strong><span>で高評価を達成</span></div>' +
      '<div><strong>害獣・害虫駆除</strong><span>サービス部門で調査</span></div>' +
      '<div><strong>第三者調査</strong><span>アンケート結果に基づく評価</span></div>');

    appendSimpleHeading('.trouble_top_heading', '早めの相談が安心です',
      '害獣に暮らしを脅かされていませんか？',
      '小さな違和感でも、被害が広がる前にご相談ください。');

    appendSimpleHeading('.risk_heading', '放置は禁物です',
      '害獣被害は、住まいと健康に影響します',
      '原因と侵入経路を確認し、被害の拡大を防ぐことが大切です。');

    appendSimpleHeading('.solution_img', 'まもりや駆除にお任せください',
      '原因から解決し、再侵入まで防ぎます',
      '駆除・清掃・消毒・侵入口封鎖まで、状況に合わせて丁寧に対応します。');

    if (theme === 'v4') {
      appendMarkup(document.querySelector('.solution'), 'v4-solution-panel',
        '<img src="/wp-content/themes/magokoroLP/img/voice_heading_img.webp" alt="害獣駆除スタッフ">' +
        '<div class="v4-solution-copy">' +
          '<span>駆除から再発防止まで</span>' +
          '<h2>プロの技術で、<br><strong>原因から解決。</strong></h2>' +
          '<p>現地を丁寧に調査し、害獣の駆除だけでなく、清掃・消毒・侵入口の封鎖まで一貫して対応します。</p>' +
          '<ul><li>侵入経路を調査</li><li>清掃・消毒</li><li>再侵入を防止</li></ul>' +
        '</div>');
    }

    if (isImpactTheme) {
      var firstView = document.querySelector('.fv');
      if (firstView && !document.querySelector('.v4-top-features')) {
        firstView.insertAdjacentHTML('afterend',
          '<section class="v4-top-features" aria-label="まもりや駆除の特長"><div class="v4-top-features-inner">' +
            '<div><img src="/_mock/v4-top-assets/icon_01_home_shield.png" alt="住まいを守る丁寧な対応"><strong>住まいを守る丁寧な対応</strong><p>状況と必要な作業を、分かりやすくご説明します</p></div>' +
            '<div><img src="/_mock/v4-top-assets/icon_02_pest_control.png" alt="幅広い害獣・害虫に対応"><strong>幅広い害獣・害虫に対応</strong><p>ネズミ・ハクビシン・コウモリなどに対応します</p></div>' +
            '<div><img src="/_mock/v4-top-assets/icon_03_24hours.png" alt="24時間365日受付"><strong>24時間365日受付</strong><p>夜間や休日も、まずは状況をご相談ください</p></div>' +
            '<div><img src="/_mock/v4-top-assets/icon_04_guarantee.png" alt="再発防止保証"><strong>再発防止保証</strong><p>侵入口の封鎖まで行い、再侵入を防ぎます</p></div>' +
          '</div></section>');
      }
      if (firstView && !document.querySelector('.v4-symptom-band')) {
        firstView.insertAdjacentHTML('afterend',
          '<section class="v4-symptom-band" aria-labelledby="v4-symptom-heading">' +
            '<div class="v4-symptom-inner">' +
              '<div class="v4-symptom-heading"><span>その違和感、害獣のサインかもしれません</span><h2 id="v4-symptom-heading">こんな症状はありませんか？</h2></div>' +
              '<ul class="v4-symptom-list"><li><i>音</i><strong>天井・壁から物音</strong></li><li><i>臭</i><strong>フンや悪臭がする</strong></li><li><i>跡</i><strong>かじり跡・足跡</strong></li><li><i>染</i><strong>天井にシミがある</strong></li></ul>' +
              '<button class="v4-symptom-cta popup-open" type="button">無料で状況を相談する</button>' +
            '</div>' +
          '</section>');
      }

      var symptomContact = document.querySelector('.v4-symptom-cta');
      if (symptomContact) {
        symptomContact.addEventListener('click', function () {
          var popup = document.querySelector('.popup');
          if (popup) popup.classList.add('active');
        });
      }

      // 潜在顧客の判断順（気づき→対象確認→危険性→解決策→根拠→相談）に並べ替える。
      var main = document.querySelector('main');
      if (main) {
        var examples = document.querySelectorAll('.example');
        var corps = document.querySelectorAll('.corp');
        if (examples[1]) examples[1].classList.add('v4-duplicate-section');
        corps.forEach(function (section) { section.classList.add('v4-duplicate-section'); });
        var orderedSections = [
          document.querySelector('.fv'), document.querySelector('.v4-top-features'), document.querySelector('.v4-symptom-band'),
          examples[0], document.querySelector('.trouble'), document.querySelector('.risk'),
          document.querySelector('.solution'), document.querySelector('.reasons'),
          document.querySelector('.guarantee'), document.querySelector('.declare'),
          document.querySelector('.evaluation'), document.querySelector('.start'),
          document.querySelector('.voice'), document.querySelector('.notice'),
          document.querySelector('.flow'), document.querySelector('.add'),
          document.querySelector('.qa'), document.querySelector('.campany')
        ];
        orderedSections.forEach(function (section) {
          if (section) main.appendChild(section);
        });
      }
    }

    appendMarkup(document.querySelector('.risk_bottom_bubble'), 'v2-risk-reassurance',
      '<strong>一つでも気になることがあれば、まずは無料調査へ</strong>' +
      '<span>専門スタッフが状況を確認し、必要な作業と費用をご説明します。</span>' +
      '<button class="v4-risk-contact popup-open" type="button">無料調査を相談する</button>');

    // brand-loader の要素追加は原本 script.js の初期バインド後になるため、
    // この追加ボタンだけはここで既存問い合わせモーダルへ接続する。
    var riskContact = document.querySelector('.v4-risk-contact');
    if (riskContact) {
      riskContact.addEventListener('click', function () {
        var popup = document.querySelector('.popup');
        if (popup) popup.classList.add('active');
      });
    }

    applyLicensedStockImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
