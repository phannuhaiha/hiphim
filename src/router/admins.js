const admins = [
    {
        path: '/admin',
        name: 'admin-home',
        component: () => import("../views/admins/Adminhome.vue"),
        children: [
            {
              path: '',
              name: 'home-container',
              redirect: "/container" ,
            },
            {
                path: 'container',
                name: 'container',
                component: () => import("@/views/admins/Container.vue"),
              },
        ]

    }

]
export default admins;
