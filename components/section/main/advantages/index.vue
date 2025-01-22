<template lang="pug">
	section.main-advantages
		.container
			.main-advantages__body
				aside.main-advantages__aside
					.section-top
						SectionHeading(title="Преимущества")
						.section-top__content
							h2.section-top__title.custom-title
								| Всё #[span.text-transparent-current важное&nbsp;—] Есть
					.main-advantages__decor
						NuxtPicture(:src="`/images/main-advantages/decor.png`" alt="декор")
				ul.main-advantages__list
					SectionMainAdvantagesCard(v-for="(card, index) in advantages" :key="index" :idx="index" :card="card" @show-info="showInfo" :active-index="activeIndex")
</template>

<script setup>
const activeIndex = ref(null);

const showInfo = (index) => {
  activeIndex.value = index;
};

const advantages = [
  {
    title: "Многоуровневый паркинг с лифтом",
    text: [
      "На нижних этажах здания расположен многоуровневый подземный паркинг, попасть в который можно на лифте из жилой части дома.",
      "На парковке предусмотрены места для велосипедов и самокатов",
    ],
  },
  {
    title: "Холл с дизайнерским ремонтом",
    text: [
      "В холле будет выполнен дизайнерский ремонт с учетом современных тенденций",
    ],
  },
  {
    title: "Апартаменты с&nbsp;отделкой под ключ",
    text: ["Жилые помещения в комплексе сдаются с отделкой «под ключ»"],
  },
  {
    title: "Сервисы первого этажа",
    text: [
      "Ресепшен",
      "Зона ожидания для курьеров",
      "Зона хранения багажа для гостей города",
    ],
  },
  {
    title: "Общественные пространства",
    text: [
      "Launge пространство, которое можно использовать для работы или чтения книг",
    ],
  },
  {
    title: "Дополнительный комфорт",
    text: ["Территория первого этажа с покрытием WI-FI.", "Отдельный санузел"],
  },
];
</script>

<style lang="scss" scoped>
.main-advantages {
  padding: 110px 0;
  &__body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    align-items: start;
    @media screen and (max-width: 1600px) {
      grid-template-columns: 1fr 1.4fr;
    }
    @media screen and (max-width: $xxxl) {
      grid-template-columns: 100%;
      max-width: 834px;
      gap: 64px 0px;
    }
    @media screen and (max-width: $xl) {
      max-width: 100%;
      gap: 48px 0;
    }
    @media screen and (max-width: $md) {
      gap: 42px 0;
    }
  }
  &__aside {
    max-width: 688px;
    display: flex;
    flex-direction: column;
    gap: 305px 0px;
    position: sticky;
    top: 85px;
    @media screen and (max-height: 800px) {
      gap: 85px 0px;
    }
    @media screen and (max-width: 1600px) {
      gap: 50px 0px;
      position: static;
    }
  }
  &__list {
    @include reset-list;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    align-items: start;
    @media screen and (max-width: $xl) {
      gap: 20px;
    }
    @media screen and (max-width: $md) {
      grid-template-columns: 100%;
    }
  }
  &__decor {
    width: 330px;
    height: 219px;
    & img {
      width: 100%;
      height: 100%;
    }
    @media screen and (max-width: $xxxl) {
      display: none;
    }
  }
}
</style>
