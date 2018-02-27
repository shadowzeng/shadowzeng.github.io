/**
 * require模块配置
 */
require.config({
    /** lib库目录 */
    baseUrl: "./",
    /** 如果调试，地址上添加时间戳 */
    urlArgs: "bust="+(new Date()).getTime(),
    /** 超时时间 */
    waitSeconds: 30,
    /** 模块路径 */
    paths: {
        jquery: "library/3rdparty/jquery/jquery",
		knockout: "library/3rdparty/knockout/knockout-3.2.0",
        durandal: "library/3rdparty/durandal/2.1.0/js",
		http: "library/local/utils/http",
		i18nCommon: "library/local/common/i18n",
		css: "library/3rdparty/require/css-0.1.8",
        cookie: "library/3rdparty/jquery/cookie/cookie-1.4.1",
		text: "library/3rdparty/require/text-2.0.12",
		transitions: "library/3rdparty/durandal/2.1.0/js/transitions",
        echarts:"library/3rdparty/echarts/echarts-4.0.2"
    },
    shim: {
       
    }
});

define(["durandal/system", "durandal/app", "http", "i18nCommon"], function (system, app, http,i18n) { 
    system.debug(true);

	app.title = i18n.textWebSystemTitle; 
    /*
	function getRootPath() {
		var b, nodes, i, src, match, index;
		var srcPattern =  /^(.*)library\/3rdparty\/require\/require-2\.1\.11\.js$/;;
		var doc = document;
		nodes = (doc && doc.getElementsByTagName('script')) || [];
		for(i=0; i<nodes.length; i++){
			src = nodes[i].src;
			if(src){
				match = src.match(srcPattern);
				b = match && match[1];
				if(b) return b;
			}
		}
	}
	
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
		var r = window.location.search.substr(1).match(reg);  //ƥ��Ŀ�����
		if (r != null) return unescape(r[2]); return null; //���ز���ֵ
	}*/

    app.start().then(function() {
		app.setRoot("study/echarts/map", "entrance", "app-main");
    });
});
