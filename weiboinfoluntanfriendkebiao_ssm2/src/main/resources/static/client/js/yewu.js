



var focuslist = [];
var focusshop = null;
var focuszhuanye = null;
var focusobj = null;
var editor = null;




$(function(){
    /*$("div[data-role='header']").addClass("ideaheader");
    $("div[data-role='footer']").addClass("ideafooter");
    $("div[data-role='navbar']").addClass("ideafooter");
    $("div[data-role='page']").addClass("ideapage");*/

    $("div[data-role='header']").addClass("ideaheader");
    /*$("div[data-role='footer']").addClass("ideafooter");
    $("div[data-role='navbar']").addClass("ideafooter");*/
    $("div[data-role='page']").addClass("ideapage");





    $("#pinglunclick").click(function(e){
        var offsetx = e.offsetX;
        var widht = 0;
        if(offsetx>0 && offsetx<35){
            widht = 35;
        }else if(offsetx>=35 && offsetx<70){
            widht = 70;
        }else if(offsetx>=70 && offsetx<105){
            widht = 105;
        }else if(offsetx>=105 && offsetx<140){
            widht = 140;
        }else if(offsetx>=140){
            widht = 175;
        }
        $("#starwidht").css({width:widht+"px"});
    });



});

function createEditor(){
    if(editor==null){
        var E = window.wangEditor;
        editor = new E('#editor');
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.config.uploadImgShowBase64 = false;   // 使用 base64 保存图片
        editor.config.uploadImgServer = _editorUpload;
        editor.config.uploadVideoServer = _editorUploadVideo;
        editor.config.uploadFileName = 'file';
        editor.config.uploadVideoName = 'file';
        editor.config.uploadVideoHooks = {
            // 上传视频之前
            before: function(xhr) {
                console.log(xhr)

                // 可阻止视频上传
                /*return {
                    prevent: true,
                    msg: '需要提示给用户的错误信息'
                }*/
            },
            // 视频上传并返回了结果，视频插入已成功
            success: function(xhr) {
                console.log('success', xhr)
            },
            // 视频上传并返回了结果，但视频插入时出错了
            fail: function(xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传视频出错，一般为 http 请求的错误
            error: function(xhr, editor, resData) {
                console.log('error', xhr, resData)
            },
            // 上传视频超时
            timeout: function(xhr) {
                console.log('timeout')
            },
            // 视频上传并返回了结果，想要自己把视频插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
            customInsert: function(insertVideoFn, result) {
                // result 即服务端返回的接口
                console.log('customInsert', result)

                // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
                insertVideoFn(fileurl+result.data.url)
            }
        }

        editor.config.uploadImgHooks = {
            // 上传视频之前
            before: function(xhr) {
                console.log(xhr)

                // 可阻止视频上传
                /*return {
                    prevent: true,
                    msg: '需要提示给用户的错误信息'
                }*/
            },
            // 视频上传并返回了结果，视频插入已成功
            success: function(xhr) {
                console.log('success', xhr)
            },
            // 视频上传并返回了结果，但视频插入时出错了
            fail: function(xhr, editor, resData) {
                console.log('fail', resData)
            },
            // 上传视频出错，一般为 http 请求的错误
            error: function(xhr, editor, resData) {
                console.log('error', xhr, resData)
            },
            // 上传视频超时
            timeout: function(xhr) {
                console.log('timeout')
            },
            // 视频上传并返回了结果，想要自己把视频插入到编辑器中
            // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
            customInsert: function(insertImgFn, result) {
                // result 即服务端返回的接口
                console.log('customInsert', result)

                // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
                insertImgFn(fileurl+result.data[0])
            }
        }
        editor.create();
    }
}

function toNotice(){
    changePage("noticepage");
    listNotice();
}
function toMyBlog(uid){
    changePage("myblogpage");
    var ltpl = {};
    ltpl.tpl = '<li onclick="blogDetail(%s);">'+
        '<img style="height: 100px;margin: 10px 0 0 10px" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">%s</p>'+
        '</li>';
    ltpl.colums = ["id","img","title","typecn","address"];
    $("#bloglist3").data("property",JSON.stringify(ltpl));
    ajaxCallback("listJ",{table:"blog",btype:2,uid:uid},function (list) {
        $("#bloglist3").refreshShowListView(list);
    })
}
function toBlogTuijian(){
    changePage("tuijianpage");
    /*ajaxCallback("listJ",{table:"notice"},function(data){
        focuslist = data;
        $("#noticelist2").refreshShowListView(data);
    });*/
    var ltpl = {};
    ltpl.tpl = '<li onclick="blogDetail(%s);">'+
        '<img style="height: 100px;margin: 10px 0 0 10px" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">%s</p>'+
        '</li>';
    ltpl.colums = ["id","img","title","typecn","address"];
    $("#bloglist2").data("property",JSON.stringify(ltpl));
    ajaxCallback("listJ",{table:"user"},function (userlist) {
        var tgids = "";
        var sql = "";
        var favs = userinfo.favs||"";
        //if(favs==""){
        if(userinfo.tags){
            tgids = userinfo.tags;
        }

        sql = "select * from wct_blog where typeid in ("+tgids+")";
        //}else{
        /**
         * 计算纬度
         */
        var weidulist = [];
        for(var i=0;i<userlist.length;i++){
            var weidu = {};
            var user = userlist[i];
            if(user.id==userinfo.id){
                continue;
            }
            var ufavs = user.favs;//别人的收藏
            if(ufavs){
                var wd = 0;
                ufavs+="";
                var ufarray = ufavs.split(",");
                if(favs){
                    favs+="";
                    var farray = favs.split(",");//我的收藏
                    for(var j=0;j<ufarray.length;j++){
                        for(var k=0;k<farray.length;k++){
                            if(ufarray[j]==farray[k]){
                                wd++;
                            }
                        }
                    }
                    weidu.favs = ufavs;
                    weidu.wd = wd;
                    weidulist.push(weidu);
                }else{
                    tgids = ufavs;
                    break;
                }

            }else{
                weidu.wd = 0;
            }
        }

        if(weidulist.length){
            weidulist = weidulist.sort(function (o1,o2) {
                return o1.wd-o2.wd;
            });

            var len = 5;
            if(len>weidulist.length){
                len = weidulist.length;
            }

            var wfavs = ""
            for(var i=0;i<len;i++){
                if(wfavs==""){
                    wfavs = weidulist[i]['favs'];
                }else{
                    wfavs += ","+weidulist[i]['favs'];
                }
            }

            var wfarray = wfavs.split(",");

            for(var i=0; i<wfarray.length; i++){
                for(var j=i+1; j<wfarray.length; j++){
                    if(wfarray[i]==wfarray[j]){         //第一个等同于第二个，splice方法删除第二个
                        wfarray.splice(j,1);
                        j--;
                    }
                }
            }

            var favlist = wfarray;

            for(var i=0;i<favlist.length;i++){
                if(tgids==""){
                    tgids = favlist[i];
                }else{
                    tgids+=","+favlist[i];
                }
            }

            if(!tgids){
                tgids = userinfo.tags;
            }

        }
        sql = "select * from wct_blog where typeid in ("+tgids+")";
        //}



        ajaxCallback("listSqlJ",{sql:sql},function (data) {
            $("#bloglist2").refreshShowListView(data);
        })


    })
}
function listNotice(){
    var p66662 = {};
    p66662.tpl = '<li onclick="noticeDetail(%s)">'+
        '<img src="'+fileurl+'%s" style="height: 80px;margin: 10px;0 0 10px;">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+

        '</li>';
    p66662.colums = ["id","img","title","jnote"];
    $("#noticelist").data("property",JSON.stringify(p66662));
    var typeid = ($("#stypeid").val())||null;
    ajaxCallback("listJ",{table:"notice",typeid:typeid},function(data){
        focuslist = data;
        $("#noticelist").refreshShowListView(data);
    });
}

function orderNotice(sort){
    ajaxCallback("listJ",{table:"notice",sort:sort,order:"desc"},function(data){
        focuslist = data;
        $("#noticelist").refreshShowListView(data);
    });
}
function delNotice(){
    ajaxCallback("deleteJ",{table:"notice",id:focusobj.id},function (data) {
        showTipTimer("操作成功!",function (){
            toNotice();
        })
    });
}
function noticeDetail(id){
    $("#myctn2").hide();
    ajaxCallback("findJ",{table:"notice",id:id},function (obj) {
        focusobj = obj;
        changePage('noticedetailpage');
        //$("#noticedetailpage").removeClass("ideapage");
        /*$("#dimg").attr("src",fileurl+obj.img);*/
        $("#vtitle").text(obj.title);
        $("#vfnote").text(obj.fnote);
        $("#vpf").text("推荐指数:"+obj.pf);
        var html = obj.note.replace(/upload/g,fileurl);
        $("#notehtml").html(html);
        showAttach("showimg",obj.img);
        showAttach("showvideo",obj.video);
        listReplay();
        if(focusobj.uid==userinfo.id){
            $("#myctn2").show();
        }

        //checkFavs();
    });

    //$("#vndate").text("时间:"+obj.ndate);
}

function toBlog(){
    changePage("mainpage");
    listBlog();
}

function delBlog(){
    ajaxCallback("deleteJ",{table:"blog",id:focusobj.id},function (data) {
        showTipTimer("操作成功!",function (){
            toBlog();
        })
    });
}

function listBlog(sort){
    var ltpl = {};
    ltpl.tpl = '<li onclick="blogDetail(%s);">'+
        '<img style="height: 100px;margin: 10px 0 0 10px" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p>%s</p>'+
        '<p style="color: red;">%s</p>'+
        '</li>';
    ltpl.colums = ["id","img","title","address","typecn"];
    $("#bloglist").data("property",JSON.stringify(ltpl));
    var typeid = ($("#stypeid").val())||null;
    var order = null;
    if(sort){
        order = "desc";
    }

    ajaxCallback("listJ",{table:"blog",typeid:typeid,sort:sort,order:order},function (listdata) {
        focuslist = listdata;
        $("#bloglist").refreshShowListView(listdata);
    })
}

function blogDetail(id){
    $("#myctn").hide();
    ajaxCallback("findJ",{table:"blog",id:id},function (data) {
        focusobj = data;
        $("#zanshow").text(data.zan);
        changePage('blogdetailpage');
        $("#btitle").text("标题:"+data.title);
        //$("#bnote").text(data.note);
        var html = data.note;
        if(html.indexOf("http://")==-1){
            html = data.note.replace(/upload/g,fileurl);
        }
        $("#bnote").html(html);
        $("#buser").text("作者:"+data.username);
        if(data.nm=="1"){
            $("#buserctn").hide();
        }else{
            $("#buserctn").show();
        }
        $("#bndate").text("更新时间:"+data.ndate);
        showAttach("showattach1",data.img);
        showAttach("showattach2",data.video);
        checkFavs();
        listReplay();
        if(userinfo.id==focusobj.uid){
            $("#myctn").show();
        }
    });
}

function toMgBlog(){
    changePage('blogmgpage');
    ajaxCallback("listJ",{table:"type"},function (data) {
        $("#fcity").refreshShowSelectMenu(data,"全部","id","title");
        $("#blogform")[0].reset();
        showAttach("pt2",null);
        showAttach("pt3",null);
    });
    setTimeout(function (){
        createEditor();
        editor.txt.html("");
    },400);
}

function zan(){
    var money = focusobj.zan;
    if(money){
        money+=1;
    }else{
        money = 1;
    }
    focusobj.zan = money;
    ajaxCallback("saveJ",{id:focusobj.id,table:"blog",zan:money},function(data){
        $("#zanshow").text(money);
    });
}

function saveBlog(){
    var fdata = serializeObject($("#blogform"));
    fdata.uid = userinfo.id;
    fdata.username = userinfo.username;
    fdata.typecn = $("#fcity").find("option:selected").text();
    fdata.note = editor.txt.html();
    fdata.btype = 2;

    ajaxFormUploadFile(function(img){
        if(img){
            fdata.img = img;
        }
        ajaxFormUploadFile2(function (v){
            fdata.video = v;
            fdata.table="blog";
            ajaxCallback("saveJ",fdata,function(){
                showTipTimer("发布成功!",function (){
                    toBlog();
                });
            });
        })

    });
}


function toTiaokuan(){
    ajaxCallback("findJ",{table:"tiaokuan"},function (obj) {
        changePage('tiaokuandetailpage');
        $("#tiaokuandetailpage").removeClass("ideapage");
        var html = obj.note.replace(/upload/g,fileurl);
        $("#notehtml2").html(html);

    });
}

function toUserPage(){
    changePage("userpage");
    var ltpl = {};
    ltpl.tpl = '<li>'+
        '<img style="height: 100px;margin: 10px 0 0 10px" src="'+fileurl+'%s">'+
        '<h2>%s</h2>'+
        '<p style="color: red;">消耗卡洛里:%s</p>'+
        '</li>';
    ltpl.colums = ["img","username","qd"];
    $("#userlist").data("property",JSON.stringify(ltpl));
    ajaxCallback("listJ",{table:"user",roletype:"2"},function (listdata) {

        listdata = listdata.sort(function (o1,o2){
            return o2.qd*1-o1.qd*1;
        });
        $("#userlist").refreshShowListView(listdata);
    })
}


function toMgNotice(){
    if(userinfo.roletype=="2"){
        showLoader("企业权限才能新增!",true);
        return;
    }
    changePage('noticemgpage');
    /*ajaxCallback("listJ",{table:"type"},function (data) {
        $("#fcity").refreshShowSelectMenu(data,"全部","id","title");
    });*/
}

function saveNotice(){
    var fdata = serializeObject($("#noticeform"));
    fdata.uid = userinfo.id;
    fdata.username = userinfo.username;
    fdata.typecn = $("#fcity").find("option:selected").text();

    ajaxFormUploadFile(function(img){
        if(img){
            fdata.img = img;
        }
        ajaxFormUploadFile2(function (v){
            fdata.video = v;
            fdata.table="notice";
            ajaxCallback("saveJ",fdata,function(){
                showTipTimer("发布成功!",function (){
                    toNotice();
                });
            });
        })

    });
}


function toChatIframe(flag){
    changePage("webcontent");
    var uid = userinfo.id;
    var fid = focusobj.uid;
    $("#webiframe").attr("src","chatplugs/chatplugs.html?uid="+uid+"&fid="+fid);
}
function toChatIframe2(flag){
    /*changePage("webcontent");
    var uid = userinfo.id;*/
    var fid = focusobj.qid;
    //$("#webiframe").attr("src","chatplugs/chatplugs.html?uid="+uid+"&fid="+fid);
    toUserInfo(fid)
}
/*function toMyFriend(){
    changePage("webcontent");
    $("#webiframe").attr("src","chatplugs/chatplugs.html?uid="+userinfo.id);
}*/


function toMain(){
    changePage("mainpage");
    ajaxCallback("listJ",{table:"type"},function (data) {
        $("#stypeid").refreshShowSelectMenu(data,"全部","id","title");
    });
    listBlog();
    setTimeout(function (){
        initswiper();
    },500);

    if(userinfo.roletype=="3"){
        $(".teacher").show();
    }else{
        $(".teacher").hide();
    }

}


var focuspost = null;
var postslist = [];
function replayUser(username){
    $("#rnote").val("回复 "+username+":");
    $("#rnote2").val("回复 "+username+":");
}


function listPosts(id){
    ajaxCallback("listJ",{uid:id,table:"posts"},function(data){
        postslist = data;
        var p5post = {};
        p5post.tpl = '<li onclick="postDetail(%s);">'+
            '<h2>%s</h2>'+
            '<p style="color: red;">%s %s</p>'+
            '</li>';
        p5post.colums = ["id","title","username","ndate"];
        $("#posts").data("property",JSON.stringify(p5post));
        $("#posts").refreshShowListView(data);
    });
}
function toAddForm(){
    changePage("addformpage");
}
function addForm(){
    var note = $("#fnote").val();
    var title = $("#ftitle").val();
    var type = $("#ftype").val();
    ajaxFormUploadFile(function(r){
        ajaxCallback("saveJ",{uid:userinfo.id,title:title,note:note,username:userinfo.username,img:r,type:type,table:"posts"},function(){
            toLuntan();
        });
    });

}
function postDetail(id){
    var obj = getObjectById(id,postslist);
    focuspost = obj;
    focusobj = obj;
    changePage("postdetail");
    $("#vptitle").text("标题:"+obj.title);
    $("#vpnote").text("内容:"+obj.note);
    $("#vpusername").text("发布者:"+obj.username);
    $("#vpdate").text("时间:"+obj.ndate);
    //$("#pimg").attr("src",fileurl+obj.img);
    showAttach("pimg",obj.img);
    if(obj.uid == userinfo.id){
        $("#mypost").show();
    }else{
        $("#mypost").hide();
    }
    listReplay2();
}

function listReplay2(){
    ajaxCallback("listJ",{pid:focusobj.id,table:"replay",type:2,order:"desc",sort:"hot"},function(data){
        var ppostr62 = {};
        ppostr62.tpl = '<li>'+
            '<h2>%s %s</h2>'+
            '<p>%s</p>'+
            '<p><span style="color: #3e6790;" onclick="replayUser(\'%s\');">回复</span></p>'+
            '</li>';
        ppostr62.colums = ["ndate","username","note","username","username","uid"];
        $("#replays2").data("property",JSON.stringify(ppostr62));

        $("#replays2").refreshShowListView(data);
    });
}

function addReplay2(){
    if(!userinfo){
        toLogin();
        return;
    }
    var note = $("#rnote2").val();
    var hot = "0";
    if(userinfo.roletype=="3"){
        hot=1;
    }
    ajaxCallback("saveJ",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note,table:"replay",type:2,hot:hot},function(data){
        listReplay2();
        $("#rnote2").val("");
    });

}


function listReplay(){
    ajaxCallback("listJ",{pid:focusobj.id,table:"replay",type:1,order:"desc",sort:"hot"},function(data){
        var ppostr62 = {};
        ppostr62.tpl = '<li>'+
            '<h2>%s %s</h2>'+
            '<p>%s</p>'+
            '<p><span style="color: #3e6790;" onclick="replayUser(\'%s\');">回复</span></p>'+
            '</li>';
        ppostr62.colums = ["ndate","username","note","username","username","uid"];
        $("#replays").data("property",JSON.stringify(ppostr62));
        $("#replays").refreshShowListView(data);
    });
}

function addReplay(){
    if(!userinfo){
        toLogin();
        return;
    }
    var note = $("#rnote").val();
    var hot = "0";
    if(userinfo.roletype=="3"){
        hot=1;
    }
    ajaxCallback("saveJ",{pid:focusobj.id,uid:userinfo.id,username:userinfo.username,note:note,table:"replay",type:1,hot:hot},function(data){
        listReplay();
        $("#rnote").val("");
    });

}
function toLuntan(id){
    changePage("luntanpage");
    listPosts(id);
}
function delPosts(){
    ajaxCallback("deleteJ",{id:focuspost.id,table:"posts"},function(data){
        toLuntan();
    });
}

















function toBillMg(){
    changePage("infopage2");
}



function payBill() {
    var pdata = serializeObject($("#payform"));
    if(pdata.user==userinfo.username && pdata.pass==userinfo.passwd){
        var choose = $('input[name="payway"]:checked').val();
        var id = focusobj.id;
        var statecn = "已付款";
        var paytype = choose;
        focusobj.paytype=paytype;
        focusobj.statecn=statecn;
        focusobj.table="bill";
        disCharge(focusobj.total,function (){
            ajaxCallback("saveJ", focusobj, function (data) {
                showTipTimer("付款成功!", function () {
                    billDetail(focusobj.id);
                });
            });
        })

    }else{
        showLoader("用户名或密码错误!",true);
    }

}
function billDetail(id) {
    ajaxCallback("findJ",{id:id,table:"bill"},function (bill) {
        changePage("billgoodspage");
        focusobj = bill;
        showAttach("battach",bill.img);
        $("#btotal").text("价格:" + bill.total);
        $("#bndate2").text("下单时间:" + bill.ndate);
        $("#statecn").text("订单状态:" + bill.statecn);
        $("#bfenqi").text("详细说明:"+bill.note);
        if(bill.qid){
            var html = "<a href='#' onclick='toChatIframe2();'>摄影师:"+focusobj.qusername+"</a><a href='tel:"+focusobj.qtel+"' onclick=''>电话:"+focusobj.qtel+"</a>";
            $("#qsctn").html(html);
        }
        /*if (bill) {
            var gids = bill.gids;
            var sql="select * from wct_blog where id in ("+gids+")";
            ajaxCallback("listSqlJ", {sql: sql}, function (data) {
                var p7 = {};
                p7.tpl = '<li onclick="blogDetail(%s);">'+
                    '<img src="'+fileurl+'%s" class="ui-li-thumb">'+
                    '<h2>%s</h2>'+
                    '<p style="color: red;">%s 元</p>'+
                    '</li>';
                p7.colums = ["id","img","title","price"];
                $("#billgoods").data("property",JSON.stringify(p7));
                $("#billgoods").refreshShowListView(data);
            },true);
        }*/
        $("#paydiv").hide();
        $("#surediv").hide();
        $("#fahuodiv").hide();
        if(bill.uid==userinfo.id){
            if(bill.statecn=="待付款"){
                $("#paydiv").show();
            }else if(bill.statecn=="已付款"){
                $("#fahuodiv").show();
            }
        }else{
            if (bill.statecn == "待接单") {
                $("#surediv").show();
            }
        }
    });
}

function wancheng(){
    var fdata = {};
    fdata.id = focusobj.id;
    fdata.fnote = $("#fnote2").val();
    fdata.statecn="已完成";
    fdata.table="bill";
    ajaxCallback("saveJ",fdata,function (data) {
        toMyBill();
    });
}

function jiedan(){
    var fdata = {};
    fdata.id = focusobj.id;
    fdata.qid = userinfo.id;
    fdata.qusername = userinfo.username;
    fdata.qtel = userinfo.tel;
    fdata.statecn="待付款";
    fdata.table="bill";
    ajaxCallback("saveJ",fdata,function (data) {
        toMyBill();
    });
}

function toMyBill(){
    if(userinfo){
        changePage("mybillpage");
        mybillslist(userinfo.id);
    }else{
        changePage("loginpage");
    }

}

function mybillslist(uid,sid){
    var statecn = null;
    if(!uid && !sid){
        statecn = "待接单";
    }
    ajaxCallback("listJ",{uid:uid,qid:sid,table:"bill",statecn:statecn},function(data){
        var p4 = {};
        p4.tpl = '<li onclick="billDetail(%s);">'+
            '<h2>%s</h2>'+
            '<p>%s</p>'+
            '<p style="color: red;">价格:%s</p>'+
            '<p style="color: red;">状态:%s</p>'+
            '</li>';
        p4.colums = ["id","ndate","gnames","total","statecn"];
        $("#bills").data("property",JSON.stringify(p4));
        $("#bills").refreshShowListView(data);
    });
}

function tijiaouser(){
    var bill = serializeObject($("#billform"));
    bill.uid = userinfo.id;
    bill.user = userinfo.username;
    bill.gids = focusobj.id;
    bill.total = bill.price;
    bill.tel = userinfo.tel;
    bill.table="bill";
    bill.statecn="待接单";
    ajaxFormUploadFile(function (r){
        bill.img = r;
        ajaxCallback("saveJ",bill,function(){
            showLoader("订单提交成功!",true);
            showTipTimer("订单提交成功!",function(){
                toMyBill();
            });

        });
    })


    /*var sql="update wct_good set statecn='已订单' where id in ("+bill.gids+")";

    ajaxCallback("updateSqlJ",{sql:sql},function(data){

    });*/
}

function tijiao(){
    focusobj.count = $("#count").val();
    if(!userinfo){
        toLogin();
        return;
    }
    if(focusobj.uid==userinfo.id){
        showLoader("自己的无法提交!",true);
        return;
    }
    if(userinfo){
        changePage("infopage2");
        $("#ntel").text("电话:"+userinfo.tel);
        //$("#dizhi").text("地址:"+userinfo.address);
        $("#iscar2").val("1");
        setUserInfo();
        toggleWaimai();
    }else{
        changePage("infopage");
        $("#iscar").val("1");
    }
}
