<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="12" md="5">
        <v-card class="user-profile-card">
          <v-card-text>
            <v-row class="py-5">
              <v-col cols="5" class="d-flex justify-center align-center">
                <div class="avatar_wrapper">
                  <v-img
                    class="rounded-circle"
                    max-width="140px"
                    max-height="140px"
                    :src="currentUser.avatar_url"
                  ></v-img>
                </div>
              </v-col>
              <v-col cols="7">
                <p class="user-name text-h4">{{ currentUser.nickName }}</p>
                <p class="user-email">{{ currentUser.email }}</p>
                <p class="user-description">{{ currentUser.description }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card class="user-tag-card">
          <v-card-text>
            <v-row class="pb-9">
              <v-col cols="12">
                <p class="text-h6">关注的文章标签</p>
                <div
                  class="user-tags d-flex flex-wrap justify-start"
                  v-if="currentUser.following_tags"
                >
                  <v-chip
                    v-for="tag of currentUser.following_tags"
                    :key="tag._id"
                    :color="generateRandomColor()"
                    text-color="white"
                    class="mr-2 mb-2"
                  >
                    #{{ tag.name }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { fetchUserById } from "@/api";

export default {
  name: "Profile",
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async fetchCurrentUser() {
      const { data } = await fetchUserById(this.user._id);
      this.currentUser = data;
    },
  },
  created() {
    this.fetchCurrentUser();
  },
};
</script>

<style lang="scss" scoped>
.user-profile-card {
  .avatar_wrapper {
    border: 3px solid #ff4081;
    border-radius: 50%;
    width: 165px;
    height: 165px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
