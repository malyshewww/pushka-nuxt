<template lang="pug">
	section.main-about#about
		.container
			.main-about__wrapper(ref="aboutWrapper")
				.main-about__body
					SectionHeading(title="О проекте")
					h2.main-about__title.title-about
						span.title-about__text.title-about__text--left апартаменты нового
						span.title-about__text уровня для тех, кто&nbsp;хочет
						span.title-about__text--right 
							span  жить в центре
							span.title-about__labels(data-title="ул. Тимирязева")
						span.title-about__text по приемлемой стоимости
					h2.main-about__title.title-about.title-about-mobile апартаменты нового уровня для тех, кто&nbsp;хочет жить в центре по приемлемой стоимости
					.main-about__description Апартаменты «Пушка» будут представлены 12-ти этажным жилым домом с&nbsp;дополнительным парапетом первого этажа. Необычное архитектурное&nbsp;решение здания подчёркивает общий концепт проекта — динамичность, мобильность, современность
				.main-about__image-container
					.main-about__image-wrap
						.main-about__image.ibg(ref="aboutImage")
							NuxtPicture(:src="`/images/main-about/about-img.jpg`" alt="фоновое изображение")
							//- img(:src="`/images/main-about/about-img.jpg`" alt="фоновое изображение")
</template>

<script setup>
const aboutImage = ref("");

const aboutWrapper = ref("");

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

const animation = () => {
  gsap.fromTo(
    aboutImage.value,
    {
      scale: 0.2,
      opacity: 0,
      visibility: "hidden",
    },
    {
      scale: 1,
      visibility: "inherit",
      // height: "100%",
      opacity: 1,
      scrollTrigger: {
        trigger: aboutWrapper.value,
        start: `top`,
        end: () => "+=90%",
        scrub: 1,
        // duration: 0.5,
      },
    }
  );
};

onMounted(() => {
  if (window.innerWidth > 1024) {
    animation();
  }
});
</script>

<style lang="scss" scoped>
.main-about {
  padding: 120px 0 110px;
  &__wrapper {
    display: grid;
    grid-template-columns: 100%;
    gap: 160px;
    @media screen and (max-width: $xxxl) {
      gap: 140px 0px;
    }
    @media screen and (max-width: $xl) {
      gap: 101px 0px;
    }
    @media screen and (max-width: $md) {
      gap: 56px 0;
    }
  }
  &__body {
    display: grid;
    align-items: start;
    justify-items: center;
    text-align: center;
    gap: 40px;
    @media screen and (max-width: $xxxl) {
      gap: 32px;
    }
    @media screen and (max-width: $xl) {
      gap: 24px;
    }
    @media screen and (max-width: $md) {
      gap: 16px;
      justify-items: start;
      align-items: start;
      text-align: left;
    }
  }
  &__description {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    line-height: 160%;
    text-align: center;
    color: var(--text-midnight-100);
    font-family: var(--font-family);
    max-width: 850px;
    justify-self: center;
    @media screen and (max-width: $xl) {
      font-size: 16px;
      line-height: 24px;
    }
    @media screen and (max-width: $md) {
      text-align: left;
    }
  }
  &__image-container {
    width: 100%;
    display: grid;
    place-items: center;
  }
  &__image-wrap {
    // height: 860px;
    // padding-bottom: 51.66%;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    transform-origin: 0 0;
    height: 860px;
    @media screen and (max-width: $xxxl) {
      height: 576px;
      // padding-bottom: 49.66%;
    }
    @media screen and (max-width: $xl) {
      padding-bottom: 51.15%;
      height: auto;
    }
  }
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    & picture {
      position: absolute;
      inset: 0;
    }
    & img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.title-about {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  font-size: 92px;
  line-height: 108px;
  text-transform: uppercase;
  margin: 0 0 20px;
  &-mobile {
    display: none;
  }
  @media screen and (max-width: $xxxl) {
    font-size: 56px;
    line-height: 73px;
    margin: 0;
  }
  @media screen and (max-width: $xl) {
    font-size: 36px;
    line-height: 47px;
  }
  @media screen and (max-width: $md) {
    display: none;
    font-size: 28px;
    line-height: 36px;
    &-mobile {
      display: block;
      margin-top: 4px;
    }
  }
  &__text--left {
    display: inline-flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0px 30px;
    &::before {
      content: "";
      display: block;
      width: 320px;
      border-radius: 500px;
      padding: 20px;
      display: grid;
      place-items: center;
      height: 92px;
      background-color: var(--text-avocado);
      background-image: url("/images/main-about/text-logo.svg");
      background-repeat: no-repeat;
      background-position: center;
      @media screen and (max-width: $xxxl) {
        width: 267px;
        height: 69px;
        padding: 16px;
        background-size: 172px 34px;
      }
      @media screen and (max-width: $xl) {
        width: 176px;
        height: 48px;
        padding: 12px 36px 16px;
        background-size: 105px 21px;
      }
      @media screen and (max-width: $md) {
        content: none;
      }
    }
    @media screen and (max-width: $xxxl) {
      gap: 0 18px;
    }
    @media screen and (max-width: $xl) {
      gap: 0 14px;
    }
    @media screen and (max-width: $md) {
      display: inline-block;
    }
  }
  &__text--right {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0 30px;
    @media screen and (max-width: $xxxl) {
      gap: 0 18px;
    }
    @media screen and (max-width: $xl) {
      gap: 0 14px;
    }
    @media screen and (max-width: $md) {
      display: inline-block;
    }
  }
  &__labels {
    display: flex;
    align-items: center;
    gap: 4px;
    &::before,
    &::after {
      content: "";
      display: block;
      height: 92px;
      border-radius: 500px;
      @media screen and (max-width: $xxxl) {
        height: 69px;
      }
      @media screen and (max-width: $xl) {
        height: 48px;
      }
    }
    &::before {
      width: 180px;
      background-image: url("/images/main-about/text-image.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      @media screen and (max-width: $xxxl) {
        width: 180px;
      }
      @media screen and (max-width: $xl) {
        width: 106px;
      }
    }
    &::after {
      content: attr(data-title);
      font-weight: 700;
      font-size: 22px;
      line-height: 27px;
      line-height: 125%;
      text-transform: uppercase;
      text-align: center;
      color: var(--text-white);
      display: grid;
      place-items: center;
      padding: 10px;
      width: 315px;
      background: var(--text-midnight-70);
      @media screen and (max-width: $xxxl) {
        width: 307px;
        font-size: 22px;
        line-height: 27px;
      }
      @media screen and (max-width: $xl) {
        width: 245px;
        font-size: 18px;
        line-height: 20px;
        padding: 10px;
      }
    }
    @media screen and (max-width: $md) {
      display: none;
    }
  }
}
</style>
