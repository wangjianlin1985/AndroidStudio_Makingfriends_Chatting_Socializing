/**
 * Created by ideabobo on 2016/3/5.
 */
var _records = [];
var _result = {};
var _index = 0;
var _focustype = null;
var focusobj = {};
$(function(){
    //var type = getSearchParam('type');
    var p = {};
    p.tpl = '<li><a href="#" onclick="begaintest(%s);">'+
        '<h2>%s</h2>'+
        '</a></li>';
    p.colums = ["id","title"];
    $("#typelist").data("property",JSON.stringify(p));

    ajaxCallback("listJ",{table:"type"},function (data) {
        $("#typelist").refreshShowListView(data);
    });
    var uid = getSearchParam("uid");
    var typeid = getSearchParam("typeid");
    ajaxCallback("findJ",{table:"user",id:uid},function (data) {
        userinfo = data;
        begaintest(typeid);
    })

});
function begaintest(id) {

        ajaxCallback("listJ",{table:"choose"},function(data){
            if(data && data.length){
                changePage('testpage');
            }else{
                showLoader("没有题目!",true);
            }
            for(var i=0;i<data.length;i++){
                data[i].index = i+1;
            }
            _records = data;
            _index = 0;
            loadRecord();
        });

        /*ajaxCallback("findJ",{table:"type",id:id},function (data) {
            userinfo.typecn = data.title;
        })*/



}



function loadRecord() {
    $(".timuctn").hide();
    var cobj = _records[_index];
    focusobj = cobj;
    focusobj.isright = false;
    //focusobj.choose = focusobj.choose || "0";


    $("#title").text(focusobj.index + "." + focusobj.title);
    //$("#note").text(focusobj.note);
    //$("input[name='radio_name'][value='要选中Radio的Value值']").attr("checked",true);

   // if(_focustype==1){
        $("#xztctn").show();
        $("#atitle").text(focusobj.typecn);
        $("#opa").text("A."+focusobj.opa);
        $("#opb").text("B."+focusobj.opb);
        $("#opc").text("C."+focusobj.opc);
        $("#opd").text("D."+focusobj.opd);
    /*}else if(_focustype==2){
        $("#jdtctn").show();
    }*/

    //localStorage["_result"] = JSON.stringify(_result);
    //localStorage["iscontinue"] = _index + "";
}
function commit() {

    changePage("resultpage");

    var template = "<table style='width: 100%;' border='1' cellspacing='0'>"+
        "<tr>"+
        "<td></td>"+
        "<td></td>"+
        "</tr>"+
        "</table>";
    var timuhtml = "<table style='width: 100%;' border='1' cellspacing='0'><tr><td width='20%'>编号</td><td width='50%'>题目标题</td><td width='20%'></td><td width='30%'>答案</td></tr>";
    var fenshu = 0;
    for (var o in _result) {
        var obj = _result[o];
        /*var fenxi = "dp"+obj.choose;
         var op = "op"+obj.choose;*/
        var daan = "";

        if(obj.isright){
            daan = "答对!";
            fenshu+=5;
        }else{
            daan = "答错!";
        }
        var html= "<tr><td>"+obj.index+"</td><td>"+obj.title+"</td><td>"+daan+"</td><td>"+obj.daan+"</td></tr></tr>";
        timuhtml += html;
    }
    timuhtml+="</table>";
    var showhtml = template+timuhtml;

    showhtml+='<p style="color: red;font-size: 20px;text-align: center;">得分:'+fenshu+'</p>';
    $("#resultdiv").html(showhtml);
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    var hours = (today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours());
    var minutes = (today.getMinutes()) < 10 ? '0' + (today.getMinutes()) : (today.getMinutes());
    var seconds = (today.getSeconds()) < 10 ? '0' + (today.getSeconds()) : (today.getSeconds());
    var date1 = year + month + day + hours + minutes + seconds+"";
    var writeName = userinfo.an+date1+".xls";
    //_sharepath = myObj.writeToSD && myObj.writeToSD(writeName,showhtml);

    /*$("#r1").text("CRI = 0: " + r1.length);
     $("#r2").text("CRI < 50: " + r2.length);
     $("#r3").text("CRI >= 50: " + r3.length);
     var p = r1.length / _records.length;
     p = p * 100;
     p = p.toFixed(2);
     $("#r4").text("Process indicator (PI) : " + p + "%");*/
    //$("#ruser").text("UserName:" + userinfo.username);
    _index = 0;
    //localStorage["iscontinue"] = "";
    //localStorage["_result"] = "";
    //clearInterval(_systemtimmer);
    /*ajaxCallback("saveJ",{table:"defen",user:userinfo.username,score:fenshu,typecn:userinfo.typecn,ndate:getNdate()},function (data) {

    })*/

}


function next() {
    /*var choose = $('input[name="answer"]:checked').val();
     //focusobj.score = score * 1 * focusobj.weight;
     focusobj.choose = choose;*/
    checkIsRight();
    _result[_index] = focusobj;
    _index++;
    if (_index == _records.length - 1) {
        $("#next").text("提交");
    } else if (_index > _records.length - 1) {
        commit();
        return;
    }
    loadRecord();

}
function pre() {
    /*var choose = $("input[name='answer'][checked]").val();
     focusobj.choose = choose;*/
    checkIsRight();
    _result[_index] = focusobj;
    _index--;
    if (_index < 0) {
        _index = 0;
    }
    loadRecord();
}

function checkIsRight(){
    //if(_focustype==1){
        var choose = $("input[name='answer']:checked").val();
        if(focusobj.daan==choose){
            focusobj.isright = true;
        }
    /*}else if(_focustype==2){
        var choose = $("#jdtanswer").val();
        if(focusobj.daan == choose){
            focusobj.isright = true;
        }
    }*/
}


function goback(){
    window.location.href="index.html";
}

function fav(){
    showLoader("收藏成功!",true);
}
