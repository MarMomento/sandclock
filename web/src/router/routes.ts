import { RouteRecordRaw } from "vue-router";

const Test = () => import("@/views/Test/index.vue");

const BaseLayout = () => import("@/components/Layout/BaseLayout.vue");

const Login = () => import("@/views/Login/index.vue");
const Home = () => import("@/views/Home/index.vue");
const TagTop = () => import("@/views/Tag/TagTop.vue");
const TagDetail = () => import("@/views/Tag/TagDetail.vue");
const ArticleDetail = () => import("@/views/Article/ArticleDetail.vue");
const ArticleCreateAndEdit = () =>
  import("@/views/Article/ArticleCreateAndEdit.vue");
const Profile = () => import("@/views/Profile/index.vue");
const Settings = () => import("@/views/Settings/index.vue");
const Dashboard = () => import("@/views/Dashboard/index.vue");
const Bookmarks = () => import("@/views/Bookmarks/index.vue");
const Search = () => import("@/views/Search/index.vue");
const Error = () => import("@/views/Error/index.vue");

export default <Array<RouteRecordRaw>>[
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isPublic: true,
      redirectAlreadyLogin: true,
    },
  },
  {
    path: "/",
    name: "BaseLayout",
    component: BaseLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/tag",
        name: "TagTop",
        component: TagTop,
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/tag/:id",
        name: "TagDetail",
        component: TagDetail,
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/create",
        name: "ArticleCreate",
        component: ArticleCreateAndEdit,
      },
      {
        path: "/edit/:id",
        name: "ArticleEdit",
        component: ArticleCreateAndEdit,
      },
      {
        path: "/article/:id",
        name: "ArticleDetail",
        component: ArticleDetail,
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/profile/:id",
        name: "Profile",
        component: Profile,
        meta: {
          isPublic: true,
        },
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
      },
      {
        path: "/bookmarks",
        name: "Bookmarks",
        component: Bookmarks,
      },

      {
        path: "/dashboard/:pathMatch(.*)*",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/search",
        name: "Search",
        component: Search,
        meta: {
          isPublic: true,
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: Error,
  },
];
