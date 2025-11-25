#!/bin/bash

echo "=== 测试 API 端点 ==="
echo ""

echo "1. 健康检查..."
curl -s http://localhost:5001/api/health | jq . || curl -s http://localhost:5001/api/health
echo -e "\n"

echo "2. 注册用户..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser'$(date +%s)'","email":"test'$(date +%s)'@example.com","password":"test123"}')
echo "$REGISTER_RESPONSE" | jq . || echo "$REGISTER_RESPONSE"
echo ""

TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
if [ -z "$TOKEN" ]; then
  echo "注册失败，尝试登录..."
  LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5001/api/users/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test123"}')
  TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

if [ -n "$TOKEN" ]; then
  echo "Token 获取成功: ${TOKEN:0:30}..."
  echo ""
  
  echo "3. 获取所有项目（公开）..."
  curl -s http://localhost:5001/api/projects | jq '.success, .count' || curl -s http://localhost:5001/api/projects | head -5
  echo ""
  
  echo "4. 创建项目（需要认证）..."
  CREATE_PROJECT=$(curl -s -X POST http://localhost:5001/api/projects \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title":"测试项目","description":"这是一个测试项目描述","imageUrl":"https://via.placeholder.com/300","repoUrl":"https://github.com/test","liveUrl":"https://example.com"}')
  echo "$CREATE_PROJECT" | jq '.success, .data.title' || echo "$CREATE_PROJECT" | head -5
  echo ""
  
  echo "5. 获取博客文章（公开）..."
  curl -s http://localhost:5001/api/blog | jq '.success, .count' || curl -s http://localhost:5001/api/blog | head -5
  echo ""
  
  echo "6. 创建博客文章（需要认证）..."
  CREATE_POST=$(curl -s -X POST http://localhost:5001/api/blog \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"title":"测试博客文章","content":"这是博客文章的内容..."}')
  echo "$CREATE_POST" | jq '.success, .data.title' || echo "$CREATE_POST" | head -5
  echo ""
  
  echo "7. 发送联系消息（公开）..."
  CONTACT_RESPONSE=$(curl -s -X POST http://localhost:5001/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"测试用户","email":"contact@test.com","message":"这是一条测试消息"}')
  echo "$CONTACT_RESPONSE" | jq '.success, .message' || echo "$CONTACT_RESPONSE" | head -5
  echo ""
else
  echo "无法获取 Token，跳过需要认证的测试"
fi

echo "=== 测试完成 ==="

