/**
 * Created by ideabobo on 14-6-28.
 */

var rootUrl = "http://192.168.1.5:8088/";
var fileurl = rootUrl+"upload/";
var clientUrl = rootUrl+"database/";
var uploadUrl = rootUrl+"database/upload";
var _editorUpload = clientUrl+"editorUploadJ";
var _editorUploadVideo = clientUrl+"editorUploadVideoJ";


function toTest(){
    window.location.href="timutest.html?uid="+userinfo.id;
}
function ownpage(el){
    $("#showimg").css({"left":"0px","top":"0px"});
    changePage("imgshow");
    $("#showimg").attr("src",el.src);
    var imgcontaner = document.getElementById("showimg");
    var hammertime = Hammer(imgcontaner, {
        preventDefault: true
    });
    var lastScale = 1;
    var startX = 0;
    var startY = 0;
    var changeX = 0;
    var changeY = 0;
    var currentX = 0;
    var currentY = 0;
    var hasDoubleTap = false;
    hammertime.on("transform",function(ev){
        $(imgcontaner).css({"transform":"scale("+ev.gesture.scale*lastScale+","+ev.gesture.scale*lastScale+")"});
        lastScale = ev.gesture.scale;
        $("#showimg").css({"left":"0px","top":"0px"});
    });
    hammertime.on("dragstart",function(ev){
        $(imgcontaner).css({"transition": ""});
        startX = ev.gesture.center.clientX;
        startY = ev.gesture.center.clientY;
        currentX = $(imgcontaner).css("left").split("px")[0]*1;
        currentY = $(imgcontaner).css("top").split("px")[0]*1;
    });
    hammertime.on("drag",function(ev){
        changeX = ev.gesture.center.clientX-startX;
        changeY = ev.gesture.center.clientY-startY;
        $(imgcontaner).css("left",currentX+changeX);
        $(imgcontaner).css("top",currentY+changeY);
    });
    hammertime.on("doubletap",function(ev){
        $("#showimg").css({"left":"0px","top":"0px"});
        if(hasDoubleTap){
            $(imgcontaner).css({"transform":"scale(1,1)","transition": "all 200ms ease-in"});
            hasDoubleTap = false;
        }else{
            $(imgcontaner).css({"transform":"scale(6,6)","transition": "all 200ms ease-in"});
            hasDoubleTap = true;
        }

    });

}





var _mySwiper = null;
function  initswiper(){
    if(_mySwiper){
        return;
    }
    setTimeout(function (){
        ajaxCallback("listJ",{table:"notice"},function(data){
            var html = "";
            var len = 5;
            if(data.length<5){
                len = data.length-1;
            }
            for(var i=0;i<=len;i++){
                var obj = data[i];
                html+='<div onclick="toNotice(1);" style="height: 150px; background-image: url('+fileurl+obj.img+');background-size: 100% 100%;"  class="swiper-slide"></div>';
            }

            $("#swiperctn").html(html);
            _mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: true,

                // 如果需要分页器
                pagination: '.swiper-pagination',
                autoplay: 3000

                // 如果需要前进后退按钮
                //nextButton: '.swiper-button-next',
                //prevButton: '.swiper-button-prev',

                // 如果需要滚动条
                //scrollbar: '.swiper-scrollbar'
            });

        });
    },500);

}



/**
 * Created by ideabobo on 2015/12/24.
 */
// 基于准备好的dom，初始化echarts图表
var _chart1 = null;
var _chart2 = null;
function initChart1() {
    _chart1 = echarts.init(document.getElementById('chart1'));
    _chart2 = echarts.init(document.getElementById('chart2'));
    ajaxCallback("listJ",{table:"yiqing"},function(billlist){
        var totalall = 0;
        var totalnew = 0;

        var xarray = [];
        var yarray = [];
        var zarray = [];

        for(var j=0;j<billlist.length;j++){
            xarray.push(billlist[j].title);
            yarray.push(billlist[j].totalnew);
            zarray.push(billlist[j].total);
            totalall+=billlist[j].total*1;
            totalnew+=billlist[j].totalnew*1
        }
        $("#qgtotal").text(totalall+"人");
        $("#qgtotalnew").text(totalnew+"人");
        var option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                //formatter: "{a} <br/>{b}: {c} ({d}%)",
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : xarray,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'新增人数',
                    type:'bar',
                    barWidth: '60%',
                    data:yarray
                }
            ]
        };
        _chart1.setOption(option);


        var option2 = {
            xAxis: {
                type: 'category',
                data: xarray
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: zarray,
                type: 'line',
                smooth: true
            }]
        };

        _chart2.setOption(option2);
    });

}
