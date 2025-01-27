<template lang="pug">
		PopupNotice(:is-open="storePopupNotice.isOpenPopup" @close-popup="closePopupNotice")
		//- PopupRequest(:is-open="storePopupRequest.isOpenPopupRequest" @close-popup="closePopuRequest" :popupData="popupData.request")
</template>

<script setup>
import { usePopupNoticeStore } from "~/stores/popup/notice";
// import { usePopupRequestStore } from "~/stores/popup/request";

const storePopupNotice = usePopupNoticeStore();
// const storePopupRequest = usePopupRequestStore();

const closePopupNotice = () => {
  storePopupNotice.closePopup();
};

// const popupData = reactive({
//   request: {
//     title: "Оставить заявку",
//     subTitle:
//       "Оставьте заявку, наш менеджер перезвонит и&nbsp;проконсультирует вас по всем вопросам",
//     isImage: true,
//   },
// });
</script>
