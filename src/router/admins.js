const admins = [
  {
    path: '/admin/login',
    name: 'loginad',
    component: () => import("@/views/admins/LoginAD.vue"),
  },
  {
    path: '/admin',
    name: 'admin-home',
    component: () => import("../views/admins/Adminhome.vue"),
    meta: {
      requiresAuthAdmin: true
    },
    children: [
      {
        path: '',
        name: 'home-earning',
        redirect: "/admin/earning",
      },
      {
        path: 'account',
        name: 'account',
        component: () => import("@/views/admins/Account.vue"),
      },
      {
        path: 'video',
        name: 'videomanager',
        component: () => import("@/views/admins/VideoManager.vue"),
      },
      {
        path: 'earning',
        name: 'earning',
        component: () => import("@/views/admins/Earning.vue"),
      },
      {
        path: 'advert',
        name: 'advertisement',
        component: () => import("@/views/admins/Advertisement.vue"),
      },
      {
        path: 'movie',
        name: 'movie',
        component: () => import("@/views/admins/MovieManager.vue"),
      },



    ]


  },



]
export default admins;
