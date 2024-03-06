import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { pieChart, speedometer } from 'ionicons/icons';
import { ApiCore } from 'emr-api-client';
import { mohReports, pepfarReports } from './reports';

/*
  Note: sub-menu only appear when children.length>=1
*/

/*
  name:'router-name'             the name field is required when using <keep-alive>, it should also match its component's name property
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    roles: ['admin', 'editor']   will control the page roles (allow setting multiple roles)
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'ionicons-name'        the icon showed in the sidebar
    img: 'image-filename'        the image showed in the sidebar. if icon is defined, it will overwrite the image. 
                                 the image path must be relative to the images dir inside the public dir
    hidden: true                 if true, this route will not show in the sidebar (default is false)
    alwaysShow: true             if true, will always show the root menu (default is false)
                                 if false, hide the root menu when has less or equal than one children route
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    noCache: true                if true, the page will not be cached (default is false)
    affix: true                  if true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
*/
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import("@/layout/index.vue"),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: 'Dashboard',
          icon: speedometer,
          affix: true
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: { hidden: true }
  },
  {
    path: "/reports", 
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "Reports",
      icon: pieChart
    },
    children: [
      pepfarReports,
      mohReports
    ]
  } 
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  const whitelisted = ["/login", "/test-form"]
  if(!ApiCore.isLoggedIn() && !whitelisted.includes(to.path)) {
    next("/login");
  } else {
    next();
  }
})

export default router
