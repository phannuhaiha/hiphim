import { createRouter, createWebHistory } from 'vue-router'
import users from './users';
import admins from './admins';
import { checkAuthStatus } from '@/config/auth';
import { toast } from 'vue3-toastify';
import { checkAuthAdmin } from '@/config/admin';

const routes= [...users, ...admins];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//       const user = await checkAuthStatus();
//       if (user) {
//           next();
//       } else {
//           // alert("Bạn chưa đăng nhập.");
//           toast.error('Bạn chưa đăng nhập')
//           next({ name: "product" });
//       }
//   } else {
//       next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  const user = await checkAuthStatus();
  const admin = await checkAuthAdmin();

  if (to.meta.requiresAuthUser) {
      if (user) {
          next();
      } else {
          toast.error('Bạn chưa đăng nhập');
          next({ path: "/product" });
      }
  } else if (to.meta.requiresAuthAdmin) {
      if (admin && admin.isAdmin === "true") {
          next();
      } else {
          toast.error('Bạn không có quyền truy cập');
          next({ path: "/product" });
      }
  } else {
      next();
  }
});

export default router;
