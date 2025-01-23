const useMetatags = (arr) => {
  const head = {
    title: "",
    meta: [],
    link: [],
    script: [],
  };
  if (arr.length) {
    for (const metaArr of arr) {
      for (const meta of metaArr) {
        const tagType = meta["#tag"];
        if (head[tagType]) {
          if (meta["#attributes"].name === "title") {
            head.title = meta["#attributes"].content;
          }
          head[tagType].push(meta["#attributes"]);
        }
      }
    }
  }
  return head;
};
export default useMetatags;
