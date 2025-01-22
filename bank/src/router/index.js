import { createRouter, createWebHistory } from "vue-router";
import AppView from "../App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppView,
    },
    {
      path: "/:bankCode/:branchCode/:branchName",
      name: "BranchDetail",
      component: AppView,
      props: true,
    },
  ],
});

export default router;
