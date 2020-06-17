import message from '../components/dialog/crash';
// import { RESOURCES_TYPE_MENU_VALUE } from '../constants/resources';
import {
    SECURITY_AUTHORIZATION_LOSES, REQUEST_DATA_INVALID,
    REQUEST_DATA_INVALID_ONE, SECURITY_AUTHORIZATION_EXPIRE,
    USER_LOGIN_INVALID, SECURITY_AUTHORIZATION_ILLEGAL,
    SUCCESS_CODE, NOLOGIN_CODE, QING_QIU_CAN_SHU_CUO_WU
} from '../components/serverCode';
import toast from '../components/notice/toast';
import router from 'umi/router';
import { Base64 } from 'js-base64';

/**
 * 对象属性名替换，会替换掉所有同名属性
 * @param {object} data 替换源
 * @param {object} replaces 替换的键值对{old:new}
 */
export function replaceObjectName(data, replaces) {
    let source = JSON.stringify(data);

    for (let key in replaces) {
        let reg = new RegExp('"' + key + '"', "g");
        source = source.replace(reg, '"' + replaces[key] + '"');
    }

    return JSON.parse(source);
}

/**
 * 浅拷贝
 * @param {object} source 
 * @param {object} data 
 */
export function copyValue(source, data) {
    for (let key in data) {
        source[key] = data[key]
    }
    return source;
}

/**
 * 查找常量文本
 * @param {object} source 
 * @param {object} data 
 */
export function searchTextByValue(value, data) {
    for (let i = 0, n = data.length; i < n; i++) {
        if (data[i].value === value || Number(data[i].value) === value) {
            return data[i].text;
        }
    }
    return null;
}

/**
 * 文本渲染
 * @param {string} text
 */
export function renderText(text, suffix) {
    let str;

    if ((text && text !== ' ' && text != null && text != 'null' && text != 'undefined') || (text === 0 || text === '0')) {
        str = text
        if (suffix) str = text + ' ' + suffix;
    } else {
        str = '- -';
    }
    return str;
}

/**
 * 资本渲染
 * @param {string} text
 */
export function renderMoneyText(text) {
    return text && text !== ' ' ? ('万' + text) : '-';
}

/**
 * 时间渲染
 * @param {string} text
 */
export function renderTime(time) {
    if (time) {
        return time.split(' ')[0];
    }
    return '-';
}

/**
 * 数据组装为对象
 * @param {string} text
 */
export function arrayToObj(arry, name, key) {
    let obj = {};
    for (let i = 0; i < arry.length; i++) {
        obj[arry[i][key]] = arry[i][name];
    }
    return obj;
}

export function makeSuccess() {
    return {
        status: SUCCESS_CODE
    }
}

/**
 * 错误处理
 * @param {*} error //错误信息
 */
let toastDelay = true;
export function handlingError(error) {

    if (error instanceof Error) {
        throw error;
    }

    if (error.code === SECURITY_AUTHORIZATION_LOSES) {
        if (toastDelay) clearTimeout(toastDelay);
        toastDelay = setTimeout(function () {
            toast.warning('您未登录', '请登录后再访问');
            toastDelay = null;
        }, 300);
        // 单点登录跳转
        if (error.response && error.response.casUrl) {
            // window.location.href = error.response.casUrl;
            router.push('/login');
        } else {
            router.push('/login');
        }
        return;
    }

    if (error.code === NOLOGIN_CODE) {
        if (toastDelay) clearTimeout(toastDelay);
        toastDelay = setTimeout(function () {
            toast.warning('用户未登录或已失效', '请登录后再访问');
            toastDelay = null;
        }, 300);
        router.push('/login');
        return;
    }

    if (error.code === SECURITY_AUTHORIZATION_ILLEGAL) {
        if (toastDelay) clearTimeout(toastDelay);
        toastDelay = setTimeout(function () {
            toast.warning('您未登录', '请登录后再访问');
            toastDelay = null;
        }, 300);
        router.push('/login');
        return;
    }


    if (error.code === QING_QIU_CAN_SHU_CUO_WU) {
        toast.error('错误提示', error.message);
        return;
    }
    if (error.code === USER_LOGIN_INVALID) {
        toast.error('操作错误', error.message);
        return;
    }

    let msg = '';
    if (error.message && typeof error.message === 'object')
        for (let key in error.message) {
            if (msg !== '') msg += '|';
            msg += `${error.message[key].join(',')}`;
            // msg += `${key}:${error.message[key].join(',')}`;
        }


    // 错误提示优化
    let msgArr = msg.split('|');
    msg = msgArr[msgArr.length - 1];

    if (error.code === REQUEST_DATA_INVALID)
        toast.error(error.describe, msg);
    else if (error.code === REQUEST_DATA_INVALID_ONE) {
        message.warning({
            title: `${error.describe}`,
            subTitle: msg
        });
    }
    else
        message.error({
            title: `${error.describe}`,
            subTitle: msg
        });
    // }
    return {
        code: error.code,
        describe: error.describe,
        errors: error.message
    }
}

// 处理菜单数据结构
export function formatTree({ data, pId, parent, onRender }) {
    // let items = [];
    // for (let i = 0, n = data.length; i < n; i++) {
    //     if (data[i].pid === pId) {
    //         let item = data[i];
    //         item.tree_path = parent ? [...parent.tree_path, item.id] : [item.id];
    //         item.url_path = parent ? [...parent.url_path, item.name] : [item.name];
    //         let children = formatTree({ data: data, pId: item.id, parent: item, onRender: onRender });
    //         if (children.length > 0) {
    //             item.children = children;
    //         }
    //         if (item.type === RESOURCES_TYPE_MENU_VALUE) {
    //             items.push(item);
    //         }
    //         if (onRender && typeof onRender === 'function') {
    //             onRender(item);
    //         }
    //     }
    // }
    // return items;
}

// 通过id查找list的index
export function listIndexOfById(list, id) {
    for (let i = 0, n = list.length; i < n; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
}

// 替换数组数据中的数组对象为文字描述(清单管理中的所有列表多个部门转化成文字描述)
export function setArrayToString(list, oldVal, newVal) {
    for (let i = 0; i < list.length; i++) {
        list[i][newVal] = [];
        for (let j = 0; j < list[i][oldVal].length; j++) {
            list[i][newVal].push(list[i][oldVal][j].name);
        }
        if (list[i][newVal].length > 3) {
            list[i][newVal] = list[i][newVal].slice(0, 3).join(',') + '等(' + list[i][newVal].length + '个部门)';
        } else {
            list[i][newVal] = list[i][newVal].join(',');
        }
    }
    return list;
}

// 替换单个数据中的数组对象为文字描述(清单管理详情的所有列表多个部门转化成文字描述)
export function setArrayToStringSingle(list) {
    let temp = [];
    for (let i = 0; i < list.length; i++) {
        temp.push(list[i].name);
    }
    // if (temp.length > 3) {
    // temp = temp.slice(0, 3).join(',') + '等(' + temp.length + '个部门)';
    // } else {
    temp = temp.join(',');
    // }
    return temp;
}

/**
 * 数组根据元素去重
 * @param {string} propertyName 需要排序的的数组对象的属性，如： 'num'
 * @param {string/number} type 排序的顺序，0 顺序 1倒序
 */
export function compare(propertyName, type) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (parseInt(type) === 1) {
            if (value2 > value1) {
                return 1;
            } else if (value2 < value1) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (value2 < value1) {
                return 1;
            } else if (value2 > value1) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}
/**
 * 数组根据元素去重
 * @param {object} arr 需要去重的数组
 * @param {object} key 去重依据的key
 */
export function arrayUnique(arr, key) {
    let hash = {};
    return arr.reduce(function (item, next) {
        hash[next[key]] ? '' : hash[next[key]] = true && item.push(next);
        return item;
    }, []);
}

/**
 * 数组根据元素去重
 * @param {object} identityCard 身份证号码
 */
export function getAge(identityCard) {
    let len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    let strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 * 针对jwt的base64转换
 * @param {string} str jwt字符串
 */
export function jwtBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
            throw 'Illegal base64url string!';
    }
    return decodeURIComponent(Base64.decode(output));
    // return decodeURIComponent(escape(window.atob(output)));
}

/**
 * 将数字每3位打逗号
 * @param {number} num 要格式化的数字
 */
export function formatNum(num) {
    let str = '';
    num += '';
    let count = 0;
    for (let i = num.length - 1; i >= 0; i--) {
        if (count % 3 === 0 && count !== 0) {
            str = ',' + str;
        }
        str = num[i] + str;
        count++;
    }
    return str;
}
function toThousands(newnum) { //每隔3位，用逗号隔开
    let result = [],
        counter = 0;
    newnum = (newnum || 0).toString().split('');
    for (let i = newnum.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(newnum[i]);
        if (!(counter % 3) && i !== 0) {
            result.unshift(',');
        }
    }
    return result.join('');
}
export function renderNumber(number) {
    number = number ? number : 0;
    let num = number.toString().split(".")[1] ? parseFloat(number).toFixed(2) : parseFloat(number);//获取文本框中的数字
    let beforeNum = num.toString().split(".")[0];//获取小数点之前的数字
    let afterNum = num.toString().split(".")[1];//获取小数点之后的数字
    let lastNum = toThousands(beforeNum);
    return afterNum ? lastNum.concat(".", afterNum) : lastNum;
}

/*   
函数：格式化日期   
参数：formatStr-格式化字符串   
d：将日显示为不带前导零的数字，如1   
dd：将日显示为带前导零的数字，如01   
ddd：将日显示为缩写形式，如Sun   
dddd：将日显示为全名，如Sunday   
M：将月份显示为不带前导零的数字，如一月显示为1   
MM：将月份显示为带前导零的数字，如01  
MMM：将月份显示为缩写形式，如Jan  
MMMM：将月份显示为完整月份名，如January  
yy：以两位数字格式显示年份  
yyyy：以四位数字格式显示年份  
h：使用12小时制将小时显示为不带前导零的数字，注意||的用法  
hh：使用12小时制将小时显示为带前导零的数字  
H：使用24小时制将小时显示为不带前导零的数字  
HH：使用24小时制将小时显示为带前导零的数字  
m：将分钟显示为不带前导零的数字  
mm：将分钟显示为带前导零的数字  
s：将秒显示为不带前导零的数字  
ss：将秒显示为带前导零的数字  
l：将毫秒显示为不带前导零的数字  
ll：将毫秒显示为带前导零的数字  
tt：显示am/pm  
TT：显示AM/PM  
返回：格式化后的日期  
*/
export function dateFormat(dates, formatStr) {
    let date;
    /**
     *  wwwb 2019-03-19 
     *  处理时间格式"-"转换在IE下不兼容问题，转换为"/"。传入dates不需要new Deta()
     * */
    if (typeof dates !== "object" && typeof dates !== "number") {
        date = new Date(dates.replace(new RegExp(/-/gm), "/"));
    } else {
        date = new Date(dates);
    }
    /*  
    函数：填充0字符  
    参数：value-需要填充的字符串, length-总长度  
    返回：填充后的字符串  
    */
    let zeroize = function (value, length) {
        if (!length) {
            length = 2;
        }
        value = new String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };
    return formatStr.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd': return date.getDate();
            case 'dd': return zeroize(date.getDate());
            case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][date.getDay()];
            case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
            case 'M': return date.getMonth() + 1;
            case 'MM': return zeroize(date.getMonth() + 1);
            case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
            case 'yy': return new String(date.getFullYear()).substr(2);
            case 'yyyy': return date.getFullYear();
            case 'h': return date.getHours() % 12 || 12;
            case 'hh': return zeroize(date.getHours() % 12 || 12);
            case 'H': return date.getHours();
            case 'HH': return zeroize(date.getHours());
            case 'm': return date.getMinutes();
            case 'mm': return zeroize(date.getMinutes());
            case 's': return date.getSeconds();
            case 'ss': return zeroize(date.getSeconds());
            case 'l': return date.getMilliseconds();
            case 'll': return zeroize(date.getMilliseconds());
            case 'tt': return date.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return date.getHours() < 12 ? 'AM' : 'PM';
        }
    });
}
//处理new Date()
export function formatDate() {

    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;


}


/**
 * 根据id查找树形结构元素
 * @param {*} list 树形数据源
 * @param {*} id 目标id
 */
export function searchTreeItemByID(list, id) {
    for (let i = 0, n = list.length; i < n; i++) {
        if (list[i].id === id)
            return list[i];
        if (list[i].children && list[i].children.length > 0) {
            let item = searchTreeItemByID(list[i].children, id);
            if (item) return item;
        }
    }
    return null;
}

/**
 * 验证手机号
 * @param {*} rule 
 * @param {*} value 需验证值
 * @param {*} callback 回掉返回验证结果
 */
export function validMarketPhone(rule, value, callback) {
    const reg = /^[1][3456789][0-9]{9}$/;
    const tel = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (value) {
        if (reg.test(value) || tel.test(value)) {
            callback(); // 校验通过
        }
        else {
            callback('不是正确的电话号码'); // 校验未通过
        }
    }
    else {
        callback();
    }
};

/**
 * 验证身份证
 * @param {*} rule 
 * @param {*} value 需验证值
 * @param {*} callback 回掉返回验证结果
 */
export function validMarketCodePerson(rule, value, callback) {
    if (value) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value) === false) {
            callback("身份证输入不合法，请继续输入");
        }
        else {
            let params = { sfzh: value };
            this.props.dispatch({ type: "businessPlatformJointPunishmentLawExecutor/checkCard", payload: { params: params } }).then((ret) => {
                if (ret.status === 200 && ret.data.flag === false) {
                    callback()
                }
                if (ret.status === 200 && ret.data.flag === true) {
                    callback('身份证重复，请重新填写');
                }
            });
        }
    }
    else {
        callback();
    }
};

/**
 * 父子关系结构处理数据结构
 * @param {*} data  数据集合 Array
 */
export function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function (item) {
        item['checked'] = false; // 用于表格check 选择
        map[item.id] = item;
    });
    var val = [];
    data.forEach(function (item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
            (parent.child || (parent.child = [])).push(item); // 用于表格check 选择
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}



/**
 * 根据当前id 深层次查询所有父级id
 * tree 树形数据
 * cateId 当前id
 */
export function dfsTree(tree, cateId, state, parameter) {
    var tempArr = []; //临时数组            
    var lastArr = []; //最终返回的数组 
    parameter = parameter ? parameter : {
        id: 'id',
        children: 'children'
    };
    const fn = (tree, cateId, tempArr) => {
        tree.forEach((item) => {
            if (!item[parameter.children] && item[parameter.id] == cateId) {
                if (!state) {
                    tempArr.push(item[parameter.id])
                } else {
                    tempArr.push(item)
                }

                lastArr = [].concat(tempArr)
            }
            if (item[parameter.children] && item[parameter.children].length) {
                if (!state) {
                    tempArr.push(item[parameter.id])
                } else {
                    tempArr.push(item)
                }
                fn(item[parameter.children], cateId, tempArr)
                tempArr.pop()
            }
        })
    }
    fn(tree, cateId, tempArr, lastArr)
    return tempArr.length == 0 ? tempArr = [cateId] : tempArr;
}

/**
 * 根据当前id 深层次查询所有父级的数据
 * @param {*} data2 数据源
 * @param {*} nodeId2 当前的id
 */

export function getParent(data2, nodeId2) {
    var arrRes = [];
    if (data2.length == 0) {
        if (!!nodeId2) {
            arrRes.unshift(data2)
        }
        return arrRes;
    }
    let rev = (data, nodeId) => {
        for (var i = 0, length = data.length; i < length; i++) {
            let node = data[i];
            if (node.id == nodeId) {
                arrRes.unshift(node)
                rev(data2, node.pcode);
                break;
            }
            else {
                if (!!node.children) {
                    rev(node.children, nodeId);
                }
            }
        }
        return arrRes;
    };
    arrRes = rev(data2, nodeId2);
    return arrRes;
}


/**
 *  数字转汉字中文数字
 */
export function numberToChinese(num) {
    let Utils = {
        /*
            单位
        */
        units: '个十百千万@#%亿^&~',
        /*
            字符
        */
        chars: '零一二三四五六七八九',
        /*
            数字转中文
            @number {Integer} 形如123的数字
            @return {String} 返回转换成的形如 一百二十三 的字符串
        */
        numberToChinese: function (number) {
            var a = (number + '').split(''), s = [], t = this;
            if (a.length > 12) {
                throw new Error('too big');
            } else {
                for (var i = 0, j = a.length - 1; i <= j; i++) {
                    if (j == 1 || j == 5 || j == 9) {//两位数 处理特殊的 1*
                        if (i == 0) {
                            if (a[i] != '1') s.push(t.chars.charAt(a[i]));
                        } else {
                            s.push(t.chars.charAt(a[i]));
                        }
                    } else {
                        s.push(t.chars.charAt(a[i]));
                    }
                    if (i != j) {
                        s.push(t.units.charAt(j - i));
                    }
                }
            }
            //return s;
            return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {//优先处理 零百 零千 等
                b = t.units.indexOf(d);
                if (b != -1) {
                    if (d == '亿') return d;
                    if (d == '万') return d;
                    if (a[j - b] == '0') return '零'
                }
                return '';
            }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
                return b;
            }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
                return { '@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千' }[m];
            }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
                c = t.units.indexOf(d);
                if (c != -1) {
                    if (a[j - c] == '0') return d + '零' + b
                }
                return m;
            });
        }
    }

    return Utils.numberToChinese(num);
};




/**
 *  分页模式 
 */
export function pageMode(data, pageSize = 10) {//分页模式 默认10条每页
    if (data.length > 0) {
        let arr = []
        let itemArr = []
        data.map((item, index) => {
            itemArr.push(item)
            if ((index + 1) % pageSize == 0) {
                arr.push(itemArr)
                itemArr = []
            } else if (index == data.length - 1) {
                arr.push(itemArr)
                itemArr = []
            }
        })
        return arr
    } else {
        return data
    }
}
/**
   * 数字转为千分位字符
   * @param {Number} num
   * @param {Number} point 保留几位小数，默认2位
   */
export function qianWeiFu(num, point = 2) {
    num = parseFloat(num);
    let [sInt, sFloat] = (Number.isInteger(num) ? `${num}` : num.toFixed(point)).split('.');
    sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,');
    if (sInt == "NaN") {
        sInt = "0";
    }
    return sFloat ? `${sInt}.${sFloat}` : `${sInt}`;
}