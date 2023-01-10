<template>
  <Card class="notification-card">
    <template v-slot:header>
      <slot name="header">
        <div class="card-header" v-if="header">{{ header }}</div>
      </slot>
    </template>

    <template v-slot:title>
      <slot name="title"></slot>
    </template>

    <template v-slot:text>
      <slot name="text"></slot>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "./index.vue";

export default defineComponent({
  name: "NotificationCard",
  components: {
    Card,
  },
  props: {
    header: String,
  },
});
</script>

<style lang="scss" scoped></style>
