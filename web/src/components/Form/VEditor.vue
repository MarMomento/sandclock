<template>
  <div class="v-editor">
    <div :class="['form-control', 'p-0', { 'is-invalid': error }]">
      <editor v-bind="$attrs" v-model="val" :apiKey="apiKey" :init="init" />
    </div>
    <div class="invalid-feedback" v-if="message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  toRefs,
} from "vue";
import Editor from "@tinymce/tinymce-vue";
import { IRegistrable, IRule } from "@/typings";
import useValidation from "@/hooks/useValidation";
import config from "@/config/index";
import { uploadImg } from "@/api";

export default defineComponent({
  name: "VEditor",
  inheritAttrs: false,
  components: {
    Editor,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    rules: {
      type: Array as PropType<IRule[]>,
      default: () => [],
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

    onMounted(() => {
      form?.register({ uid: curInstance?.uid, validation });
    });

    onUnmounted(() => {
      form?.unregister(curInstance);
    });

    const init = reactive({
      language_url: "/tinymce/langs/zh_CN.js",
      language: "zh_CN",
      skin_url: "/tinymce/skins/ui/oxide",
      height: 700,
      branding: false, // 去掉底部状态栏的水印
      menu: {
        favs: {
          title: "My Favorites",
          items: "code visualaid | searchreplace | emoticons",
        },
      },
      menubar: "favs file edit view insert format tools table help", // 菜单栏
      // 工具栏
      toolbar:
        "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
        "codesample | bullist numlist outdent indent | link image | print preview media fullpage | " +
        "forecolor backcolor emoticons | help",
      // 插件
      plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "codesample searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table emoticons template paste help",
      ],
      default_link_target: "_blank",
      // 图片上传
      images_upload_handler: async (
        blobInfo: any,
        success: any,
        failure: any
      ) => {
        try {
          const formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          const { data } = await uploadImg(formData);
          success(data.url);
        } catch (err) {
          failure(err);
        }
      },
    });

    return {
      ...toRefs(state),
      init,
      apiKey: config.apiKey,
    };
  },
});
</script>

<style lang="scss" scoped></style>
