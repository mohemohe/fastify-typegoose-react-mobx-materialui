Fastify-Typegoose-React-MobX-MaterialUI
====

要するに`俺が考えた最強のボイラープレート`ってやつだ

## 特徴

### 全般

- TypeScriptによる型安全
- MonoRepoによるAPI型定義の共有
- URL_PREFIX環境変数によるサブディレクトリ対応

### サーバーサイド

- Fastifyによる高速なAPI
- MongoDBによる柔軟なデータ保存
- ビルトインのAESとBCrypt暗号化
- デコレーターを使用したルート宣言とミドルウェア

### フロントエンド

- Parcelによる高速なビルド
- ReactとMobXによるVueライクなリアクティブシステム
- Materialデザイン
- 宣言的なルート定義
- パンくずリストの動的生成

## develop

```bash
git clone git@github.com:mohemohe/fastify-typegoose-react-mobx-materialui.git
rm -rf .git
git init
cp .env.sample .env
docker-compose up
```

----

built with:

- [Fastify](https://github.com/fastify/fastify)
- [Typegoose](https://github.com/szokodiakos/typegoose)
- [MongoDB](https://github.com/mongodb/mongo)
- [Parcel](https://github.com/parcel-bundler/parcel)
- [React](https://github.com/facebook/react)
- [MobX](https://github.com/mobxjs/mobx)
- [Material UI](https://github.com/mui-org/material-ui)
