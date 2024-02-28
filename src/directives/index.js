import { useIntersectionObserver } from "@vueuse/core";

// 懒加载插件
export const lazyPlugin = {
  install(app) {
    app.directive("img-lazy", (el, binding) => {
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value;
          stop();
        }
      });
    });
  },
};
