# ちゅら海ハッカーズ_フロント

# Docker周り
## 注意
docker系のコマンドはデフォルトだと権限が与えられていないので、エラーが出る場合は一度`sudo`を付けて実行してみてください

## 1.コンテナの起動
起動すると2,3ができるようになる
```
docker-compose up -d --build
```

＊初回起動時は以下も行ってください

```
docker exec vue_container npm install
```


## 2.Vueサーバの起動
```
docker exec vue_container npm run serve
```

## 3.ビルド
```
docker exec vue_container npm run build
```

## 4.コンテナの閉じかた
```
docker stop vue_container
docker rm vue_container
```

# 命名規則
以下の命名規則を採用
## ファイル名/コンポーネントの記述/コンポーネントの登録
### アッパーキャメル(パスカル)ケース
```
ファイル名
例：MsgBtn.vue
コンポーネントの記述
例：<MtgBtn />
コンポーネントの登録
例：component:{
      MsgBtn 
    }
```
## クラス名/propsの受け渡し側
### ケバブケース
```
クラス名
例：msg-btn
propsの受け渡し側
例：first-msg
```
## data/メソッド名/propsの受け取り側
### キャメルケース
```
data
例：data(){  
      return{  
          nameList  
      }  
    }  
メソッド名
例：createBtn
propsの受け取り側
例：firstName
```
