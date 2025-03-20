<template lang="pug">
	.main-hero(ref="mainHero")
		.main-hero__content-left
			.main-hero__scroll-down листайте вниз
		.container
			.main-hero__image
				img(:src="`/images/main-hero/main-bg-new.jpg`" alt="фоновое изображение")
				//- NuxtPicture(:src="`/images/main-hero/main-bg-new.jpg`" alt="фоновое изображение")
				//- picture
				//- 	source(:srcset="`/images/main-hero/main-bg.jpg`" media="(min-width: 1366px)")
				//- 	source(type="image/webp" :srcset="`/images/main-hero/main-bg.webp`" media="(min-width: 1366px)")
				//- 	source(:srcset="`/images/main-hero/main-bg-pc.jpg`" media="(min-width: 767.98px)")
				//- 	source(type="image/webp" :srcset="`/images/main-hero/main-bg-pc.webp`" media="(min-width: 767.98px)")
				//- 	source(:srcset="`/images/main-hero/main-bg-mobile.jpg`" media="(min-width: 300px)")
				//- 	source(type="image/webp" :srcset="`/images/main-hero/main-bg-mobile.webp`" media="(min-width: 300px)")
				//- 	img(:src="`/images/main-hero/main-bg.jpg`" alt="фоновое изображение")
			.main-hero__body
				.main-hero__title.hero-title(:class="{active: isShowTitle}")
					picture
						source(:srcset="`/images/main-hero/hero-text.svg`" media="(min-width: 1400px)")
						source(:srcset="`/images/main-hero/hero-text-min-pc.svg`" media="(min-width: 1024px)")
						source(:srcset="`/images/main-hero/hero-text-tablet.svg`" media="(min-width: 767.98px)")
						img(:src="`/images/main-hero/hero-text.svg`" alt="логотип")
				.main-hero__title-mobile
					| Апарт-комплекс пушка
				SectionMainHeroCards
</template>

<script setup>
import Rellax from "rellax";

const { $gsap: gsap } = useNuxtApp();

const isShowTitle = ref(false);

const showTitle = () => {
  isShowTitle.value = !isShowTitle.value;
};

const mainHero = ref("");

const next = ref(false);

const animationHero = () => {
  // gsap.set(mainHero.value, { "--opacity": 0 });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mainHero.value,
      start: "top 0%",
      end: "+=100%",
      scrub: 1,
      pin: false,
      onUpdate: (self) => {
        if (self.progress >= 0.8) {
          next.value = true;
        } else {
          next.value = false;
        }
        // if (self.progress == 1) {
        //   gsap.to(".main-hero__cards", {
        //     opacity: 1,
        //     yPercent: 0,
        //     bottom: 0,
        //   });
        // } else {
        //   return;
        // }
      },
    },
  });
  tl.to(mainHero.value, {
    "--opacity": 1,
  });
  tl.to(".main-hero__cards", {
    opacity: 1,
  });
  tl.to(".main-hero__cards", {
    yPercent: 0,
  });
  // const cards = document.querySelectorAll(".main-hero__card-wrap");
  // cards.forEach((card, index) => {
  //    const duration = 0.5 + index * 0.2; // Увеличение длительности анимации для каждой карточки
  //    const yOffset = 30 + index * 10; // Увеличение смещения по оси Y для каждой карточки
  //    gsap.from(card, {
  //       y: yOffset, // Начальное смещение
  //       opacity: 0, // Начальная непрозрачность
  //       duration: duration, // Длительность анимации
  //       scrollTrigger: {
  //          trigger: card,
  //          start: "top 80%", // Запуск анимации, когда верх карточки достигает 80% высоты окна
  //          end: "top -30%", // Конец анимации, по достижении 30%
  //          toggleActions: "play none none reverse", // Поведение при прокрутке
  //          once: true, // Анимация сработает один раз
  //       },
  //    });
  // });
  new Rellax(".rellax");
};
onMounted(() => {
  if (window.innerWidth > 1024) {
    animationHero();
    showTitle();
  }
});
</script>

<style lang="scss">
:root {
  --index: calc(1vw + 1vh);
  --transition: transform 0.75s cubic-bezier(0.075, 0.5, 0, 0.9);
}
.main-hero-wrapper {
  position: fixed;
  height: 100vh;
  will-change: transform;
}
.main-hero {
  --opacity: 0;
  height: 100dvh;
  position: sticky;
  left: 0;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  // transform: translate3d(0, calc(var(--scrollTopDecrement) * 0.7), 0);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(43, 47, 59, 0.3);
    opacity: var(--opacity);
    // transition: opacity var(--time);
    z-index: 2;
    @media screen and (max-width: $xl) {
      opacity: 1;
      background: rgba(43, 47, 59, 0.4);
    }
  }
  @media screen and (max-width: $xl) {
    min-height: 743px;
    height: auto;
    padding: 165px 0 64px;
    position: relative;
  }
  @media screen and (max-width: $md) {
    min-height: 623px;
    padding: 112px 0;
    position: relative;
  }
  & .container {
    height: 100%;
    @media screen and (max-width: $xxxl) {
      padding: 0 100px;
    }
    @media screen and (max-width: $xl) {
      padding: 0 32px;
    }
    @media screen and (max-width: $md) {
      padding: 0 15px;
    }
  }
  &__body {
    position: relative;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: $xl) {
      flex-direction: column;
      gap: 49px;
    }
    @media screen and (max-width: $md) {
      gap: 56px;
    }
  }
  &__title {
    font-weight: 700;
    font-size: 140px;
    line-height: 160px;
    line-height: 114%;
    text-transform: uppercase;
    text-align: center;
    color: var(--text-white);
    opacity: 0;
    transition: opacity calc(var(--time) * 2) ease-out 0.5s;
    // transform: translate3d(0, calc(var(--scrollTopDecrement) * 0.3), 0);
    will-change: transform;
    &.active {
      opacity: 1;
    }
    @media screen and (max-width: $xl) {
      opacity: 1;
    }
    @media screen and (max-width: $md) {
      display: none;
    }
  }
  &__title-mobile {
    display: none;
    font-weight: 700;
    font-size: 42px;
    line-height: 50px;
    text-transform: uppercase;
    color: var(--text-white);
    @media screen and (max-width: $md) {
      display: block;
    }
  }
  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    will-change: transform;
    background-color: var(--text-white);
    & img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &__content-left {
    position: absolute;
    z-index: 2;
    bottom: 36px;
    left: 40px;
    transform: rotate(-90deg);
    transform-origin: left;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: opacity 0.5s;
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    font-family: var(--second-family);
    color: var(--text-white);
    @media screen and (max-width: $xxxl) {
      bottom: 32px;
      left: 32px;
    }
    @media screen and (max-width: $xl) {
      display: none;
    }
  }
  &__scroll-down {
    display: flex;
    align-items: center;
    gap: 20px;
    &::after {
      content: "";
      flex-shrink: 0;
      display: block;
      width: 80px;
      height: 2px;
      background-color: currentColor;
      transform: rotate(180deg);
    }
  }
  & .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    isolation: isolate;
    color: var(--text-white);
    z-index: 10;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% + 20px);
      background: linear-gradient(180deg, #2b2f3b 0%, rgba(43, 47, 59, 0) 100%);
      opacity: 0.5;
      z-index: -1;
    }
  }
}
</style>
