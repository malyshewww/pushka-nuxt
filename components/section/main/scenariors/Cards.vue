<template lang="pug">
	.main-scenariors__cards
		SectionMainScenariorsCard(v-for="(item, index) in scenariorCards" :key="index" :card="item" :index="index")
</template>

<script setup>
const scenariorCards = [
  {
    title: "Стартовое жильё",
    text: "для молодёжи и&nbsp;студентов",
  },
  {
    title: "Проживание",
    text: "Квартира для&nbsp;долгосрочного проживания",
  },
  {
    title: "Аренда",
    text: "Жильё на короткий срок для туристов и&nbsp;командировочных",
  },
];

const calcPositionCards = () => {
  const mainScenariors = document.querySelector(".main-scenariors");
  if (mainScenariors) {
    const mainScenariorsCards = mainScenariors.querySelector(
      ".main-scenariors__cards"
    );
    if (window.innerWidth > 1024) {
      // mainScenariorsCards.style.marginTop = `-${sectionTopHeight}px`;
      mainScenariorsCards.style.marginTop = `-${
        window.innerWidth > 1400 ? 120 : 100
      }px`;
    }
  }
};

onMounted(() => {
  calcPositionCards();
  window.addEventListener("resize", calcPositionCards);
});
onUnmounted(() => {
  window.addEventListener("resize", calcPositionCards);
});
</script>

<style lang="scss" scoped>
.main-scenariors {
  &__cards {
    display: flex;
    max-width: 1115px;
    height: 628px;
    align-items: flex-start;
    margin: 0 auto;
    counter-reset: num;
    position: relative;
    margin-top: -288px;
    @media screen and (max-width: $xxxl) {
      margin-top: -238px;
      max-width: 1042px;
      height: 583px;
    }
    @media screen and (max-width: $xl) {
      margin-top: 0;
      height: auto;
      max-width: 100%;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
    @media screen and (max-width: $md) {
      gap: 14px;
    }
  }
}
</style>
