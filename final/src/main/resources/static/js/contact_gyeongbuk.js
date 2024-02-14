/**
 * 
 */
/*
	188.경상북도 포항시
	189.경상북도 경주시
	190.경상북도 김천시
	191.경상북도 안동시
	192.경상북도 구미시
	193.경상북도 영주시
	194.경상북도 영천시
	195.경상북도 상주시
	196.경상북도 문경시
	197.경상북도 경산시
	198.경상북도 의성군
	199.경상북도 청송군
	200.경상북도 영양군
	201.경상북도 영덕군
	202.경상북도 청도군
	203.경상북도 고령군
	204.경상북도 성주군
	205.경상북도 칠곡군
	206.경상북도 예천군
	207.경상북도 봉화군
	208.경상북도 울진군
	209.경상북도 울릉군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var gyeongbuk_pohang_city_office = new naver.maps.LatLng(36.01889, 129.3437);
	   	var gyeongbuk_gyeongju_city_office = new naver.maps.LatLng(35.85631, 129.2251);
	    var gyeongbuk_gimcheon_city_office = new naver.maps.LatLng(36.13987, 128.1136);
	    var gyeongbuk_andong_city_office = new naver.maps.LatLng(36.56833, 128.7296);
	    var gyeongbuk_gumi_city_office = new naver.maps.LatLng(36.11963, 128.3443);	//5
	    var gyeongbuk_yeongju_city_office;
	    var gyeongbuk_yeongcheon_city_office;
	    var gyeongbuk_sangju_city_office;
	    var gyeongbuk_mungyeong_city_office;
	    var gyeongbuk_gyeongsan_city_office;	//10
	    var gyeongbuk_uiseong_county_office;
	    var gyeongbuk_cheongsong_county_office;
	    var gyeongbuk_yeongyang_county_office;
	    var gyeongbuk_yeongdeok_county_office;
	    var gyeongbuk_cheongdo_county_office;	//15
	    var gyeongbuk_goryeong_county_office;
	    var gyeongbuk_seongju_county_office;
	    var gyeongbuk_chilgok_county_office;
	    var gyeongbuk_yecheon_county_office;
	    var gyeongbuk_bonghwa_county_office;	//20
	    var gyeongbuk_uljin_county_office;
	    var gyeongbuk_ulleung_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: gyeongbuk_pohang_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 188번째 마커와 정보창
	    var marker188 = new naver.maps.Marker({
	        map: map,
	        position: gyeongbuk_pohang_city_office
	    });
	    var contentString188 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongbuk.png" width="100" height="100" alt="경북포항시청" class="thumb"/><br>',
	        '<h2>경북포항시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상북도 포항시 남구 시청로 1(대잠동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-270-8282, <br>',
	        '(야간,공휴일/당직실): 054-270-2222 <br><i class="fa-solid fa-fax"></i> 팩스: 054-270-2229 <br>',
	        '<i class="fa-solid fa-envelope"></i> 37683 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.pohang.go.kr/main.do" target="_blank">https://www.pohang.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow188 = new naver.maps.InfoWindow({
	        content: contentString188
	    });
	    
	    // 189번째 마커와 정보창
	    var marker189 = new naver.maps.Marker({
	        map: map,
	        position: gyeongbuk_gyeongju_city_office
	    });
	    var contentString189 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongbuk.png" width="100" height="100" alt="경북경주시청" class="thumb"/><br>',
	        '<h2>경북경주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상북도 경주시 양정로 260(동천동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-779-8585, 1588-3650, 중대재해: 054-779-2200, <br>',
	        '(야간,공휴일/당직실): 054-779-6222 <br><i class="fa-solid fa-fax"></i> 팩스(안전정책과): 054-779-7423 <br>',
	        '<i class="fa-solid fa-envelope"></i> 38102 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gyeongju.go.kr/open_content/ko/index.do" target="_blank">https://www.gyeongju.go.kr/open_content/ko/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow189 = new naver.maps.InfoWindow({
	        content: contentString189
	    });
	    
	    // 190번째 마커와 정보창
	    var marker190 = new naver.maps.Marker({
	        map: map,
	        position: gyeongbuk_gimcheon_city_office
	    });
	    var contentString190 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongbuk.png" width="100" height="100" alt="경북김천시청" class="thumb"/><br>',
	        '<h2>경북김천시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상북도 김천시 시청1길(신음동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-420-6114, 중대재해: 054-420-6760, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(건설안전국): 054-420-6339 <br>',
	        '<i class="fa-solid fa-envelope"></i> 39532 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gc.go.kr/main.do" target="_blank">https://www.gc.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow190 = new naver.maps.InfoWindow({
	        content: contentString190
	    });
	    
	    // 191번째 마커와 정보창
	    var marker191 = new naver.maps.Marker({
	        map: map,
	        position: gyeongbuk_andong_city_office
	    });
	    var contentString191 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongbuk.png" width="100" height="100" alt="경북안동시청" class="thumb"/><br>',
	        '<h2>경북안동시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상북도 안동시 퇴계로 115(명륜동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-853-6000, 재난안전상황실: 054-840-6222, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 054-852-9232, (재난안전상황실): 054-840-6229 <br>',
	        '<i class="fa-solid fa-envelope"></i> 36691 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.andong.go.kr/main.do" target="_blank">https://www.andong.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow191 = new naver.maps.InfoWindow({
	        content: contentString191
	    });
	    
	    // 192번째 마커와 정보창
	    var marker192 = new naver.maps.Marker({
	        map: map,
	        position: gyeongbuk_gumi_city_office
	    });
	    var contentString192 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeongbuk.png" width="100" height="100" alt="경북구미시청" class="thumb"/><br>',
	        '<h2>경북구미시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경상북도 구미시 송정대로 55(송정동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-480-6114, 재난상황실: 054-1000-3119, <br>',
	        '(야간,공휴일/당직실): 054-480-6222 <br><i class="fa-solid fa-fax"></i> 팩스: 054-452-5529, (재난상황실): 054-1000-2329 <br>',
	        '<i class="fa-solid fa-envelope"></i> 39281 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gumi.go.kr/main.do" target="_blank">https://www.gumi.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow192 = new naver.maps.InfoWindow({
	        content: contentString192
	    });
	    
	    // 188 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker188, "click", function(e) {
	        if (infowindow188.getMap()) {
	            infowindow188.close();
	        } else {
	            infowindow188.open(map, marker188);
	        }
	    });
	    
	    // 189 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker189, "click", function(e) {
	        if (infowindow189.getMap()) {
	            infowindow189.close();
	        } else {
	            infowindow189.open(map, marker189);
	        }
	    });
	    
	    // 190 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker190, "click", function(e) {
	        if (infowindow190.getMap()) {
	            infowindow190.close();
	        } else {
	            infowindow190.open(map, marker190);
	        }
	    });
	    
	    // 191 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker191, "click", function(e) {
	        if (infowindow191.getMap()) {
	            infowindow191.close();
	        } else {
	            infowindow191.open(map, marker191);
	        }
	    });
	    
	    // 192 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker192, "click", function(e) {
	        if (infowindow192.getMap()) {
	            infowindow192.close();
	        } else {
	            infowindow192.open(map, marker192);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow188.open(map, marker188);
	    
	   	
	});
	