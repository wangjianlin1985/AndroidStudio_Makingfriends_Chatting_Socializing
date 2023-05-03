


/********************************8聊天相关全局变量*************/
var chattimmer = null;
var iftobutton = true;

var isRecordStart = false;
var counttimmer = null;
var count = 0;
var _chattype = 1;//1朋友聊天,2群聊天
var _mingancis = null;
var focususer = null;
var focuslist = [];
/********************************8聊天相关全局变量结束*************/
var userinfo = null;




$(function(){

    /*****************好友聊天相关***************************/
    var pppp = {};
    pppp.tpl = '<li>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '</li>';
    pppp.colums = ["note","username","ndate"];
    $("#msglist").data("property",JSON.stringify(pppp));

    var fp = {};
    fp.tpl = '<li><a  onclick="toUserInfo(%s);">'+
        '<img style="height: 80px;" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</a><a href="#" onclick="toChat(%s,1)"></a></li>';
    fp.colums = ["id","img","username","sex","id"];
    $("#myfriendlist").data("property",JSON.stringify(fp));


    var fpp = {};
    fpp.tpl = '<li onclick="toUserInfo(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    fpp.colums = ["id","img","username","sex"];
    $("#userlist").data("property",JSON.stringify(fpp));

    var fppp = {};
    fppp.tpl = '<li onclick="toYzMessage(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    fppp.colums = ["id","img","fuser","ndate"];
    $("#messagelist").data("property",JSON.stringify(fppp));


    /*$("#recordbtn").unbind("click").bind("click",function(){
        if(isRecordStart){
            isRecordStart = false;
            hideLoader();
            $("#recordbtn").text("点击录音");
            path = myObj.getRecordFile();
            setTimeout(function(){
                sendMsg(path,2);
            },2000);
            clearInterval(counttimmer);
            count = 0;
            myObj.stopSound();
        }else{
            isRecordStart = true;
            $("#recordbtn").text("录音中");
            //showLoader("录音中 "+count+"s",true);
            counttimmer = setInterval(function(){
                //showLoader("录音中 "+count+"s",true);
                $("#recordbtn").text("录音中"+count+"s");
                count++;
            },1000);
            myObj.recordSound();
        }

    });*/

    /*$("#filebutton").unbind("click").bind("click",function(){
        sendFile();
    });*/

    var uid = getSearchParam("uid");
    var fid = getSearchParam("fid");
    if(uid && fid){
        ajaxCallback("findJ",{id:uid,table:"user"},function (data) {
            userinfo = data;
            ajaxCallback("findJ",{id:fid,table:"user"},function (data2) {
                focususer = data2;
                toUserInfo()
            })
        })
    }else if(uid){
    	ajaxCallback("findJ",{id:uid,table:"user"},function (data) {
            userinfo = data;
            toMyFriend();
            //toSearchFriend();
            //toLastMessage();
        })
    	
    }


    /*****************好友聊天相关***************************/
});





function toLastMessage(){
    changePage("lastmessagepage");
    listLastMessage();
}

function listLastMessage(){
    var uid = userinfo.id;
    var fpm = {};
    fpm.tpl = '<li><a  onclick="toChat(%s,1);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p>%s</p>'+
        '</a><a href="#" onclick="toChat(%s,1);"></a></li>';
    fpm.colums = ["uid","img","username","note","ndate","uid"];
    $("#mymessagelist").data("property",JSON.stringify(fpm));
    var sql = "select * from wct_message t where t.fid='"+uid+"' GROUP BY t.uid ORDER BY t.id desc";
    ajaxCallback("listSqlJ",{sql:sql},function(data){
        $("#mymessagelist").refreshShowListView(data);
    });
}
























/**************************************聊天相关******************************/

function backclear(){
    clearInterval(chattimmer);
    goback();
}

var refreshgap = 5000;
/*function toQunChat(id){
 var qz = getObjectById(id,focuslist);
 focusobj = qz;
 changePage("chatpage");
 chattimmer = setInterval(function (){
 refreshServerQunChatList();
 },refreshgap);
 }*/

function toChat(id,type){
    ajaxCallback("findJ",{id:id,table:"user"},function(data){
        focususer = data;
        /*if(userinfo.status=="禁言"){
     showLoader("你已被禁言",true);
     return;
     }*/
        _chattype = type;
        /*if(type==2){
            var qz = getObjectById(id,focuslist);
            focususer = qz;
        }*/

        changePage("chatpage");
        refreshServerChatList();
        chattimmer = setInterval(function (){
            refreshServerChatList();
        },refreshgap);
    });

}

function refreshChatMSg(){
    ajaxCallback("listMyMessage",{uid:userinfo.id,fid:focususer.id},function(data){
        $("#msglist").refreshShowListView(data);
    },true);
}






function sendFile(){
    getFileAttach(function(path){
        sendMsg(path,3);
    });
}

function sendMsg(){


    var obj = {};
    obj.uid = userinfo.id;
    obj.fid = focususer.id;
    if(_chattype==2){
        obj.qid = focususer.id;
    }
    obj.note = $("#msgaarea").val();
    obj.username = userinfo.username;
    obj.fusername = focususer.username;
    obj.type = 1;
    obj.img = userinfo.img;
    obj.table="message";
    var fileInput = $('#selectimginput').get(0).files[0];
    if(fileInput){
        obj.type = 3;
        ajaxFormUploadFile(function (r){
            obj.attach = r;
            ajaxCallback("saveJ",obj,function(data){
                iftobutton = true;
                $("#selectimginput").val('');
                $("#chatattach").empty();
                refreshServerChatList();
            });
        });
    }else{
        /*if(checkMgc(obj.note)){
         showLoader("消息不合法",true);
         return;
         }*/
        obj.attach = "";
        ajaxCallback("saveJ",obj,function(data){
            iftobutton = true;
            refreshServerChatList();
        });
    }
    $("#msgaarea").val("");


    /*var note = $("#chatnote").val();
     var msg = {};
     msg.note = note;
     msg.qid = focususer.id;
     msg.uid = userinfo.id;
     msg.username = userinfo.username;
     ajaxCallback("addQunMessage",msg,function(data){
     ajaxCallback("listQunMessage",{uid:userinfo.id,qid:focususer.id},function(data){
     $("#chatnote").val("");
     $("#qunmsglist").refreshShowListView(data);
     });
     });*/
}

function checkMgc(str){
    for(var i=0;i<_mingancis.length;i++){
        var mgc = _mingancis[i]['title'];
        if(str.indexOf(mgc)!=-1){
            return true;
        }
    }
    return false;
}

function refreshServerChatList(){
    /*var queryobj = {uid:userinfo.id,fid:focususer.id};
    var ajaxurl = "listMyMessage";
    if(_chattype==2){
        queryobj = {uid:userinfo.id,qid:focususer.id};
        ajaxurl = "listQunMessage";
    }*/
    var uid = userinfo.id;
    var fid = focususer.id;
    ajaxCallback("listSqlJ",{sql:"select * from wct_message u where (u.uid="+uid+" or u.fid="+uid+") and (u.uid="+fid+" or u.fid="+fid+")"},function(data){
        data = data||[];
        refreshChatList(data);
    },true);
}

function onVideoPlay(){
    clearInterval(chattimmer);
}


var _oldlength = null;
function refreshChatList(data){
    if(data.length!=_oldlength){
        iftobutton = true;
        _oldlength = data.length;
    }
    var html = "";
    if(data && data.length){
        for(var i=0;i<data.length;i++){
            var msg = data[i];
            var cn = "citemto";
            if(msg.uid != userinfo.id){
                var cn = "citemfrom";
            }
            var li = "";
            if(msg.type==1){
                li = '<li class="'+cn+'"><div><img src="'+fileurl+msg.img+'"><p>'+msg.note+'</p></div></li>';
            }else{
                var filename = msg.attach;
                var chatFileURL = fileurl+filename;
                if(filename){
                    if(isImg(filename)){
                        li = '<li class="'+cn+'" ><div><img src="'+fileurl+msg.img+'"><p class="imgctn" style="background-image: url('+chatFileURL+')"></p></div></li>';
                    }if(isVideo(filename)||isMusic(filename)){
                        li = '<li class="'+cn+'" ><div><img src="'+fileurl+msg.img+'"><p class="toumingctn"><video onplay="onVideoPlay();" style="height: 200px;" controls="controls" src="'+chatFileURL+'"></video></p></div></li>';
                    }else{
                        li = '<li class="'+cn+'"><div><img src="'+fileurl+msg.img+'"><a href="'+chatFileURL+'"><p>'+filename+'</p></a></div></li>';
                    }
                }

            }/*else if(msg.type==2){
                li = '<li class="'+cn+'" onclick="myObj.playAudio(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p>点击播放语音</p></div></li>';
            }else if(msg.type==3){
                if(getFileType(msg.attach)==".png" || getFileType(msg.attach)==".jpg"||getFileType(msg.attach)==".gif"||getFileType(msg.attach)==".jpeg"){
                    li = '<li class="'+cn+'" onclick="localFile(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p class="imgctn" style="background-image: url('+fileurl+msg.attach+')"></p></div></li>';
                }else{
                    li = '<li class="'+cn+'" onclick="localFile(\''+msg.attach+'\');"><div><img src="'+fileurl+msg.img+'"><p>'+msg.attachname+'</p></div></li>';
                }

            }*/

            html+=li;
        }
        $("#chatlist").html(html);
        setScroll("chatscroll",document.getElementById("chatdiv"));
    }else{
        $("#chatlist").html(html);
    }
    var hei = $("#chatlist").height();
    if(iftobutton){
        if(hei>600){
            var scrollY = 0-(hei-600);
            scrolls["chatscroll"].scrollTo(0,scrollY,300);
        }
        iftobutton = false;
    }


}
/**************************************聊天相关结束******************************/
/*****************************************************************好友管理********************************************/
function toMyFriend(){
    changePage('friendpage');
    listMyFriend();
}
function listMyFriend(){
    ajaxCallback("listSqlJ",{sql:"select * from wct_user where id in ("+userinfo.fids+")"},function(data){
        focuslist = data;
        $("#myfriendlist").refreshShowListView(data);
    });
}

function toUserInfo(id){
    if(id){
        ajaxCallback("findJ",{id:id,table:"user"},function(obj){
            if(obj){
                focususer = obj;
                changePage('userdetailpage');
                checkIsMyFriend();
                $("#vusername2").text("用户名:"+focususer.username+" 粉丝数:"+(focususer.fs||0));
                $("#vuserimg2").attr("src",fileurl+focususer.img);
                $("#vbirth2").text("生日:"+focususer.birth);
                $("#vsex2").text("性别:"+focususer.sex);
                $("#vqq2").text("标签:"+focususer.note);
                $("#vemail2").attr("href","tel:"+focusobj.tel).text("电话:"+focususer.tel);
            }
        });
    }else{
        changePage('userdetailpage');
        checkIsMyFriend();
        $("#vusername2").text("用户名:"+focususer.username);
        $("#vuserimg2").attr("src",fileurl+focususer.img);
        $("#vbirth2").text("生日:"+focususer.birth);
        $("#vsex2").text("性别:"+focususer.sex);
        $("#vqq2").text("标签:"+focususer.note);
        $("#vemail2").attr("href","tel:"+focusobj.tel).text("电话:"+focususer.tel);
    }
}


function toSearchFriend(){
    changePage("addfriendpage");
    listUser();
}

function listUser(){
    ajaxCallback("listJ",{roletype:2,table:"user"},function(data){
        focuslist = data;
        $("#userlist").refreshShowListView(data);
    });
}

function checkIsMyFriend(cb){
    var fids = userinfo.fids;
    if(fids){
        var fidsarray = fids.split(",");
        var flag = false;
        for(var i=0;i<fidsarray.length;i++){
            var fid = fidsarray[i];
            if(fid==focususer.id){
                flag = true;
                break;
            }
        }
        if(flag){
            $("#canadd").hide();
            $("#candelf").show();
        }else{
            if(focususer.id!=userinfo.id){
                $("#canadd").show();
                $("#candelf").hide();
            }else{
                $("#canadd").hide();
                $("#candelf").hide();
            }
        }
    }else{
        if(focususer.id!=userinfo.id){
            $("#canadd").show();
            $("#candelf").hide();
        }else{
            $("#canadd").hide();
            $("#candelf").hide();
        }
    }

}

function addFriend(){

    ajaxCallback("findJ",{table:"user",id:userinfo.id},function(data){
        userinfo = data;
        //toMyFriend();
        ajaxCallback("findJ",{table:"user",id:focususer.id},function(data2){
            focususer = data2;

            if(userinfo.fids){
                userinfo.fids+=","+focususer.id;
            }else{
                userinfo.fids = focususer.id;
            }

            if(focususer.fids){
                focususer.fids+=","+userinfo.id;
            }else{
                focususer.fids = userinfo.id;
            }

            userinfo.table="user";
            focususer.table="user";

            ajaxCallback("saveJ",userinfo,function (r1) {
                    ajaxCallback("saveJ",focususer,function (r2) {
                        showTipTimer("添加好友成功!",function () {
                            toMyFriend();
                            addFs(focususer.id);
                        });
                    })
            })
        });
    });
    //改为同意的时候后台自动加上
    /*ajaxCallback("sendAddMessage",{fid:userinfo.id,tid:focususer.id,status:"待同意",fuser:userinfo.username,img:userinfo.img},function(data){
        showLoader("请求已发送,等待好友验证!",true);
    });*/
}

function delFriend(){
    ajaxCallback("findJ",{table:"user",id:userinfo.id},function(data){
        userinfo = data;
        //toMyFriend();
        var fid = focususer.id;
        var fids = userinfo.fids;
        var list2 = [];
        if(fids){
            var list = fids.split(",");
            for(var i=0;i<list.length;i++){
                if(list[i]==fid){
                    continue;
                }
                list2.push(list[i]);
            }
        }
        userinfo.fids = list2.toString();
        if(!userinfo.fids){
            userinfo.fids="0";
        }
        userinfo.table="user";
        ajaxCallback("saveJ",userinfo,function (data) {
                showTipTimer("删除成功!",function (){
                    toMyFriend();
                })
        })
    });
}


function toMyYanzhengMessage(){
    changePage('yzmessagelistpage');
    ajaxCallback("listMyAddMessage",{uid:userinfo.id},function(data){
        focuslist = data;
        $("#messagelist").refreshShowListView(data);
    });
}

function toYzMessage(id){
    var msg = getObjectById(id,focuslist);
    if(msg){
        focusobj = msg;
        changePage('yzmsgdetailpage');
        $("#vusername4").text(msg.fuser);
        $("#vstatus").text("状态:"+msg.status);
        $("#userimg").attr("src",fileurl+msg.img);
        if(msg.status="待同意"){
            $("#opctn").show();
        }else{
            $("#opctn").hide();
        }
    }
}

function agree(){
    ajaxCallback("addFriend",{uid:focusobj.fid,fid:focusobj.tid},function(r){
        ajaxCallback("addFriend",{uid:userinfo.id,fid:focusobj.fid},function(rr){
            ajaxCallback("updateYzMsgStatus",{id:focusobj.id,status:"已同意"},function(data){
                userinfo = rr;
                toMyFriend();
            });

        });
    });
}

function refuse(){
    ajaxCallback("updateYzMsgStatus",{id:focusobj.id,status:"已拒绝"},function(data){
        goback();
    });

}

/**
 * 去聊天界面自动加好友
 */
function toChatPage(){
    var sid = focusobj.sid;
    ajaxCallback("getUserBySid",{sid:sid},function(data){
        focususer = data;
        checkIsMyFriend(function (info){
            if(info=="0"){
                addFriend();
            }
        });
        toChat(focususer.id,1);
    });
}

/*****************************************************************好友管理结束********************************************/
