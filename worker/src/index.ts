/**
 * 摄影技术学习网站 - Cloudflare Workers 入口文件
 */

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// 定义环境变量接口
interface Env {
  __STATIC_CONTENT: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      // 获取静态资源
      return await getAssetFromKV({
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      }, {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: {},
      });
    } catch (e) {
      // 处理404错误，返回自定义404页面
      if (e instanceof Error && e.message.includes('404')) {
        // 尝试获取自定义404页面
        try {
          const notFoundResponse = await getAssetFromKV({
            request: new Request(new URL('/404.html', request.url).toString(), request),
            waitUntil: ctx.waitUntil.bind(ctx),
          }, {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: {},
          });
          return new Response(notFoundResponse.body, {
            ...notFoundResponse,
            status: 404,
          });
        } catch (e) {
          // 如果没有自定义404页面，返回简单的404响应
          return new Response('页面未找到', { status: 404 });
        }
      }
      
      // 处理其他错误
      return new Response('服务器错误', { status: 500 });
    }
  },
}; 