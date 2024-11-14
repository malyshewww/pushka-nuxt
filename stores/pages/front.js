const API_BASE_URL = useRuntimeConfig().public.API_BASE_URL;

export const useFrontStore = defineStore("frontStore", {
   state: () => ({
      data: [],
   }),
   actions: {
      async getData() {
         const { data } = await useFetch(`${API_BASE_URL}/wsapi/packs/front`);
         this.data = data;
      },
   },
});
