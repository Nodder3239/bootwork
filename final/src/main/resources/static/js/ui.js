var lastScrollTop = 0;
$(function(){
	/*gnb*/
	$('.gnb li a').mouseenter(function(){
		$('#gnb').addClass('on');
	});
	$('.headerArea').mouseleave(function(){
		$('#gnb').removeClass('on');
	});
	/*SELECT*/
	$(".selectTypeA").each(function() {
		var euiSelect = new ef.ui.Select($(this), {
			html : 
				"<div style='width:[width]'>" +
					"<p class='euiSelectMain'>" +
						"<span class='euiSelectTitle'></span>" +
					"</p>" +
					"<ul class='euiSelectList' style='display:none;'>" +
					"</ul>" +
				"</div>",
			visualClass : "eui_" + $(this).attr("class")
		});
		euiSelect.render();
	});
	$(".selectTypeB").each(function() {
		var euiSelect = new ef.ui.Select($(this), {
			html :
				"<div style='width:[width]'>" +
				"<p class='euiSelectMain'>" +
				"<span class='euiSelectTitle'></span>" +
				"</p>" +
				"<ul class='euiSelectList' style='display:none;'>" +
				"</ul>" +
				"</div>",
			visualClass : "eui_" + $(this).attr("class")
		});
		euiSelect.render();
	});
	$(".selectTypeC").each(function() {
		var euiSelect = new ef.ui.Select($(this), {
			html :
				"<div style='width:[width]'>" +
				"<p class='euiSelectMain'>" +
				"<span class='euiSelectTitle'></span>" +
				"</p>" +
				"<ul class='euiSelectList' style='display:none;'>" +
				"</ul>" +
				"</div>",
			visualClass : "eui_" + $(this).attr("class")
		});
		euiSelect.render();
	});
	//radio start
	radioAction($(document));

	$(document).click(function(e){
		if($('.cautionWrap').hasClass('on')){
			if(!$(e.target).parents('.cautionWrap').length == 1){
				cautionSlideStop();
			}
		}
		//footSelect
		if(!$(e.target).parents('.footSelect1').length == 1){
			$('.footSelect1').removeClass('on');
		}
		if(!$(e.target).parents('.footSelect2').length == 1){
			$('.footSelect2').removeClass('on');
		}
		if(!$(e.target).parents('.footSelect3').length == 1){
			$('.footSelect3').removeClass('on');
		}
	});
	$('.footSelect>a').click(function(){
		$(this).parent().addClass('on');
	});
	$('.footSelect ul a').click(function(){
		if($(this).parent().hasClass('basic')){
			$(this).parents('.footSelect').removeClass('on');
		}
	});
	//페이지별 재난행동요령
	$('#tipsSlide').slick({
		dots: true
	});
});
$(window).scroll(function(){
	//scolldown up
	var thisTop = $(this).scrollTop();
	if(thisTop > lastScrollTop){
		$('#header').addClass('sMode');
		$('#buypopup').addClass('sMode');
		$('#container').addClass('sMode');
	} else {
		$('#header').removeClass('sMode');
		$('#buypopup').removeClass('sMode');
		$('#container').removeClass('sMode');
	}
	lastScrollTop = thisTop;
	if(thisTop>0){
		$('body').addClass('scrolltop');
	}else{
		$('#header').removeClass('sMode');
		$('#buypopup').removeClass('sMode');
		$('#container').removeClass('sMode');
	}
	if($('.tips').length != 0){
		if($('.tips').offset().top){
			var tipsBot = $('.tips').offset().top - $(this).height() + $('.tips').height();
			var _tipsBot = $('.tips').offset().top - $(this).height();
			if(thisTop > tipsBot){
				$('.tips').addClass('aniOn');
			}
			if(thisTop < _tipsBot){
				$('.tips').removeClass('aniOn');
			}
		}
		//console.log();
	}
});

window.uiUtil=
{
	layerOpen : function layerOpen(url, params, func, type){
		$.post(url, params, function(html) {
			if($("#blockArea").length <= 0){
				if(type == 2){
					$("#wrap").append("<div id=\"blockArea\" class=\"popTypeWhite\"></div>");
				}else if(type == 3){
					$("#wrap").append("<div id=\"blockArea\" class=\"popTypeAbsolute\"></div>");
				}else{
					$("#wrap").append("<div id=\"blockArea\"></div>");
				}
			}
			$("#blockArea").html(html);
			$("#layerArea").css("visibility", "hidden");
			$('#blockArea').imagesLoaded( function() {
				var $layer = $("#layerArea");
				var layerW = parseInt($layer.css("width"));
				var layerH = parseInt($layer.css("height"));
				var posH = -(layerH / 2);
				var posW = -(layerW / 2);
				
				if(layerH == undefined || layerH == null || layerH < 0){
					layerH = parseInt($layer.height());
				} 
				
				if($(window).height() - 40 < layerH){
					//$("body").css("overflow","hidden");
					$("#blockArea").css("overflow","auto");
					
					if($layer.hasClass('notAlignType')){
						$layer.css({
							"top" : "0"
						}); 
					}else if(!$layer.hasClass('notAlign')){
						$layer.css({
							"top" : "0",
							"margin-left" : posW + "px"
						});
					}else{
						$layer.css({
							"margin-left" : posW + "px"
						}); 
					}
				} else {
					//$("body").css("overflow","hidden");
					if(!$layer.hasClass('notAlign')){
						$layer.css({
							"margin-top" : posH + "px",
							"margin-left" : posW + "px"
						}); 
					}else{
						$layer.css({
							"margin-left" : posW + "px"
						});
					}
				}
				if(type == 3){
					//$("body").css("overflow","visible");
					$layer.css({
						"top" : parseInt($('body, html').scrollTop() + 40)  + "px"
					});
				}
				if(func != null && func != undefined){
					func();
				}
				$("#layerArea").css("visibility", "visible");
				
				/*$("#blockArea").on("click",function(e){
					if($(e.target).parents("#layerArea").length <= 0 && $(e.target).attr("id") == "blockArea"){ 
						uiUtil.layerClose();
					}
				});*/
				
			})
		});
	}

	,layerClose : function layerClose(){
		$("#blockArea").off("click");
		$("#blockArea").remove();
		if($("body").css("overflow") == "hidden") {
			$("body").css("overflow","visible");
			$("#blockArea").css("overflow","visible");
		}
	}
	, scorllMove : function scorllMove(obj, speed, easing, gap, afterFunc) {
		if(speed == null || speed == ""){ speed = 500; };
		if(easing == null || easing == ""){ easing = "easeInOutQuint"; }; 
		if(gap == null || gap == ""){ gap = 0; }; 
		var offset = $(obj).offset();
		var topValue = 0;
		if(offset.top != 0){
			topValue = offset.top; 
		} else {
			topValue = offset.top;
		}
		$("html, body").stop().animate({
			scrollTop : topValue - gap  
		},speed, easing, function(){
			if(afterFunc){
				afterFunc();
			}
		});
	}
};

var Layer = {
	open : function open(src, width, height) {
		var marginTop = ($(window).height() > height) ? - (height / 2) : 0 ;	
		var marginLeft = - (width / 2);
		if($("#blockArea").length > 0){
			uiUtil.layerClose();
			$("#blockArea").remove();
		}
		
		$("#wrap").append("<div id=\"blockArea\"><div id=\"frameArea\" style=\"margin-left:"+ marginLeft +"px; margin-top:"+ marginTop +"px;\"></div></div>");
		var temp = '<iframe src="' + src + '" width="' + width + '" height="' + height + '" frameborder="0" allowTransparency="true" name="iframetPopLayer1" id="iframetPopLayer1"></iframe>'
						+ '<a href="#" class="btnClose" onclick="Layer.close(); return false;"><img src="/mobile_app/images/btn/btn_ok02.gif" alt="확인"></a>';
		
		$("#frameArea").html(temp);
	},
	close : function close() {
		top.$("#blockArea").remove();
	}
};

/*textarea*/
function textareaResize(obj){
	var D_target = $(obj);
	var lineHeigh = parseInt(D_target.css("line-height"));
	var maxHeight = parseInt(D_target.css("max-height"))  ? parseInt(D_target.css("max-height")) : false; 
	D_target.on("keyup keydown", function(e){
		var keyCode = e.originalEvent.keyCode;
		$(this).height(lineHeigh);
		var scrollHeight = $(this).prop('scrollHeight');
		$(this).css("height", scrollHeight + "px");
		if(maxHeight && maxHeight < scrollHeight){
			$(this).css("overflow", "auto");
			if(!(keyCode >= 37 && keyCode <= 40)){
				scrollNum = scrollHeight - maxHeight;
				$(this).scrollTop(scrollNum);
			}
		}
	});
}
//radio reset
function radioAction(obj){
	var $obj = obj;
	$obj.find('input[type=radio]').each(function(){
		$(this).wrap('<span class="check_style"></span>');
		$(this).after('<i></i>');
		$(this).next().append('<b></b>');
		$(this).next().find('b').outerWidth();
		if($(this).parents('label').length > 0){
			$(this).parent('span').css('margin-right','5px');
		}
		$(this).parent().attr('style',$(this).attr('style'));
		$(this).next().find('b').outerWidth(Math.floor($(this).next().find('b').outerWidth()));
		$(this).next().find('b').outerHeight(Math.floor($(this).next().find('b').outerHeight()));
	});
	
	/*$obj.find('input[type=checkbox]').each(function(i){
		$(this).wrap('<span class="chk_style"></span>');
		$(this).after('<i></i>');
		if($(this).parents('label').length > 0){
			$(this).parent('span').css('margin-right','5px');
		}
		$(this).parent().attr('style',$(this).attr('style'));
		$(this).removeAttr('style');
	});*/

	//radio script
	$obj.find('.radioAction').append('<span class="activeBar"></span>');
	$obj.find('.radioAction input').on('change',function(){
		$(this).parent().parent().parent().find('li').find('label').removeClass('on');
		$(this).parent().parent().find('label').addClass('on');
		$(this).parents('.radioAction').find('.activeBar').css('left',$(this).parent().parent().position().left)
			.css('width',$(this).parent().parent().outerWidth());
	});
	$obj.find('.radioAction input').each(function(){
		if($(this).is(":checked")){
			$(this).parent().parent().parent().find('li').find('label').removeClass('on');
			$(this).parent().siblings('label').addClass('on');
			var objLeft = $(this).parent().parent().position().left;
			var objWidth = $(this).parent().parent().outerWidth();
			$(this).parents('.radioAction').find('.activeBar').css('left', objLeft)
				.css('width', objWidth);
		}
	});
}
function goBack(){
	window.history.back();
}
function getCookie(NameCookie) {
	var i = document.cookie.indexOf(NameCookie + '=' );
	if(i!=-1){
		i += NameCookie.length + 1;
		NameEnd = document.cookie.indexOf(';', i);
		if(NameEnd==-1)
			NameEnd = document.cookie.length;
		return unescape(document.cookie.substring(i, NameEnd));
	}else
		return "";
}
function setCookie( name, value, expiredays ) {
	var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function tabSet(tabIdx){
	$(function(){
		$('.tabTypeAutoA ul').add('.tabTypeA ul').mouseleave(function(){
			$(this).find('li').eq(tabIdx).addClass('on');
		});
		$('.tabTypeA a').add('.tabTypeAutoA a').mouseenter(function(){
			if(!$(this).parent().hasClass('on')){
				$('.tabTypeA li').add('.tabTypeAutoA li').removeClass('on');
			}
		})
	});
}
function tabMode(target,obj){
	$(obj).parent().parent().find('li').removeClass('on');
	$('.tabCont').hide();
	$('.'+target).show();
	$('#'+target+'Time').show();
	$(obj).parent().addClass('on');
}
function loadingStart(target,bgColor){
	if(bgColor == ""){
		bgColor = "fff";
	}
    $(target).css('position','relative').append('<div class="loading"></div><div class="loadingBg" style="opacity:0.55; background:#' + bgColor + '"></div>')
}
function loadingEnd(target){
	$(target).find('.loading, .loadingBg').remove();
}
function videoPopup(url,tit){
	$('#wrap').append(
		'<div id="video_player_popup">' +
		'<strong>'+ tit +'</strong>'+
		'<div class="video_playerWrap">' +
		'<div id="video_player"></div>'+
		'</div>'+
		'<a href="javascript:;" onclick="video_player_close()"><span class="hide">영상팝업닫기</span></a>'+
		'</div>'+
		'<div id="video_player_bg"></div>'
	).promise().done(function(){
		jwplayer.key="wL1VG89d0RJwTeAjmXfOGEztrKfZYekhwBp9bd6UEvskWYWk";
		var playerPop = jwplayer("video_player")
		playerPop.setup({
			playlist: [{
				"file": url,
			}],
			autostart: true,
			width:640,
			height:360,
			primary: 'html5',
			mute:false,
			volume: 50,
			logo:false,
		});
		//jwplayer("video_player").setFullscreen(true);
		return false;
	});
}
function videoArrayPopup(url,tit){
	$('#wrap').append(
		'<div id="video_player_popup">' +
		'<strong>'+ tit +'</strong>'+
		'<div class="video_playerWrap">' +
		'<div id="video_player"></div>'+
		'</div>'+
		'<a href="javascript:;" onclick="video_player_close()"><span class="hide">영상팝업닫기</span></a>'+
		'</div>'+
		'<div id="video_player_bg"></div>'
	).promise().done(function(){
		jwplayer.key="wL1VG89d0RJwTeAjmXfOGEztrKfZYekhwBp9bd6UEvskWYWk";
		var playerPop = jwplayer("video_player")
		playerPop.setup({
			playlist: url,
			autostart: true,
			width:640,
			height:360,
			primary: 'html5',
			mute:false,
			volume: 50,
			logo:false,
		});
		//jwplayer("video_player").setFullscreen(true);
		return false;
	});
}
//각 페이지 용어
function terms(target,obj){
	$(obj).parent().parent().find('li').removeClass('on');
	$(obj).parent().addClass('on');
	$('.' + target).parent().children('div').hide();
	$('.' + target).show();
}
function tabSlide(){
	swiper = new Swiper('.tabSlide', {
		slidesPerView: 'auto',
		allowTouchMove:false,
		spaceBetween: 10,
		lazy: {
			loadPrevNext: true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});
}
function zoomClose(){
	$('.imgZoomBg').remove();
	$('.imgZoom').remove();
}

function reportPopup(seq){
	reportPopup(seq, 'Y');
}
function reportPopup(seq, mapBtnYn){
	var params = {
		seq : seq,
		mapBtnYn : mapBtnYn
	}
	$.ajax ({
		type : "GET",
		url : '/ajax/reportPop', //해당 ajax연결
		data : params,
		dataType : 'html',
		beforeSend: function() {
			//완료전
		},
		complete: function() {
			//완료후
			$('#reportTvPop .slideArea .imgArea a').click(function(){
				var zooHtml = 	'<div class="imgZoom">' +
									'<div class="imgZoomCont">' +
										'<div class="imgZoomWrap">' +
											'<span>' +
												'<img src="'+ $(this).find("img").attr("src") +'" alt="" class="'+$(this).find("img").attr("class")+'">' +
												'<a href="javascript:;" onclick="zoomClose()"><span class="hide">줌닫기</span></a>'+
											'</span>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="imgZoomBg"></div>';
				$('#fullscreenArea').append(zooHtml);
			});
			$('body').css('height','100%').css('overflow','hidden');
		},
		success : function(data) {
			$('#fullscreenArea').append(data); //연결될 컨텐츠
		}
	});
}
function video_player_close(){
	//jwplayer("video_player").setFullscreen(false);
	jwplayer("video_player").remove();
	$('#video_player_popup').remove();
	$('#video_player_bg').remove();
}
function ytLive_open(disasterLive){
	var params = {
		disasterLive : disasterLive
	}
	$.ajax ({
		type : "GET",
		url : '/ajax/ytLive', //해당 ajax연결
		data : params,
		dataType : 'html',
		beforeSend: function() {
			//완료전
		},
		complete: function() {
			//완료후
		},
		success : function(data) {
			$('#wrap').after('<div id="ytLive"></div>');
			$('#ytLive').html(data); //연결될 컨텐츠
			/*$('.popTab ul').addClass('length_' + $('.popTab ul li').length);*/
		}
	});
}
function ytLive_close(){
	//jwplayer("video_player").setFullscreen(false);
	$('#ytLiveWrap').remove();
	$('#ytLiveWrap_bg').remove();
}
Date.prototype.format = function (f) {

    if (!this.valueOf()) return " ";

    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {

        switch ($1) {

            case "yyyy": return d.getFullYear(); // 년 (4자리)

            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)

            case "dd": return d.getDate().zf(2); // 일 (2자리)

            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

            case "mm": return d.getMinutes().zf(2); // 분 (2자리)

            case "ss": return d.getSeconds().zf(2); // 초 (2자리)

            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };