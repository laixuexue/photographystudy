/**
 * 摄影技术学习网站 - Cloudflare Workers 入口文件
 * 简化版本，使用JavaScript
 */

export default {
  async fetch(request, env, ctx) {
    return fetch(request);
  },
}; 