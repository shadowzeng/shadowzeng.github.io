define(["durandal/app","durandal/composition","knockout","i18nCommon","echarts","library/3rdparty/echarts/bmap/bmap"], function(app,composition,ko,i18nCommon,echarts) {
    'use strict';
    
    var myChart = null;
    var flag = 0;
    var pathData = [];
    var pathLength = 0;
    var index = 0;
    var lastX = 114.43138;
    var lastY = 30.462996;

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
            this.getPathData();

            myChart = echarts.init(document.getElementById('map'));
            var option = {
                bmap: {
                    // 百度地图中心经纬度
                    center: [114.407449,30.494252],
                    // 百度地图缩放
                    zoom: 14,
                    // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                    roam: true,
                    // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                    mapStyle: {}
                },
                series: [{
                    type: 'scatter',
                    // 使用百度地图坐标系
                    coordinateSystem: 'bmap',
                    symbol: "image://study/img/car.png",
                    symbolSize: 53,
                   // symbolRotate: -90,
                    // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
                    data: [ [114.43138,30.462996] ],
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
        getPathData:function(){
            $.getJSON("study/data/path.json",function(data){
                pathData = data;
                pathLength = pathData.length;
            });
        },
        test:function(){debugger
            setInterval(function(){debugger
                if (index<pathLength){
                    var x = pathData[index][0];
                    var y = pathData[index][1];
                    var dx = x - lastX, dy = y - lastY;
                    var angle = Math.atan2(dy,dx);  // 计算当前轨迹点到下一个轨迹点的角度
                    //if(angle<0) angle+=2*Math.PI;
                    var jd = 180+180*angle/Math.PI;
                    console.log(jd);
                    var option = {
                        series: [{
                            symbolRotate:jd,
                            data:[[x,y]]
                        }]
                    };
                    myChart.setOption(option);
                    lastX = x;
                    lastY = y;
                    index++;
                }
                
                
            },1000);
        }
    };

    var model = {
        test: $.proxy(maptest.test, maptest)
    }
    maptest.init();
    return model;
});
        