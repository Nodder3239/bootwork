/**
 * 
 */
/*
	152.전북특별자치도 전주시
	153.전북특별자치도 군산시
	154.전북특별자치도 익산시
	155.전북특별자치도 정읍시
	156.전북특별자치도 남원시
	157.전북특별자치도 김제시
	158.전북특별자치도 완주군
	159.전북특별자치도 진안군
	160.전북특별자치도 무주군
	161.전북특별자치도 장수군
	162.전북특별자치도 임실군
	163.전북특별자치도 순창군
	164.전북특별자치도 고창군
	165.전북특별자치도 부안군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var jeonbuk_jeonju_city_office = new naver.maps.LatLng(35.82408, 127.1479);
	    var jeonbuk_gunsan_city_office = new naver.maps.LatLng(35.96747, 126.7369);
	    var jeonbuk_iksan_city_office = new naver.maps.LatLng(35.94826, 126.9577);
	    var jeonbuk_jeongeup_city_office = new naver.maps.LatLng(35.57002, 126.8564);
	    var jeonbuk_namwon_city_office = new naver.maps.LatLng(35.41636, 127.3904);	//5
	    var jeonbuk_gimje_city_office;
	    var jeonbuk_wanju_county_office;
	    var jeonbuk_jinan_county_office;
	    var jeonbuk_muju_county_office;
	    var jeonbuk_jangsu_county_office;	//10
	    var jeonbuk_imsil_county_office;
	    var jeonbuk_sunchang_county_office;
	    var jeonbuk_gochang_county_office;
	    var jeonbuk_buan_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: jeonbuk_jeonju_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 152번째 마커와 정보창
	    var marker152 = new naver.maps.Marker({
	        map: map,
	        position: jeonbuk_jeonju_city_office
	    });
	    var contentString152 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonbuk.png" width="100" height="100" alt="전북전주시청" class="thumb"/><br>',
	        '<h2>전북전주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전북특별자치도 전주시 완산구 노송광장로 10<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 063-222-1000, <br>',
	        '(야간,공휴일/당직실): 063-281-2222, 2122, 2264 <br><i class="fa-solid fa-fax"></i> 팩스: 063-281-5000 <br>',
	        '<i class="fa-solid fa-envelope"></i> 54994 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jeonju.go.kr/main/index.jsp" target="_blank">https://www.jeonju.go.kr/main/index.jsp</a>',
	        '</div>'
	    ].join('');
	    var infowindow152 = new naver.maps.InfoWindow({
	        content: contentString152
	    });
	    
	    // 153번째 마커와 정보창
	    var marker153 = new naver.maps.Marker({
	        map: map,
	        position: jeonbuk_gunsan_city_office
	    });
	    var contentString153 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonbuk.png" width="100" height="100" alt="전북군산시청" class="thumb"/><br>',
	        '<h2>전북군산시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전북특별자치도 군산시 시청로 17(조촌동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 063-454-4000, 안전총괄: 063-454-3840, <br>',
	        '(야간,공휴일/당직실): <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 063-454-6030 <br>',
	        '<i class="fa-solid fa-envelope"></i> 54078 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gunsan.go.kr/main" target="_blank">https://www.gunsan.go.kr/main</a>',
	        '</div>'
	    ].join('');
	    var infowindow153 = new naver.maps.InfoWindow({
	        content: contentString153
	    });
	    
	    // 154번째 마커와 정보창
	    var marker154 = new naver.maps.Marker({
	        map: map,
	        position: jeonbuk_iksan_city_office
	    });
	    var contentString154 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonbuk.png" width="100" height="100" alt="전북익산시청" class="thumb"/><br>',
	        '<h2>전북익산시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전북특별자치도 익산시 인북로32길 1(남중동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1577-0072, <br>',
	        '(야간,공휴일/당직실): 063-859-3222, 4222, 5222 <br><i class="fa-solid fa-fax"></i> 팩스(기획안전국): 063-859-5962 <br>',
	        '<i class="fa-solid fa-envelope"></i> 54622 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.iksan.go.kr/index.iksan?contentsSid=4639" target="_blank">https://www.iksan.go.kr/index.iksan?contentsSid=4639</a>',
	        '</div>'
	    ].join('');
	    var infowindow154 = new naver.maps.InfoWindow({
	        content: contentString154
	    });
	    
	    // 155번째 마커와 정보창
	    var marker155 = new naver.maps.Marker({
	        map: map,
	        position: jeonbuk_jeongeup_city_office
	    });
	    var contentString155 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonbuk.png" width="100" height="100" alt="전북정읍시청" class="thumb"/><br>',
	        '<h2>전북정읍시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전북특별자치도 정읍시 충정로 234(수성동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 063-539-7114, 중대재해: 063-539-5991, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 063-531-8187, (중대재해): 063-539-6528 <br>',
	        '<i class="fa-solid fa-envelope"></i> 56180 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jeongeup.go.kr/index.jeongeup" target="_blank">https://www.jeongeup.go.kr/index.jeongeup</a>',
	        '</div>'
	    ].join('');
	    var infowindow155 = new naver.maps.InfoWindow({
	        content: contentString155
	    });
	    
	    // 156번째 마커와 정보창
	    var marker156 = new naver.maps.Marker({
	        map: map,
	        position: jeonbuk_namwon_city_office
	    });
	    var contentString156 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonbuk.png" width="100" height="100" alt="전북남원시청" class="thumb"/><br>',
	        '<h2>전북남원시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전북특별자치도 남원시 시청로 60<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 063-620-6114, 재난안전대책본부: 063-634-4949, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 063-633-0444 <br>',
	        '<i class="fa-solid fa-envelope"></i> 55738 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.namwon.go.kr/index.do?contentsSid=5876" target="_blank">https://www.namwon.go.kr/index.do?contentsSid=5876</a>',
	        '</div>'
	    ].join('');
	    var infowindow156 = new naver.maps.InfoWindow({
	        content: contentString156
	    });
	    
	    // 152 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker152, "click", function(e) {
	        if (infowindow152.getMap()) {
	            infowindow152.close();
	        } else {
	            infowindow152.open(map, marker152);
	        }
	    });
	    
	    // 153 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker153, "click", function(e) {
	        if (infowindow153.getMap()) {
	            infowindow153.close();
	        } else {
	            infowindow153.open(map, marker153);
	        }
	    });
	    
	    // 154 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker154, "click", function(e) {
	        if (infowindow154.getMap()) {
	            infowindow154.close();
	        } else {
	            infowindow154.open(map, marker154);
	        }
	    });
	    
	    // 155 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker155, "click", function(e) {
	        if (infowindow155.getMap()) {
	            infowindow155.close();
	        } else {
	            infowindow155.open(map, marker155);
	        }
	    });
	    
	    // 156 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker156, "click", function(e) {
	        if (infowindow156.getMap()) {
	            infowindow156.close();
	        } else {
	            infowindow156.open(map, marker156);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow152.open(map, marker152);
	    
	   	
	});
	