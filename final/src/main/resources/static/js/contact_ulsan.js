/**
 * 
 */
/*
	71.울산광역시 중구
	72.울산광역시 남구
	73.울산광역시 동구
	74.울산광역시 북구
	75.울산광역시 울주군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var ulsan_jung_gu_office = new naver.maps.LatLng(35.56949, 129.3328);
	    var ulsan_nam_gu_office = new naver.maps.LatLng(35.54383, 129.3301);
	    var ulsan_dong_gu_office = new naver.maps.LatLng(35.50494, 129.4167);
	    var ulsan_buk_gu_office = new naver.maps.LatLng(35.58271, 129.3612);
	    var ulsan_ulju_county_office = new naver.maps.LatLng(35.52246, 129.2425);	//5
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: ulsan_jung_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    		
	    
	    // 71번째 마커와 정보창
	    var marker71 = new naver.maps.Marker({
	        map: map,
	        position: ulsan_jung_gu_office
	    });
	    var contentString71 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconUlsan.png" width="100" height="100" alt="울산중구청" class="thumb"/><br>',
	        '<h2>울산중구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 울산광역시 중구 단장골길1(복산동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 052-290-3000, 재난관리: 052-290-4061~67, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 052-290-3999, (재난관리): 052-290-4069 <br>',
	        '<i class="fa-solid fa-envelope"></i> 44475 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.junggu.ulsan.kr/index.ulsan" target="_blank">https://www.junggu.ulsan.kr/index.ulsan</a>',
	        '</div>'
	    ].join('');
	    var infowindow71 = new naver.maps.InfoWindow({
	        content: contentString71
	    });
	    
	    // 72번째 마커와 정보창
	    var marker72 = new naver.maps.Marker({
	        map: map,
	        position: ulsan_nam_gu_office
	    });
	    var contentString72 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconUlsan.png" width="100" height="100" alt="울산남구청" class="thumb"/><br>',
	        '<h2>울산남구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 울산광역시 남구 돋질로 233(달동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 052-275-7541, <br>',
	        '(야간,공휴일/당직실): 052-226-5555~8 <br><i class="fa-solid fa-fax"></i> 팩스: 052-226-5559 <br>',
	        '<i class="fa-solid fa-envelope"></i> 44701 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.ulsannamgu.go.kr/easyMain/mainPage.do" target="_blank">https://www.ulsannamgu.go.kr/easyMain/mainPage.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow72 = new naver.maps.InfoWindow({
	        content: contentString72
	    });
	    
	    // 73번째 마커와 정보창
	    var marker73 = new naver.maps.Marker({
	        map: map,
	        position: ulsan_dong_gu_office
	    });
	    var contentString73 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconUlsan.png" width="100" height="100" alt="울산동구청" class="thumb"/><br>',
	        '<h2>울산동구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 울산광역시 동구 봉수로 155(화정동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 052-209-3000, 해피콜센터: 052-235-8282, <br>',
	        '(야간,공휴일/당직실): 052-209-3222 <br><i class="fa-solid fa-fax"></i> 팩스: 052-209-3009, (당직실): 052-209-3229 <br>',
	        '<i class="fa-solid fa-envelope"></i> 44021 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.donggu.ulsan.kr/" target="_blank">https://www.donggu.ulsan.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow73 = new naver.maps.InfoWindow({
	        content: contentString73
	    });
	    
	    // 74번째 마커와 정보창
	    var marker74 = new naver.maps.Marker({
	        map: map,
	        position: ulsan_buk_gu_office
	    });
	    var contentString74 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconUlsan.png" width="100" height="100" alt="울산북구청" class="thumb"/><br>',
	        '<h2>울산북구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 울산광역시 북구 산업로 1010(연암동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 052-241-7000, 자연재난: 052-241-7831~4, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 052-289-7272, (자연재난): 052-241-7899 <br>',
	        '<i class="fa-solid fa-envelope"></i> 44248 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.bukgu.ulsan.kr/index.do" target="_blank">https://www.bukgu.ulsan.kr/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow74 = new naver.maps.InfoWindow({
	        content: contentString74
	    });
	    
	    // 75번째 마커와 정보창
	    var marker75 = new naver.maps.Marker({
	        map: map,
	        position: ulsan_ulju_county_office
	    });
	    var contentString75 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconUlsan.png" width="100" height="100" alt="울산울주군청" class="thumb"/><br>',
	        '<h2>울산울주군청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 울산광역시 울주군 청량읍 군청로 1<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 052-204-1000, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 052-204-2319 <br>',
	        '<i class="fa-solid fa-envelope"></i> 44959 | 공공,사회기관 &gt; 군청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.ulju.ulsan.kr/ulju/main.do" target="_blank">https://www.ulju.ulsan.kr/ulju/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow75 = new naver.maps.InfoWindow({
	        content: contentString75
	    });
	    
	    // 71 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker71, "click", function(e) {
	        if (infowindow71.getMap()) {
	            infowindow71.close();
	        } else {
	            infowindow71.open(map, marker71);
	        }
	    });
	    
	    // 72 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker72, "click", function(e) {
	        if (infowindow72.getMap()) {
	            infowindow72.close();
	        } else {
	            infowindow72.open(map, marker72);
	        }
	    });
	    
	    // 73 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker73, "click", function(e) {
	        if (infowindow73.getMap()) {
	            infowindow73.close();
	        } else {
	            infowindow73.open(map, marker73);
	        }
	    });
	    
	    // 74 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker74, "click", function(e) {
	        if (infowindow74.getMap()) {
	            infowindow74.close();
	        } else {
	            infowindow74.open(map, marker74);
	        }
	    });
	    
	    // 75 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker75, "click", function(e) {
	        if (infowindow75.getMap()) {
	            infowindow75.close();
	        } else {
	            infowindow75.open(map, marker75);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow71.open(map, marker71);
	    
	   	
	});
	