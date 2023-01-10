<template>
  <div class="v-select" ref="selectRef">
    <div
      @click="isVisible = !isVisible"
      :class="['form-control bg-white py-2', { 'is-invalid': error }]"
    >
      <div class="d-flex align-items-center">
        <div class="selected-tags">
          <span
            class="badge bg-primary me-2"
            v-for="tag of selectedTags"
            :key="tag.value"
          >
            {{ tag.text }}
          </span>
        </div>
        <input
          type="text"
          class="v-select-input form-control p-0 shadow-none w-auto"
          :placeholder="selectedTags.length ? '' : placeholder"
          :hidden="selectedTags.length >= 4"
          v-model="filterVal"
        />
      </div>
    </div>
    <div class="invalid-feedback" v-if="message">{{ message }}</div>

    <div class="v-select-items-wrapper shadow-sm bg-white">
      <ul
        class="v-select-items"
        v-show="isVisible"
        :style="{
          maxHeight: 5 * 40 + 'px',
          overflowY: filteredItemList.length > 5 ? 'scroll' : '',
        }"
      >
        <template v-if="filteredItemList.length">
          <v-select-item
            v-for="item of filteredItemList"
            :key="item.value"
            :item="item"
            @set-select-item="setSelectItem"
          ></v-select-item>
        </template>
        <template v-else>
          <div class="text-muted text-center py-2">没有该标签</div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { IRegistrable, IRule, ISelectItem } from "@/typings";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
import useValidation from "@/hooks/useValidation";
import useClickOutside from "@/hooks/useClickOutside";
import VSelectItem from "./VSelectItem.vue";

export default defineComponent({
  name: "VSelect",
  components: {
    VSelectItem,
  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    rules: {
      type: Array as PropType<IRule[]>,
      default: () => [],
    },
    items: {
      type: Array as PropType<ISelectItem[]>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "请选择标签",
    },
  },
  setup(props, { emit }) {
    const form = inject<IRegistrable>("form");
    const curInstance = getCurrentInstance();
    const inputVal = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        emit("update:modelValue", newVal);
      },
    });

    const { state, validation } = useValidation(inputVal, props.rules);

    const filterVal = ref("");

    const itemList = computed(() =>
      props.items.map((item) => {
        if (inputVal.value.includes(item.value)) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );

    const filteredItemList = computed(() => {
      if (filterVal.value) {
        return itemList.value.filter((item) => {
          if (item.text.indexOf(filterVal.value) !== -1) return item;
        });
      } else {
        return itemList.value;
      }
    });

    const selectedTags = computed(() =>
      itemList.value.filter((item) => item.selected)
    );

    const isVisible = ref(false);
    const selectRef = ref<null | HTMLElement>(null);
    const { isClickOutside } = useClickOutside(selectRef);

    watch(isClickOutside, (val) => {
      val && (isVisible.value = false);
    });

    watch(filterVal, (val) => {
      val && (isVisible.value = true);
    });

    const setSelectItem = (isSelected: boolean, value: string) => {
      if (isSelected) {
        inputVal.value = inputVal.value.concat(value);
      } else {
        inputVal.value = inputVal.value.filter((_value) => _value !== value);
      }
    };

    onMounted(() => {
      form?.register({ uid: curInstance?.uid, validation });
    });

    onUnmounted(() => {
      form?.unregister(curInstance);
    });

    return {
      ...toRefs(state),
      itemList,
      selectedTags,
      isVisible,
      selectRef,
      setSelectItem,
      filterVal,
      filteredItemList,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-select {
  position: relative;

  .v-select-input {
    border: none;
  }

  // 定位方案
  // .selected-tags {
  // position: absolute;
  // top: 50%;
  // left: 20px;
  // transform: translateY(-50%);
  // }

  .v-select-items-wrapper {
    position: absolute;
    overflow-x: hidden;
    width: 100%;
    z-index: 13;

    .v-select-items {
      margin: 0;
      padding: 0;
      width: calc(100% + 12px);
    }
  }
}
</style>
