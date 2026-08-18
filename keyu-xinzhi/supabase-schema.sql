-- 创建文章表
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  summary VARCHAR(500),
  author VARCHAR(100) DEFAULT '科宇新知',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);

-- 插入示例数据
INSERT INTO articles (title, category, content, summary) VALUES
('React Hooks 学习笔记', '技术笔记', 
'# React Hooks 学习笔记

## useState
useState 是 React 中最常用的 Hook，用于在函数组件中添加状态。

```jsx
const [count, setCount] = useState(0);
```

## useEffect
useEffect 用于处理副作用，比如数据获取、订阅等。

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

## 总结
Hooks 让函数组件更加强大，可以替代类组件的大部分功能。', 
'学习 React Hooks 的核心概念和使用方法'),

('Vite 构建工具使用心得', '技术笔记',
'# Vite 构建工具使用心得

## 为什么选择 Vite
Vite 是一个现代化的前端构建工具，具有以下优势：

1. **快速的冷启动** - 基于 ES Modules
2. **即时热更新** - HMR 响应迅速
3. **开箱即用** - 支持 TypeScript、CSS 预处理器等

## 配置示例
```javascript
export default {
  server: {
    port: 3000
  }
}
```',
'分享 Vite 构建工具的使用经验和配置技巧'),

('读书有感：《深度工作》', '生活随笔',
'# 读书有感：《深度工作》

## 核心观点
在这个碎片化的时代，深度工作能力变得越来越珍贵。

## 我的感悟
读完这本书后，我开始尝试：
- 每天安排固定的深度工作时间
- 减少社交媒体的使用
- 培养专注的习惯

## 推荐指数
⭐⭐⭐⭐⭐ 强烈推荐给大家！',
'阅读《深度工作》后的心得体会'),

('周末爬山记', '生活随笔',
'# 周末爬山记

这个周末和朋友一起去爬了附近的山峰。

清晨出发，空气清新，沿途风景优美。虽然过程有些辛苦，但站在山顶俯瞰全城的感觉真是太棒了！

生活中需要这样的时刻，远离城市的喧嚣，亲近自然，让心灵得到放松。',
'记录周末爬山的愉快经历'),

('程序员必备工具推荐', '资源整理',
'# 程序员必备工具推荐

## 代码编辑器
- **VS Code** - 轻量级、插件丰富
- **WebStorm** - 功能强大的 IDE

## 在线工具
- **CodePen** - 在线代码演示
- **StackBlitz** - 在线开发环境

## 学习资源
- **MDN Web Docs** - 权威的 Web 技术文档
- **freeCodeCamp** - 免费编程学习平台',
'整理分享程序员常用的工具和资源'),

('优质技术博客汇总', '资源整理',
'# 优质技术博客汇总

## 中文博客
1. 阮一峰的网络日志
2. 美团技术团队博客
3. 阿里技术

## 英文博客
1. CSS-Tricks
2. Smashing Magazine
3. DEV Community

持续更新中...',
'收集整理优质的技术博客资源');

-- 启用 Row Level Security (可选)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- 创建允许公开读取的策略
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (true);

-- 创建允许插入的策略（根据需要配置）
CREATE POLICY "Allow insert access" ON articles
  FOR INSERT WITH CHECK (true);
