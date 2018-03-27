define(['jquery'], function($) {
    var template = 
        '<div class="timeline">'+
                '<div class="timelineControl">'+
                    '<div class="timelinePlay"></div>'+   
                '</div>'+
                '<div class="timelineMain">'+

                    '<div class="timelineProgress"></div>'+

                    '<div class="timelineLabel">'+
                        '<div class="timelineLabelcontent"></div>'+
                        '<div class="timelineLabelpointer"></div>'+
                    '</div>'+
                    '<div class="caliperA">'+
                        '<div class="caliperLine"></div>'+
                        '<div class="caliperPointerA"></div>'+
                    '</div>'+
                    '<div class="caliperB" >'+
                        '<div class="caliperLine"></div>'+
                        '<div class="caliperPointerB"></div>'+
                    '</div>'+
                    '<div class="caliperPartA"></div>'+
                    '<div class="caliperPartB"></div>'+
                '</div>'+
            '</div>';

    var timeline = function(map,option,target){
        this.map = map;
        this.target = target || this.target;
        this.container = null;

        if(typeof(this.target) == "string"){
            this.container=$("#"+this.target);
        }else{
            this.container=$(this.target);
        }

        this.state = {
            // 页签编码 0为实时监控 1为轨迹查询
            tabIndex: 0,
            // 父容器可见性
            parentVisible: {},
            // 时间轴显示的小时数量
            timeCount: [],
            // 时间轴显示的时间数字标识
            timeNumber: [],
            // 时间轴位置
            progress: 0,
            // 当前时间轴位置
            currentProgress: 0,
            // 当前时间轴位置对应的pageX
            currentPageX:  0,
            // 初始鼠标拖动位置
            initMouseX: 0,
            // label的位置
            label: 0,
            // lable可见性
            labelVisible: 'blank',
            // 当前时间轴位置代表的时间戳
            currentTimeStamp: 0,
            // 当前有数据的时间段数组
            dataPart: [],
            // 当天起始时间时间错
            initTimeStamp: 0,
            // 所有路径点数据
            totalPointData:[],
            // 播放按钮状态
            playOrPause: 'timelinePlay',
            // 播放速度，常规速度为0.1/frame 
            // 减速为 0.08,0.06,0.04,0.02,0.01 
            // 加速为 0.12,0.14,0.16,0.18,0.20
            playSpeed: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
            //当前播放速度位置
            playSpeedIndex: 5,
            // 浮动时间
            hovertime: '0:0',
            // 卡尺A位置
            caliperAPosition: 0,
            // 卡尺B位置
            caliperBPosition: 721,
            // 卡尺A的clientX
            caliperAclientX: 0,
            // 当前拖动的卡尺
            caluperCurrent: ''
        };

        this.renderUI();
        this.bindUI();
    };

    timeline.prototype = {
        renderUI:function(){
            this.container.append(template);
            this.initTimeline();
        },
        bindUI:function(){
            var o = $('.caliperPointerA'),d=$(document), t = $('.caliperA');
            this.container.find('.timelineMain').on('click',$.proxy(this.handleTimelineClick,this));
            this.container.find('.timelineMain').on('mouseover',$.proxy(this.handleHoverLabel,this));
            this.container.find('.timelineMain').on('mouseout',$.proxy(this.handleOffLabel,this));
            this.container.find('.timelineProgress').on('mousedown',$.proxy(this.handleProgressDragStart,this));
            this.container.find('.caliperPointerA').on('mousedown',$.proxy(this.handleCaliperDragStart,this));
            // this.container.find('.caliperPointerA').on('mousedown',function(e){
            //     e = e||event;
            //     offset = t.offset().left;
            //     d.on('mousemove',function(e){debugger
            //         e=e||event;
            //         //console.log(e.clientX+"-"+x);

            //         t.css('left',(e.clientX-offset)+'px');
            //     });
            //     d.on('mouseup',function(e){
            //         d.off('mousemove');
            //     });
            // });
            this.container.find('.caliperPointerB').on('mousedown',$.proxy(this.handleCaliperDragStart,this));
        },
        initTimeline:function(){
            var timeHourDom = '';
            var timeNumberDom = '';
            for (var i = 0; i < 24; i++){
                if (0==i){
                    timeHourDom += '<div class="timeHour timeHourFirst" key="0"></div>';
                }else if(23==i){
                    timeHourDom += '<div class="timeHour timeHourFirst" key="23"></div>';
                }else{
                    timeHourDom += '<div class="timeHour timeHourFirst" key="'+i+'"></div>';
                }
            }
            for (var i = 0; i < 25; i++){
                timeNumberDom += '<div class="timeNumber" style="left:'+(i * 29.6 - 1)+'px">'+i+'</div>'
            }
            this.container.find('.timelineMain').prepend(timeNumberDom).prepend(timeHourDom);
        },
        setState:function(state){
            for (var i in state){
                if (i == 'dataPart'){
                    var dataPart = state[i];
                    for(var j = 0; j < dataPart.length; j++){
                        var start = dataPart[j].start_time;
                        var end = dataPart[j].end_time;
                        var dom = '<div class="runPart" style="left:'+start+'px;width:'+(end-start)+'px"></div>';
                        this.container.find('.timelineProgress').after(dom);
                    }
                }
                if (i == 'progress'){
                    this.container.find('.timelineProgress').css('left',state[i]+'px');
                }
                if (i == 'caliperAPosition'){debugger
                    this.container.find('.caliperA').css('left',state[i]+'px');
                    this.container.find('.caliperPartA').css('width',state[i]+'px');
                }
                if (i == 'caliperBPosition'){
                    this.container.find('.caliperB').css('left',state[i]+'px');
                    this.container.find('.caliperPartB').css('width',(721-state[i])+'px');
                }
                if (i == 'label'){
                    this.container.find('.timelineLabel').css('left',state[i]+'px');
                }
                if (i == 'hovertime'){
                    this.container.find('.timelineLabelcontent').html(state[i]);
                }
                this.state[i] = state[i];
            }
        },
        initCaliper:function(){
            this.setState({
                // 卡尺A位置
                caliperAPosition: 0,
                // 卡尺B位置
                caliperBPosition: 721,
                // 卡尺A的clientX
                caliperAclientX: 0,
                // 当前拖动的卡尺
                caluperCurrent: ''
            });
            $('.timelineLabel').css('display','none');
        },
        handleTimelineClick:function(event){
            if (this.state.totalPointData.length === 0) {
                return;
            }
            if (event.target.className === 'timelineProgress' || event.target.className.indexOf('caliperPointer') > -1)  {
                return;
            }
            this.jumpTime(event.clientX);
        },
        jumpTime:function(clientx){
            var that = this;
            var x = clientx - $('.timelineMain').offset().left;
            that.setState({progress: x});
            that.setState({currentProgress: x});
            that.setState({currentPageX: clientx});
            that.setRunningPointByProgress(x);
        },
        handleOffLabel:function(){
            this.setState({
                labelVisible: 'blank'
            });
        },
        handleProgressDragStart:function(){
            var that = this;
            if (that.state.totalPointData.length === 0) {
                return true;
            }
            this.setState({initMouseX: event.clientX});
            $(document).on('mousemove', that.onProgessDrag);
            $(document).on('mouseup', that.onProgressDragMouseUp);
        },
        onProgessDrag:function(){
            let x = event.clientX - this.state.initMouseX;
            let newProgress = x + this.state.currentProgress;
            if (newProgress >= 0 && newProgress <= this.props.timelineLong) {
                this.setState({progress: newProgress});
            }
            // var point = this.getPointByTime(this.getTimeByPx(newProgress));
            // if (point.loc_time !== undefined){
            //     this.setRunningPoint(point);
            // }
            this.setRunningPointByProgress(newProgress);
            this.handleHoverLabel(event);
        },
        onProgressDragMouseUp:function(){
            this.handleProgressDragEnd();
            this.setState({currentPageX: event.clientX});
        },
        handleCaliperDragStart:function(event){
            var that = this;
            if (that.state.totalPointData.length === 0) {
                return;
            }
            that.setState({caluperCurrent: event.target.parentElement.className});
            $(document).on('mousemove', function(e){
                that.handleCaliperDrag(e);
            });
            $(document).on('mouseup', function(e){
                that.handleCaliperDragEnd(e);
            });

            $('body').css('user-select', 'none');
        },
        handleCaliperDrag:function(event){debugger
            var x = event.clientX - $('.timelineMain').offset().left;
            if (x < 0 || x > 721) {
                return;
            }

            var caluperCurrent = this.state.caluperCurrent;
            if (caluperCurrent === 'caliperA' && x < this.state.caliperBPosition) {
                this.setState({caliperAPosition:x});
            } else if (caluperCurrent === 'caliperB' && x > this.state.caliperAPosition) {
                this.setState({caliperBPosition:x});
            }
            this.handleHoverLabel(event);
        },
        handleCaliperDragEnd:function(event){
            console.log('mouse up');
            var x = event.clientX - $('.timelineMain').offset().left;
            var clientx = event.clientX;
            if (x < 0) {
                x = 0;
                clientx = $('.timelineMain').offset().left;
            } else if (x >= 721) {
                x = 721;
                clientx = $('.timelineMain').offset().left + 721;
            }
            // 设置卡尺位置
            var caluperCurrent = this.state.caluperCurrent;
            if (caluperCurrent === 'caliperA' && x < this.state.caliperBPosition) {debugger
                this.setState({
                    caliperAPosition: x
                });
                var starttime = this.getTimeByPx(x);
                var endtime = this.getTimeByPx(this.state.caliperBPosition);
                //TrackAction.changeTimeline(starttime, endtime);
            } else if (caluperCurrent === 'caliperB' && x > this.state.caliperAPosition) {
                this.setState({
                    caliperBPosition: x
                });

                var starttime = this.getTimeByPx(this.state.caliperAPosition);
                var endtime = this.getTimeByPx(x);
                //TrackAction.changeTimeline(starttime, endtime);
            }

            $('body').css('user-select', 'text');
            $(document).off('mousemove');
            $(document).off('mouseup');


            // 控制播放进度跳转
            if (this.state.caluperCurrent === 'caliperA') {
                this.jumpTime(clientx);
            } else {
                this.jumpTime(this.state.caliperAPosition + $('.timelineMain').offset().left);
            }

            // 暂定播放
            // this.handlePlayOrPause({
            //     target: {
            //         className: 'timelinePause'
            //     }
            // });
        },
        handleHoverLabel:function(event) {
            if (event.target.className.indexOf('caliperPointer') > -1) {
                return;
            }
            let x = event.clientX - $('.timelineMain').offset().left;
            // 一像素两分钟
            let time = x * 120;
            let hour = parseInt(time / (60 * 60), 10);
            let min = parseInt(time % (60 * 60) / 60, 10);
            $('.timelineLabel').css('display','block');
            if (hour >= 0 && hour <= 24 && min >= 0 && min <= 59 && hour * 100 + min <= 2400) {
                min = min >= 10 ? min : '0' + min;
                this.setState({
                    label: x,
                    hovertime: hour + ':' + min
                });
            }
        },
        listenTrackRoute: function(data) {debugger
            this.initCaliper();
            var that = this;
            if (data.length === 0) {
                return;
            }
            that.state.totalPointData = data;
            var timePart = [{}];
            var pxPart = [{}];
            var j = 0;
            var date = new Date(data[0].loc_time * 1000);
            // that.setState({initTimeStamp: data[0].loc_time - (data[0].loc_time % 86400 - 57600)});
            that.state.initTimeStamp = data[0].loc_time - (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds());
            timePart[j].start_time = data[0].loc_time;
            pxPart[j].start_time = that.getPxByTime(data[0].loc_time);
            for (var i = 0; i < data.length - 1; i++) {
                if (data[i + 1].loc_time - data[i].loc_time <= 5 * 60) {
                    timePart[j].end_time = data[i + 1].loc_time;
                    pxPart[j].end_time = that.getPxByTime(data[i + 1].loc_time);
                } else {
                    j++;
                    timePart[j] = {};
                    timePart[j].start_time = data[i + 1].loc_time;
                    pxPart[j] = {};
                    pxPart[j].start_time = that.getPxByTime(data[i + 1].loc_time);
                }
            }
            that.setState({dataPart: pxPart});
            that.setState({progress: pxPart[0].start_time - 0, currentProgress: pxPart[0].start_time - 0});
            that.setState({initMouseX: $('.timelineProgress').offset().left + 20 });
            that.setState({currentPageX: $('.timelineProgress').offset().left + 20 });
            if (typeof(canvasLayerRunning) != "undefined") {
                map.removeOverlay(canvasLayerRunning);
                canvasLayerRunning = undefined;
            }
            that.setState({playOrPause: 'timelinePlay'});
            that.setRunningPointByProgress(pxPart[0].start_time - 0);
        },
        getPxByTime:function(time){
            var px = 0;
            // 像素 = (当前时间戳 + （北京时区 * 60 * 60））% 一天的秒) / (一个时间轴像素代表的秒数)
            px = (time + 28800) % 86400 / 120;
            return px;
        },
        getTimeByPx: function(px) {
            var time = 0;
            time = (px) * 120 + this.state.initTimeStamp;
            return time;
        },
        getPointByTime: function(time) {
            var point = {};
            var totalPoint = this.state.totalPointData;
            if (time < totalPoint[0].loc_time) {
                point = totalPoint[0];
                return point;
            }
            if (time > totalPoint[totalPoint.length - 1].loc_time) {
                point = totalPoint[totalPoint.length - 1];
                return point;
            }
            for (var i = 0; i < totalPoint.length - 1; i++){

                if (time >= totalPoint[i].loc_time && time <= totalPoint[i + 1].loc_time) {
                    point = totalPoint[i];
                    break;
                }
            }
            return point;
        },
        setRunningPointByProgress:function(progress){
            var point = this.getPointByTime(this.getTimeByPx(progress + 0));
            if (point.loc_time !== undefined){
                //this.setRunningPoint(point);
            }
        }
    }

    return timeline;
});