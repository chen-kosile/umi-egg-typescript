export default [
  // user
  {
    path: '/user',
    name: 'user',
    component: '../layouts/userLayout/userLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user/passwordReset',
        name: 'password-reset',
        component: './user/passwordReset',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/basicLayout/basicLayout',
    Routes: ['src/pages/authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            authority: [
              'dashboard/analysis'
            ],
            component: './dashboard/analysis'
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            authority: ['dashboard/workplace'],
            component: './dashboard/workplace',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './exception/500',
          },
        ],
      },
      {
        name: 'permission',
        icon: 'lock',
        path: '/permission',
        routes: [
          {
            path: '/permission/actions',
            name: 'actions',
            authority: ['permission/actionList'],
            component: './permission/actions',
          },
          {
            path: '/permission/policies',
            name: 'policies',
            authority: ['permission/policyList'],
            component: './permission/policies',
          },
          {
            path: '/permission/policies/create',
            name: 'policy-create',
            hideInMenu: true,
            component: './permission/policiesCreate',
          },
        ],
      },
      {
        name: 'system',
        icon: 'desktop',
        path: '/system',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            authority: '*',
            component: './system/users',
          },
          {
            path: '/system/group',
            name: 'group',
            authority: '*',
            component: './system/groups',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './account/center',
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './account/settings',
          },
        ],
      },
    ],
  },
];
