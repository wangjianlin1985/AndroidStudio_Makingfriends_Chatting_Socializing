/**
 * Created by ideabobo on 14-6-28.
 */

/***************************************用户模块*******************************************/
$(function(){
    var uinfo = localStorage['userinfo'];
    var f = localStorage['welcomed'];
    //if(f){
        if(uinfo && $.trim(uinfo)!=""){
            uinfo  = JSON.parse(uinfo);
            $("#lusername").val(uinfo.username);
            $("#lpasswd").val(uinfo.passwd);
            uinfo.remember = "1";
            //if(uinfo.roletype=="2"){
                login(uinfo);
            //}

        }
    //}else{
    //    changePage("welcomepage1","none");
    //}

    //$("#welcome1").bind("swipeleft tap",function(){
    //    changePage("welcomepage2");
    //});
    //$("#welcome2").bind("swipeleft tap",function(){
    //    changePage("welcomepage3");
    //});
    //$("#welcome3").bind("swipeleft tap",function(){
    //    changePage("welcomepage4");
    //});
    //$("#welcome4").bind("swipeleft tap",function(){
    //    changePage("welcomepage5");
    //});
    //$("#welcome5").bind("swipeleft tap",function(){
    //    changePage("welcomepage6");
    //});
    //$("#welcome6").bind("swipeleft tap",function(){
    //    changePage("loginpage");
    //    localStorage['welcomed'] = "yes";
    //});

	
	

});
var userinfo = null;
function login(uinfo){
    var fdata = uinfo || serializeObject($("#loginform"));
    if($.trim(fdata.username)=="" || $.trim(fdata.passwd) == ""){
        showLoader("请输入用户名或密码！",true);
        return;
    }
    fdata.table="user";
    ajaxCallback("findJ",fdata,function(data){
       if(!data){
           showLoader("用户名或密码错误",true);
           changePage("loginpage");
       }else{

           showLoader("登录成功!",true);
           //bindClient();
           userinfo = data;
            $.ajax({
                	url:  clientUrl + "listHobbysubByUserid",
                	data: {
                		userid: userinfo.id
                	},
                	async: false,
                	dataType: 'json',
                	success: function(da){
                		userinfo.hobbynames = JSON.stringify(da);
                	}
                });
                
                
            
           toMain();
           
           loadRecommndFriend(userinfo.id);
           
           if(fdata.remember == "1"){
                 var d = JSON.stringify(data);
                localStorage["userinfo"] = d;
                
           }else{
               localStorage["userinfo"] = "";
           }


           //toGoods();
           /*if(userinfo.roletype==2){
                toVideoList();
           }else{
               ajaxCallback("getShop",{id:userinfo.sid},function(data){
                   focushop = data;
                   toMyBill();
                   startBillListLoop();
               });

           }*/


       }
    });
}

function toSettingPage(){
    changePage('settingpage')
}

function logout(){
    userinfo = null;
    localStorage['userinfo'] = "";
    toLogin();
}

function toRegister(){
	changePage("registerpage"); 
 	$.ajax({
 		 url: clientUrl + "list",
         dataType: "json",
         type: 'post',
         data: {
         	"table": "hobby"
         },
         success: function(data){
         	$("#home_hobbyid").refreshShowSelectMenu(data,"全部","id","name");
         	loadHobbysub();
         }
 	});
}

function loadHobbysub(){
	var value = $("#home_hobbyid").val();
	// if(value == null){return;}
	$.ajax({
 		 url: clientUrl + "listHobbysub",
         dataType: "json",
         type: 'post',
         data: {
         	"hobbyid": value
         },
         success: function(data){
         	 var html = "";
		       
		        if(data && data.length){
		            var id = "id";
		            var text = "name";
		
		            var tpl = '<option value="%s">%s</option>';
		            var colums = [id,text];
		
		            for(var i=0;i<data.length;i++){
		                var op = rrplace(tpl,colums,data[i]);
		                html+=op;
		            }
		        }
		        $("#home_hobbysubid").html(html);
		        $("#home_hobbysubid").selectmenu('refresh');
         }
 	});
}

function loadRecommndFriend(userid){
  var fppt = {};
    fppt.tpl = '<li onclick="toUserInfo(%s);">'+
        '<img src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '</li>';
    fppt.colums = ["id","img","username","sex"];

    $("#recommendFriendlIST").data("property",JSON.stringify(fppt));
    
    
    $.ajax({
 		 url: clientUrl + "recommendFriend",
         dataType: "json",
         type: 'post',
         async: false,
         data: {
         	"userid": userid
         },
         success: function(data){
        	$("#recommendFriendlIST").refreshShowListView(data);
         }
 	});
}

 

function setNote(){
	
	var text = $("#home_hobbysubid option:selected").text();
	showLoader(text,true);
	$("#home_note").val(text);
}

function toLogin(){
    $($(':input','#loginform').get(1)).val("");
    changePage("loginpage");
}

function register(){

    var fdata = serializeObject($("#registerform"));
    if($.trim(fdata.username) == "" || $.trim(fdata.passwd) == "" || $.trim(fdata.tel) == ""){
        showLoader("请填写完整信息!",true);
        return;
    }
    if(fdata.tel.length<11){
        showLoader("电话号码格式不对!",true);
        return;
    }
    if(fdata.passwd != fdata.passwd2){
        showLoader("两次密码不一致!",true);
        return;
    }
    
    if(fdata.subs == null || fdata.subs == ''){
    	showLoader("至少选择一个爱好!",true);
        return;
    }
    /*if(uploadFileUrl){
        uplaodImg(function(r){
            fdata.img = r;
            commitRegiesterInfo(fdata);
        });
    }else{*/
    ajaxFormUploadFile(function (r){
        fdata.img = r;
        commitRegiesterInfo(fdata);
    });

    //}


}

function commitRegiesterInfo(fdata){
    fdata.table="user";
    fdata.roletype="2";
    ajaxCallback("findJ",fdata,function(d){
        if(!d){
            ajaxCallback("saveJ",fdata,function(r){
                if(r.info){
                    showLoader("注册成功!",true);
                    userinfo = fdata;
                    userinfo.id = r.info;
                    //addAddress();
                    toLogin();
                }else{
                    showLoader("注册失败请稍候再试!",true);
                }
                uploadFileUrl = null;
            });
        }else{
            showLoader("用户名已存在!",true);
        }
    });
}

function myinfo(){
    if(!userinfo){
        changePage("loginpage");
        return;
    }
    changePage("userinfopage");
    $("#editbutton").hide();
    $("#vusername").text(userinfo.username);
    $("#myhob").val(userinfo.hobbynames);
    $("#vtel").val(userinfo.tel);
    $("#vqq").val(userinfo.qq);
    $("#vwechat").val(userinfo.wechat);
    $("#vsex").val(userinfo.sex);
    $("#vbirth").val(userinfo.birth);
    $("#vemail").val(userinfo.email);
    $("#vaddress").val(userinfo.address);
    $("#vimg").val(userinfo.img);
    $("#vnote").val(userinfo.note);
    $("#rmyImage2").attr("src",fileurl+userinfo.img);
    
    $.ajax({
 		 url: clientUrl + "list",
         dataType: "json",
         type: 'post',
         data: {
         	"table": "hobby"
         },
         success: function(data){
         	$("#edit_hobbyid").refreshShowSelectMenu(data,"全部","id","name");
         	loadEditHobbysub();
         }
 	});
    
}

function loadEditHobbysub(){
	var value = $("#edit_hobbyid").val();
	$.ajax({
 		 url: clientUrl + "listHobbysub",
         dataType: "json",
         type: 'post',
         data: {
         	"hobbyid": value
         },
         success: function(data){
         	var html = "";
	        if(data && data.length){
	            var id = "id";
	            var text = "name";
	
	            var tpl = '<option value="%s">%s</option>';
	            var colums = [id,text];
	
	            for(var i=0;i<data.length;i++){
	                var op = rrplace(tpl,colums,data[i]);
	                html+=op;
	            }
	        }
	        $("#edit_hobbysubid").html(html);
	        $("#edit_hobbysubid").selectmenu('refresh');
         }
 	});
}

function editUserInfo(){
    $("#editbutton").show();
}

function updateUserInfo(){
    var fdata = serializeObject($("#userform"));
    fdata.id = userinfo.id;
    /*if(uploadFileUrl){
        uplaodImg(function(r){
            fdata.img = r;
            commitUpdateUserInfo(fdata);
        });
    }else{*/
        commitUpdateUserInfo(fdata);
    //}
}

function commitUpdateUserInfo(fdata){
    fdata.table = "user";
    ajaxCallback("saveJ",fdata,function(user){
        if(user){
            showLoader("保存成功!",true);
            userinfo = fdata;
            
            
             $.ajax({
                	url:  clientUrl + "listHobbysubByUserid",
                	data: {
                		userid: userinfo.id
                	},
                	async: false,
                	dataType: 'json',
                	success: function(da){
                		userinfo.hobbynames = JSON.stringify(da);
                	}
                });
            
            
            uploadFileUrl = null;
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function toChangePasswd(){
    $("#pusername").text("用户名:"+userinfo.username);
    changePage("passwdpage");
}

function changePasswd(){
    var fdata = serializeObject($("#passwdform"));
    fdata.id = userinfo.id;
    if(fdata.oldpasswd != userinfo.passwd){
        showLoader("原始密码错误！",true);
        return;
    }
    if($.trim(fdata.passwd) == ""){
        showLoader("密码不能为空！",true);
        return;
    }
    if(fdata.passwd != fdata.passwd2){
        showLoader("两次密码不一致！",true);
        return;
    }
    userinfo.passwd = fdata.passwd;
    userinfo.table="user";
    ajaxCallback("saveJ",userinfo,function(r){
        if(r){
            showLoader("保存成功!",true);
            setTimeout(function(){
                toLogin();
            },2000);
        }else{
            showLoader("保存失败,请稍候再试!",true);
        }
    });
}

function toMore(){
    changePage('morepage');
    $("#myname").text(userinfo.username);
    if(userinfo.img){
        $("#myphoto2").attr("src",fileurl+userinfo.img);
    }

    //$("#mylevel").text(":"+userinfo.qd);
}

/***************************************用户模块*******************************************/

function clickTag(el){
    if($(el).hasClass("tagfocus")){
        $(el).removeClass("tagfocus");
    }else{
        $(el).addClass("tagfocus");
    }
}
function sureBiaoqian(){
    var ysels = $("#yingshictn .tagfocus");
    var zxels = $("#zixunctn .tagfocus");
    var ysid = "";
    var zxid = "";
    /*for(var i=0;i<ysels.length;i++){
        if(ysid!=""){
            ysid += ","+$(ysels[i]).data("value");
        }else{
            ysid = $(ysels[i]).data("value");
        }
    }*/
    for(var i=0;i<zxels.length;i++){
        if(zxid!=""){
            zxid += ","+$(zxels[i]).data("value");
        }else{
            zxid = $(zxels[i]).data("value");
        }
    }

    ajaxCallback("saveJ",{tags:zxid,id:userinfo.id,table:"user"},function(data){
        userinfo.tags = zxid;
        showLoader("操作成功!",true);
    });
}

function toTags(){
    changePage('tagpage');
    ajaxCallback("listJ",{table:"type"},function(data){
        var zxhtml = '<span>设置标签:</span>';
        var yshtml = '<span>影视标签:</span>';
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            //if(obj.ttype==1){
            zxhtml+='<span onclick="clickTag(this);" data-value="'+obj.id+'" class="tagitem">'+obj.title+'</span>';
            /*}else{
                yshtml+='<span onclick="clickTag(this);" data-value="'+obj.id+'" class="tagitem">'+obj.title+'</span>';
            }*/
        }

        //$("#yingshictn").html(yshtml);
        $("#zixunctn").html(zxhtml);
    });
}













/****************************************************在线收藏***********************************/
function toFavs(){
    changePage("favspage");
    ajaxCallback("listJ",{table:"type"},function (data) {
        $("#ftypeid").refreshShowSelectMenu(data);
        listMyFav();
    });

}


function listMyFav(){
    var typeid = $("#ftypeid").val();
    var kllshow = 0;

    var sql = "select * from wct_blog where id in ("+userinfo.favs+")";
    if(typeid){
        sql+=" and typeid="+typeid;
    }
    ajaxCallback("listSqlJ",{sql:sql},function (data) {
        var ltpl = {};
        ltpl.tpl = '<li onclick="blogDetail(%s);">'+
            '<img style="height: 100px;margin: 10px 0 0 10px" src="'+fileurl+'%s">'+
            '<h2>%s</h2>'+

            '<p style="color: red;">%s</p>'+
            '</li>';
        ltpl.colums = ["id","img","title","typecn"];
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            kllshow+=obj.kll*1;
        }
        $("#kllshow").text("热量/消耗卡洛里:"+kllshow);
        $("#favslist").data("property",JSON.stringify(ltpl));
        $("#favslist").refreshShowListView(data);
    })
}




function toggleFavs(){
    if(checkFavs()){
        deleteFavs();
    }else{
        saveFavs();
    }
}

function checkFavs(){
    var favs = userinfo.favs;
    var flag = false;
    $("#favbtn").text("加入收藏");
    if(favs){
        favs+="";
        var favarray = favs.split(",");
        for(var i=0;i<favarray.length;i++){
            if(favarray[i]==focusobj.id){
                $("#favbtn").text("移除收藏");
                flag = true;
                break;
            }
        }
    }


    return flag;

}


function saveFavs(){
    var favs = userinfo.favs;
    if(favs){
        favs+="";
        var favarray = favs.split(",");
        var flag = true;
        for(var i=0;i<favarray.length;i++){
            if(favarray[i]==focusobj.id){
                flag = false;
                break;
            }
        }
        if(flag){
            favs+=","+focusobj.id;
        }
    }else{
        favs = focusobj.id;
    }

    ajaxCallback("saveJ",{table:"user",favs:favs,id:userinfo.id},function (data) {
        showLoader("操作成功!",true);
        userinfo.favs = favs;
        checkFavs();
        addFavCount();
    })

}

function addFavCount(){
    var favcount = focusobj.favcount||0;
    favcount+=1;
    ajaxCallback("saveJ",{table:"blog",id:focusobj.id,favcount:favcount},function (data) {

    });
}

function deleteFavs(gid){
    var id = gid || focusobj.id;
    var favs = userinfo.favs;
    var tfavs = "";
    if(favs){
        favs+="";
        var favarray = favs.split(",");
        for(var i=0;i<favarray.length;i++){
            if(favarray[i]==id){
                continue;
            }else{
                if(tfavs==""){
                    tfavs = favarray[i];
                }else{
                    tfavs+=","+favarray[i];
                }
            }
        }

    }

    ajaxCallback("saveJ",{table:"user",favs:tfavs,id:userinfo.id},function (data) {
        showLoader("操作成功!",true);
        userinfo.favs = tfavs;
        if(gid){
            toFavs();
        }else{
            checkFavs();
        }

    })

}







/****************************************************在线收藏***********************************/


function toDaka(){
    changePage('dakapage');
    ajaxCallback("listJ",{uid:userinfo.id,table:"daka"},function(data){
        var pd = {};
        pd.tpl = '<li>' +
            //'<img style="height: 80px;" src="'+fileurl+'%s"/>'+
            '<h2>%s</h2>'+
            '</li>';
        pd.colums = ["ndate"];
        $("#dakalist").data("property",JSON.stringify(pd));
        $("#dakalist").refreshShowListView(data);
    });
}

function daka(){
    var ndate = getNdateNian();
    ajaxCallback("listJ",{uid:userinfo.id,ndate:ndate,table:"daka"},function(data){
        if(data&&data.length){
            showLoader("已经打过了!",true);
        }else{
            ajaxCallback("saveJ",{uid:userinfo.id,ndate:ndate,table:"daka"},function(data2){
                toDaka();
            });
        }
    });
}


function addFs(uid){
    ajaxCallback("findJ",{table:"user",id:uid},function (fuser) {
        var fs = fuser.fs;
        if(fs){
            fs+=1;
        }else{
            fs = 1;
        }
        ajaxCallback("saveJ",{table:"user",id:uid,fs:fs},function (data) {

        });
    });

}






/***************************************************************************课程表相关*******************************/
var _focusDay = "day1";
var _focusJie = 0;
var _kebiao = {
    "day1":[],
    "day2":[],
    "day3":[],
    "day4":[],
    "day5":[],
    "day6":[],
    "day7":[]
};
function toKebiao(){
    changePage("kebiaopage");
    loadDay();
}
function loadDay(){
    var day = $("#dayselect").val();
    _focusDay = day;
    var kebiao = localStorage['kebiao'];
    if(kebiao && kebiao!='undefined'){
        kebiao = JSON.parse(kebiao);
        _kebiao = kebiao;
    }else{
        kebiao = _kebiao;
    }

    var list = kebiao[day];
    list = list||[];
    var lis = "";
    for(var i=0;i<10;i++){
        var index = i+1;
        var title = list&&list[i]&&list[i]["title"];
        title = title||"";
        var room = list&&list[i]&&list[i]["room"];
        room = room || "";
        var teacher = list&&list[i]&&list[i]["teacher"]||"";
        var fweek = list&&list[i]&&list[i]["fweek"]||"";
        var bweek = list&&list[i]&&list[i]["bweek"]||"";
        lis += "<li onclick='toEditKebiao("+i+");'><h1>第"+index+"节:"+title+"</h1><p>教室:"+room+"</p><p>班级:"+teacher+"</p><p>开始周:"+bweek+"</p><p>结束周:"+fweek+"</p></li>";
    }
    $("#kebiaoList").html(lis);
    $("#kebiaoList").listview('refresh');
}
function toEditKebiao(jie){
    _focusJie = jie;
    changePage("editkebiaopage");
    var list = _kebiao[_focusDay];
    list = list||[];
    var title = list&&list[_focusJie]&&list[_focusJie]["title"];
    title = title||"";
    var room = list&&list[_focusJie]&&list[_focusJie]["room"];
    room = room || "";
    var teacher = list&&list[i]&&list[i]["teacher"]||"";
    var fweek = list&&list[i]&&list[i]["fweek"]||"";
    var bweek = list&&list[i]&&list[i]["bweek"]||"";
    $("#ktitle").val(title);
    $("#kroom").val(room);
    $("#teacher").val(teacher);
    $("#fweek").val(fweek);
    $("#bweek").val(bweek);
}
function editKebiao(){
    var title = $("#ktitle").val();
    var room = $("#kroom").val();
    var fdata = serializeObject($("#kebiaoform"));
    _kebiao[_focusDay][_focusJie] = {};
    _kebiao[_focusDay][_focusJie]["title"] = title;
    _kebiao[_focusDay][_focusJie]["room"] = room;
    _kebiao[_focusDay][_focusJie]["bweek"] = fdata.bweek;
    _kebiao[_focusDay][_focusJie]["fweek"] = fdata.fweek;
    _kebiao[_focusDay][_focusJie]["teacher"] = fdata.teacher;
    localStorage['kebiao'] = JSON.stringify(_kebiao);
    toKebiao();
}

/***************************************************************************课程表相关*******************************/



function toTouxiang(){
    changePage('touxiangpage');
}
function saveTouxiang(){
    ajaxFormUploadFile(function (r){
        if(r){
            userinfo.img = r;
            ajaxCallback("saveJ",{id:userinfo.id,img:r,table:"user"},function (data) {
                showLoader("操作成功!",true);
            });
        }

    })
}




