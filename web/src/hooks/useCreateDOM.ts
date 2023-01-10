import { onUnmounted } from "vue";

/**
 * 创建div#id元素,并挂载到body上
 */

const useCreateDOM = (eleId: string): void => {
  const oDiv = document.createElement("div");
  oDiv.id = eleId;
  document.body.appendChild(oDiv);

  onUnmounted(() => {
    oDiv.remove();
  });
};

export default useCreateDOM;
