define(["durandal/app","durandal/composition","knockout","i18nCommon","slider"],
  function(app,composition,ko,i18nCommon,slider) {
    
    var panelUtil = {
        init: function(){
            var that = this;
	   	    composition.addBindingHandler("panel", {
	   		    init: function(dom){		
	   		    	that._dom = dom;
                    that.rendUI();
                    that.bindUI();
	   		    },
	   		    update: function(){}
	   		});
        },
        rendUI:function(){
            var self = this;
            $(".panel").draggable({handle:'.handler'});
            $(".play-progress").slider({
                width: 280,
                tipFormatter: function(value){
                    return value + '%';
                }
            });
        },
        bindUI:function(){

        }
    };

    var model = {

    };

    panelUtil.init();

    return model;

});