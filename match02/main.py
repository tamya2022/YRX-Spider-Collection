import requests


def get_m():
    res = requests.get(url='http://localhost:2229/encrypt')
    m = res.text
    print(m)
    return m


def get_ans(page_num):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    ans = 0

    for page in range(1, page_num + 1):
        if page > 3:
            headers['User-Agent'] = 'yuanrenxue.project'

        url = f'https://match.yuanrenxue.com/api/match/2?page={str(page)}'
        print(f"url:{url}")
        headers['cookie'] = get_m()

        resp = requests.get(url=url, headers=headers).json()
        for value in resp['data']:
            ans += value['value']

    return ans


if __name__ == '__main__':
    print(get_ans(5))

