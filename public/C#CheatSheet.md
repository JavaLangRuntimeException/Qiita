---
title: C#チートシート
tags:
  - 'C#'
  - 'プログラミング'
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---
# C#の概要と歴史
C#（シーシャープ）はMicrosoftによって開発されたオブジェクト指向プログラミング言語である．初めて発表されたのは2000年代初頭であり，その後.NET Frameworkの中核をなす言語として進化してきた．C#はJavaやC++などの技術を参考にし，安全性と生産性を重視して設計されている．

# C#を学ぶ意義
C#はWindowsアプリケーションやWebアプリケーション，ゲーム開発（Unity）など様々な分野で活用される言語である．豊富なライブラリや最新の機能拡張が提供されており，初学者からプロフェッショナルまで幅広く利用されている．

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

# C#の基本文法
C#はクラス，メソッド，変数，条件分岐，繰り返し処理などの構成要素から成り立っている．各要素は厳格な型定義のもとで利用され，エラーを未然に防ぐための仕組みが整備されている．シンプルな文法でありながらも，柔軟な拡張性があるのが特徴である．

# Helloworldプログラム
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
# C#の記法構造
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
# C#における変数とは
変数はデータを格納するための名前付きメモリ領域を表す概念である．C#では各変数に対して明確なデータ型を指定する必要があり，コンパイル時に型チェックが行われる．

# データ型を定義して変数宣言
C#では基本的なデータ型が予め定義されており，それに基づいて変数を宣言する．以下の例は各種データ型の変数宣言例である．
```cs
int number = 10;
double pi = 3.14;
string message = "Hello, C#";
bool isValid = true;
```
# 列挙型
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
# 演算記号
C#では算術演算子（+，-，*，/），論理演算子（&&，||，!），および代入演算子（=，+=，-=）など多彩な演算記号が用意されている．これらは数値計算，条件判定，データ操作に不可欠な要素である．

# 比較演算子の使い方
比較演算子は値の大小や等価性を判定するために利用される．一般的な比較演算子としては，==，!=，<，>，<=，>=があり，条件分岐の基礎となる．例えば，以下の例では条件判定により処理を分岐している．
```cs
int a = 5;
int b = 10;
if (a < b) {
    Console.WriteLine("aはbより小さい．");
}
```
# 配列
配列は複数の同一型のデータを格納するためのデータ構造である．配列の各要素はインデックス番号を用いてアクセスされ，ランダムアクセスが容易に実現できる点が特徴である．

## 配列の宣言と初期化
C#では配列を宣言する際に，配列の型とサイズまたは初期値を指定する必要がある．以下に宣言と初期化の例を示す．
```cs
int[] numbers = new int[] {1, 2, 3, 4, 5};
string[] fruits = {"apple", "banana", "cherry"};
```
## 配列要素へのアクセスと条件付き処理
配列の各要素にはインデックスを用いてアクセスする．また，条件分岐と組み合わせることで，特定条件を満たす要素だけを対象とした処理が可能である．以下は偶数を抽出する処理例である．
```cs
int[] numbers = {1, 2, 3, 4, 5, 6};
for (int i = 0; i < numbers.Length; i++) {
    if (numbers[i] % 2 == 0) {　// インデックスはこのiのことをいいます
        Console.WriteLine(numbers[i] + "は偶数である．");
    }
}
```
## 配列のフィルタリングと新しい配列の作成
LINQを利用することで，配列のフィルタリング処理が容易に実現できる．条件に一致する要素のみを抽出し，新たな配列として生成することが可能である．以下にLINQを用いた例を示す．
```cs
using System.Linq;
int[] numbers = {1, 2, 3, 4, 5, 6};
int[] evenNumbers = numbers.Where(x => x % 2 == 0).ToArray();
```
## 配列要素の追加と削除
C#の基本配列は固定長であるため，動的な要素の追加や削除にはListやその他のコレクションを用いるのが一般的である．以下はListを利用した例である．

    using System.Collections.Generic;
    List<int> numberList = new List<int>() {1, 2, 3};
    numberList.Add(4);
    numberList.Remove(2);

## 配列の並べ替え
配列の並べ替えにはArray.Sortメソッドが利用できる．簡単な記述で昇順または降順へのソートが実現できるため，非常に便利である．以下は昇順へのソート例である．
```cs
int[] numbers = {3, 1, 4, 1, 5};
Array.Sort(numbers);
```
## 二次元配列
二次元配列は行と列の概念を持つ配列であり，行列データの保持に適している．添字を二つ用いることで，各要素へのアクセスが可能である．

### 二次元配列の処理
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
## 連想配列
連想配列はキーと値のペアでデータを管理するデータ構造であり，C#ではDictionaryクラスを用いて実現される．高速な検索と柔軟なデータ管理が可能である．以下に連想配列の例を示す．
```cs
using System.Collections.Generic;
Dictionary<string, int> ages = new Dictionary<string, int>() {
    {"Alice", 30},
    {"Bob", 25}
};
Console.WriteLine("Aliceの年齢は" + ages["Alice"] + "である．");
```
## 配列操作できる便利関数
C#では，各種の配列操作関数が用意されており，配列の操作を非常に効率的に行うことができる．以下に主要な便利関数とそのコード例を示す．

### Array.Sort
配列の要素を昇順にソートする関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
Array.Sort(numbers);
for (int i = 0; i < numbers.Length; i++) {
    Console.Write(numbers[i] + " ");
}
Console.WriteLine();
```
### Array.Reverse
配列の要素を逆順に並べ替える関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
Array.Reverse(numbers);
for (int i = 0; i < numbers.Length; i++) {
    Console.Write(numbers[i] + " ");
}
Console.WriteLine();
```
### Array.IndexOf
指定した値が最初に出現する位置のインデックスを返す関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
int index = Array.IndexOf(numbers, 8);
Console.WriteLine("Index of 8: " + index);
```
### Array.Find
条件を満たす最初の要素を検索する関数である．
```cs
int[] numbers = {5, 3, 8, 1, 9};
int found = Array.Find(numbers, x => x > 5);
Console.WriteLine("First number greater than 5: " + found);
```
### Array.FindAll
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
### Array.Clear
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
### LINQ: Max と Min
LINQの拡張メソッドを用いて配列の最大値と最小値を取得する．
```cs
using System.Linq;
int[] numbers = {5, 3, 8, 1, 9};
int max = numbers.Max();
int min = numbers.Min();
Console.WriteLine("Max: " + max + ", Min: " + min);
```
### LINQ: Sum と Average
LINQの拡張メソッドを用いて配列の合計値と平均値を算出する関数である．
```cs
using System.Linq;
int[] numbers = {5, 3, 8, 1, 9};
int sum = numbers.Sum();
double avg = numbers.Average();
Console.WriteLine("Sum: " + sum + ", Average: " + avg);
```
### JavaScript(TypeScript)のような配列操作関数はある？？
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

# 条件分岐

## 1. if ... else文
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
## 2. switch文
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
## 3. 条件演算子 (?演算子)
条件演算子は, 三項演算子とも呼ばれ, 簡潔に条件分岐を表現するための構文である, (条件) ? 式1 : 式2 の形式で記述し, 条件がtrueの場合は式1が, falseの場合は式2が評価されるものである.
```cs
int a = 15, b = 20;  
string message = (a > b) ? "aはbより大きい." : "aはbより小さいまたは等しい.";  
Console.WriteLine(message);
```

## 4. 条件分岐のネストとは
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
# 繰り返し処理

## 1. while文
while文は, 条件がtrueである限りループ内の処理を繰り返す構文である, ループ開始前に条件評価が行われるものである.
```cs
int i = 0;  
while (i < 5) {  
    Console.WriteLine("カウントは " + i + " である.");  
    i++;  
}
```
## 2. do ... while文
do ... while文は, ループ本体を必ず一度は実行し, その後条件評価を行う構文である, 最低1回の実行が保証されるものである.
```cs
int j = 0;  
do {  
    Console.WriteLine("繰り返し回数は " + j + " である.");  
    j++;  
} while (j < 5);
```

## 3. for文
for文は, 初期化, 条件評価, 更新式を一行に記述し, 決まった回数の繰り返し処理を行う構文である, 汎用的かつ制御しやすいループである.
```cs
for (int k = 0; k < 5; k++) {  
    Console.WriteLine("ループカウントは " + k + " である.");  
}
```
## 4. foreach文 (for ... in文に相当)
C#においてfor ... in文の役割を果たすのはforeach文である, 配列やコレクション内の各要素に対して順次処理を実施するための簡潔な構文である.
```cs
int[] numbers = { 10, 20, 30, 40, 50 };  
foreach (int num in numbers) {  
    Console.WriteLine("要素は " + num + " である.");  
}
```

## ループの途中で処理を止める方法

### 1. break文の使用例
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
### 2. continue文の使用例
continue文は, ループ内の現在の反復処理をスキップして次の反復に移行するために用いられる, 特定の条件下で不要な処理を飛ばす際に利用されるものである.
```cs
for (int m = 0; m < 5; m++) {  
    if (m == 2) {  
        continue;  
    }  
    Console.WriteLine("値は " + m + " である.");  
}
```
### 無限ループとその対策
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
## 関数について

### 関数の定義方法
C#では, 関数はメソッドとしてクラス内部に定義される, 静的メソッドはインスタンス化せずに呼び出すことができるものである, 以下は二つの整数を加算する静的メソッドの例である.
```cs
public class Utility {
        public static int Add(int a, int b) {
            return a + b;
        }
    }
```
このように, メソッドは戻り値の型, メソッド名, 引数リストを指定して定義されるものである.

### 高階関数
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

### イベントハンドリング
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

### 関数のデフォルト引数と可変長引数
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

### 関数のオプション引数と規定値
オプション引数は, デフォルト引数と同様に, 引数が渡されなかった場合に規定値を使用する方法である, C#では既にデフォルト引数として実装されているものである.

public class OptionalParameter {
        public static void DisplayInfo(string name, int age = 30) {
            Console.WriteLine("名前は " + name + " である, 年齢は " + age + " である.");
        }
    }

このように, 一部の引数を省略可能にすることができるものである.

### 関数のオーバーロード
C#では, 同一クラス内でメソッド名が同一であるが, パラメータが異なるメソッドを定義することが可能であり, これを関数のオーバーロードと呼ぶものである.

public class OverloadExample {
        public static int Multiply(int a, int b) {
            return a * b;
        }
        
        public static double Multiply(double a, double b) {
            return a * b;
        }
    }

これにより, 引数の型に応じた適切なメソッドが選択されるものである.

### 総称型(ジェネリクス関数)
総称型関数は, 汎用的な型を扱うことができるように定義された関数であり, これにより型の安全性と再利用性が大幅に向上するものである.

public class GenericsExample {
        public static T GetDefault<T>() {
            return default(T);
        }
    }

この例では, 任意の型に対応可能なジェネリック関数を定義しているものである.

### クロージャー
クロージャーは, 外部の変数をキャプチャして利用する匿名関数のことであり, C#ではラムダ式を用いることで実現されるものである.

int offset = 10;
    Func<int, int> addOffset = x => x + offset;
    Console.WriteLine(addOffset(5));

この例では, 外部変数offsetをキャプチャしたラムダ式が定義され, 結果として15が出力されるものである.

## オブジェクト指向プログラミング（OOP）について

### オブジェクト指向プログラミング（OOP）とは
オブジェクト指向プログラミングは, データとその振る舞いをオブジェクトという単位でまとめて管理する手法であり, プログラムの構造を分かりやすく保守性を向上させるものである, C#はこの考え方を強力にサポートしているものである.

### クラスとクラスの定義
クラスは, オブジェクトを生成するための設計図であり, 属性（フィールドやプロパティ）と動作（メソッド）を持つものである, C#ではclassキーワードを用いて定義されるものである.

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

このように, クラスはインスタンスごとの状態とその振る舞いを定義しているものである.

### アクセス修飾子
アクセス修飾子は, クラスやそのメンバーの可視性を制限するためのものであり, 主にpublic, private, protected, internalの四種類が存在するものである, これにより情報の隠蔽が実現されるものである.

### 静的メンバー
静的メンバーは, クラス自体に属し, インスタンス化しなくても利用可能なメンバーである, 静的フィールドや静的メソッドとして定義されるものである.

public class MathUtility {
        public static double PI = 3.14159;
        
        public static double Square(double x) {
            return x * x;
        }
    }

この例では, MathUtilityクラスは静的な定数とメソッドを提供しているものである.

### 情報の隠蔽の実装
情報の隠蔽は, クラス内部のデータを直接外部に露出させず, プロパティやメソッドを通してアクセスさせることで実現されるものである, これによりクラス内部の整合性を保つことができるものである.

### クラスの継承とメソッドのオーバーライド
継承は, 既存のクラスを基に新たなクラスを作成する手法であり, 基底クラスのメソッドを子クラスが再定義（オーバーライド）することが可能なものである, virtualキーワードとoverrideキーワードを用いるものである.

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

この機能により, 共通の振る舞いはスーパークラスに集約し, 子クラスで個別の実装を行うことができるものである.

### 抽象クラス
抽象クラスは, インスタンス化することができない基底クラスであり, 共通のインターフェースを提供するために用いられるものである, 抽象メソッドは派生クラスで必ず実装しなければならないものである.

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

この例では, Shapeクラスが共通の定義を行い, Circleクラスが具体的な面積計算を実装しているものである.