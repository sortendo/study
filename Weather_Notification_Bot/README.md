# お天気LINE通知Bot設定方法

## 目的
* 2022年当時、Yahoo!天気アプリには「不穏な天気を自動検知して通知する」機能が存在しなかった。
* 現在は一部の自動通知機能が追加されたものの、**任意の天気情報を、任意のタイミングで、細かくカスタマイズして通知する**ことは今もできない。
* この「お天気LINE通知Bot」は、そうした既存アプリでは実現できない**柔軟な天気通知の自動化**を可能にする。

## 使用ツール/インターフェース
* Google App Script
    * （Googleアカウントの作成が必要）
* 気象庁API
    * https://www.jma.go.jp/jma/index.html
* LINE Official Account Manager
* LINE Messaging API
* LINE Developer