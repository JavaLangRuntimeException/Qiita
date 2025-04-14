---
title: キャッシュってなんなんだ？JavaのMap・HashMap・ConcurrentHashMapの違いとTTL機能付きキャッシュの実装を実装してみよう
tags:
  - Java
  - キャッシュ
  - Map
  - プログラミング
private: false
updated_at: '2025-04-14T11:21:37+09:00'
id: fcc641fec6858e5216a1
organization_url_name: null
slide: false
ignorePublish: false
created_at: '2025-04-14T11:21:37+09:00'
---
本記事では，JavaにおけるMap，HashMap，ConcurrentHashMapの役割と使い方を解説し， ConcurrentHashMapを利用したTTL（Time-To-Live）機能付きキャッシュの実装例もシンプルなコードで紹介する．

## 1. Mapとその実装の違い
まず初めに，キャッシュの理解の前にJavaのMapインターフェースとその実装であるHashMapとConcurrentHashMapの違いを理解することが重要である．
![image.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/f66c7a35-7e1d-4081-851a-3fde97560698.gif)

### 1.1 Mapとは
Mapはキーと値のペアを管理するインターフェースである．
キーは重複せず，値を取り出すための基本操作（追加，取得，削除など）が定義されている．

### 1.2 HashMapとは
HashMapはMapインターフェースの代表的な実装であり，内部でハッシュテーブルを用いて高速なアクセスを実現するである．
ただし，スレッドセーフではないため，単一スレッドまたは外部で同期制御する場合に利用する．

### 1.3 ConcurrentHashMapとは
ConcurrentHashMapはスレッドセーフなMapの実装であり，複数のスレッドから同時に安全な操作が可能となるである．
内部で分離ロックの仕組みなどを用い，高い並行性とパフォーマンスを確保している．

## 2. 基本的なMapの例

以下は，Mapインターフェースを使ってデータを管理するシンプルな例である．
この例では，`HashMap`を用いて果物の名前とその色を登録し，内容を表示する．
```java
import java.util.Map;
import java.util.HashMap;

public class SimpleMapExample {
    public static void main(String[] args) {
        // HashMapを生成するである
        Map<String, String> fruits = new HashMap<>();
        // キーと値のペアを追加するである
        fruits.put("apple", "赤");
        fruits.put("banana", "黄");
        fruits.put("grape", "紫");
        // Mapの内容を表示するである
        System.out.println("Mapの内容: " + fruits);
    }
}
```
上記のコードを実行すると，以下のような出力が得られる．
例：
Mapの内容: {apple=赤, banana=黄, grape=紫}

## 3. ConcurrentHashMapの使い方の例

次は，ConcurrentHashMapを利用したシンプルな例．
複数のスレッドが安全に操作できる点が重要．
```java
import java.util.concurrent.ConcurrentHashMap;

public class SimpleConcurrentHashMapExample {
    public static void main(String[] args) {
        // ConcurrentHashMapを生成するである
        ConcurrentHashMap<String, Integer> scoreMap = new ConcurrentHashMap<>();
        // キーと値のペアを追加するである
        scoreMap.put("Alice", 90);
        scoreMap.put("Bob", 85);
        scoreMap.put("Charlie", 92);
        // ConcurrentHashMapの内容を表示するである
        System.out.println("ConcurrentHashMapの内容: " + scoreMap);
    }
}
```
上記コードは，同時に複数のスレッドから読み書きされる環境での使用に適しているである．

## 4.キャッシュとは
キャッシュは，データの取得を高速化するために，頻繁にアクセスされるデータを一時的に保存する仕組みである．
キャッシュのメリットは以下の通りである．
- データベースや外部APIへのアクセス回数を減らし，アプリケーションのパフォーマンスを向上させることができる．
- メモリ上にデータを保存するため，アクセス速度が非常に速い．
- データの有効期限を設定することができ，TTL（Time-To-Live）を指定することで，特定の時間が経過した後に自動的にデータを削除することができる．
- キャッシュのデータを圧縮することで，メモリ使用量を削減できる場合がある．
- キャッシュのデータを分散させることで，スケーラビリティを向上させることができる．
- キャッシュのデータを複数のノードに分散させることで，耐障害性や負荷分散を実現できる．

キャッシュのデメリットももちろん存在する
- メモリを消費するため，キャッシュサイズを適切に設定しないと，メモリ不足になる可能性がある．
- キャッシュのデータが古くなる可能性があるため，適切なキャッシュの管理が必要である．
- キャッシュの実装が複雑になる場合がある．
- キャッシュのデータが失われる可能性があるため，重要なデータはキャッシュに保存しない方が良い場合もある．
- キャッシュのデータが正確でない場合，アプリケーションの動作に影響を与える可能性がある．

キャッシュの機能をアニメーションで考えるデモアプリを作成しました以下からアクセスしてみてください．

https://qiita-article-html-svg-demo.s3.ap-northeast-1.amazonaws.com/CacheSystemDemo.html

## 5. TTL機能付きキャッシュの実装例

ここでは，ConcurrentHashMapを利用して，各キャッシュエントリに有効期限（TTL）を設定し，
期限切れのエントリを定期的に削除するTTL機能付きキャッシュを実装するである．

### 5.1 キャッシュエントリクラスの実装

まず，各キャッシュエントリ（キーに対応する値と有効期限）を管理するためのクラス`CacheValue`を実装する．
```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

// 各キャッシュエントリの値と有効期限を保持するクラスで
class CacheValue<V> {
    private V value;
    private long expireAt;

    public CacheValue(V value, long ttlMillis) {
        this.value = value;
        // 現在時刻からTTL（ミリ秒）後の時刻を有効期限として設定する
        this.expireAt = System.currentTimeMillis() + ttlMillis;
    }

    public V getValue() {
        return value;
    }

    // エントリが有効期限切れかどうかを判定する
    public boolean isExpired() {
        return System.currentTimeMillis() > expireAt;
    }
}
```
### 5.2 TTL機能付きキャッシュクラスの実装

次に，ConcurrentHashMapとScheduledExecutorServiceを用いてTTL付きキャッシュを実装する．
一定間隔でキャッシュ内のエントリをチェックし，期限切れのものを削除する仕組みを持つ．
```java
public class TTLCache<K, V> {
    // キャッシュ内部はConcurrentHashMapで管理するである
    private ConcurrentHashMap<K, CacheValue<V>> cache;
    private ScheduledExecutorService cleaner;

    public TTLCache() {
        cache = new ConcurrentHashMap<>();
        cleaner = Executors.newSingleThreadScheduledExecutor();
        // 5秒毎に古くなったエントリを削除するタスクを実行する
        cleaner.scheduleAtFixedRate(() -> {
            for (K key : cache.keySet()) {
                CacheValue<V> cv = cache.get(key);
                if (cv != null && cv.isExpired()) {
                    cache.remove(key);
                    System.out.println("Expired entry removed: " + key);
                }
            }
        }, 5, 5, TimeUnit.SECONDS);
    }

    // キャッシュに値を追加するメソッド
    public void put(K key, V value, long ttlMillis) {
        cache.put(key, new CacheValue<>(value, ttlMillis));
    }

    // キャッシュから値を取得するメソッド
    public V get(K key) {
        CacheValue<V> cv = cache.get(key);
        if (cv == null) {
            return null;
        }
        // TTLが切れている場合は削除してnullを返す
        if (cv.isExpired()) {
            cache.remove(key);
            return null;
        }
        return cv.getValue();
    }

    // デバッグ用に現在のキャッシュ内容を表示するメソッド
    public void printCache() {
        System.out.println("キャッシュの内容:");
        cache.forEach((k, v) -> {
            System.out.println("キー: " + k + " 値: " + v.getValue());
        });
    }

    // キャッシュのクリーンアップ用スレッドを終了するメソッド
    public void shutdown() {
        cleaner.shutdown();
    }
}
```
### 5.3 TTLキャッシュの利用例

![画面収録 2025年4月14日 10時22分.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/396e880e-005b-42d7-baff-87e13dff2612.gif)

> 一時停止やリセットを押しても何も起きませんよ...gifを貼っただけなので

最後に，TTLCacheを利用してキャッシュの動作を確認するシンプルなサンプルコードを示す．
```java
public class TTLCacheDemo {
    public static void main(String[] args) throws InterruptedException {
        TTLCache<String, String> ttlCache = new TTLCache<>();
        // "key1"を10秒のTTLでキャッシュに登録する
        ttlCache.put("key1", "value1", 10000);
        // "key2"を3秒のTTLでキャッシュに登録する
        ttlCache.put("key2", "value2", 3000);

        ttlCache.printCache();
        // 4秒間待機し，"key2"のTTLが切れるのを確認する
        Thread.sleep(4000);
        System.out.println("4秒後の取得結果:");
        System.out.println("key1: " + ttlCache.get("key1"));
        System.out.println("key2: " + ttlCache.get("key2")); // key2は期限切れでnullが返る

        // さらに10秒待機し，"key1"もTTL切れになるのを確認する
        Thread.sleep(10000);
        System.out.println("追加10秒後の取得結果:");
        System.out.println("key1: " + ttlCache.get("key1")); // key1も期限切れでnullが返る
        ttlCache.shutdown();
    }
}
```
上記のコードを実行すると，以下のような出力が得られる．
```bash
キャッシュの内容:
キー: key1 値: value1
キー: key2 値: value2
4秒後の取得結果:
key1: value1
key2: null
Expired entry removed: key1
追加10秒後の取得結果:
key1: null
```
---
このように，TTLCacheは指定したTTLに基づいてキャッシュエントリを管理し，期限切れのエントリを自動的に削除する機能を持つ.
スレッドセーフなキャッシュの基本的な動作を実際に実行してみて確かめてほしい．
