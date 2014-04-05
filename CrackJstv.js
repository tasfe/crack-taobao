var _Taobao_is_ie = true;
var _Taobao_layer;
var _xmlhttp;
var _CountDown = 0;
var _Index = 0;
var _HandleInterval;
var _HandleKeepLive;
var _IsStart = false;
var _id = 1550;

function _TaobaoInit()
{
    var agt = navigator.userAgent.toLowerCase();
    _Taobao_is_ie = (agt.indexOf("msie")!=-1 && document.all);
    var h = '';
    h += '<div id="_ShowTaobao">V1.5.0 江苏卫视节目破解';
    h += '<div>';
    h += ' <form id="_book" onsubmit="return false;">';
    h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="submit" value="开始">';
    h += '    <input id="_btnStopBook" onclick="_Stop();" type="button" value="停止">';
    h += '    <input id="_btnTest" onclick="_CountDown=10;" type="button" value="调试">';
    h += ' </form>';
    h += '</div>';
    h += '<textarea id="_divResult">';
    h += '</textarea>';
    h += '<div id="_errorMsg">';
    h += ' 查询到开始后会自动砸金蛋';
    h += '</div>';
    h += '</div>';
    try
    {
        var el = document.createElement('div');
        el.id='_Taobao_layer';
        el.style.position='absolute';
	    var scrollPos = {
		    x: window.pageXOffset | document.documentElement.scrollLeft | document.body.scrollLeft,
		    y: window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop
	    };
        el.style.left = scrollPos.x + 10 + 'px';
        el.style.top = scrollPos.y + 30 + 'px';
        el.style.zIndex=9000;
        el.style.border = '1px solid #808080';
        el.style.backgroundColor='#F8F0E5';

        document.body.appendChild(el);
        _TaobaoSet(el, h);
        window.onscroll = function()
        {
	        var scrollPos = {
		        x: window.pageXOffset | document.documentElement.scrollLeft | document.body.scrollLeft,
		        y: window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop
	        };
            document.getElementById("_Taobao_layer").style.left = scrollPos.x + 10 + 'px';
            document.getElementById("_Taobao_layer").style.top = scrollPos.y + 30 + 'px';
        };
    }
    catch(x)
    {
        alert("Crack Tabobao can not support this page.\n" + x);
        _Taobao_layer = true;
        return;
    }

	_Taobao_layer = document.getElementById('_Taobao_layer');
}

function _ShowError(str)
{
    document.getElementById("_errorMsg").innerHTML = str;
}

function _createXmlHttp()
{
    var _xmlhttp = false;

    try
    {
        _xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
        try
        {
            _xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E)
        {
            _xmlhttp = false;
        }
    }
    if (!_xmlhttp && typeof XMLHttpRequest != 'undefined')
    {
        _xmlhttp = new XMLHttpRequest();
    }

    return _xmlhttp;
}

function _checkXmlHttp()
{
    if ( typeof(_xmlhttp) == "undefined")
    {
        _xmlhttp = _createXmlHttp();
    }
    if (
        ! _xmlhttp
        || _xmlhttp.readyState == 1
        || _xmlhttp.readyState == 2
        || _xmlhttp.readyState == 3
        )
    {
        return false;
    }
    return true;
}

function _getXmlHttp(url, para, callback)
{
	var time = new Date();
    if (!_checkXmlHttp())
    {
        return;
    }

	if(url.indexOf("#") > 0)
	{
		url = url.substring(0, url.indexOf("#"));
	}
    _xmlhttp.open("GET", url + "&timeStamp=" + time.getTime(), true);

    _xmlhttp.onreadystatechange = function ()
    {
        if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200)
        {
        	callback(_xmlhttp.responseText);
        }
    }

    _xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    _xmlhttp.send(para);
    
    document.getElementById("_autoBook").innerHTML = "正在查询：<br />" + time.toLocaleString();
}

function _TaobaoSet(el, htmlCode)
{
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0)
    {
        el.innerHTML = '<div style="display:none">for IE</div>' + htmlCode;
        el.removeChild(el.firstChild);
    }
    else
    {
        var el_next = el.nextSibling;
        var el_parent = el.parentNode;
        el_parent.removeChild(el);
        el.innerHTML = htmlCode;
        if (el_next)
        {
            el_parent.insertBefore(el, el_next)
        }
        else
        {
            el_parent.appendChild(el);
        }
    }
}

if(!document.getElementsByClassName){
    document.getElementsByClassName = function(className, element){
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == className){ 
                    elements.push(child);
                    break;
                }
            }
        } 
        return elements;
    };
}

function _AutoBook(){
	try{
		_id++;
		if(_id > 2000){
			$('#_errorMsg').text('完成');
			return;
		}
		var url = 'http://g.beva.com/kan-erge/data-itemInfo-i' + _id + '.html';
		$.get(url, {}, function(obj) {
			var name = obj.data.itemName;
			var swf = obj.data.swf;
			if(name){
				var content = $('#_divResult').text();
				content += '<a href="' + swf + '">' + name + '.swf</a>\n';
				$('#_divResult').text(content);
			}
			setTimeout(_AutoBook, 1000);
		}, "json");
	}
	catch(e){
		alert('出错了，调试吧。');
	}
}

function _Stop(){
	_CountDown = 0;
	_Index = 0;
	_IsStart = false;
	clearInterval(_HandleInterval);
	clearTimeout(_HandleKeepLive);
	$('#_divResult').text('已停止');
}

function _KeepLive(){
	if(_IsStart == false){
		$.ajax({
			type: "POST",
			cache: false,
			contentType: "application/json;utf-8",
			url: "Services/Egg.asmx/GetMyEggs",
			data: null,
			dataType: "json",
			success: function(t) {
				var i = JSON.parse(t.d);
				if(i.IsLogin == !1){
					$.jBox.tip("您未登录或登录已超时，正在跳转至登录页面...", "warnning");
					location.href = loginUrl;
				}
				else if(r = i.Data.List.length, r == 0){
					$("#divSelectEgg").text("暂时没有数据，请点击“查看资格”查询未审核的资格。").show();
					$("#aSmash").hide();
				}
				else{
					var curCountDown = i.Data.List[0].CountDown;
					if(curCountDown > 0){
						if(curCountDown < _CountDown){
							_CountDown = curCountDown;
							clearInterval(_HandleInterval);
							_HandleInterval = setInterval(_ShowCountDown, 1000);
						}
					}
					else{
						curCountDown = 0;
						_ShowCountDown();
					}
				}
			}
		});
	}
}

if(!document.getElementById('_Taobao_layer'))
{
    _TaobaoInit();
}
else
{
    document.body.removeChild(document.getElementById('_Taobao_layer'));
    _TaobaoInit();
}

//javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','http://crack-taobao.googlecode.com/svn/trunk/CrackBeva.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','http://www.muyingtuijian.com/js/CrackBeva.js?t='+Math.random());document.body.appendChild(element);})())