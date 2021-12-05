# ちゅら海ハッカーズ_フロント

## 注意
docker系のコマンドはデフォルトだと権限が与えられていないので、エラーが出る場合は一度`sudo`を付けて実行してみてください

## 1.コンテナの起動
起動すると2,3ができるようになる
```
docker-compose up -d --build
```

＊初回起動時は以下も行ってください

```
docker exec vue_contaier npm intall
```


## 2.Vueサーバの起動
```
docker exec vue_container npm run serve
```

## 3.ビルド
```
docker exec vue_container npm run build
```
