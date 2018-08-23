var geoCoordMap = {
    '上海': [121.4648,31.2891],
    '新疆': [87.9236,43.5883],
    '甘肃': [103.5901,36.3043],
    '北京': [116.4551,40.2539],
    '江苏': [118.8062,31.9208],
    '广西': [108.479,23.1152],
    '江西': [116.0046,28.6633],
    '安徽': [117.29,32.0581],
    '内蒙古': [111.4124,40.4901],
    '黑龙江': [127.9688,45.368],
    '天津': [117.4219,39.4189],
    '山西': [112.3352,37.9413],
    '广东': [113.5107,23.2196],
    '四川': [103.9526,30.7617],
    '西藏': [91.1865,30.1465],
    '云南': [102.9199,25.4663],
    '浙江': [119.5313,29.8773],
    '湖北': [114.3896,30.6628],
    '辽宁': [123.1238,42.1216],
    '山东': [117.1582,36.8701],
    '海南': [110.3893,19.8516],
    '深圳': [114.5435,22.5439],
    '河北': [114.4995,38.1006],
    '福建': [119.4543,25.9222],
    '苏州': [120.6519,31.3989],
    '青海': [101.4038,36.8207],
    '陕西': [109.1162,34.2004],
    '贵州': [106.6992,26.7682],
    '河南': [113.4668,34.6234],
    '重庆': [107.7539,30.1904],
    '宁夏': [106.3586,38.1775],
    '吉林': [125.8154,44.2584],
    '湖南': [113.0823,28.2568],
    '台湾': [121.5277,25.0789],
    '铁力': [128.0363,46.9953]
};

var BJData = [
    [{name:'辽宁'}, {name:'铁力',value:95}],
    [{name:'吉林'}, {name:'铁力',value:90}],
    [{name:'北京'}, {name:'铁力',value:80}],
    [{name:'内蒙古'}, {name:'铁力',value:60}],
    [{name:'河北'}, {name:'铁力',value:50}],
    [{name:'山东'}, {name:'铁力',value:40}],
    [{name:'山西'}, {name:'铁力',value:30}],
    [{name:'河南'}, {name:'铁力',value:20}],
    [{name:'宁夏'}, {name:'铁力',value:10}],
    [{name:'陕西'}, {name:'铁力',value:10}],
    [{name:'甘肃'}, {name:'铁力',value:10}],
    [{name:'青海'}, {name:'铁力',value:10}],
    [{name:'新疆'}, {name:'铁力',value:10}],
    [{name:'西藏'}, {name:'铁力',value:10}],
    [{name:'四川'}, {name:'铁力',value:10}],
    [{name:'重庆'}, {name:'铁力',value:10}],
    [{name:'湖北'}, {name:'铁力',value:10}],
    [{name:'安徽'}, {name:'铁力',value:10}],
    [{name:'江苏'}, {name:'铁力',value:10}],
    [{name:'上海'}, {name:'铁力',value:10}],
    [{name:'浙江'}, {name:'铁力',value:10}],
    [{name:'江西'}, {name:'铁力',value:10}],
    [{name:'福建'}, {name:'铁力',value:10}],
    [{name:'贵州'}, {name:'铁力',value:10}],
    [{name:'云南'}, {name:'铁力',value:10}],
    [{name:'湖南'}, {name:'铁力',value:10}],
    [{name:'广西'}, {name:'铁力',value:10}],
    [{name:'广东'}, {name:'铁力',value:10}],
    [{name:'海南'}, {name:'铁力',value:10}],
    [{name:'台湾'}, {name:'铁力',value:10}]
];


var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord]
            });
        }
    }
    return res;
};

var color = ['#a6c84c', '#ffa022', '#46bee9'];
var series = [];
[['北京', BJData]].forEach(function (item, i) {
    series.push({
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 1,
        effect: {
            show: true,
            period: 6,
            trailLength: 0.6,
            color: 'lime',
            symbolSize: 2,
            shadowBlur:3
        },
        lineStyle: {
            normal: {
                width: 0,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top10',
        type: 'lines',
        zlevel: 2,

        effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbolSize: 'none'
        },
        lineStyle: {
            normal: {
                color: 'green',
                width: 0,
                opacity: 0.6,
                curveness: 0.2
            }
        },
        data: convertData(item[1])
    },
    {
        name: item[0] + ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                position: 'bottom',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            normal: {
                color: color[i]
            }
        },
        data: item[1].map(function (dataItem) {
            return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            };
        })
    },
    {
        name: item[0] + ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
            brushType: 'stroke'
        },
        label: {
            normal: {
                show: true,
                distance:10,
                fontSize:25,
                color:'red',
                fontWeight:'bolder',
                position: 'right',
                formatter: '{b}'
            }
        },
        symbolSize: function (val) {
            return val[2] / 8;
        },
        itemStyle: {
            normal: {
                color: 'red'
            }
        },
        // markLine:{
        //     effect : {
        //             show: true,
        //             scaleSize: 1,
        //             period: 30,
        //             color: '#fff',
        //             shadowBlur: 10
        //         },
        //         itemStyle : {
        //             normal: {
        //                 borderWidth:1,
        //                 lineStyle: {
        //                     type: 'solid',
        //                     shadowBlur: 10
        //                 }
        //             }
        //         },
        //     data:[[
        //         {
        //             coord: [91.1865,30.1465]
        //         },
        //         {
        //             coord: [103.9526,30.7617]
        //         }
        //     ]]
        // },
        data:[{name:'铁力',value:[128.0363,46.9953,100]}]
    });
});

option = {
    backgroundColor: '#404a59',
    tooltip : {
        trigger: 'item'
    },

    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: ''
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: series
};