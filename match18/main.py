# @Time    : 2023/1/2 13:48
# @Author  : tamya2020
# @File    : main.py
# @Description : 

import time

import execjs
import requests
import re


def yrx18_demo():
    num_sum = 0
    for page_num in range(1, 6):
        with open('yrx18.js', 'r', encoding='utf-8') as f:
            encrypt = f.read()
            v = execjs.compile(encrypt).call('vEncrypt', page_num)
        headers = {
            "user-agent": "yuanrenxue.project",
        }
        cookies = {
            "sessionid": "tqzplwwzhu6zgo5r2ig8kbos603upati",
        }
        params = {
            "t": str(int(time.time() * 1000))[:-3],
            "v": v
        }
        url = "https://match.yuanrenxue.com/match/18data?page=%s" % page_num
        response = requests.get(url, headers=headers, cookies=cookies, params=params)
        for i in range(10):
            value = response.json()['data'][i]
            num = re.findall(r"'value': (.*?)}", str(value))[0]
            num_sum += int(num)
    print(num_sum)


if __name__ == '__main__':
    yrx18_demo()