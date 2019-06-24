export default [
  //user
  {
    path: '/user',
    name: 'user',
    component: '../layouts/userLayout/userLayout',
    routes: [
      {
        path: '/user', 
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login'
      },
      {
        path: '/user/passwordReset',
        name: 'passwordReset',
        component: './user/passwordReset'
      }
    ]
  },
  // app

  {
    path: '/',
    component: '../layouts/basicLayout/basicLayout',
    Routes: ['src/pages/authorized'],
    routes: [
      {
        path: '/home',
        component: './Home/Home.tsx'
      },
      {
        path: '/exception',
        name: 'exception',
        icon: 'warning',
        authority: '*',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './exception/403',
          }, {
            path: '/exception/404',
            name: 'not-fing',
            component: './exception/404'
          }, {
            path: '/exception/500',
            name: 'server-error',
            component: './exception/500'
          }
        ]
      }, 
      {
        path: '/permission',
        name: 'permission',
        icon: 'lock',
        routes: [
          {
            path: '/permission/actions',
            name: 'actions',
            authority: ['permission/actionList'],
            component: './permission/actions/actions'
          },
          {
            path: '/permission/policies',
            name: 'policies',
            component: './permission/policies/policies',
            authority: ['permission/policyList'],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/permission/policies/create',
                name: 'create',
                component: './permission/policies/create'
              }
            ]
          }
        ]
      },
      {
        path: '/system',
        name: 'system',
        icon: 'desktop',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            component: './system/users',
          }, 
          {
            path: '/system/group',
            name: 'group',
            component: './system/groups'
          }
        ]
      }
    ]
  }
]