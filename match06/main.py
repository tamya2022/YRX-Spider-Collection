import random
import time
import requests


def get_m(timestamp, counts):
    data = {'timestamp': timestamp, 'counts': counts}
    print(data)
    encrypt_url = 'http://localhost:8888/encrypt'

    res = requests.post(url=encrypt_url, data=data)
    print(res.text)
    m = res.text
    return m


def get_ans(page_num):
    headers = {
        # 'Host': 'match.yuanrenxue.com',
        # 'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://match.yuanrenxue.com/match/6',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    ans = 0
    q = ""
    for page in range(1, page_num + 1):
        timestamp = int(time.time()) * 1000
        m = get_m(timestamp, page)
        # q: 1-1633764414000|2-1633764417000|
        q += f'{page}-' + str(timestamp) + '|'
        print(q)
        params = {
            'm': m,
            'q': q,
            'page': page
        }

        url = f'https://match.yuanrenxue.com/api/match/6'

        if page > 3:
            headers['User-Agent'] = 'yuanrenxue.project'

        response = requests.get(url=url, headers=headers, params=params)
        json_data = response.json()
        try:
            for value in json_data['data']:
                ans += value['value']
        except Exception:
            print(json_data, response.url)
        time.sleep(random.randint(2, 5))
    # 一等奖是三等奖的15倍，二等奖是三等奖的8倍
    print(ans * 24)


if __name__ == '__main__':
    get_ans(5)
