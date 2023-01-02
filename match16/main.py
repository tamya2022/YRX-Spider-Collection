import requests
import time


def get_m(time_str):
    res = requests.post(url='http://localhost:8888/encrypt', data={'encrypt_value': time_str})
    m = res.text
    return m


def get_ans(page_num):
    ans = 0
    headers = {
        'Host': 'match.yuanrenxue.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'User-Agent': 'yuanrenxue.project',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://match.yuanrenxue.com/match/16',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sessionid=gq2bexcnn0z9j6x5ehcqthvxq1t6yp2e',
    }

    for page in range(1, page_num + 1):
        # timestamp = 1634195605000
        timestamp = str(int(time.time()) * 1000)
        # m = "6WGR8KjDG3Q6Gne8b8462eee298d644b981f7a716021b04ZA6jGhciYB"
        m = get_m(timestamp)
        print(timestamp)
        print(m)
        url = f'https://match.yuanrenxue.com/api/match/16?page={page}&m={m}&t={timestamp}'
        res = requests.get(url=url, headers=headers)
        print(res.text)
        datas = res.json()['data']

        for data in datas:
            ans += data['value']

    print(ans)


if __name__ == '__main__':
    get_ans(5)
