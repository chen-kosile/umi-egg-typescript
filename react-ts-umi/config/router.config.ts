export default [
  {
    path: '/',
    excat: true,
    redirect: '/app'
  },
  {
    path: '/app',
    component: '../routes/app/App.tsx',
    Routes: ['src/routes/private/private.js'],
    routes: [
      {
        path: '/app/home',
        component: './Home/Home.tsx'
      }
    ]
  }, 
  {
    path: '/login',
    component: '../routes/Login/Login.ts'
  }, 
  {
    path: '/user',
    component: '../routes/User/User.ts'
  }
]