<template lang="pug">
	section.main-scenariors
		.container
			.main-scenariors__wrapper
				.section-top
					SectionHeading(title="Сценарии жизни")
					.section-top__content
						h2.section-top__title.custom-title
							| Правильные инвестиции
						.section-top__description
							| Благодаря продуманному концепту проекта, в&nbsp;Пушке будет реализовано несколько сценариев жизни
				SectionMainScenariorsCards
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();

const timeline = ref(null);

const route = useRoute();

const router = useRouter();

const checkAnchor = () => {
  const hash = route.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      // Плавно прокрутить к элементу без анимации GSAP
      targetElement.scrollIntoView({ behavior: "smooth" });
      router.push({ path: "/", hash });
      // history.replaceState(null, null, " ");
      // window.history.pushState(null, "", "#" + targetElement.id);
    }
  }
};

const animationScenariors = () => {
  const cards = document.querySelectorAll(".scenariors__card");
  const boxCards = document.querySelector(".main-scenariors");
  if (cards.length > 0) {
    timeline.value = gsap
      .timeline({
        scrollTrigger: {
          trigger: boxCards,
          pin: true,
          // pinSpacing: true,
          stagger: 0.5,
          start: `top -${window.innerWidth > 1400 ? 120 : 100}`,
          end: () => "+=" + cards[0].clientHeight * cards.length,
          scrub: 1,
          duration: 1,
        },
      })
      // .to(".main-scenariors__cards", {
      //    marginBottom: "-100px",
      // })
      .from(".card-scenariors--1", {
        y: "130vh",
      })
      .to(".card-scenariors--1", {
        yPercent: 0,
      })
      .from(".card-scenariors--2", {
        y: "130vh",
        // opacity: 1,
      })
      .to(
        ".card-scenariors--1",
        {
          yPercent: 0,
        },
        "-=0.03"
      )
      .to(".card-scenariors--2", {
        yPercent: 0,
      })
      .from(".card-scenariors--3", {
        y: "130vh",
      })
      .to(
        ".card-scenariors--2",
        {
          yPercent: 0,
        },
        "-=0.03"
      )
      .to(".card-scenariors--3", {
        yPercent: 0,
      });
  }
};
onMounted(() => {
  if (window.innerWidth > 1024 && !window.location.hash) {
    animationScenariors();
    // Проверить якорь при монтировании компонента
    checkAnchor();
  }
});
</script>

<style lang="scss" scoped>
.main-scenariors {
  padding: 110px 0;
  // overflow: clip;
  &__wrapper {
    @media screen and (max-width: $xl) {
      display: grid;
      grid-template-columns: 100%;
      gap: 71px 0;
    }
    @media screen and (max-width: $md) {
      gap: 42px 0;
    }
  }
}
.section-top {
  justify-items: center;
  text-align: center;
  @media screen and (max-width: $md) {
    justify-items: start;
    text-align: left;
  }
  &__content {
    text-align: center;
    justify-items: center;
    @media screen and (max-width: $md) {
      text-align: left;
      justify-items: start;
    }
  }
  &__title {
    font-size: 92px;
    line-height: 108px;
    @media screen and (max-width: $xxxl) {
      font-size: 56px;
      line-height: 73px;
    }
    @media screen and (max-width: $xl) {
      font-size: 36px;
      line-height: 47px;
    }
    @media screen and (max-width: $md) {
      font-size: 28px;
      line-height: 36px;
    }
  }
  &__description {
    @media screen and (max-width: $xl) {
      max-width: 600px;
      font-size: 20px;
      line-height: 32px;
    }
    @media screen and (max-width: $md) {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
