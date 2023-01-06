import router from './router/index.js';
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    if (to.name === 'Login') {
      next({
        name: 'Home'
      });
    }
    next();
  } else {
    if (to.name === 'Login') {
      next();
    }
    next({
      name: 'Login'
    });
  }
});
