import httpInstance from "@/utils/http";

// 获取购物车列表
export const findNewCartListApi = () => {
  return httpInstance({
    url: '/member/cart'
  });
};


// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  });
};

// 删除购物车
export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  });
};

// 合并购物车
export const mergeCartApi = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  });
};
