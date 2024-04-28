#!/bin/bash

echo $1
# 根据命令行参数选择要使用的环境配置文件
if [ "$1" = "test" ]; then
  ENV_FILE=".env.test"
elif [ "$1" = "production" ]; then
  ENV_FILE=".env.production"
else
  exit 1
fi

# 设置环境变量
export $(grep -v '^#' $ENV_FILE | xargs)

# 打包项目
npm run build:$1

# 使用 Vercel CLI 部署
vercel --token=$VERCEL_TOKEN --prod
