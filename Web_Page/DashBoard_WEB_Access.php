<!DOCTYPE HTML PUBLIC>
<html lang="ja">
  <head prefix="og: http://ogp.me/ns#">
    <meta name="robots" content="noindex" />
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta property="og:title" content="DashBoard Web : Access" />
    <meta property="og:description" content="DashBoard Webの玄関ページです。" />
    <meta property="og:site_name" content="DashBoard Web" />
    <meta property="og:image" content="http://iaei0.starfree.jp/KOSEN-Program/img/System/thumbnail.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <link rel="icon" type="image/png" href="./img/System/favicon.png" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Script-Type" content="text/javascript" />
    <title>Access : DashBoard Web</title>
  </head>
  <?php
    $ua = $_SERVER['HTTP_USER_AGENT'];
    $browser = ((strpos($ua, 'iPhone') !== false) || (strpos($ua, 'iPod') !== false) || (strpos($ua, 'Android')) !== false);
        if ($browser == true) {
            $browser = 'sp';
        }
    if ($browser == 'sp') {
        ?>
  <br>
  <body style="margin: 0; padding: 0; font-family: sans-serif; background: #191919; width:80%;;  margin-right:auto; margin-left:auto;line-height:40px;">
    <center>
      <p style="color:white; font-size: 30px;">「DashBoard Web」移動ページ
      </p>
      <br>
      <div style="padding: 10px; margin-bottom: 5px; border: 6px solid yellow; border-radius: 6px;">
      <p style="color:white; font-size: 45px;">注意事項
      </p>
      <a style="color:white; font-size: 15px;">
        このサイトは、令和4年度の自主探究のために制作されたページとなります。
        自主探究に訪れた方にも見ていただけれるように、パソコン用とスマホ用のページがありますが、
        機種に合ったリンクが下に表示されます。
        <br>
        <br>
        制作したウェブページは、お使いの機種によっては上手く表示されない可能性がありますことをご了承ください。
        また、このサイトはJavaScriptを利用しております。
        ブラウザ設定によっては、情報が表示されない可能性がございます。
        <br>
        <br>
        令和6年6月に情報更新の方法や、一部仕様を変更いたしました。
        <br>
        <br>
        このサイトを利用したことによって生じた損害について、制作者は一切の責任を負えません。
      </a>
      </div>
      <br>
      <p style="color:white; font-size:20px;">下記のリンクは、機種によって表示されるリンクが変わります。
      <p><a style="color:white; font-size: 30px;" href="./DashBoard_WEB_SP.html">DashBoard WEB (スマホ用)</a></p>
      <p style="color:white; font-size:15px;">もし表示に不具合があった場合は、<a style="color:white;" href="./DashBoard_WEB_PC.html">パソコン用</a>のページをお試しください。</p>
      <br>
      <p style="color:white; font-size:15px;">R04 : NIT(KOSEN) Hachinohe College , Self-Directed Research
    </center>
  </body>
</html>
<?php
    } else {
        ?>
    <br>
    <body style="margin: 0; padding: 0; font-family: sans-serif; background: #191919; width:80%;;  margin-right:auto; margin-left:auto;line-height:40px;">
      <center>
        <p style="color:white; font-size: 30px;">「DashBoard Web」玄関ページ
        </p>
        <br>
        <div style="padding: 10px; margin-bottom: 5px; border: 6px solid yellow; border-radius: 6px;">
        <p style="color:white; font-size: 25px;}">注意事項
        </p>
        <a style="color:white; font-size: 18px;">
          このサイトは、令和4年度の自主探究のために制作されたページとなります。
          自主探究に訪れた方にも見ていただけれるように、パソコン用とスマホ用のページがありますが、
          機種に合ったリンクが下に表示されます。
          <br>
          <br>
          制作したウェブページは、お使いの機種によっては上手く表示されない可能性がありますことをご了承ください。
          また、このサイトはJavaScriptを利用しております。
          ブラウザ設定によっては、情報が表示されない可能性がございます。
          <br>
          <br>
          令和6年6月に情報更新の方法や、一部仕様を変更いたしました。
          <br>
          <br>
          このサイトを利用したことによって生じた損害について、制作者は一切の責任を負えません。
        </a>
      </div>
        <p style="color:white; font-size:20px;">下記のリンクは、機種によって表示されるリンクが変わります。</p>
        <p><a style="color:white; font-size: 30px;" href="./DashBoard_WEB_PC.html">DashBoard WEB (パソコン用)</a></p>
        <p style="color:white; font-size:20px;">もし表示に不具合があった場合は、<a style="color:white;" href="./DashBoard_WEB_SP.html">スマホ用</a>のページをお試しください。</p>
        <p style="color:white; font-size:20px;">R04 : NIT(KOSEN) Hachinohe College , Self-Directed Research</p>
      </center>
    </body>
  </html>
<?php
    } ?>
