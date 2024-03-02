import { getTopCategoryAPI } from "@/apis/category.js";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export default function useCategory () {
  // 获取category数据
  const route = useRoute();
  const categoryData = ref({});
  const getCategory = async (id) => {
    const res = await getTopCategoryAPI(id || route.params.id);
    categoryData.value = res.result;
  };
  // 方法一
  watch(
    () => route.params,
    () => {
      getCategory();
    },
    { immediate: true }
  );
  // 方法二 刷新后无法立即请求需路由再次变化才触发
  // 路由参数变化的时候调用
  // onBeforeRouteUpdate((to) => {
  //   getCategory(to.params.id)
  // })

  return { categoryData };
}
