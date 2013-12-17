var _Taobao_is_ie = true;
var _Taobao_layer;
var _xmlhttp;
var _strTemplate = '';
var _strTemplatePromo = '';

function _TaobaoInit()
{
    var agt = navigator.userAgent.toLowerCase();
    _Taobao_is_ie = (agt.indexOf("msie")!=-1 && document.all);
    var h = '';
    h += '<div id="_ShowTaobao">V1.0.9';
    h += '<div>';
    h += ' <form id="_book" onsubmit="return false;">';
    h += '    推广链接：<br><input id="_txtLink" type="text" size="50" value="">';
    h += '    <br />';
    h += '    <input id="_btnAutoBook" onclick="_Gen();" type="submit" value="生成代码">';
    h += ' </form>';
    h += '</div>';
    h += '<div>';
    h += '	<textarea id="_txtResult" rows="10" cols="50">';
    h += '	</textarea>';
    h += '</div>';
    h += '<div id="_divResult">';
    h += '</div>';
    h += '<div id="_errorMsg">';
    h += ' 查询到开始秒杀后会自动显示购买信息';
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
        el.style.left = scrollPos.x + 50 + 'px';
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
            document.getElementById("_Taobao_layer").style.left = scrollPos.x + 50 + 'px';
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

function _Gen(){
	var strImg = '';			//图片
	var strTitle = '';			//标题
	var strPrice = '';			//价格
	var strPromoPrice = '';		//促销价
	var strDealCount = '';		//销量
	var strReviewsCount = '';	//评价数
	var strLink = document.getElementById('_txtLink').value;
	var strResult = _strTemplate;

	try{
	strImg = document.getElementById('J_ImgBooth').attributes['src'].nodeValue;
	strImg = strImg.split('.jpg')[0] + '.jpg_210x210.jpg';

	strTitle = document.getElementsByClassName('tb-detail-hd')[0].getElementsByTagName('h3')[0].innerText;

	strPrice = document.getElementById('J_StrPrice').innerText.replace(/[¥￥]/g, '');

	if(document.getElementById('J_PromoPrice').getElementsByTagName('div')[0].getElementsByTagName('strong')[0]){
		strPromoPrice = document.getElementById('J_PromoPrice').getElementsByTagName('div')[0].getElementsByTagName('strong')[0].innerText.replace(/[¥￥]/g, '');
	}

	strDealCount = document.getElementsByClassName('J_TDealCount')[0].innerText;

	strReviewsCount = document.getElementsByClassName('J_ReviewsCount')[0].innerText;

	if(strPromoPrice){
		strResult = _strTemplatePromo;
	}

	strResult = strResult.replace(/%IMG%/g, strImg);
	strResult = strResult.replace(/%TITLE%/g, strTitle);
	strResult = strResult.replace(/%PRICE%/g, strPrice);
	strResult = strResult.replace(/%PROMOPRICE%/g, strPromoPrice);
	strResult = strResult.replace(/%DEALCOUNT%/g, strDealCount);
	strResult = strResult.replace(/%REVIEWSCOUNT%/g, strReviewsCount);
	strResult = strResult.replace(/%LINK%/g, strLink);

	document.getElementById('_divResult').innerHTML = strResult;
	document.getElementById('_txtResult').innerText = strResult;
	}
	catch(e){
		alert('出错了，调试吧。');
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

_strTemplate += '<div style="margin: 20px auto;width: 222px;border: 1px solid black;">';
_strTemplate += '	<div style="position: relative;padding: 5px;border: 1px solid #e5e5e5;margin: 0;">';
_strTemplate += '		<p style="margin: 0;padding: 0;position: relative;padding-bottom: 100%;height: 0;overflow: hidden;">';
_strTemplate += '			<a style="display: table-cell;vertical-align: middle;text-align: center;padding: 0;margin: 0;border: 0 none;width: 210px;height: 210px;line-height: 210px;" href="%LINK%" target="_blank">';
_strTemplate += '			<span><img src="%IMG%"></span>';
_strTemplate += '			</a>';
_strTemplate += '		</p>';
_strTemplate += '	</div>';
_strTemplate += '	<h3 style="margin: 0;padding: 0;margin-top: 5px;height: 36px;font-size: 0;font-weight: normal;text-overflow: ellipsis;overflow: hidden;">';
_strTemplate += '		<a style="word-break: break-all;font: 12px/1.5 tahoma,arial,宋体;" href="%LINK%" target="_blank" title="%TITLE%">%TITLE%</a>';
_strTemplate += '	</h3>';
_strTemplate += '	<div style="height: 22px;overflow: hidden;margin-top: 5px;display: table;clear: both;">';
_strTemplate += '		<div style="margin: 0;padding: 0;font: 12px/1.5 tahoma,arial,宋体;">价格：<span style="color: #ff2900;font: bold 16px Arial;">￥%PRICE%</span></div>';
_strTemplate += '	</div>';
_strTemplate += '	<div style="height: 22px;overflow: hidden;clear: both;">';
_strTemplate += '		<div style="float: left;min-height: 1px;position: relative;font: 12px/1.5 tahoma,arial,宋体;">最近%DEALCOUNT%人成交</div>';
_strTemplate += '		<div style="float: right;font: 12px/1.5 tahoma,arial,宋体;"><a href="%LINK%" target="_blank">%REVIEWSCOUNT%条评论</a></div>';
_strTemplate += '	</div>';
_strTemplate += '</div>';

_strTemplatePromo += '<div style="margin: 20px auto;width: 222px;border: 1px solid black;">';
_strTemplatePromo += '	<div style="position: relative;padding: 5px;border: 1px solid #e5e5e5;margin: 0;">';
_strTemplatePromo += '		<p style="margin: 0;padding: 0;position: relative;padding-bottom: 100%;height: 0;overflow: hidden;">';
_strTemplatePromo += '			<a style="display: table-cell;vertical-align: middle;text-align: center;padding: 0;margin: 0;border: 0 none;width: 210px;height: 210px;line-height: 210px;" href="%LINK%" target="_blank">';
_strTemplatePromo += '			<span><img src="%IMG%"></span>';
_strTemplatePromo += '			</a>';
_strTemplatePromo += '		</p>';
_strTemplatePromo += '	</div>';
_strTemplatePromo += '	<h3 style="margin: 0;padding: 0;margin-top: 5px;height: 36px;font-size: 0;font-weight: normal;text-overflow: ellipsis;overflow: hidden;">';
_strTemplatePromo += '		<a style="word-break: break-all;font: 12px/1.5 tahoma,arial,宋体;" href="%LINK%" target="_blank" title="%TITLE%">%TITLE%</a>';
_strTemplatePromo += '	</h3>';
_strTemplatePromo += '	<div style="height: 22px;overflow: hidden;margin-top: 5px;display: table;clear: both;">';
_strTemplatePromo += '		<div style="margin: 0;padding: 0;font: 12px/1.5 tahoma,arial,宋体;">价格：<span style="color: #ff2900;font: bold 16px Arial;text-decoration: line-through;';
_strTemplatePromo += 'color: #404040;">￥%PRICE%</span></div>';
_strTemplatePromo += '		<div style="margin: 0;padding: 0;font: 12px/1.5 tahoma,arial,宋体;">促销价：<span style="color: #ff2900;font: bold 16px Arial;">￥%PROMOPRICE%</span></div>';
_strTemplatePromo += '	</div>';
_strTemplatePromo += '	<div style="height: 22px;overflow: hidden;clear: both;">';
_strTemplatePromo += '		<div style="float: left;min-height: 1px;position: relative;font: 12px/1.5 tahoma,arial,宋体;">最近%DEALCOUNT%人成交</div>';
_strTemplatePromo += '		<div style="float: right;font: 12px/1.5 tahoma,arial,宋体;"><a href="%LINK%" target="_blank">%REVIEWSCOUNT%条评论</a></div>';
_strTemplatePromo += '	</div>';
_strTemplatePromo += '</div>';

//javascript:void((function(){var%20element=document.createElement('script');element.setAttribute('src','http://crack-taobao.googlecode.com/svn/trunk/ShowTaobao.js?t=' + Math.random());document.body.appendChild(element);})())

