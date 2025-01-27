<template lang="pug">
	.scenariors__card.card-scenariors(:class="`card-scenariors--${index+1}`")
		.card-scenariors__caption {{ card.title }}
		.card-scenariors__text(v-html="card.text")
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card-scenariors {
  height: 480px;
  width: 430px;
  flex-shrink: 0;
  padding: 40px 52px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--text-white);
  position: absolute;
  // width: 200px;
  // height: 300px;
  // background-color: lightblue;
  // border: 2px solid #333;
  // border-radius: 15px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // opacity: 0; /* Изначально скрыты */
  // transform: scale(0); /* Начальное состояние для анимации */
  // @media screen and (max-height: 700px) {
  //    height: 380px;
  // }
  @media screen and (max-width: $xxxl) {
    height: 446px;
    width: 402px;
  }
  @media screen and (max-width: $xxl) {
    height: 400px;
    width: 350px;
    padding: 30px 20px;
  }
  @media screen and (max-width: $xl) {
    position: static;
    padding: 20px 28px;
    width: 100%;
    height: auto;
    min-height: 130px;
    gap: 12px;
  }
  @media screen and (max-width: $md) {
    padding: 16px 20px;
    gap: 8px;
    min-height: 176.5px;
  }
  &:nth-child(1) {
    background-color: var(--text-avocado);
    z-index: 2;
    top: 115px;
    left: 40px;
    transform: rotate(-10deg);
    @media screen and (max-width: $xxl) {
      left: 0;
    }
    @media screen and (max-width: $xl) {
      transform: none;
    }
  }
  &:nth-child(2) {
    background-color: var(--text-midnight-70);
    z-index: 2;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
  }
  &:nth-child(3) {
    background-color: var(--bg-sand);
    // transform: translate(-125px, 115px) rotate(10deg);
    z-index: 3;
    right: 40px;
    top: 115px;
    transform: rotate(10deg);
    @media screen and (max-width: $xxl) {
      right: 0;
    }
    @media screen and (max-width: $xl) {
      transform: none;
    }
  }
  &__caption {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    gap: 12px;
    &::before {
      content: "0" counter(num);
      counter-increment: num;
      display: block;
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      @media screen and (max-width: $xl) {
        font-size: 16px;
        line-height: 24px;
      }
    }
    @media screen and (max-width: $xl) {
      font-size: 18px;
      line-height: 24px;
    }
    @media screen and (max-width: $md) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  &__text {
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    text-transform: uppercase;
    @media screen and (max-width: $xl) {
      font-size: 14px;
      line-height: 18px;
    }
    @media screen and (max-width: $md) {
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
