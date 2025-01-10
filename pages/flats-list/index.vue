<template lang="pug">
	div
		BreadCrumbs(:list="flatsList.breadcrumb")
		main.main.flats.flats-list
			.container
				FlatHeading
				| {{status}}
				FlatFilter(:params="flatsList.params" @load-data="loadData")
				.flats__wrapper
					.flats__body
						FlatCard(
							v-for="(item, index) in flatsList.data"
							:key="index" :flat="item"
							:flat-index="index"
							:active-card="activeCard"
							@toggle-dropdown="toggleDropdown")
					.flats__bottom
						UiButton(text="показать ещё" class-names="btn-transparent")
</template>

<script setup>
useHead({
   bodyAttrs: {
      class: "page--flats-list",
   },
});

const route = useRoute();

const currentPage = ref(route.query.page ? route.query.page : 0);
const currentPriceMin = ref(
   route.query["price[min]"] ? route.query["price[min]"] : "all"
);
const currentPriceMax = ref(
   route.query["price[max]"] ? route.query["price[max]"] : "all"
);
const currentAreaMin = ref(
   route.query["space[min]"] ? route.query["space[min]"] : "all"
);
const currentAreaMax = ref(
   route.query["space[max]"] ? route.query["space[max]"] : "all"
);
const currentFloorMin = ref(
   route.query["floor[min]"] ? route.query["floor[min]"] : "all"
);
const currentFloorMax = ref(
   route.query["floor[max]"] ? route.query["floor[max]"] : "all"
);

const options = ref(
   route.query["options[]"] ? route.query["options[]"] : "all"
);

const optionView = ref("all");

// watch(
//    () => route.query,
//    (val) => {
//       currentPriceMin.value = val["price[min]"];
//       currentPriceMax.value = val["price[max]"];
//       currentAreaMin.value = val["space[min]"];
//       currentAreaMax.value = val["space[max]"];
//       currentFloorMin.value = val["floor[min]"];
//       currentFloorMax.value = val["floor[max]"];
//    }
// );

const runtimeConfig = useRuntimeConfig();
const {
   data: flatsList,
   status,
   refresh,
   error,
} = await useAsyncData(
   "flatsList",
   () =>
      $fetch(`${runtimeConfig.public.apiBase}/flats-list?_format=json`, {
         params: {
            "price[min]": currentPriceMin.value,
            "price[max]": currentPriceMax.value,
            "space[min]": currentAreaMin.value,
            "space[max]": currentAreaMax.value,
            "floor[min]": currentFloorMin.value,
            "floor[max]": currentFloorMax.value,
         },
      }),
   {
      transform: (res) => {
         const { breadcrumb, data, filter } = res;
         console.log(data);
         return {
            breadcrumb,
            data,
            params: {
               floor: filter.slider.floor,
               price: filter.slider.price,
               space: filter.slider.space,
               options: filter.options,
            },
         };
      },
   }
);

const router = useRouter();

const products = ref([]);

const fetchData = async (
   page,
   priceMin,
   priceMax,
   areaMin,
   areaMax,
   floorMin,
   floorMax,
   options
) => {
   const {
      data: dynamicData,
      status,
      error,
   } = await useAsyncData(
      "dynamicData",
      () =>
         $fetch(`${runtimeConfig.public.apiBase}/flats-list?_format=json`, {
            params: {
               page,
               "price[min]": priceMin,
               "price[max]": priceMax,
               "space[min]": areaMin,
               "space[max]": areaMax,
               "floor[min]": floorMin,
               "floor[max]": floorMax,
               "options[]": options,
            },
         }),
      {
         transform: (res) => {
            const { data } = res;
            return {
               main: {
                  list: data,
               },
            };
         },
      }
   );
   return {
      data: dynamicData.value.main.list,
   };
};

// const loadData = async () => {
//    const { data } = await fetchData(currentPage.value);
//    if (data.length > 0) {
//       cards.value.push(...data);
//    }
// };

const arrValues = ref([]);

watch(
   () => route.query,
   (newVal, oldVal) => {
      console.log("old", oldVal);
      console.log("new", newVal);
      router.push({
         path: route.path,
         query: {
            page: currentPage.value,
            ...newVal,
         },
      });
   }
);

const loadData = async (
   minPrice,
   maxPrice,
   minFloor,
   maxFloor,
   minArea,
   maxArea,
   options
) => {
   console.log("options", options);
   currentPriceMin.value = minPrice;
   currentPriceMax.value = maxPrice;
   currentAreaMin.value = minArea;
   currentAreaMax.value = maxArea;
   currentFloorMin.value = minFloor;
   currentFloorMax.value = maxFloor;
   options.value = options;
   router.push({
      path: route.path,
      query: {
         page: currentPage.value,
         "price[min]": minPrice,
         "price[max]": maxPrice,
         "space[min]": minArea,
         "space[max]": maxArea,
         "floor[min]": minFloor,
         "floor[max]": maxFloor,
      },
   });
   if (options.length > 0) {
      router.push({
         query: { ...route.query, "options[]": options.value },
      });
   }
   refresh();
};

const activeCard = ref(-1);

const toggleDropdown = (index) => {
   // Если открыта та же карточка, закрываем ее
   if (activeCard.value === index) {
      activeCard.value = -1;
   } else {
      // Открываем новую карточку и закрываем остальные
      activeCard.value = index;
   }
};
const closeAllDropdowns = (e) => {
   const target = e.target;
   if (!target.closest(".parameters-card__wrapper")) {
      activeCard.value = -1;
   }
};
onUnmounted(() => {
   document.removeEventListener("click", closeAllDropdowns);
});
onMounted(() => {
   document.addEventListener("click", closeAllDropdowns);
});
</script>

<style lang="scss" scoped>
.flats-list .heading-main {
   @media screen and (max-width: $md) {
      gap: 48px 20px;
   }
}
.flats {
   overflow: clip;
   &__wrapper {
      display: grid;
      align-items: start;
      gap: 64px;
      margin-top: 64px;
      @media screen and (max-width: $xl) {
         gap: 32px;
         margin-top: 40px;
      }
   }
   &__body {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      @media screen and (max-width: $xxxl) {
         grid-template-columns: repeat(3, 1fr);
      }
      @media screen and (max-width: $xl) {
         grid-template-columns: repeat(2, 1fr);
         gap: 20px;
      }
      @media screen and (max-width: $md) {
         grid-template-columns: 100%;
      }
   }
   &__bottom {
      justify-self: center;
      @media screen and (max-width: $xl) {
         justify-self: stretch;
      }
   }
}
</style>
