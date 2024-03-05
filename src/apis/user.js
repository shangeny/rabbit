import httpInstance from "@/utils/http";

export const loginAPI = (data) => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data
  });
};

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  });
};