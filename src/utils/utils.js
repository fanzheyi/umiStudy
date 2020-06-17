/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

//tableTree 根据id查找 修改对应checked状态
export function tableTreeChangeCheckedById(treeData, id, checked, type) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i][type] === id) {
      treeData[i].isCheck = checked;
      break;
    } 
    if (treeData[i].children && treeData[i].children.length > 0) {
      tableTreeChangeCheckedById(treeData[i].children, id, checked, type);
    } 
  }
  return treeData;
}

export function tableTreeChangeCheckedById11(treeData, id, checked, type,names,ids) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i]['id']=== id) {
      treeData[i].hasCheck = checked;
      if(checked) {
        names.push(treeData[i][type])
        ids.push(treeData[i].id)
      } else {
        // if (names.indexOf(treeData[i].type) !=-1) {
          names.splice(names.indexOf(treeData[i][type]), 1)
          ids.splice(ids.indexOf(treeData[i].id), 1)
        // }
      }
      break;
    }  else {
      if (treeData[i].children && treeData[i].children.length > 0) {
        tableTreeChangeCheckedById11(treeData[i].children, id, checked, type,names,ids);
      }
    }
    
  }
  return {
    treeData,
    names,
    ids
  };
}
/**
 * 根据当前的id来获取所有当前的所有子集
 * tree 数据源
 * id 当前的id
 */
export function getAllChildByPid(tree, id) {
  let childrenIds = [];
  let tempArry = [id];
  const loop = (tree, pid) => {
    for (let i = 0, n = tree.length; i < n; i++) {
      // debugger;
      if (tree[i].id === id && tree[i].children && tree[i].children.length > 0) {
        tree[i].children.forEach(ele => {
          childrenIds.push(ele.id);
          if (ele.children && ele.children.length > 0) {
            ele.children.forEach(e => {
              childrenIds.push(e.id);
            });
          }
        });
      }
      if (tree[i].children && tree[i].children.length > 0) {
        loop(tree[i].children, id);
      }
    }
  };
  loop(tree, id);
  childrenIds.push(id);
  return childrenIds;
}

//tableTree 根据code 【】来对数的回显，code是一个选中的值数组
export function tableTreeShowCheckedById(treeData, idArry, type) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    idArry.forEach(ele => {
      if (treeData[i][type] === ele) {
        treeData[i].isCheck = true;
        treeData[i].hasCheck = true;

        // break;
      }
    });
    if (treeData[i].children && treeData[i].children.length > 0) {
      tableTreeShowCheckedById(treeData[i].children, idArry, type);
    }
  }
  return treeData;
}

//筛选出所有树中已经选中的id
const arr = [];
export function getTableTreeChecked(treeData, checked, type) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i].isCheck) {
      arr.push(treeData[i][type]);
    }
    if (treeData[i].children && treeData[i].children.length > 0) {
      getTableTreeChecked(treeData[i].children, checked);
    }
  }
  return arr;
}
/**
 *
 * @param {*} tree 树的数据源  tree
 * @param {*} hasSelect 已经选中的数据列表 Array
 * @param {*} type 用来判断相同的字符串
 *
 * 编辑树时，回显已勾选的项
 */

export function echoDisplayTree(tree, hasSelect, type) {
  const loop = (tree, hasSelect, type) => {
    for (let i = 0, n = tree.length; i < n; i++) {
      if (hasSelect.length > 0) {
        hasSelect.forEach(ele => {
          if (ele[type] === tree[i][type]) {
            tree[i].isCheck = true;
          }
        });
      }
      if (tree[i].children && tree[i].children.length > 0) {
        loop(tree[i].children, hasSelect, type);
      }
    }
  };
  loop(tree, hasSelect, type);
  return tree;
}
/**
 *
 * @param {*} tree 树的数据源  tree
 * @param {*} hasSelect 需要选中的数据的id
 * @param {*} type 用来判断相同的字符串
 */

export function checkTreeByArry(tree, hasSelect, type, isTrue) {
  const loop = (tree, hasSelect, type) => {
    for (let i = 0, n = tree.length; i < n; i++) {
      if (hasSelect.length > 0) {
        hasSelect.forEach(ele => {
          if (ele === tree[i][type]) {
            tree[i].isCheck = isTrue;
          }
        });
      }
      if (tree[i].children && tree[i].children.length > 0) {
        loop(tree[i].children, hasSelect, type);
      }
    }
  };
  loop(tree, hasSelect, type);
  return tree;
}
// tree获取当前节点的所有子集的id

// export function getAllChildByPid
//通过id或者code，来获取已选中的数据
/**
 *
 * @param {*} treeData 数据源
 * @param {*} isCheck 当前勾选中的字段
 * @param {*} checked
 * @param {*} type 	string
 * @param {*} name  string
 * @param {*} hasSelect  已经选中的checkbox框
 */
export function getTableTreeCheckedByCode(treeData, checked, type, name, hasSelect) {
  let idsArry = hasSelect;
  let selectArry = [];
  hasSelect.map((item, index) => {
    selectArry.push(item[type]);
  });
  const loop = (treeData, checked, type, name, hasSelect) => {
    for (let i = 0, n = treeData.length; i < n; i++) {
      if (selectArry.indexOf(treeData[i][type]) == -1 && treeData[i].isCheck) {
        idsArry.push({
          [type]: treeData[i][type],
          [name]: treeData[i][name],
        });
      }
      if (selectArry.indexOf(treeData[i][type]) !== -1 && !treeData[i].isCheck) {
        idsArry = idsArry.filter((item, index, arr) => item[type] !== treeData[i][type]);
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        loop(treeData[i].children, checked, type, name, hasSelect);
      }
    }
  };
  loop(treeData, checked, type, name, hasSelect);
  return idsArry;
}

export function getTableTreeCheckedName(treeData, type) {
  const arrName = [];
  const getChecked = (treeData, type) => {
    for (let i = 0, n = treeData.length; i < n; i++) {
      if (treeData[i].isCheck) {
        arrName.push(treeData[i][type]);
      } 
      if (treeData[i].children && treeData[i].children.length > 0) {
        getChecked(treeData[i].children, type);
      }
    }
  };
  getChecked(treeData, type);
  return arrName;
}

//tableTree 根据id查找 修改active属性
export function tableTreeChangeActiveById(treeData, id, type) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i].hasOwnProperty(type)) {
      delete treeData[i][type];
    }
    if (treeData[i].id === id) {
      treeData[i][type] = true;
    }
    if (treeData[i].children && treeData[i].children.length > 0) {
      tableTreeChangeActiveById(treeData[i].children, id, type);
    }
  }
  return treeData;
}

//tableTree 通过0与1显示否或是
export function tableTreeShowYesOrNo(treeData, typeLabel, value) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i][typeLabel] === 0) {
      treeData[i][value] = '否';
    } else {
      treeData[i][value] = '是';
    }
    if (treeData[i].children && treeData[i].children.length > 0) {
      tableTreeShowYesOrNo(treeData[i].children, typeLabel, value);
    }
  }
  return treeData;
}
/**
 *
 * @param {*} data
 * @param {*} replaces
 */
// 转换分类（code转name）
export function tableTreeShowclassTypeName(treeData, classType, classType1) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    classType.forEach((ele, index) => {
      if (ele.text === treeData[i].classType) {
        treeData[i].classType1 = ele.value;
        return;
      }
    });

    if (treeData[i].children && treeData[i].children.length > 0) {
      tableTreeShowclassTypeName(treeData[i].children, classType, classType1);
    }
  }
  return treeData;
}
/**
 * 去掉树中为空children
 * @param {*} treeData 数据源（树形结构）
 */
export function delEmptyChildrenOfTree(treeData) {
  // debugger
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (!treeData[i].children.length) {
      delete treeData[i].children;
    }

    if (treeData[i].children && treeData[i].children.length > 0) {
      delEmptyChildrenOfTree(treeData[i].children);
    }
  }
  return treeData;
}
/**
 * 对象属性名替换，会替换掉所有同名属性
 * @param {object} data 替换源
 * @param {object} replaces 替换的键值对{old:new}
 */
export function replaceObjectName(data, replaces) {
  let source = JSON.stringify(data);

  for (let key in replaces) {
    let reg = new RegExp('"' + key + '"', 'g');
    source = source.replace(reg, '"' + replaces[key] + '"');
  }

  return JSON.parse(source);
}

/**
 * 根据id从树中找到对应路径
 * @param {object} tree 树数据
 * @param {string} id 当前id
 * @param {string} name 对应字段中的name字段名称(因为不同接口name字段不同,情对应传入name字段)
 */
export function searchTreePathNameById(tree, id, name) {
  const parentList = {};
  const result = [];
  const buildParentList = function (arr) {
    arr.forEach(item => {
      if (item['pid'] != undefined) {
        let pid = item['pid'];
        let id = item['id'];
        let path_name = item[name];
        parentList[id] = { pid, path_name: item[name] };
      }
      if (item.children != undefined) buildParentList(item['children']);
    });
  };

  const findParent = function (id) {
    if (parentList[id] != undefined) {
      let item = parentList[id];
      result.unshift(item['path_name']);
      findParent(item['pid']);
    }
  };

  buildParentList(tree);
  findParent(id);
  const resultObj = result.join('/');
  return { parentList, resultArr: result, result: resultObj };
}
/**
 *
 * @param {*} tree
 * @param {*} code
 * @param {*} name
 */
export function searchTreePathNameById1(tree, id, name) {
  const parentList = {};
  const result = [];
  const buildParentList = function (arr) {
    arr.forEach(item => {
      if (item['pcode'] != undefined) {
        let pcode = item['pcode'];
        let id = item['id'];
        let path_name = item[name];
        parentList[id] = { pcode, path_name: item[name] };
      }
      if (item.children != undefined) buildParentList(item['children']);
    });
  };
  const findParent = function (id) {
    if (parentList[id] != undefined) {
      let item = parentList[id];
      result.unshift(item['path_name']);
      findParent(item['pcode']);
    }
  };

  buildParentList(tree);
  findParent(id);
  const resultObj = result.join('/');
  return { parentList, resultArr: result, result: resultObj };
}
/**
 * 查找树形路径中文名称
 * @param {array} list 树形数据集
 * @param {string} id 目标id
 */
export function getTreePathNameById(tree, id, name) {
  const parentList = {};
  const result = [];
  const buildParentList = function (arr) {
    arr.forEach(item => {
      if (item['pcode'] != undefined) {
        let pcode = item['pcode'];
        let id = item['code'];
        let path_name = item[name];
        parentList[id] = { pcode, path_name: item[name] };
      }
      if (item.children != undefined) buildParentList(item['children']);
    });
  };
  const findParent = function (id) {
    if (parentList[id] != undefined) {
      let item = parentList[id];
      result.unshift(item['path_name']);
      findParent(item['pcode']);
    }
  };

  buildParentList(tree);
  findParent(id);
  const resultObj = result.join('/');
  return { parentList, resultArr: result, result: resultObj };
}

//根据type筛选出树中选中的id
export function getTreeDataChecked(treeData, type) {
  const treeArr = [];
  const getChecked = (treeData, type) => {
    for (let i = 0, n = treeData.length; i < n; i++) {
      if (treeData[i].isCheck) {
        treeArr.push(treeData[i][type]);
      }
      if (treeData[i].children && treeData[i].children.length > 0) {
        getChecked(treeData[i].children, type);
      }
    }
  };
  getChecked(treeData, type);
  return treeArr;
}

/**
 * 文本渲染
 * @param {string} text
 */
export function renderText(text, suffix) {
  let str;

  if (
    (text && text !== ' ' && text != null && text != 'null' && text != 'undefined') ||
    (text === 0 || text === '0')
  ) {
    str = text;
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
  return text && text !== ' ' ? '万' + text : '-';
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

//转换日期格式 formatDate不带时分秒  formatDateH带时分秒
function formatTen(num) {
  return num > 9 ? num + '' : '0' + num;
}

export function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + '-' + formatTen(month) + '-' + formatTen(day);
}
export function formatDateH(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    year +
    '-' +
    formatTen(month) +
    '-' +
    formatTen(day) +
    ' ' +
    formatTen(hour) +
    ':' +
    formatTen(minute) +
    ':' +
    formatTen(second)
  );
}

/**
 *
 * @param {*} str  内容字符串
 * @param {*} keyWord 需要高亮的字符串
 */
export function highLighting(str, keyWord) {
  if (!keyWord || keyWord == '') return str;
  str = str + '';
  let temp = keyWord.split(' '); // 分隔关键字符串
  let hitStr = [];
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] && (temp[i] !== '' || temp[i] !== ' ')) {
      hitStr.push(temp[i]);
    }
  }
  let tmpStr = []; // 存储关键词所在位置
  let strBox = str; // 改变原有字符串 结构，标注出需高亮的位置

  // 找出所有需要高亮测关键词位置，并替换撑 / 斜杠
  hitStr.map(function (item, index) {
    var result;
    var patt = new RegExp(item, 'g'); //
    strBox = strBox.replace(item, '//'); //
    while ((result = patt.exec(str)) != null) {
      tmpStr.push(result);
    }
  });
  let sttrr = strBox.split('//');
  return (
    <span>
      {// 循环除了关键字的其他位置
        sttrr.map(function (v, i) {
          if (i === sttrr.length - 1) {
            return v;
          }
          return (
            <span key={i}>
              {v}
              <span style={{ color: '#1989FA' }}>{tmpStr[i]}</span>
            </span>
          );
        })}
    </span>
  );
}

/**
 * 查询树形文本命中项
 * @param {*} text 命中文本
 * @param {*} list 数据源 
 */
export function searchTreeItems(text, list, key) {
  let expandedRowKeys = [];
  let hitArray = [];
  let allPcode = [];
  text = text.replace(/\s+/g, '');
  for (let i = 0, n = list.length; i < n; i++) {
    if (text !== '' && list[i][key].indexOf(text) !== -1) {
      expandedRowKeys.push(list[i].id);

      list[i].isHit = true;
      hitArray.push(list[i]);
    } else {
      list[i].isHit = false;
    }
    list[i].isCurrent = false;
    if (list[i].children && list[i].children.length > 0) {
      let children = searchTreeItems(text, list[i].children, key);
      hitArray.push(...children.hitArray);
      expandedRowKeys.push(...children.expandedRowKeys);
    }

  }
  return { expandedRowKeys, hitArray };
}
/**
 * 处理对象中的值为undefined
 * @param {*} data 需要操作的对象
 */
export function dealData(data) {
  for (let i in data) {
    if (data[i] === undefined || data[i] === null) {
      data[i] = '';
    }
  }
  return data;
}
/**
 * 新增树形数据
 * @param {object} item 新增数据
 * @param {array} list 源列表
 * @param {array} path 父路径
 */
export function addResourcesTableItem(item, list, path) {
  if (path && path.length > 0) {
    path = searchPath(list, path);
    let parent = path[path.length - 1];
    if (!parent.children) parent.children = [];
    if (!item.children) item.children = [];
    item.tree_path = parent ? [...parent.tree_path, item.id] : [item.id];
    if (!item.hasChild) {
      delete item.children;
    }
    parent.children.push(item);
  } else {
    list.push(item);
  }
  return list;
}
/**
 * 编辑树形数据
 * @param {object} item 编辑数据
 * @param {array} list 源列表
 */
export function editResourcesTableItem(item, treeData, curCode) {
  for (let i = 0, n = treeData.length; i < n; i++) {
    if (treeData[i].code === curCode) {
      item.children = [];
      if (!item.hasChild) {
        delete item.children;
      }
      treeData[i] = item;
      break;
    }
    if (treeData[i].children && treeData[i].children.length > 0) {
      editResourcesTableItem(item, treeData[i].children, curCode);
    }
  }
  return treeData;
}
/**
 * 删除树形数据
 * @param {object} item 删除数据
 * @param {array} list 源列表
 */
export function delResourcesTableItem(item, list, treepath) {
  let path = searchPath(list, treepath);
  if (path.length === 1) {
    delItemById(item.code, list);
  } else {
    let parent = path[path.length - 2];
    delItemById(item.code, parent.children);
  }
  return list;
}

/**
 *
 * @param {*} data2 // 树形数据源
 * @param {*} nodeId2 // 目标id（当前id的所有的父级的code）
 */
// 获取某一项中所有的父级code()
export function getParent(data2, nodeId2) {
  var arrRes = [];
  if (data2.length == 0) {
    if (!!nodeId2) {
      arrRes.unshift(data2);
    }
    return arrRes;
  }
  let rev = (data, nodeId) => {
    for (var i = 0, length = data.length; i < length; i++) {
      let node = data[i];
      if (node.code == nodeId) {
        arrRes.unshift(node.code);
        rev(data2, node.pcode);
        break;
      } else {
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
 *
 * @param {*} data2 // 树形数据源
 * @param {*} nodeId2 // 目标id（当前id的所有的父级的id
 */
// 获取某一项中所有的父级id
export function getParentId(data2, nodeId2, type, ptype) {
  var arrRes = [];
  if (data2.length == 0) {
    if (!!nodeId2) {
      arrRes.unshift(data2);
    }
    return arrRes;
  }
  let rev = (data, nodeId, type, ptype) => {
    for (var i = 0, length = data.length; i < length; i++) {
      let node = data[i];
      if (node[type] == nodeId) {
        arrRes.unshift(node[type]);
        rev(data2, node[ptype], type, ptype);
        break;
      } else {
        if (!!node.children) {
          rev(node.children, nodeId, type, ptype);
        }
      }
    }
    return arrRes;
  };
  arrRes = rev(data2, nodeId2, type, ptype);
  return arrRes;
}

function delItemById(code, data) {
  let i = 0,
    n = data.length;
  for (i = 0; i < n; i++) {
    if (data[i].code === code) {
      break;
    }
  }
  return data.splice(i, 1);
}

function searchPath(list, path) {
  let target = list;
  return path.map(function (v) {
    for (let i = 0, n = target.length; i < n; i++) {
      if (target[i].code === v) {
        v = target[i];
        target = target[i].children;
        break;
      }
    }
    return v;
  });
}
/**
 *
 * @param {*} lists //数据源
 * @param {*string} id
 * @param {*string} parentId
 */
// 把通过code和pcode 把数组重新组装成树
export function jsonToTree(lists, id, parentId) {
  var idList = {},
    treeList = [];

  for (var i = 0, len = lists.length; i < len; i++) {
    if (lists[i].hasChild && lists[i].length !== 0) {
      lists[i].isLeaf = false;
    } else {
      lists[i].isLeaf = true;
    }
    //生成一个以id为键的对象
    idList[lists[i][id]] = lists[i];
  }
  for (var j = 0, len1 = lists.length; j < len1; j++) {
    var aVal = lists[j];
    var aValParent = idList[aVal[parentId]];
    //如果aValParent存在；就说明当前的aVal是aValParent的孩子
    if (aValParent) {
      if ('chindren' in aValParent) {
        aValParent['children'].push(aVal);
      } else {
        if (aValParent['children']) {
          aValParent['children'].push(aVal);
        } else {
          aValParent['children'] = [];
          aValParent['children'].push(aVal);
        }
      }
    } else {
      treeList.push(aVal);
    }
  }
  // 给没有子集的数据加一个children = []
  const formatData = treeList => {
    for (let i = 0, n = treeList.length; i < n; i++) {
      if (!treeList[i].children) {
        treeList[i].children = [];
      }
      if (treeList[i].children && treeList[i].children.length > 0) {
        formatData(treeList[i].children);
      }
    }
  };
  formatData(treeList);
  return treeList;
}
/**
 *  数字转汉字中文数字2
 */
export function toChinesNum(num, one = "一", two = '二') {
  let changeNum = ["零", one, two, '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = zero
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
    }
    return newNum;
  }
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}