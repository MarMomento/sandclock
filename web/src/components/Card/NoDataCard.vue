<template>
  <v-card class="py-5">
    <v-card-text class="text-center text-muted">
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoDataCard",
  props: {
    text: {
      type: String,
      default: "暂时没有数据",
    },
  },
});
</script>

<style lang="scss" scoped></style>
