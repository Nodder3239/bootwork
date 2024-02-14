/**
 * 
 */
/*
	210.경상남도 창원시
	211.경상남도 진주시
	212.경상남도 통영시
	213.경상남도 사천시
	214.경상남도 김해시
	215.경상남도 밀양시
	216.경상남도 거제시
	217.경상남도 양산시
	218.경상남도 의령군
	219.경상남도 함안군
	220.경상남도 창녕군
	221.경상남도 고성군
	222.경상남도 남해군
	223.경상남도 하동군
	224.경상남도 산청군
	225.경상남도 함양군
	226.경상남도 거창군
	227.경상남도 합천군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var gyeongnam_changwon_city_office = new naver.maps.LatLng(35.22797, 128.6819);
	    var gyeongnam_jinju_city_office = new naver.maps.LatLng(35.18031, 128.1087);
	    var gyeongnam_tongyeong_city_office = new naver.maps.LatLng(34.85394, 128.4340);
	    var gyeongnam_sacheon_city_office = new naver.maps.LatLng(35.00357, 128.0638);
	    var gyeongnam_gimhae_city_office = new naver.maps.LatLng(35.22866, 128.8895);	//5
	    var gyeongnam_miryang_city_office;
	    var gyeongnam_geoje_city_office;
	    var gyeongnam_yangsan_city_office;
	    var gyeongnam_uiryeong_county_office;
	    var gyeongnam_haman_county_office;	//10
	    var gyeongnam_changnyeong_county_office;
	    var gyeongnam_goseong_county_office;
	    var gyeongnam_namhae_county_office;
	    var gyeongnam_hadong_county_office;
	    var gyeongnam_sancheong_county_office;	//15
	    var gyeongnam_hamyang_county_office;
	    var gyeongnam_geochang_county_office;
	    var gyeongnam_hapcheon_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: gyeongnam_changwon_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 210번째 마커와 정보창
	    var marker210 = new naver.maps.Marker({
	        map: map,
	        position: gyeongnam_changwon_city_office
	    });
	    var contentString210 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongnam.png" width="100" height="100" alt="경남창원시청" class="thumb"/><br>',
	        '<h2>경남창원시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상남도 창원시 성산구 중앙대로 151(용호동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 055-225-2114, 1899-1111, 재난대응담당: 055-225-4511, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(재난대응담당): 055-225-4784 <br>',
	        '<i class="fa-solid fa-envelope"></i> 51435 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.changwon.go.kr/cwportal/portal.web" target="_blank">https://www.changwon.go.kr/cwportal/portal.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow210 = new naver.maps.InfoWindow({
	        content: contentString210
	    });
	    
	    // 211번째 마커와 정보창
	    var marker211 = new naver.maps.Marker({
	        map: map,
	        position: gyeongnam_jinju_city_office
	    });
	    var contentString211 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongnam.png" width="100" height="100" alt="경남진주시청" class="thumb"/><br>',
	        '<h2>경남진주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상남도 진주시 동진로 155(상대동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 055-749-2114, 055-754-1001(복지콜센터), 중대재해: 055-749-5568, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(중대재해): 055-749-5569 <br>',
	        '<i class="fa-solid fa-envelope"></i> 52789 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jinju.go.kr/main.web" target="_blank">https://www.jinju.go.kr/main.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow211 = new naver.maps.InfoWindow({
	        content: contentString211
	    });
	    
	    // 212번째 마커와 정보창
	    var marker212 = new naver.maps.Marker({
	        map: map,
	        position: gyeongnam_tongyeong_city_office
	    });
	    var contentString212 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongnam.png" width="100" height="100" alt="경남통영시청" class="thumb"/><br>',
	        '<h2>경남통영시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상남도 통영시 통영해안로 515(무전동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1577-0557, 재난안전상황실: 055-644-2820, <br>',
	        '(야간,공휴일/당직실): 055-644-3222~3, 055-644-3225~6 <br><i class="fa-solid fa-fax"></i> 팩스: 055-644-5054, (재난안전상황실): 055-644-4599 <br>',
	        '<i class="fa-solid fa-envelope"></i> 53040 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.tongyeong.go.kr/main.web" target="_blank">https://www.tongyeong.go.kr/main.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow212 = new naver.maps.InfoWindow({
	        content: contentString212
	    });
	    
	    // 213번째 마커와 정보창
	    var marker213 = new naver.maps.Marker({
	        map: map,
	        position: gyeongnam_sacheon_city_office
	    });
	    var contentString213 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongnam.png" width="100" height="100" alt="경남사천시청" class="thumb"/><br>',
	        '<h2>경남사천시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상남도 사천시 용현면 시청로 77<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 055-831-2114, 재난행정: 055-831-3310, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 055-831-6000 <br>',
	        '<i class="fa-solid fa-envelope"></i> 52539 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.sacheon.go.kr/main.web" target="_blank">https://www.sacheon.go.kr/main.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow213 = new naver.maps.InfoWindow({
	        content: contentString213
	    });
	    
	    // 214번째 마커와 정보창
	    var marker214 = new naver.maps.Marker({
	        map: map,
	        position: gyeongnam_gimhae_city_office
	    });
	    var contentString214 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongnam.png" width="100" height="100" alt="경남김해시청" class="thumb"/><br>',
	        '<h2>경남김해시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상남도 김해시 김해대로 2401(부원동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 055-330-3114, 1577-9400, 중대재해: 055-330-6892, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(중대재해): 055-722-1322 <br>',
	        '<i class="fa-solid fa-envelope"></i> 50924 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gimhae.go.kr/main.web" target="_blank">https://www.gimhae.go.kr/main.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow214 = new naver.maps.InfoWindow({
	        content: contentString214
	    });
	    
	    // 210 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker210, "click", function(e) {
	        if (infowindow210.getMap()) {
	            infowindow210.close();
	        } else {
	            infowindow210.open(map, marker210);
	        }
	    });
	    
	    // 211 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker211, "click", function(e) {
	        if (infowindow211.getMap()) {
	            infowindow211.close();
	        } else {
	            infowindow211.open(map, marker211);
	        }
	    });
	    
	    // 212 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker212, "click", function(e) {
	        if (infowindow212.getMap()) {
	            infowindow212.close();
	        } else {
	            infowindow212.open(map, marker212);
	        }
	    });
	    
	    // 213 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker213, "click", function(e) {
	        if (infowindow213.getMap()) {
	            infowindow213.close();
	        } else {
	            infowindow213.open(map, marker213);
	        }
	    });
	    
	    // 214 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker214, "click", function(e) {
	        if (infowindow214.getMap()) {
	            infowindow214.close();
	        } else {
	            infowindow214.open(map, marker214);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow210.open(map, marker210);
	    
	   	
	});
	