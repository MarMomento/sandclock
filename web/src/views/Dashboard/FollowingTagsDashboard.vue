<template>
  <div class="row">
    <template v-if="tagList.length">
      <div
        class="col-12 col-md-6 col-lg-4 mb-3"
        v-for="tag of tagList"
        :key="tag._id"
      >
        <TagCard :tag="tag" @follow-tag="followTheTag" />
      </div>
    </template>

    <template v-else>
      <no-data-card text="还没有关注的标签..."></no-data-card>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import TagCard from "@/components/Card/TagCard.vue";
import { ITag } from "@/typings";
import { fetchFollowingTags } from "@/api";
import useTag from "@/hooks/useTag";
import NoDataCard from "@/components/Card/NoDataCard.vue";

export default defineComponent({
  name: "FollowingTagsDashboard",
  components: {
    TagCard,
    NoDataCard,
  },
  setup() {
    const tagList = ref<null | ITag[]>([]);

    const getTagList = async () => {
      const { data } = await fetchFollowingTags();
      tagList.value = data;
    };

    const { followTheTag } = useTag();

    onMounted(() => {
      getTagList();
    });

    return {
      tagList,
      followTheTag,
    };
  },
});
</script>

<style lang="scss" scoped></style>
