# 部署到正确的 Vercel 账号

## 您的账号信息
- **用户名**: zzsss8836699
- **邮箱**: 3982430376@qq.com
- **GitHub 仓库**: https://github.com/zzsss8836699/portfolio-blog-fullstack

---

## 📝 部署步骤（通过 Vercel Dashboard）

### 第一步：登录 Vercel

1. 访问：https://vercel.com/login
2. 使用 GitHub 账号登录（zzsss8836699）
3. 确认登录成功

---

### 第二步：部署后端 API

#### 1. 导入项目

1. 访问：https://vercel.com/new
2. 在 "Import Git Repository" 中找到：`zzsss8836699/portfolio-blog-fullstack`
3. 点击 **Import**

#### 2. 配置后端项目

**项目设置**:
```
Project Name: portfolio-blog-api
Framework Preset: Other
Root Directory: backend
Build Command: (留空，使用 vercel.json 配置)
Output Directory: (留空)
Install Command: npm install
```

#### 3. 添加环境变量

点击 **Environment Variables**，添加以下变量（适用于 Production）：

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://o1uzpxtk_db_user:WCGvlES8jtK7z2JH@cluster0.4khdnbf.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `JWT_SECRET` | `362f34297d24663e09b6d2b8b81fe5285966d0eb56e0e16088b52a5c752a23a0` |
| `NODE_ENV` | `production` |

#### 4. 部署

1. 点击 **Deploy**
2. 等待部署完成（约 1-2 分钟）
3. **复制后端 URL**（例如：`https://portfolio-blog-api.vercel.app`）

#### 5. 配置部署保护

1. 进入项目 **Settings** → **Deployment Protection**
2. 选择 **Standard Protection**（仅保护预览部署）或关闭保护
3. 保存设置

---

### 第三步：部署前端

#### 1. 再次导入项目

1. 返回：https://vercel.com/new
2. 再次选择：`zzsss8836699/portfolio-blog-fullstack`
3. 点击 **Import**

#### 2. 配置前端项目

**项目设置**:
```
Project Name: portfolio-blog-frontend
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### 3. 添加环境变量

添加后端 API 地址（使用第二步获得的 URL）：

| Name | Value |
|------|-------|
| `REACT_APP_API_URL` | `https://your-backend-url.vercel.app` |

⚠️ **重要**: 将上面的 URL 替换为您在第二步获得的实际后端 URL

#### 4. 部署

1. 点击 **Deploy**
2. 等待部署完成（约 2-3 分钟）
3. **记录前端 URL**（例如：`https://portfolio-blog-frontend.vercel.app`）

---

## ✅ 验证部署

### 1. 测试后端 API

打开浏览器访问（或使用 curl）：
```
https://your-backend-url.vercel.app/api/health
```

应该返回：
```json
{
  "status": "OK",
  "message": "API is running"
}
```

### 2. 测试前端

访问前端 URL：
```
https://your-frontend-url.vercel.app
```

测试功能：
- ✅ 主页加载
- ✅ 项目列表
- ✅ 博客文章
- ✅ 用户注册
- ✅ 用户登录
- ✅ 评论功能
- ✅ 联系表单

---

## 🔄 自动部署设置

部署完成后，Vercel 会自动：
- 监听您的 GitHub 仓库
- 当您 push 到 main 分支时自动部署
- 为其他分支创建预览部署

---

## 🛠️ 故障排除

### 问题 1: 找不到 GitHub 仓库

**解决方案**:
1. 确保使用 GitHub 账号（zzsss8836699）登录 Vercel
2. 在 Vercel 设置中授权访问 GitHub
3. 刷新页面重试

### 问题 2: 构建失败

**解决方案**:
1. 检查 Root Directory 是否正确设置
2. 查看部署日志找出具体错误
3. 确认所有环境变量已正确添加

### 问题 3: 前端无法连接后端

**解决方案**:
1. 检查后端的部署保护设置
2. 确认前端环境变量 `REACT_APP_API_URL` 正确
3. 检查浏览器控制台的 CORS 错误

---

## 📊 部署后的管理

### Vercel Dashboard
访问：https://vercel.com/dashboard

在这里您可以：
- 查看所有部署
- 管理环境变量
- 查看部署日志
- 配置自定义域名
- 查看性能分析

### 环境变量管理

如需更新环境变量：
1. 进入项目 → Settings → Environment Variables
2. 编辑或添加变量
3. 重新部署以应用更改

---

## 🔐 安全建议

### 1. 生成新的 JWT Secret

部署到生产环境后，建议生成新的 JWT Secret：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

在 Vercel Dashboard 更新 `JWT_SECRET` 环境变量。

### 2. 配置 MongoDB IP 白名单

在 MongoDB Atlas 中：
1. Network Access → Add IP Address
2. 添加 `0.0.0.0/0`（允许所有 IP）
3. 或添加 Vercel 的 IP 范围

### 3. 配置生产环境 CORS

编辑 `backend/server.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-url.vercel.app',
    'http://localhost:3000' // 本地开发
  ],
  credentials: true
}));
```

提交更改后 Vercel 会自动重新部署。

---

## 📝 部署检查清单

完成部署后，请确认：

- [ ] 使用正确的 Vercel 账号（zzsss8836699）
- [ ] 后端项目已创建并部署成功
- [ ] 后端环境变量已配置（MONGODB_URI, JWT_SECRET, NODE_ENV）
- [ ] 后端部署保护已禁用或配置为 Standard
- [ ] 后端 API 可以访问（/api/health 返回 200）
- [ ] 前端项目已创建并部署成功
- [ ] 前端环境变量已配置（REACT_APP_API_URL）
- [ ] 前端网站可以正常访问
- [ ] 所有功能测试通过
- [ ] 自动部署已启用

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 参考 Vercel 文档：https://vercel.com/docs
4. 检查 GitHub Issues：https://github.com/zzsss8836699/portfolio-blog-fullstack/issues

---

**部署指南创建时间**: 2025-11-25

**祝您部署顺利！** 🚀
