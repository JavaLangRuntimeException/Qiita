---
title: C#チートシート
tags:
  - C#
  - プログラミング
private: false
updated_at: '2025-04-20T23:29:36+09:00'
id: 7849b32bc223d4aa0247
organization_url_name: null
slide: false
ignorePublish: false
---
皆さんC# 書いたことありますか？Web開発(.NET)やUnity(ゲームやXR開発)で見たことあるはず？だと思います．私の意見ですが諸学者にも向いているし，用途も多いので初めて学ぶ言語にはふさわしいのではないかなと思います．
本記事ではC#の基本的な文法やデータ型，条件分岐，繰り返し処理，配列操作などをまとめていきます．

# 他のチートシート
git/gh コマンド(gitコマンド以外にもgitの概念も書いてあります)

https://qiita.com/JavaLangRuntimeException/items/6b46551f56e0def76eba

lazygit

https://qiita.com/JavaLangRuntimeException/items/42087d09728d5739d73d

Docker コマンド(dockerコマンド以外にもdockerの概念の記事へのリンクもあります)

https://qiita.com/JavaLangRuntimeException/items/21f7c7bf3d143f821697

ステータスコード

https://qiita.com/JavaLangRuntimeException/items/ab1bc7b976ed2dfad91c

TypeScript

https://qiita.com/JavaLangRuntimeException/items/5894391c08e0d8e28389

Go/Gorm

https://qiita.com/JavaLangRuntimeException/items/d388717fc1436bc3ec9d

Ruby・Ruby on Rails

https://qiita.com/JavaLangRuntimeException/items/42d935cf92c212f1c7ec

SQL

https://qiita.com/JavaLangRuntimeException/items/f038fbaccdd92fb0308a

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

GitHub API

https://qiita.com/JavaLangRuntimeException/items/ab1bc7b976ed2dfad91c

変数・関数(メソッド)・クラス命名規則

https://qiita.com/JavaLangRuntimeException/items/b93865c448f69bcfca4a

# 他のシリーズ記事
**チートシート**
様々な言語，フレームワーク，ライブラリなど開発技術の使用方法，基本事項，応用事例を網羅し，手引書として記載したシリーズ

https://qiita.com/JavaLangRuntimeException/items/f038fbaccdd92fb0308a

> git/gh，lazygit，docker，vim，typescript，プルリクエスト/マークダウン，ステータスコード，ファイル操作，OpenAI AssistantsAPI，Ruby/Ruby on Rails のチートシートがあります．以下の記事に遷移した後，各種チートシートのリンクがあります.

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

**Project Gopher: Unlocking Go’s Secrets**
Go言語や標準ライブラリの深掘り調査レポート

https://qiita.com/JavaLangRuntimeException/items/dc45b412d3fbd2ccb9e8

**Gopher’s Journey: Exploring TCP Protocol**
Goを用いてTCPプロトコルを探求 & 作成するシリーズ

https://qiita.com/JavaLangRuntimeException/items/38091220106d86651d2b

# C#の概要と歴史
C#はMicrosoftによって開発されたオブジェクト指向プログラミング言語である．初めて発表されたのは2000年代初頭であり，その後.NET Frameworkの中核をなす言語として進化してきた．C#はJavaやC++などの技術を参考にし，安全性と生産性を重視して設計されている．

# C#を学ぶ意義
C#はWindowsアプリケーションやWebアプリケーション，ゲーム開発（Unity），XR開発(VR，AR，MRといったメタバース)など様々な分野で活用される言語である．豊富なライブラリや最新の機能拡張が提供されており，初学者からプロフェッショナルまで幅広く利用されている．

# C#とJavaの関係性
C#とJavaは共にオブジェクト指向言語であり，文法や設計思想に多くの類似点が見受けられる．ここでは，それぞれの言語で同様の処理を実現するコード例を示す．

以下はC#における例で，CalculatorクラスのSquareメソッドが整数の二乗を返す実装である．
```cs
using System;
namespace RelationshipExample {
    class Calculator {
        public int Square(int x) {
            return x * x;
        }
    }
    class Program {
        static void Main() {
            Calculator calc = new Calculator();
            Console.WriteLine("Square of 5 in C#: " + calc.Square(5));
        }
    }
}
```
一方，Javaの例では，ほぼ同様の設計思想に基づきCalculatorクラスで整数の二乗を計算するメソッドを実装している．
```java
public class Calculator {
    public int square(int x) {
        return x * x;
    }
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("5の2乗は: " + calc.square(5));
    }
}
```
# C#とCの概念
C#はC言語のシンプルな構文を継承しつつ，オブジェクト指向や安全なメモリ管理機能を追加している．ここでは，C言語とC#の代表的なコード例を比較する．

## C言語の例
C言語では，変数の宣言や標準入出力関数を用いた基本的なプログラムが以下のように実装される．
```c
#include <stdio.h>
int main() {
    int number = 10;
    printf("Number in C: %d\n", number);
    return 0;
}
```
## C#の例
C#では，同様の処理をクラス内のMainメソッドとして記述し，型安全性や例外処理が強化されている．
```cs
using System;
class Program {
    static void Main() {
        int number = 10;
        Console.WriteLine("Number in C#: " + number);
    }
}
```

# C#の実行方法
C#のプログラムは，Visual StudioやVisual Studio CodeなどのIDEを用いて開発されることが一般的である．また，.NET CoreやMonoなどのランタイム環境を利用することで，クロスプラットフォームでの実行が可能である．
本記事では.NET CLIを用いた実行方法を紹介する．

## .NETのインストール
[.NETのダウンロードページ](https://dotnet.microsoft.com/ja-jp/)で最新の.NET SDKをダウンロードし，インストールする．またはMac(Linux)の場合は以下のコマンドを用いてインストールすることも可能である．

**wgetを使う場合**
```bash
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh
```

**homebrewを使う場合**
```bash
brew update
brew install --cask dotnet-sdk
```

## .NET CLIで実行
以下のコマンドを用いてC#のプログラムを実行することができる．
```bash
dotnet new console -n HelloWorldApp
cd HelloWorldApp
```
これで以下のコマンドを実行するとこのような実行結果になる．
```bash
ls
```
```md:実行結果
HelloWorldApp.csproj Program.cs           obj
```
Program.csを除くと以下のようになっている
```Program.cs
// See https://aka.ms/new-console-template for more information                                                                                          
Console.WriteLine("Hello, World!");
```
これは以下のコマンドで実行できる
```bash
dotnet run
```
実行結果は以下のようになっている．
```bash
Hello, World!
```

## .NET のProject
```bash
dotnet new console -n HelloWorldApp
```
新しいコンソールアプリケーションプロジェクトを作成し，HelloWorldApp というディレクトリにテンプレートファイル（HelloWorldApp.csproj と初期設定済みの Program.cs）が生成される．
`HelloWorldApp.csproj`の中身は以下のようになっている.
これはMSBuild形式のプロジェクトファイルで，ターゲットフレームワークや出力形式，暗黙的な using の有効化など各種設定が記述されている．
```HelloWorldApp.csproj
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>
```
このcsprojがあるディレクトリ`dotnet run`を実行すると，`Program.cs`がビルドされて実行される．

:::note info
**スクリプトのみで実行する方法**
```bash
dotnet tool install -g dotnet-script
export PATH="$PATH:$HOME/.dotnet/tools"
```
`dotnet script`を実行することで，C#のスクリプトを直接実行できるようになる．
```bash
dotnet script Program.cs
```
:::

# C#の基本文法
C#はクラス，メソッド，変数，条件分岐，繰り返し処理などの構成要素から成り立っている．各要素は厳格な型定義のもとで利用され，エラーを未然に防ぐための仕組みが整備されている．シンプルな文法でありながらも，柔軟な拡張性があるのが特徴である．

## Helloworldプログラム
以下はC#における「Hello, World」を表示する基本的なプログラム例である．
```cs
using System;
namespace HelloWorldApp {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, World．");
        }
    }
}
```
### C#の記法構造
C#のプログラムは，以下の主要な要素で構成される．

1. **Usingディレクティブ**  
   他の名前空間に定義されたクラスや型を利用するための宣言である．例えば，`using System;` と記述することで，System名前空間内のクラス（Consoleなど）を使用できるようになる．

2. **名前空間（Namespace）の宣言**  
   プログラム内でクラスやその他の型を論理的にグループ化し，名前の衝突を防ぐために用いられる．  
   例:
   ```cs
   namespace SampleApp {
       // クラスやその他の型の定義
   }
    ```

3. **クラスの定義**  
   C#はオブジェクト指向言語であり，プログラムの主要な機能はクラス内に定義される．クラスは属性（フィールド）と処理（メソッド）をまとめるための設計図である．

4. **メソッド**  
   クラス内に実際の処理を書くための関数であり，その中でもエントリーポイントとなる `Main` メソッドは，プログラム実行時に最初に呼ばれる特殊なメソッドである．

5. **Mainメソッド**
    - プログラムの始点となるメソッドで，`static` として定義される．
    - 一般的に引数として `string[] args` （コマンドライン引数）を受け取る．
    - 例:
         ```cs
         static void Main(string[] args) {
          // 実行される処理
         }
         ```

## C#における変数とは
変数はデータを格納するための名前付きメモリ領域を表す概念である．C#では各変数に対して明確なデータ型を指定する必要があり，コンパイル時に型チェックが行われる．

## データ型を定義して変数宣言
C#では基本的なデータ型が予め定義されており，それに基づいて変数を宣言する．以下の例は各種データ型の変数宣言例である．
```cs
int number = 10;
double pi = 3.14;
string message = "Hello, C#";
bool isValid = true;
```
以下にデータ型の一覧を示す．
| データ型 | カテゴリ | 説明 |
|----------|----------|-------------------------------------------------------------|
| bool     | 値型     | 真偽値真（true）または偽（false）を表す                 |
| byte     | 値型     | 8ビットの符号なし整数範囲は 0 ～ 255                        |
| sbyte    | 値型     | 8ビットの符号付き整数範囲は -128 ～ 127                      |
| char     | 値型     | Unicode 文字を表す 16 ビットの文字型                         |
| decimal  | 値型     | 128ビットの高精度浮動小数点数金融計算など，精度が求められる場合に利用|
| double   | 値型     | 64ビットの倍精度浮動小数点数                                  |
| float    | 値型     | 32ビットの単精度浮動小数点数                                  |
| int      | 値型     | 32ビットの符号付き整数                                        |
| uint     | 値型     | 32ビットの符号なし整数                                        |
| long     | 値型     | 64ビットの符号付き整数                                        |
| ulong    | 値型     | 64ビットの符号なし整数                                        |
| short    | 値型     | 16ビットの符号付き整数                                        |
| ushort   | 値型     | 16ビットの符号なし整数                                        |
| nint     | 値型     | ネイティブサイズの符号付き整数（C# 9.0以降）                   |
| nuint    | 値型     | ネイティブサイズの符号なし整数（C# 9.0以降）                   |
| object   | 参照型   | 全てのデータ型の基本クラス                                    |
| string   | 参照型   | 文字列を表す，変更不可（イミュータブル）なオブジェクト          |
| dynamic  | 参照型   | 実行時に型が決定される動的型|

## 列挙型
列挙型は関連する定数群を扱うためのデータ型である．コードの可読性向上や定数管理の効率化に貢献するため，システム全体の品質向上に寄与する．以下に列挙型の定義例を示す．
```cs
enum Days {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
```
## 演算記号
C#では算術演算子（+，-，*，/），論理演算子（&&，||，!），および代入演算子（=，+=，-=）など多彩な演算記号が用意されている．これらは数値計算，条件判定，データ操作に不可欠な要素である．

## 比較演算子の使い方
比較演算子は値の大小や等価性を判定するために利用される．一般的な比較演算子としては，==，!=，<，>，<=，>=があり，条件分岐の基礎となる．例えば，以下の例では条件判定により処理を分岐している．
```cs
int a = 5;
int b = 10;
if (a < b) {
    Console.WriteLine("aはbより小さい．");
}
```
## 配列
配列は複数の同一型のデータを格納するためのデータ構造である．配列の各要素はインデックス番号を用いてアクセスされ，ランダムアクセスが容易に実現できる点が特徴である．

### 配列の宣言と初期化
C#では配列を宣言する際に，配列の型とサイズまたは初期値を指定する必要がある．以下に宣言と初期化の例を示す．
```cs
int[] numbers = new int[] {1, 2, 3, 4, 5};
string[] fruits = {"apple", "banana", "cherry"};
```
### 配列要素へのアクセスと条件付き処理
配列の各要素にはインデックスを用いてアクセスする．また，条件分岐と組み合わせることで，特定条件を満たす要素だけを対象とした処理が可能である．以下は偶数を抽出する処理例である．
```cs
int[] numbers = {1, 2, 3, 4, 5, 6};
for (int i = 0; i < numbers.Length; i++) {
    // インデックスはこのiのことをいいます
    if (numbers[i] % 2 == 0) {
        Console.WriteLine(numbers[i] + "は偶数である．");
    }
}
```
### 配列のフィルタリングと新しい配列の作成
LINQを利用することで，配列のフィルタリング処理が容易に実現できる．条件に一致する要素のみを抽出し，新たな配列として生成することが可能である．以下にLINQを用いた例を示す．
```cs
using System.Linq;
int[] numbers = {1, 2, 3, 4, 5, 6};
int[] evenNumbers = numbers.Where(x => x % 2 == 0).ToArray();
```
### 配列要素の追加と削除
C#の基本配列は固定長であるため，動的な要素の追加や削除にはListやその他のコレクションを用いるのが一般的である．以下はListを利用した例である．
```cs
using System.Collections.Generic;
List<int> numberList = new List<int>() {1, 2, 3};
numberList.Add(4);
numberList.Remove(2);
```
### 配列の並べ替え
配列の並べ替えにはArray.Sortメソッドが利用できる．簡単な記述で昇順または降順へのソートが実現できるため，非常に便利である．以下は昇順へのソート例である．
```cs
int[] numbers = {3, 1, 4, 1, 5};
Array.Sort(numbers);
```
### 二次元配列
二次元配列は行と列の概念を持つ配列であり，行列データの保持に適している．添字を二つ用いることで，各要素へのアクセスが可能である．

#### 二次元配列の処理
二次元配列は多重ループを用いることで，各要素に対して処理を行うことができる．以下は，行列を初期化し，各要素を出力する例である．
```cs
int[,] matrix = new int[2,3] {
    {1, 2, 3},
    {4, 5, 6}
};
for (int i = 0; i < matrix.GetLength(0); i++) {
    for (int j = 0; j < matrix.GetLength(1); j++) {
        Console.Write(matrix[i, j] + " ");
    }
    Console.WriteLine();
}
```
### 連想配列
連想配列はキーと値のペアでデータを管理するデータ構造であり，C#ではDictionaryクラスを用いて実現される．高速な検索と柔軟なデータ管理が可能である．以下に連想配列の例を示す．
```cs
using System.Collections.Generic;
Dictionary<string, int> ages = new Dictionary<string, int>() {
    {"Alice", 30},
    {"Bob", 25}
};
Console.WriteLine("Aliceの年齢は" + ages["Alice"] + "である．");
```
### 配列操作できる便利関数
C#では，各種の配列操作関数が用意されており，配列の操作を非常に効率的に行うことができる．以下に主要な便利関数とそのコード例を示す．

#### Array.Sort
配列の要素を昇順にソートする関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
Array.Sort(numbers);
for (int i = 0; i < numbers.Length; i++) {
    Console.Write(numbers[i] + " ");
}
Console.WriteLine();
```
#### Array.Reverse
配列の要素を逆順に並べ替える関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
Array.Reverse(numbers);
for (int i = 0; i < numbers.Length; i++) {
    Console.Write(numbers[i] + " ");
}
Console.WriteLine();
```
#### Array.IndexOf
指定した値が最初に出現する位置のインデックスを返す関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
int index = Array.IndexOf(numbers, 8);
Console.WriteLine("Index of 8: " + index);
```
#### Array.Find
条件を満たす最初の要素を検索する関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
int found = Array.Find(numbers, x => x > 5);
Console.WriteLine("First number greater than 5: " + found);
```
#### Array.FindAll
条件を満たすすべての要素を含む新たな配列を生成する関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9, 10};
int[] foundAll = Array.FindAll(numbers, x => x > 5);
Console.WriteLine("Numbers greater than 5:");
foreach (int num in foundAll) {
    Console.Write(num + " ");
}
Console.WriteLine();
```
#### Array.Clear
配列の指定した範囲の要素を既定値で初期化する関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
Array.Clear(numbers, 1, 3);
Console.WriteLine("After Clear:");
foreach (int num in numbers) {
    Console.Write(num + " ");
}
Console.WriteLine();
```
#### LINQ: Max と Min
LINQの拡張メソッドを用いて配列の最大値と最小値を取得する．
```cs
using System.Linq;
int[] numbers = {5, 3, 8, 1, 9};
int max = numbers.Max();
int min = numbers.Min();
Console.WriteLine("Max: " + max + ", Min: " + min);
```
#### LINQ: Sum と Average
LINQの拡張メソッドを用いて配列の合計値と平均値を算出する関数である．
```cs
using System.Linq;
int[] numbers = {5, 3, 8, 1, 9};
int sum = numbers.Sum();
double avg = numbers.Average();
Console.WriteLine("Sum: " + sum + ", Average: " + avg);
```
#### JavaScript(TypeScript)のような配列操作関数はある？？
C#の配列そのものはJavaScriptのArrayのように多機能なビルトインメソッドをすべて持っているわけではないが，LINQ（Language Integrated Query）やList<T>などのコレクションを利用することで，JavaScriptで一般的に使われるメソッドと同等の操作が実現可能である．

例えば，JavaScriptでは以下のような配列操作が行われる．
```js
const numbers = [1, 2, 3, 4, 5];
// filterメソッド - 偶数のみ抽出
const evens = numbers.filter(x => x % 2 === 0);
// mapメソッド - 各要素を2倍にする
const doubled = numbers.map(x => x * 2);
// reduceメソッド - 合計値の算出
const sum = numbers.reduce((acc, x) => acc + x, 0);
```
これと同様の処理はC#ではLINQの拡張メソッドを利用して実現できる．以下にC#でのコード例を示す．
```cs
using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        int[] numbers = {1, 2, 3, 4, 5};

        // Whereメソッドで偶数のみ抽出（JavaScriptのfilterに相当）
        var evens = numbers.Where(x => x % 2 == 0);
        Console.WriteLine("偶数:");
        foreach (var n in evens) {
            Console.Write(n + " ");
        }
        Console.WriteLine();

        // Selectメソッドで各要素を2倍にする（JavaScriptのmapに相当）
        var doubled = numbers.Select(x => x * 2);
        Console.WriteLine("各要素を2倍にした結果:");
        foreach (var n in doubled) {
            Console.Write(n + " ");
        }
        Console.WriteLine();

        // Aggregateメソッドで合計値を算出（JavaScriptのreduceに相当）
        int sum = numbers.Aggregate(0, (acc, x) => acc + x);
        Console.WriteLine("合計: " + sum);

        // あるいは，List<T>を利用すると動的な操作も容易になる．
        List<int> numbersList = numbers.ToList();
        numbersList.Add(6);  // 要素の追加
        numbersList.Remove(1);  // 要素の削除
        Console.WriteLine("List<T>での操作結果:");
        foreach (int n in numbersList) {
            Console.Write(n + " ");
        }
        Console.WriteLine();
    }
}
```
このように，C#では直接配列にJavaScript同様のメソッドが実装されていなくとも，LINQの豊富な拡張メソッドを活用することで，同様の操作をシンプルかつ直感的に行うことができるのである．

## 条件分岐

### 1. if ... else文
if ... else文は, 条件に応じて処理を分岐する基本的な構文である, 条件がtrueの場合はif節の処理を実行し, そうでなければelse節の処理を実行するものである.
```cs
int score = 85;  
if (score >= 60) {  
    Console.WriteLine("合格");  
}  
else {  
    Console.WriteLine("不合格");  
}
```
### 2. switch文
switch文は, 特定の変数の値に基づいて複数の分岐を実行する構文である, 各case節に応じた処理を行い, break文でswitchブロックから抜け出すのが通常である.
```cs
int day = 3;  
switch (day) {  
    case 1:  
        Console.WriteLine("月曜日");  
        break;  
    case 2:  
        Console.WriteLine("火曜日");  
        break;  
    case 3:  
        Console.WriteLine("水曜日");  
        break;  
    default:  
        Console.WriteLine("その他の曜日");  
        break;  
}
```
### 3. 条件演算子 (?演算子)
条件演算子は, 三項演算子とも呼ばれ, 簡潔に条件分岐を表現するための構文である, (条件) ? 式1 : 式2 の形式で記述し, 条件がtrueの場合は式1が, falseの場合は式2が評価されるものである.
```cs
int a = 15, b = 20;  
string message = (a > b) ? "aはbより大きい." : "aはbより小さいまたは等しい.";  
Console.WriteLine(message);
```

### 4. 条件分岐のネストとは
条件分岐のネストとは, if文の内部にさらにif文等の条件文を配置し, 複雑な条件評価を実現する手法である, ただし過剰なネストは可読性を損なう恐れがあるため注意が必要である.
```cs
int temperature = 28;  
if (temperature > 25) {  
    Console.WriteLine("暑いである.");  
    if (temperature > 35) {  
        Console.WriteLine("非常に暑いである.");  
    }  
}  
else {  
    Console.WriteLine("涼しいである.");  
}
```
## 繰り返し処理

### 1. while文
while文は, 条件がtrueである限りループ内の処理を繰り返す構文である, ループ開始前に条件評価が行われるものである.
```cs
int i = 0;  
while (i < 5) {  
    Console.WriteLine("カウントは " + i + " である.");  
    i++;  
}
```
### 2. do ... while文
do ... while文は, ループ本体を必ず一度は実行し, その後条件評価を行う構文である, 最低1回の実行が保証されるものである.
```cs
int j = 0;  
do {  
    Console.WriteLine("繰り返し回数は " + j + " である.");  
    j++;  
} while (j < 5);
```

### 3. for文
for文は, 初期化, 条件評価, 更新式を一行に記述し, 決まった回数の繰り返し処理を行う構文である, 汎用的かつ制御しやすいループである.
```cs
for (int k = 0; k < 5; k++) {  
    Console.WriteLine("ループカウントは " + k + " である.");  
}
```
### 4. foreach文 (for ... in文に相当)
C#においてfor ... in文の役割を果たすのはforeach文である, 配列やコレクション内の各要素に対して順次処理を実施するための簡潔な構文である.
```cs
int[] numbers = { 10, 20, 30, 40, 50 };  
foreach (int num in numbers) {  
    Console.WriteLine("要素は " + num + " である.");  
}
```

### ループの途中で処理を止める方法

#### 1. break文の使用例
break文は, ループ内で特定の条件が成立した際にループを即時終了するために用いられる, 特に無限ループの対策として有用である.
```cs
int count = 0;  
while (true) {  
    Console.WriteLine("カウントは " + count + " である.");  
    count++;  
    if (count == 3) {  
        break;  
    }  
}
```
#### 2. continue文の使用例
continue文は, ループ内の現在の反復処理をスキップして次の反復に移行するために用いられる, 特定の条件下で不要な処理を飛ばす際に利用されるものである.
```cs
for (int m = 0; m < 5; m++) {  
    if (m == 2) {  
        continue;  
    }  
    Console.WriteLine("値は " + m + " である.");  
}
```
#### 無限ループとその対策
無限ループとは, ループの条件が常にtrueとなり, 終了しない状態を指す, 意図しない無限ループはプログラムのフリーズ等の原因となるため十分な注意が必要である.  
意図的に無限ループを利用する場合は, 内部にbreak文等の脱出条件を配置する対策が求められる.
```cs
int n = 0;  
while (true) {  
    Console.WriteLine("処理中のnは " + n + " である.");  
    n++;  
    if (n >= 5) {  
        break;  
    }  
}
```
### 関数について

#### 関数の定義方法
C#では, 関数はメソッドとしてクラス内部に定義される, 静的メソッドはインスタンス化せずに呼び出すことができるものである, 以下は二つの整数を加算する静的メソッドの例である.
```cs
public class Utility {
        public static int Add(int a, int b) {
            return a + b;
        }
    }
```
このように, メソッドは戻り値の型, メソッド名, 引数リストを指定して定義されるものである.

#### 高階関数
高階関数は, 関数を引数として受け取るまたは関数を戻り値として返す関数である, C#ではFunc, Action, Predicateなどのジェネリックデリゲートを利用して実現することができるものである.
```cs
public class HigherOrder {
        public static int ProcessOperation(int a, int b, Func<int, int, int> operation) {
            return operation(a, b);
        }
    }

// 使用例
    int result = HigherOrder.ProcessOperation(3, 4, (x, y) => x + y);
    Console.WriteLine(result);
```
この例では, 高階関数ProcessOperationが計算処理を委譲する形になっているものである.

#### イベントハンドリング
C#では, イベントハンドリングはデリゲートを基盤として実装される, イベントはオブジェクトから発生する通知であり, リスナーはそれに応答するメソッドである. 以下は簡単なボタンのクリックイベントの例である.
```cs
public class Button {
        public event Action Click;
        
        public void OnClick() {
            if (Click != null) {
                Click();
            }
        }
    }

public class Program {
        public static void Main(string[] args) {
            Button myButton = new Button();
            myButton.Click += () => {
                Console.WriteLine("ボタンがクリックされたである.");
            };
            myButton.OnClick();
        }
    }
```
この例では, ButtonクラスのClickイベントを利用し, ボタンがクリックされた際の動作を定義しているものである.

#### 関数のデフォルト引数と可変長引数
C#では, 関数のパラメータに初期値を設定することでデフォルト引数を実現し, 可変長引数はparamsキーワードを用いて定義するものである.
```cs
public class ParameterExample {
        // デフォルト引数の例
        public static void PrintMessage(string message, int repeat = 1) {
            for (int i = 0; i < repeat; i++) {
                Console.WriteLine(message);
            }
        }
        
        // 可変長引数の例
        public static int Sum(params int[] numbers) {
            int total = 0;
            foreach (int n in numbers) {
                total += n;
            }
            return total;
        }
    }
```
これにより, 呼び出し時に引数の省略が可能になり, 任意の数の引数を扱うことができるものである.

#### 関数のオプション引数と規定値
オプション引数は, デフォルト引数と同様に, 引数が渡されなかった場合に規定値を使用する方法である, C#では既にデフォルト引数として実装されているものである.
```cs
public class OptionalParameter {
        public static void DisplayInfo(string name, int age = 30) {
            Console.WriteLine("名前は " + name + " である, 年齢は " + age + " である.");
        }
    }
```
このように, 一部の引数を省略可能にすることができるものである.

#### 関数のオーバーロード
C#では, 同一クラス内でメソッド名が同一であるが, パラメータが異なるメソッドを定義することが可能であり, これを関数のオーバーロードと呼ぶものである.
```cs
public class OverloadExample {
        public static int Multiply(int a, int b) {
            return a * b;
        }
        
        public static double Multiply(double a, double b) {
            return a * b;
        }
    }
```
これにより, 引数の型に応じた適切なメソッドが選択されるものである.

#### 総称型(ジェネリクス関数)
総称型関数は, 汎用的な型を扱うことができるように定義された関数であり, これにより型の安全性と再利用性が大幅に向上するものである.
```cs
public class GenericsExample {
        public static T GetDefault<T>() {
            return default(T);
        }
    }
```
この例では, 任意の型に対応可能なジェネリック関数を定義しているものである.

#### クロージャー
クロージャーは, 外部の変数をキャプチャして利用する匿名関数のことであり, C#ではラムダ式を用いることで実現されるものである.
```cs
int offset = 10;
    Func<int, int> addOffset = x => x + offset;
    Console.WriteLine(addOffset(5));
```
この例では, 外部変数offsetをキャプチャしたラムダ式が定義され, 結果として15が出力されるものである.

### オブジェクト指向プログラミング（OOP）について
オブジェクト指向プログラミングは, データとその振る舞いをオブジェクトという単位でまとめて管理する手法であり, プログラムの構造を分かりやすく保守性を向上させるものである, C#はこの考え方を強力にサポートしているものである.

オブジェクト指向については以下の記事で説明しています

https://qiita.com/JavaLangRuntimeException/items/cadf49bb419076819963

> C#ではなくTypeScriptを使って説明しています...(ごめんなさい)


#### クラスとクラスの定義
クラスは, オブジェクトを生成するための設計図であり, 属性（フィールドやプロパティ）と動作（メソッド）を持つものである, C#ではclassキーワードを用いて定義されるものである.
```cs
public class Person {
        // プライベートフィールドで情報の隠蔽を実現するものである.
        private string name;
        
        // ゲッターとセッターとしてプロパティを定義するものである.
        public string Name {
            get { return name; }
            set { name = value; }
        }
        
        // コンストラクターの定義と使用例である.
        public Person(string name) {
            this.name = name;
        }
        
        // メソッド定義の例である.
        public void Greet() {
            Console.WriteLine("こんにちは, 私は " + name + " である.");
        }
        
        // メソッドのオーバーロード例である.
        public void Greet(string otherName) {
            Console.WriteLine(name + " は " + otherName + " に挨拶したである.");
        }
    }
```
このように, クラスはインスタンスごとの状態とその振る舞いを定義しているものである.

#### アクセス修飾子
アクセス修飾子は, クラスやそのメンバーの可視性を制限するためのものであり, 主にpublic, private, protected, internalの四種類が存在するものである, これにより情報の隠蔽が実現されるものである.

#### 静的メンバー
静的メンバーは, クラス自体に属し, インスタンス化しなくても利用可能なメンバーである, 静的フィールドや静的メソッドとして定義されるものである.
```cs
public class MathUtility {
        public static double PI = 3.14159;
        
        public static double Square(double x) {
            return x * x;
        }
    }
```
この例では, MathUtilityクラスは静的な定数とメソッドを提供しているものである.

#### 情報の隠蔽の実装
情報の隠蔽は, クラス内部のデータを直接外部に露出させず, プロパティやメソッドを通してアクセスさせることで実現されるものである, これによりクラス内部の整合性を保つことができるものである.

#### クラスの継承とメソッドのオーバーライド
継承は, 既存のクラスを基に新たなクラスを作成する手法であり, 基底クラスのメソッドを子クラスが再定義（オーバーライド）することが可能なものである, virtualキーワードとoverrideキーワードを用いるものである.
```cs
public class Animal {
        public virtual void Speak() {
            Console.WriteLine("動物の音を鳴らすである.");
        }
    }

public class Dog : Animal {
        public override void Speak() {
            Console.WriteLine("ワンワンである.");
        }
    }
```
この機能により, 共通の振る舞いはスーパークラスに集約し, 子クラスで個別の実装を行うことができるものである.

#### 抽象クラス
抽象クラスは, インスタンス化することができない基底クラスであり, 共通のインターフェースを提供するために用いられるものである, 抽象メソッドは派生クラスで必ず実装しなければならないものである.
```cs
public abstract class Shape {
        public abstract double GetArea();
    }

public class Circle : Shape {
        private double radius;
        
        public Circle(double radius) {
            this.radius = radius;
        }
        
        public override double GetArea() {
            return Math.PI * radius * radius;
        }
    }
```
この例では, Shapeクラスが共通の定義を行い, Circleクラスが具体的な面積計算を実装しているものである.

# .NETを使ったWebアプリケーション開発

ここからは.NETの概要説明からプロジェクトの作成，Dockerfileおよびdocker-compose.ymlを使ってWebアプリをコンテナ上で実行する手順までを説明する．

---

## 1. .NETの概要

.NETは，Microsoftが開発したクロスプラットフォーム対応のフレームワーク
.NET Coreの発展版である最新の.NETは，Windows，macOS，Linux上で動作し，以下の特徴を持っている

- **多言語対応**: C#, F#, VB.NETなど複数のプログラミング言語をサポート
- **高パフォーマンス**: 最適化されたランタイムにより高速な処理を実現
- **豊富なライブラリ**: ASP.NET Core，Entity Framework Coreなど，WebアプリやAPI開発に必要なライブラリが充実
- **クロスプラットフォーム**: OSに依存せず，同じコードベースで複数のOS上で動作可能

## 2. Webアプリケーションプロジェクトの作成

### 2.1. .NET SDKのインストール

まず，.NET SDKがインストールされていることを確認します．  
インストールされていない場合は，[.NETの公式サイト](https://dotnet.microsoft.com/)から最新のSDKをダウンロードしてインストールすること

### 2.2. プロジェクト作成

以下のコマンドを使用して，ASP.NET Core Web APIプロジェクト（例としてWeb APIテンプレート）を作成する
```bash
dotnet new webapi -n MyWebApp
cd MyWebApp
```
このコマンドにより，`MyWebApp`という名前のディレクトリが作成され，基本的なWeb APIのサンプルコードが生成される

### 2.3. プロジェクトの動作確認

作成したプロジェクトが正しく動作するか確認するため，以下のコマンドを実行する．
```bash
dotnet run
```

起動後，ブラウザで http://localhost:5286/weatherforecast にアクセスして，APIのエンドポイントが正常に動作していることを確認すると

```bash
[{"date":"2025-04-07","temperatureC":-2,"summary":"Hot","temperatureF":29},{"date":"2025-04-08","temperatureC":40,"summary":"Bracing","temperatureF":103},{"date":"2025-04-09","temperatureC":10,"summary":"Sweltering","temperatureF":49},{"date":"2025-04-10","temperatureC":37,"summary":"Scorching","temperatureF":98},{"date":"2025-04-11","temperatureC":19,"summary":"Balmy","temperatureF":66}]
```

### 2.4. サンプルで作成されたProgram.csの中身
サンプルとして生成されるProgram.csの中身はASP.NET Core のミニマル API を採用して Web サービスを構築するものになっている．まず，引数を受け取りビルダーを作成し，OpenAPI 用のサービスを登録する処理が行われる．ビルダーから作成されたアプリケーションオブジェクトに対して，開発環境下では OpenAPI エンドポイントをマッピングし，HTTPS リダイレクトを有効化する．次に，天気予報情報を生成する GET エンドポイント（「/weatherforecast」）が定義され，ランダムな値によって複数の天気予報データが生成される．最後に，Run メソッドを呼び出すことで，Web サービスとして起動される．
```cs
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

## 3. Clean Architectureとドメイン駆動設計でのWebAPI実装〜CRUD操作のサンプル〜

ここからは，.NET 9.0を用いて，ドメイン層，インフラストラクチャ層，ユースケース層，およびハンドラー層により，それぞれの責務を明確に分割したWebAPIの実装例を示すである．  
本例では，MySQLをデータベースとして用い，Entity Framework CoreをORMとして利用することで，実際のデータベース接続も行うである．
ここからは2.で作成したWebアプリケーションプロジェクトに対して，ドメイン駆動設計に基づくCRUD操作の実装を行う．

:::note info
**Clean Architectureおよびドメイン駆動設計に基づくWebAPIの実装での各層の説明**

- ドメイン層
ドメイン層は，エンティティやビジネスルールを定義する層．ここでは，ドメインモデルを中心に設計し，CRUD操作を抽象化するためのリポジトリのインターフェースを定義することで，ビジネスロジックを技術的な制約から独立させることができる．

- インフラストラクチャ層
インフラストラクチャ層は，実際のデータベース接続や外部システムとの連携を担う層．たとえば，PostgreSQLとの接続やSQLクエリの実行処理を，ドメイン層で定義されたインターフェースに基づいて実装するこれにより，データアクセスの技術的な実装詳細がドメインロジックから分離される

- ユースケース層（アプリケーション層）
ユースケース層は，ドメインおよびインフラストラクチャ層の機能を活用し，具体的なビジネスロジックを実現する役割を持つ．ユーザーの操作や業務のフローに沿った処理をまとめることで，システム全体の振る舞いを統括するまた，キャンセルやタイムアウトなどのコンテキスト管理を一元化し，並行処理の安全性と効率性を確保する仕組みも実装する

- インターフェース層（ハンドラ層）
インターフェース層は，クライアントとの通信を担当する層．HTTPハンドラやAPIエンドポイントを実装することで，リクエストに含まれる情報（たとえばユーザーIDなど）をコンテキストにセットし，ユースケース層へ適切に渡す仕組みを実現するWithValue機能により，コンテキストにユーザー識別情報等を保持し，上位層へ受け渡すことで，キャンセルやタイムアウトの制御が容易になる

---
この設計は，各層の責務が明確に分割されており，システムの保守性やテスト容易性を大幅に向上させる利点がある．ドメイン層においてビジネスロジックが中心となり，インフラストラクチャ層での具体的な実装がそれを支える．ユースケース層は，ビジネスルールの具体的な実行を管理し，インターフェース層がユーザーや外部システムとのやりとりを担当することで，全体の依存関係が低減され，柔軟かつ拡張性の高い設計が実現される．

:::

### 3.1. アーキテクチャ概要
各層の役割は以下の通りである．

- **Domain層**  
  entity（ドメインモデル）の定義と，CRUD操作のインターフェース（リポジトリ）が含まれる

- **Infrastructure層**  
  実際のデータベース接続部分（MySQL）とデータ操作部分（DAO）の実装を行う

- **Usecase層**  
  ユースケース（ビジネスロジック）を実装し，各種処理のルールを定める

- **Handler層**  
  クライアントとの通信部であり，HTTPリクエストを受け取りビジネスロジックへ橋渡しを行う


### 3.2. Domain層の実装
entity（ドメインモデル）の定義と，CRUD操作のインターフェース（リポジトリ）が含まれる

#### 3.2.1 entity（ドメインモデル）の定義
エンティティはデータベースのテーブルに対応し，ビジネスルールのコアを担うである．
```domain/entities/Product.cs
namespace MyApp.Domain.Entities
{
public class Product
  {
    public int Id { get; set; } // 主キー
    public string Name { get; set; } // 商品名
    public decimal Price { get; set; } // 価格
  }
}
```

:::note info
**自動実装プロパティ{ get; set; } とは**
プロパティの値を取得する get アクセサと値を設定する set アクセサを自動で実装し, 専用のバックフィールドをコンパイラ側で生成する仕組み．
そのため，コードが簡潔になり，明示的なフィールドとプロパティの実装が不要となる．
:::

#### 3.2.2 リポジトリインターフェースの定義
CRUD操作を抽象化し，ユースケース層がデータアクセスの詳細に依存しないようにするためのインターフェースである．
```domain/repositories/IProductRepository.cs
namespace MyApp.Domain.Repositories
{
using MyApp.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync(); // 全商品の非同期取得を行うメソッド
        Task<Product> GetByIdAsync(int id); // 指定されたIdの商品を非同期で取得するメソッド
        Task AddAsync(Product product); // 新規商品を非同期で追加するメソッド
        Task UpdateAsync(Product product); // 商品情報を非同期で更新するメソッド
        Task DeleteAsync(int id); // 商品を非同期で削除するメソッド
    }
}
```

### 3.3. Infrastructure層の実装
実際のデータベース接続部分（MySQL）とデータ操作部分（DAO）の実装を行う

#### 3.3.1 MySQL接続とDbContextの設定
Entity Framework Coreを利用し，MySQLと接続するためのDbContextを定義する
```infrastructure/MySQL/AppDbContext.cs
namespace MyApp.Infrastructure.MySQL
{
using Microsoft.EntityFrameworkCore;
using MyApp.Domain.Entities;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<Product> Products { get; set; } // Productテーブルに対応するDbSetである．
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // エンティティの詳細な構成が必要な場合はここに記述する
        }
    }
}
```
#### 3.3.2 DAO（Data Access Object）の実装
実際のデータ操作を行う実装として，リポジトリインターフェースのConcreteな実装を提供する
```infrastructure/DAO/ProductDao.cs
namespace MyApp.Infrastructure.DAO
{
using MyApp.Domain.Entities;
using MyApp.Domain.Repositories;
using MyApp.Infrastructure.MySQL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

    public class ProductDao : IProductRepository
    {
        private readonly AppDbContext _context; // DbContextのインスタンス
        
        public ProductDao(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync(); // 全商品の非同期取得を行う
        }
        
        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id); // 指定されたIdの商品を取得する
        }
        
        public async Task AddAsync(Product product)
        {
            await _context.Products.AddAsync(product); // 新規商品を追加する
            await _context.SaveChangesAsync(); // 変更をデータベースに保存する
        }
        
        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product); // 商品情報の更新を行う
            await _context.SaveChangesAsync(); // 変更を保存する．
        }
        
        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id); // 削除対象商品の存在確認を行う
            if (product != null)
            {
                _context.Products.Remove(product); // 該当商品を削除する
                await _context.SaveChangesAsync(); // 削除操作を永続化する
            }
        }
    }
}
```

### 3.4. Usecase層の実装
ユースケース（ビジネスロジック）を実装し，各種処理のルールを定める

#### 3.4.1 ビジネスロジックの実装
ユースケース層では，Repositoryを通じたデータアクセスに加え，必要なビジネスルールを実装する．

```usecase/services/ProductService.cs
namespace MyApp.Usecase.Services
{
using MyApp.Domain.Entities;
using MyApp.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync(); // 全商品の取得ビジネスロジック
        Task<Product> GetProductByIdAsync(int id); // 指定されたIdの商品取得ビジネスロジック
        Task AddProductAsync(Product product); // 新規商品の追加ビジネスロジック
        Task UpdateProductAsync(Product product); // 商品情報更新のビジネスロジック
        Task DeleteProductAsync(int id); // 商品削除のビジネスロジック
    }
    
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository; // ドメイン層のリポジトリに依存する．
        
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllAsync(); // 全商品の取得処理を委譲する．
        }
        
        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productRepository.GetByIdAsync(id); // 指定されたIdの商品取得を委譲する．
        }
        
        public async Task AddProductAsync(Product product)
        {
            // ここに必要なビジネスルールや検証処理を追加可能
            await _productRepository.AddAsync(product); // 新規追加処理を委譲する．
        }
        
        public async Task UpdateProductAsync(Product product)
        {
            // 更新前の検証やビジネスロジックを実施することが可能
            await _productRepository.UpdateAsync(product); // 更新処理を委譲する．
        }
        
        public async Task DeleteProductAsync(int id)
        {
            // 削除前のビジネスチェックを実施する場合は，ここで実装する．
            await _productRepository.DeleteAsync(id); // 削除処理を委譲する．
        }
    }
}
```

### 3.5. Handler層の実装
クライアントとの通信部であり，HTTPリクエストを受け取りビジネスロジックへ橋渡しを行う

#### 3.5.1 クライアントとの通信部（APIエンドポイント）の実装
APIハンドラー層では，HTTPリクエストを受け取り，ユースケース層のビジネスロジックを呼び出す

```handler/ProductsController.cs
namespace MyApp.Handler
{
using Microsoft.AspNetCore.Mvc;
using MyApp.Domain.Entities;
using MyApp.Usecase.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService; // ユースケース層のサービスに依存する
        
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync(); // 全商品の一覧を取得する
            return Ok(products); // 結果をクライアントへ返す
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id); // 指定されたIdの商品を取得する
            if (product == null)
            {
                return NotFound(); // 商品が存在しなければ404エラーを返す
            }
            return Ok(product); // 結果を返す
        }
        
        [HttpPost]
        public async Task<ActionResult> AddProduct(Product product)
        {
            await _productService.AddProductAsync(product); // 新規商品の追加処理を実施する
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product); // 作成された商品の情報を返す
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest(); // URLのIdとリクエストボディのIdが一致しなければ400エラーを返す
            }
            await _productService.UpdateProductAsync(product); // 商品更新処理を実施する
            return NoContent(); // 更新成功時は204を返す
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var existing = await _productService.GetProductByIdAsync(id); // 削除前に商品の存在確認を行う
            if (existing == null)
            {
                return NotFound(); // 該当商品がなければ404エラーを返す
            }
            await _productService.DeleteProductAsync(id); // 商品削除処理を実施する
            return NoContent(); // 削除成功時は204を返す
        }
    }
}
```

### 3.6. アプリケーション起動設定（Program.cs）
依存性注入（DI）コンテナに各層の依存性を登録し，アプリケーションのミドルウェア構成を行う

```Program.cs
    using Microsoft.EntityFrameworkCore;
    using MyApp.Infrastructure.MySQL;
    using MyApp.Infrastructure.DAO;
    using MyApp.Domain.Repositories;
    using MyApp.Usecase.Services;

    var builder = WebApplication.CreateBuilder(args);

    // ここでappsettings.jsonや環境変数から接続文字列を取得する
    // 本例では，docker-compose.ymlで定義したMySQLサービスのホスト名「mysql」を指定している
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")?? "Server=mysql;Database=MyAppDb;User=root;Password=mypassword";

    // DbContextをMySQLに接続するように設定を変更する
    // 自動検出機能（ServerVersion.AutoDetect）を利用してMySQLサーバのバージョンを取得する
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

    // 各レイヤーの依存性注入（DI）の登録
    builder.Services.AddScoped<IProductRepository, ProductDao>();   // Infrastructure層：MySQL接続の実装であるDAO
    builder.Services.AddScoped<IProductService, ProductService>();    // Usecase層のサービス登録

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
```
---
各層（Domain，Infrastructure，Usecase，Handler）が明確に分離されることで，ビジネスロジックの拡張やメンテナンスが容易となる
実際のプロジェクトでは，本サンプルを基に認証，例外処理，ロギングなどの追加実装が求められる

### 3.7 Dockerコンテナを用いてWebAPIの実行環境を整える
1. **Dockerfileとは？**  
   今回説明するDockerfileはマルチステージビルドにより，まずSDKイメージ上でプロジェクトの復元，ビルド，パブリッシュを実行し，次に軽量なASP.NET Coreランタイムイメージにパブリッシュ済みファイルを転送する  
   最終的にENTRYPOINTでWebAPIアプリケーションの起動コマンドを指定し，起動時にdotnetコマンドが実行されるようになっている

2. **docker-compose.ymlとは？**  
   docker-compose.ymlは，WebAPIコンテナとMySQLコンテナを同時に起動するための定義ファイル
   WebAPIサービスは，MySQLサービスに依存する（depends_on）ため，MySQLコンテナ起動後にWebAPIコンテナが起動する
   WebAPIの接続文字列は環境変数で注入され，ホスト名「mysql」によりMySQLコンテナに接続するように設定されている
   また，MySQLのデータ永続性確保のために，ボリュームを利用してデータ格納ディレクトリをホストと共有する


#### 3.7.1. DockerfileによるWebAPIコンテナの構築

今回作成するWebAPIは，マルチステージビルドを採用している．  
最初のステージでは，.NET SDKイメージを利用してソースコードの復元，ビルド，パブリッシュを行い，次のステージでは軽量なASP.NET Coreランタイムイメージに成果物を配置し，実行可能な状態にする．

以下に，WebAPIのDockerfileの内容を示す．

**Dockerfile**
```Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MyWebApp.csproj", "./"]
RUN dotnet restore "MyWebApp.csproj"
COPY . .
RUN dotnet publish "MyWebApp.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyWebApp.dll"]
```

#### 3.7.2. docker-compose.ymlによるコンテナ群の起動

docker-compose.ymlでは，WebAPIコンテナとMySQLコンテナの2つのサービスを定義する  
WebAPIコンテナは，Dockerfileを参照してビルドされ，ポート5000（ホスト側）と80（コンテナ側）をマッピングする  
また，MySQLコンテナは公式のMySQL 8.0イメージを利用し，必要な環境変数（ルートパスワード，データベース名など）を設定する  
WebAPIからMySQLへは，docker-composeによるサービス名解決機能を用いて接続するため，接続文字列中のサーバーホスト名は「mysql」となる

```docker-compose.yml
version: '3.8'
services:
  webapi:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5286:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://0.0.0.0:80
      - ConnectionStrings__DefaultConnection=Server=mysql;Database=mydb;User=user;Password=password
    depends_on:
      - mysql

  mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

### 3.8 csprojのに必要なNuGetパッケージを追加
`<ItemGroup>`タグ内に必要なNuGetパッケージを追加することで，Entity Framework CoreやMySQL用のプロバイダー（Pomelo）を利用できるようにする．
```MyWebApp.csproj
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.3" />
    <!-- EF Coreの基本機能 -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="7.0.9" />
    <!-- MySQL用のプロバイダー（Pomeloの例） -->
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="7.0.0" />
    <!-- デザインタイムツール（必要に応じて） -->
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="7.0.9" />
    <!-- Swagger用のパッケージ -->
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.2.3" />
  </ItemGroup>

</Project>
```
---


### 3.9 実行方法
.NETアプリケーションとMySQlアプリケーションのdockerコンテナを起動する
```bash
docker compose up --build
```

コンテナが起動したらターミナルの別タブで以下のコマンドを実行して，MySQLコンテナ内にはいる．
```bash
docker-compose exec mysql mysql -uuser -ppassword mydb
```
MySQLコンテナの中に入れたら以下のSQL-DDLを実行して，データベースにテーブルを追加する．
```sql
CREATE TABLE Products (
  Id INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (Id)
);
```

その後curlコマンドで実際にAPIを叩いてみる．
```md:全てのProductを取得する
curl http://localhost:5286/api/products
```
```md:実行結果
[]%
```                                                                                                                                                                                                      
```md:新規Productを追加する
curl -X POST http://localhost:5286/api/products \
-H "Content-Type: application/json" \
-d '{"name": "New Product", "price": 19.99}'
{"id":1,"name":"New Product","price":19.99}%                                                                                                                                                             
```
```md:全てのProductを取得する
curl http://localhost:5286/api/products
```
```md:実行結果
[{"id":1,"name":"New Product","price":19.99}]%                                                                                                                                                           
```        
```md:idが1である(上で追加したProduct)Productを取得する
curl http://localhost:5286/api/products/1
```
```md:実行結果
{"id":1,"name":"New Product","price":19.99}%                                                                                                                                                             
```
```md:idが2であるProduct(存在しないProduct)を取得する
curl http://localhost:5286/api/products/2
```
```md:実行結果(NotFoundがかえってきて期待通り)
{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-37cb75d887892834f3b86b8612398808-d528554428a96ebc-00"}%                                      
```
```md:idが1のProductを更新する()
curl -X PUT http://localhost:5286/api/products/1 \
-H "Content-Type: application/json" \
-d '{"id": 1, "name": "Updated Product", "price": 24.99}'
```
```md:idが1である(上で変更したProduct)Productを取得する
curl http://localhost:5286/api/products/1   
```      
```md:実行結果
{"id":1,"name":"Updated Product","price":24.99}%                                                                                                                                                         
```    
```md:idが1のProductを削除する
curl -X DELETE http://localhost:5286/api/products/1
```
```md:idが1である(上で削除したProduct == 存在しない)Productを取得する
curl http://localhost:5286/api/products/1
```
```md:実行結果
{"type":"https://tools.ietf.org/html/rfc9110#section-15.5.5","title":"Not Found","status":404,"traceId":"00-aa7e710b8c0781a6b0189adf9894a63f-afdb27611ace6c32-00"}%
```

# C#でゲーム開発XR開発を行う

ここからは，UnityにおけるC#スクリプトの実装方法について，様々なパターンを詳述する．Unityを用いれば2D/3Dゲームの作成やXR開発が可能である．Unityを利用する際、C#スクリプトは主にゲームオブジェクトにアタッチされ，その挙動を制御するための重要な役割を担う．MonoBehaviourの特徴をはじめ，コルーチン，シングルトンパターン，イベント／デリゲートの利用，ScriptableObjectによるデータ管理，および状態管理（ステートマシン）パターンなど，多岐にわたる実装例を交えて解説する．

## 1. 予約語となるMonoBehaviourメソッド
初めに，UnityにおけるMonoBehaviourクラスの予約語となるメソッドについて説明する．これらのメソッドは，Unityエンジンによって自動的に呼び出されるため，開発者はそれぞれのメソッドに適切な処理を実装することで，ゲームオブジェクトの挙動を制御することができる．

:::note info
**MonoBehaviourクラスとは**
Unityのスクリプトの基本となるクラスであり，ゲームオブジェクトにアタッチして使用することができる．MonoBehaviourクラスには，Unityエンジンによって自動的に呼び出される予約語メソッドがいくつか存在する．これらのメソッドは，ゲームオブジェクトのライフサイクルに応じて特定のタイミングで実行されるため，適切な処理を実装することで，ゲームオブジェクトの挙動を制御することができる．
:::

MonoBehaviourクラスを理解することは，Unityで開発するにおいて非常に重要になるため，初めに重要なメソッド(予約語)を以下に示す．

:::note info
**予約語とは**
プログラミング言語において特別な意味を持つ単語であり，変数名や関数名などとして使用できない単語のことを指す．
:::

## 1.1. Awakeメソッド

Awakeメソッドは，スクリプトインスタンスがロードされた直後に呼ばれる初期化用のメソッドである．他のスクリプトとの依存関係を解決する際などに用いられるである．
```cs
using UnityEngine;

public class AwakeExample : MonoBehaviour
{
    void Awake()
    {
        // スクリプトがロードされた直後に一度だけ呼ばれる
        Debug.Log("Awakeメソッドが呼ばれたである");
    }
}
```
## 1.2. OnEnableメソッド

OnEnableメソッドは，ゲームオブジェクトが有効になった際に呼ばれるメソッドである．初期化処理やイベント登録を行う場合に利用するである．
```cs
using UnityEngine;

public class OnEnableExample : MonoBehaviour
{
    void OnEnable()
    {
        // ゲームオブジェクトが有効化された際に呼ばれる
        Debug.Log("OnEnableメソッドが呼ばれたである");
    }
}
```
## 1.3. Startメソッド

Startメソッドは，Awakeの後に呼ばれ，初めて有効な状態になった際に実行される．Updateの前に一度だけ実行されるため，初期化処理に適している
```cs
using UnityEngine;

public class StartExample : MonoBehaviour
{
    void Start()
    {
        // StartメソッドはAwake後に一度だけ実行される
        Debug.Log("Startメソッドが呼ばれたである");
    }
}
```
## 1.4. Updateメソッド

Updateメソッドは，毎フレーム呼ばれるメソッドである．ユーザー入力の処理やオブジェクトの移動，その他のフレーム単位の更新処理に用いる
```cs
using UnityEngine;

public class UpdateExample : MonoBehaviour
{
    void Update()
    {
        // 毎フレーム実行される処理
        Debug.Log("Updateメソッドが実行されているである");
    }
}
```
## 1.5. FixedUpdateメソッド

FixedUpdateメソッドは，固定フレームレートで呼び出されるメソッドである．物理演算など時間管理が厳密に必要な処理に利用する
```cs
using UnityEngine;

public class FixedUpdateExample : MonoBehaviour
{
    void FixedUpdate()
    {
        // 物理計算や一定間隔での更新処理に用いる
        Debug.Log("FixedUpdateメソッドが呼ばれているである");
    }
}
```
## 1.6. LateUpdateメソッド

LateUpdateメソッドは，すべてのUpdate処理が完了した後に呼ばれるメソッドである．カメラの追従処理など，Updateによる処理の後に実施する必要がある処理に適している
```cs
using UnityEngine;

public class LateUpdateExample : MonoBehaviour
{
    void LateUpdate()
    {
        // Update後に実行される処理
        Debug.Log("LateUpdateメソッドが呼ばれたである");
    }
}
```
## 1.7. OnDisableメソッド

OnDisableメソッドは，ゲームオブジェクトが無効になる際に呼ばれるメソッドである．ここではイベントの解除や一時停止処理を行うことが多い
```cs
using UnityEngine;

public class OnDisableExample : MonoBehaviour
{
    void OnDisable()
    {
        // ゲームオブジェクトが無効になる直前に呼ばれる
        Debug.Log("OnDisableメソッドが呼ばれた");
    }
}
```
## 1.8. OnDestroyメソッド

OnDestroyメソッドは，ゲームオブジェクトが破棄される直前に呼ばれるメソッドである．リソースのクリーンアップや最後の処理を実装する際に利用する
```cs
using UnityEngine;

public class OnDestroyExample : MonoBehaviour
{
    void OnDestroy()
    {
        // ゲームオブジェクトが破棄される際に実行される
        Debug.Log("OnDestroyメソッドが呼ばれた");
    }
}
```

## 1.9. OnApplicationQuitメソッド

OnApplicationQuitメソッドは，アプリケーションの終了直前に呼ばれるメソッドである．終了処理やデータの保存処理などに用いる
```cs
using UnityEngine;

public class OnApplicationQuitExample : MonoBehaviour
{
    void OnApplicationQuit()
    {
        // アプリケーション終了時に実行される
        Debug.Log("OnApplicationQuitメソッドが呼ばれた");
    }
}
```

## 1.10. 衝突およびトリガーイベント関連メソッド

MonoBehaviourには，物理演算に関する衝突イベントやトリガー関連のイベントメソッドも備えられている

### 1.10.1. OnCollisionEnter

OnCollisionEnterは，他の物理オブジェクトと衝突した際に一度だけ呼ばれるメソッドである．
```cs
using UnityEngine;

public class CollisionEnterExample : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        // 衝突した相手の情報を利用した処理を実装する
        Debug.Log("OnCollisionEnterが呼ばれた，相手オブジェクト：" + collision.gameObject.name);
    }
}
```

### 1.10.2. OnCollisionStay

OnCollisionStayは，衝突が継続している間，毎フレーム呼ばれるメソッドである．
```cs
using UnityEngine;

public class CollisionStayExample : MonoBehaviour
{
    void OnCollisionStay(Collision collision)
    {
        // 衝突が続いている間の処理を実装する
        Debug.Log("OnCollisionStayが呼ばれている");
    }
}
```
### 1.10.3. OnCollisionExit

OnCollisionExitは，衝突が解消された際に一度呼ばれるメソッドである．
```cs
using UnityEngine;

public class CollisionExitExample : MonoBehaviour
{
    void OnCollisionExit(Collision collision)
    {
        // 衝突が終わった際の後処理を実装する
        Debug.Log("OnCollisionExitが呼ばれた");
    }

```

### 1.10.4. OnTriggerEnter

OnTriggerEnterは，トリガーのコライダーに他のオブジェクトが侵入した際に呼ばれるメソッドである．
```cs
using UnityEngine;

public class TriggerEnterExample : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        // トリガーに侵入したオブジェクトに対する処理を実装する
        Debug.Log("OnTriggerEnterが呼ばれた，相手：" + other.gameObject.name);
    }
}
```

### 1.10.5. OnTriggerExit

OnTriggerExitは，トリガー領域からオブジェクトが退出した際に呼ばれるメソッドである．
```cs
using UnityEngine;

public class TriggerExitExample : MonoBehaviour
{
    void OnTriggerExit(Collider other)
    {
        // オブジェクトがトリガー領域から出た際の処理を実装する
        Debug.Log("OnTriggerExitが呼ばれた");
    }
}
```

これらのメソッドはUnityエンジンによって自動的に呼び出されるため，各タイミングに合わせた初期化，更新，後処理を適切に実装すれば，よりスムーズで堅牢なゲームロジックの実装が可能となる．

## 2. 基本的なMonoBehaviourスクリプトのパターン

シンプルなプレイヤーコントローラーの例を以下に示すである．  
この例では，**Start**および**Update**メソッドを利用して，初期化処理と毎フレームの更新処理を実装するである．
```cs
using UnityEngine;

public class SimplePlayerController : MonoBehaviour
{
    void Start()
    {
        Debug.Log("SimplePlayerControllerが開始された");
    }

    void Update()
    {
        float move = Input.GetAxis("Horizontal");
        transform.Translate(new Vector3(move, 0, 0) * Time.deltaTime);
    }
}
```
上記の例は，MonoBehaviourのライフサイクルメソッドに従った基本的な実装例であり，ゲームオブジェクトにアタッチすることで動作する

## 3. コルーチンを利用した非同期処理パターン

コルーチンは，時間遅延や逐次的な非同期処理を実現するための有効な手法である．  
以下の例は，3秒間の待機後に処理を実行するパターンである．
```cs
using System.Collections;
using UnityEngine;

public class CoroutinePattern : MonoBehaviour
{
    void Start()
    {
        StartCoroutine(DelayedAction());
    }

    IEnumerator DelayedAction()
    {
        yield return new WaitForSeconds(3);
        Debug.Log("3秒後に実行された");
    }
}
```
この例では，Startメソッドでコルーチンを開始し，DelayedActionメソッド内で3秒後にログを出力する処理を実装しているである．

:::note info
**IEnumeratorとは?**
コレクションの要素を順次取り出すための列挙子を表すインターフェースである．
C#において，foreach文などでコレクションを反復処理する際に内部で利用される仕組みと同じような原理だ．
IEnumeratorを実装するクラスでは，MoveNextメソッドで次の要素へ移動し，Currentプロパティで現在の要素を取得する．また，Resetメソッドで列挙子の位置を初期状態に戻すことができるが，ほとんどの場合は実装されず，例外を投げることもある．
```cs
using System;
using System.Collections;

public class SimpleEnumerator : IEnumerator
{
    private int[] _numbers = {1, 2, 3, 4, 5};
    private int _position = -1;

    // MoveNextは次の要素がある場合にtrueを返す
    public bool MoveNext() 
    {
        _position++;
        return (_position < _numbers.Length);
    }
    
    // Currentは現在の要素を返す
    public object Current 
    {
        get 
        {
            if (_position < 0 || _position >= _numbers.Length)
                throw new InvalidOperationException();
            return _numbers[_position];
        }
    }

    // Resetは列挙を最初の位置に戻す
    public void Reset() 
    {
        _position = -1;
    }
}

class Program
{
    static void Main() 
    {
        SimpleEnumerator enumerator = new SimpleEnumerator();
        while (enumerator.MoveNext())
        {
            Console.WriteLine(enumerator.Current);
        }
    }
}
```
:::

## 4. シングルトンパターンを用いたGameManagerの実装

シングルトンパターンは，グローバルにただ一つのインスタンスを保持し，複数のスクリプトから容易にアクセス可能にするための設計手法  
以下は，GameManagerのシングルトン実装例である
```cs
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public int Score { get; private set; }

    void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
        }
        else
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
    }

    public void AddScore(int value)
    {
        Score += value;
        Debug.Log("スコアが更新された: " + Score);
    }
}
```
この実装により，GameManagerはアプリケーション全体で唯一の存在となり，シーン間での状態情報の共有が容易になる

## 5. イベントとデリゲートを利用した通知パターン

イベントとデリゲートを用いることで，オブジェクト間の疎結合な通信が実現できるである．  
以下は，Playerクラスが死亡イベントを発行し，GameOverManagerがそのイベントに応答する例である．
```cs
using System;
using UnityEngine;

public class Player : MonoBehaviour
{
    public static event Action OnPlayerDeath;

    public void TakeDamage(int damage)
    {
        if (damage > 0)
        {
            Die();
        }
    }

    void Die()
    {
        Debug.Log("プレイヤーが死亡した");
        OnPlayerDeath?.Invoke();
    }
}

public class GameOverManager : MonoBehaviour
{
    void OnEnable()
    {
        Player.OnPlayerDeath += HandleGameOver;
    }

    void OnDisable()
    {
        Player.OnPlayerDeath -= HandleGameOver;
    }

    void HandleGameOver()
    {
        Debug.Log("ゲームオーバー処理を実行するである");
    }
}
```
このパターンにより，各オブジェクトは独立して動作しながら，中間の結合度を低下させた通信が可能となるである．

## 6. ScriptableObjectを使用したデータ管理パターン

ScriptableObjectは，ゲーム内の共有データをエディタ上で管理しやすくするための仕組みである．  
以下は，アイテムデータを管理するためのScriptableObjectの例である．
```cs
using UnityEngine;
    
[CreateAssetMenu(fileName = "ItemData", menuName = "ScriptableObjects/ItemData", order = 1)]
public class ItemData : ScriptableObject
{
    public string itemName;
    public string description;
    public int value;
}
```

エディタ上で生成したアセットは，複数のシーンやオブジェクト間でデータの共有や設定の一元管理が容易になるである．

## 7. 状態管理（ステートマシン）パターンの例

状態管理パターンは，オブジェクトの状態遷移を明確に管理し，各状態ごとに異なる処理を実装する手法である．  
以下は，敵キャラクターの状態（待機，追跡，攻撃）を管理する例である．
```cs
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public enum EnemyState
    {
        Idle,
        Chasing,
        Attacking
    }

    public EnemyState currentState = EnemyState.Idle;

    void Update()
    {
        switch (currentState)
        {
            case EnemyState.Idle:
                Debug.Log("敵は待機中");
                break;
            case EnemyState.Chasing:
                Debug.Log("敵は追跡中");
                break;
            case EnemyState.Attacking:
                Debug.Log("敵は攻撃中");
                break;
        }
    }

    public void ChangeState(EnemyState newState)
    {
        currentState = newState;
        Debug.Log("敵の状態が変更された: " + currentState);
    }
}
```
このパターンを用いることで，複雑な敵キャラクターの挙動や状態遷移管理をシンプルかつ明瞭に実装できるである．

---

UnityにおけるC#スクリプトは，MonoBehaviourの予約語となるメソッドを正しく利用することで，Unityエンジンのライフサイクルに対応した処理が可能になる
また，本記事で紹介した各種パターン（基本的なスクリプト実装，コルーチン，シングルトン，イベント／デリゲート，ScriptableObject，状態管理）の理解と活用は，柔軟かつ拡張性の高いゲーム開発を実現する上で非常に有用  
これらの知識を確実に習得し，各プロジェクトに適したパターンを選択することで，より効率的な開発環境の構築を行いましょう！



