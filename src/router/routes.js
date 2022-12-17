
const routes = [
  {
    path: '/',
    component: () => import('layouts/landing.vue'),
    children: [
      { path: '', component: () => import('pages/land/login.vue') },
      { path: '/register', component: () => import('pages/land/register.vue') },
      { path: '/recover', component: () => import('pages/land/recover.vue') },

    ]
   
  },
  {
    path:"/auth/dash/",
    component: () => import("layouts/dash.vue"),
    children: [
      { path: '', component: () => import('pages/dash/home.vue') },
      { path: 'schedule', component: () => import('pages/dash/schedule.vue') },
      { path: 'room', component: () => import('pages/dash/room.vue') },
      { path: 'reports', component: () => import('pages/dash/reports.vue') },
      { path: 'rooms', component: () => import('pages/dash/rooms.vue') },
      { path: 'profile', component: () => import('pages/dash/profile.vue') },
    ]
  },
 

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
