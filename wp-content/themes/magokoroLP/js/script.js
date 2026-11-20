'use strict';
{
  let animeTarget = document.querySelectorAll('.anime');
  let fadeinTarget = document.querySelectorAll('.fadein');

  window.addEventListener('scroll', () => {
    anime();
    fadein();
  });
  window.addEventListener('load', () => {
    anime();
    fadein();
  });

  function anime() {
    for (let i = 0; i < animeTarget.length; i++) {
      const rect = animeTarget[i].getBoundingClientRect().top;
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (0 > rect - windowHeight + 180) {
        animeTarget[i].classList.add('move');
      }
    }
  }

  function fadein() {
    for (let i = 0; i < fadeinTarget.length; i++) {
      const rect = fadeinTarget[i].getBoundingClientRect().top;
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (0 > rect - windowHeight + 180) {
        fadeinTarget[i].classList.add('scrollin');
      }
    }
  }


  $(function () {
    $(".js-qa_title").on("click", function () {
      $(this).next().slideToggle(200);
      $(this).toggleClass("open", 200);
    });
  });


  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4, // 一度に表示する枚数
    speed: 5000, // ループの時間
    allowTouchMove: false, // スワイプ無効
    autoplay: {
      delay: 0, // 途切れなくループ
    },
  });



  const popupOpen = document.querySelectorAll('.popup-open');
  const popup = document.querySelector('.popup');
  const popupBg = document.querySelector('.popup_bg');

  for (let i = 0; i < popupOpen.length; i++) {
    popupOpen[i].addEventListener('click', () => {
      popup.classList.add('active');
    });
  }
  popupBg.addEventListener('click', () => {
    popup.classList.remove('active');
  });


  //現在の時刻を取得
  $(document).ready(function () {
    // 現在の時間を取得
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // HTMLに反映
    $("#current-time").append(hours + "時" + minutes + "分");
  });


  const swiper2 = new Swiper('.swiper-corp', {
    direction: 'horizontal',
    loop: true,
    speed: 5000, // ゆっくり流れるようにする（調整可）
    slidesPerView: 'auto', // スライドの幅を自動調整
    allowTouchMove: false, // ユーザーのスワイプを無効化
    loopAdditionalSlides: 5, // ループの途切れを防ぐ
    autoplay: {
      delay: 0, // 遅延なしで連続再生
      disableOnInteraction: false, // ユーザー操作後も自動再生を継続
    }
  });
}
