---
title: 'Project Gopher: Unlocking Go’s Secrets Part1 [context.Contextってなんなんだ]'
tags:
  - Go
  - プログラミング
  - API
  - Web
  - gopher
private: false
updated_at: '2025-04-20T19:08:49+09:00'
id: dc45b412d3fbd2ccb9e8
organization_url_name: rits-rcc
slide: false
ignorePublish: false
---
みなさんGo言語で開発したことはありますか？今回は新シリーズ`Project Gopher: Unlocking Go’s Secrets`と題しまして，Go言語の秘密を暴いていこうと思います．(というかGo言語の本質やライブラリでで気になったことを調べたレポートみたいなものです．)

Part1ではGo言語のcontext.Contextを深ぼろうと思います．Go言語におけるcontext.Contextは並行処理を管理するための強力なツールであり, ゴルーチン間でキャンセル信号, デッドライン, 値を伝達するための標準的なインターフェースです. 本記事では, context.Contextの基本的な使い方に加え, 具体例や内部構造における値の管理方法についても詳しく解説します. また, ドメイン駆動設計(DDD)やクリーンアーキテクチャに基づいたAPI設計の例を通じて, context.Contextをどのように活用できるかを示す.

# シリーズ Project Gopher: Unlocking Go’s Secrets
**Part2** 標準ライブラリstringパッケージの使い方を徹底解剖

https://qiita.com/JavaLangRuntimeException/items/01797c033859d608c5de

# 他のシリーズ記事
Goを知らない人は以下の記事から．

https://qiita.com/JavaLangRuntimeException/items/d388717fc1436bc3ec9d

> 上の記事も〇〇チートシートとしてシリーズ化しているのでぜひご覧ください．様々な言語，フレームワーク，ライブラリなど開発技術の使用方法，基本事項，応用事例を網羅し，手引書として記載したシリーズです．
git/gh，lazygit，docker，vim，typescript，SQL，プルリクエスト/マークダウン，ステータスコード，ファイル操作，OpenAI AssistantsAPI，Ruby/Ruby on Rails のチートシートがあります．以下の記事に遷移した後，各種チートシートのリンクがあります.

**Gopher’s Journey: Exploring TCP Protocol**
Goを用いてTCPプロトコルを探求 & 作成するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/38091220106d86651d2b

**TypeScriptで学ぶプログラミングの世界**
プログラミング言語を根本的に理解するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/cadf49bb419076819963

**情報処理技術者試験合格への道 [IP・SG・FE・AP]**
情報処理技術者試験に出題されるコンピュータサイエンス用語の紹介や単語集

https://qiita.com/JavaLangRuntimeException/items/991be402099542ccb936

**IAM AWS User クラウドサービスをフル活用しよう！**
AWSのサービスを例にしてバックエンドとインフラ開発の手法を説明するシリーズです．

https://qiita.com/JavaLangRuntimeException/items/371a334f5a6e07035db5

**AWS UserのGCP浮気日記**
GCPの様子をAWSと比較して考えてみるシリーズ

https://qiita.com/JavaLangRuntimeException/items/527d99e774165a763180


# context.Contextの目的と背景
Go言語における`context.Context`は，複数のゴルーチンが協調して動作する際に，統一的なキャンセルとタイムアウトを実装するための汎用的な機構である．これにより，キャンセル信号やデッドラインを一元的に管理でき，予期せぬエラーやタイムアウト時に効率的にリソースを開放することが可能になる．

**具体例:**
Webサーバーでは，クライアントの接続が切れたりタイムアウトした場合，そのリクエストに紐づくゴルーチンにキャンセル信号を送って処理を中断させることができる．これにより，不要な処理が継続するのを防ぎ，リソースを有効活用できる．

`context.Context`は，API間や処理の階層をまたいでキャンセル，タイムアウト，値の伝搬を行うために設計されており，特に以下のようなシーンで頻繁に利用される．

- **リクエスト単位でのキャンセル管理:** 
ユーザーからのリクエストに対する処理を管理し，キャンセルやタイムアウトを適切にハンドリング

- **I/OやRPCのタイムアウト制御:** 
ネットワーク通信やファイル操作のタイムアウトを設定し，応答がない場合に処理を中断

- **ログ出力やトレースを目的とした識別子の受け渡し:** 
ユーザーIDやトレースIDなどのメタデータをコンテキスト経由で渡す

- **ユーザーIDや認可情報など、複数レイヤーで用いるメタデータの保持:** 
アプリケーション全体で共有する必要のある情報を安全に伝播

:::note info
一般的には，`context.Context`はすべての関数に第一引数として渡し続けることで，ツリー構造を維持しやすくなる．`context.Background()`は堅牢なルート・コンテキストとして，サーバーの`main`関数やテスト環境から最初に呼び出されるケースが多い．
:::

# context.Contextのインターフェース
```go
type Context interface {
	Deadline() (deadline time.Time, ok bool)
	Done() <-chan struct{}
	Err() error
	Value(key any) any
}
```
- **1.Deadline() (deadline time.Time, ok bool)**
   処理をキャンセルすべき締め切り時刻を返す．締め切りが設定されていない場合は`ok`が`false`になる．

    **使用例:** 
   処理に制限時間を設ける際に使用する．

- **2.Done() <-chan struct{}**
   コンテキストがキャンセルまたはタイムアウトされたときに閉じられるチャネルを返す．これを監視することでゴルーチンはキャンセルを検知できる
   
    **使用例:** 
    `select`文内で`ctx.Done()`を監視し、キャンセル時に処理を中断します。

- **3.Err() error**
   `Done`チャネルが閉じられた理由をエラー値として返す．キャンセルされた場合は`context.Canceled`、デッドラインが超過した場合は`context.DeadlineExceeded`が返される．
   
   **使用例:** 
   キャンセルやタイムアウトの理由を確認する際に使用します。

- **4.Value(key any) any**
   指定したキーに対応する値を返す．該当する値がなければ`nil`を返す
   
   **使用例:** 
   リクエストスコープのデータ（例：ユーザーID）を取得する際に使用します。

これらのメソッドによって，処理の期限設定や中断，共通情報の伝搬が容易になる．実際には，`context.Background()`や`context.TODO()`を基点として，キャンセルやタイマー付きのコンテキストを生成し，階層的に引き回して利用する．

# context.Contextの主要な実装

## emptyCtx

`emptyCtx`は、`context.Background()`および`context.TODO()`が返す最も基本的なコンテキスト．キャンセルや値の格納を行わず，`Done()`は常に`nil`を返すため、キャンセルされることはない．

```go
// emptyCtxはキャンセルされず、値も保持しない最も基本的なコンテキスト
type emptyCtx struct{}

// Deadlineは締め切り時刻を返すが，emptyCtxでは設定していないためokはfalseになる
func (emptyCtx) Deadline() (deadline time.Time, ok bool) {
    return
}

// Doneはキャンセル信号を返すチャネルだが，emptyCtxではキャンセルされないためnilを返す
func (emptyCtx) Done() <-chan struct{} {
    return nil
}

// Errはエラーを返すが，emptyCtxではキャンセルされないため常にnil
func (emptyCtx) Err() error {
    return nil
}

// Valueは指定されたキーに対応する値を返すが，emptyCtxでは値を保持していないためnilを返す
func (emptyCtx) Value(key any) any {
    return nil
}

// backgroundCtxはemptyCtxを埋め込んだ型で，context.Background()が返す
type backgroundCtx struct{ emptyCtx }

// Stringはコンテキストの文字列表現を返す
func (backgroundCtx) String() string {
    return "context.Background"
}

// todoCtxはemptyCtxを埋め込んだ型で，context.TODO()が返す
type todoCtx struct{ emptyCtx }

// Stringはコンテキストの文字列表現を返す
func (todoCtx) String() string {
    return "context.TODO"
}

// Backgroundは新しい空のコンテキストを返す．これはキャンセルされず，値も持たない
func Background() Context {
    return backgroundCtx{}
}

// TODOは新しい空のコンテキストを返す．どのコンテキストを使うべきかわからない場合に使用する
func TODO() Context {
    return todoCtx{}
}
```
使用例:

```go
ctx := context.Background()
// ctxはキャンセルされず，値も持たない基本的なコンテキスト
```

## cancelCtx
cancelCtxは、context.WithCancelによって生成されるキャンセル可能なコンテキスト．親と子の関係でツリー構造を形成し，親がキャンセルされると子もキャンセルされる．また，cancel関数を呼び出すことで自身のDoneチャネルを閉じ，子コンテキストや関連するゴルーチンにキャンセルを通知する．
```go
// CancelFuncはキャンセル操作を行う関数の型
type CancelFunc func()

// WithCancelは親コンテキストに基づき，新しいキャンセル可能なコンテキストを返す．
func WithCancel(parent Context) (ctx Context, cancel CancelFunc) {
    c := withCancel(parent)
    return c, func() { c.cancel(true, Canceled, nil) }
}

// cancelCtxはキャンセル可能なコンテキストを実装する構造体
type cancelCtx struct {
    Context
    mu       sync.Mutex
    children map[canceler]struct{}
    err      error
    done     chan struct{}
}

// cancelはコンテキストをキャンセルし，子コンテキストにもキャンセルを伝播
func (c *cancelCtx) cancel(removeFromParent bool, err error, cause error) {
    c.mu.Lock()
    if c.err != nil {
        // 既にキャンセルされている場合は何もしない
        c.mu.Unlock()
        return
    }
    c.err = err
    // すべての子コンテキストをキャンセル
    for child := range c.children {
        child.cancel(false, err, cause)
    }
    c.children = nil
    c.mu.Unlock()
    if removeFromParent {
        // 親からこのコンテキストを子リストから削除
        removeChild(c.Context, c)
    }
    close(c.done) // Doneチャネルを閉じてキャンセルを通知
}

// withCancelは内部関数で，新しいcancelCtxを作成
func withCancel(parent Context) *cancelCtx {
    c := &cancelCtx{
        Context:  parent,
        children: make(map[canceler]struct{}),
        done:     make(chan struct{}),
    }
    // 親コンテキストがキャンセル可能な場合、親に子として自身を登録
    parentValue := parent.Value(&cancelCtxKey{})
    if parentCancel, ok := parentValue.(canceler); ok {
        parentCancel.addChild(c)
    }
    return c
}

// cancelerはキャンセル可能なコンテキストが満たすべきインターフェース
type canceler interface {
    cancel(removeFromParent bool, err error, cause error)
    addChild(child canceler)
}

// addChildは子コンテキストを登録
func (c *cancelCtx) addChild(child canceler) {
    c.mu.Lock()
    defer c.mu.Unlock()
    if c.err != nil {
        // 既にキャンセルされている場合、即座に子をキャンセル
        go child.cancel(false, c.err, nil)
        return
    }
    c.children[child] = struct{}{}
}

// removeChildは子コンテキストを削除
func (c *cancelCtx) removeChild(child canceler) {
    c.mu.Lock()
    defer c.mu.Unlock()
    delete(c.children, child)
}

// removeChildは親コンテキストから子コンテキストを削除
func removeChild(parent Context, child canceler) {
    if parentCancel, ok := parent.Value(&cancelCtxKey{}).(canceler); ok {
        parentCancel.removeChild(child)
    }
}
```
使用例
```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel() // 処理が完了したらリソースを解放

go func() {
    // ゴルーチン内でキャンセルを監視
    select {
    case <-ctx.Done():
        // キャンセル処理
        fmt.Println("ゴルーチンがキャンセルされました")
    }
}()

// 何らかの条件でキャンセルをトリガー
cancel()
```
## timerCtx
timerCtxは，context.WithDeadlineやcontext.WithTimeoutによって生成されるコンテキスト．指定された時間が来ると自動的にキャンセルされる．内部的にはcancelCtxを埋め込んでおり，キャンセルの連鎖やDoneチャネルの管理ロジックは共通である．
```go
// timerCtxはタイマーと締め切り時刻を保持し，タイムアウト時にキャンセルする
type timerCtx struct {
    cancelCtx
    timer    *time.Timer
    deadline time.Time
}

// WithDeadlineは親コンテキストに基づき，指定された締め切り時刻を持つ新しいコンテキストを返す
func WithDeadline(parent Context, d time.Time) (Context, CancelFunc) {
    return WithDeadlineCause(parent, d, nil)
}

// WithDeadlineCauseはWithDeadlineに原因(cause)を追加したもの
func WithDeadlineCause(parent Context, d time.Time, cause error) (Context, CancelFunc) {
    if parent == nil {
        panic("cannot create context from nil parent")
    }
    // 親の締め切りが新しい締め切りより早い場合はWithCancelを使用
    if cur, ok := parent.Deadline(); ok && cur.Before(d) {
        return WithCancel(parent)
    }
    // 新しいtimerCtxを作成
    c := &timerCtx{
        deadline: d,
    }
    // 親とのキャンセル連鎖を設定
    c.cancelCtx.propagateCancel(parent, c)
    dur := time.Until(d)
    if dur <= 0 {
        // 締め切りが既に過ぎている場合は即座にキャンセル
        c.cancel(true, DeadlineExceeded, cause)
        return c, func() { c.cancel(false, Canceled, nil) }
    }
    c.mu.Lock()
    defer c.mu.Unlock()
    if c.err == nil {
        // タイマーを設定し、期限が来たらキャンセルを実行
        c.timer = time.AfterFunc(dur, func() {
            c.cancel(true, DeadlineExceeded, cause)
        })
    }
    return c, func() { c.cancel(true, Canceled, nil) }
}

// Deadlineは締め切り時刻を返す．このコンテキストでは常にtrueを返す
func (c *timerCtx) Deadline() (deadline time.Time, ok bool) {
    return c.deadline, true
}

// Stringはコンテキストの文字列表現を返す
func (c *timerCtx) String() string {
    return contextName(c.cancelCtx.Context) + ".WithDeadline(" +
        c.deadline.String() + " [" +
        time.Until(c.deadline).String() + "])"
}

// cancelはタイマーを停止し，内部のcancelCtxをキャンセルする
func (c *timerCtx) cancel(removeFromParent bool, err error, cause error) {
    c.cancelCtx.cancel(false, err, cause)
    if removeFromParent {
        // 親からこのtimerCtxを子リストから削除
        removeChild(c.cancelCtx.Context, c)
    }
    c.mu.Lock()
    if c.timer != nil {
        c.timer.Stop() // タイマーを停止
        c.timer = nil
    }
    c.mu.Unlock()
}

// WithTimeoutはWithDeadlineのラッパーで，現在時刻から指定されたタイムアウト後にキャンセルする
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc) {
    return WithDeadline(parent, time.Now().Add(timeout))
}

// WithTimeoutCauseはWithDeadlineCauseのラッパーで，タイムアウト時に原因(cause)を設定できる
func WithTimeoutCause(parent Context, timeout time.Duration, cause error) (Context, CancelFunc) {
    return WithDeadlineCause(parent, time.Now().Add(timeout), cause)
}
```
使用例
```go
ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
defer cancel() // タイムアウトまたは処理完了時にリソースを解放

result, err := slowOperation(ctx)
if err == context.DeadlineExceeded {
    fmt.Println("処理がタイムアウトしました")
} else if err != nil {
    fmt.Println("エラーが発生しました:", err)
} else {
    fmt.Println("結果:", result)
}
```
## valueCtx
valueCtxは，context.WithValueによって生成されるコンテキストで，キーと値のペアを保持する．Valueメソッドを呼び出す際にキーを検索し，該当する値を返す．存在しなければ親コンテキストのValueを再帰的に呼び出す．
```go
// valueCtxはキーと値のペアを保持し，Valueメソッドで該当キーの値を返す
type valueCtx struct {
    Context
    key, val any
}

// WithValueは親コンテキストに基づき，新しいキーと値を持つコンテキストを返す
func WithValue(parent Context, key, val any) Context {
    if parent == nil {
        panic("cannot create context from nil parent")
    }
    if key == nil {
        panic("nil key")
    }
    if !reflectlite.TypeOf(key).Comparable() {
        panic("key is not comparable")
    }
    return &valueCtx{parent, key, val}
}

// Valueは指定されたキーに対応する値を返す．見つからなければ親コンテキストに委譲する
func (c *valueCtx) Value(key any) any {
    if c.key == key {
        return c.val
    }
    return value(c.Context, key)
}

// valueは再帰的に親コンテキストを探索してキーに対応する値を探す
func value(c Context, key any) any {
    for {
        switch ctx := c.(type) {
        case *valueCtx:
            if key == ctx.key {
                return ctx.val
            }
            c = ctx.Context
        case *cancelCtx:
            if key == &cancelCtxKey {
                return c
            }
            c = ctx.Context
        case withoutCancelCtx:
            if key == &cancelCtxKey {
                // Cause(ctx) == nil を実装
                return nil
            }
            c = ctx.c
        case *timerCtx:
            if key == &cancelCtxKey {
                return &ctx.cancelCtx
            }
            c = ctx.Context
        case backgroundCtx, todoCtx:
            return nil
        default:
            return c.Value(key)
        }
    }
}

// stringifyは与えられた値を文字列に変換する．(主にデバッグ用)
func stringify(v any) string {
    switch s := v.(type) {
    case stringer:
        return s.String()
    case string:
        return s
    case nil:
        return "<nil>"
    }
    return reflectlite.TypeOf(v).String()
}

// Stringはコンテキストの文字列表現を返します。
func (c *valueCtx) String() string {
    return contextName(c.Context) + ".WithValue(" +
        stringify(c.key) + ", " +
        stringify(c.val) + ")"
}
```
使用例
```go
// ユニークなキー型を定義
type keyType string

var userIDKey keyType = "userID"

// 新しいコンテキストにユーザーIDを設定
ctx = context.WithValue(context.Background(), userIDKey, 12345)

// コンテキストからユーザーIDを取得
userID, ok := ctx.Value(userIDKey).(int)
if ok {
    fmt.Println("ユーザーID:", userID)
}
```

# コンテキストのツリー構造
これらはすべてコンテキスト同士を親子でつなげることでツリー構造を形成する. たとえば, 親コンテキストをキャンセルすると, 全ての子コンテキスト(さらにその子孫コンテキストも含め)へ通知が伝播される. 一方, 親が設定している値は子から参照できるという仕組みになっている.
```
parentCtx
├── childCtx1
│   └── grandChildCtx1
└── childCtx2
```
- 親がキャンセルされると、childCtx1、grandChildCtx1、childCtx2もキャンセルされる
- 親に設定された値は、childCtx1やchildCtx2からも参照できる

具体例:
```go
func main() {
    parentCtx := context.Background()
    childCtx, cancelChild := context.WithCancel(parentCtx)
    defer cancelChild()

    grandChildCtx, cancelGrandChild := context.WithCancel(childCtx)
    defer cancelGrandChild()

    // 親をキャンセル
    cancelChild()

    // grandChildCtxもキャンセルされていることを確認
    select {
    case <-grandChildCtx.Done():
        fmt.Println("grandChildCtxがキャンセルされました")
    default:
        fmt.Println("grandChildCtxはまだアクティブです")
    }
}
```
# 値を設定する場合の例
値をコンテキストに設定する際は，キーの衝突を避けるためにユニークなキー型を使用する．通常，パッケージ内で未エクスポートの型を定義し，そのキーを利用する．

```go
// Package userはユーザー情報をコンテキストに格納するためのユーティリティを提供
package user

import "context"

// Userはコンテキストに格納されるユーザー情報の型
type User struct {
    ID   int
    Name string
}

// keyはパッケージ内でのみ使用される未エクスポートのキー型
type key int

const userKey key = 0

// NewContextはユーザー情報を含む新しいコンテキストを返す
func NewContext(ctx context.Context, u *User) context.Context {
    return context.WithValue(ctx, userKey, u)
}

// FromContextはコンテキストからユーザー情報を取得する
func FromContext(ctx context.Context) (*User, bool) {
    u, ok := ctx.Value(userKey).(*User)
    return u, ok
}
```
上記のパッケージを使用する例
```go
package main

import (
    "context"
    "fmt"
    "user" // 上記で定義したパッケージ
)

func main() {
    // ユーザー情報を含むコンテキストを作成
    ctx := user.NewContext(context.Background(), &user.User{
        ID:   12345,
        Name: "Alice",
    })

    // コンテキストからユーザー情報を取得
    if u, ok := user.FromContext(ctx); ok {
        fmt.Printf("ユーザーID: %d, 名前: %s\n", u.ID, u.Name)
    } else {
        fmt.Println("ユーザー情報が見つかりません")
    }
}
```

# 並行処理との関連
context.Contextは，キャンセルやタイムアウトをゴルーチン単位で受け渡すための重要な仕組み．例えば，あるリクエストを処理するゴルーチンが複数のサブゴルーチンに仕事を振り，いずれかの結果だけを使った時点で他のサブゴルーチンを即座にキャンセルしたい場合に有効である．
```go
func handleRequest(ctx context.Context, wg *sync.WaitGroup) {
    defer wg.Done()
    // 子コンテキストを作成．これにより，サブゴルーチンを個別にキャンセル可能になる
    subCtx, cancel := context.WithCancel(ctx)
    defer cancel()

    go func() {
        // サブゴルーチン内での処理
        if err := doSubTask(subCtx); err != nil {
            // エラーが発生したらキャンセルをトリガー
            cancel()
        }
    }()

    select {
    case <-ctx.Done():
        // メインゴルーチンがキャンセルされた場合の処理
        fmt.Println("メインゴルーチンがキャンセルされました")
    case result := <-resultChan:
        // サブゴルーチンからの結果を受け取った場合の処理
        fmt.Println("結果:", result)
        // 他のサブゴルーチンをキャンセル
        cancel()
    }
}
```

- 親コンテキストがキャンセルされると，すべての子コンテキストもキャンセルされる
- キャンセルは即座に伝播され，関連するゴルーチンは早期に終了できる．
- WaitGroupなどを併用して，ゴルーチンの終了を待つことも一般的．

# 具体的な使用例と値の受け渡し

以下にHTTPリクエストの処理においてcontext.Contextを活用する例を示す. この例では, リクエストごとに採番されるリクエストIDをコンテキストに格納し, アプリケーション内でログ出力などに用いる.
```go
package main  

import (  
    "context"  
    "fmt"  
    "log"  
    "math/rand"  
    "net/http"  
    "time"  
)  

// リクエストIDを格納するためのキー(独自型で定義)  
type ctxKey string  
const requestIDKey ctxKey = "requestID"  

func main() {  
    http.HandleFunc("/", handler)  
    log.Println("サーバーを起動しました")  
    http.ListenAndServe(":8080", nil)  
}  

func handler(w http.ResponseWriter, r *http.Request) {  
    // リクエストIDを生成し, コンテキストに格納する  
    reqID := generateRequestID()  
    ctx := context.WithValue(r.Context(), requestIDKey, reqID)  

    // 実行時間にタイムアウトを設ける場合はWithTimeoutやWithDeadlineを適宜併用  
    // ctx, cancel := context.WithTimeout(ctx, 2*time.Second)  
    // defer cancel()  

    result, err := processRequest(ctx)  
    if err != nil {  
        http.Error(w, err.Error(), http.StatusInternalServerError)  
        return  
    }  
    fmt.Fprintf(w, "Result: %s", result)  
}  

func processRequest(ctx context.Context) (string, error) {  
    // キーrequestIDKeyを用いてリクエストIDを取りだす  
    if v := ctx.Value(requestIDKey); v != nil {  
        if id, ok := v.(string); ok {  
            fmt.Println("このリクエストIDは:", id)  
        }  
    }  

    // ゴルーチンなどを立ち上げるときにも同じctxを渡すことでキャンセルや値を共有  
    // ここではダミーで2秒待機してデータを返す  
    select {  
    case <-time.After(2 * time.Second):  
        return "Success", nil  
    case <-ctx.Done():  
        return "", ctx.Err()  
    }  
}  

func generateRequestID() string {  
    return fmt.Sprintf("req-%d", rand.Intn(10000))  
}  
```
このように, handlerで受け取ったリクエストコンテキストに独自のキーと値を設定し, processRequestで取りだしている. これによって, リクエストIDを処理のどの段階でも共通のキーを介して取得可能となる.

# DDDやクリーンアーキテクチャにおける利用


## 1. ドメイン層
レイヤー構成をわかりやすくするために、まずはユーザ情報を扱うドメイン層の例です。Userエンティティとリポジトリのインターフェースを定義し、context を引数で受け取ることで、タイムアウトやキャンセルを考慮できるようにします。




```domain/user.go
package domain

import "context"

type User struct {
    ID    string
    Name  string
    Email string
}

type UserRepository interface {
    // contextを引数に取り、キャンセルやタイムアウトを意識できるようにする
    FindByID(ctx context.Context, id string) (*User, error)
}
```
## 2. アプリケーション層
使用例として、現在のユーザーを取得するGetCurrentUserメソッドを定義したアプリケーション層（ユースケース層）を示します。
context からユーザーIDを取り出してドメイン層へ問い合わせを行う実装例です。

```application/user_service.go
package application

import (
    "context"
    "fmt"
    "myapp/domain"
)

// コンテキストからユーザーIDを取得する際に使うキーを定義
type ctxKey string
const userIDKey ctxKey = "currentUserID"

type UserService struct {
    repo domain.UserRepository
}

func NewUserService(repo domain.UserRepository) *UserService {
    return &UserService{repo: repo}
}

// このメソッドは、contextからユーザーIDを取り出してリポジトリを呼び出す例
func (s *UserService) GetCurrentUser(ctx context.Context) (*domain.User, error) {
    // コンテキスト内にユーザーIDが格納されているか確認
    val := ctx.Value(userIDKey)
    if val == nil {
        return nil, fmt.Errorf("ユーザーIDがコンテキストに存在しません")
    }

    userID, ok := val.(string)
    if !ok {
        return nil, fmt.Errorf("コンテキスト内のユーザーIDが文字列ではありません")
    }

    // リポジトリを通じてドメイン層からユーザーを取得
    user, err := s.repo.FindByID(ctx, userID)
    if err != nil {
        return nil, err
    }

    return user, nil
}
```
なお、WithValueで格納する処理などはインターフェース層から行うことを想定しています(後述のハンドラなど)。

## 3. インフラストラクチャ層
DB (ここではPostgreSQLを例示) に接続する実装例です。context を引数に取り、クエリ実行時にcontextのキャンセルやタイムアウトを利用できるようにします。

```infrastructure/postgres_user_repository.go
package infrastructure

import (
    "context"
    "database/sql"
    "myapp/domain"
)

type PostgresUserRepository struct {
    db *sql.DB
}

func NewPostgresUserRepository(db *sql.DB) domain.UserRepository {
    return &PostgresUserRepository{db: db}
}

func (r *PostgresUserRepository) FindByID(ctx context.Context, id string) (*domain.User, error) {
    const query = `SELECT id, name, email FROM users WHERE id = $1`

    row := r.db.QueryRowContext(ctx, query, id)

    var user domain.User
    if err := row.Scan(&user.ID, &user.Name, &user.Email); err != nil {
        return nil, err
    }

    return &user, nil
}
```
ここではQueryRowContextにctxを与えています。コンテキストがキャンセルされた場合、DB側にも中断が伝わり、不要な問い合わせを停止できるようになります。

## 4. インターフェース層 (ハンドラ)
最後にHTTPハンドラを例示します。ユーザーIDなどをコンテキストにセットし、アプリケーション層のGetCurrentUserに渡す流れです。
```interface/user_handler.go
package interface

import (
    "encoding/json"
    "fmt"
    "net/http"
    "myapp/application"
)

type UserHandler struct {
    service *application.UserService
}

func NewUserHandler(service *application.UserService) *UserHandler {
    return &UserHandler{service: service}
}

func (h *UserHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // クエリパラメータやトークンなどからユーザーIDを取得 (例として簡略化)
    userID := r.URL.Query().Get("user_id")
    if userID == "" {
        http.Error(w, "user_id is required", http.StatusBadRequest)
        return
    }

    // WithValueを使いキーを userIDKey、値を userID にして子コンテキストを生成
    ctx := r.Context()
    ctx = context.WithValue(ctx, application.UserIDKey(), userID)

    // サービス層にコンテキストを渡して「現在のユーザー情報」を取得
    user, err := h.service.GetCurrentUser(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // JSONでレスポンスを返す
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}
```
:::note info
**この事例の場合，context がどのように値を返しているのか**
- WithValue(parentCtx, key, val) を呼ぶと，裏では親を parentCtx とし、key と val を保存する valueCtx が新しく作られる
- ctx.Value(key) が呼び出されると，valueCtx 内部のロジックで「キーが自分の key に一致するか」を確かめ，一致すれば val を返し，一致しなければ親へ再帰的に問い合わせる

つまり、

- context.WithValue(...) が呼ばれたタイミングで、キーと値を保持する子コンテキストが生成される
- ctx.Value(key) は、一致するまで親コンテキストをたどり続ける

この仕組みにより、親コンテキスト→子コンテキストへ「キャンセル/タイムアウトの管理」と同時に「キーに紐づく値の共有」が自然に行われる

DDDやクリーンアーキテクチャでレイヤー間の依存性を抑えながら、キャンセルやタイムアウトを一元管理する上で、この機能は非常に便利である
:::
---

Go言語におけるcontext.Contextは, 並行処理を安全かつ効率的に行うための重要なコンポーネントである. 親から子へとツリー構造でキャンセルが伝播し, またWithValueによりキーと値のペアを格納して柔軟に情報を受け渡すことができる. これらキャンセル制御と値の伝播によって, 大規模な並行処理やWebアプリケーション開発時の一貫したリソース管理が容易になる. 特にDDDやクリーンアーキテクチャにおいては, レイヤー間を跨ぐキャンセルやID管理の仕組みとしてcontext.Contextを統一的に利用すると, 依存関係を減らしつつ明確な設計が実現できる. 今後複雑な並行処理を行うにあたり, ぜひcontext.Contextの内部構造や動作原理を理解して有効に活用してほしい.
