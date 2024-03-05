import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user.js";
import { useCart } from "./useCart.js";
export const useUser = defineStore("user", () => {
  const cartStort = useCart();
  const userInfo = ref({});
  const login = ({ account, password }) => {
    return new Promise((resolve, reject) => {
      loginAPI({ account, password }).then(res => {
        userInfo.value = res.result;
        cartStort.mergedCar();
        resolve(userInfo);
      }).catch(err => {
        reject(err);
      });
    });
  };

  const loginOut = () => {
    userInfo.value = {};
    cartStort.clearCartList();
  };

  return { userInfo, login, loginOut };
}, {
  persist: true
});