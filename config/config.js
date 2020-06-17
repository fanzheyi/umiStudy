// ref: https://umijs.org/config/
const path = require('path');
// import { primaryColor } from '../src/defaultSettings';
import pageRoutes from './router.config';

export default {
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: {
                    hmr: true
                },
                targets: {
                    ie: 9
                },
                locale: {
                    enable: true, // default false
                    default: 'zh-CN', // default zh-CN
                    baseNavigator: true // default true, when it is true, will use `navigator.language` overwrite default
                },
                dynamicImport: {
                    loadingComponent: './components/PageLoading/index',
                    webpackChunkName: true,
                    level: 3
                }
            }
        ],
        [
            'umi-plugin-pro-block',
            {
                moveMock: false,
                moveService: false,
                modifyRequest: true,
                autoAddMenu: true
            }
        ]
    ],
    targets: {
        ie: 11
    },
    // build:{
    // env: require('./prod.env'), // 使用 config/prod.env.js 中定义的编译环境
    // index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的 index.html 文件
    // assetsRoot: path.resolve(__dirname, '../dist'), // 编译输出的静态资源路径
    // assetsSubDirectory: 'static', // 编译输出的二级目录
    // assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    // productionSourceMap: true, // 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // productionGzip: false, // 是否开启 gzip
    // productionGzipExtensions: ['js', 'css'] // 需要使用 gzip 压缩的文件扩展名
    // },
    /**
     * 路由相关配置
     */
    routes: pageRoutes,
    disableRedirectHoist: true,

    /**
     * webpack 相关配置
     */
    define: {
        APP_TYPE: process.env.APP_TYPE || ''
    },
    // Theme for antd
    // https://ant.design/docs/react/customize-theme-cn
    // theme: {
    //     'primary-color': primaryColor
    // },
    externals: {
        '@antv/data-set': 'DataSet'
    },
    ignoreMomentLocale: true,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    alias: {
        // '@': path.resolve(__dirname, 'src/components/'),
        // '@utils': path.resolve(__dirname, 'src/utils'),
        // '@pages': path.resolve(__dirname, 'src/pages'),
        // '@assets': path.resolve(__dirname, 'src/assets'),
        // '@services': path.resolve(__dirname, 'src/services')
        components: path.resolve(__dirname, 'src/components/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        constants: path.resolve(__dirname, 'src/constants/'),
        config: path.resolve(__dirname, 'src/config/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        assets: path.resolve(__dirname, 'src/assets/'),
        services: path.resolve(__dirname, 'src/services/')
    },
    hash: false,
    "proxy": {
        "/wjms": {
            "target": "http://10.10.50.181:8081/", //150
            // "target": "http://10.10.50.32:8081/",//CHENGYUJUN2
            // "target": "http://10.10.50.11:8081/",//shishunyu
            // "target": "http://10.10.50.34:8081/",//CHENGYUJUN
            // "target": "http://10.10.50.32:8081/",//ZHUYUN
            // "target": "http://192.168.100.69:8081/",

            "changeOrigin": true,
            "pathRewrite": function (path, req) {
                return path;
            }
        },
        "/wjms2": {
            "target": "http://10.10.50.182:8888/", //150》》181》》182
            // "target": "http://10.10.50.32:8888/",//CHENGYUJUN2
            // "target": "http://10.10.50.11:8081/",//shishunyu
            // "target": "http://10.10.50.34:8081/",//CHENGYUJUN
            // "target": "http://10.10.50.32:8081/",//ZHUYUN
            // "target": "http://192.168.100.69:8081/",

            "changeOrigin": true,
            "pathRewrite": function(path, req) {
                return path;
            }
        },
        "/cds": {
			"target": "http://10.10.50.183:8099",
			"changeOrigin": true,
			"pathRewrite": function (path, req) {
				return path;
			}
        },

    },

};
