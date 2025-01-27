<template lang="pug">
	div
		BreadCrumbs(:list="flatsList.breadcrumb")
		main.main.flats.flats-list
			.container
				FlatHeading
				FlatFilter(:params="flatsList.params" @load-data="loadData" @reset-filter="resetFilter")
				LoadingContainer(:status="status" :error="error")
				.flats__wrapper(v-if="flatsList.newData.length > 0")
					.flats__body
						FlatCard(
							v-for="(item, index) in flatsList.newData"
							:key="index" :flat="item"
							:flat-index="index"
							:active-card="activeCard"
							@toggle-dropdown="toggleDropdown")
					.flats__bottom(v-if="flatsList.currentPage.length > flatsList.pagination.perPage")
						UiButton(text="показать ещё" class-names="btn-transparent" @button-click="changePage")
				.flats__wrapper.empty(v-else) По вашему запросу ничего на найдено
</template>

<script setup>
// !!! Фильтрация реализована на строне сервера через гет параметры
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

const currentOptions = ref(
  route.query["options[]"] ? route.query["options[]"] : "all"
);

const params = ref({});

// Начальная провека (например, когда перезагружаем страницу)
if (route.query["options[]"] && route.query["options[]"].length) {
  params.value = {
    "price[min]": currentPriceMin.value,
    "price[max]": currentPriceMax.value,
    "space[min]": currentAreaMin.value,
    "space[max]": currentAreaMax.value,
    "floor[min]": currentFloorMin.value,
    "floor[max]": currentFloorMax.value,
    "options[]": route.query["options[]"],
  };
} else {
  params.value = {
    "price[min]": currentPriceMin.value,
    "price[max]": currentPriceMax.value,
    "space[min]": currentAreaMin.value,
    "space[max]": currentAreaMax.value,
    "floor[min]": currentFloorMin.value,
    "floor[max]": currentFloorMax.value,
  };
}

const cards = ref([]);

const initialState = () => {
  cards.value = [];
  currentPage.value = 0;
};

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
      },
    }),
  {
    transform: (res) => {
      const { breadcrumb, data, filter, meta, metatag } = res;
      cards.value.push(...data);
      const metadata = useMetatags(metatag.html_head);
      const currentPage = data;
      return {
        breadcrumb,
        data,
        newData: cards.value,
        currentPage,
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
        metadata,
      };
    },
    watch: [currentPage, params],
  }
);

useHead({
  ...flatsList.value.metadata,
});

cards.value = flatsList.value.newData;

const router = useRouter();

const fetchData = async (page) => {
  const { data: flatsListData } = await useAsyncData(
    "dynamicData",
    () =>
      $fetch(`${runtimeConfig.public.apiBase}/flats-list?_format=json`, {
        query: {
          ...params.value,
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
            currPage: +page,
          },
        };
      },
    }
  );
  return {
    data: flatsListData.value.data,
    pagination: flatsListData.value.pagination,
  };
};

const loadNewData = async () => {
  const { data } = await fetchData(currentPage.value);
  initialState();
  if (data.length > 0) {
    flatsList.value.newData = data;
  }
};

// Следим за изменением гет параметров в адресной строке
watch(
  () => route.query,
  (newVal) => {
    router.push({
      path: route.path,
      query: {
        ...newVal,
        page: currentPage.value,
      },
    });
  }
);

watch(
  () => currentPage.value,
  (val) => {
    currentPage.value = val;
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
  currentPriceMin.value = minPrice;
  currentPriceMax.value = maxPrice;
  currentAreaMin.value = minArea;
  currentAreaMax.value = maxArea;
  currentFloorMin.value = minFloor;
  currentFloorMax.value = maxFloor;
  currentOptions.value = options;
  params.value = {
    "price[min]": currentPriceMin.value,
    "price[max]": currentPriceMax.value,
    "space[min]": currentAreaMin.value,
    "space[max]": currentAreaMax.value,
    "floor[min]": currentFloorMin.value,
    "floor[max]": currentFloorMax.value,
  };
  initialState();
  router.push({
    path: route.path,
    query: {
      ...params.value,
    },
  });
  if (options.length > 0) {
    params.value = {
      ...params.value,
      "options[]": currentOptions.value,
    };
    router.push({
      query: { ...params.value, "options[]": currentOptions.value },
    });
  }
  refresh();
};

const changePage = () => {
  currentPage.value++;
  router.push({
    query: {
      page: currentPage.value,
      ...params.value,
    },
  });
};

const resetFilter = async () => {
  params.value = "";
  router.push({
    path: route.path,
    query: {},
  });
  await loadNewData();
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
onMounted(async () => {
  document.addEventListener("click", closeAllDropdowns);
});
onUnmounted(() => {
  document.removeEventListener("click", closeAllDropdowns);
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
    &.empty {
      font-size: 18px;
      line-height: 28px;
      display: block;
      margin-top: 64px;
      @media screen and (max-width: $xl) {
        margin-top: 40px;
      }
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
