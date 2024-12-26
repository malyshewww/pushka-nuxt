export const useFilterStore = defineStore("filter", {
   state: () => ({
      isOpenFilter: false,
      isResetFilter: false,
   }),
   actions: {
      openFilter() {
         this.isOpenFilter = !this.isOpenFilter;
         !document.body.classList.contains("lock")
            ? body_lock_add(1000)
            : false;
      },
      closeFitler() {
         this.isOpenFilter = !this.isOpenFilter;
      },
      resetFilter() {
         this.isResetFilter = true;
      },
   },
});
