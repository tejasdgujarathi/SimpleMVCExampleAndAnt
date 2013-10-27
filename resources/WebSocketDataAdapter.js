var analytics = namespace('com.ee.analytics');

analytics.WebSocketDataAdapter =  Class({
    constructor : function(url) {
        this.url = url;
    },
    start : function(){
        var self = this;
        try{
            var socket = this._getWebSocket();
            socket.onopen = function(){
                console.log('Socket Status: '+socket.readyState+' (open)');
                socket.send("SnapshotUpdate/"+window.location.href);
            };
            socket.onmessage = function(message){
               self.handler.handleAnalyticsData(eval(message.data));
            };
            socket.onclose = function(){
                console.log('Socket Status: '+socket.readyState+' (Closed)');
            };
            socket.onerror = function(message){
                console.log('Error '+message);
            };
           

        } catch(exception){
            console.log('Error '+exception);
            throw exception;
        }
    },
    _getWebSocket : function (){
        if(window.WebSocket){
            return new WebSocket(this.url);
        }
        if(window.MozWebSocket){
            return new MozWebSocket(this.url);
        }
    },
    addHandler : function(handler){
        this.handler = handler;
    }
}).create();