var _Taobao_is_ie = true;
var _Taobao_layer;
var _ErrorNum;
var _TimerStart;
var _TimerBuy;
var _TimerNow;
var _isStarted = false;
var _isChecked = false;
var _isNow = false;
var _xmlhttp;
var _timeDiff;
var _Type = ['miphone', 'mitv', 'mibox', 'mipower'];

function _TaobaoInit() {
	var agt = navigator.userAgent.toLowerCase();
	_Taobao_is_ie = (agt.indexOf("msie") != -1 && document.all);
	var h = '';
	h += '<div id="_CrackJLPT2010_12">V1.6.2';
	h += '<div>';
	h += ' <form id="_book" onsubmit="return false;">';
	h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="submit" value="显示按钮">';
	//	h += '    <input id="_btnStop" onclick="_StopAutoBook();" type="button" value="停止">';
	h += ' </form>';
	h += '</div>';
	h += '<div id="_msg">';
	h += '</div>';
	h += '<div id="_errorMsg">';
	h += ' ';
	h += '</div>';
	h += '</div>';
	try {
		var el = document.createElement('div');
		el.id = '_Taobao_layer';
		el.style.position = 'absolute';
		var scrollPos = {
			x: window.pageXOffset | document.documentElement.scrollLeft | document.body.scrollLeft,
			y: window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop
		};
		el.style.left = scrollPos.x + 10 + 'px';
		el.style.top = scrollPos.y + 30 + 'px';
		el.style.zIndex = 9000;
		el.style.border = '1px solid #808080';
		el.style.backgroundColor = '#F8F0E5';

		document.body.appendChild(el);
		_TaobaoSet(el, h);
		window.onscroll = function() {
			var scrollPos = {
				x: window.pageXOffset | document.documentElement.scrollLeft | document.body.scrollLeft,
				y: window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop
			};
			document.getElementById("_Taobao_layer").style.left = scrollPos.x + 10 + 'px';
			document.getElementById("_Taobao_layer").style.top = scrollPos.y + 30 + 'px';
		};
	} catch (x) {
		alert("Crack Tabobao can not support this page.\n" + x);
		_Taobao_layer = true;
		return;
	}

	_Taobao_layer = document.getElementById('_Taobao_layer');
}

function _ShowError(str) {
	document.getElementById("_errorMsg").innerHTML = str;
}

function _createXmlHttp() {
	var _xmlhttp = false;

	try {
		_xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			_xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			_xmlhttp = false;
		}
	}
	if (!_xmlhttp && typeof XMLHttpRequest != 'undefined') {
		_xmlhttp = new XMLHttpRequest();
	}

	return _xmlhttp;
}

function _checkXmlHttp() {
	if (typeof(_xmlhttp) == "undefined") {
		_xmlhttp = _createXmlHttp();
	}
	if (!_xmlhttp || _xmlhttp.readyState == 1 || _xmlhttp.readyState == 2 || _xmlhttp.readyState == 3) {
		return false;
	}
	return true;
}

function _getXmlHttp(url, para, callback) {
	var time = new Date();
	if (!_checkXmlHttp()) {
		return;
	}

	if (url.indexOf("#") > 0) {
		url = url.substring(0, url.indexOf("#"));
	}
	_xmlhttp.open("POST", url, true);

	_xmlhttp.onreadystatechange = function() {
		if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
			callback(_xmlhttp.responseText);
		}
	}

	_xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	_xmlhttp.send(para);

	document.getElementById("_errorMsg").innerHTML = "正在查询：<br />" + time.toLocaleString();
}

//预定
function _AutoBook() {
	var e = [];
	for (var t in qg.config.goods) {
		e.push('<a class="qgbtn" id="' + t + '" name="' + t + '" href="javascript:;">抢购' + qg.config.goods[t].name + "</a>");
	}
	handle.dom.btn1.html(e[0]);
	handle.dom.btn2.html(e[1]);
	handle.dom.btn3.html(e[2]);
	handle.dom.btn4.html(e[3]);
	handle.hdinfo.reg.bind();
}

function _Now() {
	var time = new Date();
	document.getElementById("_msg").innerHTML = time.toLocaleTimeString();
}

//停止
function _StopAutoBook() {
	clearTimeout(_TimerStart);
	clearInterval(_TimerBuy);
	clearInterval(_TimerNow);
	_isStarted = false;
	_isNow = false;
	_ShowError("已停止");
}

function _TaobaoSet(el, htmlCode) {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) {
		el.innerHTML = '<div style="display:none">for IE</div>' + htmlCode;
		el.removeChild(el.firstChild);
	} else {
		var el_next = el.nextSibling;
		var el_parent = el.parentNode;
		el_parent.removeChild(el);
		el.innerHTML = htmlCode;
		if (el_next) {
			el_parent.insertBefore(el, el_next)
		} else {
			el_parent.appendChild(el);
		}
	}
}

//显示所有链接
function _ShowLinks(obj) {
	for (var i = 0; i < _Type.length; i++) {
		var t = _Type[i];
		if (obj.status[t].hdurl !== "") {
			var link = "http://t.hd.xiaomi.com/login.php?followup=" + encodeURIComponent("http://t.hd.xiaomi.com/s/" + obj.status[t].hdurl + "&_m=1");
			var content = '<a href="' + link + '" target="_blank">' + t + '</a><br />';
			document.getElementById("_msg").innerHTML += content;
		}
	}
}

//覆盖绑定事件
handle.hdinfo.reg.bind = function(e) {
	for (var i = 0; i < _Type.length; i++) {
		var type = _Type[i];
		$("#" + type).off("click").on("click", function() {
			qg.statu.user.clearBuy();
			if ( !! qg.req) {
				var e = $(this).attr("name");
				qg.statu.user.buy[e] = !0;
				qg.getDate();
			}
			return !1;
		});
	}

}

//覆盖重试间隔
qg.ajax.hdget.connect = function(time) {
	setTimeout(function() {
		qg.getDate()
	}, 500);
}

//覆盖查询
qg.getDate = function() {
	var e = this;
	$.ajax({
		url: e.config.ajax.hdget.url,
		dataType: "jsonp",
		jsonpCallback: "hdcontrol",
		timeout: e.config.ajax.hdget.timeout,
		beforeSend: function() {
			e.ajax.hdget.load();
			e.req = !1
		},
		error: function(t) {
			if (e.ajax.notFound(t, !1)) return;
			e.ajax.hdget.connect();
		},
		success: function(t) {
			e.req = !0;
			e.ajax.hdget.success(t);
			//显示所有链接
			_ShowLinks(t);
		},
		complete: function() {}
	})
}


//覆盖成功显示
handle.ajax.hdget.success = function(hdurl) {
	handle.dom.mask.hide();
	handle.dom.pop.hide();
	var e = "http://t.hd.xiaomi.com/login.php?followup=" + encodeURIComponent("http://t.hd.xiaomi.com/s/" + hdurl + "&_m=1");
	window.open(e);
}

//覆盖超时时间（5s）
qg.config.ajax.hdinfo.timeout = 5000;
qg.config.ajax.hdget.timeout = 5000;

if (!document.getElementById('_Taobao_layer')) {
	_TaobaoInit();
} else {
	document.body.removeChild(document.getElementById('_Taobao_layer'));
	_TaobaoInit();
}

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://crack-taobao.googlecode.com/svn/trunk/CrackXiaomi.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://www.muyingtuijian.com/js/CrackXiaomi.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://localhost/js/CrackXiaomi.js?t='+Math.random());document.body.appendChild(element);})())