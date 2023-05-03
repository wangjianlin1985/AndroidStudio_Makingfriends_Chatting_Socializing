/**
 * Created by ideabobo on 14-6-28.
 * commontools
 */
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
/**
 * 判断是否所有的属性都有值
 * @param obj
 * @returns {boolean}
 */
function checkObjectValue(obj) {
    for(var p in obj){
        if(obj[p]!=undefined && obj[p]!=null){
            if($.trim(obj[p]) == ""){
                return true;
            }
        }
    }
    return false;
}

function getObjectById(id,goodlist){
    for(var i=0;i<goodlist.length;i++){
        var good = goodlist[i];
        if(good.id == id){
            return good;
        }
    }
    return null;
}

function createCode(len) {
    var seed = new Array(
        'abcdefghijklmnopqrstuvwxyz',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        '0123456789'
    );               //创建需要的数据数组
    var idx,i;
    var result = '';   //返回的结果变量
    for (i=0; i<len; i++) //根据指定的长度
    {
        idx = Math.floor(Math.random()*3); //获得随机数据的整数部分-获取一个随机整数
        result += seed[idx].substr(Math.floor(Math.random()*(seed[idx].length)), 1);//根据随机数获取数据中一个值
    }
    _yanzhengma = result;
    return result; //返回随机结果
}

function clickYanzhengma(){
    $("#yanzhengmalabel").text("验证码:"+createCode(5));
}











var scrolls = {};

function setScroll(type, wapper) {
    if (scrolls[type]) {
        scrolls[type].refresh();
    } else {
        scrolls[type] = new IScroll(wapper, {
            snap: false,
            bounceTime: 300,
            fadeScrollbars: true,
            mouseWheel: true,
            click: true
        });
    }

    return scrolls[type];
}

function setHScroll(type, wapper) {
    if (scrolls[type]) {
        scrolls[type].refresh();
    } else {
        scrolls[type] = new IScroll(wapper, {scrollX: true, scrollY: false});
    }
    return scrolls[type];
}


function getFileType(str){
    var index=str.lastIndexOf('.');
    var strtype=str.substr(index,4);
    strtype=strtype.toLowerCase();
    return strtype;
}




var _showimgel = null;

function getFileInput(el){
    var el = $(el).prev();
    _showimgel = el;
    document.getElementById('selectimginput').click();

}
function showPicImg(files){
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function(e){ // reader onload start
        $(_showimgel).attr("src", e.target.result);
    }
}

/*
function ajaxFormUploadFile(cb){
    $("#uploadForm" ).ajaxForm({
        url : uploadUrl,
        type:"post",
        beforeSubmit: function(){
            return true;
        },
        success : function(r){
            $("#uploadForm" )[0].reset();
            cb && cb(r);
        },
        xhr: function() {
            var xhr = $.ajaxSettings.xhr();
            //绑定上传进度的回调函数
            xhr.upload.addEventListener('progress', function(e){
                var totalsize = e.totalSize;
                var currentsize = e.position;
                var percent = parseInt((currentsize/totalsize)*100);
                showLoader("正在上传图片 "+percent+"%...");
            }, false);
            return xhr;//一定要返回，不然jQ没有XHR对象用了
        },
        resetForm:false
    }).submit();
}
*/



function getNdate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
}

function getNdateNian(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year+'-'+month+'-'+day
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
        imgel = "<img style='width: 100%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
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
        imgel = "<img style='width: 100%' src='"+fileURL+"' />";
    }else if(isVideo(filename)){
        imgel = "<video controls style='width: 100%' src='"+fileURL+"' ></video>";
    }else if(isMusic(filename)){
        imgel = "<audio controls style='width: 100%' src='"+fileURL+"' ></audio>";
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
            $("#uploadForm")[0].reset();
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
            $("#uploadForm2")[0].reset();
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

