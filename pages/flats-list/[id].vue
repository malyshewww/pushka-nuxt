<template lang="pug">
	div
		BreadCrumbs(:list="apartment.breadcrumb")
		main.main.apartment-card
			.container
				.apartment-card__wrapper
					.apartment-card__body
						SectionApartmentScheme(:plan="apartment.main.scheme.planImage" :floor="apartment.main.scheme.floorImage")
						SectionApartmentInfo(:info="apartment.main.info")
					SliderGallery(:slider="slider" slider-caption="Варианты дизайнерской отделки" :is-descr="true")
		PopupBook(:is-open="storePopupBook.isOpenPopup" :popup-data="popupData.book" @close-popup="closePopupBook")
		PopupConsultation(:is-open="storePopupConsultation.isOpenPopup" :popup-data="popupData.consultation" @close-popup="closePopupConsultation")
</template>

<script setup>
import { usePopupBookStore } from "~/stores/popup/book";
import { usePopupConsultationStore } from "~/stores/popup/consultation";

const storePopupBook = usePopupBookStore();
const storePopupConsultation = usePopupConsultationStore();

const closePopupBook = () => {
  storePopupBook.closePopup();
};

const closePopupConsultation = () => {
  storePopupConsultation.closePopup();
};

const popupData = reactive({
  consultation: {
    title: "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ",
    subTitle:
      "Оставьте заявку, наш менеджер перезвонит и&nbsp;проконсультирует вас по всем вопросам",
    isImage: true,
  },
  book: {
    title: "ЗАБРОНИРОВАТЬ КВАРТИРУ",
    subTitle:
      "Оставьте заявку, наш менеджер перезвонит вам и поможет забронировать квартиру",
    isImage: false,
  },
  noticeConsultation: {
    subTitle:
      "В ближайшее время с вами свяжется менеджер для&nbsp;консультации",
  },
  noticeBook: {
    subTitle:
      "В ближайшее время с вами свяжется менеджер и поможет оформить бронь",
  },
});

useHead({
  bodyAttrs: {
    class: "page--apartment",
  },
});

// Статичные данные для слайдера
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
const { data: apartment } = await useAsyncData(
  "apartment",
  () =>
    $fetch(`${runtimeConfig.public.apiBase}/flats-list/${id}?_format=json`, {}),
  {
    transform: (res) => {
      const { breadcrumb, data, metatag } = res;
      const metadata = useMetatags(metatag.html_head);
      console.log(res);
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
        metadata,
      };
    },
  }
);

useHead({
  ...apartment.value.metadata,
});

/* Добавляем в store номер текущих апартаментов для последующего использования значения при отправке формы 
	"Забронировать" и "Консультация" в карточке апартаментов
*/
watch(
  () => storePopupBook.isOpenPopup,
  (open) => {
    if (open) {
      storePopupBook.form.data.number = apartment.value.main.info.number;
    }
  }
);
watch(
  () => storePopupConsultation.isOpenPopup,
  (open) => {
    if (open) {
      storePopupBook.form.data.number = apartment.value.main.info.number;
    }
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
