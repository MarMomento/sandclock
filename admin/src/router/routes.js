const Layout = () => import("@/components/Layout/Layout.vue");

const Login = () => import("@/views/Login/Login.vue");
const Error = () => import("@/views/Error/Error.vue");
const Dashboard = () => import("@/views/Dashboard/Dashboard.vue");
const Profile = () => import("@/views/Profile/Profile.vue");
const UserList = () => import("@/views/User/UserList.vue");
const UserAdd = () => import("@/views/User/UserAdd.vue");
const UserEdit = () => import("@/views/User/UserEdit.vue");
const TagList = () => import("@/views/Tag/TagList.vue");
const ArticleList = () => import("@/views/Article/ArticleList.vue");
const ArticleEdit = () => import("@/views/Article/ArticleEdit.vue");
const ArticleAdd = () => import("@/views/Article/ArticleAdd.vue");
const CommentList = () => import("@/views/Comment/CommentList.vue");

export default [
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
    component: Layout,
    children: [
      {
        path: "",
        redirect: "dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard" },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: { title: "个人信息" },
      },
      {
        path: "user",
        component: { render: (h) => h("router-view") },
        meta: { title: "用户管理" },
        children: [
          {
            path: "",
            redirect: "list",
          },
          {
            path: "list",
            name: "UserList",
            component: UserList,
            meta: { title: "用户列表" },
          },
          {
            path: "add",
            name: "UserAdd",
            component: UserAdd,
            meta: { title: "用户添加" },
          },
          {
            path: "edit/:id?",
            name: "UserEdit",
            component: UserEdit,
            meta: { title: "用户编辑" },
            beforeEnter: (to, from, next) => {
              if (to.params.id) {
                next();
              } else {
                next("/user/list");
              }
            },
          },
        ],
      },
      {
        path: "tag",
        component: { render: (h) => h("router-view") },
        meta: { title: "标签管理" },
        children: [
          {
            path: "",
            redirect: "list",
          },
          {
            path: "list",
            name: "TagList",
            component: TagList,
            meta: { title: "标签列表" },
          },
        ],
      },
      {
        path: "article",
        component: { render: (h) => h("router-view") },
        meta: { title: "文章管理" },
        children: [
          {
            path: "",
            redirect: "list",
          },
          {
            path: "list",
            name: "ArticleList",
            component: ArticleList,
            meta: { title: "文章列表" },
          },
          {
            path: "add",
            name: "ArticleAdd",
            component: ArticleAdd,
            meta: { title: "文章添加" },
          },
          {
            path: "edit/:id?",
            name: "ArticleEdit",
            component: ArticleEdit,
            meta: { title: "文章编辑" },
            beforeEnter: (to, from, next) => {
              if (to.params.id) {
                next();
              } else {
                next("/article/list");
              }
            },
          },
        ],
      },
      {
        path: "comment",
        component: { render: (h) => h("router-view") },
        meta: { title: "评论管理" },
        children: [
          {
            path: "",
            redirect: "list",
          },
          {
            path: "list",
            name: "CommentList",
            component: CommentList,
            meta: { title: "评论列表" },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },
];
