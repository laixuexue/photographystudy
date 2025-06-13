// 自定义部署脚本
const { execSync } = require('child_process');

console.log('🚀 开始部署到Cloudflare Workers...');

try {
  // 构建Next.js项目
  console.log('📦 构建Next.js项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 部署到Cloudflare Workers
  console.log('🌩️ 部署到Cloudflare Workers...');
  execSync('npx wrangler deploy', { stdio: 'inherit' });

  console.log('✅ 部署成功！');
} catch (error) {
  console.error('❌ 部署失败:', error);
  process.exit(1);
} 