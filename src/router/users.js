

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
        meta: {
          requiresAuthUser: true
        },
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
        name: 'myChannel',
        component: () => import("../views/users/Channel.vue"),
        meta: {
          requiresAuthUser: true
        },
      },
      {
        path: 'watched',
        name: 'watched',
        component: () => import("../views/users/Watched.vue"),
        meta: {
          requiresAuthUser: true
        },
      },
      {
        path: 'search/:search',
        name: 'search',
        component: () => import("../views/users/Search.vue"),
        props: true,
      },
      {
        path: 'channel-user/:id',
        name: 'channelUser',
        component: () => import("../views/users/ChannelUser.vue"),
        props: true,
      },
      
      {
        path: 'series-watch/:slug',
        name: 'SeriesWatch',
        component: () => import("../views/users/SeriesWatch.vue"),
        props: true,
      },
      //test
      {
        path: 'playlistdetail/:slug',
        name: 'playlistdetail',
        component: () => import("../views/users/PlaylistDetail.vue"),
        props: true,
      },
      {
        path: 'seeplaylist',
        name: 'seeplaylist',
        component: () => import("../views/users/SeePlaylist.vue"),
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
    meta: {
      requiresAuthUser: true
    }
  },
  {
    path: '/alert',
    name: 'alert',
    component: () => import("../components/users/Alert.vue"),
  },




]

export default users;
