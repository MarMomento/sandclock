<template>
  <v-snackbar v-model="isVisible" :timeout="duration" top center :color="type">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="isVisible = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      isVisible: false,
      type: "",
      message: "",
      duration: 2000,
    };
  },
};
</script>
