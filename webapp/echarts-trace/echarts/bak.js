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
        },
        timelineTest:function(){debugger
            $.getJSON("study/data/timeline.json",function(data){
               myChart.setOption(data);
            });

            /*
            var option = {
                baseOption: {
                    bmap: {
                        center: [114.430768,30.463156],
                        zoom: 17,
                        roam: true,
                        mapStyle: bdmapstyle
                    },
                    timeline: {
                        autoPlay: true,
                        axisType: 'category',
                        data: ['section1','section2','section3']
                    },
                    series:[{
                        type: 'lines',
                        zlevel: 1,
                        coordinateSystem: 'bmap',
                        polyline: true,
                        animation: false,
                        data:[],
                        lineStyle: {  
                            normal:{
                                opacity: 0.6,
                                width:3  // 设置宽度为0，隐藏该系列的轨迹线（若不设置，会有默认值，影像下面系列？）
                            }
                        },
                        effect: {
                            show: true,
                            //constantSpeed: 40,
                            period: 2,
                            delay: 0,
                            trailLength:0.9,  // 轨迹尾巴长度，若不指定symbol，默认针circle图标
                            //color: '#b0be4d',
                            symbol: 'image://study/img/car.png',
                            symbolSize: [53,53],
                           // symbolSize: 3,  // 轨迹尾巴宽度
                            loop:false
                        }
                    }]
                },
                options:[
                    {
                        series:[{
                            data: tracedata.section1
                        }]
                    },
                    {
                        series:[{
                            data: tracedata.section2
                        }]
                    },
                    {
                        series:[{
                            data: tracedata.section3
                        }]
                    }
                ]
            };
            myChart.setOption(option);  */
        },