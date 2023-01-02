const fs = require("fs");//文件读写
const parse = require("@babel/parser"); //解析为ast
const traverse = require('@babel/traverse').default;//遍历节点
const t = require('@babel/types');//类型
const generator = require('@babel/generator').default;//ast解析为代码
const template = require("@babel/template").default;


String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

const jscode = fs.readFileSync("./obsource.js", {
    encoding: "utf-8"
});
Window = global;
_0xceb4b2 = ['name', 'setAttribute', 'type', 'href', 'getAttribute', 'action', 'call', 'string', 'prototype', 'slice', '$_fpn1', 'splice', 'apply', 'ActiveXObject', 'result', 'charCodeAt', 'button', 'send', 'form', 'body', 'mousemove', 'hasOwnProperty', 'hostname', 'location', 'open', 'split', 'setInterval', 'https:', 'click', 'concat', 'method', 'toString', 'nodeType', 'origin', 'floor', 'port', '$_nd', 'HTMLGenericElement', 'tagName', 'cookie', '$_JQnh', 'showModalDialog', 'removeChild', 'keyCode', 'parentNode', 'getTime', 'readyState', 'exec', 'pathname', 'search', 'test', 'iframe', 'setTimeout', 'HTMLFormElement', 'visibility', 'appendChild', 'addEventListener', 'indexedDB', 'script', 'onreadystatechange', 'eval', 'innerHTML', 'value', 'EkcP', 'localStorage', 'onsubmit', 'object', 'protocol', 'content', 'cloneNode', 'indexOf', 'assign', 'write', 'document', 'removeEventListener', 'round', 'style', '$_vvCI', 'replace', 'function', 'MicroMessenger', 'userAgent', 'while', 'onclick', 'input', 'ceil', 'Math', 'hidden', 'target', 'load', 'mbsj{yshcf', 'number', 'createElement', 'getElementsByTagName', 'getElementById', 'attachEvent', '$_fh0', 'clientData', 'submit', 'timeStamp',
    'fonts', 'Only one variable declaration allowed in for..in loop', 'transient', 'arity', 'disabled', 'typeof', 'charset', 'super', 'length', '#f82', 'Msxml2.XMLHTTP.3.0', 'toDataURL', 'ocr_rdytwuRcrraa{exu|v', 'applicationCache', 'multipart/form-data', 'var getAttribute=function(name){return cur_ele.getAttribute(name);};', 'attributes', '[object Array]', 'pushNotification', 'void', 'TK_STRING', '0000', 'attrVertex', 'public', 'stopPropagation', 'z_:jqjsnzr_0+,_9jhtwijwG_xjqjsnzrGhfqq:jqjsnzr', '$_f0', 'hash', 'cellular', 'FSSBB', 'acceleration', 'transferChannel', 'nEvr}C}rlve', 'true', 'createObjectStore', 'Msxml2.XMLHTTP.5.0', 'removeAttribute', 'plugins', '}__ftkxgt_gxcnwcvgD__ygdftkxgt_gxcnwcvgD__ugngpkwo…rgfD__ygdftkxgt_uetkrv_hwpeD__ygdftkxgt_uetkrv_hp', 'try{return (window instanceof Window);}catch(e){}', 'Msxml2.ServerXMLHTTP', 'colorDepth', 't13=spwcpatnl(Atmpaly :lnstyp Byt(0zzwulgg(Cp}olyl…yr@ly~;bxNUAc Asty(9zsta <otl(/sl~stal0zx{wpe@ly~', 'instanceof', 'addBehavior', 'GetOriginalUrl', 'connection', 'include', 'frame', 'return a[b](', 'children', '@debugger', "'null' is not an object", 'func', '$_vJTp', 'rfroxvc7vqqr{', 'screenY', 'Number', 'false', 'srcElement', 'r$?arD21a|fbra2ynbbvpOD21a|fbra<rbbntr2r{cra', 'url(#default#userdata)', 'setRequestHeader', 'import', 'mouseOver', 'meta', 'Msxml.XMLHTTP', 'fN~Hj{AdggAjmhOjjg[NjbjpHn~', 'native', 'gamma', 'getTimezoneOffset', 'datas-ts', '__onload__', 'uC9<vkeo|N;/D', 'jbscheme://queue_has_message', 'setTime', 'item', 'MEDIUM_FLOAT', '_blank', 'float', '#17e', 'extends', 'f__r~{}mdq~m_n|mdko_ai', 'Request', 'Msxml2.ServerXMLHTTP.3.0', 'clientInformation', 'then', 'MSPointerEvent', 'Please enable cookie in your browser before you continue.', 'captureStackTrace', '~)bwf,dpo-bwb,oufsgbdfCkftjpo', 'HTMLObjectElement', 'STATIC_DRAW', 'acos', 'external', 'iwhhdaywlagf[pYk~gycown{Y|dwk~', 'return new a(', 'AnalyserNode', 'mozConnection', 'radio',
    'SetRequestHeader', 'RTCPeerConnection', 'onupgradeneeded', 'parseInt', 'canvas', '?CS=', 'unescape', '; Secure', 'globalStorage', 'Msxml2.XMLHTTP', '~5fbm9jefpE5fbm9jefp?un@ Xdujwf; Zpouspm ?JIDcju@', 'Microsoft.XMLHTTP.1.0', 'catch', 'PerformanceObserver', 'getContext', 'defaultPrevented', 'offsetTop', 'contains', 'data:', '$b_platform', 'https://', 'HIGH_INT', 'objectStoreNames', 'this', 'cygJ+', 'QQBrowser', 'OverrideMimeType', 'zxjqjsnzr', 'width', 'mouseMove', 'char', 'lLxuMBAdzBhz_JC>FJ:_', 'bgsound', 'iEgr9hh{wjwfy{', 'position', 'case', 'pDzjatS5tetrex~}', 'touchend', 'refresh', '$bmF0aXZlRmlVyUHJ', 'prop', 'lastIndexOf', 'callback', 'null', 'Unenclosed string.', 'dNrf~hQfjb+Nrf~hQfjb', 'bRnfnt', 'getAttribLocation', 'JSON', 'nodeValue', 'Gamepad', 'beta', '__anchor__', 'offsetLeft', 'kq\iT\Qduj}ly wexy\]\iTs', 'parse', 'data', '$_fr', 'package', 'rows', 'Object.InjectedScript.evaluate', 'opener', 'mouseup', 'shenjian', 'debugger', 'ethernet', '$_cDro', 'TEMPORARY', '{{ifhvmziv', 'replaceChild', 'POST', 'numItems', 'capture', 'document-fragment', 'font', 'firstChild', 'fromCharCode', 'webkitIndexedDB', 'PointerEvent', 'webkitRequestFileSystem', 'charAt', 'description', '~tqj_ipplfeCnp{Xojnbujpo6ubsu7jnfCnp{,oefyfe[YCnp{5frvftuXojnbujpo)sbnf', 'getBattery', 'kIM9jbXIM9jb', 'absolute', 'responseText', 'cookieEnabled', '{rixwtevoivF__rwF__rw[ttirh:i|xFis=if(vs{wiv', 'final', 'preload', 'Keyboard', 'bluetooth', 'cancelBubble', 'execScript', 'try{return __filename;}catch(e){}', 'var cur_ele = this;', 'with', 'h__p|y{kbo|k_|oxenxm|', 'status',
    'toFixed', 'display', 'substr', '[null] is not an object', 'x*jyv9-/K9-/', 'Z8XHJJY.bmF0aXZlRmlVyUHJ()', 'setItem', '</$1', 'loaded', 'RemoveEventListener', 'onautocomplete', '$b_callHandler', ' srflx ', 'protected', 'match', 'goto', 'drawArrays', 'mediaDevices', 'close', 'webstore', 'webkitRTCPeerConnection', 'Count', 'text/javascript', 'abstract', 'performance', 'Storage', 'g$biie$Z$$fiaa}lZ$$fmjZ$$fmlzZ$b|r$Z$l}y|s=i|};fl}y|s?r}{on}|ChNbcm@lyg}Z$m|r$Z$oc}$', 'languages', '$_fb', 'setLocalDescription', 'source', '/:user_fonts', 'TK_NUMBER', 'scroll', '$b_fetchQueue', '<\!--[if gt IE ', 'jyzm~xzfi~zekvk~fe', 'precision mediump float;varying vec2 varyinTexCoor…n() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}', 'createProgram', '~^\$>bD{]ed_', 'post', 'HTMLElement', 'text/html', '<\!--', 'objectStore', 'fmhj|s)M~zgKgzt~m B- >jiomjg),', 'linkProgram', 'precision', 'ieknakaxadalqy~wf}{', 'Entity', '~ntZsfefoujbmt', 'qrcklmDoExthWJiHAp1sVYKU3RFMQw8IGfPO92bvLNj.7zXBaSnu0TC6gy_4Ze5d{}|~ !#$%()*+,-;=?@[]^', 'uniform2f', 'javascript:', '~8Z:fc(yuCvdxfc', 'replaceState', 'volatile', 'createDataChannel', 'use strict', 'originalTarget', 'e__benabkt__(_benabkt_Na{~anIk~a', 'javascript: void(0);', 'Unexpected character: ', '{"optional" : [ {"RtpDataChannels" : true} ]}', 'Unterminated multiline comment', '/T7AyTrxoWxGd', 'Submit', 'time', 'response', 'rangeMin', 'trim', 'checkbox', 'Z8XHj', 'const', 'SELECT value FROM EkcP_t WHERE name=?', 'Float32Array', 'GetResponseHeader', 'offsetX', 'c#r*^p#H#rklrkmrkDrkorkErkxrktrkhrkWrkJrkirkHrkurltrSD', 'referrer', 'y8,.J8jl+zxr', 'nodeName', 'getResponseHeader', `<meta\s+http-equiv=["']?refresh["']?\s`, 'synchronized', 'export', 'filename', 'openDatabase', 'p__rcHtqQ__v4cHtq', 'enableVertexAttribArray', 'http://', 'height', 'safari', 'SEND', 'jbscheme://', 'p|~kgxdxqx{xejrwp}vt', 'Unenclosed regular expression.', 'webkitPersistentStorage', 'ggmBc||}h', '___ts___',
    'class', 'runtime', 'mozIndexedDB', 'parentElement', 'Missing catch/finally blocks', 'cY#rDABASAnA0ATA61Xs<s>VwR;FnF$F%F MqM8MIMGQqQhQWQ…hmXWmXimS2mSbmSvmSLmSNmSjmS-mS7mSXmSBEtQEsAEspEKp', 'attribute vec2 attrVertex;varying vec2 varyinTexCo…+uniformOffset;gl_Position=vec4(attrVertex,0,1);}', 'boolean', 'pushState', 'removeItem', '\x00', 'characterSet', 'yykrkto{sIk|gr{gzk', 'yield', 'return', 'battery', 'forEach', 'implements', 'evaluate', 'lineno', 'Msxml2.XMLHTTP.6.0', 'TK_REG_EX', 'getSupportedExtensions', '{hsptlmrFhsptlmrmrjsFhsptlmrqixe', 'rgba(240,110,53,0.4)', 'Msxml2.XMLHTTP.4.0', 'mozItems', 'clearInterval', 'throw', 'a=candidate:', '$_ck', 'Abort', 'checked', 'offsetHeight', 'GetVariable', 'offsetWidth', 'selected', 'layerX', 'delete', "(evaluating 'null[0]')", 'standalone', 'screen', 'RegExp', 'clientY', 'charging', 'message', 'Send', 'mimeTypes', 'getItem', '3jeALeSsa6', 'chrome', 'fontFamily', 'default', 'event', 'getUniformLocation', '(this);', 'Unexpected token ', 'transaction', 'orientation', 'getSources', 'undefined', '[native code]', 'QTP_EPE_HOOK', 'fetch', 'video', 'HTMLAnchorElement', 'prpaerwpCtuctdwQrpaerwp_ctuctdwQrwtrz=~vx}Qstrcjae4p{{qprz', 'webkitConnection', 'wifi', '<EMBED id=', 'DOMParser', 'Illegal newline after @throw', 'offsetUniform', 'keyDown', 'returnValue', 'long', 'chargingTime', 'OPEN', 'sduaunuxubgotmzsq', '\b[^>]*>([\s\S]*?)<\/', 'mouseOut', '_ts_', 'continue', 'webgl', 'mouseUp', 'enumerateDevices', 'substring', 'screenX', 'u>okv<vkeo|N>okv<vkeo|H~wI -m~sboD /yx~|yv HSRMls~I', 'level', '<div>IE8</div>', '$b_setup', 'fillStyle', 'candidate', '; path=/', 'http', 'switch', 'clientX', '~esjwfs', 'byte',
    'enabledPlugin', 'rangeMax', 'onbeforeunload', 'encoding', 'parent', 'mousedown', '\\', 'static', 'mouseout', 'getShaderPrecisionFormat', 'vertexAttribPointer', 'jnzwyi~mziXzmvclvkz', 'AddSearchProvider', 'statusText', 'rR#r:ckcEE9Ebx[x]tWt1HP171zs_s+s=s{s}VhVQKhK.K?K}F…@rZuczXcXGmiamG[mG]m9;m9{mS@D]UEtMEtZEt5EtdEt!Et@', '~XhZpouspmEXhZpouspm', 'MEDIUM_INT', 'error', 'lbdo=|wwxc', 'alpha', 'keyUp', '|ghylfhprwlrq', 'shaderSource', 'qrcklmDoExthWJiHAp1sVYKU3RFMQw8IGfPO92bvLNj-7zXBaSnu0TC6gy_4Ze5d~!@$%^&*()+=<>.?/:;{}[]| ', 'password', 'nextSibling', '$_ts', 'random', 'createOffer', 'ARSession,AudioTrackList,BeforeInstallPromptEvent.…ioContext.prototype.close,webkitRequestFileSystem', 'offsetY', 'finally', '~__nuuZsfbuf)sbnfCnuuZvntupn-6', 'base', 'PerformanceObserverEntryList', 'attachShader', 'enable=true', 'onicecandidate', 'try{return __dirname;}catch(e){}', 'INSERT OR REPLACE INTO EkcP_t (name, value) VALUES(?, ?)', 'isNaN', 'Mouse', 'android', 'keyup', 'DeviceOrientationEvent', '{             "iceServers" : [                 {"u…tun4.l.google.com:19302"}             ]         }', 'throws', 'Name expected', 'alert', 'DeviceMotionEvent', 'credentials', 'anchor', 'vertexPosAttrib', 'LOW_FLOAT', '~bqq6dboZmjdlCbqq6dbo)pdvt2vuCbqq6dbo.fz[pxoCbqq6dbo.fz8q', 'audio', 'var submit=function(){for(var t=cur_ele;t!==docume…());)t=t.parentElement;t!==document&&t.submit()};', 'area', "18px 'Arial'", 'ownerDocument', 'Msxml2.ServerXMLHTTP.6.0', 'Msxml2.ServerXMLHTTP.5.0', 'tests', 'Msxml2.ServerXMLHTTP.4.0', 'GetNextReqID', 'textarea', 'documentElement', 'deviceId', 'options', 'unicode', 'behavior', 'detachEvent', 'interface', 'frames', 'executeSql', 'fillText', 'uniformOffset', 'TK_NAME', 'r[#Egx.W|JcArAzpvpS1x1Qs4s!s%s)s?s;VZV]KqKtK^K>UUU…cmjSmjum-im-pm-Ym-3m7Lm7zmz mXrE1CE1^E1]EskEsjEs7', 'self', 'experimental-webgl', '>>>=', 'GetAllResponseHeaders', 'e__MPL__DKKG_JKPEBEAN', 'CREATE TABLE IF NOT EXISTS EkcP_t (id INTEGER NOT …EXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))', '; expires=', 'vdFm', 'dispatchEvent', 'DispatchEvent', 'ARRAY_BUFFER', 'bb82kj', 'double', 'dumpAll', '﻿', 'fontList', 'fillRect', 'Function', 'stringify', 'toLowerCase', 'save',
    'LOW_INT', 'parseFromString', 'toGMTString', 'mouseover', 'elements', 'onerror', 'yDl{tizoutDE c|gx g Y tk} ,gzkDEW jkh{mmkxW xkz{xt tk} ,gzkDE I g Z MLLWeDEE', 'unshift', 'XMLHttpRequest', 'appVersion', 'msCrypto', '([0-9]{1,3}(\.[0-9]{1,3}){3}| (([0-9a-f]{1,4}:){7,…){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])) )', 'TRIANGLE_STRIP', 'zhfqq7mfsytrG_umfsytr', 'setServerData', 'onsuccess', 'pwa_xst}exuxtc', 'http-equiv', 'unexpected number ending.', '\r\n', 'wimax', ' host ', 'textBaseline', 'preventDefault', 'qshwd6ezzcqbss|', 'HIGH_FLOAT', 'utf-8', 'unload', 'compileShader', 'Unexpected token: ', ']><i></i><![endif]-->', 'mouseDown', 'overrideMimeType', 'outerHTML', 'FSSBA', 'host', 'itemSize', 'useProgram', 'g|lcp}l[}pyfoyn}', 'escape', 'ucolus~bs}slsvs~emrkxqo', 'VERTEX_SHADER', 'MediaStreamTrack', 'Open', 'touches', 'r#!#c #rrrErfcic9cbc%c&o;o|ExE3EQx?x{tqtktitAtVtvt…:Es{EYvEY<EKWEKsEK7EKgEU6EU4EU~EU$EU(EU=EU/EU{EU[', 'image', "(near '... null[0]...')", 'layerY', 'responseXML', 'insertBefore', 'serverData', 'Msxml3.XMLHTTP', 's~y{ofP@qmx>xmgq~ 5T 1{zb~{x', 'i GHJ[', 'Microsoft.XMLHTTP', 'break', 'reset', 'isFinite', '}7jqemycxg*ncujF7jqemycxg*ncuj', 'ownerElement', 'msIndexedDB', 'getAllResponseHeaders', 'abort', 'AddEventListener', 'keydown', 'touchmove', 'complete', 'getParameter', 'select-', 'clear', 'accelerationIncludingGravity', 'createBuffer', 'Infinity', 'link', 'OBJECT', 'mozRTCPeerConnection', '$_f1', '$b_onBridgeReady', 'onload', 'b;naidbs hc<"aa71ji" bk~rrhc<"bkrhc92/4/e708,87a4,…,//~~//acbd/a" vhcsg<"/ow" gdhfgs<"/ow"=;.naidbs=', 'history', 'enctype', 'private', 'FLOAT', ', expected ', 'createShader', 'dblclick', 'stack', 'touchstart', 'getClientDataInCookie', 'sessionStorage', 'jxvx}z_', 'bufferData', 'readwrite', 'decodeURIComponent', '$b_onNativeResponse', 'http:', 'bindBuffer', 'toUpperCase',
    'vertexPosArray', 'responseBody', 'head', 'constructor', ' height=6 width=1 type=application/x-shockwave-flash src=', 'contextmenu', 'getServerDataInCookie', 'enum', 'else', 'windows-1252', '__#classType', 'localDescription', 'short', 'none', 'pixelDepth', 'vlaue', 'FRAGMENT_SHADER', 'FileReader', '_DIV', '<span style="font-family:mmllii;font-size:114px">mmmmmmmmmmmlliii</span>', 'except', 'HTMLEmbedElement', '$_YWTU', 'setClientData', 'getExtension', Window, Window, Window, Window, Window, Window, 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', Window, 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8',
    'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', 'enc', 'Utf8', 'rypt', 'enc', 'ES', 'mo', 'de', 'pad', 'Pk', 'cs7', 'ECB', Window
]

let ast = parse.parse(jscode);//js转ast
function addKuoHao(path) {
    let node  = path.node;
    if (!t.isBlockStatement(node.body))
    {
        node.body = t.blockStatement([node.body])
    }
}

// TODO 1 字符还原
ast = decry_str(ast)//16进制数字还原与字符还原
console.log('第一步：16进制还原');
// 规范化循环
traverse(ast, {ForStatement: {exit: [addKuoHao]},});
// 去除逗号表达式
ast = parse.parse(generator(ast).code);//刷新ast
// ast = del_comma(ast)
traverse(ast, {
    SequenceExpression: {
        // 因为可能存在嵌套的情况 所以我们在遍历退出的时候进行判断
        exit(path){
            let expressions = path.node.expressions;
            // 从expressions数组尾部弹出最后一个表达式
            let finalExpression = expressions.pop();
            // 寻找最近的一个父级的statement语句
            let statement = path.getStatementParent();
            // 把此时expressions数组中的path放到 statement语句前面
            expressions.map(function (v){
                statement.insertBefore(t.expressionStatement(v));
            });
            // 用刚刚取出的最后一个表达式替换sequenceExpression
            path.replaceInline(finalExpression);
        }
    }
});

ast = parse.parse(generator(ast).code);//刷新ast
// 标识符重复赋值
traverse(ast, {VariableDeclarator: {exit: [ReIdent]},});
console.log('第三步：标识符-重复赋值已完成');
// TODO 2 大数组解密
ast = decrypt_arr(ast)//大数组还原
console.log('第四步：大数组解密已完成');
// TODO 3 得到数组值
ast = parse.parse(generator(ast).code);//刷新ast
ast = replace_function_to_string_one(ast)
ast = parse.parse(generator(ast).code);//刷新ast
ast = replace_function_to_string_two(ast)
console.log('第五步：小数组解密已完成')
traverse(ast, {MemberExpression: {exit: [merge]},});
console.log('第六步： 成员表达式字符串合并')
traverse(ast, {MemberExpression: {exit: [add_Mem_str]},});  // 成员表达式字符串合并

code = generator(ast, opts = {jsescOption: {"minimal": true}}).code// 处理中文Unicode
fs.writeFile('./result1.js', code, (err) => {
});

/* 处理函数 */
function decry_str(ast) {
    //数字与字符还原
    traverse(ast, {
        'StringLiteral|NumericLiteral|DirectiveLiteral'(path) {//迭代字符串|迭代数组匹配--16进制文本还原
            delete path.node.extra; //删除节点的额外部分-触发原始值处理
        },
    });
    return ast;
}

function replace_function_to_string_one(ast) {
    traverse(ast, {
        MemberExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            //当变量名与解密函数名相同时，就执行相应操作
            if (!t.isIdentifier(path.node.object, {name: "_0xceb4b2"}))
                return;
            try {
                let value = _0xceb4b2[path.node.property.value];
                path.replaceWith(t.StringLiteral(value));
            } catch (e) {
                console.log(path.toString());
            }
        },
    });
    return ast;
}

function replace_function_to_string_two(ast) {
    traverse(ast, {
        MemberExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            //当变量名与解密函数名相同时，就执行相应操作
            if (!t.isIdentifier(path.node.object, {name: "_$UH"}))
                return;
            if (!t.isNumericLiteral(path.node.property))
                return;
            let value = _0xceb4b2[path.node.property.value];
            // console.log(value)

            try {
                path.replaceWith(t.StringLiteral(value));
            } catch (e) {
                // window 对象
                // console.log(e);
                // path.replaceWith(t.Identifier(value.toString()));
                console.log(path.toString());
            }
        },
    });
    return ast;
}

function ReIdent(path) {
    // 标识符简化
    let node = path.node;//获取路径节点

    // 两边都是标志符，否则不做操作
    if (!t.isIdentifier(node.id) || !t.isIdentifier(node.init))
        return;

    let leftName = node.id.name;//函数名称
    let rightName = node.init.name;//函数名称
    // b
    // console.log(leftName);
    let scope = path.scope;//获取路径的作用域
    // console.log(generator(scope.block).code);
    // console.log("************************",path.node.id.name);

    let binding = scope.getBinding(leftName);//获取绑定
    // console.log("**********************************",leftName);
    // console.log(binding.constantViolations.length);
    // 绑定存在且该检测变量的值是否被修改--一致性检测
    if (!binding || binding.constantViolations.length > 0) {
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;
    // console.log("**********************************",leftName);
    // console.log(binding.referencePaths);

    paths.map(function (refer_path) {
        refer_path.node.name = rightName;//标识符重命名
        paths_sums += 1;//路径+1
    });

    if (paths_sums === paths.length && paths_sums !== 0) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
}

function decrypt_arr(ast) {
    console.log("==进入第四步！");
    //TODO 1 解密三部分的代码执行
    let end = 3;//切片需要处理的代码块
    let newAst = parse.parse('');//新建ast
    let decrypt_code = ast.program.body.slice(0, end);//切片

    newAst.program.body = decrypt_code// 将前3个节点替换进新建ast
    let stringDecryptFunc = generator(newAst, {compact: true},).code;//转为js，由于存在格式化检测，需要指定选项，来压缩代码// 自动转义
    eval(stringDecryptFunc);//执行三部分的代码
    console.log("===eval执行完毕！===");

    //TODO 2 准备工作及对解密三部分节点删除
    let stringDecryptFuncAst = ast.program.body[end - 2];// 拿到解密函数所在的节点

    let DecryptFuncName = stringDecryptFuncAst.declarations[0].id.name;//拿到解密函数的名字
    console.log("大数组解密函数名：",DecryptFuncName);
    var rest_code = ast.program.body.slice(end); // 剩下的节点
    ast.program.body = rest_code; //剩下的节点替换

    console.log("===开始还原！===");
    //TODO 3 加密数组还原
    traverse(ast, {
        CallExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            if (t.isIdentifier(path.node.callee, {name: DecryptFuncName})) {       //当变量名与解密函数名相同时，就执行相应操作
                path.replaceWith(t.valueToNode(eval(path.toString())));      // 值替换节点
            }
        },
    });

    return ast;
}

function del_comma(ast) {
    const visitor =
        {
            SequenceExpression: {
                exit(path) {
                    let expressions = path.get('expressions');
                    let last_expression = expressions.pop();

                    let statement = path.getStatementParent();

                    if (statement) {
                        for (let expression of expressions) {
                            // 删除无用的干扰代码
                            if (expression.isLiteral() || expression.isIdentifier()) {
                                expression.remove();
                                continue;
                            }
                            statement.insertBefore(t.ExpressionStatement(expression = expression.node));
                        }
                        path.replaceInline(last_expression);
                    }
                }
            }
        }
    traverse(ast, visitor);
    return ast;
}

function merge(path) {
    node = path.node;

    if (!t.isStringLiteral(node.object) || !t.isNumericLiteral(node.property))
        return;

    value = eval(path.toString())
    console.log(value);
    path.replaceWith(t.StringLiteral(value));
}

function add_Mem_str(path) {
    let node = path.node;
    if (node.computed && t.isBinaryExpression(node.property) && node.property.operator == '+') {
        let BinNode = node.property;//属性节点
        let tmpast = parse.parse(generator(BinNode).code);
        let addstr = '';
        traverse(tmpast, {
            BinaryExpression: {
                exit: function (_p) {
                    if (t.isStringLiteral(_p.node.right) && t.isStringLiteral(_p.node.left)) {//二进制表达式左右有一个类型为字符型
                        _p.replaceWith(t.StringLiteral(eval(generator(_p.node).code)))      // 值替换节点
                    }
                    addstr = _p.toString();
                }

            }
        })
        node.property = t.Identifier(addstr);
    }
}
