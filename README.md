# AI 图像生成器 - Cloudflare Worker 实现
基于https://github.com/kaima2022/ShowImageWeb 改造
此项目将原有的 Python Streamlit 应用重新实现为 Cloudflare Worker，提供相同的 AI 图像生成功能，但具有更好的性能、可扩展性和成本效益。

## 功能特性

- **AI 图像生成**: 通过 API 调用生成高质量图像
- **响应式 UI**: 现代化的用户界面，支持各种设备
- **历史记录**: 本地存储生成的图像历史
- **参数控制**: 支持种子、API 配置等参数
- **实时预览**: 生成图像的即时预览
- **下载功能**: 支持下载生成的图像

## 架构设计

### 前端 (HTML/CSS/JavaScript)
- **HTML**: 提供用户界面结构
- **CSS**: 实现现代化的玻璃态设计
- **JavaScript**: 处理用户交互和 API 调用

### 后端 (Cloudflare Worker)
- **API 代理**: 转发图像生成请求到 AI 服务
- **CORS 支持**: 处理跨域请求
- **缓存策略**: 优化静态资源加载
- **安全验证**: API 密钥验证

## 部署说明

### 环境要求
- Node.js 16+
- npm 或 yarn
- Cloudflare 账户

### 安装步骤

1. 安装依赖:
```bash
npm install
```

2. 配置 wrangler (获取 Cloudflare API 令牌):
```bash
npx wrangler login
```

3. 修改 `wrangler.toml` 配置文件: （也可以什么都不改）
   - 替换 `account_id` 为你的 Cloudflare 账户 ID
   - 设置适当的路由配置

4. 部署到 Cloudflare:
```bash
npm run deploy
```

### 本地开发

```bash
npm run dev
```

## API 接口

### 生成图像
- **端点**: `POST /api/generate`
- **请求体**:
```json
{
  "prompt": "图像描述",
  "seed": 42
}
```
- **响应**:
```json
{
  "base64": "图像的 base64 编码"
}
```

### 获取配置
- **端点**: `GET /api/config`
- **响应**: 配置信息

## 安全考虑

- API 密钥通过环境变量或请求头传递
- CORS 策略限制跨域访问
- 输入验证防止恶意请求

## 性能优化

- 静态资源缓存
- 图像懒加载
- 响应式设计
- CDN 分发

## 与原 Python 应用的对比

| 特性 | 原 Python Streamlit | Cloudflare Worker |
|------|-------------------|------------------|
| 部署复杂度 | 需要服务器 | 无服务器 |
| 扩展性 | 需要手动扩展 | 自动扩展 |
| 延迟 | 取决于服务器位置 | 全球 CDN |
| 成本 | 服务器成本 | 按请求计费 |
| 安全性 | 需要额外配置 | 内置安全 |