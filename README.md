# 猿人学爬虫练习

## 第一题 Js混淆源码乱码
```
var timestamp = Date.parse(new Date()) + 100000000;
var m = oo0O0(timestamp.toString()) + window.f;
var m = window.f;
var m = hex_md5(mwqqppz);
var m = hex_md5(timestamp);
```

## 第二题 JS混淆---动态Cookie

挂油猴脚本过掉debugger，用Fiddler抓包很容易发现第一次请求返回了一段Js，经典的ob混淆用AST处理后容易找到生成Cookie的位置。

## 第四题 雪碧图

var j_key = '.' + hex_md5(btoa(data.key + data.value).replace(/=/g, '')); 生成对应哪些图片不显示的key
left对应偏移量，在计算时要加上原本img的宽度11px。

## 第五题 乱码增强

需要解析四个值cookie中的RM4hZBv0dDon443M，m和参数f，m。
```
"m": window._$is,
"f": window.$_zw[23]

_$Ww = _$Tk["enc"]["Utf8"]["parse"](window["_$pr"]["toString"]());
_0x29dd83 = _$Tk["AES"]["encrypt"](_$Ww, window[_0xc77418("0x6", "OCbs")], {
	"mode": _$Tk["mode"]["ECB"],   // 加密模式
	"padding": _$Tk["pad"]["Pkcs7"]  // 填充方式
});
window["_$ss"] = _0x29dd83["toString"]();
```

搜_$pr容易看到7处位置，分别断电后发现`window["_$pr"]`生成由
```
_0x4e96b4['_$pr']['push'](_0x474032(_$Wa));  执行4次                                      
_0x4e96b4['_$pr']['push'](_0x474032(_$yw));	执行1次
```
同时加密参数 m 的值，就是最后一次加密的时间戳_$yw，字段m的值，就是最后一次函数调用的结果。
`_0xc77418("0x6", "OCbs")`即`_$qF`，可以找到对应位置
`window["_$qF"] = CryptoJS["enc"]["Utf8"]["parse"](window["btoa"](window["_$is"])["slice"](0, 16));`
最后f的值是`window.$_zw[23]`，找到zw的添加位置
```
$_aiding.$_zw.push('明说了，这个数组是指纹');
$_aiding.$_zw.push(Date);
$_aiding.$_zw.push(String);
$_aiding.$_zw.push(eval);
```
根据是指纹这句话的索引6，推出索引23的`$_aiding.$_zw.push($_t1)`,最后可以搜到就是时间戳`let $_t1 = Date.parse(new Date());`


## 第六题 回溯
```
"m": r(t, window.o) 
```
nodejs调试时，针对Message too long for RSA：搜索这段文字找到ce函数，问题处在e参数上即this.n.bitLength() + 7 >> 3，本地为{
"0": -1,"t": 1,"s": 0 }，单步调试可以发现this.n = ae(e, 16)生成位置，ae则时new b对象，b对象则执行this.fromString(t, 256)即
 h(t, e)函数，在这段函数调试时容易发现this.DB的值不同，全局搜索b.prototype.DB可以找到赋值的地方。

## 第七题 动态字体

直接clone下来，需要手动修改train_data_knn里的对照表，用KNN训练数据。

## 第十二题 入门级Js
```
var list = {
    "page": window.page,
    "m": btoa('yuanrenxue' + window.page)
};
```

## 第十三题 入门级Js2

第一次请求返回的JS中的cookie按括号的内字符拼接。

10、第十五题 wasm初体验

看到这句话fetch('/static/match/match15/main.wasm')把文件保存下来，用相应库执行。
vm = pywasm.load("./main.wasm")
result = vm.exec("目标方法", [参数1, 参数2])
直接把wasm文件存下来，进行调用即可。

## 第十六题 webpack初体验
```
r.m = n[e(528)](btoa, p_s)
p_s = Date[e(496)](new Date)[e(517)]();
```
注意在AST简化标识符时全局变量和局部重名产生的错误，以及在switch中的错误。

## Tips

能力有限，分享粗糙的代码和简单的解题思路By tamya2020。