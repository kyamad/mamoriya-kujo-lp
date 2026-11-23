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
    v4Stylesheet.href = '/_mock/brand-v4.css?layout-fixes=20261123o' + (licensedStock ? '&licensed-stock=1' : '');
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

    if (modifier === 'is-stopwatch') {
      var overlayLabel = document.createElement('span');
      overlayLabel.className = 'v4-declare-overlay-label';
      overlayLabel.textContent = '最短30分〜';
      media.appendChild(overlayLabel);
    }
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

    var sameDayHeading = document.querySelector('.declare_item:nth-child(3) > span');
    if (sameDayHeading) sameDayHeading.textContent = '最短即日対応';

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

    var reasonCopy = [
      {
        title: '現場を細部まで確認する専門調査',
        body: '専門スタッフが現地へ伺い、被害の範囲をはじめ、侵入経路、巣やフンの位置まで一つずつ確認します。現場の全体像を丁寧に把握したうえで、状況に合った駆除方法と再発防止策を組み立て、内容を分かりやすくご説明します。'
      },
      {
        title: '年間2,000件超の実績を生かした駆除',
        body: '年間2,000件以上の施工実績をもとに、害獣の種類や現場の状態に合わせた方法を選び、速やかに駆除します。巣に蓄積した大量のフンの清掃から、消毒・消臭・殺虫まで、経験を積んだ専門スタッフが確実に対応します。'
      },
      {
        title: '侵入口まで対策し再発を防止',
        body: '駆除後の再侵入を防ぐため、侵入口の封鎖や周辺環境の見直しまで行い、再発の原因を根本から取り除きます。さらに清掃と消毒を施し、害獣が持ち込んだ病原菌の拡散や二次被害のリスクも抑えます。'
      },
      {
        title: '駆除後の補修までまとめて対応',
        body: '害獣に荒らされた断熱材や、糞尿が染み込んだ天井板・床下なども丁寧に補修します。調査・駆除だけでなく、被害箇所の補修まで自社で一貫して対応できるため、まとめてお任せいただけます。'
      }
    ];

    document.querySelectorAll('.reasons_item').forEach(function (item, index) {
      if (!reasonCopy[index]) return;
      var title = item.querySelector('.reasons_title_txt span');
      var body = item.querySelector('.reasons_des p');
      if (title) title.textContent = reasonCopy[index].title;
      if (body) body.textContent = reasonCopy[index].body;
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

    var addDetailCopy = [
      [
        '最初に現地を調査し、ネズミの生息状況と侵入経路を確認します。侵入口になりやすいのは、建物の穴や隙間、排水管のほか、床下の通気口、エアコン配管の穴、戸建て・マンション・飲食店などの基礎部分、天井裏、シンク下の配管まわりです。状況を把握した後、捕獲器や毒餌を設置し、侵入口を封鎖します。費用は被害の程度や建物の構造によって変わります。ネズミは学習能力が高く、同じ対策だけでは再び侵入する可能性があるため、再発防止まで考えた施工が重要です。ネズミの生態を踏まえ、現場ごとに効果的な駆除方法をご提案します。',
        '駆除料金は2万円程度から承っており、一般的な相場よりも利用しやすい価格を心がけています。再発防止のメンテナンスや保証を組み合わせたパッケージもご用意し、施工後も長く安心していただける体制を整えています。',
        '対応地域は、東京都・神奈川県・千葉県・埼玉県の全域です。交通費は別途となりますが、24時間365日、無料でお見積もりとご相談を受け付けています。都市化が進むこれらの地域では、建物の隙間や屋根裏、天井裏にネズミが住み着くケースが増えています。ネズミをはじめとする害獣被害にお困りの際は、迅速かつ丁寧に対応する専門業者へご相談ください。',
        '住宅や店舗の衛生環境を守るには、ネズミ被害への早めの対応が欠かせません。食品を荒らすだけでなく、電気配線をかじって火災の原因になることがあり、サルモネラ菌やレプトスピラ菌などを媒介して健康被害を招く可能性もあります。被害が広がる前に専門業者へ相談することが大切です。現地調査から駆除、再発防止まで一貫して行い、安全で快適な住環境を取り戻すお手伝いをします。'
      ],
      [
        'まず現地調査で、糞の量、営巣場所、侵入経路を特定します。そのうえで忌避剤や超音波機器を使ってコウモリを追い出し、侵入に使われた穴や隙間を金網、防虫パテなどで塞ぎます。天井裏や換気口のわずかな隙間からも入り込むため、徹底した封鎖が重要です。国内で多く見られるアブラコウモリ（イエコウモリ）を含め、コウモリは鳥獣保護法の対象であり、無許可で捕獲・殺傷することはできません。そのため、法令に沿って「追い出し」と「再侵入防止」を中心に進め、必要に応じて忌避剤の散布、巣の撤去、侵入口の封鎖を行います。専門的な知識と経験が必要な作業ですので、法令を遵守できる専門業者へご相談ください。',
        '料金は被害の程度や建物の構造によって異なりますが、2万円程度から承っており、一般的な相場よりも利用しやすい価格を心がけています。再発防止のメンテナンスや保証を含むパッケージもご用意し、施工後も長く安心できる環境づくりを支えます。',
        '東京都・神奈川県・千葉県・埼玉県の全域で、コウモリをはじめとする害獣駆除に対応しています。交通費は別途となりますが、24時間365日、お見積もりとご相談は無料です。都市化が進む地域では、軒下や屋内、屋根裏にコウモリが住み着くケースが増えています。コウモリ被害が気になる場合は、迅速かつ丁寧に対応する専門業者へご相談ください。',
        '建物の隙間や屋根裏に住み着くコウモリを放置すると、糞尿による悪臭や衛生上の問題に加え、建物の劣化につながるおそれがあります。一方でコウモリは法律で保護されているため、法令に沿った適切な方法で対処しなければなりません。法令を守って駆除・追い出しを行い、再侵入を防ぐ対策までご提案することで、安全で安心できる住環境を整えます。'
      ],
      [
        '確実な駆除の第一歩は、生息場所と発生源を正しく見極めることです。トコジラミは、ベッドや布団の縫い目、壁紙の隙間、家具の裏など、暗く暖かい場所に潜みます。専門業者がこうした箇所を細かく調査したうえで、薬剤（殺虫剤）、熱処理、または両方を組み合わせて駆除します。市販のスプレーだけで根絶するのは難しく、小さなお子様やペットがいるご家庭では薬剤の扱いにも細心の注意が必要です。施工後は、衣類・寝具の洗濯や乾燥、こまめな清掃と換気を行うことが再発防止につながります。駆除だけでなく、再発を防ぐためのアドバイスやメンテナンスもご案内します。',
        '費用は、被害の広さ、建物の構造、使用する薬剤などによって変わります。基本的な駆除プランは2万円台からで、被害状況を確認したうえで詳細なお見積もりを無料でご案内します。料金には現地調査、薬剤の使用、清掃、再発防止のご提案などを含み、駆除して終わりではない長期的なサポートを重視しています。再発しやすいトコジラミでは、目先の価格だけでなく効果と安心がどれだけ続くかも大切です。定期点検や追加対応にも柔軟に対応しますので、初めての被害や費用面の不安もお気軽にご相談ください。',
        '東京都・神奈川県・千葉県・埼玉県の全域で、トコジラミ駆除を行っています。集合住宅が多い都市部や築年数を重ねた建物では発生リスクが高く、ご相談も年々増えています。無料相談とお見積もりは24時間365日受け付けているため、深夜や早朝のトラブルでもご連絡いただけます。地域の建物事情を把握した専門スタッフが、状況に応じて迅速かつ的確に対応します。目に見えない被害でも早期発見・早期駆除につなげられますので、「トコジラミかもしれない」と感じた段階でお早めにご相談ください。',
        'トコジラミは夜間の睡眠中に人を刺し、健康被害をもたらすことがあります。繁殖力が強いうえ、家具や壁の隙間に潜むため、ご家庭だけで完全に駆除するのが難しい害虫です。専門的な知識と経験をもとに、生息状況を徹底的に調査して駆除します。さらに、再発を防ぐための対策や日常管理のアドバイスまで行い、安心して過ごせる生活環境を取り戻すお手伝いをします。'
      ]
    ];

    addContents.forEach(function (content, contentIndex) {
      var detailItems = content.querySelectorAll('.add_item .add_item_txt');
      detailItems.forEach(function (item, itemIndex) {
        if (addDetailCopy[contentIndex] && addDetailCopy[contentIndex][itemIndex]) {
          item.textContent = addDetailCopy[contentIndex][itemIndex];
        }
      });
    });

    var flowCopy = [
      {
        title: '電話・LINEで無料相談・ヒアリング',
        body: '野生動物を見かけることが増えたら、被害が広がる前に電話またはLINEでご相談ください。まず状況を簡単にお伺いします。「通り道だけ」と思って放置すると被害が拡大することがあるため、早めのご連絡が駆除にかかる日数や負担の軽減につながります。'
      },
      {
        title: '無料の現地調査',
        body: 'ご相談を受けた後、最短30分を目安に速やかに訪問します。床下や屋根裏などを2〜4時間ほどかけて確認し、現在の状況を調査したうえで、無料のお見積もりをご提示します。'
      },
      {
        title: 'お見積もり確認・ご契約',
        body: '調査結果とお見積もりの内容をご確認いただき、十分にご納得いただけましたらご契約となります。'
      },
      {
        title: '駆除施工',
        body: 'お客様にお見積もりをご確認いただき、内容にご納得いただいた後で駆除作業を開始します。確認前に作業を進めることはありません。'
      },
      {
        title: '施工完了のご確認',
        body: '駆除作業が終わりましたら、完了内容をご報告し、お客様と一緒に施工箇所を確認します。分からない点や気になる点があれば、その場でお気軽にお尋ねください。'
      },
      {
        title: 'お会計',
        body: '駆除費用は、現金払い、分割払い、クレジットカード払い（使用可能なカード会社はお問い合わせください）など、複数のお支払い方法からお選びいただけます。'
      }
    ];

    document.querySelectorAll('.flow_item').forEach(function (item, index) {
      if (!flowCopy[index]) return;
      var title = item.querySelector('.flow_item_txt > span');
      var body = item.querySelector('.flow_item_txt > p');
      if (title) title.textContent = flowCopy[index].title;
      if (body) body.textContent = flowCopy[index].body;
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
        '<span class="v2-campaign-title">このページをご覧の方限定</span>' +
        '<span class="v2-campaign-discount">約65%OFF</span>' +
        '<span class="v2-campaign-old"><small>通常価格</small><strong>20,000<em>円</em></strong></span>' +
        '<span class="v2-campaign-new"><small>特別価格</small><strong>7,000<em>円（税込）〜</em></strong></span>' +
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
