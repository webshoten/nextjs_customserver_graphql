#### ビルドステージ #######################################
FROM node:20-alpine3.19 as builder
WORKDIR /work
# 依存パッケージをインストール
COPY package*.json ./
RUN npm ci
# ビルド
COPY . ./
RUN npm run build
##########################################################

#### 実行用イメージの作成 ##################################
FROM node:20-alpine3.19  as runner
WORKDIR /work
EXPOSE 8080
# 本番環境用のパッケージをインストール
COPY package*.json ./
RUN npm ci && npm cache clean --force
##########################################################

#### ビルド結果コピー #####################################
COPY --from=builder /work/dist ./dist
COPY --from=builder /work/tsconfig.build.json ./tsconfig.build.json
COPY --from=builder /work/tsconfig.json ./tsconfig.json
COPY --from=builder /work/public ./public
COPY --from=builder /work/.next ./.next
RUN chmod 777 tsconfig.build.json
RUN chmod 777 tsconfig.json
##########################################################

#### 起動 ################################################
CMD ["npm", "run", "start"]
##########################################################

#### コマンド #############################################
# docker build ./ -t nextjs
# docker run -e DATABASE_URL=**** -p 8080:8080 nextjs
##########################################################