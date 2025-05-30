---
title: 'Gopher’s Journey: Exploring TCP Protocol Part 1 [HTTP編]'
tags:
  - Go
  - プログラミング
  - HTTP
  - TCP
  - プロトコル
private: false
updated_at: '2025-04-20T23:29:38+09:00'
id: 38091220106d86651d2b
organization_url_name: null
slide: false
ignorePublish: false
---
みなさんTCPを使ったプロトコルがどのように実装されているかわかっていますか？本シリーズ(Gopher’s Journey: Exploring TCP Protocol)ではGo言語でTCP通信てみるシリーズです．Part1では自作のHTTP風プロトコルを実装し，サーバーとクライアント双方から通信する例を示す.そして，TCPとHTTPの仕組みを軽くおさらいしつつ，「サーバー側」「自作のHTTP」「クライアント側」の3つにコードを分割し，自作のHTTPパーサやレスポンス組み立てロジックを共用しながら通信を行う流れを紹介します.

# 他のシリーズ記事
Goを知らない人は以下の記事から
**Go/Gormチートシート**

https://qiita.com/JavaLangRuntimeException/items/d388717fc1436bc3ec9d

> 上の記事も〇〇チートシートとしてシリーズ化しているのでぜひご覧ください．様々な言語，フレームワーク，ライブラリなど開発技術の使用方法，基本事項，応用事例を網羅し，手引書として記載したシリーズです．
git/gh，lazygit，docker，vim，typescript，SQL，プルリクエスト/マークダウン，ステータスコード，ファイル操作，OpenAI AssistantsAPI，Ruby/Ruby on Rails のチートシートがあります．以下の記事に遷移した後，各種チートシートのリンクがあります.

**Project Gopher: Unlocking Go’s Secrets**
本記事で使用するGo言語や標準ライブラリの深掘り調査レポートです．

https://qiita.com/JavaLangRuntimeException/items/dc45b412d3fbd2ccb9e8

**TypeScriptで学ぶプログラミングの世界**
プログラミング言語を根本的に理解するシリーズ

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

# TCPとHTTPの概要
まずはTCPとHTTPのポイントを再度おさらいする.

## TCPの概要
まずTCPとは，トランスポート層でコネクション型通信を行うプロトコルであり，サーバ側が特定ポートをリッスンし，クライアントがそこに接続要求を出すことでコネクションが確立される. 一度接続されると，バイトストリームとして順序保証付きでデータをやり取りできる. Goでこれを自前で実装したい場合は，`golang.org/x/sys/unix`パッケージを用いて`bind`, `listen`, `accept`などのシステムコールを直接呼び出して操作する.

## HTTPの説明
次にHTTPとは，テキストベースのアプリケーション層プロトコルであり，クライアントがサーバに対して「HTTPリクエスト」を送り，サーバはそれに応じて「HTTPレスポンス」を返すという流れをとる. 代表的なHTTP/1.1のリクエストとレスポンスは以下のような形式になっている.

### HTTPリクエストの形式
1. リクエストライン (例: `GET /index.html HTTP/1.1`)
2. ヘッダ行 (例: `Host: www.example.com`, `Content-Type: application/json` など)
3. ボディ (必要な場合のみ)

- **リクエストライン**
    - `Method RequestURI HTTP/バージョン` という3つの要素がスペース区切りで並んでいる.
    - `Method` には GET, POST, PUT, DELETE などHTTPメソッドが入り，何をしたいか(リソース取得/作成/更新/削除など)を示す.
    - `RequestURI` は`/index.html`, `/api/users`, `/search?q=keyword`など，サーバ上のどのリソースを要求しているかを示す.
    - `HTTP/1.1` は使用しているHTTPバージョンを示す.

例:
```
GET / HTTP/1.1
```

- **ヘッダ行**
    - リクエストラインの次に続く複数行であり，`ヘッダ名: 値` の形式になっている.
    - たとえば `Host: www.example.com`, `User-Agent: curl/7.64.1`, `Accept: text/html` など.
    - ヘッダの役割は，クライアントの情報や希望するコンテンツタイプなど，追加情報を伝えるためである.

- **ボディ**
    - POSTやPUTなどで，クライアントが実際のデータをサーバに送る必要があるとき，このボディ部にJSONやフォームデータなどを入れる.
    - ボディがあるかどうかはメソッドやヘッダ(`Content-Length`, `Transfer-Encoding`など)によって異なる.

### HTTPレスポンスの形式
1. ステータスライン (例: `HTTP/1.1 200 OK`)
2. ヘッダ行 (例: `Content-Type: text/html`, `Content-Length: 123` など)
3. 空行
4. ボディ (必要な場合のみ)

- **ステータスライン**
    - `HTTP/バージョン ステータスコード ステータスフレーズ` という3要素で構成される.
    - ステータスコードは 200(OK), 404(Not Found), 500(Internal Server Error) などがあり，サーバがリクエストをどう処理したかを表す.
    - ステータスフレーズは人間向けの短い説明文(OK, Not Found, etc.)である.

例:
```
HTTP/1.1 200 OK
```

- **ヘッダ行**
    - レスポンスにもヘッダが存在し，たとえば `Content-Type: text/html` や `Date: ...` などが入る.
    - レスポンスボディの長さを示す `Content-Length` や，圧縮形式を示す `Content-Encoding` などもここに含まれる.

- **空行**
    - ヘッダ行が終了したあとに空行が入り，それ以降がボディとなる.

- **ボディ**
    - 通常はクライアントが要求したリソース(HTML, JSON, バイナリファイルなど)やAPIの返却データ(例えばJSON)などがここに入る.
    - ステータスコードによってはボディが存在しない場合(204 No Contentなど)もある.
    ```json
    {
    "data" : "hogehoge"
    }
    ```

このように，HTTP/1.1のやり取りでは「リクエストライン(あるいはステータスライン) → 複数のヘッダ行 → 空行 → ボディ」という構造を基本とし，必要に応じてメソッドやステータスコードで動作を分岐する. HTTP/1.0やHTTP/2なども大枠の考え方は同じだが，接続の管理やヘッダ圧縮などの追加仕様が加わっている. いずれにせよ，テキストでリクエスト/レスポンスをやり取りするというのがHTTPの大きな特徴である.

# クライアントとサーバーとHTTPプロトコルの実装詳細
これらをGoで自作したHTTP実装(パーサやレスポンス生成器)を通してやり取りし，サーバー側では手動でソケットを開き，Acceptしてからリクエストを受け取る. クライアント側も同様に手動でソケットを生成し，サーバーへ接続して自作HTTPでリクエストを送信し，レスポンスをパースする流れとなる.

ここではアーキテクチャとしては以下のように分割する.

![スクリーンショット 2025-02-12 15.45.18.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3757442/f4eb1a4b-eafd-4ba8-b628-0be762baf068.png)

さらに，今回のHTTPプロトコルはnet/httpを使わずに，あたかもGinやEchoのようなフレームワーク風の書き方でAPIを実装する例を示す. あくまで完全自作のHTTPサーバライブラリ(以下myhttpパッケージと呼ぶ)を用いて，server.goではHTTPのパースやレスポンス生成に関するコードを一切含まず，ルーティングとAPIの実装だけに専念する構成とする. JavaScriptで作成したクライアント(client.js)から検証する流れも合わせて説明する.

# HTTP通信の流れを自作実装してみよう
以下にmyhttpパッケージ(myhttp.go)のサンプルを示す. TCPレベルの`bind`, `listen`, `accept`やHTTPメッセージのパース，レスポンス生成を行い，さらにルータとContextを用意してユーザがルーティングだけを記述できるようにする.

goパッケージの作成からします．
```bash
mkdir myhttp
cd myhttp
```
```bash
go mod init myhttp
touch server.go
```

## 今回実装する内容

この実装はあくまでもUnixのソケットを直接扱い, シンプルなHTTPサーバ機能を提供するものである. 具体的には以下のようなタイプの通信, リクエスト, レスポンスが処理可能とする．

1. **TCPソケットを介したHTTP/1.1相当のリクエスト**
    - `myhttp` は TCP 通信のソケットを生成し, バインド, リッスン, Accept している.
    - 受信したテキストデータを HTTP リクエストとしてパースし, HTTP/1.1 の形式に沿ったステータス行やヘッダを返す.

2. **GET および POST メソッドのサポート**
    - `Router` によって GET / POST エンドポイントを簡単に定義できる.
    - `"GET /"` や `"POST /api"` のように, メソッド＋パスをキーとしてハンドラを紐づけられる.

3. **固定長ボディ（Content-Length付き）のみ対応**
    - 本実装では, ヘッダに含まれる `Content-Length` を整数変換し, そのサイズ分だけボディを読み取る.
    - Chunked Transfer Encoding といった, 長さが動的に変化する転送方式には対応しない.

4. **単一リクエストごとの接続（Connection: close）**
    - `buildResponse` 関数で `Connection: close` を付与しており, Keep-Alive 接続を行わない.
    - 1つのリクエスト・レスポンスが完了すると, ソケットをクローズして切断する.

5. **テキスト（String）および JSON レスポンス**
    - `Context` の `String` メソッドを使って任意のプレーンテキストレスポンスを送信できる.
    - `JSON` メソッドで JSON マーシャリングを行い, `application/json` として返せる.

6. **IPv4による通信（SockaddrInet4）**
    - `sockaddr` に `unix.SockaddrInet4` を使用し, IPv4 のみを対象としている.
    - localhost(127.0.0.1) や 0.0.0.0 などのアドレスにバインドして利用可能.

7. **基本的なエラーハンドリング**
    - parseRequest で不正なリクエストラインや Content-Length が無効な場合はエラーを返す.
    - ルータでマッチしないパスやメソッドであれば, 404 Not Found を返す.

## GoでのHTTPプロトコル実装
`myhttp/server.go`を実装する．
```myhttp/server.go
package server

import (
	"encoding/json" // JSONのエンコード／デコードを行う標準パッケージ
	"fmt"           // 文字列フォーマット等に利用する標準パッケージ
	"log"           // ログ出力に利用する標準パッケージ
	"strconv"       // 文字列と数値の相互変換に利用する標準パッケージ
	"strings"       // 文字列操作に利用する標準パッケージ

	"golang.org/x/sys/unix" // Unix系システムコールを直接扱う外部パッケージ
)

// RouteHandlerはエンドポイントごとに呼ばれるユーザ定義ハンドラの型
// コンテキスト（*Context）を引数にとる関数を型別名として定義している
type RouteHandler func(c *Context)

// Routerはメソッド+パスをキーとしたマッピングを保持し，対応するハンドラを呼び出す
type Router struct {
	routes map[string]RouteHandler // "GET /" のように "METHOD PATH" をキーとしてハンドラを紐づける
}

// NewRouterは空のroutesマップを準備するコンストラクタのような関数
func NewRouter() *Router {
	return &Router{
		routes: make(map[string]RouteHandler), // mapを初期化して返す
	}
}

// GETメソッド用のエンドポイントを登録する
func (r *Router) GET(path string, handler RouteHandler) {
	r.routes["GET "+path] = handler // "GET " + パス というキーでマップに登録
}

// POSTメソッド用のエンドポイントを登録する
func (r *Router) POST(path string, handler RouteHandler) {
	r.routes["POST "+path] = handler // "POST " + パス というキーでマップに登録
}

// HandleはContextを受け取り，Method+Pathからハンドラを検索して実行する
func (r *Router) Handle(c *Context) {
	// 例: c.Method = "GET", c.Path = "/" なら "GET /" というキーを生成
	key := c.Method + " " + c.Path

	// 該当するキーが登録されていればハンドラを呼び出す
	if handler, ok := r.routes[key]; ok {
		handler(c)
	} else {
		// 見つからなければ 404 Not Found を返す
		c.String(404, "Not Found")
	}
}

// Contextはリクエストとレスポンス情報をやり取りするための構造体
type Context struct {
	Method      string            // HTTPメソッド（"GET", "POST"等）
	Path        string            // リクエストパス（"/", "/users"等）
	Headers     map[string]string // リクエストヘッダを保持する（キーはヘッダ名を小文字化したもの）
	Body        []byte            // リクエストボディの生データ
	status      int               // レスポンスステータスコード(200, 404等)
	respHeaders map[string]string // レスポンスヘッダ（Content-Type等）
	respBody    []byte            // レスポンスボディ
}

// newContextはリクエスト(Request)からContextを生成する
func newContext(req *Request) *Context {
	return &Context{
		Method:      req.Method,              // Request構造体からMethodをコピー
		Path:        req.Path,                // Request構造体からPathをコピー
		Headers:     req.Headers,             // Request構造体からHeadersをコピー
		status:      200,                     // デフォルトのステータスコードを200(OK)とする
		respHeaders: make(map[string]string), // レスポンスヘッダ用のマップを初期化
		Body:        req.Body,                // Request構造体からボディをコピー
	}
}

// Stringはテキストでレスポンスを返す簡易関数
func (c *Context) String(status int, text string) {
	c.status = status                                           // ステータスコードをセット
	c.respHeaders["Content-Type"] = "text/plain; charset=utf-8" // レスポンスヘッダにContent-Typeをセット
	c.respBody = []byte(text)                                   // レスポンスボディを文字列からバイト列に変換してセット
}

// JSONはJSONでレスポンスを返す簡易関数
func (c *Context) JSON(status int, obj interface{}) {
	c.status = status                                  // ステータスコードをセット
	c.respHeaders["Content-Type"] = "application/json" // JSONレスポンスなので Content-Type を "application/json" に
	data, err := json.Marshal(obj)                     // objをJSONに変換
	if err != nil {
		// JSON変換に失敗した場合は最低限のエラーメッセージを返す
		c.respBody = []byte(`{"error":"failed to marshal"}`)
		return
	}
	// 変換したJSONをレスポンスボディにセット
	c.respBody = data
}

// BindJSONはリクエストボディをJSONパースしてdestへ格納する
func (c *Context) BindJSON(dest interface{}) error {
	// json.Unmarshalを使い、c.Bodyをdestが指す構造体などにマッピングする
	return json.Unmarshal(c.Body, dest)
}

// StatusCodeは内部のstatus(int)をHTTPステータス行文字列に変換する
func (c *Context) StatusCode() string {
	// HTTPレスポンスのステータスラインにあたる文字列を生成
	switch c.status {
	case 200:
		return "HTTP/1.1 200 OK"
	case 400:
		return "HTTP/1.1 400 Bad Request"
	case 404:
		return "HTTP/1.1 404 Not Found"
	default:
		// 未定義のステータスコードの場合は "Unknown" として表示
		return fmt.Sprintf("HTTP/1.1 %d Unknown", c.status)
	}
}

// ServerはTCPレベルでソケットを開き，受信したリクエストをRouterへ渡してレスポンスを返す役割を持つ
type Server struct {
	addr   string  // バインドするアドレス (例: ":8080")
	router *Router // ルータ (パスやメソッドに応じたハンドラを呼び出す)
}

// NewServerはaddr(":8080"など)とRouterを受け取り，Serverを生成する
func NewServer(addr string, router *Router) *Server {
	return &Server{
		addr:   addr,   // 受け取ったアドレスを設定
		router: router, // 受け取ったルータを設定
	}
}

// Startはbind, listen, acceptを行い，handleConnectionでHTTP処理を行う
func (s *Server) Start() error {
	// ソケットを作成 (TCPソケット: AF_INET, SOCK_STREAM, プロトコル0)
	fd, err := unix.Socket(unix.AF_INET, unix.SOCK_STREAM, 0)
	if err != nil {
		return fmt.Errorf("ソケット生成失敗: %v", err)
	}
	// Startメソッド終了時に必ずソケットをクローズする
	defer unix.Close(fd)

	// ポート番号をデフォルトで8080にしておく
	port := 8080

	// s.addrが":8080"のような形なら ":8080"[1:] → "8080" となり、ポート番号を整数に変換
	if strings.HasPrefix(s.addr, ":") {
		p, err := strconv.Atoi(s.addr[1:])
		if err == nil {
			port = p
		}
	}

	// ソケットアドレス (IPv4, ポート=port) を作成
	sa := &unix.SockaddrInet4{Port: port}
	copy(sa.Addr[:], []byte{0, 0, 0, 0}) // 0.0.0.0 にバインド(全てのインターフェースで待ち受け)

	// ソケットに対してバインドを行う
	err = unix.Bind(fd, sa)
	if err != nil {
		return fmt.Errorf("バインド失敗: %v", err)
	}

	// ソケットをリッスン状態にする
	err = unix.Listen(fd, 10) // 第二引数はバックログ(保留中の接続のキューサイズ)
	if err != nil {
		return fmt.Errorf("リッスン失敗: %v", err)
	}

	// ログ出力: サーバが起動して特定アドレスでリッスンを開始したことを知らせる
	log.Printf("myhttpサーバ: %s でリッスン開始", s.addr)

	for {
		// クライアントからの接続を待ち受ける(ブロッキング)
		newFd, clientAddr, err := unix.Accept(fd)
		if err != nil {
			// 失敗したらログを出し、ループの先頭に戻って次の接続待ちへ
			log.Printf("Accept失敗: %v", err)
			continue
		}
		// 接続を受け付けたら、その処理を別のゴルーチンで実行する
		go s.handleConnection(newFd, clientAddr)
	}
}

// handleConnectionは単一接続について，リクエストをパースしRouter.Handleでハンドラを呼び出し，レスポンスを送る
func (s *Server) handleConnection(newFd int, clientAddr unix.Sockaddr) {
	// この関数を抜けるときに必ずソケットをクローズしてリソースを開放
	defer unix.Close(newFd)

	// バッファを用意して、ソケットからの受信データを読み込む
	buf := make([]byte, 4096)
	n, err := unix.Read(newFd, buf)
	if err != nil || n <= 0 {
		log.Printf("読み込みエラーまたはデータなし")
		return
	}

	// 受信データを文字列として取り出す
	reqData := string(buf[:n])

	// 受信データをログに出力（デバッグ用）
	log.Printf("受信データ:\n%s", reqData)

	// 受信したデータを parseRequest でパースして Request 構造体に落とし込む
	req, err := parseRequest(reqData)
	if err != nil {
		// リクエストとして成立していない場合はエラーをログに出して終了
		log.Printf("HTTPリクエストパース失敗: %v", err)
		return
	}

	// Request構造体から Context を作り、そこに必要な情報を格納
	c := newContext(req)

	// Routerに処理を委譲し、登録されている対応するハンドラを実行してもらう
	s.router.Handle(c)

	// ハンドラがセットしたレスポンス情報をHTTPレスポンス文字列に組み立て
	respStr := buildResponse(c)

	// 組み立てたレスポンス文字列をソケットに書き出す
	_, _ = unix.Write(newFd, []byte(respStr))
}

// RequestはparseRequest用のHTTPリクエスト一時構造体
type Request struct {
	Method  string            // HTTPメソッド (GET, POST等)
	Path    string            // パス (/, /users 等)
	Headers map[string]string // ヘッダ (content-length, content-type等) を小文字化して保持
	Body    []byte            // ボディの生データ
}

// parseRequestは生のHTTPリクエスト文字列を解析してRequestを返す
func parseRequest(data string) (*Request, error) {
	// \r\n で行に分割
	lines := strings.Split(data, "\r\n")
	if len(lines) < 1 {
		return nil, fmt.Errorf("空リクエスト")
	}

	// 最初の行はリクエストライン(例: "GET / HTTP/1.1")
	requestLine := lines[0]
	// リクエストラインをスペース区切りで分割 (例: ["GET", "/", "HTTP/1.1"])
	parts := strings.Split(requestLine, " ")
	if len(parts) < 2 {
		return nil, fmt.Errorf("不正なリクエストライン: %s", requestLine)
	}

	// メソッドとパスを取り出し
	method := parts[0]
	path := parts[1]

	// ヘッダーを格納するマップを初期化
	headers := make(map[string]string)
	var i int

	// 2行目以降を走査してヘッダー部を取得する
	for i = 1; i < len(lines); i++ {
		line := lines[i]
		if line == "" {
			// 空行が出現したら、そこがヘッダーとボディの境目
			i++
			break
		}
		// ヘッダは "HeaderName: value" の形式なので ":" で分割
		headerParts := strings.SplitN(line, ":", 2)
		if len(headerParts) == 2 {
			k := strings.TrimSpace(headerParts[0]) // ヘッダ名
			v := strings.TrimSpace(headerParts[1]) // ヘッダの値
			// 全て小文字化したキーにして保持
			headers[strings.ToLower(k)] = v
		}
	}

	// ボディを読み取るための変数
	var body []byte

	// Content-Length があれば、その長さ分ボディを取得する
	if cl, ok := headers["content-length"]; ok {
		length, err := strconv.Atoi(cl)
		if err != nil {
			return nil, fmt.Errorf("Content-Length が無効です: %v", cl)
		}
		if length > 0 {
			// 残りの行を\r\nで再連結し、ボディ全体を取得
			bodyLines := strings.Join(lines[i:], "\r\n")
			if len(bodyLines) < length {
				// ボディのサイズが想定よりも小さい場合はエラー
				return nil, fmt.Errorf("ボディが不完全です。期待値: %d, 実際: %d", length, len(bodyLines))
			}
			// 指定のlengthバイト分だけボディを切り出す
			body = []byte(bodyLines[:length])
		}
	}

	// パース結果をRequest構造体にまとめて返す
	return &Request{
		Method:  method,
		Path:    path,
		Headers: headers,
		Body:    body,
	}, nil
}

// buildResponseはContextからHTTPレスポンス文字列を生成する
func buildResponse(c *Context) string {
	// ステータスライン(例: "HTTP/1.1 200 OK")
	statusLine := c.StatusCode()

	// レスポンスヘッダにConnection=close とContent-Lengthを付与
	c.respHeaders["Connection"] = "close"
	c.respHeaders["Content-Length"] = strconv.Itoa(len(c.respBody))

	// ヘッダの文字列を"\r\n"で連結して組み立て
	headerStr := ""
	for k, v := range c.respHeaders {
		headerStr += fmt.Sprintf("%s: %s\r\n", k, v)
	}

	// ステータスライン + ヘッダ + 空行 + ボディ という形式
	return statusLine + "\r\n" + headerStr + "\r\n" + string(c.respBody)
}

```
## HTTPプロトコルの実装詳細説明

### 1. エンドポイント処理の基盤: RouteHandler と Router

`RouteHandler` は, ユーザ定義のHTTPハンドラを表す型である. 関数のシグネチャとして `func(c *Context)` を持ち, 実際のビジネスロジックを記述する. そして `Router` は, メソッド（GET, POST など）とパス（"/", "/users" など）の組み合わせをキーとし, 対応するハンドラを登録・管理する. たとえば `r.GET("/", someHandler)` で, `"GET /"` というキーに `someHandler` を紐づけている.
```go
// RouteHandlerはエンドポイントごとに呼ばれるユーザ定義ハンドラの型
type RouteHandler func(c *Context)

// Routerはメソッド+パスをキーとしたマッピングを保持し，対応するハンドラを呼び出す
type Router struct {
    routes map[string]RouteHandler
}

// NewRouterは空のroutesマップを準備するコンストラクタ
func NewRouter() *Router {
    return &Router{
        routes: make(map[string]RouteHandler),
    }
}

// GET, POSTメソッドのエンドポイントを登録
func (r *Router) GET(path string, handler RouteHandler) {
    r.routes["GET "+path] = handler
}
func (r *Router) POST(path string, handler RouteHandler) {
    r.routes["POST "+path] = handler
}

// HandleはContextを受け取り，Method+Pathからハンドラを検索して実行する
func (r *Router) Handle(c *Context) {
    key := c.Method + " " + c.Path
    if handler, ok := r.routes[key]; ok {
        handler(c)
    } else {
        c.String(404, "Not Found")
    }
}
```
ここで `Handle` メソッドは, 受け取った `Context` からメソッドとパスを抽出し, 登録されたキーをもとにハンドラを呼び出す. 該当がない場合には, 404 Not Found を返すことで, シンプルなルーティングを実現している.

---

### 2. リクエストとレスポンスを運ぶ Context

`Context` 構造体は, クライアントから受け取ったリクエスト情報（メソッド, パス, ヘッダ, ボディ）を格納しつつ, 同時にレスポンスデータ（ステータス, ヘッダ, ボディ）を構築するための領域を持つ. `newContext` 関数では, まだレスポンスヘッダなどが空の状態で初期化されるが, ハンドラの実行を通じて, ステータスやレスポンスボディが書き換えられていく.
```go
// Contextはリクエストとレスポンス情報をやり取りするための構造体
type Context struct {
    Method      string
    Path        string
    Headers     map[string]string
    Body        []byte
    status      int
    respHeaders map[string]string
    respBody    []byte
}

// newContextはリクエスト(Request)からContextを生成する
func newContext(req *Request) *Context {
    return &Context{
        Method:      req.Method,
        Path:        req.Path,
        Headers:     req.Headers,
        status:      200,
        respHeaders: make(map[string]string),
        Body:        req.Body,
    }
}
```
`String` や `JSON` メソッドは, レスポンスのステータスコードとボディを簡単にセットするための補助関数だ. `BindJSON` は, リクエストボディを任意の構造体やマップなどにパースするために用いられる. ステータスコードをHTTPレスポンス行に変換するための `StatusCode` メソッドも定義されている.
```go
// Stringはテキストでレスポンスを返す簡易関数
func (c *Context) String(status int, text string) {
	c.status = status                                           // ステータスコードをセット
	c.respHeaders["Content-Type"] = "text/plain; charset=utf-8" // レスポンスヘッダにContent-Typeをセット
	c.respBody = []byte(text)                                   // レスポンスボディを文字列からバイト列に変換してセット
}

// JSONはJSONでレスポンスを返す簡易関数
func (c *Context) JSON(status int, obj interface{}) {
	c.status = status                                  // ステータスコードをセット
	c.respHeaders["Content-Type"] = "application/json" // JSONレスポンスなので Content-Type を "application/json" に
	data, err := json.Marshal(obj)                     // objをJSONに変換
	if err != nil {
		// JSON変換に失敗した場合は最低限のエラーメッセージを返す
		c.respBody = []byte(`{"error":"failed to marshal"}`)
		return
	}
	// 変換したJSONをレスポンスボディにセット
	c.respBody = data
}

// BindJSONはリクエストボディをJSONパースしてdestへ格納する
func (c *Context) BindJSON(dest interface{}) error {
	// json.Unmarshalを使い、c.Bodyをdestが指す構造体などにマッピングする
	return json.Unmarshal(c.Body, dest)
}

// StatusCodeは内部のstatus(int)をHTTPステータス行文字列に変換する
func (c *Context) StatusCode() string {
	// HTTPレスポンスのステータスラインにあたる文字列を生成
	switch c.status {
	case 200:
		return "HTTP/1.1 200 OK"
	case 400:
		return "HTTP/1.1 400 Bad Request"
	case 404:
		return "HTTP/1.1 404 Not Found"
	default:
		// 未定義のステータスコードの場合は "Unknown" として表示
		return fmt.Sprintf("HTTP/1.1 %d Unknown", c.status)
	}
}
```
---

### 3. Server構造体とソケットの基礎操作

`Server` 構造体は, 実際にソケットを開いてクライアントからの接続を受け取り, リクエストの読み込みやレスポンスの送信を司る. `NewServer` は, アドレス（例: ":8080"）と `Router` を受け取り, `Server` を作って返す. `Start` メソッドでは, Unixシステムコールによってソケットを生成し, バインドとリッスンを行い, その後 `Accept` で接続を待ち受ける.
```go
// ServerはTCPレベルでソケットを開き，受信したリクエストをRouterへ渡してレスポンスを返す役割を持つ
type Server struct {
	addr   string  // バインドするアドレス (例: ":8080")
	router *Router // ルータ (パスやメソッドに応じたハンドラを呼び出す)
}

// NewServerはaddr(":8080"など)とRouterを受け取り，Serverを生成する
func NewServer(addr string, router *Router) *Server {
	return &Server{
		addr:   addr,   // 受け取ったアドレスを設定
		router: router, // 受け取ったルータを設定
	}
}

// Startはbind, listen, acceptを行い，handleConnectionでHTTP処理を行う
func (s *Server) Start() error {
	// ソケットを作成 (TCPソケット: AF_INET, SOCK_STREAM, プロトコル0)
	fd, err := unix.Socket(unix.AF_INET, unix.SOCK_STREAM, 0)
	if err != nil {
		return fmt.Errorf("ソケット生成失敗: %v", err)
	}
	// Startメソッド終了時に必ずソケットをクローズする
	defer unix.Close(fd)

	// ポート番号をデフォルトで8080にしておく
	port := 8080

	// s.addrが":8080"のような形なら ":8080"[1:] → "8080" となり、ポート番号を整数に変換
	if strings.HasPrefix(s.addr, ":") {
		p, err := strconv.Atoi(s.addr[1:])
		if err == nil {
			port = p
		}
	}

	// ソケットアドレス (IPv4, ポート=port) を作成
	sa := &unix.SockaddrInet4{Port: port}
	copy(sa.Addr[:], []byte{0, 0, 0, 0}) // 0.0.0.0 にバインド(全てのインターフェースで待ち受け)

	// ソケットに対してバインドを行う
	err = unix.Bind(fd, sa)
	if err != nil {
		return fmt.Errorf("バインド失敗: %v", err)
	}

	// ソケットをリッスン状態にする
	err = unix.Listen(fd, 10) // 第二引数はバックログ(保留中の接続のキューサイズ)
	if err != nil {
		return fmt.Errorf("リッスン失敗: %v", err)
	}

	// ログ出力: サーバが起動して特定アドレスでリッスンを開始したことを知らせる
	log.Printf("myhttpサーバ: %s でリッスン開始", s.addr)

	for {
		// クライアントからの接続を待ち受ける(ブロッキング)
		newFd, clientAddr, err := unix.Accept(fd)
		if err != nil {
			// 失敗したらログを出し、ループの先頭に戻って次の接続待ちへ
			log.Printf("Accept失敗: %v", err)
			continue
		}
		// 接続を受け付けたら、その処理を別のゴルーチンで実行する
		go s.handleConnection(newFd, clientAddr)
	}
}
```
ここでは `Listen` の第二引数に与えている 10 はバックログと呼ばれ, 接続待ちキューのサイズを表している. そして `Accept` で得られた新しいソケットディスクリプタは, `handleConnection` にゴルーチンで渡され, 並行に処理が行われる.

---

### 4. handleConnection: リクエスト読み込みとルータ呼び出し

`handleConnection` は, 単一のクライアント接続に対する処理を行う. ソケットからデータを読み込み, 文字列として取り出した後, `parseRequest` を使って HTTPリクエストとしてパースする. パースに失敗すれば, そのまま終了してしまう（ここでは簡易的にエラーログを出している）. パースに成功すれば, そこから新しい `Context` を作り, ルータ (`s.router.Handle`) へ委譲する. ハンドラがレスポンス情報を埋め込んだ後に, `buildResponse` で最終的なHTTPレスポンス文字列を組み立て, クライアントに返す.
```go
// handleConnectionは単一接続について，リクエストをパースしRouter.Handleでハンドラを呼び出し，レスポンスを送る
func (s *Server) handleConnection(newFd int, clientAddr unix.Sockaddr) {
	// この関数を抜けるときに必ずソケットをクローズしてリソースを開放
	defer unix.Close(newFd)

	// バッファを用意して、ソケットからの受信データを読み込む
	buf := make([]byte, 4096)
	n, err := unix.Read(newFd, buf)
	if err != nil || n <= 0 {
		log.Printf("読み込みエラーまたはデータなし")
		return
	}

	// 受信データを文字列として取り出す
	reqData := string(buf[:n])

	// 受信データをログに出力（デバッグ用）
	log.Printf("受信データ:\n%s", reqData)

	// 受信したデータを parseRequest でパースして Request 構造体に落とし込む
	req, err := parseRequest(reqData)
	if err != nil {
		// リクエストとして成立していない場合はエラーをログに出して終了
		log.Printf("HTTPリクエストパース失敗: %v", err)
		return
	}

	// Request構造体から Context を作り、そこに必要な情報を格納
	c := newContext(req)

	// Routerに処理を委譲し、登録されている対応するハンドラを実行してもらう
	s.router.Handle(c)

	// ハンドラがセットしたレスポンス情報をHTTPレスポンス文字列に組み立て
	respStr := buildResponse(c)

	// 組み立てたレスポンス文字列をソケットに書き出す
	_, _ = unix.Write(newFd, []byte(respStr))
}
```
---

### 5. Request構造体と parseRequest: 生の文字列からの解析

`parseRequest` は, ソケットから受け取った生のHTTPリクエスト文字列を解析し, Request構造体を返す. リクエストライン（例: "GET / HTTP/1.1"）をスペース区切りで分割してメソッドとパスを取り出し, 続いてヘッダを ":" 区切りで取得する. Content-Length が見つかった場合には, その長さに応じてボディ部分を抜き出す.
```go
// RequestはparseRequest用のHTTPリクエスト一時構造体
type Request struct {
	Method  string            // HTTPメソッド (GET, POST等)
	Path    string            // パス (/, /users 等)
	Headers map[string]string // ヘッダ (content-length, content-type等) を小文字化して保持
	Body    []byte            // ボディの生データ
}

// parseRequestは生のHTTPリクエスト文字列を解析してRequestを返す
func parseRequest(data string) (*Request, error) {
	// \r\n で行に分割
	lines := strings.Split(data, "\r\n")
	if len(lines) < 1 {
		return nil, fmt.Errorf("空リクエスト")
	}

	// 最初の行はリクエストライン(例: "GET / HTTP/1.1")
	requestLine := lines[0]
	// リクエストラインをスペース区切りで分割 (例: ["GET", "/", "HTTP/1.1"])
	parts := strings.Split(requestLine, " ")
	if len(parts) < 2 {
		return nil, fmt.Errorf("不正なリクエストライン: %s", requestLine)
	}

	// メソッドとパスを取り出し
	method := parts[0]
	path := parts[1]

	// ヘッダーを格納するマップを初期化
	headers := make(map[string]string)
	var i int

	// 2行目以降を走査してヘッダー部を取得する
	for i = 1; i < len(lines); i++ {
		line := lines[i]
		if line == "" {
			// 空行が出現したら、そこがヘッダーとボディの境目
			i++
			break
		}
		// ヘッダは "HeaderName: value" の形式なので ":" で分割
		headerParts := strings.SplitN(line, ":", 2)
		if len(headerParts) == 2 {
			k := strings.TrimSpace(headerParts[0]) // ヘッダ名
			v := strings.TrimSpace(headerParts[1]) // ヘッダの値
			// 全て小文字化したキーにして保持
			headers[strings.ToLower(k)] = v
		}
	}

	// ボディを読み取るための変数
	var body []byte

	// Content-Length があれば、その長さ分ボディを取得する
	if cl, ok := headers["content-length"]; ok {
		length, err := strconv.Atoi(cl)
		if err != nil {
			return nil, fmt.Errorf("Content-Length が無効です: %v", cl)
		}
		if length > 0 {
			// 残りの行を\r\nで再連結し、ボディ全体を取得
			bodyLines := strings.Join(lines[i:], "\r\n")
			if len(bodyLines) < length {
				// ボディのサイズが想定よりも小さい場合はエラー
				return nil, fmt.Errorf("ボディが不完全です。期待値: %d, 実際: %d", length, len(bodyLines))
			}
			// 指定のlengthバイト分だけボディを切り出す
			body = []byte(bodyLines[:length])
		}
	}

	// パース結果をRequest構造体にまとめて返す
	return &Request{
		Method:  method,
		Path:    path,
		Headers: headers,
		Body:    body,
	}, nil
}
```
ここでは, ヘッダ名を小文字化してマップのキーにしているため, 大文字と小文字を区別せずに取り扱うことができる. HTTPのヘッダは通常大小文字を区別しないため, こうした処理が行われている.

---

### 6. buildResponse: Contextをもとにレスポンス文字列を生成

最後に, ハンドラによって設定されたステータスコードやボディを, 実際にクライアントに送るHTTPレスポンス文字列に仕上げるのが `buildResponse` 関数である. ステータスライン（"HTTP/1.1 200 OK"など）を取得した後, `Connection: close` や `Content-Length` などを付与し, 全体を "\r\n" 区切りでまとめる. これにより, HTTP1.1プロトコルで期待される形式のレスポンスが完成する.
```go
// buildResponseはContextからHTTPレスポンス文字列を生成する
func buildResponse(c *Context) string {
	// ステータスライン(例: "HTTP/1.1 200 OK")
	statusLine := c.StatusCode()

	// レスポンスヘッダにConnection=close とContent-Lengthを付与
	c.respHeaders["Connection"] = "close"
	c.respHeaders["Content-Length"] = strconv.Itoa(len(c.respBody))

	// ヘッダの文字列を"\r\n"で連結して組み立て
	headerStr := ""
	for k, v := range c.respHeaders {
		headerStr += fmt.Sprintf("%s: %s\r\n", k, v)
	}

	// ステータスライン + ヘッダ + 空行 + ボディ という形式
	return statusLine + "\r\n" + headerStr + "\r\n" + string(c.respBody)
}

```
---
以上のコードによって, TCPレベルのソケット操作からHTTPリクエストの解析, レスポンスの組み立てまでを一貫して行う, 簡易的なHTTPサーバが構築される. Routerによるシンプルなルーティング機能を備えつつ, Contextでレスポンス内容を柔軟に操作できる点が特徴的である. また, Unixシステムコールの呼び出しを直接利用しているため, ソケットプログラミングの基礎的な流れ（bind, listen, accept など）を学ぶ手がかりにもなる.  
上記がmyhttpパッケージであり，TCPソケットレベルの動作とHTTPパース，加えて「まるでGin/EchoのようなRouter, RouteHandler, Context」を定義し，server.goにはルーティングロジックを記述するだけで済む形にしている. 次にserver.goを示す.

# GoでのWebサーバーの作成
ここに関してはあまり詳しく説明しないが，ginやechoを使っているような感覚でserver.goを使ってAPIを作成する．
```main.go  
package main

import (
	"fmt"
	"myhttp/server"
	"log"
)

// main関数ではserver.NewRouter()を作り，エンドポイントを登録してmyhttp.NewServer(":8080", router)を起動するだけ
func main() {
	router := server.NewRouter()

	// GET / で「Hello World」と返す
	router.GET("/", func(c *server.Context) {
		c.String(200, "Hello World")
	})

	// POST / で {"data":"文字列"}が送られてきたら"Hello 文字列"
	router.POST("/", func(c *server.Context) {
		type ReqData struct {
			Data string `json:"data"`
		}
		var rd ReqData
		err := c.BindJSON(&rd)
		if err != nil {
			c.String(400, "Invalid JSON: "+err.Error())
			return
		}
		c.String(200, fmt.Sprintf("Hello %s", rd.Data))
	})

	// サーバを起動
	srv := server.NewServer(":8080", router)
	err := srv.Start()
	if err != nil {
		log.Fatalf("サーバ起動失敗: %v", err.Error())
	}
}
```

# TypeScriptでのクライアント側の実装

最後に，client.tsで実際にHTTPリクエストを送る例を示す. Node.js環境でfetchまたはnode-fetchを利用する. バージョンによってはimport fetch from "node-fetch"が必要.

```bash
mkdir fetch-example
cd fetch-example
```

```bash
npm init -y
npm install typescript ts-node --save-dev
npm install node-fetch
npx tsc --init
```
```package.json
{
  "name": "client",
  "version": "1.0.0",
  "main": "client.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  },
  "dependencies": {
    "node-fetch": "^3.3.2"
  }
}

```

```tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}

```

```bash
touch client.ts
```

```client.ts  
import fetch from "node-fetch";

(async () => {
    try {
        // GETリクエスト
        console.log("GET /");
        const respGet = await fetch("http://localhost:8080/");
        const textGet = await respGet.text();
        console.log("GET response:", textGet);

        // POSTリクエスト
        console.log("POST /");
        const respPost = await fetch("http://localhost:8080/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: "hogehoge" }),
        });
        const textPost = await respPost.text();
        console.log("POST response:", textPost);

    } catch (err) {
        console.error("Client error:", err);
    }
})();
```

# 自作HTTP通信の実行手順

**1. serverディレクトリに移動して以下のコマンドを実行する**
```bash
go run server.go
```
実行結果
```
"myhttpサーバ: :8080 でリッスン開始"
```

**2. clientディレクトリで以下のコマンドを実行する**
```bash
npx tsc
node dist/client.js
```
実行結果
```
GET /
GET response: Hello World
POST /
POST response: Hello hogehoge
```
---
以上で，Go言語による完全自作HTTPサーバと，TypeScriptクライアントでの通信が確認できる. TCPレイヤを自前で扱い，HTTPメッセージをパース・レスポンスする部分をmyhttpパッケージにまとめることで，main.goは純粋にルーティングとレスポンスロジックのみを記述できるようになる. これはGin/EchoなどのWebフレームワークを使うのに近い感覚だが，内部実装はsyscallレベルでbindやlistenを行っている. 学習目的や特殊要件でHTTPを自作したい場合に参考になるでしょう.

> なお本番運用では，安全かつ機能豊富なnet/httpやTLS対応などを使うほうがいいに決まってます．


