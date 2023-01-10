<template>
  <v-card>
    <v-breadcrumbs class="mt-8 px-4 py-2" :items="items">
      <template v-slot:item="{ item }">
        <template v-if="!item.disabled">
          <v-breadcrumbs-item class="text-capitalize" :href="item.href">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
        <template v-else>
          <v-breadcrumbs-item class="text-capitalize">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-card>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: {
    items: Array,
  },
};
</script>

<style src="./BreadCrumb.scss" lang="scss" />
