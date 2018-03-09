define(["durandal/app","durandal/composition","knockout","i18nCommon","echarts","study/data/bdmapstyle","library/3rdparty/echarts/bmap/bmap"],
 function(app,composition,ko,i18nCommon,echarts,bdmapstyle) {
    'use strict';
    
    var myChart = null;
    var flag = 0;
    var scatterPathData = [];
    var scatterPathLength = 0;
    var linesPathData = [];
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
                    mapStyle: bdmapstyle
                }/*,
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
                }]*/
            };
            myChart.setOption(option);
        },
        bindUI: function(){
            
        },
        getPathData:function(){
            $.getJSON("study/data/forscatter.json",function(data){
                scatterPathData = data;
                scatterPathLength = scatterPathData.length;
            });
            $.getJSON("study/data/forlines.json",function(data){
               linesPathData.push({coords:data});
            });
        },
        scatterTest:function(){debugger
            myChart.setOption({
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
            })

            setInterval(function(){debugger
                if (index<scatterPathLength){
                    var x = scatterPathData[index][0];
                    var y = scatterPathData[index][1];
                    var dx = x - lastX, dy = y - lastY;
                    var angle = Math.atan2(dy,dx);  // 计算当前轨迹点到下一个轨迹点的角度
                    //if(angle<0) angle+=2*Math.PI;
                    var jd = 270+180*angle/Math.PI;
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
        },
        linesTest:function(){
            var hisTraceOption = {   // 历史轨迹线默认设置
                series:[{
                    type: 'lines',   // 轨迹尾巴线效果（独立的）
                    zlevel: 1,
                    coordinateSystem: 'bmap',
                    polyline: true,
                    effect: {
                        show: true,
                        constantSpeed: 40,
                        delay: 0,
                        trailLength:0.9,  // 轨迹尾巴长度，若不指定symbol，默认针circle图标
                        //color: '#b0be4d',
                        symbolSize: 3  // 轨迹尾巴宽度
                    },
                    lineStyle: {  
                        normal:{
                            width:0  // 设置宽度为0，隐藏改系列的轨迹线（若不设置，会有默认值，影像下面系列？）
                        }
                    },
                    data: linesPathData
                },{
                    type: 'lines',   // 车辆图标的轨迹效果(车辆图标、轨迹线)
                    coordinateSystem: 'bmap',
                    polyline: true,
                    data: linesPathData,
                    lineStyle: {  // 轨迹线的样式(所有轨迹线)
                        normal: {
                            width: 3,
                            color: "#ff0000",
                            opacity: 0.1
                        }
                    },
                    effect: {   // 播放特效
                        constantSpeed: 40,  // 配置是否是固定速度
                        show: true,   // 是否显示特效
                        delay: 0,    // 播放特效延时，设置0表示同时开始
                        trailLength: 0,  // 播放时线尾巴长度（设置0-1之间），此设置针对车辆图标
                        symbol: 'image://study/img/car.png',
                        symbolSize: [53,53]
                        //   loop: false
                    },
                    zlevel: 2   // 在第一层级，大层级显示在最上面
                }]
            };

            myChart.setOption(hisTraceOption);
        }
    };
debugger
    var model = {
        textScatterTest: i18nCommon.textScatterTest,
        textLinesTest: i18nCommon.textLinesTest,
        scatterTest: $.proxy(maptest.scatterTest, maptest),
        linesTest: $.proxy(maptest.linesTest,maptest)
    }
    maptest.init();
    return model;
});
        