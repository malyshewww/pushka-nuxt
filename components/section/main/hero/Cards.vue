<template lang="pug">
	.main-hero__cards
		.main-hero__card-wrap.rellax(v-for="(card, index) in data.cards" :key="index" :data-rellax-speed="card.speed")
			.main-hero__card.hero-card
				.hero-card__title(v-html="card.title")
</template>

<script setup>
const data = reactive({
  cards: [
    {
      title: "нижегородский район",
      speed: 8,
    },
    {
      title: "рядом парк Пушкина",
      speed: 10,
    },
    {
      title: "3 минуты до&nbsp;улицы Белинского",
      speed: 9,
    },
  ],
});
</script>

<style lang="scss" scoped>
.main-hero {
  &__cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 210px;
    width: 100%;
    position: absolute;
    max-width: 1520px;
    //  bottom: -64px;
    height: 100vh;
    opacity: 1;
    transform: translateY(120vh);
    pointer-events: none;
    // &.active {
    //    & .hero-card {
    //       opacity: 1;
    //       transform: translate3d(0, 0, 0);
    //    }
    // }
    @media screen and (max-width: 1600px) {
      gap: 105px;
      bottom: -226px;
    }
    @media screen and (max-width: $xxl) {
      gap: 64px;
      height: 311px;
      bottom: 64px;
    }
    @media screen and (max-width: $xl) {
      position: static;
      transform: none;
      opacity: 1;
    }
    @media screen and (max-width: $md) {
      height: auto;
      gap: 14px;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__card-wrap {
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) .hero-card {
        &::after {
          background-image: url("/images/icons/hero-icon-#{$i}.svg");
        }
      }
    }
    &:nth-child(1) {
      align-self: start;
      & .hero-card {
        transition-delay: 1s;
        background-color: var(--text-midnight-70);
      }
    }
    &:nth-child(2) {
      flex-grow: 1;
      align-self: end;
      & .hero-card {
        transition-delay: 1.5s;
        background-color: var(--text-avocado);
      }
      @media screen and (max-width: $md) {
        align-self: flex-start;
        order: 1;
      }
    }
    &:nth-child(3) {
      position: relative;
      top: 5px;
      & .hero-card {
        transition-delay: 2s;
        background-color: var(--bg-sand);
        &__title {
          max-width: 155px;
          @media screen and (max-width: $md) {
            max-width: 100%;
          }
        }
      }
      @media screen and (max-width: $xxxl) {
        top: -6px;
      }
      @media screen and (max-width: $xl) {
        top: 0;
      }
    }
  }
}
.hero-card {
  min-height: 300px;
  width: 270px;
  flex-shrink: 0;
  padding: 36px 28px;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  text-transform: uppercase;
  color: var(--text-white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  box-shadow: 0 0 28px 0 rgba(43, 47, 59, 0.2);
  gap: 10px;
  //  opacity: 0;
  //  transform: translate3d(0, 30px, 0);
  //  transition: opacity 0.6s ease 0s, transform 0.6s ease 0s;
  &::after {
    content: "";
    display: block;
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    background-repeat: no-repeat;
    background-position: center;
    @media screen and (max-width: $xl) {
      width: 36px;
      height: 36px;
      background-size: 30px 30px;
    }
    @media screen and (max-width: $md) {
      content: none;
    }
  }
  @media screen and (max-width: $xxl) {
    width: 180px;
    min-height: 180px;
    padding: 20px 16px;
    font-size: 14px;
    line-height: 18px;
  }
  @media screen and (max-width: $md) {
    width: fit-content;
    min-height: 37px;
    font-size: 13px;
    line-height: 17px;
    padding: 6px 15px;
    border-radius: 100px;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>
