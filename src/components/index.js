import ImageView from "./ImageView/index.vue";
import Sku from "./Sku/index.vue";
import GoodsItem from "./GoodsItem/index.vue";

// components中的所组件都进行全局化注册
export const componentPlugin = {
  install (app) {
    // app.component('组件名字'，组件配置对象)
    app.component("GoodsItem", GoodsItem);
    app.component("ImageView", ImageView);
    app.component("Sku", Sku);
  }
};