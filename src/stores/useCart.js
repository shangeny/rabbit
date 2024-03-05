import { defineStore } from "pinia";
import { useUser } from "./useUser.js";
import { insertCartAPI, delCartAPI, findNewCartListApi, mergeCartApi } from "@/apis/cart.js";
import { computed, onMounted } from "vue";

export const useCart = defineStore("cart", () => {
  const userStore = useUser();
  const isLogin = computed(() => userStore.userInfo.token);
  const cartList = ref([]);
  const updateNewList = async () => {
    const res = await findNewCartListApi();
    cartList.value = res.result;
  };

  const addCart = async (goods) => {
    if (isLogin.value) {
      await insertCartAPI(goods);
      updateNewList();
    } else {
      const item = cartList.value.find(item => item.skuId === goods.skuId);
      if (item) {
        item.count += goods.count;
      } else {
        cartList.value.push(goods);
      }
    }
  };

  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId]);
      updateNewList();
    } else {
      cartList.value = cartList.value.filter(item => item.skuId !== skuId);
    }
  };

  const mergedCar = async () => {
    const data = cartList.value.map(item => ({ skuId: item.skuId, selected: item.selected, count: item.count }));
    await mergeCartApi(data);
    updateNewList();
  };

  const singleChoiceCheck = (selected, skuId) => {
    const item = cartList.value.find(item => item.skuId === skuId);
    item.selected = selected;
  };

  const allSelectionCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected);
  };

  const clearCartList = () => {
    cartList.value = [];
  };

  const totalCount = computed(() => cartList.value.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0));
  const totalPrice = computed(() => cartList.value.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0));
  const isAll = computed(() => cartList.value.every(item => item.selected));
  const checkCount = computed(() => cartList.value.filter(item => item.selected).length);
  const checkPrice = computed(() => cartList.value.filter(item => item.selected).reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0));

  onMounted(() => {
    if (isLogin.value) {
      updateNewList();
    }
  });

  return {
    cartList,
    addCart,
    delCart,
    singleChoiceCheck,
    allSelectionCheck,
    clearCartList,
    mergedCar,
    updateNewList,
    totalCount,
    totalPrice,
    isAll,
    checkCount,
    checkPrice
  };
}, {
  persist: true,
});