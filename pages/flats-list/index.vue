<template lang="pug">
	div
		BreadCrumbs(:list="flatsList.breadcrumb")
		main.main.flats.flats-list
			.container
				FlatHeading
				| status: {{status}}
				FlatFilter(:params="flatsList.params" @load-data="loadData" @reset-filter="resetFilter")
				.flats__wrapper
					.flats__body
						FlatCard(
							v-for="(item, index) in flatsList.newData"
							:key="index" :flat="item"
							:flat-index="index"
							:active-card="activeCard"
							@toggle-dropdown="toggleDropdown")
					.flats__bottom
						UiButton(v-if="flatsList.pagination.count > cards.length" text="показать ещё" class-names="btn-transparent" @button-click="changePage")
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

const params = ref({});

const cards = ref([]);

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
      query: {
        page: currentPage.value,
        ...params.value,
        //   "price[min]": currentPriceMin.value,
        //   "price[max]": currentPriceMax.value,
        //   "space[min]": currentAreaMin.value,
        //   "space[max]": currentAreaMax.value,
        //   "floor[min]": currentFloorMin.value,
        //   "floor[max]": currentFloorMax.value,
      },
    }),
  {
    transform: (res) => {
      const { breadcrumb, data, filter, meta } = res;
      cards.value.push(...data);
      return {
        breadcrumb,
        data,
        newData: cards.value,
        params: {
          floor: filter.slider.floor,
          price: filter.slider.price,
          space: filter.slider.space,
          options: filter.options,
        },
        pagination: {
          perPage: meta.per_page,
          count: meta.count,
          countPages: Math.ceil(meta.count / meta.per_page),
          currPage: +currentPage.value,
        },
      };
    },
    watch: [currentPage],
  }
);

const router = useRouter();

// Следим за изменением гет параметров в адресной строке
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

const fetchData = async (page) => {
  const {
    data: flatsListData,
    status,
    error,
  } = await useAsyncData(
    "dynamicData",
    () =>
      $fetch(`${runtimeConfig.public.apiBase}/flats-list?_format=json`, {
        query: {
          page,
        },
      }),
    {
      transform: ({ data, meta }) => {
        return {
          data,
          pagination: {
            perPage: meta.per_page,
            count: meta.count,
            totalItems: Math.ceil(meta.count / meta.per_page),
            currPage: page,
          },
        };
      },
    }
  );
  return {
    data: flatsListData.value.main.list,
    pagination: flatsListData.value.pagination,
  };
};

const loadNewData = async () => {
  const { data } = await fetchData(currentPage.value);
  if (data.length > 0) {
    cards.value.push(...data);
  }
};

const changePage = async () => {
  currentPage.value++;
  router.push({
    query: {
      ...route.query,
      page: currentPage.value,
    },
  });
};

const loadData = async (
  minPrice,
  maxPrice,
  minFloor,
  maxFloor,
  minArea,
  maxArea,
  options
) => {
  currentPriceMin.value = minPrice;
  currentPriceMax.value = maxPrice;
  currentAreaMin.value = minArea;
  currentAreaMax.value = maxArea;
  currentFloorMin.value = minFloor;
  currentFloorMax.value = maxFloor;
  options.value = options;
  params.value = {
    "price[min]": currentPriceMin.value,
    "price[max]": currentPriceMax.value,
    "space[min]": currentAreaMin.value,
    "space[max]": currentAreaMax.value,
    "floor[min]": currentFloorMin.value,
    "floor[max]": currentFloorMax.value,
  };
  cards.value = [];
  currentPage.value = 0;
  //   cards.value.push(...flatsList.value.data);

  router.push({
    path: route.path,
    query: {
      ...params.value,
    },
  });
  if (options.length > 0) {
    params.value = {
      ...route.query,
      "options[]": options.value,
    };
    router.push({
      query: { ...route.query, "options[]": options.value },
    });
  }
  refresh();
};

const resetFilter = async () => {
  params.value = "";
  router.push({
    path: route.path,
    query: {},
  });
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
