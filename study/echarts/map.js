define(["durandal/app","durandal/composition","knockout","i18nCommon","echarts","library/3rdparty/echarts/bmap/bmap"], function(app,composition,ko,i18nCommon,echarts) {
    'use strict';
    
    var maptest = {
        init: function(){
            var that = this;
	   	    composition.addBindingHandler("map-region", {
	   		    init: function(dom){		
	   		    	that._dom = dom;
                    that.rendUI();
                    that.bindUI();
	   		    },
	   		    update: function(){}
	   		});
        },
        rendUI: function(){
            var myChart = echarts.init(document.getElementById('map'));
            var option = {
                bmap: {
                // 百度地图中心经纬度
                center: [104.114129, 37.550339],
                // 百度地图缩放
                zoom: 5,
                // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                roam: true,
                // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                mapStyle: {}
                },
                series: [{
                    type: 'scatter',
                    // 使用百度地图坐标系
                    coordinateSystem: 'bmap',
                    // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                    data: [ [104.114, 37.5503, 1] ],
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                }]
            };
            myChart.setOption(option);
        },
        bindUI: function(){

        },
        test:function(){
            alert("hello rebecca");
        }
    };

    var model = {
        test: $.proxy(maptest.test, maptest)
    }
    maptest.init();
    return model;
});
        