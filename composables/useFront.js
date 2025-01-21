import { storeToRefs } from "pinia";
import { useFrontStore } from "~/stores/pages/front";

export default function () {
  const frontStore = useFrontStore();
  frontStore.getData();
  // const { data } = storeToRefs(frontStore);
  // console.log(data);
  // return {
  //    data,
  // };
}
