// middleware/cors.js

import Cors from 'cors';

// 初始化 CORS 中间件
const cors = Cors({
  origin: '*', // 允许来自任何源的请求
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
});

// 导出中间件
export default cors;
