# AI 图像生成器 - Pages Functions 版本

## 项目简介

这是一个基于 Cloudflare Pages Functions 的 AI 图像生成器，替代了原有的 Cloudflare Worker 版本。项目支持两个页面互相切换，提供更好的用户体验。

## 项目结构

```
├── functions/           # Pages Functions 目录
│   └── api.js          # API 处理函数
├── index.html          # 主页面 (Gitee AI 版本)
├── aioec.html          # AIOEC 页面版本
├── package.json        # 项目依赖
├── wrangler.toml       # Worker 版本配置
├── wrangler-pages.toml # Pages Functions 配置
└── README-PAGES.md     # 本文档
```

## 核心特性

### 🚀 页面切换功能
- **主页面** (`/index.html`) - 基于 Gitee AI 的图像生成
- **AIOEC 页面** (`/aioec.html`) - 基于 AIOEC API 的图像生成
- 左上角导航按钮，支持快速切换

### 🎨 界面设计
- 现代化的玻璃态设计
- 响应式布局，支持移动端
- 流畅的动画效果
- 实时状态显示

### ⚡ 技术特性
- Cloudflare Pages Functions 高性能
- 本地存储历史记录
- 实时统计信息
- 一键下载生成图片

## 部署指南

### 1. 准备工作

确保你已经安装了 Cloudflare CLI：

```bash
npm install -g wrangler
```

### 2. 配置环境变量

在 Cloudflare Pages 项目中设置以下环境变量：

```
API_KEY=your-api-key-here
API_BASE_URL=https://z-api.aioec.tech/proxy/generate
```

### 3. 部署步骤

#### 方法一：使用 wrangler CLI

```bash
# 登录 Cloudflare
wrangler login

# 部署到生产环境
wrangler pages deploy . --project-name=ai-image-generator

# 部署到预览环境
wrangler pages deploy . --project-name=ai-image-generator --branch=preview
```

#### 方法二：使用 GitHub 集成

1. 将项目推送到 GitHub 仓库
2. 在 Cloudflare Pages 控制台连接仓库
3. 设置构建设置：
   - 构建命令：`echo 'Build completed'`
   - 构建输出目录：`.`
   - Functions 目录：`functions`

### 4. 路由配置

项目会自动处理以下路由：

- `/` → `index.html`
- `/index.html` → `index.html`
- `/aioec.html` → `aioec.html`
- `/api/generate` → `functions/api.js`
- `/api/config` → `functions/api.js`

## 使用说明

### 主页面 (index.html)

这是主要的图像生成界面，使用 Gitee AI API：

1. **API 配置**
   - 在左侧侧边栏输入 API Key
   - 配置 API 端点地址

2. **生成参数**
   - 选择图片尺寸比例
   - 设置自定义宽度/高度
   - 配置迭代步数
   - 选择随机种子或固定种子

3. **生成图像**
   - 在文本框中输入创意描述
   - 点击"立即生成"按钮
   - 等待 AI 处理完成

### AIOEC 页面 (aioec.html)

这是使用 AIOEC API 的界面版本：

1. **快速配置**
   - API Endpoint 和 Key
   - 种子参数设置

2. **简洁界面**
   - 专注于核心生成功能
   - 灵感示例快速填充

## 开发指南

### 本地开发

```bash
# 启动本地开发服务器
wrangler pages dev . --port=8080

# 或者使用 Python 简单服务器
python -m http.server 8080
```

### 测试 API 函数

```bash
# 测试 API 函数
curl -X POST http://localhost:8080/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "测试图片", "seed": 42}'
```

### 环境变量设置

在开发环境中，可以通过以下方式设置环境变量：

```bash
# 设置环境变量
export API_KEY="your-api-key"
export API_BASE_URL="https://z-api.aioec.tech/proxy/generate"

# 启动开发服务器
wrangler pages dev .
```

## 页面切换功能

每个页面的左上角都有导航按钮：

- **主页面的按钮** → "切换到 AIOEC 页面"
- **AIOEC 页面的按钮** → "切换到主页"

按钮设计特点：
- 固定定位，不随页面滚动
- 半透明背景，玻璃态效果
- 悬停时高亮显示
- 自动适配页面主题

## 技术栈

- **前端**: HTML5, CSS3, JavaScript ES6+
- **运行时**: Cloudflare Pages Functions
- **API 集成**: Gitee AI, AIOEC API
- **存储**: LocalStorage (客户端)
- **部署**: Cloudflare Pages

## 浏览器支持

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 常见问题

### Q: 如何更改 API 端点？
A: 在左侧侧边栏的 API 配置中直接修改，或者在环境变量中设置 `API_BASE_URL`。

### Q: 生成的图片如何保存？
A: 所有生成的图片都保存在本地浏览器存储中，清空浏览器数据会丢失记录。

### Q: 如何清空历史记录？
A: 点击左侧侧边栏的"清空历史记录"按钮，确认后即可清空。

### Q: 页面切换后数据会丢失吗？
A: 不会，两个页面使用相同的本地存储，历史记录和设置会保持同步。

## 许可证

MIT License

## 支持

如有问题或建议，请通过以下方式联系：

- 创建 GitHub Issue
- 发送邮件反馈

---

**Powered by Cloudflare Pages Functions** ⚡