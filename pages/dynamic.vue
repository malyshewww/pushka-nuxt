<template lang="pug">
	div
		BreadCrumbs(:list="initDynamicData.breadcrumb")
		main.main.dynamic
			.container
				.main__heading.heading-main
					h1.heading-main__title
						| Динамика
						span.text-transparent 
							span.text-transparent-current строительства
							span.text-transparent__label 
								span Сдаём проект в 2027
				.dynamic__wrapper
					.dynamic__body
						ProgressCard(v-for="(item, index) in cards" :key="index" @click="openPopupDynamic($event, item)" :card="item")
					.dynamic__bottom(v-if="hasMore")
						UiButton(text="Показать ещё" class-names="btn-transparent" @button-click="loadData")
	PopupDynamic(:is-open.sync="storePopupDynamic.isOpenPopupDynamic" @close-popup="closePopupDynamic" :popup-data="initialState")
</template>

<script setup>
import { usePopupDynamicStore } from "~/stores/popup/dynamic";

const storePopupDynamic = usePopupDynamicStore();

const initialState = reactive({
  caption: "",
  images: [],
});

const openPopupDynamic = ($event, item) => {
  initialState.caption = item.date_text;
  initialState.images = item.field_images;
  storePopupDynamic.openPopupDynamic();
};
const closePopupDynamic = () => {
  storePopupDynamic.closePopupDynamic();
  setTimeout(() => {
    initialState.caption = null;
    initialState.images = null;
  }, 100);
};

const currentPage = ref(0);
const cards = ref([]);

const hasMore = ref(true);
const runtimeConfig = useRuntimeConfig();

// Доработать гидратацию
const {
  data: initDynamicData,
  status,
  error,
} = await useAsyncData(
  "initDynamicData",
  () => $fetch(`${runtimeConfig.public.apiBase}/dynamic?_format=json`, {}),
  {
    transform: ({ breadcrumb, metatag }) => {
      const metadata = useMetatags(metatag.html_head);
      return {
        breadcrumb,
        metadata,
      };
    },
  }
);

useHead({
  ...initDynamicData.value.metadata,
});

const fetchData = async (page) => {
  const {
    data: dynamicData,
    status,
    error,
  } = await useAsyncData(
    "dynamicData",
    () =>
      $fetch(`${runtimeConfig.public.apiBase}/dynamic?_format=json`, {
        query: {
          page,
        },
      }),
    {
      transform: ({ data, meta }) => {
        return {
          main: {
            list: data,
          },
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
    data: dynamicData.value.main.list,
    pagination: dynamicData.value.pagination,
  };
};

const loadData = async () => {
  const { data, pagination } = await fetchData(currentPage.value);
  if (data.length > 0) {
    cards.value.push(...data);
  }
  hasMore.value = pagination.count > cards.value.length;
  currentPage.value++;
};
await loadData();
</script>

<style lang="scss" scoped>
.dynamic {
  &__wrapper {
    display: grid;
    gap: 64px;
    @media screen and (max-width: $xl) {
      gap: 32px;
    }
  }
  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    align-items: start;
    @media screen and (max-width: $xxxl) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: $xl) {
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: $md) {
      grid-template-columns: 100%;
      gap: 14px;
    }
  }
  &__bottom {
    justify-self: center;
    @media screen and (max-width: $xl) {
      justify-self: stretch;
    }
    & .btn {
      max-width: 188px;
      padding: 11px 30px;
      @media screen and (max-width: $xl) {
        max-width: 100%;
      }
    }
  }
}
</style>
