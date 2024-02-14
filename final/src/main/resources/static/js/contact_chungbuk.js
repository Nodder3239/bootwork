/**
 * 
 */
/*
	126.충청북도 청주시
	127.충청북도 충주시
	128.충청북도 제천시
	129.충청북도 보은군
	130.충청북도 옥천군
	131.충청북도 영동군
	132.충청북도 증평군
	133.충청북도 진천군
	134.충청북도 괴산군
	135.충청북도 음성군
	136.충청북도 단양군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var chungbuk_cheongju_city_office = new naver.maps.LatLng(36.64249, 127.4890);
	    var chungbuk_chungju_city_office = new naver.maps.LatLng(36.99105, 127.9260);
	    var chungbuk_jecheon_city_office = new naver.maps.LatLng(37.13264, 128.1910);
	    var chungbuk_boeun_county_office = new naver.maps.LatLng(36.48940, 127.7295);
	    var chungbuk_okcheon_county_office = new naver.maps.LatLng(36.30628, 127.5714);	//5
	    var chungbuk_yeongdong_county_office;
	    var chungbuk_jeungpyeong_county_office;
	    var chungbuk_jincheon_county_office;
	    var chungbuk_goesan_county_office;
	    var chungbuk_eumseong_county_office;	//10
	    var chungbuk_danyang_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: chungbuk_cheongju_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    
	    // 126번째 마커와 정보창
	    var marker126 = new naver.maps.Marker({
	        map: map,
	        position: chungbuk_cheongju_city_office
	    });
	    var contentString126 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungbuk.png" width="100" height="100" alt="충북청주시청" class="thumb"/><br>',
	        '<h2>충북청주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청북도 청주시 상당구 상당로 155(북문로3가) <br>| 충청북도 청주시 상당구 상당로69번길 38(임시청사) <br>| 충청북도 청주시 청원구 상당로 314, 문화제조창 2층(제2임시청사) <br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 043-201-0001 (문자접수): 1899-1365, <br>',
	        '(야간,공휴일/당직실): 043-850-5222 <br><i class="fa-solid fa-fax"></i> 팩스(안전정책과): 043-201-1709 <br>',
	        '<i class="fa-solid fa-envelope"></i> 28542 | 28527(임시청사), 28501(제2임시청사) | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.cheongju.go.kr/www/index.do#n" target="_blank">https://www.cheongju.go.kr/www/index.do#n</a>',
	        '</div>'
	    ].join('');
	    var infowindow126 = new naver.maps.InfoWindow({
	        content: contentString126
	    });
	    
	    // 127번째 마커와 정보창
	    var marker127 = new naver.maps.Marker({
	        map: map,
	        position: chungbuk_chungju_city_office
	    });
	    var contentString127 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungbuk.png" width="100" height="100" alt="충북충주시청" class="thumb"/><br>',
	        '<h2>충북충주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청북도 충주시 으뜸로 21(금릉동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 043-120(시민행복콜센터) 충주 2번, <br>',
	        '(야간,공휴일/당직실): 043-850-5222 <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 043-850-6509 <br>',
	        '<i class="fa-solid fa-envelope"></i> 27339 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.chungju.go.kr/www/index.do" target="_blank">https://www.chungju.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow127 = new naver.maps.InfoWindow({
	        content: contentString127
	    });
	    
	    // 128번째 마커와 정보창
	    var marker128 = new naver.maps.Marker({
	        map: map,
	        position: chungbuk_jecheon_city_office
	    });
	    var contentString128 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungbuk.png" width="100" height="100" alt="충북제천시청" class="thumb"/><br>',
	        '<h2>충북제천시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청북도 제천시 내토로 295(천남동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 043-641-5114 중대재해팀: 043-641-6081, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: <br>',
	        '<i class="fa-solid fa-envelope"></i> 27188 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jecheon.go.kr/www/index.do" target="_blank">https://www.jecheon.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow128 = new naver.maps.InfoWindow({
	        content: contentString128
	    });
	    
	    // 129번째 마커와 정보창
	    var marker129 = new naver.maps.Marker({
	        map: map,
	        position: chungbuk_boeun_county_office
	    });
	    var contentString129 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungbuk.png" width="100" height="100" alt="충북보은군청" class="thumb"/><br>',
	        '<h2>충북보은군청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청북도 보은군 보은읍 군청길 38<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 043-540-3000, 4000 재난상황실: 043-540-3901~08, <br>',
	        '(야간,공휴일/당직실): 043-540-3222, 043-543-2080 <br><i class="fa-solid fa-fax"></i> 팩스(재난상황실): 043-540-3909 <br>',
	        '<i class="fa-solid fa-envelope"></i> 28943 | 공공,사회기관 &gt; 군청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.boeun.go.kr/www/index.do" target="_blank">https://www.boeun.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow129 = new naver.maps.InfoWindow({
	        content: contentString129
	    });
	    
	    // 130번째 마커와 정보창
	    var marker130 = new naver.maps.Marker({
	        map: map,
	        position: chungbuk_okcheon_county_office
	    });
	    var contentString130 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungbuk.png" width="100" height="100" alt="충북옥천군청" class="thumb"/><br>',
	        '<h2>충북옥천군청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청북도 옥천군 옥천읍 중앙로 99<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 043-730-3114, <br>',
	        '(야간,공휴일/당직실): <br><i class="fa-solid fa-fax"></i> 팩스: 043-731-2488 <br>',
	        '<i class="fa-solid fa-envelope"></i> 29032 | 공공,사회기관 &gt; 군청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.oc.go.kr/www/index.do" target="_blank">https://www.oc.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow130 = new naver.maps.InfoWindow({
	        content: contentString130
	    });
	    
	    // 126 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker126, "click", function(e) {
	        if (infowindow126.getMap()) {
	            infowindow126.close();
	        } else {
	            infowindow126.open(map, marker126);
	        }
	    });
	    
	    // 127 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker127, "click", function(e) {
	        if (infowindow127.getMap()) {
	            infowindow127.close();
	        } else {
	            infowindow127.open(map, marker127);
	        }
	    });
	    
	    // 128 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker128, "click", function(e) {
	        if (infowindow128.getMap()) {
	            infowindow128.close();
	        } else {
	            infowindow128.open(map, marker128);
	        }
	    });
	    
	    // 129 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker129, "click", function(e) {
	        if (infowindow129.getMap()) {
	            infowindow129.close();
	        } else {
	            infowindow129.open(map, marker129);
	        }
	    });
	    
	    // 130 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker130, "click", function(e) {
	        if (infowindow130.getMap()) {
	            infowindow130.close();
	        } else {
	            infowindow130.open(map, marker130);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow126.open(map, marker126);
	    
	   	
	});
	