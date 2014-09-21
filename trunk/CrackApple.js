var _Taobao_is_ie = true;
var _Taobao_layer;
var _ErrorNum;
var _intervalProcess;
var _isStated = false;
var _isError = false;
var _xmlhttp;
var _itemInfo;
var _skus = new Array();
var _ra_id = _GetSearch('ra_id');

function _TaobaoInit()
{
	if(typeof jQuery == "undefined"){
		var jQuery = {};
		var myScript= document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js";
        document.body.appendChild(myScript);
	}
    var agt = navigator.userAgent.toLowerCase();
    _Taobao_is_ie = (agt.indexOf("msie")!=-1 && document.all);
    var h = '';
    h += '<div id="_CrackJLPT2010_12">V1.0.0';
    h += '<div>';
    h += ' <form id="_book" onsubmit="return false;">';
    h += '    时间间隔（ms）：<input id="_txtInt" type="text" size="5" value="21000">';
    h += '    <br />';
    h += '    手机号：<input id="_txtMobile" type="text" size="13" value="">';
    h += '    <br />';
    h += '    中奖信息：<input id="_txtJiang" type="text" size="13" value="">';
    h += '    <br />';
    h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="submit" value="查询">';
    h += '    <input id="_btnStop" onclick="_StopAutoBook();" type="button" value="停止">';
    h += '    <input id="_btnJiang" onclick="_Jiang();" type="button" value="中奖">';
    h += '    <a href="http://www.muyingtuijian.com/plugin/bnh/index.htm?ra_id=' + _ra_id + '" target="_blank">奖品一览</a>';
    h += ' </form>';
    h += '</div>';
    h += '<div id="_msg">';
    h += '</div>';
    h += '<div id="_errorMsg">';
    h += ' ';
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
    _xmlhttp.open("POST", url, true);

    _xmlhttp.onreadystatechange = function ()
    {
        if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200)
        {
        	callback(_xmlhttp.responseText);
        }
    }

    _xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    _xmlhttp.send(para);
    
    document.getElementById("_errorMsg").innerHTML = "正在查询：<br />" + time.toLocaleString();
}

function _BookCheck()
{
	var mobile = document.getElementById("_txtMobile").value;
	var url = "http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=choujiang";
	_getXmlHttp(url, "ra_id=" + _ra_id + "&mobile=" + mobile, _CheckResult);

}

function _CheckResult(str)
{
	var arr = str.split(/[,，]/);
	switch(arr[0]){
		case '2':
			mobile = _MobileHead[parseInt(6 * Math.random())] + parseInt(100000000 * Math.random());
			mobile = (mobile + '00000000000').substr(0, 11);
			document.getElementById("_txtMobile").value = mobile;
			break;
		case '5':
			document.getElementById("_msg").innerHTML += str + '<br />';
			_UpdateToServer(arr);
			break;
		case '7':
			var intTime = parseInt(document.getElementById("_txtInt").value);
			intTime += 1000;
			document.getElementById("_txtInt").value = intTime;
			_StopAutoBook();
			_isStated = false;
    		clearInterval(_intervalProcess);
			_intervalProcess = setInterval(_BookCheck, intTime);
		default:
			document.getElementById("_errorMsg").innerHTML = str;
			break;
	}
}

function _UpdateToServer(arr){
	var strUrl = 'http://www.muyingtuijian.com/plugin/bnh/insert-info.php?callback=?';
	$.getJSON(
		strUrl,
		{
			ra_id: _ra_id,
			item_id: arr[1],
			item_name: arr[2],
			serial_number: arr[3],
			phone_number: arr[4],
			draw_date: (new Date()).toUTCString()
		},
		function(data){
			if(data.status != 'OK'){
				document.getElementById("_errorMsg").innerHTML = data.msg;
			}
		}
	);
}

function _Jiang(){	
	var new_jsondata = document.getElementById('_txtJiang').value.split(',');
	document.getElementById("commodity_name_value").value=new_jsondata[2];
    document.getElementById("commodity_id_value").value=new_jsondata[3];
    document.getElementById("var_phone2").value=new_jsondata[4];
    check_mobile1=new_jsondata[4];

	var turn1 = document.getElementById("turn1").value;
	var turn2 = document.getElementById("turn2").value;
	var turn3 = document.getElementById("turn3").value;

	zhuan(0,1,2,new_jsondata[1],1,turn1,turn2,turn3);
	
}

function _Book(str)
{
	var start;
	var end;
	var html;
	var form;
	var dls;
	_ShowError("请设置购买信息");
//	start = str.indexOf('<div class="key');
//	end = str.indexOf('<ul class="other');
//	html = str.substring(start, end);
//	if(html != "")
//	{
		//要回答问题的秒杀
//		document.getElementById("_autoBook").innerHTML = html;
//		document.getElementById("_btnBuy").style.display = "inline";
//		dls = document.getElementById("_autoBook").getElementsByTagName("dl");
		//start = str.indexOf('<form id="J_FrmBid');
		//end = str.indexOf('detail-other end');
		//form = str.substring(start, end);
		//start = form.indexOf('<input');
		//end = form.indexOf('</form>');
		//form = form.substring(start, end);
		//问题：“问君能有几多愁”诗句的下句是：恰似一江春水向东流
//		var question = '<input type="hidden" name="82cbc720f1cd8e8b3bd5982bf368de58" value="cf7cdf247800a0ba51337b340aa2632d" />';
//		document.getElementById("J_FrmBid").innerHTML += question;
		//如果只有数量则直接提交
//		if(dls.length > 1)
//		{
//			_InitPage(str, document.getElementById("_autoBook"));
//		}
//		else
//		{
//			_Buy();
//		}
//	}
	//不要回答问题的秒杀
//	else
//	{
		//天猫
		if(location.href.indexOf('tmall') > 0)
		{
			start = str.indexOf('<div class="tb-sku');
			end = str.indexOf('<ul class="tb-meta');
		}
		//淘宝
		else
		{
			start = str.indexOf('<div id="J_isku"');
			end = str.indexOf('<div class="tb-trash"');
		}
		html = str.substring(start, end);
		if (html != "")
		{
			document.getElementById("_autoBook").innerHTML = html;
			document.getElementById("_btnBuy").style.display = "inline";
			dls = document.getElementById("_autoBook").getElementsByTagName("dl");
			//如果只有数量则直接提交
			if(dls.length > 1)
			{
				_InitPage(str, document.getElementById("_autoBook"));
			}
			else
			{
				_Buy();
			}
		}
		else
		{
			document.getElementById("_autoBook").innerText = str;
		}
//	}
	//window.location.reload();
}

function _InitPage(str, div)
{
	var start = str.indexOf('"skuMap"');
	var start2 = str.indexOf('\n', start);
	var strSkuMap = str.substring(start, str.indexOf('\n', start2 + 2));
	_itemInfo = eval("\({" + strSkuMap + "}\)");
	var lis = div.getElementsByTagName("li");
	for(var li in lis)
	{
		lis[li].onclick = function()
		{
			_skus.push(this.getAttribute("data-value"));
			this.style.fontWeight = "bold";
		}
	}
}

function _Buy()
{
	var sku = "";
	var skuId;
	if(_skus.length > 0)
	{
		sku = ";" + _skus.join(";") + ";";
		try
		{
			skuId = _itemInfo.skuMap[sku].skuId;
			document.getElementById("J_FrmBid").skuId.value = skuId;
		}
		catch(e)
		{
			_ShowError("请从上到下顺序点击");
			_skus = [];
			return;
		}
	}
	//天猫
	if(location.href.indexOf('tmall') > 0)
	{
		document.getElementById("J_FrmBid").action = 'http://buy.tmall.com/order/confirm_order.htm';
	}
	document.getElementById("J_FrmBid").submit();
}

function _StopAutoBook()
{
    clearInterval(_intervalProcess);
    _isStated = false;
    _ShowError("已停止");
}

function _AutoBook()
{
	var mobile = _MobileHead[parseInt(_MobileHead.length * Math.random())] + parseInt(100000000 * Math.random());
	mobile = (mobile + '00000000000').substr(0, 11);
	document.getElementById("_txtMobile").value = mobile;
	var intTime = document.getElementById("_txtInt").value;
	_isStated = false;
    clearInterval(_intervalProcess);
	_intervalProcess = setInterval(_BookCheck, intTime);
	_BookCheck();
}

function _GetSearch( id ){
	var url = window.location.search;
	var searches = [];
	if(url.indexOf('?') >= 0){ 
		var strs = url.substr(1).split('&'); //去掉?号  
		for(var i = 0; i < strs.length; i++){ 
			searches[ strs[i].split('=')[0] ] = decodeURIComponent( strs[i].split('=')[1] ); 
		}
	}
	return searches[id];
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

if(!document.getElementById('_Taobao_layer'))
{
    _TaobaoInit();
}
else
{
    document.body.removeChild(document.getElementById('_Taobao_layer'));
    _TaobaoInit();
}

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://crack-taobao.googlecode.com/svn/trunk/CrackBuyNow.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://www.muyingtuijian.com/js/CrackBuyNow.js?t='+Math.random());document.body.appendChild(element);})())

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=choujiang&ra_id=288&mobile=18951509190

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=sendMsm

//'ra_id=288&content=' + encodeURIComponent(arr[2]) + "&commodity_id=" + arr[3] + "&mobile=18951509190"