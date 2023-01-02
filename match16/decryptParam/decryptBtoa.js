const fs = require("fs");//文件读写
const parse = require("@babel/parser"); //解析为ast
const traverse = require('@babel/traverse').default;//遍历节点
const t = require('@babel/types');//类型
const generator = require('@babel/generator').default;//ast解析为代码
const template = require("@babel/template").default;

const jscode = fs.readFileSync("./btoa.js", {
    encoding: "utf-8"
});

_0x34e7 = ['split', 'ABHICESQWK', 'FKByN', 'U987654321', 'lmHcG', 'dICfr', 'Szksx', 'Bgrij', 'iwnNJ', 'jihgfdecba', 'GfTek', 'gfdecbaZXY', 'constructo', 'QIoXW', 'jLRMs', 'AqLWq', '0zyxwvutsr', 'TKgNw', 'eMnqD', 'thjIz', 'btoa', 'MNPQRSTWXY', 'oPsqh', 'niIlq', 'evetF', 'LVZVH', 'fYWEX', 'kmnprstwxy', 'aYkvo', 'tsrqpomnlk', 'HfLqY', 'aQCDK', 'lGBLj', 'test', '3210zyxwvu', 'QWK2Fi', 'return /" ', 'hsJtK', 'jdwcO', 'SlFsj', 'OWUOc', 'LCaAn', '[^ ]+)+)+[', 'FAVYf', '2Fi+987654', 'floor', 'join', 'EuwBW', 'OXYrZ', 'charCodeAt', 'SkkHG', 'iYuJr', 'GwoYF', 'kPdGe', 'cVCcp', 'INQRH', 'INVALID_CH', 'charAt', 'push', 'apply', 'lalCJ', 'kTcRS', '+ this + "', 'ykpOn', 'gLnjm', 'gmBaq', 'kukBH', 'dvEWE', 'SFKLi', '^([^ ]+( +', 'qpomnlkjih', '^ ]}', 'pHtmC', 'length']
var l = function (e, t) {
    return _0x34e7[e -= 188];
}

var r = {
    "TGmSp": "INVALID_CHARACTER_ERR",
    "SkkHG": "return /\" + this + \"/",
    "TKgNw": "^([^ ]+( +[^ ]+)+)+[^ ]}",
    "aYkvo": function (e) {
        return e();
    },
    "kukBH": function (e, t) {
        return e % t;
    },
    "evetF": function (e, t) {
        return e >> t;
    },
    "GfTek": "iwnNJ",
    "pHtmC": function (e, t) {
        return e << t;
    },
    "LCaAn": function (e, t) {
        return e | t;
    },
    "cVCcp": function (e, t) {
        return e << t;
    },
    "OWUOc": function (e, t) {
        return e & t;
    },
    "thjIz": function (e, t) {
        return e << t;
    },
    "jLRMs": function (e, t) {
        return e & t;
    },
    "jdwcO": function (e, t) {
        return e === t;
    },
    "kPdGe": "FAVYf",
    "Bgrij": "LVZVH",
    "QIoXW": function (e, t) {
        return e & t;
    },
    "eMnqD": function (e, t) {
        return e == t;
    },
    "aQCDK": function (e, t) {
        return e + t;
    },
    "lGBLj": function (e, t) {
        return e(t);
    }
};

let ast = parse.parse(jscode);//js转ast
// 去除逗号表达式
// ast = del_comma(ast);
// 标识符重复
traverse(ast, {VariableDeclarator: {exit: [ReIdent]},});
console.log("准备工作已完成！");
// 数组解密
ast = parse.parse(generator(ast).code);//刷新ast
ast = decrypt_arr(ast);
ast = parse.parse(generator(ast).code);//刷新ast
traverse(ast, {VariableDeclarator: {exit: [merge_obj]},});  // 将拆分的对象重新合并-花指令还原准备工作
console.log("对象合并已完成！")
console.log("细节替换已完成！")
traverse(ast, {                                         // 常量计算，慎用！
    "UnaryExpression|BinaryExpression|ConditionalExpression|CallExpression": eval_constant,
});

code = generator(ast, opts = {jsescOption: {"minimal": true}}).code// 处理中文Unicode
fs.writeFile('./resultBtoa.js', code, (err) => {
});

/* ********************处理函数******************** */
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

function ReIdent(path) {
    // 标识符简化
    let node = path.node;//获取路径节点
    if (!t.isIdentifier(node.id) || !t.isIdentifier(node.init)) return;
    if (t.isSwitchCase(path.parentPath.parent)) return;

    let leftName = node.id.name;//函数名称
    let rightName = node.init.name;//函数名称

    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(leftName);//获取绑定
    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    let paths_sums = 0;
    paths.map(function (refer_path) {
        refer_path.node.name = rightName;//标识符重命名
        paths_sums += 1;//路径+1
    });
    if (paths_sums == paths.length && paths_sums != 0) {//若绑定的每个路径都已处理 ，则移除当前路径
        path.remove();//删除路径
    }
    traverse(ast, {VariableDeclarator: {exit: [ReIdent]},});
}

function decrypt_arr(ast) {
    //TODO 3 加密数组还原
    traverse(ast, {
        CallExpression(path) {//回调表达式匹配--替换加密数组为对应的值
            if (t.isIdentifier(path.node.callee, {name: 'l'})) {       //当变量名与解密函数名相同时，就执行相应操作
                path.replaceWith(t.valueToNode(eval(path.toString())));      // 值替换节点
            }
        },
    });
    traverse(ast, {MemberExpression: {exit: [add_Mem_str]},});  // 成员表达式字符串合并

    return ast;
}

function add_Mem_str(path) {
    let node = path.node;
    if (node.computed && t.isBinaryExpression(node.property) && node.property.operator === '+') {
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

function eval_constant(path) {
    // 常量计算
    if (path.type == "UnaryExpression") {
        const {operator, argument} = path.node;
        if (operator == "-" && t.isLiteral(argument)) {
            return;
        }
    }
    const {confident, value} = path.evaluate();
    // 无限计算则退出，如1/0与-(1/0)
    if (value == Infinity || value == -Infinity)
        return;
    confident && path.replaceWith(t.valueToNode(value));

}

function merge_obj(path) {
    // 将拆分的对象重新合并
    const {id, init} = path.node;//提取节点指定的值
    if (!t.isObjectExpression(init))//如果指定属性不是对象表达式，退出
        return;

    let name = id.name;//获取id的名称
    let properties = init.properties;//获取初始属性数组
    let scope = path.scope;//获取路径的作用域
    let binding = scope.getBinding(name);//

    if (!binding || binding.constantViolations.length > 0) {//检查该变量的值是否被修改--一致性检测
        return;
    }
    let paths = binding.referencePaths;//绑定引用的路径
    paths.map(function (refer_path) {
        let bindpath = refer_path.parentPath;//父路径
        if (!t.isVariableDeclarator(bindpath.node)) return;//变量声明
        let bindname = bindpath.node.id.name;//获取变量节点声明的值
        bindpath.scope.rename(bindname, name, bindpath.scope.block);//变量名重命名，传作用域参数
        bindpath.remove();//删除节点
    });

    scope.traverse(scope.block, {
        AssignmentExpression: function (_path) {//赋值表达式
            const left = _path.get("left");//节点路径左侧信息
            const right = _path.get("right");//节点路径右侧信息
            if (!left.isMemberExpression())//左侧是否为成员表达式
                return;
            const object = left.get("object");//获取左侧信息的对象
            const property = left.get("property");//获取左侧信息的属性
            //a={},a['b']=5；合并后a={'b':5}
            if (object.isIdentifier({name: name}) && property.isStringLiteral() && _path.scope == scope) {
                properties.push(t.ObjectProperty(t.valueToNode(property.node.value), right.node));
                _path.remove();
            }
            //a={},a.b=5；合并后a={'b':5}
            if (object.isIdentifier({name: name}) && property.isIdentifier() && _path.scope == scope) {
                properties.push(t.ObjectProperty(t.valueToNode(property.node.name), right.node));
                _path.remove();
            }
        }
    })
}
