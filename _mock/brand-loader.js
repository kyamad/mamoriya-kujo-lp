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
    v4Stylesheet.href = '/_mock/brand-v4.css?layout-fixes=20261123m' + (licensedStock ? '&licensed-stock=1' : '');
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

  function replaceImage(selector, src, alt, className) {
    var image = document.querySelector(selector);
    if (!image) return;
    image.classList.remove('lazyload');
    if (className) image.classList.add(className);
    image.src = src;
    image.removeAttribute('data-src');
    image.alt = alt;
  }

  function replaceLicensedImage(selector, src, alt) {
    replaceImage(selector, src, alt, 'adobe-licensed-stock');
  }

  function addImageOverlay(selector, src, alt, modifier) {
    var baseImage = document.querySelector(selector);
    if (!baseImage || baseImage.closest('.v4-declare-media')) return;

    var media = document.createElement('div');
    media.className = 'v4-declare-media';
    baseImage.parentNode.insertBefore(media, baseImage);
    media.appendChild(baseImage);

    var overlay = document.createElement('img');
    overlay.className = 'v4-declare-overlay ' + modifier;
    overlay.src = src;
    overlay.alt = alt;
    overlay.decoding = 'async';
    media.appendChild(overlay);
  }

  function applyLicensedStockImages() {
    if (!licensedStock) return;

    // 正規ライセンス取得済みのAdobe Stock写真。
    replaceLicensedImage('.risk_bottom_img', '/_mock/adobe-stock/customer-547072089.jpg', '住まいの害獣被害に悩むお客様');
    replaceLicensedImage('.reasons_item:first-child .reasons_img', '/_mock/adobe-stock/inspection-628511626.jpg', '天井裏を確認する専門スタッフ');
    replaceLicensedImage('.flow_item:nth-child(3) .flow_item_img', '/_mock/adobe-stock/consultation-2150844450.jpg', '契約内容を説明する専門スタッフ');
  }

  function applyContentRefresh() {
    // 「4つの安心宣言」の元写真を残し、要点が伝わるビジュアルを重ねる。
    addImageOverlay('.declare_item:nth-child(1) > img', '/_mock/v4-declare-assets/free-note.png', '無料と書かれた付箋', 'is-free-note');
    addImageOverlay('.declare_item:nth-child(3) > img', '/_mock/v4-declare-assets/stopwatch.png', '最短即日対応を表すストップウォッチ', 'is-stopwatch');

    var startHeading = document.querySelector('.start_heading_txt');
    if (startHeading) {
      startHeading.innerHTML = '迅速対応「まもりや駆除」が<br class="sp_LL_display"><span>首都圏</span>での駆除サービスを開始！';
    }

    var startTop = document.querySelector('.start_top_des');
    if (startTop) {
      startTop.innerHTML = '<span class="wrap_txt">東京</span><span class="wrap_txt">神奈川</span><span class="wrap_txt">埼玉</span><span class="wrap_txt">千葉</span>の一都三県で、多数の害獣駆除サービスに対してフォローアップに努めてきた運営会社が、満を持して<span class="border_txt">2026年12月1日</span>より、同区域の害獣駆除にまつわる施工サービスを、一気通貫の形で提供開始しました。<br><br>地域ごと、害獣被害には特徴がありますが「まもりや駆除」では多種の害獣に対し、それぞれ専門的に対応しております。';
    }

    var startBottom = document.querySelector('.start_bottom_content p');
    if (startBottom) {
      startBottom.textContent = '迅速対応「まもりや駆除」は、これまでに年間2,000件以上の害獣駆除施工サポート実績を持ち、数多くの害獣被害を解決してきました。信頼と実績を積み重ね、様々なメディアからお声がけいただいております。';
    }

    var voiceItems = document.querySelectorAll('.voice_item');
    var voiceCopy = [
      {
        title: '気づいた時には被害が拡大。<br><span>迅速な駆除</span>で静かな暮らしに',
        body: '夜になると天井裏から走り回るような音がしていましたが、しばらく様子を見ていました。ところがネズミは短期間で増え、糞尿の臭いや天井板のシミ、台所の食品被害まで出るようになり、慌てて相談しました。担当の方は状況を丁寧に聞き取り、屋根裏をきれいに清掃したうえで侵入経路も封鎖してくれました。<br>作業後は屋根裏が静かになり、穏やかな日常が戻りました。これほど早く解決できるなら、もっと早くプロにお願いすればよかったと思います。'
      },
      {
        title: '天井のシミを調べると、<br><span>ハクビシンの侵入</span>が判明',
        body: 'これまでなかった天井のシミと屋根裏の気配が気になり、正体が分からないまま相談しました。すぐに来てくれたスタッフが調査したところ、原因はハクビシン。屋根裏には糞尿の塊も複数ありました。片付けと徹底した消毒に加え、特定した侵入経路もしっかり封鎖してもらいました。放置すれば天井板が腐り、抜け落ちるおそれもあったと聞き、早い段階で発見して駆除につなげられたことに安心しました。'
      },
      {
        title: 'かゆみと刺された跡。<br>原因は<span>アライグマのノミ・ダニ</span>',
        body: '屋根裏の物音をそのままにしていたところ、体のあちこちに刺されたような跡とかゆみが出て、不安になり相談しました。調査で分かった原因はアライグマです。アライグマは一匹で数千匹ものノミやダニを持ち、歩くだけでも周囲へ広げることがあると知り、ぞっとしました。荒らされた断熱材を交換し、ノミ・ダニの駆除と消毒まで対応してもらいました。異変に気づいた時点で、早く専門家へ相談するべきだったと感じています。'
      }
    ];
    voiceItems.forEach(function (item, index) {
      if (!voiceCopy[index]) return;
      var title = item.querySelector('.voice_item_top p');
      var body = item.querySelector('.voice_item_txt');
      if (title) title.innerHTML = voiceCopy[index].title;
      if (body) body.innerHTML = voiceCopy[index].body;
    });

    var addContents = document.querySelectorAll('.add_content');
    var addIntroCopy = [
      'ネズミは繁殖力が強く、短期間で数が増えるため、被害を広げないためには早めの対応が重要です。暗く静かで、食べ物や水を得やすい場所を好み、壁の隙間や床下、天井裏、屋根裏、物置のほか、キッチンや水回りにも住み着きます。建物へ侵入すると、食品を荒らすだけでなく電気配線をかじることがあり、サルモネラ菌やレプトスピラ菌などの病原菌を媒介する衛生上のリスクもあります。',
      '都市部でも、コウモリは建物のわずかな隙間から入り込み、屋根裏や天井裏、壁の隙間、瓦の下、換気口、シャッターや戸袋など、暗く静かな場所に住み着くことがあります。蚊などを食べる益獣である一方、糞尿による悪臭や建物の傷み、病原菌を媒介するリスクもあります。特に糞に含まれるヒストプラズマ菌を吸い込むと、呼吸器系の疾患につながる可能性があります。住み着いた後に自力で対処することは難しく、追い出すだけでなく再侵入を防ぐ施工まで行うことが大切です。専門的な知識と技術をもとに、安全で確実な解決を目指します。',
      '近年、トコジラミ（別名：ナンキンムシ）の被害は再び増え、一般家庭や宿泊施設で深刻な問題になっています。夜間に活動して人の血を吸い、かゆみや皮膚炎に加えて心理的なストレスを招くこともあります。小さく、隙間に隠れる性質があるため発見しにくく、放置すると短期間で繁殖するおそれがあります。被害を抑える鍵は、見つけた段階で速やかに対処することです。ここでは、基本知識、安全で効果的な駆除方法、費用、対応地域（東京・神奈川・千葉・埼玉）を順にご案内します。専門知識と経験を生かし、確実な駆除を行います。'
    ];
    addContents.forEach(function (content, index) {
      if (!addIntroCopy[index]) return;
      var intro = content.querySelector('.add_top_txt p');
      if (intro) intro.textContent = addIntroCopy[index];
    });
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
    applyContentRefresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance);
  } else {
    enhance();
  }
})();
