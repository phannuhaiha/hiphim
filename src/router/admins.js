const admins = [
    {
        path: '/admin',
        name: 'admin-home',
        component: () => import("../views/admins/Adminhome.vue"),
        children: [
            {
              path: '',
              name: 'home-earning',
              redirect: "/admin/earning" ,
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
                path: 'loginad',
                name: 'loginad',
                component: () => import("@/views/admins/LoginAD.vue"),
              }, 
              
             

        ]
        

    },
   
    

]
export default admins;
