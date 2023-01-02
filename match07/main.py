import base64
import io
import itertools

import requests
from fontTools.ttLib import TTFont

from util.generate_file import write_woff
from util.train_data_knn import Classify

knn_data = Classify()
# html += ppo.replace('九不想乖', name[yyq + (window.page - 1) * 10]).replace('win_number', imgnum_arr[yyq] * level_arr[window.page] * 88 + '场').replace(/win_rank/g, imgnum_arr[yyq] + 60 + level_arr[window.page] + '%').replace('random_level', imgnum_arr[yyq] * level_arr[window.page] + 100 * level_arr[window.page]).replace('img_number', yyq * window.page).replace('random_rank_number', val.value.replace(/ /g, '') + 'LP');
names = ['爷灬霸气傀儡', '梦战苍穹', '傲世哥', 'мaη肆風聲', '一刀メ隔世', '横刀メ绝杀', 'Q不死你R死你','魔帝殤邪', '封刀不再战','倾城孤狼',
         '戎马江湖', '狂得像风', '影之哀伤', '謸氕づ独尊', '傲视狂杀', '追风之梦','枭雄在世', '傲视之巅', '黑夜刺客',
         '占你心为王', '爷来取你狗命', '御风踏血', '凫矢暮城', '孤影メ残刀', '野区霸王',
         '噬血啸月', '风逝无迹', '帅的睡不着', '血色杀戮者', '冷视天下', '帅出新高度', '風狆瑬蒗', '灵魂禁锢', 'ヤ地狱篮枫ゞ',
         '溅血メ破天', '剑尊メ杀戮', '塞外う飛龍', '哥‘K纯帅', '逆風祈雨', '恣意踏江山', '望断、天涯路', '地獄惡灵', '疯狂メ孽杀',
         '寂月灭影', '骚年霸称帝王', '狂杀メ无赦', '死灵的哀伤', '撩妹界扛把子', '霸刀☆藐视天下', '潇洒又能打', '狂卩龙灬巅丷峰',
         '羁旅天涯.', '南宫沐风', '风恋绝尘', '剑下孤魂', '一蓑烟雨', '领域★倾战', '威龙丶断魂神狙', '辉煌战绩', '屎来运赚',
         '伱、Bu够档次', '九音引魂箫', '骨子里的傲气', '霸海断长空', '没枪也很狂', '死魂★之灵']


def get_dict_map(font_coordinate_list, glyf_order):
    map_li = map(lambda x: str(int(x)), knn_data.predict(font_coordinate_list))

    uni_li = map(lambda x: x.lower().replace('uni', '&#x') + ';', glyf_order)

    return dict(zip(uni_li, map_li))


def get_font_coordinate_list(font_obj, uni_list):
    """
    获取字体文件的坐标信息列表
    :param font_obj: 字体文件对象
    :param uni_list: 总体文件包含字体的编码列表或元祖
    :return: 字体文件所包含字体的坐标信息列表
    """
    font_coordinate_list = list()
    # print(len(uni_list)) 9
    for uni in uni_list:
        # 每个字的GlyphCoordinates对象，包含连线位置坐标（x,y）元组信息
        word_glyph = font_obj['glyf'][uni].coordinates
        # 将[(147, 151), (154, 89),]转化为[ ,]
        coordinate_list = list(itertools.chain(*word_glyph))
        # print(coordinate_list)
        # 汇总所有文字坐标信息
        font_coordinate_list.append(coordinate_list)

    return font_coordinate_list


def get_ans(page_num):
    headers = {
        'Host': 'match.yuanrenxue.com',
        'Referer': 'http://match.yuanrenxue.com/match/6',
        'User-Agent': 'yuanrenxue.project',
    }
    score = []

    for page in range(1, page_num + 1):
        url = f'http://match.yuanrenxue.com/api/match/7?page={page}'

        res = requests.get(url=url, headers=headers).json()
        # 字体文件base64数据
        woff_data = res['woff']
        assert len(woff_data) > 0, "Not Found Font File"
        # [{},{}]
        data = res['data']
        # 解析新提字体文件
        new_font_file = TTFont(io.BytesIO(base64.b64decode(woff_data)))
        with open(f'test.woff', 'wb') as file:
            file.write(base64.b64decode(woff_data))
        # 去除第一个空值
        glyf_order = new_font_file.getGlyphOrder()[1:]
        # 获取新字体坐标列表
        font_coordinate_list = get_font_coordinate_list(new_font_file, glyf_order)

        font_map_dict = get_dict_map(font_coordinate_list, glyf_order)
        # print(font_map_dict) 3236
        # print(font_map_dict)
        # print(data)
        for d in data:
            for uni in font_map_dict.keys():
                d['value'] = ''.join(d['value'].replace(uni.rstrip(';'), font_map_dict[uni]).split())
            score.append(int(d['value']))
        print(score)
    ans = list(zip(names, score))
    ans.sort(key=lambda x:x[1],reverse=True)
    print(ans[0])
    # print(ans[0])


if __name__ == '__main__':
    get_ans(5)
