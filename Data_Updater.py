# coding:UTF-8
# Import
import requests
import re
from bs4 import BeautifulSoup
import time
import json
import codecs
import datetime
import ftplib


# Main
def main():
    # Weather
    # エラーが起きた時はスキップ
    weather_skip = False
    try:
        w_data = weather()
        weather_txt = {"TimeStamp": w_data[49],
                       "TimeCheck": w_data[50],
                       "Today": {
                           "Aomori": {"Telop": w_data[0], "Now": w_data[1], "Max": w_data[2],
                                      "Rain": {"A1": w_data[3], "A2": w_data[4], "P1": w_data[5], "P2": w_data[6]},
                                      "Icon": w_data[7]},
                           "Hachinohe": {"Telop": w_data[8], "Now": w_data[9], "Max": w_data[10],
                                         "Rain": {"A1": w_data[11], "A2": w_data[12], "P1": w_data[13],
                                                  "P2": w_data[14]},
                                         "Icon": w_data[15]},
                           "Mutsu": {"Telop": w_data[16], "Now": w_data[17], "Max": w_data[18],
                                     "Rain": {"A1": w_data[19], "A2": w_data[20], "P1": w_data[21], "P2": w_data[22]},
                                     "Icon": w_data[23]}},
                       "Future": {
                           "Aomori": {"Telop": w_data[24], "Max": w_data[25], "Min": w_data[26],
                                      "Rain": {"A1": w_data[27], "A2": w_data[28], "P1": w_data[29], "P2": w_data[30]},
                                      "Icon": w_data[31]},
                           "Hachinohe": {"Telop": w_data[32], "Max": w_data[33], "Min": w_data[34],
                                         "Rain": {"A1": w_data[35], "A2": w_data[36], "P1": w_data[37],
                                                  "P2": w_data[38]},
                                         "Icon": w_data[39]},
                           "Mutsu": {"Telop": w_data[40], "Max": w_data[41], "Min": w_data[42],
                                     "Rain": {"A1": w_data[43], "A2": w_data[44], "P1": w_data[45], "P2": w_data[46]},
                                     "Icon": w_data[47]}},
                       "Text": w_data[48]}
        with codecs.open('./style/Weather.json', 'w', 'utf-8') as f:
            json.dump(weather_txt, f, ensure_ascii=False, indent=3)
            f.close()
    except:
        weather_skip = True
        print("Failure to Acquire Data for Weather.json")
    # Fortune
    # エラーが起きた時はスキップ
    fortune_skip = False
    try:
        # サイトのJSONファイルのタイムスタンプが今日のであれば占いをスキップさせる
        now = datetime.datetime.now()
        today_time = now.year * 10000 + now.month * 100 + now.day
        json_file = "http://iaei0.starfree.jp/KOSEN-Program/style/Weather.json"
        response = requests.get(json_file)
        json_data = response.json()
        json_time = int(json_data["TimeCheck"])
        if today_time == json_time:
            fortune_skip = True
            f_data = fortune()
            fortune_txt = {"Aries": f_data[0], "Taurus": f_data[1], "Gemini": f_data[2], "Cancer": f_data[3],
                           "Leo": f_data[4],
                           "Virgo": f_data[5], "Libra": f_data[6], "Scorpio": f_data[7], "Sagittarius": f_data[8],
                           "Capricorn": f_data[9], "Aquarius": f_data[10], "Pisces": f_data[11]}
            with codecs.open('./style/Fortune.json', 'w', 'utf-8') as f:
                json.dump(fortune_txt, f, ensure_ascii=False, indent=3)
                f.close()
    except:
        fortune_skip = True
        print("Failure to Acquire Data for Weather.json")
    # Jsonファイル更新開始
    # どちらもスキップされた場合は更新しない
    if weather_skip and fortune_skip:
        # サーバー情報
        host = "iaei0.starfree.jp"
        username = "iaei0.starfree.jp"
        password = "IAWeb-Server013"
        port = 21
        timeout = 50
        # ログイン
        with ftplib.FTP() as ftp:
            ftp.connect(host=host, port=port, timeout=timeout)
        ftp.set_pasv("true")
        ftp.login(username, password)
        # Weather.jsonのアップロード
        if not weather_skip:
            Wj_path = "./style/Weather.json"
            # アップロード先
            Wj_up_path = "STOR /KOSEN-Program/style/Weather.json"
            # アップロード
            with open(Wj_path, 'rb') as fp:
                ftp.storbinary(Wj_up_path, fp)
        # Fortune.jsonのアップロード
        if not fortune_skip:
            Fj_path = "./style/Fortune.json"
            # アップロード先
            Fj_up_path = "STOR /KOSEN-Program/style/Fortune.json"
            # アップロード
            with open(Fj_path, 'rb') as fp:
                ftp.storbinary(Fj_up_path, fp)
        ftp.close()
    else:
        print("No Update is made Because Processing Weather and Fortune was Skipped.")


# 天気情報取得
def weather():
    # データ取得準備 ※ 気温以外は「天気予報API(livedoor天気互換)」を使用
    weather_url_aomori = "https://weather.tsukumijima.net/api/forecast/city/020010"
    weather_url_mutsu = "https://weather.tsukumijima.net/api/forecast/city/020020"
    weather_url_hachinohe = "https://weather.tsukumijima.net/api/forecast/city/020030"
    # 青森(Aomori) #
    response = requests.get(weather_url_aomori)
    w_data = response.json()
    # 今日の天気
    # テロップ
    a_t_telop = w_data["forecasts"][0]["telop"]
    # 現在の気温(temp)※青森アメダス
    a_amedas_url = "https://tenki.jp/amedas/2/5/31312.html"
    a_get = requests.get(a_amedas_url)
    a_bs = BeautifulSoup(a_get.content, "html.parser")
    a_temp_elements = str(a_bs.find(class_="amedas-current-list clearfix"))
    a_temp_array = re.findall(r"[-+]?\d*\.\d+|\d+", a_temp_elements)
    a_now = a_temp_array[0]
    # 最高気温
    if w_data["forecasts"][0]["temperature"]["max"]["celsius"] is None:
        a_t_max = "--"
    else:
        a_t_max = w_data["forecasts"][0]["temperature"]["max"]["celsius"]
    # 降水確率(rainy_per)
    a_t_cor1 = w_data["forecasts"][0]["chanceOfRain"]["T00_06"]
    a_t_cor2 = w_data["forecasts"][0]["chanceOfRain"]["T06_12"]
    a_t_cor3 = w_data["forecasts"][0]["chanceOfRain"]["T12_18"]
    a_t_cor4 = w_data["forecasts"][0]["chanceOfRain"]["T18_24"]
    # アイコン
    a_t_icon = w_data["forecasts"][0]["image"]["url"]
    # 天気概要文
    w_text = w_data["description"]["text"].replace("\n", "")
    # 明日の天気
    # テロップ
    a_f_telop = w_data["forecasts"][1]["telop"]
    # 最高気温
    a_f_max = w_data["forecasts"][1]["temperature"]["max"]["celsius"]
    # 最低気温
    a_f_min = w_data["forecasts"][1]["temperature"]["min"]["celsius"]
    # 降水確率(rainy_per)
    a_f_cor1 = w_data["forecasts"][1]["chanceOfRain"]["T00_06"]
    a_f_cor2 = w_data["forecasts"][1]["chanceOfRain"]["T06_12"]
    a_f_cor3 = w_data["forecasts"][1]["chanceOfRain"]["T12_18"]
    a_f_cor4 = w_data["forecasts"][1]["chanceOfRain"]["T18_24"]
    # アイコン
    a_f_icon = w_data["forecasts"][1]["image"]["url"]
    time.sleep(1)

    # 八戸(Hachinohe) #
    response = requests.get(weather_url_hachinohe)
    w_data = response.json()
    # 今日の天気
    # テロップ
    h_t_telop = w_data["forecasts"][0]["telop"]
    # 現在の気温(temp)※青森アメダス
    h_amedas_url = "https://tenki.jp/amedas/2/5/31602.html"
    h_get = requests.get(h_amedas_url)
    h_bs = BeautifulSoup(h_get.content, "html.parser")
    h_temp_elements = str(h_bs.find(class_="amedas-current-list clearfix"))
    h_temp_array = re.findall(r"[-+]?\d*\.\d+|\d+", h_temp_elements)
    h_now = h_temp_array[0]
    # 最高気温
    if w_data["forecasts"][0]["temperature"]["max"]["celsius"] is None:
        h_t_max = "--"
    else:
        h_t_max = w_data["forecasts"][0]["temperature"]["max"]["celsius"]
    # 降水確率(rainy_per)
    h_t_cor1 = w_data["forecasts"][0]["chanceOfRain"]["T00_06"]
    h_t_cor2 = w_data["forecasts"][0]["chanceOfRain"]["T06_12"]
    h_t_cor3 = w_data["forecasts"][0]["chanceOfRain"]["T12_18"]
    h_t_cor4 = w_data["forecasts"][0]["chanceOfRain"]["T18_24"]
    # アイコン
    h_t_icon = w_data["forecasts"][0]["image"]["url"]
    # 明日の天気
    # テロップ
    h_f_telop = w_data["forecasts"][1]["telop"]
    # 最高気温
    h_f_max = w_data["forecasts"][1]["temperature"]["max"]["celsius"]
    # 最低気温
    h_f_min = w_data["forecasts"][1]["temperature"]["min"]["celsius"]
    # 降水確率(rainy_per)
    h_f_cor1 = w_data["forecasts"][1]["chanceOfRain"]["T00_06"]
    h_f_cor2 = w_data["forecasts"][1]["chanceOfRain"]["T06_12"]
    h_f_cor3 = w_data["forecasts"][1]["chanceOfRain"]["T12_18"]
    h_f_cor4 = w_data["forecasts"][1]["chanceOfRain"]["T18_24"]
    # アイコン
    h_f_icon = w_data["forecasts"][1]["image"]["url"]
    time.sleep(1)

    # むつ(Mutsu) #
    response = requests.get(weather_url_mutsu)
    w_data = response.json()
    # 今日の天気
    # テロップ
    m_t_telop = w_data["forecasts"][0]["telop"]
    # 現在の気温(temp)※青森アメダス
    m_amedas_url = "https://tenki.jp/amedas/2/5/31111.html"
    m_get = requests.get(m_amedas_url)
    m_bs = BeautifulSoup(m_get.content, "html.parser")
    m_temp_elements = str(m_bs.find(class_="amedas-current-list clearfix"))
    m_temp_array = re.findall(r"[-+]?\d*\.\d+|\d+", m_temp_elements)
    m_now = m_temp_array[0]
    # 最高気温
    if w_data["forecasts"][0]["temperature"]["max"]["celsius"] is None:
        m_t_max = "--"
    else:
        m_t_max = w_data["forecasts"][0]["temperature"]["max"]["celsius"]
    # 降水確率(rainy_per)
    m_t_cor1 = w_data["forecasts"][0]["chanceOfRain"]["T00_06"]
    m_t_cor2 = w_data["forecasts"][0]["chanceOfRain"]["T06_12"]
    m_t_cor3 = w_data["forecasts"][0]["chanceOfRain"]["T12_18"]
    m_t_cor4 = w_data["forecasts"][0]["chanceOfRain"]["T18_24"]
    # アイコン
    m_t_icon = w_data["forecasts"][0]["image"]["url"]
    # 明日の天気
    # テロップ
    m_f_telop = w_data["forecasts"][1]["telop"]
    # 最高気温
    m_f_max = w_data["forecasts"][1]["temperature"]["max"]["celsius"]
    # 最低気温
    m_f_min = w_data["forecasts"][1]["temperature"]["min"]["celsius"]
    # 降水確率(rainy_per)
    m_f_cor1 = w_data["forecasts"][1]["chanceOfRain"]["T00_06"]
    m_f_cor2 = w_data["forecasts"][1]["chanceOfRain"]["T06_12"]
    m_f_cor3 = w_data["forecasts"][1]["chanceOfRain"]["T12_18"]
    m_f_cor4 = w_data["forecasts"][1]["chanceOfRain"]["T18_24"]
    # アイコン
    m_f_icon = w_data["forecasts"][1]["image"]["url"]
    # タイムスタンプ
    now = datetime.datetime.now()
    time_stamp = now.strftime('%Y/%m/%d %H:%M')
    time_check = now.year * 10000 + now.month * 100 + now.day
    return a_t_telop, a_now, a_t_max, a_t_cor1, a_t_cor2, a_t_cor3, a_t_cor4, a_t_icon, h_t_telop, h_now, h_t_max, h_t_cor1, h_t_cor2, h_t_cor3, h_t_cor4, h_t_icon, m_t_telop, m_now, m_t_max, m_t_cor1, m_t_cor2, m_t_cor3, m_t_cor4, m_t_icon, a_f_telop, a_f_max, a_f_min, a_f_cor1, a_f_cor2, a_f_cor3, a_f_cor4, a_f_icon, h_f_telop, h_f_max, h_f_min, h_f_cor1, h_f_cor2, h_f_cor3, h_f_cor4, h_f_icon, m_f_telop, m_f_max, m_f_min, m_f_cor1, m_f_cor2, m_f_cor3, m_f_cor4, m_f_icon, w_text, time_stamp, time_check


# 占い情報取得
def fortune():
    r_fortune = list(range(1))
    urls = [
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_01.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_02.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_03.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_04.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_05.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_06.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_07.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_08.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_09.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_10.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_11.html",
        "https://service.smt.docomo.ne.jp/portal/fortune/src/fortune_12.html"]
    # 順位の取得と配列化
    for i in urls:
        html = requests.get(i)
        bs = BeautifulSoup(html.content, "html.parser")
        f_rank = bs.select('body > div.review-block > div > h3 > span')
        f_rank_num = int(re.sub(r"\D", "", f_rank[0].contents[0]))
        r_fortune.append(f_rank_num)
        time.sleep(1)
    return r_fortune[1], r_fortune[2], r_fortune[3], r_fortune[4], r_fortune[5], r_fortune[6], r_fortune[7], r_fortune[
        8], r_fortune[9], r_fortune[10], r_fortune[11], r_fortune[12]


# Start
if __name__ == "__main__":
    main()
