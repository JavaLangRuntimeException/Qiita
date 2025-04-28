---
title: S(すごい)Q(クオリティ)のL(ランゲージ)チートシート
tags:
  - SQL
  - Database
  - DBMS
private: false
updated_at: '2025-04-28T11:13:06+09:00'
id: f038fbaccdd92fb0308a
organization_url_name: rits-rcc
slide: false
ignorePublish: false
---
SQLって知っていますか？バックエンド開発やデータ分析によくきく言語ですよね？いわゆる**縁の下の力持ち**的な存在です！SQLはエンジニアに限らず全てのデータ分析をする仕事をする人ならば必要な言語かなと思います．本記事ではSQLを学ぶことの利点とその基本的な関数の使用例や演算関数の使用例について記載する．

:::note info
**SQL（Structured Query Language）**
データベース管理や操作のために使用される標準的な言語
:::
![Sql_data_base_with_logo.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/9cdbdf3c-5add-6f59-220e-6a45c1000086.png)



>データベース製品には多くの種類があるが，SQLはISO（国際標準化機構）で標準化されているため，SQLを覚えれば多くのデータベースで扱える．たとえば、商用データベースであるOracle DatabaseやSQL Server，オープンソースデータベースのMySQLやPostgreSQLなども，SQLが使用可能である．
# 他のチートシート
git/gh コマンド

https://qiita.com/JavaLangRuntimeException/items/6b46551f56e0def76eba

lazygit

https://qiita.com/JavaLangRuntimeException/items/42087d09728d5739d73d

ステータスコード

https://qiita.com/JavaLangRuntimeException/items/ab1bc7b976ed2dfad91c

Go・Gorm

https://qiita.com/JavaLangRuntimeException/items/d388717fc1436bc3ec9d

C#/.NET/Unity

https://qiita.com/JavaLangRuntimeException/items/7849b32bc223d4aa0247

Ruby・Ruby on Rails

https://qiita.com/JavaLangRuntimeException/items/42d935cf92c212f1c7ec

Docker コマンド

https://qiita.com/JavaLangRuntimeException/items/21f7c7bf3d143f821697

TypeScript

https://qiita.com/JavaLangRuntimeException/items/5894391c08e0d8e28389

Vim 

https://qiita.com/JavaLangRuntimeException/items/0c68ab96ea198e0a7294

プルリクエスト・マークダウン記法チートシート

https://qiita.com/JavaLangRuntimeException/items/329eb92a47a07ff4dde8

ファイル操作コマンドチートシート

https://qiita.com/JavaLangRuntimeException/items/16f244606a73f7d106e4

VSCode Github Copilot拡張機能

https://qiita.com/JavaLangRuntimeException/items/be13dc3a346cf6e5ee44

OpenAI Assistants API

https://qiita.com/JavaLangRuntimeException/items/1a1abc01e8d7d05dce93

Github API

https://qiita.com/JavaLangRuntimeException/items/4f3551c31679233219ac


# 他のシリーズ記事
**TypeScriptで学ぶプログラミングの世界**
プログラミング言語を根本的に理解するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/cadf49bb419076819963

**情報処理技術者試験合格への道[IP・SG・FE・AP]**
情報処理技術者試験に出題されるコンピュータサイエンス用語の紹介や単語集

https://qiita.com/JavaLangRuntimeException/items/991be402099542ccb936

**IAM AWS User クラウドサービスをフル活用しよう！**
AWSのサービスを例にしてバックエンドとインフラ開発の手法を説明するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/371a334f5a6e07035db5

**AWS UserのGCP浮気日記**
GCPの様子をAWSと比較して考えてみるシリーズ

https://qiita.com/JavaLangRuntimeException/items/527d99e774165a763180

**Project Gopher: Unlocking Go’s Secrets**
Go言語や標準ライブラリの深掘り調査レポートです．

https://qiita.com/JavaLangRuntimeException/items/dc45b412d3fbd2ccb9e8

**Gopher’s Journey: Exploring TCP Protocol**
Goを用いてTCPプロトコルを探求 & 作成するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/38091220106d86651d2b



# SQLを学ぶ理由
1. **データ管理の基礎知識が身に付く**
   SQLは，データベース管理システム（DBMS）を操作するための基本的なスキルである．これにより，データの挿入，更新，削除，クエリなどの基本的な操作が可能になる．

2. **データ分析に役立つ**
   SQLは，データの抽出や集計に非常に強力である．データ分析やビジネスインテリジェンス（BI）ツールと組み合わせることで，データに基づいた意思決定が容易になる．

3. **多くの業界で求められるスキル**
   SQLは，ほぼすべての業界で使用されているデータベースに関連する仕事において重要なスキルである．例えば，金融，医療，IT，マーケティングなどの分野で役立つ．

4. **データベース設計の理解**
   SQLを学ぶことで，効率的なデータベース設計や正規化の概念を理解することができる．これにより，データの冗長性を減らし，データの一貫性を保つことが可能になる．

5. **プログラミングスキルの向上**
   多くのプログラミング言語と組み合わせて使用することができるため，SQLの知識は，アプリケーション開発においても有用である．SQLと他の言語を組み合わせることで，データ駆動型のアプリケーションを作成することができる．

6. **大規模データの処理**
   SQLは，大量のデータを効率的に処理するための強力なツールである．ビッグデータの時代において，SQLのスキルは，データサイエンスやデータエンジニアリングの分野で特に重要である．

つまり，SQLを学ぶことは，データベースやデータ管理に関連する多くの仕事やプロジェクトにおいて不可欠なスキルを身につけるために非常に重要であるだろう．

# SQLの種類
SQLは多くの命令を用いてデータベースを扱う．命令は大きく3つに分類される．
- **DDL(Data Definition Language)**：データ定義言語
- **DML(Data Manipulation Language)**：データ操作言語
- **DCL(Data Control Language)**：データ制御言語

## DDL(Data Definition Language)
DDL（Data Definition Language）はデータ定義言語と呼ばれ，テーブルや索引，シーケンスなどのデータベースオブジェクトを定義する言語．データベースやテーブルを新規に作成（CREATE）する場合や，変更（ALTER），削除（DROP）する際に使用する．また，テーブルに格納されているデータを一括ですべて削除するTRUNCATEも、DDLに含まれる．


## DML(Data Manipulation Language)
DML（Data Manipulation Language）はデータ操作言語と呼ばれ，データベースを操作し，格納されているデータの検索や削除などを行うための言語である．データベースを使用する中で最も使用する言語と言える．命令文は，データの検索（SELECT），更新（UPDATE），挿入（INSERT），削除（DELETE）がある．

## DCL(Data Control Language)
DCL（Data Control Language）はデータ制御言語と呼ばれ，データやトランザクションを制御するための言語．ユーザーに対してアクセス権限を付与（GRANT）する命令や，権限の取消（REVOKE）が含まれる．
データベース製品によっては，COMMITやROLLBACKなどトランザクションを制御する言語（TCL）も，DCLに含める場合がある．

# DBMS（Database Management System）

DBMS（Database Management System）は，データベースを管理するためのソフトウェアシステムである．DBMSは，データの保存，検索，更新，削除を効率的に行うためのツールや機能を提供する．

![スクリーンショット 2024-07-03 17.07.37.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/1020a1d5-6f85-7471-a691-9262e9fd9a08.png)



## DBMSでできること

### 1. データの定義
   DBMSは，データベースの構造やスキーマを定義するためのツールを提供する．これには，テーブルの作成，データ型の指定，制約の設定などが含まれる．
 ```sql
 CREATE TABLE Employees (
     EmployeeID INT PRIMARY KEY,
     FirstName VARCHAR(50),
     LastName VARCHAR(50),
     HireDate DATE
 );
 ```

### 2. データの操作
   DBMSは，データの挿入，更新，削除，検索などの操作をサポートする．これにより，ユーザーはデータベースに格納されたデータを効果的に利用できる．

 ```sql
 INSERT INTO Employees (EmployeeID, FirstName, LastName, HireDate)
 VALUES (1, 'John', 'Doe', '2020-01-15');
 ```

### 3. データの制御
   DBMSは，データの整合性を保つための機能や，複数のユーザーが同時にデータを操作できるようにするための機能を提供する．これには，トランザクション管理，並行制御，データ回復などが含まれる．

 ```sql
 BEGIN TRANSACTION;
 UPDATE Employees SET LastName = 'Smith' WHERE EmployeeID = 1;
 COMMIT;
 ```

### 4. データのセキュリティ
   DBMSは，データへのアクセスを制御し，データのセキュリティを確保するための機能を提供する．これには，ユーザー認証，アクセス権限の設定，暗号化などが含まれる．

 ```sql
 GRANT SELECT, INSERT ON Employees TO user_name;
 ```

## DBMSを使う利点

### 1. **データの一貫性**
   DBMSは，データの一貫性を維持するための制約やトランザクション管理機能を提供する．これにより，データの正確性が確保される．

### 2. **効率的なデータアクセス**
   DBMSは，データの検索や操作を効率的に行うための最適化機能を提供する．これにより，パフォーマンスが向上する．

### 3. **データの共有**
   複数のユーザーが同時にデータベースにアクセスし，共有することができる．DBMSは，並行制御機能を提供し，データの整合性を維持する．

### 4. **データのバックアップと回復**
   DBMSは，データのバックアップと回復のためのツールを提供する．これにより，データの損失や破損からの回復が容易になる．

これらの機能と利点により，DBMSは，現代の情報システムにおいて不可欠なコンポーネントである．DBMSの理解は，データベース管理やデータ操作の効率化に不可欠なスキルである．

# データベース，テーブル表示
データベースの一覧表示やテーブルの一覧表示はMySQLやPostgreSQLで違うので注意．
## 1.データベース一覧表示
### MySqlバージョン
**基本的なデータベース一覧表示**
```sql
SHOW DATABASES;
```
ストレージ内に存在する全てのデータベースを取得する．

**絞ってデータベース一覧表示**
```sql
SHOW DATABASES LIKE 'w%';
```
名前が`w`で始まるデータベースだけを表示する．

### PostgreSQLバージョン
**基本的なデータベース一覧表示**
```sql
SELECT * FROM pg_database;
```
ストレージ内に存在する全てのデータベースを取得する．

**絞ってデータベース一覧表示**
```sql
SELECT * FROM pg_databaseWHERE datname LIKE 'w%';
```
名前が`w`で始まるデータベースだけを表示する．

## 2.データベースに入る
### MySqlバージョン
```sql
USE データベース;
```
### PostgreSQLバージョン
データベース名の指定に""(ダブルクォーテーション)は不要．
```sql
\c データベース;
```

## 3.テーブル一覧表示
**2.データベースに入る**を実行してから以下のクエリをすること．
**MySqlバージョン**
基本的なテーブル一覧表示
```sql
SHOW TABLES;
```
ストレージ内に存在する全てのテーブルを取得する．

絞ってテーブル一覧表示
```sql
SHOW TABLES LIKE 'w%';
```
名前が`w`で始まるテーブルだけを表示する．

**PostgreSQLバージョン**
**基本的なテーブル一覧表示**
```sql
SELECT * FROM pg_tables;
```
ストレージ内に存在する全てのテーブルを取得する．

絞ってテーブル一覧表示
```sql
SELECT * FROM pg_tables WHERE tablename LIKE 'w%';
```
名前が`w`で始まるテーブルだけを表示する．

## テーブルの詳細を表示
**MySQLバージョン**
```sql
DESCRIBE <テーブル名>;
```
または
```sql
SHOW COLUMNS FROM <テーブル名>;
```

**PostgreSQLバージョン**
```sql
SELECT column_name, data_type, character_maximum_length
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_name = '<テーブル名>';
```

## 現状のテーブルを作成するためのSQLを取得(MySQL向け)
指定したテーブルのカラム，型，主キー制約，一意性制約，参照制約などを作成するためのCREATE TABLE文を表示する．
**MySQLバージョン**
```sql
SHOW CREATE TABLE <テーブル名>;
```


# SQL文法の基本的な使い方(DDLとDML)
DBMSで色々データ操作，管理をするために様々な文法を知る必要がある．

:::note info
基本的にFROM句のあとはテーブル名である．それ以外はカラム名である．
:::

:::note warn
MySQLはテーブル名に""(ダブルクォーテーション)はいらないがPostgreSQLは必要．
本記事では""は書いていないので注意
:::

## 1. データ抽出(SELECT文)
SELECT文は，データベースからデータを取得するための基本的なSQL文．様々な句と組み合わせることで，必要なデータを柔軟に抽出できる

### 基本的な選択
```sql
SELECT * FROM 社員;
```
この例では，社員テーブルのすべての列と行を取得する．

### 条件付き選択
```sql
SELECT 名前, 給与 FROM 社員 WHERE 部署 = '営業部' AND 給与 > 300000;
```

WHERE句を使用して、特定の条件に合致するデータのみを取得する．

### 並べ替え(ORDER BY)
```sql
SELECT 名前, 入社日 FROM 社員 ORDER BY 入社日 DESC;
```
ORDER BY句を使用して、結果を特定の列に基づいて並べ替える．
最後に指定するソート順について，`ASK`なら昇順，`DESC`なら降順にソートする．

### 重複排除(DISTINCT)
```sql
SELECT DISTINCT 部署 FROM 社員;
```
重複する値を排除する．

### 結果制限(LIMIT)
```sql
SELECT 名前, 給与 FROM 社員 ORDER BY 給与 DESC LIMIT 5;
```

LIMIT句を使用して、返される結果の行数を制限する.

## 2. データ挿入(INSERT文)
INSERT文は、テーブルに新しいデータを挿入するために使用する

### 単一行挿入
```sql
INSERT INTO 製品 (製品名, 価格, 在庫数) VALUES ('ノートPC', 80000, 100);
```
1つの行を挿入する基本的な使用方法である

### 複数行挿入
```sql
INSERT INTO 製品 (製品名, 価格, 在庫数) 
VALUES ('スマートフォン', 50000, 200),
       ('タブレット', 40000, 150);
```
複数の行を一度に挿入する方法.

### SELECT結果の挿入
```sql
INSERT INTO 高額製品 (製品ID, 製品名)
SELECT 製品ID, 製品名 FROM 製品 WHERE 価格 > 100000;
```

SELECT文の結果を別のテーブルに挿入する方法

## 3. データ更新(UPDATE文)
UPDATE文は、既存のデータを更新するために使用する．

### 単一列更新
```sql
UPDATE 社員 SET 給与 = 給与 * 1.1 WHERE 部署 = '営業部';
```

特定の条件に合致する行の1つの列を更新する．

### 複数列更新
```sql
UPDATE 製品 
SET 価格 = 価格 * 0.9, 在庫数 = 在庫数 + 50 
WHERE カテゴリ = '電子機器';
```
複数の列を同時に更新する方法

### サブクエリを使用した更新
サブクエリに関しては後述．
```sql
UPDATE 社員
SET 給与 = (SELECT AVG(給与) FROM 社員) * 1.1
WHERE 業績評価 = 'A';
```
サブクエリを使用し，動的に計算された値で更新を行う．

## 4. データ削除(DELETE文)
DELETE文は，テーブルから行を削除するために使用する．

### 条件付き削除
```sql
DELETE FROM 注文 WHERE 注文日 < '2023-01-01';
```
特定の条件に合致する行を削除

### 関連テーブルからの削除
```sql
DELETE FROM 社員 
WHERE 部署ID IN (SELECT 部署ID FROM 部署 WHERE 部署名 = '廃止部門');
```
サブクエリを使用して，関連するテーブルの情報に基づいて削除を行う．

### 全データ削除
```sql
DELETE FROM 一時テーブル;
```
テーブルのすべての行を削除する．
## 5. テーブル作成(CREATE TABLE文)
CREATE TABLE文は，新しいテーブルを作成するために使用する．

### 主キーと外部キーを持つテーブル作成
```sql
CREATE TABLE 注文 (
    注文ID INT PRIMARY KEY,
    顧客ID INT,
    注文日 DATE,
    総額 DECIMAL(10, 2),
    FOREIGN KEY (顧客ID) REFERENCES 顧客(顧客ID)
);
```
主キーと外部キーを定義してテーブルを作成する．

### CHECK制約付きテーブル作成
```sql
CREATE TABLE 従業員 (
    従業員ID INT PRIMARY KEY,
    名前 VARCHAR(50),
    年齢 INT CHECK (年齢 >= 18),
    給与 DECIMAL(10, 2) CHECK (給与 > 0)
);
```
CHECK制約を使用して、入力データの妥当性をチェックする．

## 6. テーブル構造変更(ALTER TABLE文)
ALTER TABLE文は、既存のテーブル構造を変更するために使用する．

### 列の追加
```sql
ALTER TABLE 顧客 ADD COLUMN 電話番号 VARCHAR(20);
```
既存のテーブルに新しい列を追加する．

### 列の変更
```sql
ALTER TABLE 製品 MODIFY COLUMN 製品名 VARCHAR(100);
```
既存の列のデータ型や制約を変更する．

### 制約の追加
```sql
ALTER TABLE 注文 ADD CONSTRAINT fk_顧客
FOREIGN KEY (顧客ID) REFERENCES 顧客(顧客ID);
```

既存のテーブルに新しい制約（この場合は外部キー）を追加する．

## 7. テーブル結合(JOIN)
### 内部結合
```sql
SELECT 社員.名前, 部署.部署名
FROM 社員
INNER JOIN 部署 ON 社員.部署ID = 部署.部署ID;
```
INNER JOINは，両方のテーブルで一致する行のみを取得するために使用する．

### 左外部結合
```sql
SELECT 顧客.名前, 注文.注文日
FROM 顧客
LEFT OUTER JOIN 注文 ON 顧客.顧客ID = 注文.顧客ID;
```
LEFT OUTER JOINは，左側のテーブルのすべての行と，右側のテーブルで一致する行を取得する．

### 完全外部結合
```sql
SELECT 商品.商品名, 在庫.数量
FROM 商品
FULL OUTER JOIN 在庫 ON 商品.商品ID = 在庫.商品ID;
```
FULL OUTER JOINは，両方のテーブルのすべての行を取得し，一致する行を結合する．一方のテーブルに一致する行がない場合、NULLが返される．

## 8. グループ化(GROUP BY) と集約関数
GROUP BY句は，指定した列でデータをグループ化し，各グループに対して集約関数を適用する．

### 基本的なグループ化
```sql
SELECT 部署, COUNT(*) AS 社員数
FROM 社員
GROUP BY 部署;
```

部署ごとの社員数を集計する

### 複数列でのグループ化
```sql
SELECT 部署, 役職, AVG(給与) AS 平均給与
FROM 社員
GROUP BY 部署, 役職;
```
部署と役職の組み合わせごとに平均給与を計算する

### HAVINGを使用した絞り込み
```sql
SELECT 製品カテゴリ, SUM(売上) AS 総売上
FROM 売上
GROUP BY 製品カテゴリ
HAVING SUM(売上) > 1000000;
```
グループ化した後の結果に対して条件を適用する．
## 9. サブクエリ
サブクエリは，別のSQLクエリ内に埋め込まれたクエリ．

### WHERE句でのサブクエリ
```sql
SELECT 名前
FROM 社員
WHERE 給与 > (SELECT AVG(給与) FROM 社員);
```
平均給与より高い給与をもらっている社員を検索する．

### FROM句でのサブクエリ
```sql
SELECT 部署, 平均給与
FROM (
    SELECT 部署, AVG(給与) AS 平均給与
    FROM 社員
    GROUP BY 部署
) AS 部署別平均
WHERE 平均給与 > 300000;
```
サブクエリの結果を一時的なテーブルとして扱う．

### 相関サブクエリ
```sql
SELECT 製品名, 価格
FROM 製品 p1
WHERE 価格 > (
    SELECT AVG(価格)
    FROM 製品 p2
    WHERE p2.カテゴリ = p1.カテゴリ
);
```
メインクエリの各行に対してサブクエリが実行される．
## 10. インデックス作成(CREATE INDEX)
CREATE INDEX文は，テーブルにインデックスを作成し，検索パフォーマンスを向上させる．
### 単一列インデックス
```sql
CREATE INDEX idx_製品名 ON 製品(製品名);
```
1つの列にインデックスを作成する．

### 複合インデックス
```sql
CREATE INDEX idx_注文_顧客 ON 注文(顧客ID, 注文日);
```
複数の列の組み合わせにインデックスを作成する．

### ユニークインデックス
```sql
CREATE UNIQUE INDEX idx_社員番号 ON 社員(社員番号);
```
一意性を保証するインデックスを作成する．



# SQL関数の数値演算用の関数

## 1. 数値関数

### 絶対値(ABS())
絶対値を返す関数。
```sql
SELECT ABS(-10) AS 絶対値;  -- 結果: 10
```
### 四捨五入(ROUND())
指定された小数点以下の桁数で四捨五入する関数。
```sql
SELECT ROUND(3.14159, 2) AS 円周率;  -- 結果: 3.14
```
### 指定値以上の最小整数(CEIL())
指定された数以上の最小の整数を返す関数。
```sql
SELECT CEIL(15.1) AS 切り上げ;  -- 結果: 16
```

### 指定値以下の最大整数(FLOOR())
指定された数以下の最大の整数を返す関数。
```sql
SELECT FLOOR(15.9) AS 切り捨て;  -- 結果: 15
```
### べき乗(POWER())
指定された数のべき乗を計算する関数。
```sql
SELECT POWER(2, 3) AS べき乗;  -- 結果: 8
```
### 平方根(SQRT())
平方根を計算する関数。
```sql
SELECT SQRT(16) AS 平方根;  -- 結果: 4
```
## 2. 文字列関数
### 文字列連結(CONCAT())
複数の文字列を連結する関数。
```sql
SELECT CONCAT('Hello', ' ', 'World') AS 挨拶;  -- 結果: Hello World
```
### 文字列長さ(LENGTH())
文字列の長さ（文字数）を返す関数。
```sql
SELECT LENGTH('テスト') AS 文字数;  -- 結果: 3
```
### 大文字変換(UPPER())
文字列を大文字に変換する関数。
```sql
SELECT UPPER('hello') AS 大文字;  -- 結果: HELLO
```

### 小文字変換(LOWER())
文字列を小文字に変換する関数。
```sql
SELECT LOWER('HELLO') AS 小文字;  -- 結果: hello
```
### 文字列の一部を抽出(SUBSTRING())
文字列の一部を抽出する関数。
```sql
SELECT SUBSTRING('Hello World', 7, 5) AS 部分文字列;  -- 結果: World
```
### 文字列置換(REPLACE())
文字列内の特定の部分を別の文字列に置き換える関数。
```sql
SELECT REPLACE('Hello World', 'World', '世界') AS 置換;  -- 結果: Hello 世界
```
## 3. 日付時刻関数
### 現在日付(CURRENT_DATE())
現在の日付を返す関数。
```sql
SELECT CURRENT_DATE() AS 今日の日付;  -- 結果: 2023-07-03（実行日による）
```
### 現在時刻(CURRENT_TIME())
現在の時刻を返す関数。
```sql
SELECT CURRENT_TIME() AS 現在時刻;  -- 結果: 14:30:00（実行時刻による）
```

### 年抽出(YEAR())
日付から年を抽出する関数。
```sql
SELECT YEAR('2023-05-15') AS 年;  -- 結果: 2023
```
### 月抽出(MONTH())
日付から月を抽出する関数。
```sql
SELECT MONTH('2023-05-15') AS 月;  -- 結果: 5
```
### 日抽出(DAY())
日付から日を抽出する関数。
```sql
SELECT DAY('2023-05-15') AS 日;  -- 結果: 15
```
### 日付間日数抽出(DATEDIFF())
二つの日付の間の日数を計算する関数。
```sql
SELECT DATEDIFF('2023-05-15', '2023-01-01') AS 日数差;  -- 結果: 134
```
### 日付に指定した期間を加算(DATE_ADD())
日付に指定した期間を加算する関数。
```sql
SELECT DATE_ADD('2023-05-15', INTERVAL 1 MONTH) AS 一ヶ月後;  -- 結果: 2023-06-15
```

## 4. 集約関数
### 行数カウント(COUNT())
行数をカウントする関数。
```sql
SELECT COUNT(*) AS 総数 FROM テーブル名;
```
### 数値合計値(SUM())
数値の合計を計算する関数。
```sql
SELECT SUM(カラム名) AS 合計 FROM テーブル名
```
### 数値平均値(AVG())
数値の平均を計算する関数。
```sql
SELECT AVG(カラム名) AS 平均 FROM テーブル名;
```

### 数値最大数(MAX())
最大値を返す関数。
```sql
SELECT MAX(カラム名) AS 最大値 FROM テーブル名;
```
### 数値最小値(MIN())
最小値を返す関数。
```sql
SELECT MIN(カラム名) AS 最小値 FROM テーブル名;
```
## 5. 条件分岐関数
### 制御フロー関数(CASE)
条件に基づいて異なる値を返す制御フロー関数。
```sql
SELECT 
    名前,
    CASE
        WHEN 給与 < 300000 THEN '低給与'
        WHEN 給与 BETWEEN 300000 AND 500000 THEN '中給与'
        ELSE '高給与'
    END AS 給与ランク
FROM 社員;
```
### 最初のnotNULLを返す(COALESCE())
リストの中で最初のNULLでない値を返す関数。
```sql
SELECT COALESCE(電話番号, メールアドレス, '連絡先なし') AS 連絡先 FROM 顧客;
```
## 6. 型変換関数
### データ型変換(CAST())
データ型を別の型に変換する関数
```sql
SELECT CAST('100' AS INTEGER) AS 数値変換;  -- 結果: 100（整数型）
```
### データ型変換(一部のDBMS)(CONVERT())
データ型を別の型に変換する関数（一部のデータベースシステムで使用）。
```sql
SELECT CONVERT('2023-05-15', DATE) AS 日付変換;  -- 結果: 2023-05-15（日付型）
```
## 7. ウィンドウ関数
### 各行に一意の連番を割り当て(ROW_NUMBER())
結果セット内の各行に一意の連番を割り当てる関数
```sql
SELECT 
    名前, 
    給与,
    ROW_NUMBER() OVER (ORDER BY 給与 DESC) AS 給与ランキング
FROM 社員;
```
### ランク割当(RANK())
結果セット内の各行にランクを割り当てる関数（同順位あり）。
```sql
SELECT 
    名前, 
    部署,
    給与,
    RANK() OVER (PARTITION BY 部署 ORDER BY 給与 DESC) AS 部署内給与ランク
FROM 社員;
```

# DCLの使用例

## 1.権限付与(GRANT)
   GRANTコマンドは，ユーザーに特定の権限を付与するために使用される．例えば，特定のテーブルへの読み取りや書き込みの権限を付与することができる．
 ```sql
 GRANT SELECT, INSERT ON Employees TO user_name;
 ```

## 2.権限剥奪(REVOKE)
   REVOKEコマンドは，ユーザーから特定の権限を取り消すために使用される．例えば，特定のテーブルへの読み取りや書き込みの権限を取り消すことができる．
 ```sql
 REVOKE SELECT, INSERT ON Employees FROM user_name;
 ```

データベース製品によっては，トランザクションを制御するコマンド（TCL）がDCLに含まれることがある．主なトランザクション制御コマンドには以下がある．

## 3. 変更確定(COMMIT)
   COMMITコマンドは，トランザクションで行われたすべての変更を確定するために使用される．

 ```sql
 COMMIT;
 ```

## 4. 変更取消(ROLLBACK)
   ROLLBACKコマンドは，トランザクションで行われたすべての変更を取り消すために使用される．

 ```sql
 ROLLBACK;
 ```

これらのDCLおよびTCLコマンドは，データベースのセキュリティとデータの整合性を維持するために重要である．DCLの理解は，データベースのアクセス制御とトランザクション管理に不可欠なスキルである．

このようにSQLは様々な文法があるが基本的なデータ操作から演算，権限管理まで色々行うことができる．
