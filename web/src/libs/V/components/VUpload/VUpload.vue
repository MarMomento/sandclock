<template>
  <div class="v-upload">
    <div class="trigger-wrapper">
      <slot name="trigger" :trigger="trigger" v-if="fileStatus === 'ready'">
        <button class="btn btn-trigger" @click="trigger" type="button">
          {{ placeholder }}
        </button>
      </slot>

      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-trigger" type="button">
          <span class="spinner-border text-primary spinner-border-sm"></span>
          loading...
        </button>
      </slot>

      <slot
        name="success"
        v-if="fileStatus === 'success'"
        :trigger="trigger"
        :cancel="cancel"
        :uploadedFile="uploadedFile"
        :value="inputVal"
      >
        <button
          class="btn btn-trigger text-truncate"
          type="button"
          style="max-width: 250px"
        >
          {{
            uploadedFile?.name ||
            (inputVal && inputVal.slice(inputVal.lastIndexOf("/") + 1))
          }}
        </button>
        <button class="btn btn-danger ms-3" @click="cancel">重新上传</button>
      </slot>

      <slot name="error" v-if="fileStatus === 'error'">
        <button class="btn btn-danger" @click="trigger" type="button">
          重新上传
        </button>
      </slot>
    </div>
    <input
      ref="fileRef"
      type="file"
      :class="['form-control', { 'is-invalid': error }]"
      hidden
      @change="uploadFile"
    />
    <!-- hidden -->
    <div class="invalid-feedback" v-if="message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { uploadImg } from "@/api";
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";

type IUploadRule = (file: File) => boolean;
type IUploadStatus = "ready" | "loading" | "success" | "error";

export default defineComponent({
  name: "VUpload",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    rules: {
      type: Function as PropType<IUploadRule>,
    },
    placeholder: {
      type: String,
      default: "上传图片",
    },
  },
  emits: ["update:modelValue", "upload-success", "upload-error"],
  setup(props, { emit }) {
    const inputVal = computed({
      get: () => props.modelValue,
      set: (newVal) => {
        emit("update:modelValue", newVal);
      },
    });

    const state = reactive({
      uploadedFile: null as null | File,
      error: false,
      message: "",
    });

    const fileStatus = ref<IUploadStatus>(
      props.modelValue ? "success" : "ready"
    );

    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal) {
          fileStatus.value = "success";
        } else {
          fileStatus.value = "ready";
        }
      }
    );

    const fileRef = ref<null | HTMLInputElement>(null);

    const trigger = () => {
      fileRef.value?.click();
    };

    const uploadFile = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.length) {
        fileStatus.value = "loading";
        const file = target.files[0];
        state.uploadedFile = file;
        if (props.rules) {
          const passed = props.rules(file);
          if (!passed) {
            fileStatus.value = "ready";
            return;
          }
        }

        const fd = new FormData();
        fd.append("file", file);

        try {
          const { data } = await uploadImg(fd);
          inputVal.value = data.url;
          fileStatus.value = "success";
          state.error = false;
          state.message = "";
          emit("upload-success", data);
        } catch (error) {
          if (fileRef.value) {
            fileRef.value.value = "";
          }
          fileStatus.value = "error";
          state.error = true;
          state.message = error.response?.data?.message || error.message;
          state.uploadedFile = null;
          emit("upload-error", error);
        }
      }
    };

    const cancel = () => {
      fileStatus.value = "ready";
      inputVal.value = "";
      state.uploadedFile = null;
      if (fileRef.value) {
        fileRef.value.value = "";
      }
      trigger();
    };

    return {
      inputVal,
      fileStatus,
      fileRef,
      trigger,
      uploadFile,
      ...toRefs(state),
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-upload {
  .btn-trigger {
    background-color: $white;
    border: 2px solid $gray-300;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: $gray-100;
      border-color: $gray-500;
    }
  }
}
</style>
