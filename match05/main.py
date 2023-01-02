import time
import requests


def get_answer(page_num=1):
    hot_list = []
    for page in range(1, page_num + 1):
        m = int(time.time() * 1000)

        f = int(time.time()) * 1000

        url = f'https://match.yuanrenxue.com/api/match/5?page={page}&m={m}&f={f}'
        json_data = get_RM4hZBv0dDon443M(ori_m=m)
        print(json_data)
        headers = {
            'User-Agent': 'yuanrenxue.project',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cookie': 'm=' + json_data['m'] + ';RM4hZBv0dDon443M=' + json_data['RM4h'],
        }
        try:
            res = requests.get(url=url, headers=headers)
            res_data = res.json()
            print(res_data)
            hot_list.extend([v['value'] for v in res_data['data']])
        except Exception as e:
            print(e, res.text)

    hot_list.sort()
    print(hot_list)
    ans = sum(hot_list[-5:])
    print(ans)


def get_RM4hZBv0dDon443M(ori_m):
    # enc_m = base64.b64encode(str(ori_m).encode()).decode()
    after_encrypt_key = requests.post(url='http://localhost:8888/encrypt',
                                      data={'encrypt_key': ori_m})
    RM4h_M_dict = after_encrypt_key.json()
    return RM4h_M_dict


if __name__ == '__main__':
    get_answer(5)
