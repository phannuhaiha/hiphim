

const users = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/users/Home.vue"),
    children: [
      {
        path: '',
        
        redirect: '/product',
      },
      {
        path: 'product',
        name: 'product',
        component: () => import("../views/users/ProductView.vue"),
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: () => import("../views/users/Subscription.vue"),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import("../views/users/Login.vue"),
      },
      {
        path: 'series',
        name: 'series',
        component: () => import("../views/users/Series.vue"),
      },
      {
        path: 'productdetail/:slug',
        name: 'detail',
        component: () => import("../views/users/ProductViewDetail.vue"),
        props: true,
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import("@/components/users/Comment.vue"),
      },
      {
        path: 'mychannel',
        name: 'channel',
        component: () => import("../views/users/Channel.vue"),
      },
      {
        path: 'watched',
        name: 'watched',
        component: () => import("../views/users/Watched.vue"),
      },


     
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import("../views/users/Signin.vue"),
  },

  {
    path: '/register-channel',
    name: 'registerChannel',
    component: () => import("../views/users/RegisterChannel.vue"),
  },
 
  
  {
    path: '/uploadvideo',
    name: 'upload',
    component: () => import("../views/users/UploadVideo.vue"),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import("../components/users/Alert.vue"),
  },
  


 
]

export default users;
