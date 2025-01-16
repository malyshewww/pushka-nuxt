<template lang="pug">
	div
		BreadCrumbs(:list="apartment.breadcrumb")
		main.main.apartment-card
			.container
				.apartment-card__wrapper
					.apartment-card__body
						SectionApartmentScheme(:plan="apartment.main.scheme.planImage" :floor="apartment.main.scheme.floorImage")
						SectionApartmentInfo(:info="apartment.main.info")
					SliderGallery(:slider="slider" slider-caption="Варианты дизайнерской отделки" :isDescr="true")
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "page--apartment",
  },
});

const slider = [
  {
    img: "1",
    alt: "описание",
  },
  {
    img: "2",
    alt: "описание",
  },
  {
    img: "3",
    alt: "описание",
  },
  {
    img: "4",
    alt: "описание",
  },
  {
    img: "4",
    alt: "описание",
  },
];

const { id } = useRoute().params;
const runtimeConfig = useRuntimeConfig();
const {
  data: apartment,
  status,
  error,
} = await useAsyncData(
  "apartment",
  () =>
    $fetch(`${runtimeConfig.public.apiBase}/flats-list/${id}?_format=json`, {}),
  {
    transform: (res) => {
      const { breadcrumb, data, metatag } = res;
      return {
        breadcrumb,
        main: {
          info: {
            title: data.title,
            floor: data.field_floor[0],
            number: data.field_number[0],
            price: data.field_price[0],
            price_square: data.field_price_sq[0],
            room: data.field_room_count[0],
            space: data.field_space[0],
            status: data.field_status[0],
            options: data.options,
          },
          scheme: {
            planImage: data.field_plan[0],
            floorImage: data.floor_image,
          },
        },
      };
    },
  }
);
</script>

<style lang="scss" scoped>
.apartment-card {
  overflow: clip;
  &__wrapper {
    display: grid;
    grid-template-columns: 100%;
    gap: 156px;
    @media screen and (max-width: $xl) {
      gap: 80px;
    }
    @media screen and (max-width: $md) {
      gap: 40px;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: 1fr 549px;
    gap: 96px;
    align-items: start;
    @media screen and (max-width: $xxxl) {
      gap: 40px;
      grid-template-columns: 1fr 400px;
    }
    @media screen and (max-width: $xl) {
      grid-template-columns: 100%;
      gap: 20px;
    }
  }
}
</style>
