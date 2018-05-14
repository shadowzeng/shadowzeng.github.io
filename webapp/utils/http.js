define(["jquery", "i18nCommon"], function($, i18n){
	
	var Http;
	
	Http = function(url, settings, syncSuccessFn, syncErrorFn, context){
		this.settings = $.extend({}, Http.defaultSettings, settings);
		if(url.indexOf(eUrban.global.rootPath) < 0){
			url = eUrban.global.rootPath + url;
		}
		this.settings.url = url;
		if(!this.settings.async){
			if(context){
				if(syncSuccessFn){
					syncSuccessFn = $.proxy(syncSuccessFn, context);
				}
				if(syncErrorFn){
					syncErrorFn = $.proxy(syncErrorFn, context);
				}
			}
			this._successFn = syncSuccessFn;
			this._errorFn = syncErrorFn;
		}
		this.settings.success = $.proxy(Http._success, this);
		this.settings.error = $.proxy(Http._errorHandler, this);
	};
	
	Http.defaultSettings = {
		async: true,       //同步还是异步，默认为异步
		cache: false,
		timeout: 1200000,
		type: "GET",       //请求方式 ("POST" 或 "GET"), 注意：其它 HTTP 请求方法，如 PUT 和  DELETE 也可以使用，但仅部分浏览器支持。
		global: true,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		jsonp: null,
		complete: function(data){},
		dataFilter: function (data, type) {return data;},
		dataType: "json",
		username: null,
		password: null,
		processData: true,
		shutDownShowMsgFlag: false,
		shutDownRefreshFlag: false,
		test: false,       //是否前端独立测试
		testDataName: null //在文件夹view/test/data/下的json文件名，不带后缀
	};
	
	Http._success = function(data){
		if(data.resultInfo){
			if(data.resultInfo && data.resultInfo.success && 
					(data.resultInfo.success === true || data.resultInfo.success === "true")){
				if(this._successFn){
					this._successFn(data.resultInfo.data, data.resultInfo);
				}
			}else{
				Http._error(data, this);
			}
		}else{
			if(data && data.success && 
					(data.success === true || data.success === "true")){
				this._successFn(data.data, data);
			}else{
				Http._error(data, this);
			}
		}
	};
	
	Http._errorHandler = function(XMLHttpRequest, textStatus, errorThrown){
		//如果登陆被踢，或者session失效和没有登陆
		if(XMLHttpRequest && XMLHttpRequest.status === 401){
			eUrban.global.httpSessionValidFlag = false;
		} else if (XMLHttpRequest && XMLHttpRequest.status === 0) {
			if(this.settings.shutDownShowMsgFlag){
				
				var refreshFunc = $.proxy(function(){
					if(this.settings.shutDownRefreshFlag){
						window.location = eUrban.global.rootPath;
					}
				}, this);
				
			}
		}else{
			Http._error({
				"data": {
					"XMLHttpRequest": XMLHttpRequest,
					"textStatus": textStatus,
					"errorThrown": errorThrown
				},
				"success": false,
				"message": i18n.textCommonError
			}, this);
		}
	};
	
	Http._error = function(data, context){
		console.log(context.settings.url+" 报错");
		if(context._errorFn){
			if(data.resultInfo){
				context._errorFn(data.resultInfo.data, data);
			}else{
				context._errorFn(data.data, data);
			}
		}else{
			if(data.resultInfo){
				if(data.resultInfo && data.resultInfo.message){
					
				}else{
					
				}
			}else{
				if(data && data.message){
					
				}else{
					
				}
			}
		}
	};
	
	Http.prototype.ajax = function(data){
		this.settings.data = data;
		if(!this.settings.test){
			$.ajax(this.settings); 
		}else{
			//支持前端独立测试
			this.settings.url = eUrban.global.rootPath + "view/test/data/" + this.settings.testDataName + ".json"
			$.ajax(this.settings); 
		}
		return this;
	};
	
	Http.prototype.then = function(successFn, context){
		if(this.settings.async){
			if(context){
				successFn = $.proxy(successFn, context);
			}
			this._successFn = successFn;
		}else{
			alert(" sync can not use then() ");
		}
		return this;
	};
	
	Http.prototype.error = function(errorFn, context){
		if(this.settings.async){
			if(context){
				errorFn = $.proxy(errorFn, context);
			}
			this._errorFn = errorFn;
		}else{
			alert(" sync can not use error() ");
		}
		return this;
	};
	
	return {
		getInstance: function(url, settings, syncSuccessFn, syncErrorFn, context){
			return new Http(url, settings, syncSuccessFn, syncErrorFn, context);
		}
	}
});