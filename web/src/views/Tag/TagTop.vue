<template>
  <div class="container tag-top-page py-3">
    <h2 class="fw-bolder fs-2">流行的标签</h2>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 mb-3"
        v-for="tag of tagList"
        :key="tag._id"
      >
        <TagCard :tag="tag" @follow-tag="followTag" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchPopularTags } from "@/api";
import { ITag } from "@/typings";
import { defineComponent, onMounted, ref } from "vue";
import TagCard from "@/components/Card/TagCard.vue";
import useTag from "@/hooks/useTag";

export default defineComponent({
  name: "TagTop",
  components: {
    TagCard,
  },
  setup() {
    const tagList = ref<ITag[]>([]);

    const getTopTags = async () => {
      const { data } = await fetchPopularTags();
      tagList.value = data;
    };

    const { followTheTag } = useTag();

    const followTag = async (isFollowing: boolean, tag: ITag) => {
      await followTheTag(isFollowing, tag);
      await getTopTags(); // TODO:优化，1.重新获取关注的这个标签的数据. 2.将所有tag存入store
    };

    onMounted(() => {
      getTopTags();
    });

    return {
      tagList,
      followTag,
    };
  },
});
</script>

<style lang="scss" scoped></style>
