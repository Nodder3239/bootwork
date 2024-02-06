/**
 * 
 */

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var seoul_jongno_gu_office = new naver.maps.LatLng(37.57347, 126.9790);
	    var seoul_jung_gu_office = new naver.maps.LatLng(37.56376, 126.9976);
	    var seoul_yongsan_gu_office = new naver.maps.LatLng(37.53233, 126.9907);
	    var seoul_seongdong_gu_office = new naver.maps.LatLng(37.56341, 127.0369);
	    var seoul_gwangjin_gu_office = new naver.maps.LatLng(37.53838, 127.0822);	//5
	    var seoul_dongdaemun_gu_office = new naver.maps.LatLng(37.57420, 127.0398);
	    var seoul_jungnang_gu_office = new naver.maps.LatLng(37.60631, 127.0932);
	    var seoul_seongbuk_gu_office = new naver.maps.LatLng(37.58937, 127.0167);
	    var seoul_gangbuk_gu_office = new naver.maps.LatLng(37.63978, 127.0255);
	    var seoul_dobong_gu_office = new naver.maps.LatLng(37.66877, 127.0471);	//10
	    var seoul_nowon_gu_office = new naver.maps.LatLng(37.65408, 127.0566);
	    var seoul_eunpyeong_gu_office = new naver.maps.LatLng(37.60275, 126.9293);
	    var seoul_seodaemun_gu_office = new naver.maps.LatLng(37.57926, 126.9365);
	    var seoul_mapo_gu_office = new naver.maps.LatLng(37.56608, 126.9015);
	    var seoul_yangcheon_gu_office = new naver.maps.LatLng(37.51695, 126.8666);	//15
	    var seoul_gangseo_gu_office = new naver.maps.LatLng(37.55091, 126.8496);
	    var seoul_guro_gu_office = new naver.maps.LatLng(37.49547, 126.8876);
	    var seoul_geumcheon_gu_office = new naver.maps.LatLng(37.45677, 126.8954);
	    var seoul_yeongdeungpo_gu_office = new naver.maps.LatLng(37.52635, 126.8963);
	    var seoul_dongjak_gu_office = new naver.maps.LatLng(37.51243, 126.9398);	//20
	    var seoul_gwanak_gu_office = new naver.maps.LatLng(37.47811, 126.9515);
	    var seoul_seocho_gu_office = new naver.maps.LatLng(37.48359, 127.0327);
	    var seoul_gangnam_gu_office = new naver.maps.LatLng(37.51751, 127.0474);
		var	seoul_songpa_gu_office = new naver.maps.LatLng(37.51446, 127.1059);
		var	seoul_gangdong_gu_office = new naver.maps.LatLng(37.53013, 127.1237);	//25
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: seoul_jongno_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
                    zoom: 14,
                    scaleControl: true,
                    zoomControl: true,
                    zoomControlOptions: {
                    	position: naver.maps.Position.TOP_RIGHT
                    }
                });
                
                //setOptions
                map.setOptions("mapTypeControl", true);
                
                naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
                    console.log('zoom:' + zoom);
                });
                
                map.setOptions('minZoom', 10);
                console.log('잘못된 참조 시점', map.getOptions('minZoom'), map.getOptions('minZoom') === 10);

                // 지도의 옵션 참조는 init 이벤트 이후에 참조해야 합니다.
                naver.maps.Event.once(map, 'init', function () {
                    console.log('올바른 참조 시점', map.getOptions('minZoom') === 10);
                });
                
             	// 지도 인터랙션 옵션
                $("#interaction").on("click", function(e) {
                    e.preventDefault();

                    if (map.getOptions("draggable")) {
                        map.setOptions({ //지도 인터랙션 끄기
                            draggable: false,
                            pinchZoom: false,
                            scrollWheel: false,
                            keyboardShortcuts: false,
                            disableDoubleTapZoom: true,
                            disableDoubleClickZoom: true,
                            disableTwoFingerTapZoom: true
                        });

                        $(this).removeClass("control-on");
                    } else {
                        map.setOptions({ //지도 인터랙션 켜기
                            draggable: true,
                            pinchZoom: true,
                            scrollWheel: true,
                            keyboardShortcuts: true,
                            disableDoubleTapZoom: false,
                            disableDoubleClickZoom: false,
                            disableTwoFingerTapZoom: false
                        });

                        $(this).addClass("control-on");
                    }
                });
                
             // 관성 드래깅 옵션
                $("#kinetic").on("click", function(e) {
                    e.preventDefault();

                    if (map.getOptions("disableKineticPan")) {
                        map.setOptions("disableKineticPan", false); //관성 드래깅 켜기
                        $(this).addClass("control-on");
                    } else {
                        map.setOptions("disableKineticPan", true); //관성 드래깅 끄기
                        $(this).removeClass("control-on");
                    }
                });

                // 타일 fadeIn 효과
                $("#tile-transition").on("click", function(e) {
                    e.preventDefault();

                    if (map.getOptions("tileTransition")) {
                        map.setOptions("tileTransition", false); //타일 fadeIn 효과 끄기

                        $(this).removeClass("control-on");
                    } else {
                        map.setOptions("tileTransition", true); //타일 fadeIn 효과 켜기
                        $(this).addClass("control-on");
                    }
                });

                // min/max 줌 레벨
                $("#min-max-zoom").on("click", function(e) {
                    e.preventDefault();

                    if (map.getOptions("minZoom") === 10) {
                        map.setOptions({
                            minZoom: 7,
                            maxZoom: 21
                        });
                        $(this).val(this.name + ': 7 ~ 21');
                    } else {
                        map.setOptions({
                            minZoom: 10,
                            maxZoom: 21
                        });
                        $(this).val(this.name + ': 10 ~ 21');
                    }
                });

                //지도 컨트롤
                $("#controls").on("click", function(e) {
                    e.preventDefault();

                    if (map.getOptions("scaleControl")) {
                        map.setOptions({ //모든 지도 컨트롤 숨기기
                            scaleControl: false,
                            logoControl: false,
                            mapDataControl: false,
                            zoomControl: false,
                            mapTypeControl: false
                        });
                        $(this).removeClass('control-on');
                    } else {
                        map.setOptions({ //모든 지도 컨트롤 보이기
                            scaleControl: true,
                            logoControl: true,
                            mapDataControl: true,
                            zoomControl: true,
                            mapTypeControl: true
                        });
                        $(this).addClass('control-on');
                    }
                });

                $("#interaction, #tile-transition, #controls").addClass("control-on");
	    		//map설정
	    
	    
	    // 1번째 마커와 정보창
	    var marker1 = new naver.maps.Marker({
	        map: map,
	        position: seoul_jongno_gu_office
	    });
	    var contentString1 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="종로구청" class="thumb" /><br />',
	        '<h3>종로구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 종로구 종로1길 36 <br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2148-1114(120다산콜센터), <br/>',
	        '02-2148-1111(야간,공휴일/당직실)<br />',
	        '<i class="fa-solid fa-envelope"></i> 03152 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.jongno.go.kr/portalMain.do" target="_blank">https://www.jongno.go.kr/portalMain.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow1 = new naver.maps.InfoWindow({
	        content: contentString1
	    });
	    
	    // 2번째 마커와 정보창
	    var marker2 = new naver.maps.Marker({
	        map: map,
	        position: seoul_jung_gu_office
	    });
	    var contentString2 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="중구청" class="thumb" /><br />',
	        '<h3>중구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 중구 창경궁로17(예관동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-3396-4114(120다산콜센터), <br/>',
	        '02-3396-4000(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-3396-8888<br />',
	        '<i class="fa-solid fa-envelope"></i> 04558 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.junggu.seoul.kr/main.do" target="_blank">https://www.junggu.seoul.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow2 = new naver.maps.InfoWindow({
	        content: contentString2
	    });
	    
	 	// 3번째 마커와 정보창
	    var marker3 = new naver.maps.Marker({
	        map: map,
	        position: seoul_yongsan_gu_office
	    });
	    var contentString3 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="용산구청" class="thumb" /><br />',
	        '<h3>용산구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 용산구 녹사평대로 150(이태원동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2199-6114(120다산콜센터), <br/>',
	        '02-2199-6300(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-2199-5300<br />',
	        '<i class="fa-solid fa-envelope"></i> 04390 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yongsan.go.kr/portal/main/main.do" target="_blank">https://www.yongsan.go.kr/portal/main/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow3 = new naver.maps.InfoWindow({
	        content: contentString3
	    });
	    
	 	// 4번째 마커와 정보창
	    var marker4 = new naver.maps.Marker({
	        map: map,
	        position: seoul_seongdong_gu_office
	    });
	    var contentString4 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="성동구청" class="thumb" /><br />',
	        '<h3>성동구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 성동구 고산자로 270<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2286-5114(120다산콜센터), <br/>',
	        '02-2286-5200(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 04750 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.sd.go.kr/main/index.do" target="_blank">https://www.sd.go.kr/main/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow4 = new naver.maps.InfoWindow({
	        content: contentString4
	    });
	    
	 	// 5번째 마커와 정보창
	    var marker5 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gwangjin_gu_office
	    });
	    var contentString5 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="광진구청" class="thumb" /><br />',
	        '<h3>광진구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 광진구 자양로 117(자양동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-450-1114(120다산콜센터) 보건소: 02-450-1422, <br/>',
	        '02-450-1300(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-453-2686 <br />',
	        '<i class="fa-solid fa-envelope"></i> 05026 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gwangjin.go.kr/portal/main/main.do" target="_blank">https://www.gwangjin.go.kr/portal/main/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow5 = new naver.maps.InfoWindow({
	        content: contentString5
	    });
	    
	 	// 6번째 마커와 정보창
	    var marker6 = new naver.maps.Marker({
	        map: map,
	        position: seoul_dongdaemun_gu_office
	    });
	    var contentString6 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="동대문구청" class="thumb" /><br />',
	        '<h3>동대문구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 동대문구 천호대로 145(용두동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2127-4114, 4300(120다산콜센터) 당직실(평일): 02-2127-5000 <br/>',
	        '02-2127-4000(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-2127-5096 <br />',
	        '<i class="fa-solid fa-envelope"></i> 02565 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.ddm.go.kr/www/index.do" target="_blank">https://www.ddm.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow6 = new naver.maps.InfoWindow({
	        content: contentString6
	    });
	    
	 	// 7번째 마커와 정보창
	    var marker7 = new naver.maps.Marker({
	        map: map,
	        position: seoul_jungnang_gu_office
	    });
	    var contentString7 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="중랑구청" class="thumb" /><br />',
	        '<h3>중랑구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 중랑구 봉화산로 179(신내동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2094-0114(120다산콜센터) <br/>',
	        '02-2094-2150(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-490-4658 <br />',
	        '<i class="fa-solid fa-envelope"></i> 02043 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.jungnang.go.kr/portal/main.do" target="_blank">https://www.jungnang.go.kr/portal/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow7 = new naver.maps.InfoWindow({
	        content: contentString7
	    });
	    
	 	// 8번째 마커와 정보창
	    var marker8 = new naver.maps.Marker({
	        map: map,
	        position: seoul_seongbuk_gu_office
	    });
	    var contentString8 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="성북구청" class="thumb" /><br />',
	        '<h3>성북구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 성북구 보문로 168(삼선동 5가)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2241-3114(120다산콜센터) <br/>',
	        '02-2241-3330, 02-2241-3300~2(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 02848 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.sb.go.kr/main/mainPage.do" target="_blank">https://www.sb.go.kr/main/mainPage.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow8 = new naver.maps.InfoWindow({
	        content: contentString8
	    });
	    
	 	// 9번째 마커와 정보창
	    var marker9 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gangbuk_gu_office
	    });
	    var contentString9 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강북구청" class="thumb" /><br />',
	        '<h3>강북구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 강북구 도봉로89길 13(수유동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-901-6114(120다산콜센터) <br/>',
	        '02-901-6111~3(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 01071 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gangbuk.go.kr/www/index.do" target="_blank">https://www.gangbuk.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow9 = new naver.maps.InfoWindow({
	        content: contentString9
	    });
	    
	 	// 10번째 마커와 정보창
	    var marker10 = new naver.maps.Marker({
	        map: map,
	        position: seoul_dobong_gu_office
	    });
	    var contentString10 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="도봉구청" class="thumb" /><br />',
	        '<h3>도봉구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 도봉구 마들로 656(방학동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2091-2120(120다산콜센터) <br/>',
	        '02-2091-2091(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 01331 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.dobong.go.kr/" target="_blank">https://www.dobong.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow10 = new naver.maps.InfoWindow({
	        content: contentString10
	    });
	    
	 	// 11번째 마커와 정보창
	    var marker11 = new naver.maps.Marker({
	        map: map,
	        position: seoul_nowon_gu_office
	    });
	    var contentString11 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="노원구청" class="thumb" /><br />',
	        '<h3>노원구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 노원구 노해로 437(상계동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2116-3114(120다산콜센터) <br/>',
	        '02-2116-3000, 3301(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-2116-4666 <br />',
	        '<i class="fa-solid fa-envelope"></i> 01689 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.nowon.kr/www/index.do" target="_blank">https://www.nowon.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow11 = new naver.maps.InfoWindow({
	        content: contentString11
	    });
	    
	 	// 12번째 마커와 정보창
	    var marker12 = new naver.maps.Marker({
	        map: map,
	        position: seoul_eunpyeong_gu_office
	    });
	    var contentString12 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="은평구청" class="thumb" /><br />',
	        '<h3>은평구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 은평구 은평로 195(녹번동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-351-6114(120다산콜센터) <br/>',
	        '02-351-6041~5(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-351-5611 <br />',
	        '<i class="fa-solid fa-envelope"></i> 03384 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.ep.go.kr/www/index.do" target="_blank">https://www.ep.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow12 = new naver.maps.InfoWindow({
	        content: contentString12
	    });
	    
	 	// 13번째 마커와 정보창
	    var marker13 = new naver.maps.Marker({
	        map: map,
	        position: seoul_seodaemun_gu_office
	    });
	    var contentString13 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="서대문구청" class="thumb" /><br />',
	        '<h3>서대문구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 서대문구 연희로 248(연희동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-330-1114, 02-330-1301~2(120다산콜센터) <br/>',
	        '02-330-1599, 02-330-1300(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-336-0425 <br />',
	        '<i class="fa-solid fa-envelope"></i> 03718 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.sdm.go.kr/index.do" target="_blank">https://www.sdm.go.kr/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow13 = new naver.maps.InfoWindow({
	        content: contentString13
	    });
	    
	 	// 14번째 마커와 정보창
	    var marker14 = new naver.maps.Marker({
	        map: map,
	        position: seoul_mapo_gu_office
	    });
	    var contentString14 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="마포구청" class="thumb" /><br />',
	        '<h3>마포구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 마포구 월드컵로 212(성산동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-3153-8114(120다산콜센터) <br/>',
	        '02-3153-8100(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-3153-8998~9 <br />',
	        '<i class="fa-solid fa-envelope"></i> 03937 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.mapo.go.kr/site/main/home" target="_blank">https://www.mapo.go.kr/site/main/home</a>',
	        '</div>'
	    ].join('');
	    var infowindow14 = new naver.maps.InfoWindow({
	        content: contentString14
	    });
	    
	 	// 15번째 마커와 정보창
	    var marker15 = new naver.maps.Marker({
	        map: map,
	        position: seoul_yangcheon_gu_office
	    });
	    var contentString15 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="양천구청" class="thumb" /><br />',
	        '<h3>양천구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 양천구 목동동로 105(신정동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2620-3114(120다산콜센터) <br/>',
	        '02-2620-3000(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 08095 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yangcheon.go.kr/site/yangcheon/main.do" target="_blank">https://www.yangcheon.go.kr/site/yangcheon/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow15 = new naver.maps.InfoWindow({
	        content: contentString15
	    });
	    
	 	// 16번째 마커와 정보창
	    var marker16 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gangseo_gu_office
	    });
	    var contentString16 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강서구청" class="thumb" /><br />',
	        '<h3>강서구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 강서구 화곡로 302(화곡동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2600-6114(120다산콜센터) <br/>',
	        '02-2600-6330(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 07658 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gangseo.seoul.kr/index" target="_blank">https://www.gangseo.seoul.kr/index</a>',
	        '</div>'
	    ].join('');
	    var infowindow16 = new naver.maps.InfoWindow({
	        content: contentString16
	    });
	    
	 	// 17번째 마커와 정보창
	    var marker17 = new naver.maps.Marker({
	        map: map,
	        position: seoul_guro_gu_office
	    });
	    var contentString17 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="구로구청" class="thumb" /><br />',
	        '<h3>구로구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 구로구 가마산로 245(구로동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-860-2114, 02-860-2127~9(120다산콜센터) <br/>',
	        '02-860-2669(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-864-9595 <br />',
	        '<i class="fa-solid fa-envelope"></i> 08284 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.guro.go.kr/www/index.do" target="_blank">https://www.guro.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow17 = new naver.maps.InfoWindow({
	        content: contentString17
	    });
	    
	 	// 18번째 마커와 정보창
	    var marker18 = new naver.maps.Marker({
	        map: map,
	        position: seoul_geumcheon_gu_office
	    });
	    var contentString18 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="금천구청" class="thumb" /><br />',
	        '<h3>금천구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 금천구 시흥대로73길 70<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2627-2114(120다산콜센터) <br/>',
	        '02-2627-2300, 02-2627-2330(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-896-6322 <br />',
	        '<i class="fa-solid fa-envelope"></i> 08611 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.geumcheon.go.kr/portal/index.do" target="_blank">https://www.geumcheon.go.kr/portal/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow18 = new naver.maps.InfoWindow({
	        content: contentString18
	    });
	    
	 	// 19번째 마커와 정보창
	    var marker19 = new naver.maps.Marker({
	        map: map,
	        position: seoul_yeongdeungpo_gu_office
	    });
	    var contentString19 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="영등포구청" class="thumb" /><br />',
	        '<h3>영등포구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 영등포구 당산로 123(당산동 3가)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2670-3114(120다산콜센터) <br/>',
	        '02-2670-3000(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-2670-3002 <br />',
	        '<i class="fa-solid fa-envelope"></i> 07260 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.ydp.go.kr/www/index.do" target="_blank">https://www.ydp.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow19 = new naver.maps.InfoWindow({
	        content: contentString19
	    });
	    
	 	// 20번째 마커와 정보창
	    var marker20 = new naver.maps.Marker({
	        map: map,
	        position: seoul_dongjak_gu_office
	    });
	    var contentString20 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="동작구청" class="thumb" /><br />',
	        '<h3>동작구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 동작구 장승배기로 161<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-820-1114(120다산콜센터) <br/>',
	        '02-820-1119(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-817-4143 <br />',
	        '<i class="fa-solid fa-envelope"></i> 06928 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.dongjak.go.kr/portal/main/main.do" target="_blank">https://www.dongjak.go.kr/portal/main/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow20 = new naver.maps.InfoWindow({
	        content: contentString20
	    });
	    
	 	// 21번째 마커와 정보창
	    var marker21 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gwanak_gu_office
	    });
	    var contentString21 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="관악구청" class="thumb" /><br />',
	        '<h3>관악구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 관악구 관악로 145(봉천동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-879-5000(120다산콜센터) <br/>',
	        '02-879-6000, 7000(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-879-7802 <br />',
	        '<i class="fa-solid fa-envelope"></i> 08832 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gwanak.go.kr/site/gwanak/main.do" target="_blank">https://www.gwanak.go.kr/site/gwanak/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow21 = new naver.maps.InfoWindow({
	        content: contentString21
	    });
	    
	 	// 22번째 마커와 정보창
	    var marker22 = new naver.maps.Marker({
	        map: map,
	        position: seoul_seocho_gu_office
	    });
	    var contentString22 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="서초구청" class="thumb" /><br />',
	        '<h3>서초구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 서초구 남부순환로 2584(서초동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2155-6114(120다산콜센터) <br/>',
	        '02-2155-6100~3(야간,공휴일/당직실) <br />',
	        '<i class="fa-solid fa-envelope"></i> 06750 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.seocho.go.kr/site/seocho/main.do" target="_blank">https://www.seocho.go.kr/site/seocho/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow22 = new naver.maps.InfoWindow({
	        content: contentString22
	    });
	    
	 	// 23번째 마커와 정보창
	    var marker23 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gangnam_gu_office
	    });
	    var contentString23 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강남구청" class="thumb" /><br />',
	        '<h3>강남구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 강남구 학동로 426(삼성동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-3423-5114(120다산콜센터) <br/>',
	        '02-3423-6000~3(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-3423-8800 <br />',
	        '<i class="fa-solid fa-envelope"></i> 06090 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gangnam.go.kr/main.do" target="_blank">https://www.gangnam.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow23 = new naver.maps.InfoWindow({
	        content: contentString23
	    });
	    
	 	// 24번째 마커와 정보창
	    var marker24 = new naver.maps.Marker({
	        map: map,
	        position: seoul_songpa_gu_office
	    });
	    var contentString24 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="송파구청" class="thumb" /><br />',
	        '<h3>송파구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 송파구 올림픽로 326(신천동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-2147-2000(120다산콜센터) <br/>',
	        '02-2147-2200(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-419-0644 <br />',
	        '<i class="fa-solid fa-envelope"></i> 05552 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.songpa.go.kr/www/index.do" target="_blank">https://www.songpa.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow24 = new naver.maps.InfoWindow({
	        content: contentString24
	    });
	    
	 	// 25번째 마커와 정보창
	    var marker25 = new naver.maps.Marker({
	        map: map,
	        position: seoul_gangdong_gu_office
	    });
	    var contentString25 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강동구청" class="thumb" /><br />',
	        '<h3>강동구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 서울특별시 강동구 성내로 25(성내동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1577-1188(120다산콜센터) <br/>',
	        '02-3425-5000(야간,공휴일/당직실) <i class="fa-solid fa-fax"></i> 02-3425-7200 <br />',
	        '<i class="fa-solid fa-envelope"></i> 05397 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gangdong.go.kr/newportal/" target="_blank">https://www.gangdong.go.kr/newportal/</a>',
	        '</div>'
	    ].join('');
	    var infowindow25 = new naver.maps.InfoWindow({
	        content: contentString25
	    });
	    
	 	// 1 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker1, "click", function(e) {
	        if (infowindow1.getMap()) {
	            infowindow1.close();
	        } else {
	            infowindow1.open(map, marker1);
	        }
	    });

	    // 2 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker2, "click", function(e) {
	        if (infowindow2.getMap()) {
	            infowindow2.close();
	        } else {
	            infowindow2.open(map, marker2);
	        }
	    });
	    
	 	// 3 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker3, "click", function(e) {
	        if (infowindow3.getMap()) {
	            infowindow3.close();
	        } else {
	            infowindow3.open(map, marker3);
	        }
	    });
	 	
	 	// 4 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker4, "click", function(e) {
	        if (infowindow4.getMap()) {
	            infowindow4.close();
	        } else {
	            infowindow4.open(map, marker4);
	        }
	    });
	 	
	 	// 5 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker5, "click", function(e) {
	        if (infowindow5.getMap()) {
	            infowindow5.close();
	        } else {
	            infowindow5.open(map, marker5);
	        }
	    });
	 	
	 	// 6 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker6, "click", function(e) {
	        if (infowindow6.getMap()) {
	            infowindow6.close();
	        } else {
	            infowindow6.open(map, marker6);
	        }
	    });
	 	
	 	// 7 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker7, "click", function(e) {
	        if (infowindow7.getMap()) {
	            infowindow7.close();
	        } else {
	            infowindow7.open(map, marker7);
	        }
	    });
	 	
	 	// 8 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker8, "click", function(e) {
	        if (infowindow8.getMap()) {
	            infowindow8.close();
	        } else {
	            infowindow8.open(map, marker8);
	        }
	    });
	 	
	 	// 9 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker9, "click", function(e) {
	        if (infowindow9.getMap()) {
	            infowindow9.close();
	        } else {
	            infowindow9.open(map, marker9);
	        }
	    });
	 	
	 	// 10 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker10, "click", function(e) {
	        if (infowindow10.getMap()) {
	            infowindow10.close();
	        } else {
	            infowindow10.open(map, marker10);
	        }
	    });
	 	
	 	// 11 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker11, "click", function(e) {
	        if (infowindow11.getMap()) {
	            infowindow11.close();
	        } else {
	            infowindow11.open(map, marker11);
	        }
	    });
	 	
	 	// 12 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker12, "click", function(e) {
	        if (infowindow12.getMap()) {
	            infowindow12.close();
	        } else {
	            infowindow12.open(map, marker12);
	        }
	    });
	 	
	 	// 13 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker13, "click", function(e) {
	        if (infowindow13.getMap()) {
	            infowindow13.close();
	        } else {
	            infowindow13.open(map, marker13);
	        }
	    });
	 	
	 	// 14 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker14, "click", function(e) {
	        if (infowindow14.getMap()) {
	            infowindow14.close();
	        } else {
	            infowindow14.open(map, marker14);
	        }
	    });
	 	
	 	// 15 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker15, "click", function(e) {
	        if (infowindow15.getMap()) {
	            infowindow15.close();
	        } else {
	            infowindow15.open(map, marker15);
	        }
	    });
	 	
	 	// 16 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker16, "click", function(e) {
	        if (infowindow16.getMap()) {
	            infowindow16.close();
	        } else {
	            infowindow16.open(map, marker16);
	        }
	    });
	 	
	 	// 17 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker17, "click", function(e) {
	        if (infowindow17.getMap()) {
	            infowindow17.close();
	        } else {
	            infowindow17.open(map, marker17);
	        }
	    });
	 	
	 	// 18 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker18, "click", function(e) {
	        if (infowindow18.getMap()) {
	            infowindow18.close();
	        } else {
	            infowindow18.open(map, marker18);
	        }
	    });
	 	
	 	// 19 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker19, "click", function(e) {
	        if (infowindow19.getMap()) {
	            infowindow19.close();
	        } else {
	            infowindow19.open(map, marker19);
	        }
	    });
	 	
	 	// 20 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker20, "click", function(e) {
	        if (infowindow20.getMap()) {
	            infowindow20.close();
	        } else {
	            infowindow20.open(map, marker20);
	        }
	    });
	 	
	 	// 21 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker21, "click", function(e) {
	        if (infowindow21.getMap()) {
	            infowindow21.close();
	        } else {
	            infowindow21.open(map, marker21);
	        }
	    });
	 	
	 	// 22 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker22, "click", function(e) {
	        if (infowindow22.getMap()) {
	            infowindow22.close();
	        } else {
	            infowindow22.open(map, marker22);
	        }
	    });
	 	
	 	// 23 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker23, "click", function(e) {
	        if (infowindow23.getMap()) {
	            infowindow23.close();
	        } else {
	            infowindow23.open(map, marker23);
	        }
	    });
	 	
	 	// 24 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker24, "click", function(e) {
	        if (infowindow24.getMap()) {
	            infowindow24.close();
	        } else {
	            infowindow24.open(map, marker24);
	        }
	    });
	 	
	 	// 25 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker25, "click", function(e) {
	        if (infowindow25.getMap()) {
	            infowindow25.close();
	        } else {
	            infowindow25.open(map, marker25);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow1.open(map, marker1);
	});
	