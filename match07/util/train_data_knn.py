import itertools
import os
from pathlib import Path
from typing import List

import numpy as np
import pandas as pd

from sklearn.impute import SimpleImputer
from sklearn.neighbors import KNeighborsClassifier

from fontTools.ttLib import TTFont

# _fonts_path = os.path.dirname(os.path.abspath(__file__))
_fonts_path = Path(__file__).absolute().parent.parent / "font"


def get_coordinates_info(font, cli):
    glyf_order = font.getGlyphOrder()[1:]
    info = list()

    for i, g in enumerate(glyf_order):
        coors = font['glyf'][g].coordinates

        coors = [_ for c in coors for _ in c]

        coors.insert(0, cli[i])

        info.append(coors)

    return info


def get_font_data() -> List[List[List[int]]]:
    font_1 = TTFont(_fonts_path / "tran_1.woff")
    cli_1 = [0, 3, 9, 4, 2, 6, 7, 5, 8, 1]
    coor_info_1 = get_coordinates_info(font_1, cli_1)
    # print(f"coor_info_1:{coor_info_1}\n")

    font_2 = TTFont(_fonts_path / "tran_2.woff")
    cli_2 = [5, 8, 9, 2, 4, 6, 7, 0, 3, 1]
    coor_info_2 = get_coordinates_info(font_2, cli_2)

    font_3 = TTFont(_fonts_path / "tran_3.woff")
    cli_3 = [2, 5, 9, 1, 0, 3, 8, 7, 4, 6]
    coor_info_3 = get_coordinates_info(font_3, cli_3)

    font_4 = TTFont(_fonts_path / "tran_4.woff")
    cli_4 = [1, 5, 2, 4, 3, 8, 0, 9, 7, 6]
    coor_info_4 = get_coordinates_info(font_4, cli_4)

    font_5 = TTFont(_fonts_path / "tran_5.woff")
    cli_5 = [3, 2, 1, 5, 9, 8, 6, 7, 4, 0]
    coor_info_5 = get_coordinates_info(font_5, cli_5)

    font_6 = TTFont(_fonts_path / "tran_6.woff")
    cli_6 = [9, 6, 0, 5, 1, 3, 2, 7, 4, 8]
    coor_info_6 = get_coordinates_info(font_6, cli_6)

    font_7 = TTFont(_fonts_path / "tran_7.woff")
    cli_7 = [0, 6, 2, 8, 4, 9, 7, 1, 5, 3]
    coor_info_7 = get_coordinates_info(font_7, cli_7)

    font_8 = TTFont(_fonts_path / "tran_8.woff")
    cli_8 = [9, 1, 8, 4, 5, 7, 0, 6, 2, 3]
    coor_info_8 = get_coordinates_info(font_8, cli_8)

    font_9 = TTFont(_fonts_path / "tran_9.woff")
    cli_9 = [2, 9, 4, 6, 8, 5, 7, 0, 1, 3]
    coor_info_9 = get_coordinates_info(font_9, cli_9)

    font_10 = TTFont(_fonts_path / "tran_10.woff")
    cli_10 = [2, 6, 9, 4, 1, 8, 0, 7, 5, 3]
    coor_info_10 = get_coordinates_info(font_10, cli_10)

    infos = coor_info_1 + coor_info_2 + coor_info_3 + coor_info_4 + coor_info_5 + coor_info_6 + coor_info_7 \
            + coor_info_8 + coor_info_9 + coor_info_10
    return infos


class Classify:
    def __init__(self):
        self.len = None
        self.knn = self.get_knn()

    def process_data(self, data):
        """
        fit(): Method calculates the parameters μ and σ and saves them as internal objects.
        解释：简单来说，就是求得训练集X的均值，方差，最大值，最小值,这些训练集X固有的属性。

        transform(): Method using these calculated parameters apply the transformation to a particular dataset.
        解释：在fit的基础上，进行标准化，降维，归一化等操作（看具体用的是哪个工具，如PCA，StandardScaler等）。

        fit_transform(): joins the fit() and transform() method for transformation of dataset.
        解释：fit_transform是fit和transform的组合，既包括了训练又包含了转换。
        transform()和fit_transform()二者的功能都是对数据进行某种统一处理（比如标准化~N(0,1)，将数据缩放(映射)到某个固定区间，归一化，正则化等）

        :param data:
        :return:
        """
        # 处理缺失值
        imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
        return pd.DataFrame(imputer.fit_transform(pd.DataFrame(data)))

    def get_knn(self):
        data = self.process_data(get_font_data())

        x = data.drop([0], axis=1)  # 特征值 坐标
        y = data[0]  # target 0 - 9
        x_train = x.head(30)
        y_train = y.head(30)
        x_test = x.tail(10)
        y_test = y.tail(10)

        knn = KNeighborsClassifier(n_neighbors=1)
        knn.fit(x_train, y_train)

        self.len = x_train.shape[1]
        # 预测结果
        y_predict = knn.predict(x_test)
        # 得出准确率
        print(knn.score(x_test, y_test))

        return knn

    def predict(self, data):
        df = pd.DataFrame(data)

        data = pd.concat([df, pd.DataFrame(np.zeros(
            (df.shape[0], self.len - df.shape[1])), columns=range(df.shape[1], self.len))])

        data = self.process_data(data)

        y_predict = self.knn.predict(data)

        return y_predict


def get_dict_map(font_coordinate_list, glyf_order, knn_data):
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


if __name__ == '__main__':
    # print(get_font_data())
    a = Classify()
    new_font_file = TTFont(_fonts_path / "standard_one.woff")
    # 去除第一个空值
    glyf_order = new_font_file.getGlyphOrder()[1:]
    # 获取新字体坐标列表
    font_coordinate_list = get_font_coordinate_list(new_font_file, glyf_order)
    font_map_dict = get_dict_map(font_coordinate_list, glyf_order, a)
    print(font_map_dict)
