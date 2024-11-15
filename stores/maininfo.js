import { defineStore } from "pinia";

export const useMainInfoStore = defineStore("mainInfoStore", {
   state: () => ({
      menu: [],
      info: {},
      // isReady: true,
   }),
   actions: {
      async setData(res) {
         const { data } = res;
         this.menu = data.menu_main;
         this.info = {
            phone: data.site_info[0].field_phone,
            email: data.site_info[0].field_e_mail,
            address: data.site_info[0].field_address,
            projectDocs: data.site_info[0].field_project_docs,
            vk: data.site_info[0].field_vk,
            workHours: data.site_info[0].field_work_hours,
            info: data.site_info[0].info,
         };
         // this.isReady = true;
      },
   },
});
