import { uploadImage } from "@/api/index";
import { generateRandomColor } from "@/libs/utils";

export default {
  methods: {
    // 在上传图片之前预览图片
    previewImageBeforeUpload(file, callback) {
      const fReader = new FileReader();
      if (file) {
        fReader.readAsDataURL(file);
      }
      fReader.onload = () => {
        callback(fReader.result);
      };
    },
    uploadImg(file) {
      const formData = new FormData();
      formData.append("file", file);
      return uploadImage(formData);
    },
    generateRandomColor,
  },
};
