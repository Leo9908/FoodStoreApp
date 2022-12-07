const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "buyout", component: () => import("pages/FinalizeBuy.vue") },
      { path: "most-sold", component: () => import("src/pages/MostSold.vue") },
      { path: "combos", component: () => import("pages/CombosPage.vue") },
      { path: "favorite", component: () => import("pages/FavoritePage.vue") },
    ],
  },
  {
    path: "/auth/",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      {
        path: "change-password",
        component: () => import("pages/ChangePasswordPage.vue"),
      },
      {
        path: "finish-change-password/:tokenPassword",
        component: () => import("pages/FinishChangePassPage.vue"),
      },
    ],
  },
  {
    path: "/profile/",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      { path: "user-info", component: () => import("src/pages/UserInfo.vue") },
      { path: "addresses", component: () => import("pages/AddressesPage.vue") },
      {
        path: "address/:id",
        component: () => import("src/pages/EditAddressPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
