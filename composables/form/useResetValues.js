export const useResetValues = (data) => {
  if (data.name) {
    data.name = "";
  }
  if (data.phone) {
    data.phone = "";
  }
};
