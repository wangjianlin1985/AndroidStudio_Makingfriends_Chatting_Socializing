/******************ssm*************/
var __APP__ = "http://localhost:8088/";
var rootUrl = "http://localhost:8088/";
var clientUrl = rootUrl+"database/";
var uploadUrl = rootUrl+"database/upload";
var downloadUrl = rootUrl+"download";
var fileurl = rootUrl+"upload/";
var _editorUpload = clientUrl+"editorUpload";
var _editorUploadVideo = clientUrl+"editorUploadVideo";
/******************ssh*************/
/*var rootUrl = "http://localhost:8080/JingyuCizao/";
var __APP__ = "http://localhost:8080/JingyuCizao/";
var fileurl = rootUrl+"upload/";
var clientUrl = rootUrl+"Client!";
var uploadUrl = rootUrl+"Upload";*/

/******************python*************/
/*var __APP__ = "http://127.0.0.1:8000/";
var rootUrl = "http://127.0.0.1:8000/";
var clientUrl = rootUrl+"database/";
var uploadUrl = rootUrl+"database/upload";
var downloadUrl = rootUrl+"download";
var fileurl = rootUrl+"static/upload/";
var _editorUpload = "/database/editorUpload";*/

/**************************************thinkphp5***************************/
/*var __APP__ = "http://localhost/tp5/public/";
var rootUrl = "http://localhost/tp5/public/";
var clientUrl = rootUrl+"index.php/Index/Client/";
var uploadUrl = rootUrl+"index.php/Index/Client/upload";
var downloadUrl = rootUrl+"download";
var fileurl = rootUrl+"static/upload/";*/

var userinfo = null;
var roletype = 0;
var userinfostr = localStorage['adminuserinfo'];
if(userinfostr){
	userinfo = JSON.parse(userinfostr);
}

function fillFormData(form, obj, isStatus) {
    var formEL = $(form);
    $.each(obj, function(index, item) {
        formEL.find("[name=" + index + "]").val(item);
    });
}

function getSearchParam(p){
    var search = window.location.search;
    if (/^[#\?]/.test(search))
        search = search.slice(1);
    var a = search.split("&"),
        o = {};
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split("=");
        o[b[0]] = b[1];
    }
    return o[p];
}

//---------------------base-----------------------------//



function ajaxCallback(action, data, cb,notshow) {
    if(!clientUrl){
        alert("请先设置服务端根路径");
        return;
    }
    !notshow && showLoader("请稍后...");
    data = data || {};
    var retrytimes = 5;
    var count = 0;
    var connectServer = function(){
        !notshow && showLoader("请稍后...");
        $.ajax({
            type: "GET",
            url: clientUrl + action,
            dataType: "jsonp",
            jsonp: "callback",
            contentType: "text/html; charset=utf-8",
            data: data,
            timeout:50000,
            async:true,
            success: function (data) {
                hideLoader();
                cb(data);
                console.log("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideLoader();
                console.log("error:"+XMLHttpRequest+" textStatus:"+textStatus+" errorThrown"+errorThrown);
            },
            complete:function(XMLHttpRequest, textStatus){
                console.log("complete:"+XMLHttpRequest+"textStatus:"+textStatus);
                if(textStatus == "timeout"){
                    if(count<retrytimes){
                        count++;
                        connectServer();
                        console.log(count);
                    }else{
                        showLoader("连接服务器超时！",true);
                    }

                }
            }
        });
    };
    connectServer();
}

function ajaxCallback1(action, data, cb,notshow) {
    if(!clientUrl){
        alert("请先设置服务端根路径");
        return;
    }
    !notshow && showLoader("请稍后...");
    data = data || {};
    var retrytimes = 5;
    var count = 0;
    if(clientUrl.indexOf(".php")!=-1 && action=="list"){
        action = "listAll";
    }
    var connectServer = function(){
        !notshow && showLoader("请稍后...");
        $.ajax({
            type: "get",
            url: clientUrl + action,
            dataType: "json",
            contentType: "text/html; charset=utf-8",
            data: data,
            timeout:50000,
            async:true,
            success: function (data) {
                hideLoader();
                cb(data);
                console.log("success");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideLoader();
                console.log("error:"+XMLHttpRequest+" textStatus:"+textStatus+" errorThrown"+errorThrown);
            },
            complete:function(XMLHttpRequest, textStatus){
                console.log("complete:"+XMLHttpRequest+"textStatus:"+textStatus);
                if(textStatus == "timeout"){
                    if(count<retrytimes){
                        count++;
                        connectServer();
                        console.log(count);
                    }else{
                        showLoader("连接服务器超时！",true);
                    }

                }
            }
        });
    };
    connectServer();
}



function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}


var _showimgel = null;
var _showimgel2 = null;

function getFileInput(el){
    var el = $(el).prev();
    _showimgel = el;
    document.getElementById('selectimginput').click();

}
function showPicImg(files){
    var file = files[0];
    var filename = file['name'];
    var fileURL = window.URL.createObjectURL(file);
    $(_showimgel).attr("src", fileURL);
    var imgel = "";
    if(isImg(filename)){
        imgel = "<img style='width: 50%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 50%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 50%' src='"+fileURL+"' ></audio>";
    }else{
        imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
    }
    $(_showimgel).html(imgel);
}
function getFileInput2(el){
    var el = $(el).prev();
    _showimgel2 = el;
    document.getElementById('selectimginput2').click();

}
function showPicImg2(files){
    var file = files[0];
    var filename = file['name'];
    var fileURL = window.URL.createObjectURL(file);
    $(_showimgel2).attr("src", fileURL);
    var imgel = "";
    if(isImg(filename)){
        imgel = "<img style='width: 50%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 50%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 50%' src='"+fileURL+"' ></audio>";
    }else{
        imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
    }
    $(_showimgel2).html(imgel);
}


function ajaxFormUploadFile(cb){
    var formData = new FormData($("#uploadForm")[0]);
    $.ajax({
        url: uploadUrl ,  /*这是处理文件上传的servlet*/
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (r) {
            cb && cb(r);
        },
        error: function (r) {
            cb && cb("");
        }
    });
}
function ajaxFormUploadFile2(cb){
    var formData = new FormData($("#uploadForm2")[0]);
    $.ajax({
        url: uploadUrl ,  /*这是处理文件上传的servlet*/
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (r) {
            cb && cb(r);
        },
        error: function (r) {
            cb && cb("");
        }
    });
}



function isMusic(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="mp3" || houzui=="wma" || houzui=="acc"){
        return true;
    }else{
        return false;
    }
}


function GetExtensionFileName(pathfilename)
{
    var reg = /(\\+)/g;
    var pfn = pathfilename.replace(reg, "#");
    var arrpfn = pfn.split("#");
    var fn = arrpfn[arrpfn.length - 1];
    var arrfn = fn.split(".");
    return arrfn[arrfn.length - 1];
}

function isImg(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="jpg" || houzui=="jpeg" || houzui=="png" || houzui=="gif" || houzui=="bmp"){
        return true;
    }else{
        return false;
    }
}

function isVideo(str){
    var houzui = GetExtensionFileName(str);
    houzui = houzui.toLowerCase();
    if(houzui=="mp4" || houzui=="3gp" || houzui=="avi" || houzui=="mepg" || houzui=="ogg"){
        return true;
    }else{
        return false;
    }
}


function showAttach(elid,filename){
    var fileURL = fileurl+filename;
    var imgel = "";
    if(filename){
        if(isImg(filename)){
            imgel = "<img style='width: 100%' src='"+fileURL+"' />";
        }else if(isVideo(filename)){
            imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
        }else if(isMusic(filename)){
            imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
        }else{
            imgel = "<a href='"+fileURL+"'>"+filename+"</a>";
        }
    }

    $("#"+elid).html(imgel);
}
//异步上传结束


/**
 * 删除左空格
 * @param arg
 * @return string
 * @since 1.0
 * @author wangl
 */
function ltrim(arg) {
	//var arg=arg.replace(/[\u3000]/g, "");
   // return arg.replace(/^\s*/, "");
    return arg.replace(/(^[' '|'　']*)/, '');
}

/**
 * 删除右空格
 * @param name
 * @return string
 * @since 1.0
 * @author wangl
 */
function rtrim(s) {
	//var s=s.replace(/[\u3000]/g, "");
    //return s.replace(/\s*$/, "");
    return s.replace(/([' '|'　']*$)/, '');
}

/**
 * 删除左右空格
 * @param name
 * @return string
 * @since 1.0
 * @author wangl
 */
function trim(s) {
  return rtrim(ltrim(s));
  //return s.replace(/[" "|"　"]/g,"");//去半角+全角空格
}

function replaceSpecialSign(str){
	if(typeof(str) != "undefined"){
		str = str.replace(/\\/g,"\\\\");
		str = str.replace(/<br\/>/g,"\n");
		str = str.replace(/</g,"&#60;")
		str = str.replace(/>/g,"&#62;");
		str = str.replace(/'/g,"&#8242;");
		str = str.replace(/"/g,"&#34;");
		return str;
	}
}

function showLoader(){
	//openBackGround();
}
function hideLoader(){
    //closeBackGround();
}
//弹出遮罩层
function openBackGround(){
	var divHeight = document.body.scrollHeight + document.documentElement.clientHeight;
	var maskCss = {
		position:"absolute",
		left:0,
		top:0,
		cursor:"wait",
		filter:"alpha(opacity=60)",
		display:"block",
		background:"#ccc",
		opacity:0.6,
		width:"100%",
		height:divHeight,
		zIndex:"100000"
	}
	var maskMsgCss = {
		position:"absolute",
		padding:"10px 20px",
		left:($(document.body).outerWidth(true) - 190) / 2,
		top:($(window).height() - 45) / 2,
		cursor:"wait",
		border:"2px solid #ccc",
		color:"white",
		opacity:0.6,
		background:"black",
		filter:"alpha(opacity=60)",
		borderRadius:5,
		display:"block",
		width:"auto",
		zIndex:"100001"
	}
	var htm = "<div style=\"text-align:center;\">";
		htm += "<img src=\"data:image/gif;base64,R0lGODlhEAAQALMNAD8/P7+/vyoqKlVVVX9/fxUVFUBAQGBgYMDAwC8vL5CQkP///wAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAANACwAAAAAEAAQAAAEO5DJSau9OOvNex0IMnDIsiCkiW6g6BmKYlBFkhSUEgQKlQCARG6nEBwOgl+QApMdCIRD7YZ5RjlGpCUCACH5BAUAAA0ALAAAAgAOAA4AAAQ6kLGB0JA4M7QW0hrngRllkYyhKAYqKUGguAws0ypLS8JxCLQDgXAIDg+FRKIA6v0SAECCBpXSkstMBAAh+QQFAAANACwAAAAACgAQAAAEOJDJORAac6K1kDSKYmydpASBUl0mqmRfaGTCcQgwcxDEke+9XO2WkxQSiUIuAQAkls0n7JgsWq8RACH5BAUAAA0ALAAAAAAOAA4AAAQ6kMlplDIzTxWC0oxwHALnDQgySAdBHNWFLAvCukc215JIZihVIZEogDIJACBxnCSXTcmwGK1ar1hrBAAh+QQFAAANACwAAAAAEAAKAAAEN5DJKc4RM+tDyNFTkSQF5xmKYmQJACTVpQSBwrpJNteZSGYoFWjIGCAQA2IGsVgglBOmEyoxIiMAIfkEBQAADQAsAgAAAA4ADgAABDmQSVZSKjPPBEDSGucJxyGA1XUQxAFma/tOpDlnhqIYN6MEAUXvF+zldrMBAjHoIRYLhBMqvSmZkggAIfkEBQAADQAsBgAAAAoAEAAABDeQyUmrnSWlYhMASfeFVbZdjHAcgnUQxOHCcqWylKEohqUEAYVkgEAMfkEJYrFA6HhKJsJCNFoiACH5BAUAAA0ALAIAAgAOAA4AAAQ3kMlJq704611SKloCAEk4lln3DQgyUMJxCBKyLAh1EMRR3wiDQmHY9SQslyIQUMRmlmVTIyRaIgA7\" style=\"margin-right:8px;\" align=\"absmiddle\"/>";
		htm += "\u5904\u7406\u4e2d，\u8bf7\u7a0d\u5019...";
		htm += "</div>";
	$("<div id='maskBackgroundLoading'></div>").css(maskCss).appendTo("body");
	$("<div id='maskLoadMsg'></div>").html(htm).css(maskMsgCss).appendTo("body");
}

//隐藏遮罩层
function closeBackGround(){
	$("#maskLoadMsg").fadeOut(function(){
		$(this).hide().remove();
	});
	$("#maskBackgroundLoading").fadeOut(function(){
		$(this).hide().remove();
	});
//	setTimeout(function(){
//    }, 10);
}

//鼠标提示弹出框
function mouseTipDivOpen(e,value){
	if(value != ""){
		var _maskLoad = document.getElementById('tipMsg');
		var div = $("<div id='tipMsg' style='display:block;word-break:break-all;position:absolute;z-index:10001;font-family:Arial;font-size:10pt;border:1px solid #c5d2df;background-color:#e0e8f3;padding:5;'></div>");
		div.html(value).appendTo("body");
		if(_maskLoad == null){
			var target = document.getElementById("tipMsg");
			var value = 10;
			target.style.filter = "alpha(opacity="+value+") progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4)";
			this.intervalDiv = setInterval(function(){
				value += 10;
				if(value >= 100){
					clearInterval(this);
				}
				target.style.filter = "alpha(opacity="+value+") progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4)";
			},30)
		}
		$("#tipMsg").css("width","auto");
		$("#tipMsg").css("height","auto");
		var divWidth = $("#tipMsg").width();
		if(divWidth > 400){
			$("#tipMsg").css("width","450px");
			divWidth = 450;
		}
		var divHeight = $("#tipMsg").height();
		var mousex = e.pageX;
        var mousey = e.pageY;
		var winWidth = $(window).width();
        var winHeight = $(window).height();
        var scrollLeft = $(window).scrollLeft();
        var scrollTop = $(window).scrollTop();
        var marginRight = winWidth - (mousex + divWidth + 10 - scrollLeft);
        var marginBottom = winHeight - (mousey + divHeight + 10 - scrollTop);
        if(marginRight < 10){
        	mousex = e.pageX - divWidth;
        }
        if(marginBottom < 10){
        	mousey = e.pageY - divHeight;
        }
	 	div.css({"left":mousex+"px"});
		div.css({"top":mousey+"px"});
	}
}

//鼠标提示关闭弹出层
function mouseTipDivClose(){
	var _maskLoad = document.getElementById('tipMsg');
	if(_maskLoad != null){
		_maskLoad.parentNode.removeChild(_maskLoad);
	}
}

//固定电话，手机号码校验
function telNumberCheck(linkNumber){

	var tel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	var tel2=/^((400)-(\d{3})-(\d{4}))|((800)-(\d{3})-(\d{4}))|((955)\d{2})$/;
	var phone = /^0{0,1}(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;
	if(!tel.test(linkNumber) && !phone.test(linkNumber) &&!tel2.test(linkNumber)){
		return false;
	}else{
		return true;
	}
}

function OpenForm( width,height,url)
{
    var screenwidth=document.body.clientWidth;
    var screenheight=document.body.clientHeight+200;
    window.open(url,'','height='+height+',width='+width+',top='+(screenheight-height)/2+',left='+(screenwidth-width)/2+',toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no');
}

/**
 * 对日期进行格式化
 * @param dateStr 日期字符串
 * @return 格式后的
 * @since 1.0
 * @author ganjp
 */
function formatDate(dateStr) {
	var dateObject = new Date(dateStr);
	if (isNaN(dateObject)) {
		if (dateStr.length>10) {
			return dateStr.substr(0,10);
		} else {
			return dateStr;
		}
	} else {
		var month = dateObject.getMonth() - 0 + 1;
		var day = dateObject.getDate() - 0;
		if (month < 10) {
				month = "0" + month;
		}
		if ( day < 10 ) {
			day = "0" + day;
		}
		return dateObject.getFullYear() + "-" + month + "-" + day;
	}
}
/**
 * 判断两日期的大小
 * @param d1
 * @param d2
 * @returns {Boolean}
 */
function compareDate(d1 , d2){
	var td1 = converToDate(d1);
	var td2 = converToDate(d2);
	var flag = -1;
	 if((td1 - td2) == 0){//a==b
        flag = 0;
     }
     if ((td1 - td2) < 0) {//a>b
        flag = 1;
     }
     if ((td1 - td2) > 0) {//a<b
        flag = -1;
     }
     if(flag == -1){
     	return false;
     }
	 return  true;
}
/**
 * 将一个字符串类型的转换为JsDate类型
 * @str 转换的字符串
 * @since 1.0
 * @author jiangtao.gao
 */
function converToDate(str){
    var sd= str.split("-");
    var sds = sd[0]+sd[1]+sd[2];
    return sds;
}

/**
 * 验证用户名
 * @param str
 * @returns {Boolean}
 */
function isChn(str){
	//var reg = /^[u4E00-u9FA5]+$/;

	var reg=/^[.A-Za-z0-9_-]+$/;

	if(!reg.test(str)){
	 return false;
	}
	return true;
	}


/**
* 校验所有输入字符的长度
* 参数1：字符串
* 参数2：验证长度
* 返回 提示信息
*/
function checkLength(str,length){
	if(len(str) >length){
		//$.messager.alert('提示信息',name + '长度不能超过'+length+'！');
		return true;
	}
	return false;
}
/**
* 获取字符串(字母，包括汉字)的长度
* 参数：字符串
* 返回 字符串长度
*/
function len(s) {
 	 var l = 0;
	 var a = s.split("");
	 for (var i=0;i<a.length;i++) {
	  if (a[i].charCodeAt(0)<299) {
		   l++;
		  } else {
		   l+=2;
		  }
	 }
 	return l;
}

/**
 * 设置系统统一的时间
 */
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	if (eval(month) < 10) {
		month = "0" + month;
	}
	;
	if (day < 10) {
		day = "0" + day;
	}
	var nowdate=year + "-" + month + "-" + day;
/**
 * 返回指定格式的时间
 * @param {Object} time
 */
function getNowTime(ntime) {
    ntime = ntime || Date.now();
	var time = new Date(ntime);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();
	var hour = time.getHours();
	var min = time.getMinutes();
	var second = time.getSeconds();
	if (eval(month) < 10) {
		month = "0" + month;
	}

	if (day < 10) {
		day = "0" + day;
	}

	if (hour < 10) {
		hour = "0" + hour
	}

	if (min < 10) {
		min = "0" + min
	}

	if (second < 10) {
		second = "0" + second
	}

	return year + "-" + month + "-" + day + " " + hour + ":" + min + ":"
			+ second;
}

function getNowDate(ntime) {
    ntime = ntime || Date.now();
    var time = new Date(ntime);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var second = time.getSeconds();
    if (eval(month) < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    if (hour < 10) {
        hour = "0" + hour
    }

    if (min < 10) {
        min = "0" + min
    }

    if (second < 10) {
        second = "0" + second
    }

    return year + "-" + month + "-" + day;
}


serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};



function compareDate(first,second,sign){
	if(!first || !second){
		return "";
	}
	if(!first.indexOf(sign) || !second.indexOf(sign)){
		return "";
	}
	fArray = first.split(sign);
	sArray = second.split(sign);
	var fDate = new Date(parseInt(fArray[0],10),parseInt(fArray[1],10),parseInt(fArray[2],10));
	var sDate = new Date(parseInt(sArray[0],10),parseInt(sArray[1],10),parseInt(sArray[2],10));
	var t = sDate.getTime()-fDate.getTime();
	var days = t/(1000*60*60*24);
	return days;
}


function addDays(days){
	var newdate=new Date();
	var newtimems=newdate.getTime()+(days*24*60*60*1000);
	newdate.setTime(newtimems);
	return newdate.getFullYear()+"-"+(newdate.getMonth()+1)+"-"+newdate.getDate();
}

function convert(rows){
    function exists(rows, pid){
        for(var i=0; i<rows.length; i++){
            if (rows[i].id == pid) return true;
        }
        return false;
    }
	//找根节点
    var nodes = [];
    for(var i=0; i<rows.length; i++){
        var row = rows[i];
        if (!exists(rows, row.pid)){
            nodes.push({
                id:row.id,
                text:row.mname
            });
        }
    }

    var toDo = [];
    for(var i=0; i<nodes.length; i++){
        toDo.push(nodes[i]);
    }
    while(toDo.length){
        var node = toDo.shift();    // the parent node
        // get the children nodes
        for(var i=0; i<rows.length; i++){
            var row = rows[i];
            if (row.pid == node.id){
                var child = {id:row.id,text:row.mname};
                if (node.children){
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}
