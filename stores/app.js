import { defineStore } from "pinia";

export const useAppStore = defineStore("app-store", () => {
  const isLoading = ref(true);
  return {
    isLoading,
  };
});
