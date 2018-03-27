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
		css: "library/3rdparty/require/css-0.1.8",
        jquery: "library/3rdparty/jquery/jquery",
		knockout: "library/3rdparty/knockout/knockout-3.2.0",
        durandal: "library/3rdparty/durandal/2.1.0/js",
		http: "library/local/utils/http",
		i18nCommon: "library/local/common/i18n",
		css: "library/3rdparty/require/css-0.1.8",
        cookie: "library/3rdparty/jquery/cookie/cookie-1.4.1",
		text: "library/3rdparty/require/text-2.0.12",
		transitions: "library/3rdparty/durandal/2.1.0/js/transitions",
        echarts:"library/3rdparty/echarts/echarts-4.0.4",
		draggable: "library/3rdparty/easyui/easyui-draggable/draggable-1.4.4",
        droppable: "library/3rdparty/easyui/easyui-droppable/droppable-1.4.4",
		slider: "library/3rdparty/easyui/easyui-slider/slider-1.4.4",
        tree: "library/3rdparty/easyui/easyui-tree/tree-1.4.4",
        parser: "library/3rdparty/easyui/easyui-parser/parser-1.4.4",
		spinner:"library/3rdparty/easyui/easyui-spinner/spinner-1.4.4",
		textbox:"library/3rdparty/easyui/easyui-textbox/textbox",
		tooltip:"library/3rdparty/easyui/easyui-tooltip/tooltip",
		linkbutton:"library/3rdparty/easyui/easyui-linkbutton/linkbutton",
		validatebox:"library/3rdparty/easyui/easyui-validatebox/validatebox",
		timespinner:"library/3rdparty/easyui/easyui-timespinner/timespinner-1.4.4",
		timeline:"library/local/timeline/timeline"
    },
    shim: {
       tree: {
        	deps: ["jquery", "draggable", "droppable", "parser", "css!library/3rdparty/easyui/easyui-tree/tree-1.4.4"],
        	exports: "$.fn.tree"
        },
		draggable: {
        	deps: ["jquery", "parser"],
        	exports: "$.fn.Draggable"
        },
        droppable: {
        	deps: ["jquery", "parser"],
        	exports: "$.fn.Droppable"
        },
		slider: {
        	deps: ["jquery","draggable", "css!library/3rdparty/easyui/easyui-slider/slider-1.4.4"],
        	exports: "$.fn.slider"
        },
		parser: {
        	deps: ["jquery"],
        	exports: "$.fn.parser"
        },
		linkbutton:{
			deps: ["jquery","parser", "css!library/3rdparty/easyui/easyui-linkbutton/linkbutton.css"],
			exports: "$.fn.linkbutton"
		},
		validatebox:{
			deps: ["jquery","parser","tooltip", "css!library/3rdparty/easyui/easyui-validatebox/validatebox.css"],
			exports: "$.fn.validatebox"
		},
		textbox:{
			deps: ["jquery","parser","validatebox","linkbutton","css!library/3rdparty/easyui/easyui-textbox/textbox.css"],
			exports: "$.fn.textbox"
		},
		tooltip:{
			deps: ["jquery","parser", "css!library/3rdparty/easyui/easyui-tooltip/tooltip.css"],
			exports: "$.fn.tooltip"
		},
		spinner: {
        	deps: ["jquery","textbox","css!library/3rdparty/easyui/easyui-spinner/spinner-1.4.4"],
        	exports: "$.fn.spinner"
        },
		timespinner: {
        	deps: ["spinner"],
        	exports: "$.fn.timespinner"
        }
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
		//app.setRoot("study/panel/panel", "entrance", "app-main");
    });
});
