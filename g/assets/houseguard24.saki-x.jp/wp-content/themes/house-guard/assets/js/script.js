//=================================
// variable
//=================================

const breakpoint = 769;

//=================================
// common
//=================================

// // フォント読み込み
// window.WebFontConfig = {
//   google: { families: ['Noto+Sans+JP:400'] },
//   active: function() {
//     sessionStorage.fonts = true;
//   }
// };
// (function() {
//   var wf = document.createElement('script');
//   wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
//   wf.type = 'text/javascript';
//   wf.async = 'true';
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(wf, s);
// })();

// スムーススクロール
document.addEventListener('DOMContentLoaded', function() {
  const is_offset = { pc: true, sp: true }; // l-headerの高さを取りたくない場合はfalse
  const header_h = is_offset[size(breakpoint)] ? ($('.l-header').height() || 0) : 0; // l-header非表示ページでもNaNにならないようフォールバック

  $('.js_anchor').click(function() {
    const href = $(this).attr('href');
    const target = $(href == '#' || href == '' ? 'html' : href);
    const position = target.offset().top - header_h;
    $('html, body').animate({ scrollTop: position }, 500, 'linear');
    return false;
  });
});

// スクロールすると出てくる「ページトップへ」ボタン
$(function() {
  var topBtn = $('.js_btn_p_top');
  topBtn.hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function() {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});

$(function() {
  var headerBtn = $('.js_header_btn');
  headerBtn.hide();
  $(window).scroll(function() {
    if ($(this).scrollTop() > 800) {
      headerBtn.fadeIn();
    } else {
      headerBtn.fadeOut();
    }
  });
  // headerBtn.click(function() {
  //   $('body,html').animate({
  //     scrollTop: 0
  //   }, 500);
  //   return false;
  // });
});

// 要素がウィンドウに入ったら実行
$(function() {
  $('.js_window_in').on('inview', function(event, isInView){
    if (isInView) {
      $(this).removeClass('_hide');
      $(this).addClass('_show');
    } else {
      $(this).addClass('_hide');
      $(this).removeClass('_show');
    }
  });
});

// 要素がウィンドウに入ったら実行 1回のみ
$(function() {
  $('.js_window_in_one').on('inview', function(event, isInView){
    if (isInView) {
      $(this).addClass('_show');
    }
  });
});

// img ドラッグ・右クリック禁止
$(function() {
  $('img').attr('onmousedown', 'return false');
  $('img').attr('onselectstart', 'return false');
  $('img').attr('oncontextmenu', 'return false');
});

// 画面幅判定
function size(bp) {
  const breakpoint = isNaN(bp) ? 0 : bp;
  const window_w = $(window).width();
  if(window_w < breakpoint) {
    return 'sp';
  } else {
    return 'pc';
  }
}

jQuery(function ($) {

  const $accordion   = $('.accordion');
  const $buttons     = $accordion.find('.accordion__btn');
  const ANIM_SPEED   = 250; // slideToggle 時間 (ms)

  /* === クリックで開閉 ================================= */
  $buttons.on('click', function () {
    togglePanel($(this), true);
  });

  /* === キーボードナビ（↑↓ Home End） ================== */
  $buttons.on('keydown', function (e) {
    const KEY = {UP:38,DOWN:40,HOME:36,END:35};
    if(!Object.values(KEY).includes(e.which)) return;

    const $btns = $buttons;
    let idx     = $btns.index(this);

    switch (e.which) {
      case KEY.UP:   idx = (idx - 1 + $btns.length) % $btns.length; break;
      case KEY.DOWN: idx = (idx + 1) % $btns.length; break;
      case KEY.HOME: idx = 0; break;
      case KEY.END:  idx = $btns.length - 1; break;
    }
    $btns.eq(idx).focus();
    e.preventDefault();
  });

  /* === 開閉関数 ======================================= */
  function togglePanel($btn, animate){
    const expand = $btn.attr('aria-expanded') === 'false';
    const panelId = $btn.attr('aria-controls');
    const $panel  = $('#' + panelId);

    $btn.attr('aria-expanded', expand);
    $panel.attr('aria-hidden', !expand)
          .prop('inert', !expand);

    if (animate){
      $panel.stop(true, true)[expand ? 'slideDown':'slideUp'](ANIM_SPEED);
    }else{
      $panel.css('display', expand ? 'block' : 'none');
    }
  }

  /* === 初期化（全閉じ） =============================== */
  $buttons.attr('aria-expanded','false');
  $('.accordion__panel')
        .attr('aria-hidden','true')
        .prop('inert', true)
        .hide(); // display:none

});
