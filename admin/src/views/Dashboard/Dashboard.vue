<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="3" v-for="(value, key) in todayModelCounts" :key="key">
        <v-card class="px-6 pb-6">
          <v-card-title class="text-subtitle-1">{{ value.text }}</v-card-title>
          <v-card-text class="text-h2 text-center font-weight-bold">
            {{ value.count }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="pa-6 pb-3"> 最近一周模型数据 </v-card-title>

          <v-card-text class="pa-6 pt-0">
            <ApexCharts
              type="area"
              width="100%"
              :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
              :options="weekModelDataApexArea.options"
              :series="weekModelDataApexArea.series"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="6" v-for="(value, key) in allModelCounts" :key="key">
            <v-card class="px-6 pb-6">
              <v-card-title class="text-subtitle-1">{{
                value.text
              }}</v-card-title>
              <v-card-text class="text-h2 text-center font-weight-bold">
                {{ value.count }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title class="pa-6 pb-3"> 最受欢迎的 Top10 标签 </v-card-title>

          <v-card-text class="pa-6 pt-0">
            <ApexCharts
              type="donut"
              :height="$vuetify.breakpoint.smAndDown ? 300 : 350"
              :options="topTagsApexArea.options"
              :series="topTagsApexArea.series"
            ></ApexCharts>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApexCharts from "vue-apexcharts";
import config from "../../config/index";
import { fetchPopularTags, fetchModelStatistics } from "@/api";
import { generateRandomColor } from "@/libs/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default {
  name: "Dashboard",
  components: {
    ApexCharts,
  },
  data() {
    return {
      timer: null,
      allModelCounts: {
        user: {
          text: "用户总数",
          count: 0,
        },
        tag: {
          text: "标签总数",
          count: 0,
        },
        article: {
          text: "文章总数",
          count: 0,
        },
        comment: {
          text: "评论总数",
          count: 0,
        },
      },
      todayModelCounts: {
        user: {
          text: "今日用户注册总数",
          count: 0,
        },
        tag: {
          text: "今日标签创建总数",
          count: 0,
        },
        article: {
          text: "今日文章发表总数",
          count: 0,
        },
        comment: {
          text: "今日评论发表总数",
          count: 0,
        },
      },
      weekModelDataApexArea: {
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            config.light.primary,
            config.light.success,
            config.light.info,
            config.light.warning,
          ],
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            type: "datetime",
            categories: ["2018-09-19T00:00:00.000Z"],
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
          },
          fill: {
            type: "solid",
            opacity: 0.2,
            colors: [
              config.light.primary,
              config.light.success,
              config.light.info,
              config.light.warning,
            ],
          },
          stroke: {
            width: 4,
            curve: "smooth",
          },
        },
        series: [
          {
            name: "series1",
            data: [31],
          },
        ],
      },
      topTagsApexArea: {
        options: {
          labels: ["item"],
        },
        series: [44],
      },
    };
  },
  methods: {
    async getAllModelCounts() {
      const { data } = await fetchModelStatistics();
      this.allModelCounts.user.count = data.user_counts;
      this.allModelCounts.tag.count = data.tag_counts;
      this.allModelCounts.article.count = data.article_counts;
      this.allModelCounts.comment.count = data.comment_counts;
    },
    async getTodayModelCounts() {
      const { data } = await fetchModelStatistics({ date: 0 });
      this.todayModelCounts.user.count = data.user_counts;
      this.todayModelCounts.tag.count = data.tag_counts;
      this.todayModelCounts.article.count = data.article_counts;
      this.todayModelCounts.comment.count = data.comment_counts;
    },
    async getWeekModelCounts() {
      const xaxis = new Array(7)
        .fill(0)
        .map((_, i) => dayjs().subtract(i, "day").format("YYYY-MM-DD HH:mm:ss"))
        .reverse();
      const seriesObj = {
        user: {
          name: "用户注册数量",
          data: [],
        },
        tag: {
          name: "标签创建数量",
          data: [],
        },
        article: {
          name: "文章发布数量",
          data: [],
        },
        comment: {
          name: "评论发布数量",
          data: [],
        },
      };
      for (let i = 0; i < 7; i++) {
        const { data } = await fetchModelStatistics({ date: i });
        seriesObj.user.data.unshift(data.user_counts);
        seriesObj.tag.data.unshift(data.tag_counts);
        seriesObj.article.data.unshift(data.article_counts);
        seriesObj.comment.data.unshift(data.comment_counts);
      }
      this.weekModelDataApexArea.options = {
        ...this.weekModelDataApexArea.options,
        ...{
          xaxis: {
            type: "datetime",
            categories: xaxis,
            tickAmount: xaxis.length,
            labels: {
              rotate: -15,
              rotateAlways: true,
              formatter: function (value, timestamp) {
                return dayjs(timestamp).format("D / MMM");
              },
            },
          },
          tooltip: {
            x: {
              formatter(value) {
                return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
              },
            },
          },
        },
      };
      this.weekModelDataApexArea.series = Object.keys(seriesObj).map(
        (key) => seriesObj[key]
      );
    },
    async getTopTags() {
      const { data } = await fetchPopularTags({ limit: 10 });
      const labels = data.map((tag) => tag.name);
      const series = data.map(
        (tag) => tag.followers_count + tag.articles_count
      );
      const colors = [];
      for (let i = 0; i < series.length; i++) {
        colors.push(generateRandomColor());
      }
      this.topTagsApexArea.options = {
        ...this.topTagsApexArea.options,
        ...{
          labels,
          colors,
        },
      };
      this.topTagsApexArea.series = series;
    },
  },
  created() {
    this.getAllModelCounts();
    this.getTodayModelCounts();
    this.getTopTags();
    this.getWeekModelCounts();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getAllModelCounts();
    }, 1000 * 30);
  },
  unmounted() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped></style>
