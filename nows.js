var MAKE_SELFINVOKE = function(fBodyString, argString) { return "(" + fBodyString + ")(" + argString + ")"; }; 
var WRAP_HTML = function(content) { return "<html><body><script>" + content + "</script></body></html>"; };
var WEBSOCKET_WRAPPER_CONTENT = function(url, protocols) {
	var ws = new WebSocket(url, protocols);
	
	function cloneEvent(e) { return { data: e.data }; }
	
	["onopen", "onclose", "onerror", "onmessage"]
	.forEach(function(methodName){
		ws[methodName] = function (event) { callMethod(methodName, cloneEvent( event )) }
	})
	
	window.addEventListener("message", function(event){
		//console.log("FRAME:MESSAGE", event);
		var data = JSON.parse( event.data );
		if (data.type == "call") {
			if (data.method && ws[data.method])
				ws[data.method](data.data);
		}
	})
	
	function callMethod(method, data) {
		syncProps(); 
		sendBack({type: "call", method, data});
	}
	
	function sendBack(/*any*/data) {
		//console.log("FRAME:SEND", data);
		window.parent.postMessage(JSON.stringify( data ), '*');
	}
	

	var propKeys = ["readyState"];
	var propValueDict = {};
	function syncProps() {
		var needSync = false;
		for (var i = 0; i < propKeys.length; i++) {
			var propKey = propKeys[i];
			var currValue = ws[propKey];
			if (currValue !== propValueDict[propKey]) {
				needSync = true;
				propValueDict[propKey] = currValue;
			}
		}
		if (needSync) {
			sendBack({type: "propSync", data: propValueDict});
		}
	}
}

function createWebSocketFrame(/*...*/) {
	var argsString = Array.prototype.map.call(arguments, function(x) { return JSON.stringify( x )})
		.filter(function(x){ return typeof x != "undefined" }).toString();
	// console.log(WRAP_HTML(MAKE_SELFINVOKE(WEBSOCKET_WRAPPER_CONTENT.toString(), argsString)));
	var uri = 'data:text/html;base64, ' + btoa(WRAP_HTML(MAKE_SELFINVOKE(WEBSOCKET_WRAPPER_CONTENT.toString(), argsString)));
	var ifr = document.createElement('iframe');
	ifr.src = uri;
	ifr.style.display='none';
	document.body.appendChild(ifr);
	return ifr;
}

function NotImplementedException() { return new Error("NotImplementedException"); }

function NullOriginWebSocket(url, protocols) {
	// local WS proxy object
	var WS = { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 };

	// remote WS Frame
	var wsFrame = createWebSocketFrame(url, protocols);

	// remote message handler
	window.addEventListener("message", function(event){
		// messages only from target frame
		if (event.source != wsFrame.contentWindow) return;
		//console.log("MAIN:MESSAGE", event);
		var data = JSON.parse( event.data );
		if (data.type == "call") {
			if (WS[data.method] && typeof WS[data.method] == "function"){
				WS[data.method](data.data);
			}
		} else if (data.type == "propSync") {
			Object.keys(data.data).forEach(function(key) { WS[key] = data.data[key]; });
		}
	})
	
	function doProxy(/*any*/ data) {
		//console.log("MAIN:SEND", data);
		wsFrame.contentWindow.postMessage(JSON.stringify( data ), '*');
	}
	
	// WS proxy addEventListener method
	WS.addEventListener = function() {
		throw new NotImplementedException;
	}
	
	// WS proxy addEventListener method
	WS.addEventListener = function() {
		throw new NotImplementedException;
	}
	
	// WS proxy close method
	WS.close = function() {
		doProxy({type: "call", method: "close"})
	}
	
	// WS proxy send method
	WS.send = function(/*string*/ data) {
		doProxy({type: "call", method: "send", data})
	}
	
	return WS;
}