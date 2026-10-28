---
title: 環境構築（Windows）
description: Git、VS Code、TeX Live 2026 を Windows に入れる手順。完了確認までを案内します。
sidebar:
  order: 1
---

Sigma の執筆に必要な道具を、Windows PC に入れる手順です。
部員全員で「何を、どのバージョンで、どの設定で入れるか」を揃えることが目的なので、手順どおりに進めてください。
Mac の人は、最後の「Mac の場合（差分）」を見てください。

## 入れるもの

| 道具 | バージョン・方針 |
| --- | --- |
| Git for Windows | 公式インストーラ |
| VS Code | 本体のみ必須。コンパイルは拡張機能に頼らず、ターミナルから行います |
| TeX Live | **2026・フル構成**に統一します（パッケージ不足のエラーをなくすため） |

## 0. 作業フォルダの置き場所

先に決めておきます。Sigma の作業フォルダは、次の条件を満たす場所に作ってください。

- 日本語や空白を含まないパス（例: `C:\work\Sigma`）
- OneDrive の同期フォルダの中は避ける

TeX のビルドと Git の両方で、トラブルの元になるためです。

## 1. Git for Windows を入れる

[Git の公式サイト](https://git-scm.com/download/win) からインストーラをダウンロードして実行します。
ほとんどの画面は既定のままで構いませんが、次の2点だけ確認してください。

- **改行コードの画面**: 「Checkout as-is, commit as-is」を選ぶ（Sigma のファイルは改行コード LF に統一するため）
- **エディタの画面**: 既定のままでよい（後で VS Code に設定し直します）

インストールが終わったら、ターミナル（PowerShell など）を開いて、自分の情報を設定します。
メールアドレスは GitHub に登録しているものを書いてください。

```powershell
git config --global user.name "自分の名前"
git config --global user.email "GitHubに登録しているメールアドレス"
```

## 2. VS Code を入れる

[VS Code のダウンロードページ](https://code.visualstudio.com/download) からインストーラを実行します。
インストール時の選択肢で「PATH への追加」にチェックが入っていることを確認してください。

入れたら、VS Code を開いて次を確認します。

- ターミナルが開けること（メニューの「ターミナル → 新しいターミナル」、または `` Ctrl + @ ``）
- Git で使うエディタを VS Code に設定する:

```powershell
git config --global core.editor "code --wait"
```

:::note
Sigma では `.vscode` フォルダの設定を共有しません。
コンパイルは全員、VS Code のターミナル（または PowerShell）から latexmk で行う方法に統一します。
プレビューや入力補完が欲しい人は、拡張機能の LaTeX Workshop を各自で入れても構いません（任意）。
:::

## 3. TeX Live 2026 を入れる

[TeX Live の公式ページ](https://tug.org/texlive/) から Windows 用インストーラ（install-tl-windows.exe）を取得して実行します。

- 構成は **フル構成（scheme-full）** を選ぶ
- ダウンロードとインストールには時間がかかります（数 GB）。時間に余裕があるときに、安定した回線で実行してください
- インストール先のパスは既定のままで構いません

終わったら、ターミナルを**開き直して**から（PATH を反映するため）、次を実行してバージョンが出ることを確認します。

```powershell
lualatex --version
latexmk --version
biber --version
```

## 4. 完了確認: サンプルをコンパイルする

作業フォルダに `sample.tex` というファイルを作り、次の内容を保存します。

```latex
\documentclass{ltjarticle}
\begin{document}
\section{動作確認}
これは動作確認用の文書です。数式も出ます: $a^2 + b^2 = c^2$。
\end{document}
```

そのフォルダでターミナルを開き、コンパイルします。

```powershell
latexmk -lualatex sample.tex
```

`sample.pdf` が生成され、開いて読めれば環境構築は完了です。
次は [執筆クイックスタート](/start/quickstart/) に進んでください。

:::caution
途中で止まったら、エラーメッセージの全文を控えて編集担当に相談してください。
「つまずき対処表」（作成中）にも、よくある症状をまとめていきます。
:::

## Mac の場合（差分）

- TeX は MacTeX 2026（フル構成）を入れる。BasicTeX はパッケージ不足になるため使わない
- Git は、ターミナルで `git --version` を実行すると表示される案内（Xcode Command Line Tools）に従うか、Homebrew から入れる
- VS Code は Mac 版を同じページから入れる
- それ以外の考え方（改行コード、作業フォルダの置き場所、完了確認）は Windows と同じ
