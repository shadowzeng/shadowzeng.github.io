;
(function($) {
	$.fn.extend({
		autocomplete: function(urlOrData, options) {
			var isUrl = typeof urlOrData == "string";
			options = $.extend({}, $.Autocompleter.defaults, {
				url: isUrl ? urlOrData : null,
				data: isUrl ? null : urlOrData,
				delay: isUrl ? $.Autocompleter.defaults.delay : 10,
				max: options && !options.scroll ? 10 : 150
			}, options);
			options.highlight = options.highlight ||
			function(value) {
				return value
			};
			options.formatMatch = options.formatMatch || options.formatItem;
			return this.each(function() {
				new $.Autocompleter(this, options)
			})
		},
		result: function(handler) {
			return this.bind("result", handler)
		},
		search: function(handler) {
			return this.trigger("search", [handler])
		},
		flushCache: function() {
			return this.trigger("flushCache")
		},
		setOptions: function(options) {
			return this.trigger("setOptions", [options])
		},
		unautocomplete: function() {
			return this.trigger("unautocomplete")
		}
	});
	$.Autocompleter = function(input, options) {
		var KEY = {
			UP: 38,
			DOWN: 40,
			DEL: 46,
			TAB: 9,
			RETURN: 13,
			ESC: 27,
			COMMA: 188,
			PAGEUP: 33,
			PAGEDOWN: 34,
			BACKSPACE: 8
		};
		var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
		var timeout;
		var previousValue = "";
		var cache = $.Autocompleter.Cache(options);
		var hasFocus = 0;
		var lastKeyPressCode;
		var config = {
			mouseDownOnSelect: false
		};
		var select = $.Autocompleter.Select(options, input, selectCurrent, config);
		var pagination = $.Autocompleter.Select(options, input, select);
		var blockSubmit;
		$.browser = {};
		$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
		$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
		$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
		$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
			if (blockSubmit) {
				blockSubmit = false;
				return false
			}
		});
		$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
			hasFocus = 1;
			lastKeyPressCode = event.keyCode;
			switch (event.keyCode) {
			case KEY.UP:
				event.preventDefault();
				if (select.visible()) {
					select.prev()
				} else {
					onChange(0, true)
				}
				break;
			case KEY.DOWN:
				event.preventDefault();
				if (select.visible()) {
					select.next()
				} else {
					onChange(0, true)
				}
				break;
			case KEY.PAGEUP:
				event.preventDefault();
				if (select.visible()) {
					select.pageUp()
				} else {
					onChange(0, true)
				}
				break;
			case KEY.PAGEDOWN:
				event.preventDefault();
				if (select.visible()) {
					select.pageDown()
				} else {
					onChange(0, true)
				}
				break;
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if (selectCurrent()) {
					event.preventDefault();
					blockSubmit = true;
					return false
				}else{
					onChange(0, true);
				}
				break;
			case KEY.ESC:
				select.hide();
				break;
			default:
			//	clearTimeout(timeout);
			//	timeout = setTimeout(onChange, options.delay);
				break
			}
		}).focus(function() {
			hasFocus++
		}).blur(function() {
			hasFocus = 0;
			if (!config.mouseDownOnSelect) {
				//hideResults()
			}
		}).click(function() {
			if (hasFocus++ > 1 && !select.visible()) {
				onChange(0, true)
			}
		}).bind("search", function() {
			var fn = (arguments.length > 1) ? arguments[1] : null;
			function findValueCallback(q, data) {
				var result;
				if (data && data.length) {
					for (var i = 0; i < data.length; i++) {
						if (data[i].result.toLowerCase() == q.toLowerCase()) {
							result = data[i];
							break
						}
					}
				}
				receiveData(q,data);
				if (typeof fn == "function") fn(result);
				else $input.trigger("result", result && [result.data, result.value])
			}
			$.each(trimWords($input.val()), function(i, value) {
				request(value,0, findValueCallback, findValueCallback)
			})
		}).bind("flushCache", function() {
			cache.flush()
		}).bind("setOptions", function() {
			$.extend(options, arguments[1]);
			cache.flush();
			if ("data" in arguments[1]) cache.populate()
		}).bind("input", function() {
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				onChange(0, true)
			}, options.delay);
		}).bind("unautocomplete", function() {
			select.unbind();
			$input.unbind();
			$(input.form).unbind(".autocomplete")
		}).bind("pageChange",function(evt,term,pageNo,isClick){
			request(term,pageNo-1, receiveData, hideResultsNow,isClick);
		});

		function selectCurrent() {
			var selected = select.selected();
			if (!selected) return false;
			var v = selected.result;
			previousValue = v;
			if (options.multiple) {
				var words = trimWords($input.val());
				if (words.length > 1) {
					var seperator = options.multipleSeparator.length;
					var cursorAt = $(input).selection().start;
					var wordAt, progress = 0;
					$.each(words, function(i, word) {
						progress += word.length;
						if (cursorAt <= progress) {
							wordAt = i;
							return false
						}
						progress += seperator
					});
					words[wordAt] = v;
					v = words.join(options.multipleSeparator)
				}
				v += options.multipleSeparator
			}
			$input.val(v);
			hideResultsNow();
			$input.trigger("result", [selected.data, selected.value]);
			return true
		}

		function onChange(crap, skipPrevCheck) {
			if (lastKeyPressCode == KEY.DEL) {
				$input.trigger("hide");
				select.hide();
				return
			}
			
			var currentValue = $input.val();
			if (skipPrevCheck && currentValue == previousValue) return;
			previousValue = currentValue;
			currentValue = lastWord(currentValue);
			
			if (currentValue.length >= options.minChars||(lastKeyPressCode == KEY.RETURN&&currentValue.length > 0)) {
				$input.addClass(options.loadingClass);
				if (!options.matchCase) currentValue = currentValue.toLowerCase();
				requestPage(currentValue);
			} else {
				if(currentValue.length == 0){
					$input.trigger("reset", []);
				}
				stopLoading();
				select.hide();
				$input.trigger("hide");
			}
		};

		function trimWords(value) {
			if (!value) return [""];
			if (!options.multiple) return [$.trim(value)];
			return $.map(value.split(options.multipleSeparator), function(word) {
				return $.trim(value).length ? $.trim(word) : null
			})
		}

		function lastWord(value) {
			if (!options.multiple) return value;
			var words = trimWords(value);
			if (words.length == 1) return words[0];
			var cursorAt = $(input).selection().start;
			if (cursorAt == value.length) {
				words = trimWords(value)
			} else {
				words = trimWords(value.replace(value.substring(cursorAt), ""))
			}
			return words[words.length - 1]
		}

		function autoFill(q, sValue) {
			if (options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE) {
				$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
				$(input).selection(previousValue.length, previousValue.length + sValue.length)
			}
		};

		function hideResults() {
			clearTimeout(timeout);
			timeout = setTimeout(hideResultsNow, 200)
		};

		function hideResultsNow() {
			var wasVisible = select.visible();
			select.hide();
			clearTimeout(timeout);
			stopLoading();
			if (options.mustMatch) {
				$input.search(function(result) {
					if (!result) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""))
						} else {
							$input.val("");
							$input.trigger("result", null)
						}
					}
				})
			}
		};

		function receiveData(q, data,isHis) {
			if (data && data.length) {
				stopLoading();
				select.display(data, q,isHis);
				autoFill(q, data[0].value);
				select.show();
			} else {
				stopLoading();
				select.displaynodata();
				select.show();
			//	hideResultsNow()
			}
		};
		
		function requestPage(term, success, failure) {
			if (!options.matchCase) term = term.toLowerCase();
			select.display([], term);
			select.setPage(-1);		
		};
		
		function request(term,pageNo,success, failure,isClick){
			if (!options.matchCase) term = term.toLowerCase();
			var cacheData = options.getCache(term);
			
			var data = cache.load(term);
			if (data) {
				var parsed = options.parse && options.parse(data,pageNo,options.max,lastKeyPressCode,isClick) || parse(data);
				success(term, parsed);
			} else if ((typeof options.url == "string") && (options.url.length > 0)) {
				var extraParams = $.extend({timestamp:+new Date()},options.extraParams);
				var page  =pageNo;
				var cacheLength = cacheData.length;
				if(cacheLength>pageNo*options.max){
					cacheData = cacheData.slice(pageNo*options.max,(pageNo+1)*options.max);
					for(var i=0;i<cacheData.length;i++){
						cacheData[i].history = true;
					}
				}else{
					cacheData = [];
				}
				if(cacheData.length == options.max){
					var parsed = options.parse && options.parse(cacheData,pageNo,options.max,lastKeyPressCode,isClick) || parse(cacheData);
					success(term, parsed,true);
					return ;
				}else if(cacheData.length > 0){
					page = 0;
				}else{
					page = pageNo - Math.ceil(cacheLength/ options.max);
				}
				var params = {
					pagesize: options.max,
					pageno:page
				};
				var tolorence = 25000;
				var point =egovagis.eMap.extent.getCenter();
				if(egovagis.sysConfig.spatialType  == 2){
					tolorence = 0.25;
				}
				params.bounds = (point.x-tolorence)+","+(point.y-tolorence)+","+(point.x+tolorence)+","+(point.y+tolorence);
				params[options["queryName"]]=encodeURIComponent(lastWord(term));
				var url =  options.url;
				$.each(params, function(key, param) {
					url = url.replace(new RegExp("\\$\\{"+key+"\\}",'gm'),params[key]);
				});
				$.ajax({
					type: options.method,
					mode: "abort",
					port: "autocomplete" + input.name,
					dataType: options.dataType,
					url:options.urlEncode(url),
					data: extraParams,
					success: function(data) {
						cache.add(term, data);
						var list =cacheData.concat(data);
						var parsed = options.parse && options.parse(list,pageNo,options.max,lastKeyPressCode,isClick) || parse(list);
						success(term, parsed);
					}
				})
			} else {
				select.emptyList();
				failure(term)
			}
		}
		
		function parse(data) {
			var parsed = [];
			var rows = data.split("\n");
			for (var i = 0; i < rows.length; i++) {
				var row = $.trim(rows[i]);
				if (row) {
					row = row.split("|");
					parsed[parsed.length] = {
						data: row,
						value: row[0],
						result: options.formatResult && options.formatResult(row, row[0]) || row[0]
					}
				}
			}
			return parsed
		};

		function stopLoading() {
			$input.removeClass(options.loadingClass)
		}
	};
	
	
	
	
	$.Autocompleter.defaults = {
		inputClass: "ac_input",
		resultsClass: "ac_results",
		loadingClass: "ac_loading",
		minChars: 1,
		delay: 400,
		matchCase: false,
		matchSubset: true,
		matchContains: false,
		cacheLength: 10,
		max: 100,
		mustMatch: false,
		extraParams: {},
		selectFirst: true,
		formatItem: function(row) {
			return row[0]
		},
		formatMatch: null,
		autoFill: false,
		width: 0,
		left: 0,
		multiple: false,
		multipleSeparator: ", ",
		highlight: function(value, term) {
			return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
		},
		scroll: true,
		scrollHeight: 180,
		queryName: "q"
	};
	$.Autocompleter.Cache = function(options) {
		var data = {};
		var length = 0;

		function matchSubset(s, sub) {
			if (!options.matchCase) s = s.toLowerCase();
			var i = s.indexOf(sub);
			if (options.matchContains == "word") {
				i = s.toLowerCase().search("\\b" + sub.toLowerCase())
			}
			if (i == -1) return false;
			return i == 0 || options.matchContains
		};

		function add(q, value) {
			if (length > options.cacheLength) {
				flush()
			}
			if (!data[q]) {
				length++
			}
			data[q] = value
		}

		function populate() {
			if (!options.data) return false;
			var stMatchSets = {},
				nullData = 0;
			if (!options.url) options.cacheLength = 1;
			stMatchSets[""] = [];
			for (var i = 0, ol = options.data.length; i < ol; i++) {
				var rawValue = options.data[i];
				rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
				var value = options.formatMatch(rawValue, i + 1, options.data.length);
				if (value === false) continue;
				var firstChar = value.charAt(0).toLowerCase();
				if (!stMatchSets[firstChar]) stMatchSets[firstChar] = [];
				var row = {
					value: value,
					data: rawValue,
					result: options.formatResult && options.formatResult(rawValue) || value
				};
				stMatchSets[firstChar].push(row);
				if (nullData++ < options.max) {
					stMatchSets[""].push(row)
				}
			};
			$.each(stMatchSets, function(i, value) {
				options.cacheLength++;
				add(i, value)
			})
		}
		setTimeout(populate, 25);

		function flush() {
			data = {};
			length = 0
		}
		return {
			flush: flush,
			add: add,
			populate: populate,
			load: function(q) {
				if (!options.cacheLength || !length) return null;
				if (!options.url && options.matchContains) {
					var csub = [];
					for (var k in data) {
						if (k.length > 0) {
							var c = data[k];
							$.each(c, function(i, x) {
								if (matchSubset(x.value, q)) {
									csub.push(x)
								}
							})
						}
					}
					return csub
				} else if (data[q]) {
					return data[q]
				} else if (options.matchSubset) {
					for (var i = q.length - 1; i >= options.minChars; i--) {
						var c = data[q.substr(0, i)];
						if (c) {
							var csub = [];
							$.each(c, function(i, x) {
								if (matchSubset(x.value, q)) {
									csub[csub.length] = x
								}
							});
							return csub
						}
					}
				}
				return null
			}
		}
	};
	$.Autocompleter.Pagination = function(options,input,target){
		var element;
		var pageCount =1;
		var currentPage = -1;
		var _callback;
		function init(){
			element = $("<div/>").addClass("pagination").appendTo(target);
			$("<div/>").addClass("pageUp").html('<<').appendTo(element);
			$("<div/>").addClass("pageList").appendTo(element);
		//	$("<div/>").addClass("pageDown").html('>>').appendTo(element);
			
			//点击分页按钮触发
			element.delegate("a","click",function(){
				var pageNum = parseInt($(this).html());//获取当前页数
				pageGroup(pageNum,pageCount,_callback);
			});
			
			element.find(".pageUp").click(function(){
				pageGroup(1,pageCount,_callback);
			});
			element.find(".pageDown").click(function(){
				pageGroup(pageCount,pageCount,_callback);
			});
			//生成分页按钮
			pageGroup(1,pageCount,_callback);
		}
		//点击跳转页面
		function pageGroup(pageNum,pageCount,callback,isclick){
			var start = 1,end = pageCount;
			currentPage = pageNum;
			switch(pageNum){
				case 1:
					(pageCount>=5)&&(end=5);
					page_icon(1,end,0);
					callback&&callback(1,isclick);
				break;
				case 2:
					(pageCount>=5)&&(end=5);
					page_icon(1,end,1);
					callback&&callback(2,isclick);
				break;
				case pageCount-1:
					pageCount-4>0&&(start=pageCount-4);
					page_icon(start,pageCount,pageCount-start-1);
					callback&&callback(pageCount-1,isclick);
				break;
				case pageCount:
					pageCount-4>0&&(start=pageCount-4);
					page_icon(start,pageCount,pageCount-start);
					callback&&callback(pageCount,isclick);
				break;
				default:
					page_icon(pageNum-2,pageNum+2,2);
					callback&&callback(pageNum,isclick);
				break;
			}
		}

		//根据当前选中页生成页面点击按钮
		function page_icon(page,count,eq){
			var ul_html = "";
			for(var i=page; i<=count; i++){
				ul_html += "<a>"+i+"</a>";
			}
			element.find(".pageList").html(ul_html);
			element.find(".pageList a").eq(eq).addClass("on");
		}
		init();
		return {
			setIsEnd:function(flag){
				if(flag<=0){
					pageGroup(currentPage,currentPage);
					pageCount = currentPage+flag;
				}else{
					var count = currentPage+2;
					if(currentPage<3){
						count = 5;
					}
					if(pageCount>0&&count>pageCount){
						count = pageCount;
					}
					pageGroup(currentPage,count);
				}
			},
			setPage:function(count,__callback,isclick){
				pageCount = count;
				_callback = __callback;	
				pageGroup(1,pageCount,_callback,isclick);
			},
			movePage:function(step){
				var pageNum = currentPage+step;
				if(pageNum<1||pageNum>pageCount)
					return;
				pageGroup(pageNum,pageCount,callback);
			}
		}
		
	}
	
	
	
	$.Autocompleter.Select = function(options, input, select, config) {
		var CLASSES = {
			ACTIVE: "ac_over"
		};
		var listItems, active = -1,
			data, term = "",
			needsInit = true,
			element, list,page,nodatanode;

		function init() {
			if (!needsInit) return;
			element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body);
			nodatanode = $("<div/>").text('无更多结果').addClass("ac_results_nodata").appendTo(element).hide();
			list = $("<ul/>").appendTo(element).click(function(event) {
				if (target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
					if(active>-1){
						var style = "url("+egovagis.sysConfig.symbolServiceURL+"/geocode/custom_geo"+(active+1)+".gif) 3px center  no-repeat";
						if(data[active].data["history"]){
							style+=",url("+egovagis.sysConfig.symbolServiceURL+"histroy.png) 18px 20px no-repeat";
						}
						$("li."+CLASSES.ACTIVE,list).css({"background":style})
					}
					active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
					$(target(event)).addClass(CLASSES.ACTIVE);
					
					var style = "url("+egovagis.sysConfig.symbolServiceURL+"/geocode/custom_select"+(active+1)+".gif)  3px center  no-repeat";
					if(data[active].data["history"]){
						style+=",url("+egovagis.sysConfig.symbolServiceURL+"histroy.png) 18px 20px no-repeat";
					}
					$(target(event)).css({"background":style})
					$(input).trigger("moveSelect", [data[active].data, data[active].value]);
				}
			}).dblclick(function(event) {
				$(target(event)).addClass(CLASSES.ACTIVE);
				select();
				input.focus();
				return false
			}).mousedown(function() {
				config.mouseDownOnSelect = true
			}).mouseup(function() {
				config.mouseDownOnSelect = false
			});
			page = $.Autocompleter.Pagination(options, input, element);
			if (options.width > 0) element.css("width", options.width);
			needsInit = false
		}
		
		
		
		function target(event) {
			var element = event.target;
			while (element && element.tagName != "LI") element = element.parentNode;
			if (!element) return [];
			return element
		}

		function moveSelect(step) {
			if(active>-1){
				var style = "url("+egovagis.sysConfig.symbolServiceURL+"/geocode/custom_geo"+(active+1)+".gif)  3px center  no-repeat";
				if(data[active].data["history"]){
					style+=",url("+egovagis.sysConfig.symbolServiceURL+"histroy.png) 18px 20px no-repeat";
				}
				$(listItems[active]).css({"background":style})
			}
			listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
			movePosition(step);
			if(active>-1){
				var style = "url("+egovagis.sysConfig.symbolServiceURL+"/geocode/custom_select"+(active+1)+".gif)  3px center  no-repeat";
				if(data[active].data["history"]){
					style+=",url("+egovagis.sysConfig.symbolServiceURL+"histroy.png) 18px 20px no-repeat";
				}
				$(listItems[active]).css({"background":style})
			}
			var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
			if (options.scroll) {
				var offset = 0;
				listItems.slice(0, active).each(function() {
					offset += this.offsetHeight
				});
				if ((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
					list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight())
				} else if (offset < list.scrollTop()) {
					list.scrollTop(offset)
				}
			}
			$(input).trigger("moveSelect", [data[active].data, data[active].value])
		};

		function movePosition(step) {
			active += step;
			if (active < 0) {
				active = listItems.size() - 1
			} else if (active >= listItems.size()) {
				active = 0
			}
		}

		function limitNumberOfItems(available) {
			return options.max && options.max < available ? options.max : available
		}

		function fillList() {
			active = -1;
			list.empty();
			nodatanode.hide();
			var max = limitNumberOfItems(data.length);
			for (var i = 0; i < max; i++) {
				if (!data[i]) continue;
				var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
				if (formatted === false) continue;
				var style = "url("+egovagis.sysConfig.symbolServiceURL+"/geocode/custom_geo"+(i+1)+".gif) 3px center no-repeat";
				if(data[i].data["history"]){
					style+=",url("+egovagis.sysConfig.symbolServiceURL+"histroy.png) 18px 20px no-repeat";
				}
				
				var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").attr("title",formatted).appendTo(list)[0];
				$(li).css({"background":style})
				$.data(li, "ac_data", data[i])
			}
			listItems = list.find("li");
			if (options.selectFirst) {
				listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
				active = 0
			}
			if ($.fn.bgiframe) list.bgiframe()
		}
	
		function fillNoData(){
			active = -1;
			list.empty();
			nodatanode.show();
			//$("<li/>").html("无更多结果").appendTo(list);
			//if ($.fn.bgiframe) list.bgiframe()
		}
	
		return {
			display: function(d, q,isHis) {
				init();
				data = d;
				term = q;
				if(options.max<=data.length||isHis){
					page.setIsEnd(1);
				}else if(0==data.length){
					page.setIsEnd(-1);
				}else{
					page.setIsEnd(0);
				}
				fillList();
			},
			displaynodata:function(){
				fillNoData();
				page.setIsEnd(-1);
			},
			next: function() {
				moveSelect(1)
			},
			prev: function() {
				moveSelect(-1)
			},
			pageUp: function() {
				page.movePage(-1);
			/*	if (active != 0 && active - 8 < 0) {
					moveSelect(-active)
				} else {
					moveSelect(-8)
				}*/
			},
			pageDown: function() {
				page.movePage(1);
				/*if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
					moveSelect(listItems.size() - 1 - active)
				} else {
					moveSelect(8)
				}*/
			},
			hide: function() {
				element && element.hide();
				listItems && listItems.removeClass(CLASSES.ACTIVE);
				active = -1
			},
			visible: function() {
				return element && element.is(":visible")
			},
			setPage:function(count){
				page.setPage(count,$.proxy(this.pageChange,this),false);
			},
			pageChange:function(pageNo,isClick){
				$(input).trigger("pageChange", [term,pageNo,isClick])
			},
			current: function() {
				return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0])
			},
			show: function() {
				var offset = $(input).offset();
				var css = {
					width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
					top: offset.top + input.offsetHeight,
					left: offset.left + options.left
				};
				var bottom = offset.top + input.offsetHeight+element.height();
				if(bottom>$(document).height()){
					css.top = offset.top - element.height()-10;
				}
				element.css(css).show();
				if (options.scroll) {
					list.scrollTop(0);
					list.css({
						maxHeight: options.scrollHeight,
						overflow: 'auto'
					});
					if ($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
						var listHeight = 0;
						listItems.each(function() {
							listHeight += this.offsetHeight
						});
						var scrollbarsVisible = listHeight > options.scrollHeight;
						list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight);
						if (!scrollbarsVisible) {
							listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")))
						}
					}
				}
			},
			selected: function() {
				var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
				return selected && selected.length && $.data(selected[0], "ac_data")
			},
			emptyList: function() {
				list && list.empty()
			},
			unbind: function() {
				element && element.remove()
			}
		}
	};
	$.fn.selection = function(start, end) {
		if (start !== undefined) {
			return this.each(function() {
				if (this.createTextRange) {
					var selRange = this.createTextRange();
					if (end === undefined || start == end) {
						selRange.move("character", start);
						selRange.select()
					} else {
						selRange.collapse(true);
						selRange.moveStart("character", start);
						selRange.moveEnd("character", end);
						selRange.select()
					}
				} else if (this.setSelectionRange) {
					this.setSelectionRange(start, end)
				} else if (this.selectionStart) {
					this.selectionStart = start;
					this.selectionEnd = end
				}
			})
		}
		var field = this[0];
		if (field.createTextRange) {
			var range = document.selection.createRange(),
				orig = field.value,
				teststring = "<->",
				textLength = range.text.length;
			range.text = teststring;
			var caretAt = field.value.indexOf(teststring);
			field.value = orig;
			this.selection(caretAt, caretAt + textLength);
			return {
				start: caretAt,
				end: caretAt + textLength
			}
		} else if (field.selectionStart !== undefined) {
			return {
				start: field.selectionStart,
				end: field.selectionEnd
			}
		}
	}
})(eQuery);