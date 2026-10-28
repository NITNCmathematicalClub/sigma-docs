---
title: "仕様: ビルド"
description: Sigma のビルド仕様。統一 latexmkrc の内容と各行の意味、biber、フォント、shell-escape の扱い（正）。
sidebar:
  order: 2
---

このページは、Sigma のビルドについての決定事項（正）です。
適用は12号からです。

## 前提

- エンジンは LuaLaTeX、文献処理は biblatex + **biber** です（`style.sty` が biblatex のため。bibtex ではありません）
- TeX Live は **2026・フル構成** に統一します。バージョンを上げるのは号替わりのときだけです
- フォントは標準の LaTeX フォントを使い、`style.sty` で独自のフォント指定はしません

## 統一 latexmkrc

設定ファイルは、号フォルダの直下に1本だけ置きます（例: `12/.latexmkrc`）。
個人コピーは作りません。

```perl
$pdf_mode = 4;
$lualatex = 'lualatex -synctex=1 -interaction=nonstopmode -file-line-error %O %S';
$biber = 'biber %O %S';
$bibtex_use = 2;
$max_repeat = 5;
$clean_ext = 'synctex.gz';
```

各行の意味:

- `$pdf_mode = 4`: 出力は LuaLaTeX 経由の PDF にします。エンジンの指定は `$lualatex` 変数で行います
- `-interaction=nonstopmode`: エラーが出ても対話モードで止まらず、最後まで処理します
- `-file-line-error`: エラーを `ファイル名:行番号` の形式で出します。VS Code のターミナルや問題パネルで場所が拾えます
- `-synctex=1`: PDF とソースの相互ジャンプ（SyncTeX）用の情報を付けます
- `$biber` / `$bibtex_use = 2`: 文献処理に biber を使います。biblatex の文書では、latexmk が biber を自動で選びます
- `$max_repeat = 5`: 相互参照と文献を解決するための再実行の上限です
- `$clean_ext`: 掃除（`-c`）のとき SyncTeX のファイルも消す指定です

## 使い方の決まり

latexmk は、カレントフォルダの設定ファイルしか自動で読みません。
そのため、号フォルダ直下の統一設定は、コンパイル時に `-r` で明示的に指定します。

```powershell
cd 12\sXXXXX
latexmk -r ..\.latexmkrc sXXXXX.tex
```

個人フォルダも `_main` も号フォルダの1つ下にあるため、この形は全員共通です。
掃除も同じ指定で `latexmk -r ..\.latexmkrc -c ファイル名.tex`（PDF ごと消す場合は `-C`）とします。

## shell-escape は使わない

統一設定に shell-escape は入れません。Sigma の執筆には不要です。
入っていると、他人の原稿をビルドするときに任意のプログラム実行を許可することになり、安全性が下がります。
