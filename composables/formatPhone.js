export const formatPhone = (str) => {
   if (str === "" || str === "undefined") return;
   return str.replace(/[^\d\+]/g, "");
};
