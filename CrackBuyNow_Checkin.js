 var _Taobao_is_ie = true;
var _Taobao_layer;
var _ErrorNum;
var _intervalProcess;
var _isStated = false;
var _isError = false;
var _xmlhttp;
var _itemInfo;
var _skus = new Array();
var _Mobile = ['15852533530', '15861560851', '13952486169', '13921276890', '13861822380', '13115090060', '13812066705', '13771512659', '15995231386', '13951502886', '13921158152', '15251639389', '13921150279', '13057235888', '15951518440', '18951509190', '15961799765', '13861716234', '13921173573', '15951581853', '18626051561', '13813695469', '15061508667', '13616197589', '15061796673', '18961880751', '13961703677', '13585079941', '13961750827', '13706197204', '13814275374', '13952478883', '18601570984', '18626371347', '15301518335', '13182790062', '13057287250', '13961883595', '13815104120', '15190324231'];
var _index = 0;

function _TaobaoInit() {
	var agt = navigator.userAgent.toLowerCase();
	_Taobao_is_ie = (agt.indexOf("msie") != -1 && document.all);
	var h = '';
	h += '<div id="_CrackJLPT2010_12">V2.2.9';
	h += '<div>';
	h += ' <form id="_book" onsubmit="return false;">';
	h += '    时间间隔（ms）：<input id="_txtInt" type="text" size="5" value="1000">';
	h += '    <br />';
	h += '    手机号：<input id="_txtMobile" type="text" size="13" value="">';
	h += '    <br />';
	h += '    中奖信息：<input id="_txtJiang" type="text" size="13" value="">';
	h += '    <br />';
	h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="submit" value="开始查询">';
	h += '    <input id="_btnStop" onclick="_StopAutoBook();" type="button" value="停止">';
	h += '    <input id="_btnJiang" onclick="_Jiang();" type="button" value="中奖">';
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
	if (str) {
		document.getElementById("_errorMsg").innerHTML += str;
	} else {
		document.getElementById("_errorMsg").innerHTML = '';
	}
}

function _ShowMsg(str) {
	document.getElementById("_msg").innerHTML = str;
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

function _BookCheck() {
	var mobile = _Mobile[_index];
	mobile = (mobile + '00000000000').substr(0, 11);
	document.getElementById("_txtMobile").value = mobile;
	Ajax.call('checkin.php?mod=show', 'act=checkin&ch_id=79&mobile=' + mobile, function(result) {
		if (result == '-5' || result == '-6') {
			//今天已签到过
			_ShowMsg(mobile + '：已经签过到了');
		} else {
			var type = document.getElementById('type').value;
			var module = document.getElementById('module').value;
			var vip = document.getElementById('vip').value;
			var month = document.getElementById('month').value;
			var year = document.getElementById('year').value;
			var kvip = '';
			var message_module = '';
			if (month == '1' && year == '2013') {
				message_type = '累计';
			} else if (vip == '1') {
				kvip = 'vip_';
				if (type == '1') {
					message_type = '连续';
				} else {
					message_type = '累计';
				}
			} else {
				if (type == '2') {
					message_type = '累计';
				} else {
					message_type = '连续';
				}
			}
			if (module == '1') {
				var message_module1 = '十天';
				var message_module2 = '二十天';
				var message_module3 = '三十天';
			} else if (module == '2') {
				var message_module1 = '十五天';
				var message_module2 = '三十天';
			} else {
				var message_module1 = '三十天';
			}

			if (result == '4') {
				var goods = document.getElementById('full_goods').value;
				_ShowMsg("太棒了！您本月全部都签到了，恭喜您获得" + goods + "。");
			} else {
				if (result == '1') {
					var goods = document.getElementById(kvip + 'goods1').value;
					var message_module = message_module1;
					Ajax.call('checkin.php?mod=show', 'act=send_message&ch_id=79&mobile=' + mobile, function(result) {
						if (result == 1) {
							_ShowMsg(mobile + ":发送短信成功");
						} else {
							_ShowMsg(mobile + ":发送短信失败");
						}
					}, 'POST', 'TEXT');
				} else if (result == '2') {
					var goods = document.getElementById(kvip + 'goods2').value;
					var message_module = message_module2;
					Ajax.call('checkin.php?mod=show', 'act=send_message&ch_id=79&mobile=' + mobile, function(result) {
						if (result == 1) {
							_ShowMsg(mobile + ":发送短信成功");
						} else {
							_ShowMsg(mobile + ":发送短信失败");
						}
					}, 'POST', 'TEXT');
				} else if (result == '3') {
					var goods = document.getElementById(kvip + 'goods3').value;
					var message_module = message_module3;
					Ajax.call('checkin.php?mod=show', 'act=send_message&ch_id=79&mobile=' + mobile, function(result) {
						if (result == 1) {
							_ShowMsg(mobile + ":发送短信成功");
						} else {
							_ShowMsg(mobile + ":发送短信失败");
						}
					}, 'POST', 'TEXT');
				} else if (result == '5') {
					_ShowMsg(mobile + ':签到成功');
				} else {
					_ShowError(mobile + ':意外错误');
				}
			}
		}
		_index++;
		if (_index >= _Mobile.length) {
			_StopAutoBook();
			_ShowMsg('签到完成！');
		}
	}, 'POST', 'TEXT');
}


function _StopAutoBook() {
	clearInterval(_intervalProcess);
	_isStated = false;
	_index = 0;
	_ShowError("已停止");
}

function _AutoBook() {
	_ShowError('');
	var intTime = document.getElementById("_txtInt").value;
	_isStated = false;
	clearInterval(_intervalProcess);
	_intervalProcess = setInterval(_BookCheck, intTime);
	_BookCheck();
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

if (!document.getElementById('_Taobao_layer')) {
	_TaobaoInit();
} else {
	document.body.removeChild(document.getElementById('_Taobao_layer'));
	_TaobaoInit();
}

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://crack-taobao.googlecode.com/svn/trunk/CrackBuyNow_Checkin.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://www.muyingtuijian.com/js/CrackBuyNow_Checkin.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://localhost/CrackBuyNow_Checkin.js?t='+Math.random());document.body.appendChild(element);})())

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=choujiang&ra_id=288&mobile=18951509190

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=sendMsm

//'ra_id=288&content=' + encodeURIComponent(arr[2]) + "&commodity_id=" + arr[3] + "&mobile=18951509190"