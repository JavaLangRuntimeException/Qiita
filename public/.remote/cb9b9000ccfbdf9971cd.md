---
title: いろんなメディア処理をコマンドラインでやってみよう！(ffmpegの使い方)
tags:
  - ffmpeg
  - CLI
  - コマンド
  - 動画
  - メディア
private: false
updated_at: '2025-04-27T23:59:48+09:00'
id: cb9b9000ccfbdf9971cd
organization_url_name: rits-rcc
slide: false
ignorePublish: false
---
ビデオ変換ツールなどメディア処理ツールは有名なもののほとんどはGUIでコマンドを使わないものが多い．コマンドでもメディア処理を行うことが可能で，**ffmpeg**が有名なパッケージの一種だろう．実際あまりにもできることが多すぎるのでここに書き残しておこうと思う．

# ffmpegとは
ffmpegは，常に強力で多機能なオープンソースのソフトウェアで，ビデオやオーディオの録画，変換，ストリーミングを行うために広く使用されている．また，ほぼすべてのビデオやオービオフォーマットをサポートしており，多くのプラットフォーム（Windows、Mac、Linuxなど）で利用可能である．本記事ではffmpegの中でメディア処理についてフォーカスする．

# ffmpegのインストール
公式サイトからインストーラーをダウンロード
https://ffmpeg.org/download.html

macなら
```
brew install ffmpeg
```
でインストールできる．

# ファイルの状態を参照
```bash
ffmpeg -i input.mp4
```
ファイルの詳細な情報（ビットレート、コーデック、解像度など）を表示することができる．
このコマンドは `input.mp4` のストリーム情報やメタデータなどを表示する．

# メディア変換の各種コマンド
ここではさまざまなメディア変換コマンドを紹介する．

## ビデオのフォーマット変換
```bash
ffmpeg -i input.mkv -codec:v libx264 -codec:a aac output.mp4
```
入力ファイル `input.mkv` を MP4 フォーマットに変換し，`output.mp4`として出力．ビデオコーデックとして libx264 を，オーディオコーデックとして aac を使用している．

## オーディオファイルの変換
```bash
ffmpeg -i input.wav -codec:a libmp3lame output.mp3
```
WAVフォーマットをMP3フォーマットに変換する.

## オーディオのビットレートを変更
```bash
ffmpeg -i input.mp3 -b:a 128k output.mp3
```
オーディオのビットレートを128 kbpsに設定する．

##  オーディオのノイズリダクション
```bash
ffmpeg -i noisy.mp3 -af "afftdn" cleaned.mp3
```
ノイズリダクションフィルター afftdn を使用して，`noisy.mp3` のノイズを減らし，`cleaned.mp3` として出力する．

## オーディオのループ作成
```bash
ffmpeg -stream_loop 5 -i input.mp3 -c copy output.mp3
```
このコマンドは `input.mp3` を5回繰り返して `output.mp3` を作成する．

## ビデオのリサイズ
```bash
ffmpeg -i input.mp4 -vf "scale=1280:720" output.mp4
```
`input.mp4`のサイズを1280x720に変更し，`output.mp4`を出力する．｀`-vf` はビデオフィルターを指定するオプション．

## ビデオからの静止画の抽出
```bash
ffmpeg -i video.mp4 -ss 00:00:10 -vframes 1 output.png
```
`video.mp4` から10秒の位置のフレームを1枚抽出して `output.png` として保存する．

## ビデオのトリミング
```bash
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:00 -c copy output.mp4
```
このコマンドは `input.mp4` の1分から2分の間の部分を `output.mp4` として抽出する．-c copy はすべてのストリームを再エンコードせずにコピーする．

## ビデオのフレームレート変更
```bash
ffmpeg -i input.mp4 -r 30 output.mp4
```
このコマンドは `input.mp4` のフレームレートを30fpsに変更して，`output.mp4` として保存する．

## 複数のビデオの結合
```file.txt
file 'part1.mp4'
file 'part2.mp4'
file 'part3.mp4'
```
同じディレクトリに各動画ファイル(`part1.mp4`,`part2.mp4`,`part3.mp4`)を設置し，同じディレクトリに上記のfile.txtを作成する

```bash
ffmpeg -f concat -safe 0 -i file.txt -c copy output.mp4
```
これで `part1.mp4`, `part2.mp4`, `part3.mp4` が順番に結合され，`output.mp4` として保存される．

# 動画の長さ
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input_video.mp4
```
ffprove(FFmpeg プロジェクトの一部)を使えば動画の長さをとってこれる

