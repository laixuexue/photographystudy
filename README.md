# 摄影技术学习网站

基于 Next.js 和 Tailwind CSS 构建的交互式摄影学习平台。

## 项目特点

- 丰富的摄影教程与资源
- 交互式学习体验
- 响应式设计，支持各种设备
- 优化的图片展示与教学内容

## 技术栈

- Next.js 13
- TypeScript
- Tailwind CSS
- React
- Framer Motion

## 本地开发

1. 克隆仓库
```bash
git clone <仓库地址>
cd 摄影技术学习2
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 构建与部署

### 标准构建

```bash
npm run build
npm run start
```

### Cloudflare Workers 部署

本项目已配置为可部署到 Cloudflare Workers。详细部署步骤请参考 [docs/deploy-cloudflare.md](docs/deploy-cloudflare.md)。

简要步骤：

1. 安装 Wrangler CLI
```bash
npm install -g wrangler
```

2. 登录 Cloudflare
```bash
wrangler login
```

3. 构建项目
```bash
npm run build
```

4. 部署到 Cloudflare Workers
```bash
cd worker
npm install
npm run deploy
```

## 项目结构

- `src/app/*` - 应用页面
- `src/components/*` - React 组件
- `src/lib/*` - 工具函数与库
- `src/styles/*` - 全局样式
- `public/*` - 静态资源
- `worker/*` - Cloudflare Workers 配置与代码

## 贡献指南

欢迎提交 Pull Request 或创建 Issue 来改进项目。

## 许可证

[MIT](LICENSE) 