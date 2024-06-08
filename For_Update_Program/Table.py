# Coding : UTF-8 #
# Import
import camelot
import json
import codecs
import PyPDF2
import requests
import ftplib
import datetime
import os
import time
import re
from bs4 import BeautifulSoup

# ファイルダウンロード
now = datetime.datetime.now()
now_str = now.strftime("%Y-%m-%d")
# ディレクトリに今日のファイルがあれば更新はパス
now_file = f"KOSEN-{now_str}.pdf"
if not os.path.isfile(f"./{now_file}"):
    # 過去のpdfを削除
    files = os.listdir("./")
    for file in files:
        # ファイルがPDFであるかどうかを確認
        if file.endswith(".pdf"):
            file_path = os.path.join("./", file)
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Can't remove {file_path}, Error : {e}")
                time.sleep(2)
                exit()
    html = requests.get("https://www.hachinohe-ct.ac.jp/schoollife/messageboard/forms02.php")
    bs = BeautifulSoup(html.content, "html.parser")
    # 旧式取得(セレクター取得)
    """
    href_element = bs.select(
        '#l-contents-main > main > section > article > div > div.c-entry__body > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > a:nth-child(3)')
    for i in href_element:
        url = i.get('href')
    response = requests.get(url)
    """
    # 新式取得(aタグテキスト一致取得)
    url = response = ""
    # テキストパターン
    pattern = re.compile(r'(休講情報)')
    # リンク検索
    target_link = bs.find('a', string=pattern)
    if target_link:
        url = target_link.get('href')
    else:
        print("Link Not Found")
        time.sleep(2)
        exit()
    # ダウンロード
    response = requests.get(url)
    dl_file = response.content
    with open(now_file, "wb") as f:
        f.write(dl_file)
else:
    print(f"There is already {now_file}")
    time.sleep(2)
    exit()

# 仕分け準備
tables = camelot.read_pdf(now_file, pages='all')
pdf_reader = PyPDF2.PdfReader(now_file)
page_num = len(pdf_reader.pages)
# 仕分け用変数(最大10件分)
count_l1 = 0
l1_day = ["", "", "", "", "", "", "", "", "", ""]  # 日付
l1_time = ["", "", "", "", "", "", "", "", "", ""]  # 時限
l1_b = ["", "", "", "", "", "", "", "", "", ""]  # 変更前
l1_a = ["", "", "", "", "", "", "", "", "", ""]  # 変更後
count_l2 = 0
l2_day = ["", "", "", "", "", "", "", "", "", ""]
l2_time = ["", "", "", "", "", "", "", "", "", ""]
l2_b = ["", "", "", "", "", "", "", "", "", ""]
l2_a = ["", "", "", "", "", "", "", "", "", ""]
count_l3 = 0
l3_day = ["", "", "", "", "", "", "", "", "", ""]
l3_time = ["", "", "", "", "", "", "", "", "", ""]
l3_b = ["", "", "", "", "", "", "", "", "", ""]
l3_a = ["", "", "", "", "", "", "", "", "", ""]
count_l4 = 0
l4_day = ["", "", "", "", "", "", "", "", "", ""]
l4_time = ["", "", "", "", "", "", "", "", "", ""]
l4_b = ["", "", "", "", "", "", "", "", "", ""]
l4_a = ["", "", "", "", "", "", "", "", "", ""]
count_m1 = 0
m1_day = ["", "", "", "", "", "", "", "", "", ""]
m1_time = ["", "", "", "", "", "", "", "", "", ""]
m1_b = ["", "", "", "", "", "", "", "", "", ""]
m1_a = ["", "", "", "", "", "", "", "", "", ""]
count_e1 = 0
e1_day = ["", "", "", "", "", "", "", "", "", ""]
e1_time = ["", "", "", "", "", "", "", "", "", ""]
e1_b = ["", "", "", "", "", "", "", "", "", ""]
e1_a = ["", "", "", "", "", "", "", "", "", ""]
count_c1 = 0
c1_day = ["", "", "", "", "", "", "", "", "", ""]
c1_time = ["", "", "", "", "", "", "", "", "", ""]
c1_b = ["", "", "", "", "", "", "", "", "", ""]
c1_a = ["", "", "", "", "", "", "", "", "", ""]
count_z1 = 0
z1_day = ["", "", "", "", "", "", "", "", "", ""]
z1_time = ["", "", "", "", "", "", "", "", "", ""]
z1_b = ["", "", "", "", "", "", "", "", "", ""]
z1_a = ["", "", "", "", "", "", "", "", "", ""]
count_m2 = 0
m2_day = ["", "", "", "", "", "", "", "", "", ""]
m2_time = ["", "", "", "", "", "", "", "", "", ""]
m2_b = ["", "", "", "", "", "", "", "", "", ""]
m2_a = ["", "", "", "", "", "", "", "", "", ""]
count_e2 = 0
e2_day = ["", "", "", "", "", "", "", "", "", ""]
e2_time = ["", "", "", "", "", "", "", "", "", ""]
e2_b = ["", "", "", "", "", "", "", "", "", ""]
e2_a = ["", "", "", "", "", "", "", "", "", ""]
count_c2 = 0
c2_day = ["", "", "", "", "", "", "", "", "", ""]
c2_time = ["", "", "", "", "", "", "", "", "", ""]
c2_b = ["", "", "", "", "", "", "", "", "", ""]
c2_a = ["", "", "", "", "", "", "", "", "", ""]
count_z2 = 0
z2_day = ["", "", "", "", "", "", "", "", "", ""]
z2_time = ["", "", "", "", "", "", "", "", "", ""]
z2_b = ["", "", "", "", "", "", "", "", "", ""]
z2_a = ["", "", "", "", "", "", "", "", "", ""]
count_m3 = 0
m3_day = ["", "", "", "", "", "", "", "", "", ""]
m3_time = ["", "", "", "", "", "", "", "", "", ""]
m3_b = ["", "", "", "", "", "", "", "", "", ""]
m3_a = ["", "", "", "", "", "", "", "", "", ""]
count_e3 = 0
e3_day = ["", "", "", "", "", "", "", "", "", ""]
e3_time = ["", "", "", "", "", "", "", "", "", ""]
e3_b = ["", "", "", "", "", "", "", "", "", ""]
e3_a = ["", "", "", "", "", "", "", "", "", ""]
count_c3 = 0
c3_day = ["", "", "", "", "", "", "", "", "", ""]
c3_time = ["", "", "", "", "", "", "", "", "", ""]
c3_b = ["", "", "", "", "", "", "", "", "", ""]
c3_a = ["", "", "", "", "", "", "", "", "", ""]
count_z3 = 0
z3_day = ["", "", "", "", "", "", "", "", "", ""]
z3_time = ["", "", "", "", "", "", "", "", "", ""]
z3_b = ["", "", "", "", "", "", "", "", "", ""]
z3_a = ["", "", "", "", "", "", "", "", "", ""]
count_m4 = 0
m4_day = ["", "", "", "", "", "", "", "", "", ""]
m4_time = ["", "", "", "", "", "", "", "", "", ""]
m4_b = ["", "", "", "", "", "", "", "", "", ""]
m4_a = ["", "", "", "", "", "", "", "", "", ""]
count_e4 = 0
e4_day = ["", "", "", "", "", "", "", "", "", ""]
e4_time = ["", "", "", "", "", "", "", "", "", ""]
e4_b = ["", "", "", "", "", "", "", "", "", ""]
e4_a = ["", "", "", "", "", "", "", "", "", ""]
count_c4 = 0
c4_day = ["", "", "", "", "", "", "", "", "", ""]
c4_time = ["", "", "", "", "", "", "", "", "", ""]
c4_b = ["", "", "", "", "", "", "", "", "", ""]
c4_a = ["", "", "", "", "", "", "", "", "", ""]
count_z4 = 0
z4_day = ["", "", "", "", "", "", "", "", "", ""]
z4_time = ["", "", "", "", "", "", "", "", "", ""]
z4_b = ["", "", "", "", "", "", "", "", "", ""]
z4_a = ["", "", "", "", "", "", "", "", "", ""]
count_m5 = 0
m5_day = ["", "", "", "", "", "", "", "", "", ""]
m5_time = ["", "", "", "", "", "", "", "", "", ""]
m5_b = ["", "", "", "", "", "", "", "", "", ""]
m5_a = ["", "", "", "", "", "", "", "", "", ""]
count_e5 = 0
e5_day = ["", "", "", "", "", "", "", "", "", ""]
e5_time = ["", "", "", "", "", "", "", "", "", ""]
e5_b = ["", "", "", "", "", "", "", "", "", ""]
e5_a = ["", "", "", "", "", "", "", "", "", ""]
count_c5 = 0
c5_day = ["", "", "", "", "", "", "", "", "", ""]
c5_time = ["", "", "", "", "", "", "", "", "", ""]
c5_b = ["", "", "", "", "", "", "", "", "", ""]
c5_a = ["", "", "", "", "", "", "", "", "", ""]
count_z5 = 0
z5_day = ["", "", "", "", "", "", "", "", "", ""]
z5_time = ["", "", "", "", "", "", "", "", "", ""]
z5_b = ["", "", "", "", "", "", "", "", "", ""]
z5_a = ["", "", "", "", "", "", "", "", "", ""]
count_am1 = 0
am1_day = ["", "", "", "", "", "", "", "", "", ""]
am1_time = ["", "", "", "", "", "", "", "", "", ""]
am1_b = ["", "", "", "", "", "", "", "", "", ""]
am1_a = ["", "", "", "", "", "", "", "", "", ""]
count_ae1 = 0
ae1_day = ["", "", "", "", "", "", "", "", "", ""]
ae1_time = ["", "", "", "", "", "", "", "", "", ""]
ae1_b = ["", "", "", "", "", "", "", "", "", ""]
ae1_a = ["", "", "", "", "", "", "", "", "", ""]
count_ac1 = 0
ac1_day = ["", "", "", "", "", "", "", "", "", ""]
ac1_time = ["", "", "", "", "", "", "", "", "", ""]
ac1_b = ["", "", "", "", "", "", "", "", "", ""]
ac1_a = ["", "", "", "", "", "", "", "", "", ""]
count_az1 = 0
az1_day = ["", "", "", "", "", "", "", "", "", ""]
az1_time = ["", "", "", "", "", "", "", "", "", ""]
az1_b = ["", "", "", "", "", "", "", "", "", ""]
az1_a = ["", "", "", "", "", "", "", "", "", ""]
count_am2 = 0
am2_day = ["", "", "", "", "", "", "", "", "", ""]
am2_time = ["", "", "", "", "", "", "", "", "", ""]
am2_b = ["", "", "", "", "", "", "", "", "", ""]
am2_a = ["", "", "", "", "", "", "", "", "", ""]
count_ae2 = 0
ae2_day = ["", "", "", "", "", "", "", "", "", ""]
ae2_time = ["", "", "", "", "", "", "", "", "", ""]
ae2_b = ["", "", "", "", "", "", "", "", "", ""]
ae2_a = ["", "", "", "", "", "", "", "", "", ""]
count_ac2 = 0
ac2_day = ["", "", "", "", "", "", "", "", "", ""]
ac2_time = ["", "", "", "", "", "", "", "", "", ""]
ac2_b = ["", "", "", "", "", "", "", "", "", ""]
ac2_a = ["", "", "", "", "", "", "", "", "", ""]
count_az2 = 0
az2_day = ["", "", "", "", "", "", "", "", "", ""]
az2_time = ["", "", "", "", "", "", "", "", "", ""]
az2_b = ["", "", "", "", "", "", "", "", "", ""]
az2_a = ["", "", "", "", "", "", "", "", "", ""]
# 仕分け開始
# ページ分繰り返し
for x in range(page_num):
    # 行数分繰り返し
    for y in range(2, 11):
        # L1
        if "L1" in tables[x].df[2][y]:
            if count_l1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                l1_day[count_l1] = day
                l1_time[count_l1] = tables[x].df[3][y]
                l1_b[count_l1] = tables[x].df[4][y]
                l1_a[count_l1] = tables[x].df[6][y]
                count_l1 += 1
        # L2
        if "L2" in tables[x].df[2][y]:
            if count_l2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                l2_day[count_l2] = day
                l2_time[count_l2] = tables[x].df[3][y]
                l2_b[count_l2] = tables[x].df[4][y]
                l2_a[count_l2] = tables[x].df[6][y]
                count_l2 += 1
        # L3
        if "L3" in tables[x].df[2][y]:
            if count_l3 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                l3_day[count_l3] = day
                l3_time[count_l3] = tables[x].df[3][y]
                l3_b[count_l3] = tables[x].df[4][y]
                l3_a[count_l3] = tables[x].df[6][y]
                count_l3 += 1
        # L4
        if "L4" in tables[x].df[2][y]:
            if count_l4 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                l4_day[count_l4] = day
                l4_time[count_l4] = tables[x].df[3][y]
                l4_b[count_l4] = tables[x].df[4][y]
                l4_a[count_l4] = tables[x].df[6][y]
                count_l4 += 1
        # M1
        if "M1" == tables[x].df[2][y]:
            if count_m1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                m1_day[count_m1] = day
                m1_time[count_m1] = tables[x].df[3][y]
                m1_b[count_m1] = tables[x].df[4][y]
                m1_a[count_m1] = tables[x].df[6][y]
                count_m1 += 1
        # E1
        if "E1" == tables[x].df[2][y]:
            if count_e1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                e1_day[count_e1] = day
                e1_time[count_e1] = tables[x].df[3][y]
                e1_b[count_e1] = tables[x].df[4][y]
                e1_a[count_e1] = tables[x].df[6][y]
                count_e1 += 1
        # C1
        if "C1" == tables[x].df[2][y]:
            if count_c1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                c1_day[count_c1] = day
                c1_time[count_c1] = tables[x].df[3][y]
                c1_b[count_c1] = tables[x].df[4][y]
                c1_a[count_c1] = tables[x].df[6][y]
                count_c1 += 1
        # Z1
        if "Z1" == tables[x].df[2][y]:
            if count_z1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                z1_day[count_z1] = day
                z1_time[count_z1] = tables[x].df[3][y]
                z1_b[count_z1] = tables[x].df[4][y]
                z1_a[count_z1] = tables[x].df[6][y]
                count_z1 += 1
        # M2
        if "M2" == tables[x].df[2][y]:
            if count_m2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                m2_day[count_m2] = day
                m2_time[count_m2] = tables[x].df[3][y]
                m2_b[count_m2] = tables[x].df[4][y]
                m2_a[count_m2] = tables[x].df[6][y]
                count_m2 += 1
        # E2
        if "E2" == tables[x].df[2][y]:
            if count_e2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                e2_day[count_e2] = day
                e2_time[count_e2] = tables[x].df[3][y]
                e2_b[count_e2] = tables[x].df[4][y]
                e2_a[count_e2] = tables[x].df[6][y]
                count_e2 += 1
        # C2
        if "C2" == tables[x].df[2][y]:
            if count_c2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                c2_day[count_c2] = day
                c2_time[count_c2] = tables[x].df[3][y]
                c2_b[count_c2] = tables[x].df[4][y]
                c2_a[count_c2] = tables[x].df[6][y]
                count_c2 += 1
        # Z2
        if "Z2" == tables[x].df[2][y]:
            if count_z2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                z2_day[count_z2] = day
                z2_time[count_z2] = tables[x].df[3][y]
                z2_b[count_z2] = tables[x].df[4][y]
                z2_a[count_z2] = tables[x].df[6][y]
                count_z2 += 1
        # M3
        if "M3" in tables[x].df[2][y]:
            if count_m3 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                m3_day[count_m3] = day
                m3_time[count_m3] = tables[x].df[3][y]
                m3_b[count_m3] = tables[x].df[4][y]
                m3_a[count_m3] = tables[x].df[6][y]
                count_m3 += 1
        # E3
        if "E3" in tables[x].df[2][y]:
            if count_e3 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                e3_day[count_e3] = day
                e3_time[count_e3] = tables[x].df[3][y]
                e3_b[count_e3] = tables[x].df[4][y]
                e3_a[count_e3] = tables[x].df[6][y]
                count_e3 += 1
        # C3
        if "C3" in tables[x].df[2][y]:
            if count_c3 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                c3_day[count_c3] = day
                c3_time[count_c3] = tables[x].df[3][y]
                c3_b[count_c3] = tables[x].df[4][y]
                c3_a[count_c3] = tables[x].df[6][y]
                count_c3 += 1
        # Z3
        if "Z3" in tables[x].df[2][y]:
            if count_z3 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                z3_day[count_z3] = day
                z3_time[count_z3] = tables[x].df[3][y]
                z3_b[count_z3] = tables[x].df[4][y]
                z3_a[count_z3] = tables[x].df[6][y]
                count_z3 += 1
        # M4
        if "M4" in tables[x].df[2][y]:
            if count_m4 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                m4_day[count_m4] = day
                m4_time[count_m4] = tables[x].df[3][y]
                m4_b[count_m4] = tables[x].df[4][y]
                m4_a[count_m4] = tables[x].df[6][y]
                count_m4 += 1
        # E4
        if "E4" in tables[x].df[2][y]:
            if count_e4 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                e4_day[count_e4] = day
                e4_time[count_e4] = tables[x].df[3][y]
                e4_b[count_e4] = tables[x].df[4][y]
                e4_a[count_e4] = tables[x].df[6][y]
                count_e4 += 1
        # C4
        if "C4" in tables[x].df[2][y]:
            if count_c4 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                c4_day[count_c4] = day
                c4_time[count_c4] = tables[x].df[3][y]
                c4_b[count_c4] = tables[x].df[4][y]
                c4_a[count_c4] = tables[x].df[6][y]
                count_c4 += 1
        # Z4
        if "Z4" in tables[x].df[2][y]:
            if count_z4 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                z4_day[count_z4] = day
                z4_time[count_z4] = tables[x].df[3][y]
                z4_b[count_z4] = tables[x].df[4][y]
                z4_a[count_z4] = tables[x].df[6][y]
                count_z4 += 1
        # M5
        if "M5" in tables[x].df[2][y]:
            if count_m5 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                m5_day[count_m5] = day
                m5_time[count_m5] = tables[x].df[3][y]
                m5_b[count_m5] = tables[x].df[4][y]
                m5_a[count_m5] = tables[x].df[6][y]
                count_m5 += 1
        # E5
        if "E5" in tables[x].df[2][y]:
            if count_e5 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                e5_day[count_e5] = day
                e5_time[count_e5] = tables[x].df[3][y]
                e5_b[count_e5] = tables[x].df[4][y]
                e5_a[count_e5] = tables[x].df[6][y]
                count_e5 += 1
        # C5
        if "C5" in tables[x].df[2][y]:
            if count_c5 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                c5_day[count_c5] = day
                c5_time[count_c5] = tables[x].df[3][y]
                c5_b[count_c5] = tables[x].df[4][y]
                c5_a[count_c5] = tables[x].df[6][y]
                count_c5 += 1
        # Z5
        if "Z5" in tables[x].df[2][y]:
            if count_z5 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                z5_day[count_z5] = day
                z5_time[count_z5] = tables[x].df[3][y]
                z5_b[count_z5] = tables[x].df[4][y]
                z5_a[count_z5] = tables[x].df[6][y]
                count_z5 += 1
        # AM1
        if "AM1" in tables[x].df[2][y]:
            if count_am1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                am1_day[count_am1] = day
                am1_time[count_am1] = tables[x].df[3][y]
                am1_b[count_am1] = tables[x].df[4][y]
                am1_a[count_am1] = tables[x].df[6][y]
                count_am1 += 1
        # AE1
        if "AE1" in tables[x].df[2][y]:
            if count_ae1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                ae1_day[count_ae1] = day
                ae1_time[count_ae1] = tables[x].df[3][y]
                ae1_b[count_ae1] = tables[x].df[4][y]
                ae1_a[count_ae1] = tables[x].df[6][y]
                count_ae1 += 1
        # AC1
        if "AC1" in tables[x].df[2][y]:
            if count_ac1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                ac1_day[count_ac1] = day
                ac1_time[count_ac1] = tables[x].df[3][y]
                ac1_b[count_ac1] = tables[x].df[4][y]
                ac1_a[count_ac1] = tables[x].df[6][y]
                count_ac1 += 1
        # AZ1
        if "AZ1" in tables[x].df[2][y]:
            if count_az1 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                az1_day[count_az1] = day
                az1_time[count_az1] = tables[x].df[3][y]
                az1_b[count_az1] = tables[x].df[4][y]
                az1_a[count_az1] = tables[x].df[6][y]
                count_az1 += 1
        # AM2
        if "AM2" in tables[x].df[2][y]:
            if count_am2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                am2_day[count_am2] = day
                am2_time[count_am2] = tables[x].df[3][y]
                am2_b[count_am2] = tables[x].df[4][y]
                am2_a[count_am2] = tables[x].df[6][y]
                count_am2 += 1
        # AE2
        if "AE2" in tables[x].df[2][y]:
            if count_ae2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                ae2_day[count_ae2] = day
                ae2_time[count_ae2] = tables[x].df[3][y]
                ae2_b[count_ae2] = tables[x].df[4][y]
                ae2_a[count_ae2] = tables[x].df[6][y]
                count_ae2 += 1
        # AC2
        if "AC2" in tables[x].df[2][y]:
            if count_ac2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                ac2_day[count_ac2] = day
                ac2_time[count_ac2] = tables[x].df[3][y]
                ac2_b[count_ac2] = tables[x].df[4][y]
                ac2_a[count_ac2] = tables[x].df[6][y]
                count_ac2 += 1
        # AZ2
        if "AZ2" in tables[x].df[2][y]:
            if count_az2 < 10:
                day = tables[x].df[0][y] + "(" + tables[x].df[1][y] + ")"
                az2_day[count_az2] = day
                az2_time[count_az2] = tables[x].df[3][y]
                az2_b[count_az2] = tables[x].df[4][y]
                az2_a[count_az2] = tables[x].df[6][y]
                count_az2 += 1
tables_txt = {
    "L1": {
        "Day": {
            "D1": l1_day[0],
            "D2": l1_day[1],
            "D3": l1_day[2],
            "D4": l1_day[3],
            "D5": l1_day[4],
            "D6": l1_day[5],
            "D7": l1_day[6],
            "D8": l1_day[7],
            "D9": l1_day[8],
            "D10": l1_day[9]
        },
        "Time": {
            "T1": l1_time[0],
            "T2": l1_time[1],
            "T3": l1_time[2],
            "T4": l1_time[3],
            "T5": l1_time[4],
            "T6": l1_time[5],
            "T7": l1_time[6],
            "T8": l1_time[7],
            "T9": l1_time[8],
            "T10": l1_time[9]
        },
        "B": {
            "B1": l1_b[0],
            "B2": l1_b[1],
            "B3": l1_b[2],
            "B4": l1_b[3],
            "B5": l1_b[4],
            "B6": l1_b[5],
            "B7": l1_b[6],
            "B8": l1_b[7],
            "B9": l1_b[8],
            "B10": l1_b[9]
        },
        "A": {
            "A1": l1_a[0],
            "A2": l1_a[1],
            "A3": l1_a[2],
            "A4": l1_a[3],
            "A5": l1_a[4],
            "A6": l1_a[5],
            "A7": l1_a[6],
            "A8": l1_a[7],
            "A9": l1_a[8],
            "A10": l1_a[9]
        }
    },
    "L2": {
        "Day": {
            "D1": l2_day[0],
            "D2": l2_day[1],
            "D3": l2_day[2],
            "D4": l2_day[3],
            "D5": l2_day[4],
            "D6": l2_day[5],
            "D7": l2_day[6],
            "D8": l2_day[7],
            "D9": l2_day[8],
            "D10": l2_day[9]
        },
        "Time": {
            "T1": l2_time[0],
            "T2": l2_time[1],
            "T3": l2_time[2],
            "T4": l2_time[3],
            "T5": l2_time[4],
            "T6": l2_time[5],
            "T7": l2_time[6],
            "T8": l2_time[7],
            "T9": l2_time[8],
            "T10": l2_time[9]
        },
        "B": {
            "B1": l2_b[0],
            "B2": l2_b[1],
            "B3": l2_b[2],
            "B4": l2_b[3],
            "B5": l2_b[4],
            "B6": l2_b[5],
            "B7": l2_b[6],
            "B8": l2_b[7],
            "B9": l2_b[8],
            "B10": l2_b[9]
        },
        "A": {
            "A1": l2_a[0],
            "A2": l2_a[1],
            "A3": l2_a[2],
            "A4": l2_a[3],
            "A5": l2_a[4],
            "A6": l2_a[5],
            "A7": l2_a[6],
            "A8": l2_a[7],
            "A9": l2_a[8],
            "A10": l2_a[9]
        }
    },
    "L3": {
        "Day": {
            "D1": l3_day[0],
            "D2": l3_day[1],
            "D3": l3_day[2],
            "D4": l3_day[3],
            "D5": l3_day[4],
            "D6": l3_day[5],
            "D7": l3_day[6],
            "D8": l3_day[7],
            "D9": l3_day[8],
            "D10": l3_day[9]
        },
        "Time": {
            "T1": l3_time[0],
            "T2": l3_time[1],
            "T3": l3_time[2],
            "T4": l3_time[3],
            "T5": l3_time[4],
            "T6": l3_time[5],
            "T7": l3_time[6],
            "T8": l3_time[7],
            "T9": l3_time[8],
            "T10": l3_time[9]
        },
        "B": {
            "B1": l3_b[0],
            "B2": l3_b[1],
            "B3": l3_b[2],
            "B4": l3_b[3],
            "B5": l3_b[4],
            "B6": l3_b[5],
            "B7": l3_b[6],
            "B8": l3_b[7],
            "B9": l3_b[8],
            "B10": l3_b[9]
        },
        "A": {
            "A1": l3_a[0],
            "A2": l3_a[1],
            "A3": l3_a[2],
            "A4": l3_a[3],
            "A5": l3_a[4],
            "A6": l3_a[5],
            "A7": l3_a[6],
            "A8": l3_a[7],
            "A9": l3_a[8],
            "A10": l3_a[9]
        }
    },
    "L4": {
        "Day": {
            "D1": l4_day[0],
            "D2": l4_day[1],
            "D3": l4_day[2],
            "D4": l4_day[3],
            "D5": l4_day[4],
            "D6": l4_day[5],
            "D7": l4_day[6],
            "D8": l4_day[7],
            "D9": l4_day[8],
            "D10": l4_day[9]
        },
        "Time": {
            "T1": l4_time[0],
            "T2": l4_time[1],
            "T3": l4_time[2],
            "T4": l4_time[3],
            "T5": l4_time[4],
            "T6": l4_time[5],
            "T7": l4_time[6],
            "T8": l4_time[7],
            "T9": l4_time[8],
            "T10": l4_time[9]
        },
        "B": {
            "B1": l4_b[0],
            "B2": l4_b[1],
            "B3": l4_b[2],
            "B4": l4_b[3],
            "B5": l4_b[4],
            "B6": l4_b[5],
            "B7": l4_b[6],
            "B8": l4_b[7],
            "B9": l4_b[8],
            "B10": l4_b[9]
        },
        "A": {
            "A1": l4_a[0],
            "A2": l4_a[1],
            "A3": l4_a[2],
            "A4": l4_a[3],
            "A5": l4_a[4],
            "A6": l4_a[5],
            "A7": l4_a[6],
            "A8": l4_a[7],
            "A9": l4_a[8],
            "A10": l4_a[9]
        }
    },
    "M1": {
        "Day": {
            "D1": m1_day[0],
            "D2": m1_day[1],
            "D3": m1_day[2],
            "D4": m1_day[3],
            "D5": m1_day[4],
            "D6": m1_day[5],
            "D7": m1_day[6],
            "D8": m1_day[7],
            "D9": m1_day[8],
            "D10": m1_day[9]
        },
        "Time": {
            "T1": m1_time[0],
            "T2": m1_time[1],
            "T3": m1_time[2],
            "T4": m1_time[3],
            "T5": m1_time[4],
            "T6": m1_time[5],
            "T7": m1_time[6],
            "T8": m1_time[7],
            "T9": m1_time[8],
            "T10": m1_time[9]
        },
        "B": {
            "B1": m1_b[0],
            "B2": m1_b[1],
            "B3": m1_b[2],
            "B4": m1_b[3],
            "B5": m1_b[4],
            "B6": m1_b[5],
            "B7": m1_b[6],
            "B8": m1_b[7],
            "B9": m1_b[8],
            "B10": m1_b[9]
        },
        "A": {
            "A1": m1_a[0],
            "A2": m1_a[1],
            "A3": m1_a[2],
            "A4": m1_a[3],
            "A5": m1_a[4],
            "A6": m1_a[5],
            "A7": m1_a[6],
            "A8": m1_a[7],
            "A9": m1_a[8],
            "A10": m1_a[9]
        }
    },
    "E1": {
        "Day": {
            "D1": e1_day[0],
            "D2": e1_day[1],
            "D3": e1_day[2],
            "D4": e1_day[3],
            "D5": e1_day[4],
            "D6": e1_day[5],
            "D7": e1_day[6],
            "D8": e1_day[7],
            "D9": e1_day[8],
            "D10": e1_day[9]
        },
        "Time": {
            "T1": e1_time[0],
            "T2": e1_time[1],
            "T3": e1_time[2],
            "T4": e1_time[3],
            "T5": e1_time[4],
            "T6": e1_time[5],
            "T7": e1_time[6],
            "T8": e1_time[7],
            "T9": e1_time[8],
            "T10": e1_time[9]
        },
        "B": {
            "B1": e1_b[0],
            "B2": e1_b[1],
            "B3": e1_b[2],
            "B4": e1_b[3],
            "B5": e1_b[4],
            "B6": e1_b[5],
            "B7": e1_b[6],
            "B8": e1_b[7],
            "B9": e1_b[8],
            "B10": e1_b[9]
        },
        "A": {
            "A1": e1_a[0],
            "A2": e1_a[1],
            "A3": e1_a[2],
            "A4": e1_a[3],
            "A5": e1_a[4],
            "A6": e1_a[5],
            "A7": e1_a[6],
            "A8": e1_a[7],
            "A9": e1_a[8],
            "A10": e1_a[9]
        }
    },
    "C1": {
        "Day": {
            "D1": c1_day[0],
            "D2": c1_day[1],
            "D3": c1_day[2],
            "D4": c1_day[3],
            "D5": c1_day[4],
            "D6": c1_day[5],
            "D7": c1_day[6],
            "D8": c1_day[7],
            "D9": c1_day[8],
            "D10": c1_day[9]
        },
        "Time": {
            "T1": c1_time[0],
            "T2": c1_time[1],
            "T3": c1_time[2],
            "T4": c1_time[3],
            "T5": c1_time[4],
            "T6": c1_time[5],
            "T7": c1_time[6],
            "T8": c1_time[7],
            "T9": c1_time[8],
            "T10": c1_time[9]
        },
        "B": {
            "B1": c1_b[0],
            "B2": c1_b[1],
            "B3": c1_b[2],
            "B4": c1_b[3],
            "B5": c1_b[4],
            "B6": c1_b[5],
            "B7": c1_b[6],
            "B8": c1_b[7],
            "B9": c1_b[8],
            "B10": c1_b[9]
        },
        "A": {
            "A1": c1_a[0],
            "A2": c1_a[1],
            "A3": c1_a[2],
            "A4": c1_a[3],
            "A5": c1_a[4],
            "A6": c1_a[5],
            "A7": c1_a[6],
            "A8": c1_a[7],
            "A9": c1_a[8],
            "A10": c1_a[9]
        }
    },
    "Z1": {
        "Day": {
            "D1": z1_day[0],
            "D2": z1_day[1],
            "D3": z1_day[2],
            "D4": z1_day[3],
            "D5": z1_day[4],
            "D6": z1_day[5],
            "D7": z1_day[6],
            "D8": z1_day[7],
            "D9": z1_day[8],
            "D10": z1_day[9]
        },
        "Time": {
            "T1": z1_time[0],
            "T2": z1_time[1],
            "T3": z1_time[2],
            "T4": z1_time[3],
            "T5": z1_time[4],
            "T6": z1_time[5],
            "T7": z1_time[6],
            "T8": z1_time[7],
            "T9": z1_time[8],
            "T10": z1_time[9]
        },
        "B": {
            "B1": z1_b[0],
            "B2": z1_b[1],
            "B3": z1_b[2],
            "B4": z1_b[3],
            "B5": z1_b[4],
            "B6": z1_b[5],
            "B7": z1_b[6],
            "B8": z1_b[7],
            "B9": z1_b[8],
            "B10": z1_b[9]
        },
        "A": {
            "A1": z1_a[0],
            "A2": z1_a[1],
            "A3": z1_a[2],
            "A4": z1_a[3],
            "A5": z1_a[4],
            "A6": z1_a[5],
            "A7": z1_a[6],
            "A8": z1_a[7],
            "A9": z1_a[8],
            "A10": z1_a[9]
        }
    },
    "M2": {
        "Day": {
            "D1": m2_day[0],
            "D2": m2_day[1],
            "D3": m2_day[2],
            "D4": m2_day[3],
            "D5": m2_day[4],
            "D6": m2_day[5],
            "D7": m2_day[6],
            "D8": m2_day[7],
            "D9": m2_day[8],
            "D10": m2_day[9]
        },
        "Time": {
            "T1": m2_time[0],
            "T2": m2_time[1],
            "T3": m2_time[2],
            "T4": m2_time[3],
            "T5": m2_time[4],
            "T6": m2_time[5],
            "T7": m2_time[6],
            "T8": m2_time[7],
            "T9": m2_time[8],
            "T10": m2_time[9]
        },
        "B": {
            "B1": m2_b[0],
            "B2": m2_b[1],
            "B3": m2_b[2],
            "B4": m2_b[3],
            "B5": m2_b[4],
            "B6": m2_b[5],
            "B7": m2_b[6],
            "B8": m2_b[7],
            "B9": m2_b[8],
            "B10": m2_b[9]
        },
        "A": {
            "A1": m2_a[0],
            "A2": m2_a[1],
            "A3": m2_a[2],
            "A4": m2_a[3],
            "A5": m2_a[4],
            "A6": m2_a[5],
            "A7": m2_a[6],
            "A8": m2_a[7],
            "A9": m2_a[8],
            "A10": m2_a[9]
        }
    },
    "E2": {
        "Day": {
            "D1": e2_day[0],
            "D2": e2_day[1],
            "D3": e2_day[2],
            "D4": e2_day[3],
            "D5": e2_day[4],
            "D6": e2_day[5],
            "D7": e2_day[6],
            "D8": e2_day[7],
            "D9": e2_day[8],
            "D10": e2_day[9]
        },
        "Time": {
            "T1": e2_time[0],
            "T2": e2_time[1],
            "T3": e2_time[2],
            "T4": e2_time[3],
            "T5": e2_time[4],
            "T6": e2_time[5],
            "T7": e2_time[6],
            "T8": e2_time[7],
            "T9": e2_time[8],
            "T10": e2_time[9]
        },
        "B": {
            "B1": e2_b[0],
            "B2": e2_b[1],
            "B3": e2_b[2],
            "B4": e2_b[3],
            "B5": e2_b[4],
            "B6": e2_b[5],
            "B7": e2_b[6],
            "B8": e2_b[7],
            "B9": e2_b[8],
            "B10": e2_b[9]
        },
        "A": {
            "A1": e2_a[0],
            "A2": e2_a[1],
            "A3": e2_a[2],
            "A4": e2_a[3],
            "A5": e2_a[4],
            "A6": e2_a[5],
            "A7": e2_a[6],
            "A8": e2_a[7],
            "A9": e2_a[8],
            "A10": e2_a[9]
        }
    },
    "C2": {
        "Day": {
            "D1": c2_day[0],
            "D2": c2_day[1],
            "D3": c2_day[2],
            "D4": c2_day[3],
            "D5": c2_day[4],
            "D6": c2_day[5],
            "D7": c2_day[6],
            "D8": c2_day[7],
            "D9": c2_day[8],
            "D10": c2_day[9]
        },
        "Time": {
            "T1": c2_time[0],
            "T2": c2_time[1],
            "T3": c2_time[2],
            "T4": c2_time[3],
            "T5": c2_time[4],
            "T6": c2_time[5],
            "T7": c2_time[6],
            "T8": c2_time[7],
            "T9": c2_time[8],
            "T10": c2_time[9]
        },
        "B": {
            "B1": c2_b[0],
            "B2": c2_b[1],
            "B3": c2_b[2],
            "B4": c2_b[3],
            "B5": c2_b[4],
            "B6": c2_b[5],
            "B7": c2_b[6],
            "B8": c2_b[7],
            "B9": c2_b[8],
            "B10": c2_b[9]
        },
        "A": {
            "A1": c2_a[0],
            "A2": c2_a[1],
            "A3": c2_a[2],
            "A4": c2_a[3],
            "A5": c2_a[4],
            "A6": c2_a[5],
            "A7": c2_a[6],
            "A8": c2_a[7],
            "A9": c2_a[8],
            "A10": c2_a[9]
        }
    },
    "Z2": {
        "Day": {
            "D1": z2_day[0],
            "D2": z2_day[1],
            "D3": z2_day[2],
            "D4": z2_day[3],
            "D5": z2_day[4],
            "D6": z2_day[5],
            "D7": z2_day[6],
            "D8": z2_day[7],
            "D9": z2_day[8],
            "D10": z2_day[9]
        },
        "Time": {
            "T1": z2_time[0],
            "T2": z2_time[1],
            "T3": z2_time[2],
            "T4": z2_time[3],
            "T5": z2_time[4],
            "T6": z2_time[5],
            "T7": z2_time[6],
            "T8": z2_time[7],
            "T9": z2_time[8],
            "T10": z2_time[9]
        },
        "B": {
            "B1": z2_b[0],
            "B2": z2_b[1],
            "B3": z2_b[2],
            "B4": z2_b[3],
            "B5": z2_b[4],
            "B6": z2_b[5],
            "B7": z2_b[6],
            "B8": z2_b[7],
            "B9": z2_b[8],
            "B10": z2_b[9]
        },
        "A": {
            "A1": z2_a[0],
            "A2": z2_a[1],
            "A3": z2_a[2],
            "A4": z2_a[3],
            "A5": z2_a[4],
            "A6": z2_a[5],
            "A7": z2_a[6],
            "A8": z2_a[7],
            "A9": z2_a[8],
            "A10": z2_a[9]
        }
    },
    "M3": {
        "Day": {
            "D1": m3_day[0],
            "D2": m3_day[1],
            "D3": m3_day[2],
            "D4": m3_day[3],
            "D5": m3_day[4],
            "D6": m3_day[5],
            "D7": m3_day[6],
            "D8": m3_day[7],
            "D9": m3_day[8],
            "D10": m3_day[9]
        },
        "Time": {
            "T1": m3_time[0],
            "T2": m3_time[1],
            "T3": m3_time[2],
            "T4": m3_time[3],
            "T5": m3_time[4],
            "T6": m3_time[5],
            "T7": m3_time[6],
            "T8": m3_time[7],
            "T9": m3_time[8],
            "T10": m3_time[9]
        },
        "B": {
            "B1": m3_b[0],
            "B2": m3_b[1],
            "B3": m3_b[2],
            "B4": m3_b[3],
            "B5": m3_b[4],
            "B6": m3_b[5],
            "B7": m3_b[6],
            "B8": m3_b[7],
            "B9": m3_b[8],
            "B10": m3_b[9]
        },
        "A": {
            "A1": m3_a[0],
            "A2": m3_a[1],
            "A3": m3_a[2],
            "A4": m3_a[3],
            "A5": m3_a[4],
            "A6": m3_a[5],
            "A7": m3_a[6],
            "A8": m3_a[7],
            "A9": m3_a[8],
            "A10": m3_a[9]
        }
    },
    "E3": {
        "Day": {
            "D1": e3_day[0],
            "D2": e3_day[1],
            "D3": e3_day[2],
            "D4": e3_day[3],
            "D5": e3_day[4],
            "D6": e3_day[5],
            "D7": e3_day[6],
            "D8": e3_day[7],
            "D9": e3_day[8],
            "D10": e3_day[9]
        },
        "Time": {
            "T1": e3_time[0],
            "T2": e3_time[1],
            "T3": e3_time[2],
            "T4": e3_time[3],
            "T5": e3_time[4],
            "T6": e3_time[5],
            "T7": e3_time[6],
            "T8": e3_time[7],
            "T9": e3_time[8],
            "T10": e3_time[9]
        },
        "B": {
            "B1": e3_b[0],
            "B2": e3_b[1],
            "B3": e3_b[2],
            "B4": e3_b[3],
            "B5": e3_b[4],
            "B6": e3_b[5],
            "B7": e3_b[6],
            "B8": e3_b[7],
            "B9": e3_b[8],
            "B10": e3_b[9]
        },
        "A": {
            "A1": e3_a[0],
            "A2": e3_a[1],
            "A3": e3_a[2],
            "A4": e3_a[3],
            "A5": e3_a[4],
            "A6": e3_a[5],
            "A7": e3_a[6],
            "A8": e3_a[7],
            "A9": e3_a[8],
            "A10": e3_a[9]
        }
    },
    "C3": {
        "Day": {
            "D1": c3_day[0],
            "D2": c3_day[1],
            "D3": c3_day[2],
            "D4": c3_day[3],
            "D5": c3_day[4],
            "D6": c3_day[5],
            "D7": c3_day[6],
            "D8": c3_day[7],
            "D9": c3_day[8],
            "D10": c3_day[9]
        },
        "Time": {
            "T1": c3_time[0],
            "T2": c3_time[1],
            "T3": c3_time[2],
            "T4": c3_time[3],
            "T5": c3_time[4],
            "T6": c3_time[5],
            "T7": c3_time[6],
            "T8": c3_time[7],
            "T9": c3_time[8],
            "T10": c3_time[9]
        },
        "B": {
            "B1": c3_b[0],
            "B2": c3_b[1],
            "B3": c3_b[2],
            "B4": c3_b[3],
            "B5": c3_b[4],
            "B6": c3_b[5],
            "B7": c3_b[6],
            "B8": c3_b[7],
            "B9": c3_b[8],
            "B10": c3_b[9]
        },
        "A": {
            "A1": c3_a[0],
            "A2": c3_a[1],
            "A3": c3_a[2],
            "A4": c3_a[3],
            "A5": c3_a[4],
            "A6": c3_a[5],
            "A7": c3_a[6],
            "A8": c3_a[7],
            "A9": c3_a[8],
            "A10": c3_a[9]
        }
    },
    "Z3": {
        "Day": {
            "D1": z3_day[0],
            "D2": z3_day[1],
            "D3": z3_day[2],
            "D4": z3_day[3],
            "D5": z3_day[4],
            "D6": z3_day[5],
            "D7": z3_day[6],
            "D8": z3_day[7],
            "D9": z3_day[8],
            "D10": z3_day[9]
        },
        "Time": {
            "T1": z3_time[0],
            "T2": z3_time[1],
            "T3": z3_time[2],
            "T4": z3_time[3],
            "T5": z3_time[4],
            "T6": z3_time[5],
            "T7": z3_time[6],
            "T8": z3_time[7],
            "T9": z3_time[8],
            "T10": z3_time[9]
        },
        "B": {
            "B1": z3_b[0],
            "B2": z3_b[1],
            "B3": z3_b[2],
            "B4": z3_b[3],
            "B5": z3_b[4],
            "B6": z3_b[5],
            "B7": z3_b[6],
            "B8": z3_b[7],
            "B9": z3_b[8],
            "B10": z3_b[9]
        },
        "A": {
            "A1": z3_a[0],
            "A2": z3_a[1],
            "A3": z3_a[2],
            "A4": z3_a[3],
            "A5": z3_a[4],
            "A6": z3_a[5],
            "A7": z3_a[6],
            "A8": z3_a[7],
            "A9": z3_a[8],
            "A10": z3_a[9]
        }
    },
    "M4": {
        "Day": {
            "D1": m4_day[0],
            "D2": m4_day[1],
            "D3": m4_day[2],
            "D4": m4_day[3],
            "D5": m4_day[4],
            "D6": m4_day[5],
            "D7": m4_day[6],
            "D8": m4_day[7],
            "D9": m4_day[8],
            "D10": m4_day[9]
        },
        "Time": {
            "T1": m4_time[0],
            "T2": m4_time[1],
            "T3": m4_time[2],
            "T4": m4_time[3],
            "T5": m4_time[4],
            "T6": m4_time[5],
            "T7": m4_time[6],
            "T8": m4_time[7],
            "T9": m4_time[8],
            "T10": m4_time[9]
        },
        "B": {
            "B1": m4_b[0],
            "B2": m4_b[1],
            "B3": m4_b[2],
            "B4": m4_b[3],
            "B5": m4_b[4],
            "B6": m4_b[5],
            "B7": m4_b[6],
            "B8": m4_b[7],
            "B9": m4_b[8],
            "B10": m4_b[9]
        },
        "A": {
            "A1": m4_a[0],
            "A2": m4_a[1],
            "A3": m4_a[2],
            "A4": m4_a[3],
            "A5": m4_a[4],
            "A6": m4_a[5],
            "A7": m4_a[6],
            "A8": m4_a[7],
            "A9": m4_a[8],
            "A10": m4_a[9]
        }
    },
    "E4": {
        "Day": {
            "D1": e4_day[0],
            "D2": e4_day[1],
            "D3": e4_day[2],
            "D4": e4_day[3],
            "D5": e4_day[4],
            "D6": e4_day[5],
            "D7": e4_day[6],
            "D8": e4_day[7],
            "D9": e4_day[8],
            "D10": e4_day[9]
        },
        "Time": {
            "T1": e4_time[0],
            "T2": e4_time[1],
            "T3": e4_time[2],
            "T4": e4_time[3],
            "T5": e4_time[4],
            "T6": e4_time[5],
            "T7": e4_time[6],
            "T8": e4_time[7],
            "T9": e4_time[8],
            "T10": e4_time[9]
        },
        "B": {
            "B1": e4_b[0],
            "B2": e4_b[1],
            "B3": e4_b[2],
            "B4": e4_b[3],
            "B5": e4_b[4],
            "B6": e4_b[5],
            "B7": e4_b[6],
            "B8": e4_b[7],
            "B9": e4_b[8],
            "B10": e4_b[9]
        },
        "A": {
            "A1": e4_a[0],
            "A2": e4_a[1],
            "A3": e4_a[2],
            "A4": e4_a[3],
            "A5": e4_a[4],
            "A6": e4_a[5],
            "A7": e4_a[6],
            "A8": e4_a[7],
            "A9": e4_a[8],
            "A10": e4_a[9]
        }
    },
    "C4": {
        "Day": {
            "D1": c4_day[0],
            "D2": c4_day[1],
            "D3": c4_day[2],
            "D4": c4_day[3],
            "D5": c4_day[4],
            "D6": c4_day[5],
            "D7": c4_day[6],
            "D8": c4_day[7],
            "D9": c4_day[8],
            "D10": c4_day[9]
        },
        "Time": {
            "T1": c4_time[0],
            "T2": c4_time[1],
            "T3": c4_time[2],
            "T4": c4_time[3],
            "T5": c4_time[4],
            "T6": c4_time[5],
            "T7": c4_time[6],
            "T8": c4_time[7],
            "T9": c4_time[8],
            "T10": c4_time[9]
        },
        "B": {
            "B1": c4_b[0],
            "B2": c4_b[1],
            "B3": c4_b[2],
            "B4": c4_b[3],
            "B5": c4_b[4],
            "B6": c4_b[5],
            "B7": c4_b[6],
            "B8": c4_b[7],
            "B9": c4_b[8],
            "B10": c4_b[9]
        },
        "A": {
            "A1": c4_a[0],
            "A2": c4_a[1],
            "A3": c4_a[2],
            "A4": c4_a[3],
            "A5": c4_a[4],
            "A6": c4_a[5],
            "A7": c4_a[6],
            "A8": c4_a[7],
            "A9": c4_a[8],
            "A10": c4_a[9]
        }
    },
    "Z4": {
        "Day": {
            "D1": z4_day[0],
            "D2": z4_day[1],
            "D3": z4_day[2],
            "D4": z4_day[3],
            "D5": z4_day[4],
            "D6": z4_day[5],
            "D7": z4_day[6],
            "D8": z4_day[7],
            "D9": z4_day[8],
            "D10": z4_day[9]
        },
        "Time": {
            "T1": z4_time[0],
            "T2": z4_time[1],
            "T3": z4_time[2],
            "T4": z4_time[3],
            "T5": z4_time[4],
            "T6": z4_time[5],
            "T7": z4_time[6],
            "T8": z4_time[7],
            "T9": z4_time[8],
            "T10": z4_time[9]
        },
        "B": {
            "B1": z4_b[0],
            "B2": z4_b[1],
            "B3": z4_b[2],
            "B4": z4_b[3],
            "B5": z4_b[4],
            "B6": z4_b[5],
            "B7": z4_b[6],
            "B8": z4_b[7],
            "B9": z4_b[8],
            "B10": z4_b[9]
        },
        "A": {
            "A1": z4_a[0],
            "A2": z4_a[1],
            "A3": z4_a[2],
            "A4": z4_a[3],
            "A5": z4_a[4],
            "A6": z4_a[5],
            "A7": z4_a[6],
            "A8": z4_a[7],
            "A9": z4_a[8],
            "A10": z4_a[9]
        }
    },
    "M5": {
        "Day": {
            "D1": m5_day[0],
            "D2": m5_day[1],
            "D3": m5_day[2],
            "D4": m5_day[3],
            "D5": m5_day[4],
            "D6": m5_day[5],
            "D7": m5_day[6],
            "D8": m5_day[7],
            "D9": m5_day[8],
            "D10": m5_day[9]
        },
        "Time": {
            "T1": m5_time[0],
            "T2": m5_time[1],
            "T3": m5_time[2],
            "T4": m5_time[3],
            "T5": m5_time[4],
            "T6": m5_time[5],
            "T7": m5_time[6],
            "T8": m5_time[7],
            "T9": m5_time[8],
            "T10": m5_time[9]
        },
        "B": {
            "B1": m5_b[0],
            "B2": m5_b[1],
            "B3": m5_b[2],
            "B4": m5_b[3],
            "B5": m5_b[4],
            "B6": m5_b[5],
            "B7": m5_b[6],
            "B8": m5_b[7],
            "B9": m5_b[8],
            "B10": m5_b[9]
        },
        "A": {
            "A1": m5_a[0],
            "A2": m5_a[1],
            "A3": m5_a[2],
            "A4": m5_a[3],
            "A5": m5_a[4],
            "A6": m5_a[5],
            "A7": m5_a[6],
            "A8": m5_a[7],
            "A9": m5_a[8],
            "A10": m5_a[9]
        }
    },
    "E5": {
        "Day": {
            "D1": e5_day[0],
            "D2": e5_day[1],
            "D3": e5_day[2],
            "D4": e5_day[3],
            "D5": e5_day[4],
            "D6": e5_day[5],
            "D7": e5_day[6],
            "D8": e5_day[7],
            "D9": e5_day[8],
            "D10": e5_day[9]
        },
        "Time": {
            "T1": e5_time[0],
            "T2": e5_time[1],
            "T3": e5_time[2],
            "T4": e5_time[3],
            "T5": e5_time[4],
            "T6": e5_time[5],
            "T7": e5_time[6],
            "T8": e5_time[7],
            "T9": e5_time[8],
            "T10": e5_time[9]
        },
        "B": {
            "B1": e5_b[0],
            "B2": e5_b[1],
            "B3": e5_b[2],
            "B4": e5_b[3],
            "B5": e5_b[4],
            "B6": e5_b[5],
            "B7": e5_b[6],
            "B8": e5_b[7],
            "B9": e5_b[8],
            "B10": e5_b[9]
        },
        "A": {
            "A1": e5_a[0],
            "A2": e5_a[1],
            "A3": e5_a[2],
            "A4": e5_a[3],
            "A5": e5_a[4],
            "A6": e5_a[5],
            "A7": e5_a[6],
            "A8": e5_a[7],
            "A9": e5_a[8],
            "A10": e5_a[9]
        }
    },
    "C5": {
        "Day": {
            "D1": c5_day[0],
            "D2": c5_day[1],
            "D3": c5_day[2],
            "D4": c5_day[3],
            "D5": c5_day[4],
            "D6": c5_day[5],
            "D7": c5_day[6],
            "D8": c5_day[7],
            "D9": c5_day[8],
            "D10": c5_day[9]
        },
        "Time": {
            "T1": c5_time[0],
            "T2": c5_time[1],
            "T3": c5_time[2],
            "T4": c5_time[3],
            "T5": c5_time[4],
            "T6": c5_time[5],
            "T7": c5_time[6],
            "T8": c5_time[7],
            "T9": c5_time[8],
            "T10": c5_time[9]
        },
        "B": {
            "B1": c5_b[0],
            "B2": c5_b[1],
            "B3": c5_b[2],
            "B4": c5_b[3],
            "B5": c5_b[4],
            "B6": c5_b[5],
            "B7": c5_b[6],
            "B8": c5_b[7],
            "B9": c5_b[8],
            "B10": c5_b[9]
        },
        "A": {
            "A1": c5_a[0],
            "A2": c5_a[1],
            "A3": c5_a[2],
            "A4": c5_a[3],
            "A5": c5_a[4],
            "A6": c5_a[5],
            "A7": c5_a[6],
            "A8": c5_a[7],
            "A9": c5_a[8],
            "A10": c5_a[9]
        }
    },
    "Z5": {
        "Day": {
            "D1": z5_day[0],
            "D2": z5_day[1],
            "D3": z5_day[2],
            "D4": z5_day[3],
            "D5": z5_day[4],
            "D6": z5_day[5],
            "D7": z5_day[6],
            "D8": z5_day[7],
            "D9": z5_day[8],
            "D10": z5_day[9]
        },
        "Time": {
            "T1": z5_time[0],
            "T2": z5_time[1],
            "T3": z5_time[2],
            "T4": z5_time[3],
            "T5": z5_time[4],
            "T6": z5_time[5],
            "T7": z5_time[6],
            "T8": z5_time[7],
            "T9": z5_time[8],
            "T10": z5_time[9]
        },
        "B": {
            "B1": z5_b[0],
            "B2": z5_b[1],
            "B3": z5_b[2],
            "B4": z5_b[3],
            "B5": z5_b[4],
            "B6": z5_b[5],
            "B7": z5_b[6],
            "B8": z5_b[7],
            "B9": z5_b[8],
            "B10": z5_b[9]
        },
        "A": {
            "A1": z5_a[0],
            "A2": z5_a[1],
            "A3": z5_a[2],
            "A4": z5_a[3],
            "A5": z5_a[4],
            "A6": z5_a[5],
            "A7": z5_a[6],
            "A8": z5_a[7],
            "A9": z5_a[8],
            "A10": z5_a[9]
        }
    },
    "AM1": {
        "Day": {
            "D1": am1_day[0],
            "D2": am1_day[1],
            "D3": am1_day[2],
            "D4": am1_day[3],
            "D5": am1_day[4],
            "D6": am1_day[5],
            "D7": am1_day[6],
            "D8": am1_day[7],
            "D9": am1_day[8],
            "D10": am1_day[9]
        },
        "Time": {
            "T1": am1_time[0],
            "T2": am1_time[1],
            "T3": am1_time[2],
            "T4": am1_time[3],
            "T5": am1_time[4],
            "T6": am1_time[5],
            "T7": am1_time[6],
            "T8": am1_time[7],
            "T9": am1_time[8],
            "T10": am1_time[9]
        },
        "B": {
            "B1": am1_b[0],
            "B2": am1_b[1],
            "B3": am1_b[2],
            "B4": am1_b[3],
            "B5": am1_b[4],
            "B6": am1_b[5],
            "B7": am1_b[6],
            "B8": am1_b[7],
            "B9": am1_b[8],
            "B10": am1_b[9]
        },
        "A": {
            "A1": am1_a[0],
            "A2": am1_a[1],
            "A3": am1_a[2],
            "A4": am1_a[3],
            "A5": am1_a[4],
            "A6": am1_a[5],
            "A7": am1_a[6],
            "A8": am1_a[7],
            "A9": am1_a[8],
            "A10": am1_a[9]
        }
    },
    "AE1": {
        "Day": {
            "D1": ae1_day[0],
            "D2": ae1_day[1],
            "D3": ae1_day[2],
            "D4": ae1_day[3],
            "D5": ae1_day[4],
            "D6": ae1_day[5],
            "D7": ae1_day[6],
            "D8": ae1_day[7],
            "D9": ae1_day[8],
            "D10": ae1_day[9]
        },
        "Time": {
            "T1": ae1_time[0],
            "T2": ae1_time[1],
            "T3": ae1_time[2],
            "T4": ae1_time[3],
            "T5": ae1_time[4],
            "T6": ae1_time[5],
            "T7": ae1_time[6],
            "T8": ae1_time[7],
            "T9": ae1_time[8],
            "T10": ae1_time[9]
        },
        "B": {
            "B1": ae1_b[0],
            "B2": ae1_b[1],
            "B3": ae1_b[2],
            "B4": ae1_b[3],
            "B5": ae1_b[4],
            "B6": ae1_b[5],
            "B7": ae1_b[6],
            "B8": ae1_b[7],
            "B9": ae1_b[8],
            "B10": ae1_b[9]
        },
        "A": {
            "A1": ae1_a[0],
            "A2": ae1_a[1],
            "A3": ae1_a[2],
            "A4": ae1_a[3],
            "A5": ae1_a[4],
            "A6": ae1_a[5],
            "A7": ae1_a[6],
            "A8": ae1_a[7],
            "A9": ae1_a[8],
            "A10": ae1_a[9]
        }
    },
    "AC1": {
        "Day": {
            "D1": ac1_day[0],
            "D2": ac1_day[1],
            "D3": ac1_day[2],
            "D4": ac1_day[3],
            "D5": ac1_day[4],
            "D6": ac1_day[5],
            "D7": ac1_day[6],
            "D8": ac1_day[7],
            "D9": ac1_day[8],
            "D10": ac1_day[9]
        },
        "Time": {
            "T1": ac1_time[0],
            "T2": ac1_time[1],
            "T3": ac1_time[2],
            "T4": ac1_time[3],
            "T5": ac1_time[4],
            "T6": ac1_time[5],
            "T7": ac1_time[6],
            "T8": ac1_time[7],
            "T9": ac1_time[8],
            "T10": ac1_time[9]
        },
        "B": {
            "B1": ac1_b[0],
            "B2": ac1_b[1],
            "B3": ac1_b[2],
            "B4": ac1_b[3],
            "B5": ac1_b[4],
            "B6": ac1_b[5],
            "B7": ac1_b[6],
            "B8": ac1_b[7],
            "B9": ac1_b[8],
            "B10": ac1_b[9]
        },
        "A": {
            "A1": ac1_a[0],
            "A2": ac1_a[1],
            "A3": ac1_a[2],
            "A4": ac1_a[3],
            "A5": ac1_a[4],
            "A6": ac1_a[5],
            "A7": ac1_a[6],
            "A8": ac1_a[7],
            "A9": ac1_a[8],
            "A10": ac1_a[9]
        }
    },
    "AZ1": {
        "Day": {
            "D1": az1_day[0],
            "D2": az1_day[1],
            "D3": az1_day[2],
            "D4": az1_day[3],
            "D5": az1_day[4],
            "D6": az1_day[5],
            "D7": az1_day[6],
            "D8": az1_day[7],
            "D9": az1_day[8],
            "D10": az1_day[9]
        },
        "Time": {
            "T1": az1_time[0],
            "T2": az1_time[1],
            "T3": az1_time[2],
            "T4": az1_time[3],
            "T5": az1_time[4],
            "T6": az1_time[5],
            "T7": az1_time[6],
            "T8": az1_time[7],
            "T9": az1_time[8],
            "T10": az1_time[9]
        },
        "B": {
            "B1": az1_b[0],
            "B2": az1_b[1],
            "B3": az1_b[2],
            "B4": az1_b[3],
            "B5": az1_b[4],
            "B6": az1_b[5],
            "B7": az1_b[6],
            "B8": az1_b[7],
            "B9": az1_b[8],
            "B10": az1_b[9]
        },
        "A": {
            "A1": az1_a[0],
            "A2": az1_a[1],
            "A3": az1_a[2],
            "A4": az1_a[3],
            "A5": az1_a[4],
            "A6": az1_a[5],
            "A7": az1_a[6],
            "A8": az1_a[7],
            "A9": az1_a[8],
            "A10": az1_a[9]
        }
    },
    "AM2": {
        "Day": {
            "D1": am2_day[0],
            "D2": am2_day[1],
            "D3": am2_day[2],
            "D4": am2_day[3],
            "D5": am2_day[4],
            "D6": am2_day[5],
            "D7": am2_day[6],
            "D8": am2_day[7],
            "D9": am2_day[8],
            "D10": am2_day[9]
        },
        "Time": {
            "T1": am2_time[0],
            "T2": am2_time[1],
            "T3": am2_time[2],
            "T4": am2_time[3],
            "T5": am2_time[4],
            "T6": am2_time[5],
            "T7": am2_time[6],
            "T8": am2_time[7],
            "T9": am2_time[8],
            "T10": am2_time[9]
        },
        "B": {
            "B1": am2_b[0],
            "B2": am2_b[1],
            "B3": am2_b[2],
            "B4": am2_b[3],
            "B5": am2_b[4],
            "B6": am2_b[5],
            "B7": am2_b[6],
            "B8": am2_b[7],
            "B9": am2_b[8],
            "B10": am2_b[9]
        },
        "A": {
            "A1": am2_a[0],
            "A2": am2_a[1],
            "A3": am2_a[2],
            "A4": am2_a[3],
            "A5": am2_a[4],
            "A6": am2_a[5],
            "A7": am2_a[6],
            "A8": am2_a[7],
            "A9": am2_a[8],
            "A10": am2_a[9]
        }
    },
    "AE2": {
        "Day": {
            "D1": ae2_day[0],
            "D2": ae2_day[1],
            "D3": ae2_day[2],
            "D4": ae2_day[3],
            "D5": ae2_day[4],
            "D6": ae2_day[5],
            "D7": ae2_day[6],
            "D8": ae2_day[7],
            "D9": ae2_day[8],
            "D10": ae2_day[9]
        },
        "Time": {
            "T1": ae2_time[0],
            "T2": ae2_time[1],
            "T3": ae2_time[2],
            "T4": ae2_time[3],
            "T5": ae2_time[4],
            "T6": ae2_time[5],
            "T7": ae2_time[6],
            "T8": ae2_time[7],
            "T9": ae2_time[8],
            "T10": ae2_time[9]
        },
        "B": {
            "B1": ae2_b[0],
            "B2": ae2_b[1],
            "B3": ae2_b[2],
            "B4": ae2_b[3],
            "B5": ae2_b[4],
            "B6": ae2_b[5],
            "B7": ae2_b[6],
            "B8": ae2_b[7],
            "B9": ae2_b[8],
            "B10": ae2_b[9]
        },
        "A": {
            "A1": ae2_a[0],
            "A2": ae2_a[1],
            "A3": ae2_a[2],
            "A4": ae2_a[3],
            "A5": ae2_a[4],
            "A6": ae2_a[5],
            "A7": ae2_a[6],
            "A8": ae2_a[7],
            "A9": ae2_a[8],
            "A10": ae2_a[9]
        }
    },
    "AC2": {
        "Day": {
            "D1": ac2_day[0],
            "D2": ac2_day[1],
            "D3": ac2_day[2],
            "D4": ac2_day[3],
            "D5": ac2_day[4],
            "D6": ac2_day[5],
            "D7": ac2_day[6],
            "D8": ac2_day[7],
            "D9": ac2_day[8],
            "D10": ac2_day[9]
        },
        "Time": {
            "T1": ac2_time[0],
            "T2": ac2_time[1],
            "T3": ac2_time[2],
            "T4": ac2_time[3],
            "T5": ac2_time[4],
            "T6": ac2_time[5],
            "T7": ac2_time[6],
            "T8": ac2_time[7],
            "T9": ac2_time[8],
            "T10": ac2_time[9]
        },
        "B": {
            "B1": ac2_b[0],
            "B2": ac2_b[1],
            "B3": ac2_b[2],
            "B4": ac2_b[3],
            "B5": ac2_b[4],
            "B6": ac2_b[5],
            "B7": ac2_b[6],
            "B8": ac2_b[7],
            "B9": ac2_b[8],
            "B10": ac2_b[9]
        },
        "A": {
            "A1": ac2_a[0],
            "A2": ac2_a[1],
            "A3": ac2_a[2],
            "A4": ac2_a[3],
            "A5": ac2_a[4],
            "A6": ac2_a[5],
            "A7": ac2_a[6],
            "A8": ac2_a[7],
            "A9": ac2_a[8],
            "A10": ac2_a[9]
        }
    },
    "AZ2": {
        "Day": {
            "D1": az2_day[0],
            "D2": az2_day[1],
            "D3": az2_day[2],
            "D4": az2_day[3],
            "D5": az2_day[4],
            "D6": az2_day[5],
            "D7": az2_day[6],
            "D8": az2_day[7],
            "D9": az2_day[8],
            "D10": az2_day[9]
        },
        "Time": {
            "T1": az2_time[0],
            "T2": az2_time[1],
            "T3": az2_time[2],
            "T4": az2_time[3],
            "T5": az2_time[4],
            "T6": az2_time[5],
            "T7": az2_time[6],
            "T8": az2_time[7],
            "T9": az2_time[8],
            "T10": az2_time[9]
        },
        "B": {
            "B1": az2_b[0],
            "B2": az2_b[1],
            "B3": az2_b[2],
            "B4": az2_b[3],
            "B5": az2_b[4],
            "B6": az2_b[5],
            "B7": az2_b[6],
            "B8": az2_b[7],
            "B9": az2_b[8],
            "B10": az2_b[9]
        },
        "A": {
            "A1": az2_a[0],
            "A2": az2_a[1],
            "A3": az2_a[2],
            "A4": az2_a[3],
            "A5": az2_a[4],
            "A6": az2_a[5],
            "A7": az2_a[6],
            "A8": az2_a[7],
            "A9": az2_a[8],
            "A10": az2_a[9]
        }
    }
}
# jsonファイル作成
with codecs.open('../public_html/KOSEN-Program/json/Tables.json', 'w', 'utf-8') as f:
    json.dump(tables_txt, f, ensure_ascii=False, indent=3)
f.close()
