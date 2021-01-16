import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "main"
    },
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      layout: "empty"
    },
    component: () => import("@/views/Login")
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      layout: "empty"
    },
    component: () => import("@/views/Register")
  },
  {
    path: "/categories",
    name: "Categories",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/Categories")
  },
  {
    path: "/history",
    name: "History",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/History")
  },
  {
    path: "/planning",
    name: "Planning",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/Planning")
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/Profile")
  },
  {
    path: "/record",
    name: "Record",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/Record")
  },

  {
    path: "/detail/:id",
    name: "DetailRecord",
    meta: {
      layout: "main",
      auth: true
    },
    component: () => import("@/views/DetailRecord")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});
export default router;
