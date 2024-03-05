// axios
import axios from "axios";
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useUser } from '@/stores/useUser.js';
import router from "@/router";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 10000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  config => {
    const store = useUser();
    const token = store.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  e => Promise.reject(e)
);

// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    if (e.request.status === 401) {
      const store = useUser();
      store.loginOut();
      router.replace("/login");
      ElMessage.error("token校验失败");
    }
    ElMessage.error(e.response.data.message);
    return Promise.reject(e.request.data);
  }
);

export default httpInstance;
