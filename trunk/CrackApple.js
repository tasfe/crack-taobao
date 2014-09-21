var _Taobao_is_ie = true;
var _Taobao_layer;
var _ErrorNum;
var _intervalProcess;
var _isStated = false;
var _isError = false;
var _xmlhttp;
var _itemInfo;
var _TimeSlot;
var _Define = [{model:'MG482J/A',	color:'シルバー',	type:'iPhone 6',	name:'iPhone 6 银 16G'},
{model:'MG4H2J/A',	color:'シルバー',	type:'iPhone 6',	name:'iPhone 6 银 64G'},
{model:'MG4C2J/A',	color:'シルバー',	type:'iPhone 6',	name:'iPhone 6 银 128G'},
{model:'MG492J/A',	color:'ゴールド',	type:'iPhone 6',	name:'iPhone 6 金 16G'},
{model:'MG4J2J/A',	color:'ゴールド',	type:'iPhone 6',	name:'iPhone 6 金 64G'},
{model:'MG4E2J/A',	color:'ゴールド',	type:'iPhone 6',	name:'iPhone 6 金 128G'},
{model:'MG472J/A',	color:'スペースグレイ',	type:'iPhone 6',	name:'iPhone 6 灰 16G'},
{model:'MG4F2J/A',	color:'スペースグレイ',	type:'iPhone 6',	name:'iPhone 6 灰 64G'},
{model:'MG4A2J/A',	color:'スペースグレイ',	type:'iPhone 6',	name:'iPhone 6 灰 128G'},
{model:'MGA92J/A',	color:'シルバー',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 银 16G'},
{model:'MGAJ2J/A',	color:'シルバー',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 银 64G'},
{model:'MGAE2J/A',	color:'シルバー',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 银 128G'},
{model:'MGAA2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 金 16G'},
{model:'MGAK2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 金 64G'},
{model:'MGAF2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 金 128G'},
{model:'MGA82J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 灰 16G'},
{model:'MGAH2J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 灰 64G'},
{model:'MGAC2J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	name:'iPhone 6 Plus 灰 128G'}];
var _skus = new Array();
var _ra_id = _GetSearch('ra_id');

function _TaobaoInit()
{
	if(typeof jQuery == "undefined"){
		var jQuery = {};
		var myScript= document.createElement("script");
        myScript.type = "text/javascript";
        myScript.src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js";
        document.body.appendChild(myScript);
	}
    var agt = navigator.userAgent.toLowerCase();
    _Taobao_is_ie = (agt.indexOf("msie")!=-1 && document.all);
    var h = '';
    h += '<div id="_CrackJLPT2010_12">V1.0.4';
    h += '<div>';
    h += ' <form id="_book" onsubmit="return false;">';
    h += '    选择款式：<select id="_form_model">';
h += '<option value="MG482J/A">iPhone 6 银 16G</option>';
h += '<option value="MG4H2J/A">iPhone 6 银 64G</option>';
h += '<option value="MG4C2J/A">iPhone 6 银 128G</option>';
h += '<option value="MG492J/A">iPhone 6 金 16G</option>';
h += '<option value="MG4J2J/A">iPhone 6 金 64G</option>';
h += '<option value="MG4E2J/A">iPhone 6 金 128G</option>';
h += '<option value="MG472J/A">iPhone 6 灰 16G</option>';
h += '<option value="MG4F2J/A">iPhone 6 灰 64G</option>';
h += '<option value="MG4A2J/A">iPhone 6 灰 128G</option>';
h += '<option value="MGA92J/A">iPhone 6 Plus 银 16G</option>';
h += '<option value="MGAJ2J/A">iPhone 6 Plus 银 64G</option>';
h += '<option value="MGAE2J/A">iPhone 6 Plus 银 128G</option>';
h += '<option value="MGAA2J/A">iPhone 6 Plus 金 16G</option>';
h += '<option value="MGAK2J/A">iPhone 6 Plus 金 64G</option>';
h += '<option value="MGAF2J/A">iPhone 6 Plus 金 128G</option>';
h += '<option value="MGA82J/A">iPhone 6 Plus 灰 16G</option>';
h += '<option value="MGAH2J/A">iPhone 6 Plus 灰 64G</option>';
h += '<option value="MGAC2J/A">iPhone 6 Plus 灰 128G</option>';
	h += '    </select>';
    h += '    选择数量：<select id="_form_number">';
h += '<option value="1">1</option>';
h += '<option value="2">2</option>';
	h += '    </select>';
    h += '    <br />';
    h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="submit" value="查询">';
    h += '    <input id="_btnStop" onclick="_StopAutoBook();" type="button" value="停止">';
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
	var opt = {
		ajaxSource : true,
		_eventId : 'availability',
		storeNumber : 'R005',
		partNumbers : $('#_form_model').val(),
		selectedContractType : 'UNLOCKED',
		p_ie : $('#p_ie').val()
	};

	$.ajax({
		url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		type : 'POST',
		data : opt,
		dataType : 'json',
		success : _CheckResult
	});
	$('#_errorMsg').html('正在查询：<br />' + (new Date()).toLocaleString());
}

function _CheckResult(json)
{
	var model = $('#_form_model').val();
	if(json && json.inventories){
		for(i in json.inventories){
			var obj = json.inventories[i];
			if(obj.partNumber == model && obj.available == true ){
				_Book();
				clearInterval(_intervalProcess);
    			_isStated = false;
    			$('#_errorMsg').html('正在预定：<br />' + (new Date()).toLocaleString());
			}
		}
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
	var opt = {
		_eventId: "next",
		_flowExecutionKey: "e1s3",
		color: _GetColor($('#_form_model').val()),
		email: "tantiancai@gmail.com",
		firstName: "ＸＩＡＯＫＡＮＧ",
		lastName: "ＴＡＮ",
		p_ie: $('#p_ie').val(),
		phoneNumber: "08042213543 ",
		product: _GetType($('#_form_model').val()),
		selectedContractType: "UNLOCKED",
		selectedPartNumber: $('#_form_model').val(),
		selectedQuantity: $('#_form_number').val(),
		selectedStoreNumber: "R005",
		selectedTimeSlotId: _TimeSlot
	};
	$.ajax({
		url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		type : 'POST',
		data : opt,
		dataType : 'text',
		success : function(){location.reload();}
	});
	
}

function _GetColor(model){
	for(var i in _Define){
		var obj = _Define[i];
		if(obj.model == model){
			return obj.color;
		}
	}
}

function _GetType(model){
	for(var i in _Define){
		var obj = _Define[i];
		if(obj.model == model){
			return obj.type;
		}
	}
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
	_Init();
	var intTime = 1000;
	_isStated = false;
    clearInterval(_intervalProcess);
	_intervalProcess = setInterval(_BookCheck, intTime);
	_BookCheck();
}

function _Init(){
	var opt = {
		ajaxSource:true,
		_eventId:'timeslots',
		storeNumber:'R005',
		p_ie:$('#p_ie').val()
	};
	$.ajax({
		url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		type : 'POST',
		data : opt,
		dataType : 'json',
		success : _SetInit
	});
}

function _SetInit(json){
	if(json && json.timeslots){
		var obj = json.timeslots[json.timeslots.length - 1];
		_TimeSlot = obj.timeSlotId;
	}
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

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','https://crack-taobao.googlecode.com/svn/trunk/CrackApple.js?t='+Math.random());document.body.appendChild(element);})())

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','http://www.muyingtuijian.com/js/CrackBuyNow.js?t='+Math.random());document.body.appendChild(element);})())

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=choujiang&ra_id=288&mobile=18951509190

//http://wuxi.buynow.com.cn/luckdraw.php?mod=index&act=sendMsm

//'ra_id=288&content=' + encodeURIComponent(arr[2]) + "&commodity_id=" + arr[3] + "&mobile=18951509190"