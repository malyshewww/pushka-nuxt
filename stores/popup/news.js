export const usePopupNewsStore = defineStore("popup-news", () => {
  const isOpenPopupNews = ref(false);
  const openPopupNews = () => {
    body_lock_add();
    isOpenPopupNews.value = !isOpenPopupNews.value;
  };
  const closePopupNews = () => {
    body_lock_remove();
    isOpenPopupNews.value = !isOpenPopupNews.value;
  };
  return {
    isOpenPopupNews,
    openPopupNews,
    closePopupNews,
  };
});
