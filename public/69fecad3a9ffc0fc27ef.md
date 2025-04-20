---
title: モジュールをいかに分割して保守性と再利用性を高めるのか？
tags:
  - 設計
  - モジュール
  - ソフトウェア設計
  - ソフトウェア工学
private: false
updated_at: '2025-04-20T19:08:21+09:00'
id: 69fecad3a9ffc0fc27ef
organization_url_name: rits-rcc
slide: false
ignorePublish: false
scheduled_at: null
---
効率のよいソフトウェア開発手法って知っていますか？色々なアーキテクチャがあると思うが，一般的に，関数，メソッド，コンポーネント，モジュールをいかに分割して保守性と再利用性を高めることを目的としている．みなさんはモジュール分割をするための判断基準はご存知ですか？

# 保守性
保守性（Maintainability）とは，ソフトウェアを修正，更新，改善する際の容易さをさす．保守性が高いソフトウェアは，バグ修正，新機能の追加，既存機能の改善が効率的に行える．これにより，長期間にわたってソフトウェアを運用し続けることが可能となり，総コストの削減にもつながる．

# 再利用性
再利用性（Reusability）とは，ソフトウェアの一部（モジュール，コンポーネント，コードなど）を他のプロジェクトや異なるコンテキストで再度利用する能力を指す．再利用性が高いソフトウェアは，開発のスピードと効率を向上させ，新たなプロジェクトにおいて既存のコードを再利用することで品質も向上する．

# モジュール分割手法
モジュール分割をする手法として，モジュール結合度とモジュール強度がある．そここではそれぞれの評価基準とその度合い，さらにコード例と現実世界で例えるならどんなイメージかを例えてみた．

> あくまでイメージなので個人の捉え方によると思います．ぜひコメントに意見待っています．

## モジュール結合度:

モジュール結合度とは，異なるモジュール（プログラムの部品）がどれだけ依存し合っているかを示す指標である．**結合度が低い**ほど良いとされる．

### 1. データ結合 (最も望ましい):
必要最小限(単一)のデータを引数としてやり取りする．
```js
function add(a, b) {
 return a + b;
}
```
**現実世界の例:**
レストランで「ステーキを1つ」と注文する．

### 2. スタンプ結合:
データ構造を引数として受け取るが，その一部のみを使用する．
```js
function getArea(rectangle) {
 return rectangle.width * rectangle.height;
}
```
**現実世界の例:**
郵便物の宛名から必要な情報だけを読み取る．

### 3. 制御結合:
あるモジュールから他のモジュールの動作を制御する情報を引数としてやり取りする
```js
function process(data, type) {
 if (type === 'sum') return sum(data);
 if (type === 'average') return average(data);
}
```
**現実世界の例:**
リモコンでテレビを操作する．

### 4. 外部結合:
外部で定義されたデータ形式や通信プロトコルをグローバル変数として共有する．
```js
const db = require('database');
db.connect('mongodb://localhost:27017/myapp');
```

**現実世界の例:**
様々な電気製品が同じコンセントを使用する．

### 5. 共通結合:
グローバル変数を介してデータを共有する。

```js
let sharedData = { count: 0 };

function incrementCount() {
  sharedData.count++;
}

function displayCount() {
  console.log(sharedData.count);
}
```
**現実世界の例:**
家族全員で1つの冷蔵庫を共有する．

### 6. 内容結合 (最も望ましくない):
あるモジュールが他のモジュールの内部データに直接アクセスする．
```js
class Counter {
 constructor() { this.count = 0; }
}
function hackCounter(counter) {
 counter.count++; // 直接内部データを変更
}
```
**現実世界の例:** 
他人の引き出しを勝手に開けて中身を確認する．

## モジュール強度

モジュール強度とは，1つのモジュール内の要素がどれだけ密接に関連しているかを示す指標である．強度が高いほど良いとされる．

### 1. 機能的強度 (最も望ましい):
単一の明確な機能を持つ．
```js
function square(x) {
 return x * x;
}
```
**現実世界の例:**
電卓の「2乗」ボタン．

### 2. 情報的強度:
特定のデータ構造に対する操作をまとめる．
```js
class Stack {
 push(item) { /* ... */ }
 pop() { /* ... */ }
 peek() { /* ... */ }
}
```
**現実世界の例:**
図書館の本の貸出・返却カウンター．

### 3. 連絡的強度:
同じデータに対する操作をグループ化する．
```js
class UserManager {
 createUser(data) { /* ... */ }
 updateUser(id, data) { /* ... */ }
 deleteUser(id) { /* ... */ }
}
```
**現実世界の例:** 
銀行の窓口でさまざまな取引を行う．

### 4. 手順的強度:
特定の手順や流れに沿った操作をまとめる．
```js
function makeCoffe() {
 boilWater();
 grindBeans();
 brewCoffee();
 pourInCup();
}
```
**現実世界の例:**
レシピに従って料理を作る．

### 5. 時間的強度:
時間的に連続した可能性が高い複数の機能をまとめる

```js
class UserProfile {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
  }

  updateProfile(newData) {
    this.name = newData.name || this.name;
    this.email = newData.email || this.email;
    this.avatar = newData.avatar || this.avatar;
  }
}
```
**現実世界の例:**
自動車の定期点検

### 6. 論理的強度:
論理的に関連する操作をグループ化するが，機能的には独立している．
```js
function mathOperations(op, a, b) {
 if (op === 'add') return a + b;
 if (op === 'subtract') return a - b;
 // ...
}
```
**現実世界の例:**
多機能ペン（黒・赤・青のインクが切り替えられる）．

### 7. 暗合的強度 (最も望ましくない):
関連性のない機能を1つのモジュールにまとめる．
```js
function doStuff() {
 calculateTax();
 sendEmail();
 updateDatabase();
}
```
**現実世界の例:** 
1つの店舗で食品，衣類，電化製品を全て扱う．

これらの概念を理解し適用することで，より保守性が高く，再利用可能なソフトウェアを設計することができる．モジュール間の結合度を低く保ち，各モジュールの強度を高めることが，良質なソフトウェア設計の鍵となる．
