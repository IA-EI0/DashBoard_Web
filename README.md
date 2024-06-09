Web DashBoard
====
令和4年度に制作した、天気予報、授業変更・休講情報、占いの順位を表示するサイトです。

サイトリンク : [こちらから](http://iaei0.starfree.jp/KOSEN-Program/DashBoard_WEB_Access.php)

## Description
天気予報、授業変更・休講情報、占いの情報を取得するプログラム(Python)をレンタルサーバー上でCronを用いて定期実行させ、それぞれの情報をまとめたJsonファイルをサーバーの指定のファイルに配置し、サイトがJsonファイルを読み込むことでデータを表示しています。

<img width="50%" src="https://github.com/IA-EI0/DashBoard_Web/assets/86182861/bdebd634-cd9f-4c0c-8dbf-6139eafc8e14"></img>

①Pythonで書かれたプログラムがAPIにアクセスし、情報を取得する。

②APIで取得した情報を整理し、それをJSONファイルとして指定のディレクトリに出力する。

③JavaScriptで書かれたプログラムがJSONファイルを読み込み、ウェブサイトの指定の場所にデータと表示させるようにする。

<br>

令和4年度では有料のレンタルサーバーを用いてデータを定期的に更新していましたが令和5年度に期限を迎えたため、現在は制作者のパソコンが起動している間、定期的にデータを更新するプログラムを常時作動させ更新させています。

## Source of information
天気予報 : [天気予報 API（livedoor 天気互換）](https://weather.tsukumijima.net/)、[気象データ Web API](https://www.cultivationdata.net/weather-web-api.html)

授業変更・休講情報 : [八戸高専ホームページ](https://www.hachinohe-ct.ac.jp/index.php)

占い : [Web ad Fortune 無料版API](http://jugemkey.jp/api/waf/api_free.php)

## Licence
[Apache-2.0 license](https://github.com/IA-EI0/DashBoard_Web/blob/main/LICENSE)
