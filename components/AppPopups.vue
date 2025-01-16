<template lang="pug">
    PopupConsultation(:is-open="storePopupConsultation.isOpenPopupConsultation" @close-popup="closePopupConsultation" :popupData="popupData.consultation")
    PopupBook(:is-open="storePopupBook.isOpenPopupBook" @close-popup="closePopupBook" :popupData="popupData.book")
    PopupNotice(:is-open="storePopupNotice.isOpenPopup" @close-popup="closePopupNotice" :popupData="popupData.notice")
    //- PopupNotice(:is-open="storePopupNoticeBook.isOpenPopupNotice" @close-popup="closePopupNoticeBook" :popupData="popupData.noticeBook")
    //- PopupNotice(:is-open="storePopupNoticeConsultation.isOpenPopupNotice" @close-popup="closePopupNoticeConsultation" :popupData="popupData.noticeConsultation")
    //- PopupRequest(:is-open="storePopupRequest.isOpenPopupRequest" @close-popup="closePopuRequest" :popupData="popupData.request")
</template>

<script setup>
import { usePopupConsultationStore } from "~/stores/popup/consultation";
import { usePopupBookStore } from "~/stores/popup/book";
import { usePopupNoticeBookStore } from "~/stores/popup/noticeBook";
import { usePopupNoticeConsultationStore } from "~/stores/popup/noticeConsultation";
import { usePopupNoticeStore } from "~/stores/popup/notice";
// import { usePopupRequestStore } from "~/stores/popup/request";

const storePopupNotice = usePopupNoticeStore();
const storePopupConsultation = usePopupConsultationStore();
const storePopupBook = usePopupBookStore();
const storePopupNoticeBook = usePopupNoticeBookStore();
const storePopupNoticeConsultation = usePopupNoticeConsultationStore();
// const storePopupRequest = usePopupRequestStore();

const closePopupNotice = () => {
  storePopupNotice.closePopup();
};
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
  notice: {
    subTitle: "В ближайшее время с вами свяжется менеджер",
  },
});
</script>
