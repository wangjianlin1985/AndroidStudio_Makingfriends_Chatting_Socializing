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

function getSearchParam(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}