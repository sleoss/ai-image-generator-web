# ShowImageWeb - AI 图像生成器

基于 Cloudflare Pages Functions 的 AI 图像生成 Web 应用。

## 项目结构

```
├── aioec.html                    # 主页面（内联CSS和JS）
├── wrangler.toml                 # Workers 配置文件（保留）
├── wrangler-pages.toml          # Pages 配置文件
├── functions/                   # Pages Functions 目录
│   └── api/                     # API 函数
│       ├── generate.js          # 图像生成 API (/api/generate)
│       └── config.js            # 配置 API (/api/config)
├── package.json                 # 项目依赖
└── README.md                    # 项目说明
```

## 功能特性

- 🎨 AI 图像生成 - 支持自定义提示词
- 🔧 灵活的参数控制 - 随机种子、种子数值
- 📊 统计信息 - 生成时间、作品数量等
- 💾 本地存储 - 历史记录保存
- 📱 响应式设计 - 适配各种设备
- 🚀 高性能部署 - 基于 Cloudflare 全球网络

## Cloudflare Pages Functions 架构

### API 路由

- `GET /api/config` - 获取应用配置
- `POST /api/generate` - 生成 AI 图像

### 环境变量

在 Cloudflare Dashboard 中设置以下环境变量：

- `API_KEY` - AI 图像生成 API 密钥
- `API_BASE_URL` - API 基础地址（可选，默认：https://z-api.aioec.tech/proxy/generate）

## 部署指南

### 1. 准备工作

确保你有：
- Cloudflare 账户
- AI 图像生成 API 密钥
- Node.js 18+ （如果需要本地开发）

### 2. 部署到 Cloudflare Pages

#### 方法一：使用 Wrangler CLI

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署到生产环境
wrangler pages deploy . --project-name=ai-image-generator-web

# 部署到预览环境
wrangler pages deploy . --project-name=ai-image-generator-web --branch-name=preview
```

#### 方法二：使用 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Dashboard 中创建 Pages 项目
3. 连接 GitHub 仓库
4. 设置构建设置：
   - 构建命令：`echo 'No build needed - static files with Functions'`
   - 输出目录：`.`
   - Functions 目录：`functions`
5. 添加环境变量
6. 部署

### 3. 环境变量配置

在 Cloudflare Pages 项目设置中添加：

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `API_KEY` | AI 图像生成 API 密钥 | `sk-xxxxxxxx` |
| `API_BASE_URL` | API 基础地址 | `https://z-api.aioec.tech/proxy/generate` |

### 4. 自定义域名（可选）

在 Cloudflare Dashboard 中：
1. 进入 Pages 项目设置
2. 点击 "Custom domains"
3. 添加你的域名并配置 DNS

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 本地预览

```bash
# 使用 Wrangler 本地预览
wrangler pages dev . --port=8080

# 或者使用其他静态文件服务器
python -m http.server 8080
```

### 3. 测试 API 函数

本地开发时，API 函数会自动在 `/functions` 目录中查找。

## 项目改造说明

### 从 Cloudflare Worker 到 Pages Functions 的迁移

1. **静态资源处理**
   - Worker: 内联返回 HTML、CSS、JS
   - Pages: 使用静态文件 + Functions 处理 API

2. **路由结构**
   - Worker: 在单个文件中处理所有路由
   - Pages: 按路径分离到不同函数文件

3. **配置文件**
   - `wrangler.toml` → `wrangler-pages.toml`
   - 添加 Pages 特定配置

4. **CORS 处理**
   - Pages Functions 自动处理 CORS 预检
   - 需要在响应中添加 CORS 头

## API 文档

### POST /api/generate

生成 AI 图像

**请求头：**
```
Content-Type: application/json
X-API-Key: your-api-key
```

**请求体：**
```json
{
  "prompt": "一座宏伟的城堡，8K高清",
  "seed": 42
}
```

**响应：**
```json
{
  "base64": "data:image/png;base64,iVBORw0KGgo...",
  "success": true
}
```

### GET /api/config

获取应用配置

**响应：**
```json
{
  "apiBaseUrl": "https://z-api.aioec.tech/proxy/generate",
  "features": {
    "randomSeed": true,
    "seedControl": true,
    "galleryStats": true,
    "localStorage": true
  },
  "limits": {
    "maxSeed": 1000000000,
    "minSeed": 0,
    "maxGalleryCols": 4,
    "minGalleryCols": 1
  }
}
```

## 技术栈

- **前端**：原生 HTML + CSS + JavaScript
- **后端**：Cloudflare Pages Functions
- **部署**：Cloudflare Pages
- **API**：第三方 AI 图像生成服务

## 许可证

MIT License

## 支持

如有问题，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

**注意**：确保在部署前设置好所有必需的环境变量，特别是 `API_KEY`。