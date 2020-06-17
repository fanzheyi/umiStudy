/**
 * request 网络请求工具
 * 根据dva-feach分装
 */

import feach from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import Toast from '@/components/notice/toast';
import { SUCCESS_CODE } from '@/components/serverCode';
import qs from 'qs';
import { reject } from 'q';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};
const BASE_URL = '/';

const DEFAULT_HEADERS = {
    'X-Request-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/x-www-form-urlencoded',
    'token': '',
};

//415 参数错误
// 200;//操作成功状态
// 401;//用户登录失效状态码
// 408;//请求超时
// 43003;//操作失败状态
// 500;//服务器内部错误
const checkStatus = (response) => {
    if (response.code >= 200 && response.code < 300) {
        return response;
    }
    const errortext = codeMessage[response.code] || response.msg;
    notification.error({
        message: `请求错误 ${response.code}: ${response.url}`,
        description: errortext
    });
    const error = new Error(errortext);
    error.name = response.code;
    error.response = response;
    throw error;
};

const codeList = {
    415: '参数错误',
    401: '用户登录失效状态码',
    408: '请求超时',
    43003: '操作失败状态',
    500: '服务器内部错误'
};

const checkCode = (res) => {
    const errorCodeMsg = codeList[res.code];
    if (errorCodeMsg) {
        // Toast.error('提示信息', `${errorCodeMsg}`);
        // Toast.error('提示信息', `${errorCodeMsg}`);
        const error = new Error(errorCodeMsg);
        error.codeErrorName = res.code;
        error.codeErrorCtx = res;
        throw error;
    } else {
        return res;
    }
};

/**
 * 封装http请求
 * @param {object} options - 请求配置参数
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.params - url参数get请求
 * @param {Object} options.data - 请求体参数post请求
 * @param {Object} options.processData - 是否处理数据
 */
export default function request({ url, method, headers, params, data, processData = true, isBaseUrl = true }) {
    if (isBaseUrl) url = BASE_URL + url;
    if (!params) {
        params = {};
    }
    params._t = new Date().getTime();
    if (url.indexOf('?') === -1) {
        url += '?' + qs.stringify(params);
    } else {
        url += '&' + qs.stringify(params);
    }
    let jwt = window.localStorage.getItem('token');
    if (jwt) {
        DEFAULT_HEADERS['token'] = jwt;
    }
    headers = {
        ...DEFAULT_HEADERS,
        // ...{
        //     'Access-Token': window.localStorage.getItem('token') || '' // 从localStorage中获取access token
        // }
    }


    let options = { method, headers };

    if (data) {
        if (!processData) {
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, options)
            // .then(checkStatus)
            .then((response) => {
                let jwt = response.headers.get('token');
                if (jwt) {
                    window.localStorage.setItem('token', jwt);
                }
                response.json().then(ret => {
                    //    console.log(ret,111,response)
                    if (!!response.ok) {
                        // 请求成功200
                        if (ret.code === SUCCESS_CODE) {
                            resolve({ code: ret.code, data: ret.data || ret.response, msg: ret.msg });
                        } else {
                            // if (ret.code ===  401) {
                            //     window.localStorage.removeItem('token');
                            //     router.push('/login');
                            // }else{
                            reject({ code: ret.code, describe: ret.msg, message: ret.msg, response: ret.data || ret.response });
                            // }
                            // reject({ status: ret.code, describe: ret.describe, message: ret.message, response: ret.response });
                        }
                    } else {
                        reject({ code: ret.code, msg: ret.msg, message: ret.msg, data: ret.data || ret.response });
                    }
                }, error => {
                    // reject({ code: ret.code, msg: ret.msg, message: ret.msg, data: ret.data || ret.response });
                    // console.log(error, 6767676)
                    // reject({ code: ret.code, msg: ret.msg, message: error.msg });
                });



                // // 401 用户验证失败
                // if (response.code === 401) {
                //     window.localStorage.removeItem('token');
                //     // router.push('/login');
                // } else {
                //     // let jwt = response.headers.get('token');
                //     // if (jwt) {
                //     //     window.localStorage.setItem('token', jwt);
                //     // }
                //     return response.json();
                // }
            })
            // .then(checkCode)
            // .catch((e) => {
            //     const { codeErrorName, codeErrorCtx } = e;
            //     if (codeErrorName === 401) {
            //         window.localStorage.removeItem('token');
            //         router.push('/login');
            //     }
            //     if (codeErrorName >= 404 && codeErrorName < 422) {
            //         router.push('/404');
            //     }
            //     if (codeErrorName) {
            //         Toast.error('提示信息', `${codeErrorCtx.msg}`);
            //     }
            // });
            .catch(err => {
                reject(err);
            })
    })
}


/**
 * 封装http文件上传请求
 * @param {object} options - 请求配置参数
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.data - 请求体参数
 * @param {Object} options.files -文件列表
 * @param {Object} options.fileName -文件关键字,多文件加[]
 * @param {Object} options.uploadObj -文件上传组件，ie下面必须要
 */
export function requestFile({ url, method = "post", headers, data, files, fileName = "file[]", uploadObj }) {


    // if (typeof File !== 'undefined') {
    //     const formData = new FormData();
    //     files.forEach((file) => {
    //         formData.append(fileName, file);
    //     });
    //     for (let key in data) {
    //         formData.append(key, data[key]);
    //     }
    //     if (!headers) headers = {};
    //     headers['Content-Type'] = 'multipart/form-data';
    //     return request({
    //         url: url,
    //         method: method,
    //         headers: headers,
    //         data: formData,
    //         processData: false
    //     });
    // }
    // else {
    return new Promise(function (resolve, reject) {
        AjaxUploadFile({
            url: BASE_URL + url,
            files: files,
            method: method,
            fileName: fileName,
            data: data,
            success: (ret) => {
                if (ret.code === SUCCESS_CODE) {
                    resolve({ status: ret.code, data: ret.response, describe: ret.descripe });
                } else {
                    // if (ret.code ===  401) {
                    // window.localStorage.removeItem('token');
                    // router.push('/sigin');

                    // toast.warning('您未登录', '请登录后再访问');
                    // }
                    reject({ status: ret.code, describe: ret.descripe, message: ret.message, response: ret.response });
                }
                //                 // reject({ status: ret.code, describe: ret.descripe, message: ret.message, response: ret.response });
                //             }

                uploadObj.reset();
            },
            error: (ret) => {
                reject(ret.msg);
                // reject({ status: response.status, describe: response.statusText, message: error.message });
            },
        })
    });
    // }
}

function AjaxUploadFile(opt) {
    function _createUploadIframe(id) {
        let frameId = 'jUploadFrame' + id;
        let iframe = document.createElement('iframe');
        iframe.id = frameId;
        iframe.name = frameId;
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px';
        iframe.style.left = '-9999px';

        document.body.appendChild(iframe);
        return iframe;
    }

    function _createUploadForm(id) {
        let formId = 'jUploadForm' + id;
        let form = document.createElement('form');
        form.method = opt.method;
        form.name = formId;
        form.id = formId;
        form.enctype = "multipart/form-data";

        // form['Content-Type'] = 'multipart/form-data';
        // form['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


        opt.files.map(function (v) {
            v.name = opt.fileName
            form.appendChild(v);
        });
        if (opt.data) {
            for (let key in opt.data) {
                let inputHidden = document.createElement('input');
                inputHidden.type = 'hidden';
                inputHidden.name = key;
                inputHidden.value = opt.data[key];
                form.appendChild(inputHidden);
            }
        }
        const jwt = window.localStorage.getItem('token');
        if (jwt) {
            let inputHidden = document.createElement('input');
            inputHidden.type = 'hidden';
            inputHidden.name = 'authorization';
            inputHidden.value = jwt;
            form.appendChild(inputHidden);
        }
        form.style.position = 'absolute';
        form.style.top = '-1200px';
        form.style.left = '-1200px';

        document.body.appendChild(form);
        return form;
    }

    function _extend(opt) {
        var defaultOpt = {
            url: null,
            files: [],
            method: 'post',
            dataType: 'json',
            success: null,
            autoDelPre: true,
            error: null,
            data: null,
            fileName: 'file'
        };
        return { ...defaultOpt, ...opt };
    }

    function _handleError(opt, xhr, status, e) {
        if (opt.error) {
            opt.error.call(opt, xhr, status, e);
        }
    }

    function _uploadHttpData(r, type, isAutoDelPre) {
        var data = type == "xml" || !type ? r.responseXML : r.responseText;
        if (type == "json")
            try {
                if (isAutoDelPre) {
                    var re = /[^(<pre((\n|\r\n|\s|\w|=|"|\-|:|;)*)?>)]((.|\n|\r\n)*)?[^<\/pre>]/ig;
                    data = data.match(re)[0];
                }
                data = JSON.parse(data);
            } catch (e) {
                eval("data = " + data);
            }

        return data;
    }

    function _uploadCallback(io, form, xml, opt) {
        try {
            if (io.contentWindow) {
                xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

            } else if (io.contentDocument) {
                xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
            }
        } catch (e) {
            _handleError(opt, xml, null, e);
        }
        try {
            var data = _uploadHttpData(xml, opt.dataType, opt.autoDelPre);
            if (opt.success)
                opt.success(data, "success");

        } catch (e) {
            _handleError(opt, xml, "error", e);
        }

        setTimeout(function () {
            try {
                io.parentNode.removeChild(io);
                form.parentNode.removeChild(form);

            } catch (e) {
                _handleError(undefined, xml, null, e);
            }

        }, 100);

        xml = null;
    }

    opt = _extend(opt);
    var id = new Date().getTime();
    var form = _createUploadForm(id);
    var io = _createUploadIframe(id);

    var frameId = 'jUploadFrame' + id;
    var xml = {};
    try {
        form.action = opt.url;
        form.target = frameId;
        form.Cookie = window.localStorage.getItem('token');
        // form.request={
        //     tokenName:window.localStorage.getItem('token'),
        //     token: window.localStorage.getItem('token')
        // }
        if (form.encoding) {
            form.encoding = 'multipart/form-data';
        } else {
            form.enctype = 'multipart/form-data';
            // form['Content-Type'] = 'multipart/form-data';
            // form['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        }
        form.submit();
    } catch (e) {
        _handleError(opt, xml, null, e);
    }
    io.addEventListener('load', function () {
        _uploadCallback(io, form, xml, opt);
    })

    return {
        abort: function () { }
    };
}