---
title: pythonの__init__.pyってなんなのか？
tags:
  - python
  - python3
  - Flask
  - Django
  - プログラミング初心者
private: false
updated_at: '2025-04-21T00:25:56+09:00'
id: bb281bdf297229da68f8
organization_url_name: null
slide: false
ignorePublish: false
---
Pythonでパッケージを作成・管理する際,必ず目にするファイルが`__init__.py`である.みなさんは`__init__.py`って何かわかりますか？FlaskとかDjangoとかで何となく出てくるので脳死で使っている人も多いのではないでしょうか？

> 私もあまりわからず使っていました！

`__init__.py`を知る前に...まずはPythonの`import`処理と`sys.path`によるモジュール検索の仕組み知る必要があるのでそこから説明します．

## 1. importとsys.pathの仕組み

### 1.1 Pythonインタプリタとは
- ソースコードを読み込み,字句解析→構文解析→バイトコード生成→実行までを担うプログラム
- `import`文を遇うとモジュール検索と読み込みを開始する

:::note info 
**モジュールとは？**
- Pythonの“モジュール”は,関数・クラス・変数などをまとめた**コードの部品**
- 原則として1ファイル（`.py`）が1モジュール
- モジュールは名前空間 (`namespace`) を提供し,衝突を防ぐ
- 別ファイルやREPLから`import モジュール名`で再利用可能

> REPLとは,Read-Eval-Print Loopの略で,Pythonの対話型実行環境のこと

:::

### 1.2 sys.pathの役割
`sys.path`はPythonインタプリタがモジュールやパッケージを探すパスのリストである.  
主な内容:
1. 標準ライブラリのインストールディレクトリ
2. 実行中スクリプトの所在ディレクトリ
3. `PYTHONPATH`環境変数で追加されたディレクトリ

:::note info
**PYTHONPATHとは？**
環境変数の一つで,Pythonがモジュールを検索する際に参照するパスのリスト.
`PYTHONPATH`に指定されたディレクトリは,`sys.path`の先頭に追加される.
:::

インタプリタは`sys.path`を先頭から順に調べ,対象の名前に対応する
- `<name>.py` モジュール
- `<name>` ディレクトリ（中に`__init__.py`がある場合）  
  を探す.

文章で説明してもわかりにくいと思うのであるので,実際に`sys.path`を確認してみましょう.

以下のディレクトリ構造のPythonプロジェクトを考えます.

```
my_project/
├── main.py
├── my_package/
│   ├── __init__.py
│   ├── sub_a.py
│   └── sub_b.py
└── my_module.py
```
sys.pathを確認するために,以下のようなコードを書いてみましょう.

```main.py
import sys, pprint
import my_package          # ここで実際にインポート
print('--- sys.path ---')
pprint.pprint(sys.path)
print('--- loaded modules ---')
pprint.pprint([m for m in sys.modules if m.startswith('my_package')])
```
このコードを`main.py`に書いて実行すると,以下のような出力が得られる．
```bash
python3 main.py
```

```bash
--- sys.path ---
['/Users/.../my_project', ...]
--- loaded modules ---
['my_package', 'my_package.sub_a', 'my_package.sub_b']
```

つまり，sys.path は
- “モジュールそのもの” ではなく
- “モジュールを探しに行くディレクトリのリスト”
を保持しているだけ
Python はこのリストに載っているディレクトリの中を順番に探し，
1. 指定されたモジュール名.py
2. 指定されたモジュール名という名前の パッケージ（＝その名前のディレクトリ＋ `__init__.py`）
のどちらかを見つけた時点で読み込む．

したがって
```
my_project/          ← このディレクトリが sys.path に入る
├── main.py
├── my_package/      ← ここは「探す対象」であって sys.path には入らない
│   ├── __init__.py
│   ├── sub_a.py
│   └── sub_b.py
└── my_module.py
````
という構成で `python3 main.py` を実行すると


```bash
/Users/.../my_project   ← #0  ← スクリプトが置かれているディレクトリ
...
```
のように my_project だけが `sys.path` に入り，その中にある `my_package` は入らない．
でも `import my_package` は問題なく成功しますよね？？

理由は,Python が `sys.path[0]`（今回なら `/Users/.../my_project`）を開く
その直下に `my_package` という名前の ディレクトリ＋`__init__.py` があるか調べる
という手順で検索するからです。

:::note warn
**よくある勘違い**
- 「パッケージが sys.path に入っていないと import 出来ない」
→ ルートディレクトリが入っていれば OK
- sys.path.append('.../my_project/my_package') しないとダメ？
→ 不要。逆にやると import my_package.sub_a が壊れる場合がある
:::


## 2. __init__.pyとは何か
それでは__init__.pyの色々を堀探ってみましょう．

### 2.1 パッケージ認識と初期化
- ディレクトリに`__init__.py`があると「このフォルダはパッケージ」とPythonが認識
- インポート時に一度だけ`__init__.py`を実行し,初期化処理（ログ設定や共通変数定義など）を行う

### 2.2 歴史的経緯と役割
1. **Python 2系**では必須ファイル
2. **Python 3.3以降**はPEP 420で名前空間パッケージも可能になったが,明示的な初期化処理やAPI公開制御のために`__init__.py`が今も有用
3. サブモジュールのまとめ読み込みや外部公開APIの制御にも使える

### 2.3 __init__.pyに書けること
- **空ファイル**でもパッケージとして機能
- **初期化処理**を記述して,import時に一度だけ実行
- `__all__` を定義して公開APIを制御
- サブモジュールをまとめてimportさせるエイリアスを作成

例えば以下のようにかける
```my_package/__init__.py
import logging  
logging.basicConfig(level=logging.INFO)

__all__ = ['sub_a', 'sub_b']  
from .sub_a import ClassA  
from .sub_b import function_b
```

### 2.4 相対インポートで構造化
同一パッケージ内のモジュールを相対パスでimportすると,名前衝突を避けられる
```py
from .sub_a import ClassA       # 同階層  
from ..parent.sub_c import helper  # 上位階層  
```

## 3. Flaskプロジェクトでの__init__.pyの役割

### 3.1 エントリーポイントとしての位置付け
Flaskでは環境変数`FLASK_APP`にパッケージ名を指定すると,そのパッケージの`__init__.py`が最初に読み込まれる.ここにアプリ生成関数を定義すると,設定・拡張機能・Blueprintの初期化を一元管理できる.

### 3.2 create_app関数で起動処理をまとめる
```my_flask_app/__init__.py  
from flask import Flask  
from .config import Config  
from .extensions import db, migrate  
from .blueprints import main_bp  

def create_app():  
    app = Flask(__name__)  
    app.config.from_object(Config)  
    db.init_app(app)  
    migrate.init_app(app, db)  
    app.register_blueprint(main_bp)  
    return app  
```
## 4. ダンダー（double underscore）属性の特別扱い

### 4.1 命名規則と種類
前後にアンダースコア2つを付けた名前を**ダンダー（double underscore）属性**と呼ばれ,Pythonのデータモデルに組み込まれている．
代表例は以下の6つ:
- `__init__`
- `__name__`
- `__repr__`
- `__len__`
- `__enter__`
- `__exit__`

### 4.2 Pythonインタプリタ内部での自動検出・呼び出しの使用例

1. **`__init__` と `__repr__` の例**
```python
class MyClass:
   def __init__(self, x):
       self.x = x               # インスタンス生成時に呼ばれる
   def __repr__(self):
       return f"MyClass(x={self.x})"  # repr() や print() で使われる

obj = MyClass(10)
print(obj)       # -> MyClass(x=10)
```
2. **`__len__ `の例**
```python
class MyCollection:
    def __init__(self, items):
        self.items = list(items)
    def __len__(self):
        return len(self.items)  # len() で返り値になる

col = MyCollection([1,2,3,4])
print(len(col))  # -> 4
```
3. **`__enter__` と `__exit__`の例**
```python
class Resource:
    def __enter__(self):
        print("Enter")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exit")

with Resource() as r:
    print("using resource")
# -> Enter
#    using resource
#    Exit
```
4. **`__name__` の例
```py
def main():
    print("This is main")

if __name__ == "__main__":
    main()  # スクリプトとして実行されたときだけ呼び出される
```

これらのダンダー（double underscore）属性はPythonインタプリタが内部で自動的に検出・呼び出す仕組みを持っており,ユーザーコードは定義するだけでよい.

---
このように`__init__.py`はPythonのモジュールシステムにおいて重要な役割を果たしていることがわかる．
`__init__.py`を理解することで,Pythonのモジュールやパッケージの仕組みをより深く理解できるようになるでしょう！
