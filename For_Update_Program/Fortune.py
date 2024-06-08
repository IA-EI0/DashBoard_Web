# Coding : UTF-8 #
# Import
import requests
import json
import codecs
import datetime


def data():
    # APIより順位の取得
    now = datetime.datetime.now()
    url = "http://api.jugemkey.jp/api/horoscope/free/" + str(now.year) + "/" + str(now.month) + "/" + str(now.day)
    z_month = str(now.month).zfill(2)
    date_text = str(now.year) + "/" + z_month + "/" + str(now.day)
    response = requests.get(url)
    rank_data = response.json()
    rank_array = []
    for i in range(12):
        rank = rank_data["horoscope"][date_text][i]["rank"]
        rank_array.append(rank)
    return rank_array


f_data = data()
now = datetime.datetime.now()
z_month = str(now.month).zfill(2)
z_day = str(now.day).zfill(2)
day_str = z_month + "/" + z_day
fortune_txt = {"Aries": f_data[0], "Taurus": f_data[1], "Gemini": f_data[2], "Cancer": f_data[3],
               "Leo": f_data[4],
               "Virgo": f_data[5], "Libra": f_data[6], "Scorpio": f_data[7], "Sagittarius": f_data[8],
               "Capricorn": f_data[9], "Aquarius": f_data[10], "Pisces": f_data[11], "day": day_str}
# Jsonファイル作成
with codecs.open('../public_html/KOSEN-Program/json/Fortune.json', 'w', 'utf-8') as f:
    json.dump(fortune_txt, f, ensure_ascii=False, indent=3)
    f.close()
