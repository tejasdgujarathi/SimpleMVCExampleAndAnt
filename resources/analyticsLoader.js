var analytics = namespace('com.ee.analytics');

analytics.HeatMapDataHandler = Interface({
	handleAnalyticsData : function (elements){
    }
});

analytics.AnalyticsCapture =  Class({
	constructor : function(websocketAdaptor) {
		this._attachAnalyticsHandlers();
		this.analyticsDataHandler = new analytics.AnalyticsDataHandler();
		this._bindCallbacksForAnalyticsData(websocketAdaptor);
	},
	_attachAnalyticsHandlers : function(){
		this._attachHandlers($("body").children(), "body", ['click']);
		this._attachOpenOverLayHandler();
	},
	_bindCallbacksForAnalyticsData : function (websocketAdaptor) {
		websocketAdaptor.addHandler(this.analyticsDataHandler);
        websocketAdaptor.start();
	},
	_attachHandlers : function(elements, xPath, eventTypes) {
		var self = this;
		elements.each(function(index) {
			var xPathObj = {path : xPath + ">" + this.tagName + ":eq(" + index + ")"};
			if($(this).children().length == 0){
				for ( var eventCount = 0; eventCount < eventTypes.length; eventCount++) {
					$(this).bind(eventTypes[eventCount], function(event) {
						self._captureData(xPathObj.path, event.type);
					});
				}
			} else {
				self._attachHandlers($(this).children(), xPathObj.path, eventTypes);
			}
		});
	},
	_captureData : function(elementXPath, eventType) {
		$.ajax({
			url : 'http://localhost:9080/visualanalytics/analytics/analyticsCapture',
			type: 'GET',
			dataType: 'jsonp',
			contentType: 'application/text; charset=utf-8',
			mimeType : "json",
			data : { "elementXPath" : elementXPath, "eventType" : eventType, "url" : window.location.href},
			success : function(data){
				alert('in success : ' + data.status);
			},
			error: function(e, textstatus){
				debugger;
				alert('error: ' + e + ' status: ' + textstatus)
			}
		
		});
	},
	_attachOpenOverLayHandler : function() {
		var self = this;
		$("#open_overlay").click(function() {
			self.analyticsDataHandler.showAnalyticsView('click');
		});
	}
}).create();

analytics.AnalyticsDataHandler =  Class({
	constructor : function(websocketAdaptor) {
		this.analyticsMap = {};
	},
    
	handleAnalyticsData : function(elements) {
		for (var count = 0; count < elements.length; count++) {
			this._updateAnalyticsMap(elements[count]);
		}
	},
	_updateAnalyticsMap : function(updatedElement) {
		var self = this;
		var element = this.analyticsMap[updatedElement.xPath];
		if(element != null) {
			element.setEvents(updatedElement.events);
		} else {
			var xCordinate = $(updatedElement.xPath).offset().left;
			var yCordinate = $(updatedElement.xPath).offset().top;
			var events = self._getEventsOf(updatedElement);
			element = new analytics.Element(updatedElement.xPath,events, xCordinate, yCordinate); 
		}
		this.analyticsMap[element.xPath]  = element;
	},
	_getEventsOf : function(element){
    	var events = new Array;		
		for(var i = 0; i < element.events.length; i++){	
			var event = new analytics.Event(element.events[i].type, element.events[i].count);
			events.push(event);
		}
		return events;
    },
	showAnalyticsView : function(eventType) {
		var self = this;
		var displayboxdiv = $("#overlayDiv") ;
		displayboxdiv[0].style.display = "";
		displayboxdiv[0].innerHTML = "<a href='#' id='close_overlay'>CLOSE WINDOW</a>";
		var index = 0;
		var totalCount = self._getTotalCount(this.analyticsMap,eventType,self);
		for (var xPath in this.analyticsMap) {
			displayboxdiv[0].innerHTML += "<div id='main_"+index+"' style='margin-left:" + this.analyticsMap[xPath].xCordinate + "px;margin-top:" + 
						this.analyticsMap[xPath].yCordinate + "px;'><div id='countDiv' style='display: none'>" 
						+ self._getPercentage(this.analyticsMap[xPath].events,totalCount,eventType) + "</div></div>"; 
			
			var cnt = self._getCount(this.analyticsMap[xPath],eventType);
			var widthValue = (cnt/10)*10;
			var heightValue = (cnt/10)*5;
			$('#overlayDiv').find('#main_'+index).addClass('heatmap');
			$('#overlayDiv').find('#main_'+index).css('width',widthValue);
			$('#overlayDiv').find('#main_'+index).css('height',heightValue);
			
			$(':[id*=main_]').mouseenter(function() {
				this.firstChild.style.cssText = 'display:block';
			  }).mouseleave(function() {
				  this.firstChild.style.cssText = 'display:none';
			  });
			index++;
		}
		$('#overlayDiv').find('#close_overlay').bind('click', function() {
			var displayboxdiv = $("#overlayDiv") ;
			displayboxdiv[0].style.display = "none";
			displayboxdiv[0].innerHTML = '';
		});
	},	
	_getPercentage : function(events,totalCount,eventType) {
		var percentageValue = 0;
		for(var i = 0; i < events.length; i++){	
			if(events[i].type == eventType){
				percentageValue = (events[i].count/totalCount)*100;
				return percentageValue.toPrecision(4)+"%";
			}
		}
		return "";
	},
	_getTotalCount : function(analyticsMap,eventType,self) {
		var total = 0;
		for (var xPath in analyticsMap) {
			total +=  self._getCount(analyticsMap[xPath],eventType); 
		}
		return total;
	},
	_getCount : function(element,eventType) {
		for(var i = 0; i < element.events.length; i++){	
			if(element.events[i].type == eventType){
				return element.events[i].count;
			}
		}
		return 0;
	}
}).implement(analytics.HeatMapDataHandler).create();



analytics.Element =  Class({
    constructor : function(xPath, events, xCordinate, yCordinate) {
        this.xPath = xPath;
        this.events = events;
        this.xCordinate = xCordinate;
        this.yCordinate = yCordinate;
    },
    setEvents : function(events){
    	this.events = events;
    }
}).create();

analytics.Event =  Class({
    constructor : function(type, count) {
        this.type = type;
        this.count = count;
    },
    
    updateEvent : function(event) {
    	this.type = event.type;
    	this.count = event.count;
    }    
}).create();


$(document).ready(function() {
	 new analytics.AnalyticsCapture(new analytics.WebSocketDataAdapter("ws://localhost:8080/"));
});