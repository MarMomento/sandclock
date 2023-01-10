import { onMounted, onUnmounted, ref, Ref } from "vue";

/**
 * 鼠标点击的目标是否在指定DOM内
 */

type IUseClickOutside = (
  eleRef: Ref<null | HTMLElement>
) => {
  isClickOutside: Ref<boolean>;
};

const useClickOutside: IUseClickOutside = (eleRef) => {
  const isClickOutside = ref(false);

  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (eleRef.value) {
      if (eleRef.value.contains(target)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return {
    isClickOutside,
  };
};

export default useClickOutside;
