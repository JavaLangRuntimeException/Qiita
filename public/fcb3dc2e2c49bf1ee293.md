---
title: Web開発の基本概念-3層アーキテクチャについて
tags:
  - Java
  - Python
  - Django
  - Web
  - SpringBoot
private: false
updated_at: '2025-04-20T23:17:00+09:00'
id: fcb3dc2e2c49bf1ee293
organization_url_name: rits-rcc
slide: false
ignorePublish: false

---
この記事はweb開発をするにあたっての3層アーキテクチャについて記述する．さらに例示としてPythonフレームワークであるDjangoとJavaのフレームワークであるSpring Frameworkと3層アーキテクチャの関係性についても記載する．

# 3層アーキテクチャとは
3層アーキテクチャとは，アプリケーションの構造を以下の層に分離することを指す．

![スクリーンショット 2024-04-26 14.27.40.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/9cc5c2f1-2354-e8d3-7d8a-2ed28836844f.png)



## クライアントサイド
ユーザーインターフェース(UI)を提供するサイド．ユーザーの入力を受け取り、プレゼンテーション層(WEBサーバ)にHTTPリクエストを送信する．また，プレゼンテーション層(WEBサーバ)からのHTTPレスポンスを受け取り，結果を表示する．

## サーバーサイド
### プレゼンテーション層
クライアントからのHTTPリクエストを受け取る．HTTPリクエストを処理し，アプリケーション層に処理を委譲する．アプリケーション層からの結果を受け取り，クライアントにHTTPレスポンスを返す．

### アプリケーション層
ビジネスロジックを実装する．プレゼンテーション層からのリクエスト処理を受け取り，必要に応じてデータベース層を使ってデータアクセスを行う．そして，処理結果をプレゼンテーション層に返す．

### データベース層
データの永続化を担当する．アプリケーション層からの要求に応じてデータベースなどのデータソースにアクセスする．データのCRUD(取得，挿入，更新，削除)操作を行う．

# Djangoでの3層アーキテクチャ
Djangoの初期のディレクトリとして以下の階層となっていることを前提とする．

```
yourprojectname
├── docker-compose.yml
├── Dockerfile
├── manage.py
├── requirements.txt
├── yourprojectname
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└──yourappname
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── migrations/
    │   └──  __init__.py
    ├── models.py
    ├── tests.py
    └── views.py

```
簡単に図で説明すると以下の図になる．
>稚拙でごめんなさい

![スクリーンショット 2024-04-26 14.25.31.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/3370c55b-2258-b461-af19-e4fe9c28e90a.png)


>前提として以下のファイルの役割を記載する
>`yourprojectname/settings.py`は，Djangoプロジェクトの設定ファイル．データベース接続情報，ミドルウェア，インストールされたアプリケーションなどを設定する．
`yourprojectname/asgi.py`と`yourprojectname/wsgi.py`は，それぞれASGIとWSGIのエントリーポイントを提供する．
`manage.py`は，Djangoプロジェクトの管理タスクを実行するためのコマンドラインユーティリティ．
`requirements.txt`は，プロジェクトの依存ライブラリを記述するファイル．

このDjangoプロジェクトの構造における3層アーキテクチャについて，クライアントサイドとサーバーサイド（プレゼンテーション層，アプリケーション層，データベース層）に分けて詳しく説明する．

### クライアントサイド

HTMLテンプレート，CSS，JavaScriptなどを使用して，ユーザーインターフェースを構築する．
Djangoのテンプレートシステムを使用して，動的なHTMLを生成する．

### サーバーサイド

**プレゼンテーション層**

`yourprojectname/urls.py`は，URLディスパッチャーであり，URLパターンとビューをマッピングする．


**アプリケーション層**

アプリケーション層は、ビジネスロジックを実装し、プレゼンテーション層とデータベース層の間の調整を行います。
`yourappname/views.py`のビュー関数内で、ビジネスロジックを実装する．
ビュー関数は，必要に応じて`yourappname/models.py`で定義されたモデルを使用してデータベースとのやり取りを行う．


**データベース層**

データベース層は，データの永続化と管理を担当する．
`yourappname/models.py`は，データベースのテーブル構造を定義するモデルクラスを含む．
モデルクラスは，フィールド（カラム）の定義や，リレーションシップの設定などを行います。
Djangoの ORM（Object-Relational Mapping）を使用して，Pythonのコードでデータベースとのやり取りを行う．
`yourappname/migrations/`ディレクトリは，データベースのマイグレーションファイルを格納する．

>Djangoプロジェクトの作成方法は以下の記事から
>https://qiita.com/tarakokko3233/items/46c567fb32a26a69269a
>Djangoプロジェクトの階層構造の説明は以下の記事から
>https://qiita.com/tarakokko3233/items/8787692aaf9b1d943205


# SpringFrameworkでの3層アーキテクチャ
SpringFrameworkの初期のディレクトリとして以下の階層となっていることを前提とする．
```
yourprojectname
├── docker-compose.yml
├── Dockerfile
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── yourcompanyname
│   │   │           └── yourprojectname
│   │   │               ├── config/
│   │   │               │   └── AppConfig.java
│   │   │               ├── controller/
│   │   │               │   └── YourController.java
│   │   │               ├── dto/
│   │   │               │   └── YourDTO.java
│   │   │               ├── model/
│   │   │               │   └── YourModel.java
│   │   │               ├── repository/
│   │   │               │   └── YourRepository.java
│   │   │               ├── service/
│   │   │               │   ├── YourService.java
│   │   │               │   └── impl/
│   │   │               │       └── YourServiceImpl.java
│   │   │               └── Application.java
│   │   └── resources
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test
│       └── java
│           └── com
│               └── yourcompanyname
│                   └── yourprojectname
│                       └── YourTests.java
```
簡単に図で説明すると以下の図になる．

![スクリーンショット 2024-04-26 14.23.28.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/ab223d61-b8c6-5e3f-43a1-859b57e7076f.png)


>前提として以下のファイルの役割を記載する
>`config/` ディレクトリ内の `AppConfig.java` は，アプリケーションの設定クラスを表す．
`Application.java` は，Springアプリケーションのエントリーポイント．
`src/main/resources/application.properties` は，アプリケーションの設定ファイル．
`src/test/java` ディレクトリ内の `YourTests.java` は，アプリケーションのテストクラスを表す．

Spring プロジェクトの構造における3層アーキテクチャについて，クライアントサイドとサーバサイド（プレゼンテーション層，アプリケーション層，データベース層）に分けて詳しく説明する．

### クライアントサイド

HTMLテンプレート，CSS，JavaScriptなどを使用して，ユーザーインターフェースを構築する．
クライアントサイドでは，サーバーサイドとAjaxなどを使用してデータのやり取りを行う．
`src/main/resources/static/` ディレクトリには，クライアントサイドの静的ファイル（CSS，JavaScript，画像など）が配置される．
`src/main/resources/templates/` ディレクトリには、HTMLテンプレートファイルが配置される．

### サーバーサイド

**プレゼンテーション層**

`controller/` ディレクトリ内の `YourController.java` は、プレゼンテーション層のコントローラーを表す．コントローラーは，クライアントからのリクエストを受け取り，必要なデータをアプリケーション層から取得し，ビューにデータを渡してレスポンスを生成する．
`dto/` ディレクトリ内の `YourDTO.java` は，プレゼンテーション層とアプリケーション層の間でデータを転送するためのオブジェクト．


**アプリケーション層**

`service/` ディレクトリ内の `YourService.java` は，アプリケーション層のサービスインターフェースを定義する．
`service/impl/` ディレクトリ内の `YourServiceImpl.java` は，サービスの実装クラス．サービスは、ビジネスロジックを実装し，データベース層とのやり取りを行う．
`model/` ディレクトリ内の `YourModel.java` は，アプリケーション層のドメインモデルを表す．


**データベース層**

`repository/` ディレクトリ内の `YourRepository.java` は，データベースとのやり取りを行うためのリポジトリインターフェースを定義する．
リポジトリは，データベースからデータを取得したり，データを保存したりするためのメソッドを提供する．
Springの JpaRepository などを継承することで，基本的なCRUD操作を簡単に実装できる．

>実際のSpringBootを用いたAPI制作方法は以下の記事から参照すること
>[鋭意製作中．．．]
