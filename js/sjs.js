/**
* SunnyJs a samll js library
* @lisence MIT
* @author gaoyang  <yunnysunny@gmail.com>
* @date 2012.3.18
*/
(function() {
	var packageName = 'SJS';
	if (!window[packageName])
	{
		window[packageName] = {};
	}
	function isCompatible(other) {
		if (other == false
			|| !Array.property.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	window[packageName]['isCompatible'] = isCompatible;

	function $() {
		var elements  = new Array();

		for (var i=0; i<arguments.length; i++)
		{
			var element = arguments[i];

			if (typeof element == 'string')
			{
				element = document.getElementById(element);
			}
			if (arguments.length == 1)
			{
				return element;
			}

			elements.push(element);
		}
		return elements;
	}

	window[packageName]['$'] = $;

	function addEvent(node, type, listener) {//
		if (!isCompatible())
		{
			return false;
		}
		if (!(node = $(node)))
		{
			return false;
		}
		if (node.addEventListener)
		{
			node.addEventListener(type, listener, false);
			return true;
		}
		else if (node.attachEvent)
		{
			node['e'+type+listener] = listener;
			node[type+listener] = function() {
				node['e'+type+listener](window.event);
			}
			node.attachEvent('on' + type, node[type+listener]);
			return true;
		}
		return false;
	}
	window[packageName]['addEvent'] = addEvent;

	function removeEvent(node, type, listener) {//
		if (!(node = $(node)))
		{
			return false;
		}
		if (node.removeEventListener)//w3c的方法
		{
			node.removeEventListener(type, listener, false);
			return true;
		}
		else if (node.detachEvent)
		{
			node.detachEvent('on' + type, node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		return false;
	}
	window[packageName]['removeEvent'] = removeEvent;

	function addLoadEvent(func) {
		var oldonload= window.onload;
		if(typeof window.onload!='function') {
			window.onload=func;
		} else {
			window.onload=function() {
				oldonload();
				func();
			}
		}
	}
	window[packageName]['addLoadEvent'] = addLoadEvent;

	function hasClassName(classNameNow,searchName) {
		return new RegExp("( ?|^)" + searchName + "\\b").test(classNameNow);
	}
	window[packageName]['hasClassName'] = hasClassName;

	function addClass(element,value){
		//alert(element);
		if (!element.className) {
			element.className=value;
		} else {
			newClassName=element.className;
			newClassName+=" ";
			newClassName+=value;
			element.className=newClassName;
		}
		return element;
	}
	window[packageName]['addClass'] = addClass;

	function removeClass(element,searchName) {			
		var classNameNow = element.className;
		element.className = classNameNow.replace(new RegExp("( ?|^)" + searchName + "\\b"), "");
		return element;
	}
	window[packageName]['removeClass'] = removeClass;

	function show(obj,type) {
		if (type)
		{
			obj.style.display = type;
		}
		else 
		{
			obj.style.display = 'block';
		}
		return obj;
	}
	window[packageName]['show'] = show;

	function hide(obj) {
		obj.style.display = 'none';
		return obj;
	}
	window[packageName]['hide'] = hide;

	Array.prototype.each = function(callback) {
		var len = this.length;
		for (var i=0;i<len;i++)
		{
			this[i].i = i;
			callback.apply(this[i],arguments);
		}			
	}

	/**
	* @param 父级节点
	* @param 需要筛选的子级节点的标签名,多个标签之间可以使用逗号隔开
	* @param 需要筛选的子级节点的className,可以为null，如果为null则直接返回所用查找到的标签
	*/
	function getElementsByClassName(parentNode,subNodeName,className) {
		var elements = new Array();
		
		if (subNodeName.indexOf(',') == -1)
		{
			var children = parentNode.getElementsByTagName(subNodeName);
			var len = children.length;
		
			if (len > 0)
			{
				for (var i=0;i<len;i++)
				{
					var child = children[i];
					
					if (hasClassName(child.className,className))
					{
						elements.push(child);
					}
					else if (className == null)
					{
						elements.push(child);
					}
				}
			}
		}
		else
		{
			var tags = subNodeName.split(',');
			for (var i=0,tagLen=tags.length;i<tagLen;i++)
			{
				var elementNodes = parentNode.getElementsByTagName(tags[i]);
				for (var j=0,eleLen=elementNodes.length;j<eleLen;j++)
				{
					var child = elementNodes[j];
					if (hasClassName(child.className,className))
					{
						elements.push(child);
					}
					else if (className == null)
					{
						elements.push(child);
					}
				}

			}
		}
		
		return elements;
	}
	window[packageName]['getElementsByClassName'] = getElementsByClassName;

	function using(functionName) {
		return window[packageName][functionName];
	}
	window[packageName]['using'] = using;

	function usingAll(functionStr,scope) {
		var scopeNow = scope || window;
		var functionList = functionStr.split(',');
		for (var i=0,len=functionList.length;i<len ;i++ )
		{
			var functionNow = functionList[i]
			if (functionNow)
			{
				scopeNow[functionNow] = window[packageName][functionNow];
			}			
		}
	}
	window[packageName]['usingAll'] = usingAll;
	
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
	function randStr(num) {
		var len = chars.length;
		var str = '';
		for (var i=0;i<num;i++) {
			var index = Math.floor(Math.random()*len);
			str += chars[index];
		}
		return 'SJS_' + new Date().getTime() + '_' + str;
	}

	function sendRequest(method,url,content,callback,type,process,error){
		
		if (type == 'jsonp') {
			var jsonpFunName = randStr(8);
			window[packageName][jsonpFunName] = callback;
			var jsonpParam = 'callback=' + packageName + '.' + jsonpFunName;
			if (content) {
				content += '&' + jsonpParam;
			} else {
				content = jsonpParam;
			}
			url += '?' + content;
			var head = document.getElementsByTagName("head")[0]; 
			var js = document.createElement("script"); 
			js.src = url; 
			js.onload = js.onreadystatechange = function(){ 
				if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") { 
					head.removeChild(js); 
				}
			}; 
			head.appendChild(js);
			return;
		}
		http_request=false;
		if(window.XMLHttpRequest){
			http_request=new XMLHttpRequest();
			if(http_request.overrideMimeType) {
			   http_request.overrideMimeType("text/xml");
			}
		}
		else if(window.ActiveXObject){
			try{
				http_request=new ActiveXObject(Msxml2.XMLHTTP);
			}catch(e){
				try {
					http_request=new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){}
			}
		}
		if (!http_request){
			if (debugFlag) {
				window.alert("can't create XMLHttpRequest instance");
			}
			return false;
		}
		

		http_request.onreadystatechange=function() {
			if (http_request.readyState == 4) {

				if (http_request.status == 200 || http_request.status == 304) {
					var resp = http_request.responseText;
					if (type) {
						if (type == 'json') {
							callback(typeof(resp) == 'object' ? resp : eval('(' + resp + ')'));
						} else if (type == 'jsonp') {
						} else {
							callback(resp);
						}
						
					} else {
						callback(resp);
					}					
				} else {
					if (error)
					{
						error();
					}
				}
			} else {
				if (process) {
					process();
				}
			}
		};

		if(method=="get"){
			http_request.open(method,url,true);
		} else if(method=="post"){
			http_request.open(method,url,true);
			http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		} else{
			if (debugFlag) {
				windows.alert("invalid type of http request!");
			}
			return false;
		}
		
		http_request.send(content);
	}
	window[packageName]['sendRequest'] = sendRequest;

	var log = {};
	log.info = function(msg) {
		if (typeof console != 'undefined' && console.info)
		{
			console.info(msg);
		}
	}
	log.warn = function(msg) {
		if (typeof console != 'undefined' && console.warn)
		{
			console.warn(msg);
		}
	}
	log.error = function(msg) {
		if (typeof console != 'undefined' && console.error)
		{
			console.error(msg);
		}
	}
	window[packageName]['log'] = log;

	function moveElement(elementID,final_x,final_y,interval,init_x,init_y){
		var moveSpace = 20;
		var elem=$(elementID);
		if(elem.movement){
			clearTimeout(elem.movement);
		}
		if(!elem.style.left) elem.style.left="0px";
		if(!elem.style.top) elem.style.top="0px";
		var xpos=parseInt(elem.style.left);
		var ypos=parseInt(elem.style.top);
		if(xpos==final_x && ypos==final_y){
			return true;
			//alert(final_x);
		}
		var dist = moveSpace;
		if(xpos<final_x){
			if ((final_x-xpos) < moveSpace) {
				dist = final_x-xpos;
			} else {
				//dist=Math.ceil((final_x-xpos)/moveSpace);
			}			
			xpos=xpos+dist;
		}
		if(xpos>final_x){
			if ((xpos-final_x) < moveSpace) {
				dist = xpos-final_x;
			} else {
				//dist=Math.ceil((xpos-final_x)/moveSpace);
			}			
			xpos=xpos-dist;
		}
		if(ypos<final_y){
			if ((final_y-ypos) < moveSpace) {
				dist = final_y-ypos;
			} else {
				//dist=Math.ceil((final_y-ypos)/moveSpace);
			}			
			ypos+dist;
		}
		if(ypos>final_y){
			if ((ypos-final_y) < moveSpace) {
				dist = ypos-final_y;
			} else {
				//dist=Math.ceil((ypos-final_y)/moveSpace);
			}			
			ypos=ypos-dist;
		}
		if (typeof(init_x) == 'number')
		{
			xpos = init_x;
		}
		if (typeof(init_y) == 'number')
		{
			ypos = init_y;
		}
		elem.style.left=xpos+"px";
		elem.style.top=ypos+"px";
		var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
		elem.movement=setTimeout(repeat,interval);
	}
	window[packageName]['moveElement'] = moveElement;

	function siblings(o){//参数o就是想取谁的兄弟节点，就把那个元素传进去
        var a=[];//定义一个数组，用来存o的兄弟元素
        var p=o.previousSibling;
        while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行  p表示previousSibling
                if(p.nodeType===1){
                        a.push(p);
                }
                p=p.previousSibling//最后把上一个节点赋给p               
        }
        a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了
 
	   var n=o.nextSibling;//再取o的弟弟
		while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思
				if(n.nodeType===1){
						a.push(n);
				}
				n=n.nextSibling;
		}
	   return a//最后按从老大到老小的顺序，把这一组元素返回		   
	}
	window[packageName]['siblings'] = siblings;

	function setCookie(name,value,expires,path,domain,secure)
	{
		var expDays = expires*24*60*60*1000;
		var expDate = new Date();
		expDate.setTime(expDate.getTime()+expDays);
		var expString = ((expires==null) ? "": (";expires="+expDate.toGMTString()));
		var pathString = ((path==null) ? "": (";path="+path));
		var domainString = ((domain==null) ? "": (";domain="+domain));
		var secureString = ((secure==true) ? ";secure": "");
		document.cookie = name + "="+ escape(value) + expString + pathString + domainString + secureString;
	}
	window[packageName]['setCookie'] = setCookie;

	function getCookie(name)
	{
		var result = null;
		var myCookie = document.cookie + ";";
		var searchName = name + "=";
		var startOfCookie = myCookie.indexOf(searchName);
		var endOfCookie;
		if (startOfCookie != -1)
		{
			startOfCookie += searchName.length;
			endOfCookie = myCookie.indexOf(";",startOfCookie);
			result = unescape(myCookie.substring(startOfCookie,endOfCookie));
		}
		return result;
	}
	window[packageName]['getCookie'] = getCookie;

	function clearCookie(name)
	{
		var ThreeDays=3*24*60*60*1000;
		var expDate = new Date();
		expDate.setTime(expDate.getTime()-ThreeDays);
		document.cookie=name+"=;expires="+expDate.toGMTString();
	} 
	window[packageName]['clearCookie'] = clearCookie;
})();
