---
title: Docker コマンドをMakefileで短いコマンドで実行しよう
tags:
  - Makefile
  - Docker
private: false
updated_at: '2025-04-20T19:08:53+09:00'
id: f2cb9fbecbc2375a14c8
organization_url_name: rits-rcc
slide: false
ignorePublish: false
scheduled_at: null
---
dockerのコマンドって長いと思いませんか？また複数のコマンドを1つのコマンドで同時に実行できるといいですよね．実はMakefileは非常に奥が深いが，ここでは簡単な使い方を紹介する．

詳しいMakefileの説明は以下の記事から
[鋭意製作中]

# Makefileのルール
Makefileに含まれる情報は，以下の通りである．

 - 変数の定義(変数，自動変数，暗黙の変数，特殊変数)
 - ルール
 - 他のMakefileを取得するための情報，デバッグ情報などなど

```md:Makefileの文法
ターゲット:前提条件
  コマンド
```

# 実際の例
Djangoプロジェクトであることを仮定する．`docker-compose.yml`にはプロジェクトを立ち上げるための`python manage.py runserver`が実行できるようになっているとする．

```makefile
run:
    docker-compose up -d

run/migration: run
    docker-compose exec -T web python manage.py makemigrations
    docker-compose exec -T web python manage.py migrate

stop:
    docker-compose stop

down:
    docker-compose down
```
これをプロジェクトのルートに作成して，ルートにおいて以下のコマンドを実行する．
```bash
make run
```
これで`docker compose -d`が実行されるため，`python manage.py runserver`が実行されサーバーが立ち上げる．
また，
```bash
make run/migration
```
これは**前提条件として`run`を使用している**のでサーバーの軌道からマイグレーションまで一回で行うことができる．
これでdjangoプロジェクトにおいて以下のコマンドを実行するのでマイグレーションを行うことができる．
```
python manage.py makemigration
python manage.py migrate
```

また，
```
make stop
```
これで`docker compose stop`ができる．

```
make down
```
これで`docker compose down`ができる．



このように自分でルールとコマンドを作成すれば様々なコマンドを`make hogehoge`の形で実行することができる．今回は簡単な例にしたが，プロキシを使用している場合など，実行コマンドが長かったり，実行に複数のコマンドを使用する際に非常に有用である．
