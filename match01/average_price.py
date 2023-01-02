import time

import requests
from selenium import webdriver

# eval(atob(window['b'])[J('0x0', ']dQW')](J('0x1', 'GTu!'), '\x27' + mw + '\x27'));
#
# eval(atob(window['b'])["replace"]("mwqqppz",'mw'));

chromeOptions = webdriver.ChromeOptions()
# chromeOptions.add_argument('--proxy-server=http://127.0.0.1:9000')
# chrome_options.add_argument('--hide-scrollbars')  # 隐藏滚动条, 应对一些特殊页面
# chrome_options.add_argument('blink-settings=imagesEnabled=false')  # 不加载图片, 提升速度
chromeOptions.add_argument('start-maximized')
chromeOptions.add_argument("--headless")
chromeOptions.add_argument('--ignore-certificate-errors')
chromeOptions.add_argument("--disable-blink-features=AutomationControlled")
browser = webdriver.Chrome(chrome_options=chromeOptions)
BASE_URL = f'http://match.yuanrenxue.com/match/1'
API_URL = f'http://match.yuanrenxue.com/api/match/1'
BASE_LOGIN = "https://match.yuanrenxue.com/login"
BASE_COOKIE = {
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1628469720",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1628469720",
    "qpfccr": "true",
    "no-alert3": "true",
    "name": "foo",
    "value": "bar"
}


def convert_cookies_to_dict(cookies):
    cookies = dict([l.split("=", 1) for l in cookies.split("; ")])
    return cookies


def get_data(page_num, md5):
    # url = f'http://match.yuanrenxue.com/api/match/1?page={page_num}&m={md5}'

    data = {
        'page': page_num,
        'm': md5
    }
    headers = {
        'Host': 'match.yuanrenxue.com',
        'Referer': 'http://match.yuanrenxue.com/match/1',
        'User-Agent': 'yuanrenxue.project',
    }
    response = requests.get(url=API_URL, headers=headers, params=data)
    print(response.url)
    return response.json()


def get_token_value(timestamp):
    # browser.add_cookie(cookie_dict=BASE_COOKIE)
    browser.get(BASE_URL)

    my_js = 'return window.f'
    # execute_async_script
    browser.execute_script("oo0O0({})".format(timestamp))
    f_value = browser.execute_script(my_js)
    print(f_value)
    token = f_value + "丨" + str(int(timestamp / 1000))
    return token


if __name__ == '__main__':
    sum_num = 0
    index_num = 0

    for page_num in range(1, 6):
        t = int(time.time())
        timestamp = int(round(t * 1000)) + 100000000
        # timestamp = 1628582953000
        info = get_data(page_num, get_token_value(timestamp))
        print(info)
        price_list = [i['value'] for i in info['data']]
        print(f'第{page_num}页的价格列表{price_list}')
        sum_num += sum(price_list)
        index_num += len(price_list)
        time.sleep(1)

    average_price = sum_num / index_num
    print(f'机票价格的平均值:{average_price}')

    browser.close()
