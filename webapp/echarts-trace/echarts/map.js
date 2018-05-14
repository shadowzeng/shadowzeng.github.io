define(["durandal/app","durandal/composition","knockout","i18nCommon","echarts","echarts-trace/data/bdmapstyle","echarts-trace/data/tracedata","../../../lib/echarts/bmap/bmap"],
 function(app,composition,ko,i18nCommon,echarts,bdmapstyle,tracedata) {
    'use strict';
    
    var myChart = null;
    var baseOption = {};
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
            
            var x,o = $('.slider'),d = $(document);
            o.on('mousedown',function(e){
                e = e||event;
                x = e.clientX - o.offset().left;
                d.on('mousemove',function(e){debugger
                    e=e||event;o.css('left',(e.clientX-x)+'px');
                });
                 d.on('mouseup',function(e){
                    d.off('mousemove');
                 });
            });

            myChart = echarts.init(document.getElementById('map'));

            baseOption = {
                
                bmap: {
                    // 百度地图中心经纬度
                    center: [114.430768,30.463156],
                    // 百度地图缩放
                    zoom: 17,
                    // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
                    roam: true,
                    // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
                    mapStyle: bdmapstyle
                },
                tooltip : {
                    trigger: 'item'
                },
                series: []
            };debugger
            myChart.setOption(baseOption,true);
        },
        bindUI: function(){
            
        },
        getPathData:function(){
            $.getJSON("echarts-trace/data/forscatter.json",function(data){
                scatterPathData = data;
                scatterPathLength = scatterPathData.length;
            });
            $.getJSON("echarts-trace/data/forlines.json",function(data){
               linesPathData.push({coords:data});
            });
        },
        linesTest:function(){
            var linesOptions = {
                series:[{
                        type: 'lines',   // 轨迹尾巴线效果（独立的）
                        zlevel: 1,
                        coordinateSystem: 'bmap',
                        polyline: true,
                        //dimensions: ['value'],
                        data:tracedata.alldata1,//new Float64Array(),//tracedata.compact1,
                        effect: {
                            show: true,
                            //constantSpeed: 40,
                            period: 2,
                            delay: 0,
                            trailLength:0.9,  // 轨迹尾巴长度，若不指定symbol，默认针circle图标
                            //color: '#b0be4d',
                            symbolSize: 3,  // 轨迹尾巴宽度
                            loop:false
                        },
                        lineStyle: {  
                            
                                width:0  // 设置宽度为0，隐藏该系列的轨迹线（若不设置，会有默认值，影像下面系列？）
                            
                        }
                    },{
                        type: 'lines',   // 车辆图标的轨迹效果(车辆图标、轨迹线)
                        coordinateSystem: 'bmap',
                        polyline: true,
                        //dimensions: ['value'],
                        data:tracedata.alldata1,// new Float64Array(),//tracedata.compact1,
                        
                        lineStyle: {  // 轨迹线的样式(所有轨迹线)
                           
                                width: 2,
                                color: "#ff0000",
                                opacity: 0.3
                            
                        },
                        emphasis:{
                            lineStyle:{
                                opacity: 1
                            }
                        },
                        effect: {   // 播放特效
                            //constantSpeed: 40,  // 配置是否是固定速度(像素/秒)
                            period: 2,
                            show: true,   // 是否显示特效
                            delay: 0,    // 播放特效延时，设置0表示同时开始
                            trailLength: 0,  // 播放时线尾巴长度（设置0-1之间），此设置针对车辆图标
                            symbol: 'image://study/img/car.png',
                            symbolSize: [53,53],
                            loop: false
                        },
                        zlevel: 2   // 在第一层级，大层级显示在最上面
                    }]
            };
            var nowOption = $.extend(true,{},baseOption,linesOptions);
            myChart.setOption(nowOption,true);
        },
        section1:function(){debugger
        /*    myChart.setOption({
                series:[{
                    effect:{
                        period:1
                    },
                    data: tracedata.section1
                },{
                    effect:{
                        period:1
                    },
                    data: tracedata.section1
                }]
            })  */
            myChart.appendData({
                seriesIndex:0,
                data:tracedata.compact1
            });
            myChart.appendData({
                seriesIndex:1,
                data:tracedata.compact1
            });
        },
        section2:function(){
         /*   
            myChart.setOption({
                series:[{},{
                    name:'2',
                    type: 'lines',   // 车辆图标的轨迹效果(车辆图标、轨迹线)
                        coordinateSystem: 'bmap',
                        polyline: true,
                        //dimensions: ['value'],
                        data: tracedata.section2,
                        
                        lineStyle: {  // 轨迹线的样式(所有轨迹线)
                            normal: {
                                width: 0,
                                color: "#ff0000",
                                opacity: 0.3
                            }
                        },
                        effect: {   // 播放特效
                            //constantSpeed: 40,  // 配置是否是固定速度(像素/秒)
                            period: 2,
                            show: true,   // 是否显示特效
                            delay: 0,    // 播放特效延时，设置0表示同时开始
                            trailLength: 0,  // 播放时线尾巴长度（设置0-1之间），此设置针对车辆图标
                            symbol: 'image://study/img/car.png',
                            symbolSize: [53,53],
                            loop: false
                        },
                        zlevel: 2   // 在第一层级，大层级显示在最上面
                }]
            })  */
            // myChart.setOption({
            //     series:[{
            //         effect:{
            //             period: 10
            //         }
            //     },{
            //         effect:{
            //             period: 10
            //         }
            //     }]
            // })
            myChart.appendData({
                seriesIndex:0,
                data:tracedata.compact2
            });
            myChart.appendData({
                seriesIndex:1,
                data:tracedata.compact2
            });
        },
        section3:function(){
            myChart.setOption({
                series:[{
                    effect:{
                        period: 15
                    }
                },{
                    effect:{
                        period: 15
                    }
                }]
            })
            myChart.appendData({
                seriesIndex:0,
                data:tracedata.section3
            });
            myChart.appendData({
                seriesIndex:1,
                data:tracedata.section3
            });
        },
        animatorpause:function(){
            /*
            var clips = myChart._zr.animation._clips;
            $.each(clips,function(i,e){
                e.pause();
            }); */
        },pause:function(){
            //debugger
           // console.log(myChart._zr)
            myChart._zr.animation.pause();
        },
        resume:function(){
            myChart._zr.animation.resume();
        },
        stop:function(){debugger
            myChart.setOption({
                series:[{
                    data:[]
                },{
                    data:[]
                }]
            });   
        },
        start:function(){
            this.section1();
        },
        test:function(){debugger
            var linesOptions = {
                series:[{
                        type: 'lines',   // 轨迹尾巴线效果（独立的）
                        zlevel: 1,
                        coordinateSystem: 'bmap',
                        polyline: true,
                        //dimensions: ['value'],
                        data:tracedata.alldata2,//new Float64Array(),//tracedata.compact1,
                        effect: {
                            show: true,
                            //constantSpeed: 40,
                            period: 2,
                            delay: 0,
                            trailLength:0.9,  // 轨迹尾巴长度，若不指定symbol，默认针circle图标
                            //color: '#b0be4d',
                            symbolSize: 3,  // 轨迹尾巴宽度
                            loop:false
                        },
                        lineStyle: {  
                            
                                width:0  // 设置宽度为0，隐藏该系列的轨迹线（若不设置，会有默认值，影像下面系列？）
                            
                        }
                    },{
                        type: 'lines',   // 车辆图标的轨迹效果(车辆图标、轨迹线)
                        coordinateSystem: 'bmap',
                        polyline: true,
                        //dimensions: ['value'],
                        data:tracedata.alldata2,// new Float64Array(),//tracedata.compact1,
                        
                        lineStyle: {  // 轨迹线的样式(所有轨迹线)
                           
                                width: 2,
                                color: "#ff0000",
                                opacity: 0.3
                            
                        },
                        emphasis:{
                            lineStyle:{
                                opacity: 1
                            }
                        },
                        effect: {   // 播放特效
                            //constantSpeed: 40,  // 配置是否是固定速度(像素/秒)
                            period: 2,
                            show: true,   // 是否显示特效
                            delay: 0,    // 播放特效延时，设置0表示同时开始
                            trailLength: 0,  // 播放时线尾巴长度（设置0-1之间），此设置针对车辆图标
                            symbol: 'image://study/img/car.png',
                            symbolSize: [53,53],
                            loop: false
                        },
                        zlevel: 2   // 在第一层级，大层级显示在最上面
                    }]
            };
            var nowOption = $.extend(true,{},baseOption,linesOptions);
            myChart.setOption(nowOption,true);
        }
    };

    var model = {
        textScatterTest: i18nCommon.textScatterTest,
        textLinesTest: i18nCommon.textLinesTest,
        textTimelineTest: "时间线测试",
        textPausePlay: i18nCommon.textPausePlay,
        textResumePlay: i18nCommon.textResumePlay,
        textStopPlay: i18nCommon.textStopPlay,
        textStartPlay: i18nCommon.textStartPlay,
        scatterTest: $.proxy(maptest.scatterTest, maptest),
        linesTest: $.proxy(maptest.linesTest,maptest),
        timelineTest: $.proxy(maptest.timelineTest,maptest),
        pause:$.proxy(maptest.pause,maptest),
        resume:$.proxy(maptest.resume,maptest),
        stop:$.proxy(maptest.stop,maptest),
        start:$.proxy(maptest.start,maptest),
        section1:$.proxy(maptest.section1,maptest),
        section2:$.proxy(maptest.section2,maptest),
        section3:$.proxy(maptest.section3,maptest),
        animatorpause:$.proxy(maptest.animatorpause,maptest),
        test:$.proxy(maptest.test,maptest)
    }
    maptest.init();
    return model;
});
        