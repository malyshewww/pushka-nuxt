export default defineEventHandler((event) => {
   if (import.meta.dev) {
      const url = getRequestURL(event);
      if (url.pathname.startsWith("/sites")) {
         const baseURL = useRuntimeConfig().public.apiBase;
         return sendRedirect(
            event,
            `${baseURL}/${url.pathname}${url.search}`,
            301
         );
      }
   }
});
