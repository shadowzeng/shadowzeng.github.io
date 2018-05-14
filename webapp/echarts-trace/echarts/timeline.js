define(['dojo/_base/declare','echarts4'],function(declare,echarts){
    var template = '<div class="timeline">'+
                        '<div class="timelineControl">'+
                            '<div id="play-control" class="timelinePlay"></div>'+   
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

    var timeline = declare([],{
        target: 'map-controls',
        props:{
            timelineLong: 721,
        },
        state:{
            tabIndex: 0,                // 页签编码 0为实时监控 1为轨迹查询
            parentVisible: {},          // 父容器可见性
            timeCount: [],              // 时间轴显示的小时数量
            timeNumber: [],             // 时间轴显示的时间数字标识
            progress: 0,                // 时间轴位置
            currentProgress: 0,         // 当前时间轴位置
            currentPageX:  0,           // 当前时间轴位置对应的pageX
            initMouseX: 0,              // 初始鼠标拖动位置
            label: 0,                   // label的位置
            labelVisible: 'blank',      // lable可见性
            currentTimeStamp: 0,        // 当前时间轴位置代表的时间戳
            dataPart: [],               // 当前有数据的时间段数组
            initTimeStamp: 0,           // 当天起始时间时间错
            totalPointData:[],          // 所有路径点数据
            playState: 'stop',          // 轨迹播放状态
            playOrPause: 'timelinePlay',// 播放按钮状态
            // 播放速度，常规速度为0.1/frame  减速为 0.08,0.06,0.04,0.02,0.01  加速为 0.12,0.14,0.16,0.18,0.20
            playSpeed: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
            playSpeedIndex: 5,          //当前播放速度位置
            hovertime: '0:0',           // 浮动时间
            caliperAPosition: 0,        // 卡尺A位置
            caliperBPosition: 721,      // 卡尺B位置
            caliperAclientX: 0,         // 卡尺A的clientX
            caluperCurrent: ''          // 当前拖动的卡尺
        },
        constructor:function(map,traceManager,option,target){
            this.map = map;
            this.traceManager = traceManager;
            this.target = target || this.target;
            this.container = null;

			if(typeof(this.target) == "string"){
				this.container=$("#"+this.target);
			}else{
				this.container=$(this.target);
			}

			this.renderUI();
			this.bindUI();
        },
        renderUI:function(){
            this.container.append(template);
            this.initTimeline();
        },
        bindUI:function(){
            this.container.find('#play-control').on('click',$.proxy(this.handlePlayOrPause,this));    // 播放按钮点击响应
            this.container.find('.timelineMain').on('click',$.proxy(this.handleTimelineClick,this));
            this.container.find('.timelineMain').on('mouseover',$.proxy(this.handleHoverLabel,this));
            this.container.find('.timelineMain').on('mouseout',$.proxy(this.handleOffLabel,this));
            this.container.find('.timelineProgress').on('mousedown',$.proxy(this.handleProgressDragStart,this));  // 播放进度块点击拖动的响应
            this.container.find('.caliperPointerA').on('mousedown',$.proxy(this.handleCaliperDragStart,this));   // 滑块A点击拖动的响应
            this.container.find('.caliperPointerB').on('mousedown',$.proxy(this.handleCaliperDragStart,this));   // 滑块B点击拖动的响应
        },
        /*************************************** util *****************************************/
        initTimeline:function(){   // 初始化时间轴
            var timeHourDom = '';
            var timeNumberDom = '';
            for (var i = 0; i < 24; i++){
                if (0==i){
                    timeHourDom += '<div class="timeHour timeHourFirst" key="0"></div>';
                }else if(23==i){
                    timeHourDom += '<div class="timeHour timeHourFinal" key="23"></div>';
                }else{
                    timeHourDom += '<div class="timeHour" key="'+i+'"></div>';
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
                    if (!dataPart.length){
                        this.container.find(".runPart").remove();
                    }
                    for(var j = 0; j < dataPart.length; j++){
                        var start = dataPart[j].start_time;
                        var end = dataPart[j].end_time;
                        var dom = '<div class="runPart" style="left:'+start+'px;width:'+(end-start)+'px"></div>';
                        this.container.find('.timelineProgress').after(dom);
                    }
                }else if (i == 'progress'){
                    this.container.find('.timelineProgress').css('left',state[i]+'px');
                }else if (i == 'caliperAPosition'){
                    this.container.find('.caliperA').css('left',state[i]+'px');
                    this.container.find('.caliperPartA').css('width',state[i]+'px');
                }else if (i == 'caliperBPosition'){
                    this.container.find('.caliperB').css('left',state[i]+'px');
                    this.container.find('.caliperPartB').css('width',(721-state[i])+'px');
                }else if (i == 'label'){
                    this.container.find('.timelineLabel').css('left',state[i]+'px');
                }else if (i == 'hovertime'){
                    this.container.find('.timelineLabelcontent').html(state[i]);
                }else if (i == 'playOrPause'){
                    if (state[i] == 'timelinePlay'){
                        this.container.find('#play-control').removeClass('timelinePause').addClass('timelinePlay');
                    }else{
                        this.container.find('#play-control').removeClass('timelinePlay').addClass('timelinePause');
                    }
                    
                }
                this.state[i] = state[i];
            }
        },
        initState:function(){
            this.container.find('.timeline').show();
            this.setState({
                tabIndex: 0,                // 页签编码 0为实时监控 1为轨迹查询
                parentVisible: {},          // 父容器可见性
                timeCount: [],              // 时间轴显示的小时数量
                timeNumber: [],             // 时间轴显示的时间数字标识
                progress: 0,                // 时间轴位置
                currentProgress: 0,         // 当前时间轴位置
                currentPageX:  0,           // 当前时间轴位置对应的pageX
                initMouseX: 0,              // 初始鼠标拖动位置
                label: 0,                   // label的位置
                labelVisible: 'blank',      // lable可见性
                currentTimeStamp: 0,        // 当前时间轴位置代表的时间戳
                dataPart: [],               // 当前有数据的时间段数组
                initTimeStamp: 0,           // 当天起始时间时间错
                totalPointData:[],          // 所有路径点数据
                playState: 'stop',          // 轨迹播放状态
                playOrPause: 'timelinePlay',// 播放按钮状态
                // 播放速度，常规速度为0.1/frame  减速为 0.08,0.06,0.04,0.02,0.01  加速为 0.12,0.14,0.16,0.18,0.20
                playSpeed: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
                playSpeedIndex: 5,          //当前播放速度位置
                hovertime: '0:0',           // 浮动时间
                caliperAPosition: 0,        // 卡尺A位置
                caliperBPosition: 721,      // 卡尺B位置
                caliperAclientX: 0,         // 卡尺A的clientX
                caluperCurrent: ''          // 当前拖动的卡尺
            });
            $('.timelineLabel').css('display','none');
        },
        /******************************** 依据轨迹数据设置时间轴各属性 ***********************************/
        listenTrackRoute: function(playData) {
            this.initState();

            var that = this;
            if (!playData||playData.data.length === 0) {
                return;
            }

            //that.tracePlayData = playData;
            var actualTimelength = (playData.playEnd-playData.playBegin)/1000;
            console.log("实际时间："+actualTimelength);
            var speed = that.state.playSpeed[that.state.playSpeedIndex];
            this.state.playTimelength = ((actualTimelength/120)/speed)*0.016;
            console.log("计算用时："+this.state.playTimelength);
            var start = that.getPxByTime(playData.playBegin/1000);
            var end = that.getPxByTime(playData.playEnd/1000);
            console.log("播放的起始像素点："+start+"，结束像素点："+end+"，共"+(end-start)+"个像素点");
            that.setState({dataPart:[{start_time:start,end_time:end}]});
            that.setState({progress: start, currentProgress: start});
            that.setState({playOrPause: 'timelinePlay'});

            var traceDataArr = playData.data;
            this.objectTimePart = [];
            for (var i = 0; i < traceDataArr.length; i++){
                var objectData = traceDataArr[i];
                var startPx = that.getPxByTime(objectData.begin/1000);
                var endPx = that.getPxByTime(objectData.end/1000);
                var objectPlayInfo = {
                    id:objectData.id,
                    startPx:startPx,
                    endPx:endPx
                }
                this.objectTimePart.push(objectPlayInfo);
            }
        },
        /****************************************** 播放响应 ***********************************************/
        handlePlayOrPause:function(event){
        
            // if (this.state.dataPart.length === 0){
            //     return;
            // }

            var that = this;
            var newStatus = '';

            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            var step = function(timestamp) {
                // if(that.state.playOrPause === 'timelinePlay'){
                //     return;
                // }

                var speed = that.state.playSpeed[that.state.playSpeedIndex];
                that.setState({progress: that.state.progress + speed});
                that.setState({currentProgress: that.state.currentProgress + speed});
                that.actToTrace(that.state.currentProgress + speed);
                that.setState({currentPageX: that.state.currentPageX + speed});
                //that.setRunningPointByProgress(that.state.progress + speed);
                if (that.state.progress + speed > that.state.dataPart[0].end_time) {
                    debugger
                    console.log("进度条播放结束用时："+(((new Date().getTime())-that.sstart)/1000));
                    newStatus = 'timelinePlay';
                    that.setState({playOrPause: newStatus});
                    return;
                }
                if (that.state.playOrPause === 'timelinePause') { // 图标为暂停图标则继续播放
                    requestAnimationFrame(step);
                } 
            }
            
            if ('stop'===that.state.playState){
                that.sstart = new Date().getTime();
                requestAnimationFrame(step);

                this.traceManager.showTrace(this.state.playTimelength);
                newStatus = 'timelinePause';
                that.setState({playOrPause: newStatus});
                that.state.playState = 'palying';
                return;
            }
            if (event.target.className === 'timelinePause') { // 如果当前图标为pause类型，点击后图标class设置为play
                newStatus = 'timelinePlay';
                this.traceManager.pauseTrace();
            } else { // 如果当前图标是play类型，那么点击后开始播放动画，设置图标为pause类型
                newStatus = 'timelinePause';
                requestAnimationFrame(step);
                this.traceManager.resumeTrace();
            }
            this.setState({playOrPause: newStatus});
        },
        handleTimelineClick:function(event){   // 鼠标点击时间轴刻度线的响应
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
            //that.setRunningPointByProgress(x);
        },
        /******************************************* 拖动播放进度块的响应 ************************************************/
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
        handleProgressDragEnd: function (event) {
            var that = this;
            if (that.state.totalPointData.length === 0) {
                return;
            }
            $(document).off('mousemove', that.onProgessDrag);
            $(document).off('mouseup', that.onProgressDragMouseUp);
            this.setState({currentProgress: that.state.progress});
            // this.setState({currentTimeStamp: that.getTimeByPx(that.state.progress)});
            // var point = that.getPointByTime(that.getTimeByPx(that.state.progress));
            // if (point.loc_time !== undefined){
            //     that.setRunningPoint(point);
            // }
            that.setRunningPointByProgress(that.state.progress)
        },
        /******************************************* 拖动滑块的响应 ************************************************/
        handleCaliperDragStart:function(event){debugger
            var that = this;
            // if (that.state.totalPointData.length === 0) {
            //     return;
            // }
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
            if (x < 0 || x > this.props.timelineLong) {
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
            } else if (x >= this.props.timelineLong) {
                x = this.props.timelineLong;
                clientx = $('.timelineMain').offset().left + this.props.timelineLong;
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

            //暂定播放
            this.handlePlayOrPause({
                target: {
                    className: 'timelinePause'
                }
            });
        },
        /******************************************* 时间label框显示和隐藏 ************************************************/
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
        handleOffLabel:function(){
            $('.timelineLabel').css('display','none');
        },
        /******************************************* 其他功能 ************************************************/
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
        actToTrace:function(progress){
            for (var i = 0; i < this.objectTimePart; i++){

            }
        },
        setRunningPointByProgress:function(progress){
            var point = this.getPointByTime(this.getTimeByPx(progress + 0));
            if (point.loc_time !== undefined){
                //this.setRunningPoint(point);
            }
        }
    });

    return timeline;
});