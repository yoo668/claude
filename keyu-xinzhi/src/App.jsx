import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

// Home Page Component
function Home() {
  const [articles, setArticles] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      // Group by category
      const grouped = {}
      const categories = ['技术笔记', '生活随笔', '资源整理']
      
      categories.forEach(cat => {
        grouped[cat] = data?.filter(a => a.category === cat) || []
      })

      setArticles(grouped)
    } catch (error) {
      console.error('Error fetching articles:', error)
      // Use fallback data if Supabase is not configured
      setArticles(getFallbackData())
    } finally {
      setLoading(false)
    }
  }

  function getFallbackData() {
    return {
      '技术笔记': [
        { id: 1, title: 'React Hooks 学习笔记', summary: '学习 React Hooks 的核心概念和使用方法', created_at: '2024-01-15' },
        { id: 2, title: 'Vite 构建工具使用心得', summary: '分享 Vite 构建工具的使用经验和配置技巧', created_at: '2024-01-14' }
      ],
      '生活随笔': [
        { id: 3, title: '读书有感：《深度工作》', summary: '阅读《深度工作》后的心得体会', created_at: '2024-01-13' },
        { id: 4, title: '周末爬山记', summary: '记录周末爬山的愉快经历', created_at: '2024-01-12' }
      ],
      '资源整理': [
        { id: 5, title: '程序员必备工具推荐', summary: '整理分享程序员常用的工具和资源', created_at: '2024-01-11' },
        { id: 6, title: '优质技术博客汇总', summary: '收集整理优质的技术博客资源', created_at: '2024-01-10' }
      ]
    }
  }

  const categories = [
    { 
      name: '技术笔记', 
      icon: '💻', 
      desc: '记录编程、软件开发、网络技术等学习过程中的心得总结',
      color: '#2563eb'
    },
    { 
      name: '生活随笔', 
      icon: '📝', 
      desc: '分享日常生活感悟、读书心得、学习方法等个人内容',
      color: '#7c3aed'
    },
    { 
      name: '资源整理', 
      icon: '📚', 
      desc: '整理分享公开的学习资源、工具推荐等实用信息',
      color: '#059669'
    }
  ]

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <>
      <section className="hero">
        <h1>欢迎来到科宇新知</h1>
        <p>个人知识分享平台 · 记录学习点滴 · 分享生活感悟</p>
      </section>

      <main className="main-content">
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={`/category/${encodeURIComponent(category.name)}`} key={category.name}>
              <article className="category-card" style={{ borderTop: `4px solid ${category.color}` }}>
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  {articles[category.name]?.length || 0} 篇文章
                </div>
              </article>
            </Link>
          ))}
        </div>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>最新文章</h2>
          <div className="article-list">
            {Object.values(articles).flat().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5).map((article) => (
              <Link to={`/article/${article.id}`} key={article.id}>
                <article className="article-card">
                  <h3>{article.title}</h3>
                  <div className="meta">
                    <span style={{ marginRight: '1rem' }}>{article.category}</span>
                    <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <p>{article.summary}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

// Category Page Component
function CategoryPage({ categoryName }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [categoryName])

  async function fetchArticles() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', decodeURIComponent(categoryName))
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || getFallbackByCategory(decodeURIComponent(categoryName)))
    } catch (error) {
      console.error('Error fetching articles:', error)
      setArticles(getFallbackByCategory(decodeURIComponent(categoryName)))
    } finally {
      setLoading(false)
    }
  }

  function getFallbackByCategory(category) {
    const fallback = {
      '技术笔记': [
        { id: 1, title: 'React Hooks 学习笔记', summary: '学习 React Hooks 的核心概念和使用方法', content: '# React Hooks 学习笔记\n\n## useState\nuseState 是 React 中最常用的 Hook，用于在函数组件中添加状态。\n\n## useEffect\nuseEffect 用于处理副作用，比如数据获取、订阅等。', created_at: '2024-01-15', author: '科宇新知' },
        { id: 2, title: 'Vite 构建工具使用心得', summary: '分享 Vite 构建工具的使用经验和配置技巧', content: '# Vite 构建工具使用心得\n\n## 为什么选择 Vite\nVite 是一个现代化的前端构建工具。', created_at: '2024-01-14', author: '科宇新知' }
      ],
      '生活随笔': [
        { id: 3, title: '读书有感：《深度工作》', summary: '阅读《深度工作》后的心得体会', content: '# 读书有感：《深度工作》\n\n## 核心观点\n在这个碎片化的时代，深度工作能力变得越来越珍贵。', created_at: '2024-01-13', author: '科宇新知' },
        { id: 4, title: '周末爬山记', summary: '记录周末爬山的愉快经历', content: '# 周末爬山记\n\n这个周末和朋友一起去爬了附近的山峰。', created_at: '2024-01-12', author: '科宇新知' }
      ],
      '资源整理': [
        { id: 5, title: '程序员必备工具推荐', summary: '整理分享程序员常用的工具和资源', content: '# 程序员必备工具推荐\n\n## 代码编辑器\n- VS Code - 轻量级、插件丰富\n- WebStorm - 功能强大的 IDE', created_at: '2024-01-11', author: '科宇新知' },
        { id: 6, title: '优质技术博客汇总', summary: '收集整理优质的技术博客资源', content: '# 优质技术博客汇总\n\n## 中文博客\n1. 阮一峰的网络日志\n2. 美团技术团队博客', created_at: '2024-01-10', author: '科宇新知' }
      ]
    }
    return fallback[category] || []
  }

  const categoryIcons = {
    '技术笔记': '💻',
    '生活随笔': '📝',
    '资源整理': '📚'
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  return (
    <main className="main-content">
      <Link to="/" className="back-btn">← 返回首页</Link>
      <h1 style={{ marginBottom: '0.5rem' }}>{categoryIcons[decodeURIComponent(categoryName)]} {decodeURIComponent(categoryName)}</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
        {articles.length} 篇文章
      </p>
      
      {articles.length === 0 ? (
        <div className="empty-state">
          <p>暂无文章</p>
        </div>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id}>
              <article className="article-card">
                <h3>{article.title}</h3>
                <div className="meta">
                  <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
                  {article.author && <span style={{ marginLeft: '1rem' }}>by {article.author}</span>}
                </div>
                <p>{article.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

// Article Detail Page Component
function ArticlePage({ articleId }) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticle()
  }, [articleId])

  async function fetchArticle() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single()

      if (error) throw error
      setArticle(data || getFallbackArticle(articleId))
    } catch (error) {
      console.error('Error fetching article:', error)
      setArticle(getFallbackArticle(articleId))
    } finally {
      setLoading(false)
    }
  }

  function getFallbackArticle(id) {
    const fallback = {
      '1': { id: '1', title: 'React Hooks 学习笔记', category: '技术笔记', content: '# React Hooks 学习笔记\n\n## useState\nuseState 是 React 中最常用的 Hook，用于在函数组件中添加状态。\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n## useEffect\nuseEffect 用于处理副作用，比如数据获取、订阅等。\n\n```jsx\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);\n```\n\n## 总结\nHooks 让函数组件更加强大，可以替代类组件的大部分功能。', summary: '学习 React Hooks 的核心概念和使用方法', created_at: '2024-01-15', author: '科宇新知' },
      '2': { id: '2', title: 'Vite 构建工具使用心得', category: '技术笔记', content: '# Vite 构建工具使用心得\n\n## 为什么选择 Vite\nVite 是一个现代化的前端构建工具，具有以下优势：\n\n1. **快速的冷启动** - 基于 ES Modules\n2. **即时热更新** - HMR 响应迅速\n3. **开箱即用** - 支持 TypeScript、CSS 预处理器等', summary: '分享 Vite 构建工具的使用经验和配置技巧', created_at: '2024-01-14', author: '科宇新知' },
      '3': { id: '3', title: '读书有感：《深度工作》', category: '生活随笔', content: '# 读书有感：《深度工作》\n\n## 核心观点\n在这个碎片化的时代，深度工作能力变得越来越珍贵。\n\n## 我的感悟\n读完这本书后，我开始尝试：\n- 每天安排固定的深度工作时间\n- 减少社交媒体的使用\n- 培养专注的习惯\n\n## 推荐指数\n⭐⭐⭐⭐⭐ 强烈推荐给大家！', summary: '阅读《深度工作》后的心得体会', created_at: '2024-01-13', author: '科宇新知' },
      '4': { id: '4', title: '周末爬山记', category: '生活随笔', content: '# 周末爬山记\n\n这个周末和朋友一起去爬了附近的山峰。\n\n清晨出发，空气清新，沿途风景优美。虽然过程有些辛苦，但站在山顶俯瞰全城的感觉真是太棒了！\n\n生活中需要这样的时刻，远离城市的喧嚣，亲近自然，让心灵得到放松。', summary: '记录周末爬山的愉快经历', created_at: '2024-01-12', author: '科宇新知' },
      '5': { id: '5', title: '程序员必备工具推荐', category: '资源整理', content: '# 程序员必备工具推荐\n\n## 代码编辑器\n- **VS Code** - 轻量级、插件丰富\n- **WebStorm** - 功能强大的 IDE\n\n## 在线工具\n- **CodePen** - 在线代码演示\n- **StackBlitz** - 在线开发环境\n\n## 学习资源\n- **MDN Web Docs** - 权威的 Web 技术文档\n- **freeCodeCamp** - 免费编程学习平台', summary: '整理分享程序员常用的工具和资源', created_at: '2024-01-11', author: '科宇新知' },
      '6': { id: '6', title: '优质技术博客汇总', category: '资源整理', content: '# 优质技术博客汇总\n\n## 中文博客\n1. 阮一峰的网络日志\n2. 美团技术团队博客\n3. 阿里技术\n\n## 英文博客\n1. CSS-Tricks\n2. Smashing Magazine\n3. DEV Community\n\n持续更新中...', summary: '收集整理优质的技术博客资源', created_at: '2024-01-10', author: '科宇新知' }
    }
    return fallback[id] || null
  }

  if (loading) {
    return <div className="loading">加载中...</div>
  }

  if (!article) {
    return (
      <main className="main-content">
        <Link to="/" className="back-btn">← 返回首页</Link>
        <div className="empty-state">
          <p>文章不存在</p>
        </div>
      </main>
    )
  }

  // Simple markdown-like rendering
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index}>{line.slice(2)}</h2>
      } else if (line.startsWith('## ')) {
        return <h3 key={index}>{line.slice(3)}</h3>
      } else if (line.startsWith('- ') || line.match(/^\d+\./)) {
        return <li key={index}>{line.replace(/^[-*]\s*|^\d+\.\s*/, '')}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index}>{line}</p>
      }
    })
  }

  return (
    <main className="main-content">
      <Link to="/" className="back-btn">← 返回首页</Link>
      <article className="article-detail">
        <h1>{article.title}</h1>
        <div className="meta">
          <span style={{ marginRight: '1rem' }}>{article.category}</span>
          <span style={{ marginRight: '1rem' }}>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
          {article.author && <span>by {article.author}</span>}
        </div>
        <div className="content">
          {renderContent(article.content)}
        </div>
      </article>
    </main>
  )
}

// Main App Component
function App() {
  return (
    <Router basename="/keyu-xinzhi">
      <div className="app">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">科宇新知</Link>
            <nav className="nav">
              <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/category/技术笔记">技术笔记</Link></li>
                <li><Link to="/category/生活随笔">生活随笔</Link></li>
                <li><Link to="/category/资源整理">资源整理</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
        </Routes>

        <footer className="footer">
          <p>© 2024 科宇新知 · 个人知识分享平台</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
