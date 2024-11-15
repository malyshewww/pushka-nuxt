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
		PopupConsultation(:is-open="storePopupConsultation.isOpenPopupConsultation" @close-popup="closePopupConsultation" :popupData="popupData.consultation")
		PopupBook(:is-open="storePopupBook.isOpenPopupBook" @close-popup="closePopupBook" :popupData="popupData.book")
		PopupNotice(:is-open="storePopupNoticeBook.isOpenPopupNotice" @close-popup="closePopupNoticeBook" :popupData="popupData.noticeBook")
		PopupNotice(:is-open="storePopupNoticeConsultation.isOpenPopupNotice" @close-popup="closePopupNoticeConsultation" :popupData="popupData.noticeConsultation")
		//- PopupRequest(:is-open="storePopupRequest.isOpenPopupRequest" @close-popup="closePopuRequest" :popupData="popupData.request")
</template>

<script setup>
import { usePopupConsultationStore } from "~/stores/popup/consultation";
import { usePopupBookStore } from "~/stores/popup/book";
import { usePopupNoticeBookStore } from "~/stores/popup/noticeBook";
import { usePopupNoticeConsultationStore } from "~/stores/popup/noticeConsultation";
// import { usePopupRequestStore } from "~/stores/popup/request";

useHead({
   bodyAttrs: {
      class: "page--apartment",
   },
});

const storePopupConsultation = usePopupConsultationStore();
const storePopupBook = usePopupBookStore();
const storePopupNoticeBook = usePopupNoticeBookStore();
const storePopupNoticeConsultation = usePopupNoticeConsultationStore();
// const storePopupRequest = usePopupRequestStore();

const closePopupConsultation = () => {
   storePopupConsultation.closePopup();
};
const closePopupBook = () => {
   storePopupBook.closePopup();
};
const closePopupNoticeBook = () => {
   storePopupNoticeBook.closePopup();
};
const closePopupNoticeConsultation = () => {
   storePopupNoticeConsultation.closePopup();
};
// const closePopuRequest = () => {
//    storePopupRequest.closePopup();
// };

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
   request: {
      title: "Оставить заявку",
      subTitle:
         "Оставьте заявку, наш менеджер перезвонит и&nbsp;проконсультирует вас по всем вопросам",
      isImage: true,
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
      $fetch(
         `${runtimeConfig.public.apiBase}/flats-list/${id}?_format=json`,
         {}
      ),
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
