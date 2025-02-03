import {createRouter, createWebHistory} from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import AdminPanelView from '@/views/AdminPanelView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'
import RegisterView from '@/views/RegisterView.vue'
import {useUserAuthStore} from "@/stores/auth.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes: [
    {
      path: '/', name: 'login', component: LoginView
    },
    {
      path: '/register', name: 'register', component: RegisterView
    },
    {
      path: '/about', name: 'about', component: AboutView
    },
    {
      path: '/dashboard', name: 'dashboard', component: DashboardView, meta: {requiresAuth: true},
    },
    {
      path: '/admin', name: 'admin', component: AdminPanelView, meta: {requiresAuth: true},
    },
    {
      path: '/:pathMatch(.*)*', redirect: '/'
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useUserAuthStore();

  if (auth.isTokenExpired) {
    try {
      await auth.refreshAccessToken();
    } catch {
      await auth.logout();
      return next('/');
    }
  }

  if (auth.userToken && (to.path === '/' || to.path === '/login')) {
    return next('/dashboard');
  }

  if (to.meta.requiresAuth && !auth.userToken) {
    return next('/');
  }

  if (auth.userToken && to.path === '/admin' && !auth.isAdmin) {
    return next('/dashboard')
  }

  next();
});

export default router;
