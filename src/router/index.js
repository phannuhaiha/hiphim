import { createRouter, createWebHistory } from 'vue-router'
import users from './users';
import admins from './admins';
import { checkAuthStatus } from '@/config/auth';
import { toast } from 'vue3-toastify';

const routes= [...users, ...admins];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
      const user = await checkAuthStatus();
      if (user) {
          next();
      } else {
          // alert("Bạn chưa đăng nhập.");
          toast.error('Bạn chưa đăng nhập')
          // next({ name: "home-product" });
      }
  } else {
      next();
  }
});

export default router;
