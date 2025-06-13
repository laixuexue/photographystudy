# Cloudflare Workers 部署指南

## 前置条件

- 已注册 Cloudflare 账号
- 已安装 Node.js、npm/yarn/pnpm
- 已全局安装 wrangler（Cloudflare 官方 CLI 工具）
  ```bash
  npm install -g wrangler
  ```
- 已登录 wrangler
  ```bash
  wrangler login
  ```

## 部署流程

### 1. 安装依赖

首先，在项目根目录和 worker 目录分别安装依赖：

```bash
# 在项目根目录安装依赖
npm install

# 在 worker 目录安装依赖
cd worker
npm install
cd ..
```

### 2. 构建 Next.js 应用

```bash
npm run build
```

这将生成静态文件到 `out` 目录。

### 3. 部署到 Cloudflare Workers

```bash
cd worker
npm run deploy
```

部署完成后，Cloudflare 会提供一个形如 `https://photography-learning.xxxx.workers.dev` 的 URL。

## 自定义域名配置

如果你想使用自己的域名，需要在 Cloudflare Dashboard 中进行以下配置：

1. 在 Cloudflare 中添加你的域名
2. 更新域名的 DNS 记录，指向 Workers
3. 在 `wrangler.toml` 中更新 `route` 配置：

```toml
[env.production]
name = "photography-learning-prod"
route = "your-actual-domain.com/*"
```

## 本地开发

要在本地开发和测试 Workers 应用，可以运行：

```bash
# 在项目根目录构建 Next.js 应用
npm run build

# 在 worker 目录启动本地开发服务器
cd worker
npm run dev
```

这将启动一个本地服务器，通常在 `http://localhost:8787`。

## 常见问题

### 图片加载问题

由于 Next.js 的图片优化功能在 Cloudflare Workers 上不受支持，我们在配置中设置了 `unoptimized: true`。这意味着图片不会被 Next.js 优化，但仍然可以正常显示。

如果需要图片优化，可以考虑使用 Cloudflare Images 服务。

### 环境变量

如果你的应用使用环境变量，需要在 Cloudflare Dashboard 中配置这些变量，或者在 `wrangler.toml` 中添加：

```toml
[vars]
MY_VARIABLE = "my-value"
```

### API 路由

由于我们使用 `output: 'export'`，Next.js API 路由不会工作。如果需要 API 功能，可以：

1. 在 Workers 中实现 API 功能
2. 使用 Cloudflare Workers 的 KV、Durable Objects 或 D1 数据库
3. 考虑使用 Cloudflare Pages Functions 