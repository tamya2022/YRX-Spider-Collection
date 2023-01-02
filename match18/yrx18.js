// 引用 crypto-js 加密模块
var CryptoJS = require('crypto-js')

function vEncrypt(text_num) {
    var text = text_num + "|67m508,66m509,66d509,66m509,66u509"
    var timestamp = Math.round(Date.parse(new Date()) / 1000);
    var aesIv = timestamp.toString(16) + timestamp.toString(16);
    var key = CryptoJS.enc.Utf8.parse(aesIv),
        iv = CryptoJS.enc.Utf8.parse(aesIv),
        srcs = CryptoJS.enc.Utf8.parse(text),
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}

// console.log(vEncrypt(2));