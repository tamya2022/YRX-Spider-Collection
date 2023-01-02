from fontTools.ttLib import TTFont

if __name__ == '__main__':
    base_font = TTFont('./font/standard_one.woff')
    # 获取编码
    glyf_order = base_font.getGlyphOrder()[2:]
    base_font.saveXML('./font/standard_one.xml')

    base_font = TTFont('./font/standard_two.woff')
    base_font.saveXML('./font/standard_two.xml')