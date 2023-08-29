FROM node:18.17.1

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のコピーとインストール
COPY ./login-check/package*.json ./
RUN npm ci

# アプリケーションのソースをコピー
COPY ./login-check/app ./app
COPY ./login-check/public ./public
COPY ./login-check/next.config.js .
COPY ./login-check/tsconfig.json .

# ポート3000でアプリを実行
CMD ["npm", "run", "dev"]
