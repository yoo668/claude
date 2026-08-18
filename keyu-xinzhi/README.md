# 科宇新知 - 个人知识分享平台

一个基于 React + Vite + Supabase 构建的个人知识分享网站。

## 网站定位

本网站为个人知识分享类网站，主要发布个人学习笔记、技术心得、生活随笔等非经营性内容。

## 网站栏目

1. **技术笔记**：记录编程、软件开发、网络技术等学习过程中的心得总结
2. **生活随笔**：分享日常生活感悟、读书心得、学习方法等个人内容
3. **资源整理**：整理分享公开的学习资源、工具推荐等实用信息

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由**: React Router DOM
- **数据库**: Supabase
- **样式**: CSS Variables + 现代 CSS

## 部署到 GitHub Pages

### 1. 初始化 Git 仓库（如果还没有）

```bash
cd keyu-xinzhi
git init
git add .
git commit -m "Initial commit"
```

### 2. 创建 GitHub 仓库

在 GitHub 上创建一个名为 `keyu-xinzhi` 的新仓库。

### 3. 推送代码到 GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/keyu-xinzhi.git
git branch -M main
git push -u origin main
```

### 4. 配置 GitHub Actions 自动部署

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5. 启用 GitHub Pages

1. 进入 GitHub 仓库的 Settings
2. 点击左侧的 "Pages"
3. 在 "Build and deployment" 部分：
   - Source 选择 "GitHub Actions"
4. 等待 GitHub Actions 完成部署

### 6. 访问网站

部署完成后，你的网站将可以通过以下地址访问：
```
https://YOUR_USERNAME.github.io/keyu-xinzhi/
```

## Supabase 数据库配置

### 1. 登录 Supabase

访问 https://supabase.com 并登录你的账户。

### 2. 创建项目或使用现有项目

使用提供的 URL: https://wnwdvwthjmlyyeakpirw.supabase.co

### 3. 执行 SQL 脚本

在 Supabase 控制台的 SQL Editor 中执行 `supabase-schema.sql` 文件的内容：

```sql
-- 复制 supabase-schema.sql 的全部内容并执行
```

这将创建 `articles` 表并插入示例数据。

### 4. 获取 API Key

在 Project Settings -> API 中找到你的 publishable key，确保已填入 `.env` 文件：

```
VITE_SUPABASE_URL=https://wnwdvwthjmlyyeakpirw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SGY0_SRC3ROGNP-HS9LebA_c3f0ViHb
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
keyu-xinzhi/
├── src/
│   ├── lib/
│   │   └── supabase.js      # Supabase 客户端配置
│   ├── App.jsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── main.jsx             # 入口文件
│   └── index.css            # 全局样式
├── dist/                    # 构建输出目录（用于部署）
├── public/                  # 静态资源
├── index.html               # HTML 模板
├── vite.config.js           # Vite 配置
├── .env                     # 环境变量
├── supabase-schema.sql      # 数据库 schema
└── package.json             # 项目配置
```

## 功能特点

- ✅ 响应式设计，支持移动端
- ✅ 三个内容分类展示
- ✅ 文章列表和详情页面
- ✅ Supabase 数据库集成
- ✅ 优雅的空状态处理
- ✅ SEO 友好的 meta 标签
- ✅ 蓝色主题配色（专业、清新）

## 添加新文章

可以通过以下方式添加新文章：

1. **直接操作 Supabase**: 在 Supabase 控制台的 Table Editor 中添加数据
2. **使用 SQL**: 
   ```sql
   INSERT INTO articles (title, category, content, summary, author)
   VALUES ('文章标题', '技术笔记', '文章内容...', '摘要...', '作者名');
   ```

## License

MIT

---

© 2024 科宇新知 · 个人知识分享平台
