export const usePopupBookStore = defineStore("popup-book", {
  state: () => ({
    isOpenPopupBook: false,
    isErrorName: true,
    isErrorPhone: false,
  }),
  actions: {
    openPopup() {
      body_lock_add();
      this.isOpenPopupBook = !this.isOpenPopupBook;
    },
    closePopup() {
      body_lock_remove(0);
      this.isOpenPopupBook = !this.isOpenPopupBook;
    },
    showErrorName() {
      this.isErrorName = !this.isErrorName;
    },
    removeErrorName() {
      this.isErrorName = !this.isErrorName;
    },
    showErrorPhone() {
      this.isErrorPhone = true;
    },
    removeErrorPhone() {
      this.isErrorPhone = false;
    },
  },
});
