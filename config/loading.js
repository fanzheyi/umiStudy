/**全局loading排除接口 */
export const EXCLUDE_PATH = [

]

/**
 * 检测是否含有排除接口
 * @param {object} effects 受影响的异步接口
 */
export function hasExcludPath(effects) {
    for (let i = 0, n = EXCLUDE_PATH.length; i < n; i++) {
        if(effects[EXCLUDE_PATH[i]])
            return true;
    }
    return false;
}