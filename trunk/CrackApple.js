var _Taobao_is_ie = true;
var _Taobao_layer;
var _ErrorNum;
var _intervalProcess;
var _isStated = false;
var _isError = false;
var _xmlhttp;
var _TimeSlot;
var _Define = [{model:'MG482J/A',	color:'シルバー',	type:'iPhone 6',	request:'MG482J/A,MG4C2J/A,MG4H2J/A'},
{model:'MG4H2J/A',	color:'シルバー',	type:'iPhone 6',	request:'MG482J/A,MG4C2J/A,MG4H2J/A'},
{model:'MG4C2J/A',	color:'シルバー',	type:'iPhone 6',	request:'MG482J/A,MG4C2J/A,MG4H2J/A'},
{model:'MG492J/A',	color:'ゴールド',	type:'iPhone 6',	request:'MG4J2J/A,MG492J/A,MG4E2J/A'},
{model:'MG4J2J/A',	color:'ゴールド',	type:'iPhone 6',	request:'MG4J2J/A,MG492J/A,MG4E2J/A'},
{model:'MG4E2J/A',	color:'ゴールド',	type:'iPhone 6',	request:'MG4J2J/A,MG492J/A,MG4E2J/A'},
{model:'MG472J/A',	color:'スペースグレイ',	type:'iPhone 6',	request:'MG472J/A,MG4A2J/A,MG4F2J/A'},
{model:'MG4F2J/A',	color:'スペースグレイ',	type:'iPhone 6',	request:'MG472J/A,MG4A2J/A,MG4F2J/A'},
{model:'MG4A2J/A',	color:'スペースグレイ',	type:'iPhone 6',	request:'MG472J/A,MG4A2J/A,MG4F2J/A'},
{model:'MGA92J/A',	color:'シルバー',	type:'iPhone 6 Plus',	request:'MGAE2J/A,MGAJ2J/A,MGA92J/A'},
{model:'MGAJ2J/A',	color:'シルバー',	type:'iPhone 6 Plus',	request:'MGAE2J/A,MGAJ2J/A,MGA92J/A'},
{model:'MGAE2J/A',	color:'シルバー',	type:'iPhone 6 Plus',	request:'MGAE2J/A,MGAJ2J/A,MGA92J/A'},
{model:'MGAA2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	request:'MGAK2J/A,MGAF2J/A,MGAA2J/A'},
{model:'MGAK2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	request:'MGAK2J/A,MGAF2J/A,MGAA2J/A'},
{model:'MGAF2J/A',	color:'ゴールド',	type:'iPhone 6 Plus',	request:'MGAK2J/A,MGAF2J/A,MGAA2J/A'},
{model:'MGA82J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	request:'MGAH2J/A,MGAC2J/A,MGA82J/A'},
{model:'MGAH2J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	request:'MGAH2J/A,MGAC2J/A,MGA82J/A'},
{model:'MGAC2J/A',	color:'スペースグレイ',	type:'iPhone 6 Plus',	request:'MGAH2J/A,MGAC2J/A,MGA82J/A'}];


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
    h += '<div id="_CrackJLPT2010_12">V1.5.3';
    h += '<div>';
    h += ' <form id="_book" target="_blank" method="post">';
    h += '    选择款式：<select id="_form_model" name="selectedPartNumber">';
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
h += '<option value="MGAK2J/A" selected>iPhone 6 Plus 金 64G</option>';
h += '<option value="MGAF2J/A">iPhone 6 Plus 金 128G</option>';
h += '<option value="MGA82J/A">iPhone 6 Plus 灰 16G</option>';
h += '<option value="MGAH2J/A">iPhone 6 Plus 灰 64G</option>';
h += '<option value="MGAC2J/A">iPhone 6 Plus 灰 128G</option>';
	h += '    </select>';
	h += '    <br />';
    h += '	数量：<select id="_form_number" name="selectedQuantity">';
	h += '		<option value="1" selected>1</option>';
	h += '		<option value="2">2</option>';
	h += '    </select><br />';
    h += '	<input type="hidden" name="_eventId" value="next" />';
    h += '	<input type="hidden" name="_flowExecutionKey" value="" />';
    h += '	<input type="hidden" name="color" value="" />';
    h += '	E-mail：<input type="text" name="email" value="kyohinnwx@yahoo.co.jp" /><br />';
    h += '	名：<input type="text" name="firstName" value="Bin" /><br />';
    h += '	姓：<input type="text" name="lastName" value="Xu" /><br />';
    h += '	<input type="hidden" name="p_ie" value="" />';
    h += '	电话：<input type="text" name="phoneNumber" value="080-4221-3500" /><br />';
    h += '	<input type="hidden" name="product" value="" />';
    h += '	<input type="hidden" name="selectedContractType" value="UNLOCKED" />';
    h += '	<input type="hidden" name="selectedStoreNumber" value="R005" />';
    h += '	<input type="hidden" name="selectedTimeSlotId" value="" />';
    h += '    <input id="_btnInit" onclick="_InitPage();" type="button" value="初始化">';
    h += '    <input id="_btnAutoBook" onclick="_Book();" type="submit" value="订购"><br />';
    //h += '    <input id="_btnAutoBook" onclick="_AutoBook();" type="button" value="查询">';
    //h += '    <input id="_btnStop" onclick="_StopAutoBook();" type="button" value="停止">';
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
        el.style.top = scrollPos.y + 80 + 'px';
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
            document.getElementById("_Taobao_layer").style.top = scrollPos.y + 80 + 'px';
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
		partNumbers : _GetRequest($('#_form_model').val()),
		selectedContractType : 'UNLOCKED',
		p_ie : $('#p_ie').val()
	};

	$.ajax({
		//url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		type : 'POST',
		data : opt,
		dataType : 'json',
		success : _CheckResult,
		error : function(){
			_StopAutoBook();
			setTimeout(_AutoBook, 10000);
		}
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
				clearInterval(_intervalProcess);
    			_isStated = false;
    			$('#_errorMsg').html('正在预定：<br />' + (new Date()).toLocaleString());
				_Book();

			}
		}
	}
}



function _Book(str)
{
	var opt = {
		//_eventId: "next",
		_flowExecutionKey: _GetSearch('execution'),
		color: _GetColor($('#_form_model').val()),
		//email: "tantiancai@gmail.com",
		//firstName: "ＸＩＡＯＫＡＮＧ",
		//lastName: "ＴＡＮ",
		p_ie: $('#p_ie').val(),
		//phoneNumber: "080-4221-3543 ",
		product: _GetType($('#_form_model').val()),
		//selectedContractType: "UNLOCKED",
		//selectedPartNumber: $('#_form_model').val(),
		//selectedQuantity: $('#_form_number').val(),
		//selectedStoreNumber: "R005",
		selectedTimeSlotId: _TimeSlot
	};

	var form = $("#_book");
	//form.find('input[name=_eventId]').val(opt._eventId);
	form.find('input[name=_flowExecutionKey]').val(opt._flowExecutionKey);
	form.find('input[name=color]').val(opt.color);
	//form.find('input[name=email]').val(opt.email);
	//form.find('input[name=firstName]').val(opt.firstName);
	//form.find('input[name=lastName]').val(opt.lastName);
	form.find('input[name=p_ie]').val(opt.p_ie);
	//form.find('input[name=phoneNumber]').val(opt.phoneNumber);
	form.find('input[name=product]').val(opt.product);
	//form.find('input[name=selectedContractType][value=' + opt.selectedContractType + ']').attr('checked',true);
	//form.find('input[name=selectedPartNumber][value=' + opt.selectedPartNumber + ']').attr('checked',true);
	//form.find('select[name=selectedQuantity]').val(opt.selectedQuantity);
	//form.find('select[name=selectedStoreNumber]').val(opt.selectedStoreNumber);
	form.find('input[name=selectedTimeSlotId]').val(opt.selectedTimeSlotId);
	
	form.submit();
	//$.ajax({
		//url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		//type : 'POST',
		//data : opt,
		//dataType : 'html',
		//success : function(str){
			//_ShowError(str);
		//},
		//error : function(){
			//setTimeout(_Book, 2000);
		//}
	//});
	
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

function _GetRequest(model){
	for(var i in _Define){
		var obj = _Define[i];
		if(obj.model == model){
			return obj.request;
		}
	}
}


function _StopAutoBook()
{
    clearInterval(_intervalProcess);
    _isStated = false;
    _ShowError("已停止");
}

function _AutoBook()
{
	_InitPage();
	var intTime = 2000;
	_isStated = false;
    clearInterval(_intervalProcess);
	_intervalProcess = setInterval(_BookCheck, intTime);
	//_BookCheck();
}

function _InitPage(){
	var opt = {
		ajaxSource: true,
		_eventId: 'timeslots',
		storeNumber: 'R005',
		p_ie: $('#p_ie').val()
	};
	$.ajax({
		//url : 'https://reserve-jp.apple.com/JP/ja_JP/reserve/iPhone?execution=e1s2',
		type : 'POST',
		data : opt,
		dataType : 'json',
		success : _SetInit,
		error : function(){
			_ShowError("无法初始化");
		}
	});
}

function _SetInit(json){
	try{
		if(json && json.timeslots){
			//var obj = json.timeslots[json.timeslots.length - 1];
			var obj = json.timeslots[0];
			_TimeSlot = obj.timeSlotId;
		}
		_ShowError('初始化完成。');
	}
	catch(e){
		_ShowError('无法获取预定时间，请点击“初始化”。');
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

//javascript:void((function(){var element=document.createElement('script');element.setAttribute('src','file://Tantiancai-PC/share/CrackApple.js?t='+Math.random());document.body.appendChild(element);})())
