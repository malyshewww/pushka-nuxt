export const useMenuStore = defineStore("menu", {
   state: () => ({
      isOpenMenu: false,
   }),
   actions: {
      toggleMenu() {
         body_lock();
         this.isOpenMenu = !this.isOpenMenu;
      },
   },
});
