export default [
  {
    path: '/',
    // component: '../src/layouts/BasicLayout.js', 
    component: '../layouts/BasicLayout.js', //why?
    // component: '../layouts/BasicLayout.js', //why?
    // Routes: ['./src/components/privateRoute.js'],
    routes: [
      {
        path: '/',
        component: './index.js',
        // routes: [

        // ]
      },
      {
        path: '/flip',
        routes: [
          {
            path: '/flip/class1',
            component: './flip/class1/index.js',
          },
          {
            path: '/flip/class2',
            component: './flip/class2/index.js',
          },

        ]
      },
      {
        path: '/404',
        component: './404.js'
      },

    ]

  }
]
