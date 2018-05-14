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
		i18nCommon: "common/i18n",
		css: "../lib/require/css-0.1.8",
        jquery: "../lib/jquery/jquery",
		knockout: "../lib/knockout/knockout-3.2.0",
        durandal: "../lib/durandal/2.1.0/js",
        cookie: "../lib/jquery/cookie/cookie-1.4.1",
		text: "../lib/require/text-2.0.12",
		transitions: "../lib/durandal/2.1.0/js/transitions",
        echarts:"../lib/echarts/echarts-4.0.4",
		draggable: "../lib/easyui/easyui-draggable/draggable-1.4.4",
        droppable: "../lib/easyui/easyui-droppable/droppable-1.4.4",
		slider: "../lib/easyui/easyui-slider/slider-1.4.4",
        tree: "../lib/easyui/easyui-tree/tree-1.4.4",
        parser: "../lib/easyui/easyui-parser/parser-1.4.4",
		spinner:"../lib/easyui/easyui-spinner/spinner-1.4.4",
		textbox:"../lib/easyui/easyui-textbox/textbox",
		tooltip:"../lib/easyui/easyui-tooltip/tooltip",
		linkbutton:"../lib/easyui/easyui-linkbutton/linkbutton",
		validatebox:"../lib/easyui/easyui-validatebox/validatebox",
		timespinner:"../lib/easyui/easyui-timespinner/timespinner-1.4.4",
		timeline:"webapp/timeline/timeline"
    },
    shim: {
       	tree: {
        	deps: ["jquery", "draggable", "droppable", "parser", "css!../lib/easyui/easyui-tree/tree-1.4.4"],
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
        	deps: ["jquery","draggable", "css!../lib/easyui/easyui-slider/slider-1.4.4"],
        	exports: "$.fn.slider"
        },
		parser: {
        	deps: ["jquery"],
        	exports: "$.fn.parser"
        },
		linkbutton:{
			deps: ["jquery","parser", "css!../lib/easyui/easyui-linkbutton/linkbutton.css"],
			exports: "$.fn.linkbutton"
		},
		validatebox:{
			deps: ["jquery","parser","tooltip", "css!../lib/easyui/easyui-validatebox/validatebox.css"],
			exports: "$.fn.validatebox"
		},
		textbox:{
			deps: ["jquery","parser","validatebox","linkbutton","css!../lib/easyui/easyui-textbox/textbox.css"],
			exports: "$.fn.textbox"
		},
		tooltip:{
			deps: ["jquery","parser", "css!../lib/easyui/easyui-tooltip/tooltip.css"],
			exports: "$.fn.tooltip"
		},
		spinner: {
        	deps: ["jquery","textbox","css!../lib/easyui/easyui-spinner/spinner-1.4.4"],
        	exports: "$.fn.spinner"
        },
		timespinner: {
        	deps: ["spinner"],
        	exports: "$.fn.timespinner"
        }
    }
});

define(["durandal/system", "durandal/app"], function (system, app) { 
    system.debug(true);

	app.title = "echarts-trace"; 
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
		app.setRoot("echarts-trace/echarts/map", "entrance", "app-main");
		//app.setRoot("study/panel/panel", "entrance", "app-main");
    });
});
