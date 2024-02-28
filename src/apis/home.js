import httpInstance from "@/utils/http";

export function getBannerAPI({ distributionSite = "1" } = {}) {
  return httpInstance({
    url: "/home/banner",
    params: {
      distributionSite,
    },
  });
}

export function getNewAPI() {
  return httpInstance({
    url: "/home/new",
  });
}

export function getHotAPI() {
  return httpInstance({
    url: "/home/hot",
  });
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: "/home/goods",
  });
};
