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
        props: true,
      },
    ],
  },
  {
    path: "/profile/",
    component: () => import("layouts/ProfileLayout.vue"),
    children: [
      { path: "user-info", component: () => import("src/pages/UserInfo.vue") },
      {
        path: "addresses",
        children: [
          { path: "", component: () => import("pages/AddressesPage.vue") },
          {
            name: "editAddress",
            path: "address/:id",
            component: () => import("src/pages/EditAddAddressPage.vue"),
            props: (route) => ({ id: parseInt(route.params.id) }),
          },
          {
            name: "addAddress",
            path: "create",
            component: () => import("src/pages/EditAddAddressPage.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/admin/",
    name: "management",
    component: () => import("layouts/MainAdminLayout.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
