# Coding : UTF-8 #
# Import
import requests
import time
import datetime
import json
import codecs


def data():
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
    # 現在の気温(temp) # 気象データ Web API
    a_amedas_url = "https://api.cultivationdata.net/amds?no=31312"
    temp_response = requests.get(a_amedas_url)
    temp_data = temp_response.json()
    a_now = temp_data["temp"][0]
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
    w_text = w_data["description"]["text"].replace("\n\n", "#BR#")
    w_text = w_text.replace("\n", "#BR#")
    w_text = w_text.replace("#BR#＜天気変化等の留意点＞", "<br><br>＜天気変化等の留意点＞")
    w_text = w_text.replace("#BR#", "<br>")
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

    # 八戸(Hachinohe)
    response = requests.get(weather_url_hachinohe)
    w_data = response.json()
    # 今日の天気
    # テロップ
    h_t_telop = w_data["forecasts"][0]["telop"]
    # 現在の気温(temp)
    h_amedas_url = "https://api.cultivationdata.net/amds?no=31602"
    temp_response = requests.get(h_amedas_url)
    temp_data = temp_response.json()
    h_now = temp_data["temp"][0]
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

    # むつ(Mutsu)
    response = requests.get(weather_url_mutsu)
    w_data = response.json()
    # 今日の天気
    # テロップ
    m_t_telop = w_data["forecasts"][0]["telop"]
    # 現在の気温(temp)
    m_amedas_url = "https://api.cultivationdata.net/amds?no=31111"
    temp_response = requests.get(m_amedas_url)
    temp_data = temp_response.json()
    m_now = temp_data["temp"][0]
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
    # 分は00、15、30、45のいずれか
    if 0 <= now.minute < 15:
        time_stamp = now.strftime('%Y/%m/%d %H:00')
    elif 15 <= now.minute < 30:
        time_stamp = now.strftime('%Y/%m/%d %H:15')
    elif 30 <= now.minute < 45:
        time_stamp = now.strftime('%Y/%m/%d %H:30')
    else:
        time_stamp = now.strftime('%Y/%m/%d %H:45')
    time_check = now.year * 10000 + now.month * 100 + now.day
    return a_t_telop, a_now, a_t_max, a_t_cor1, a_t_cor2, a_t_cor3, a_t_cor4, a_t_icon, h_t_telop, h_now, h_t_max, h_t_cor1, h_t_cor2, h_t_cor3, h_t_cor4, h_t_icon, m_t_telop, m_now, m_t_max, m_t_cor1, m_t_cor2, m_t_cor3, m_t_cor4, m_t_icon, a_f_telop, a_f_max, a_f_min, a_f_cor1, a_f_cor2, a_f_cor3, a_f_cor4, a_f_icon, h_f_telop, h_f_max, h_f_min, h_f_cor1, h_f_cor2, h_f_cor3, h_f_cor4, h_f_icon, m_f_telop, m_f_max, m_f_min, m_f_cor1, m_f_cor2, m_f_cor3, m_f_cor4, m_f_icon, w_text, time_stamp, time_check


# JSONファイル作成
w_data = data()
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
# Jsonファイル作成
with codecs.open('../public_html/KOSEN-Program/json//Weather.json', 'w', 'utf-8') as f:
    json.dump(weather_txt, f, ensure_ascii=False, indent=3)
    f.close()
