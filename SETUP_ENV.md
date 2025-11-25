# 环境变量配置说明

## 创建 .env 文件

在 `backend` 目录下创建 `.env` 文件，内容如下：

```env
PORT=5000
MONGODB_URI=mongodb+srv://oluzpxtk_db_user:WCGvlES8jtK7z2JH@cluster0.4khdnbf.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
```

## 重要提示

1. **MongoDB 连接字符串**已配置好，包含：
   - 用户名：oluzpxtk_db_user
   - 密码：WCGvlES8jtK7z2JH
   - 数据库名：portfolio_db（会自动创建）

2. **JWT_SECRET**：请在生产环境中更改为更安全的随机字符串

3. **确保 MongoDB Atlas 网络访问**：
   - 登录 MongoDB Atlas
   - 进入 Network Access
   - 添加 IP 地址 0.0.0.0/0（允许所有 IP，仅用于开发）
   - 或添加你的具体 IP 地址（生产环境推荐）

## 快速创建命令（Mac/Linux）

在 backend 目录下运行：

```bash
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=mongodb+srv://oluzpxtk_db_user:WCGvlES8jtK7z2JH@cluster0.4khdnbf.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
EOF
```

## Windows PowerShell

```powershell
@"
PORT=5000
MONGODB_URI=mongodb+srv://oluzpxtk_db_user:WCGvlES8jtK7z2JH@cluster0.4khdnbf.mongodb.net/portfolio_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding utf8
```

## 验证配置

创建 .env 文件后，运行：

```bash
cd backend
npm install
npm start
```

如果看到 "Connected to MongoDB" 消息，说明配置成功！

