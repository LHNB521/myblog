export const useConfig = () => {
  const navArr = [
    // { name: '图库', to: '/gallery' },
    // { name: '说说', to: '/say' },
    // { name: '留言', to: '/msg' },
    // { name: '友链', to: '/link' },
    // { name: '作品', to: '/show' },
    // { name: '建站', to: '/log' },
    { name: '关于', to: '/about' }
  ];
  const blog = [{ name: '分类', to: '/classify' }];
  return {
    navArr,
    blog
  };
};
