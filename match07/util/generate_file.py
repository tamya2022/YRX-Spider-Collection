import base64

import requests

headers = {
    'Host': 'match.yuanrenxue.com',
    'Referer': 'http://match.yuanrenxue.com/match/6',
    'User-Agent': 'yuanrenxue.project',
}


def get_page(url):
    return requests.get(url=url, headers=headers).json()


def decode_base64(content):
    return base64.b64decode(content)


def write_woff(data, name):
    with open(f'../font/tran_{name}.woff', 'wb') as file:
        file.write(data)


if __name__ == '__main__':
    for index in range(8, 12):
        url = "https://match.yuanrenxue.com/api/match/7?page=2"
        woff_file_name = index
        content = get_page(url=url)
        write_woff(data=decode_base64(content=content['woff']), name=woff_file_name)
