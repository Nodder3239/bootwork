/**
 * 
 */
/*
	166.전라남도 목포시
	167.전라남도 여수시
	168.전라남도 순천시
	169.전라남도 나주시
	170.전라남도 광양시
	171.전라남도 담양군
	172.전라남도 곡성군
	173.전라남도 구례군
	174.전라남도 고흥군
	175.전라남도 보성군
	176.전라남도 화순군
	177.전라남도 장흥군
	178.전라남도 강진군
	179.전라남도 해남군
	180.전라남도 영암군
	181.전라남도 무안군
	182.전라남도 함평군
	183.전라남도 영광군
	184.전라남도 장성군
	185.전라남도 완도군
	186.전라남도 진도군
	187.전라남도 신안군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var jeonnam_mokpo_city_office = new naver.maps.LatLng(34.81183, 126.3922);
	    var jeonnam_yeosu_city_office = new naver.maps.LatLng(34.76041, 127.6623);
	    var jeonnam_suncheon_city_office = new naver.maps.LatLng(34.95064, 127.4873);
	    var jeonnam_naju_city_office = new naver.maps.LatLng(35.01588, 126.7110);
		var jeonnam_gwangyang_city_office = new naver.maps.LatLng(34.94042, 127.6960);	//5
		var jeonnam_damyang_county_office;
		var jeonnam_gokseong_county_office;
		var jeonnam_gurye_county_office;
		var jeonnam_goheung_county_office;
		var jeonnam_boseong_county_office;	//10
		var jeonnam_hwasun_county_office;
		var jeonnam_jangheung_county_office;
		var jeonnam_gangjin_county_office;
		var jeonnam_haenam_county_office;
		var jeonnam_yeongam_county_office;	//15
		var jeonnam_muan_county_office;
		var jeonnam_hampyeong_county_office;
		var jeonnam_yeonggwang_county_office;
		var jeonnam_jangseong_county_office;
		var jeonnam_wando_county_office;	//20
		var jeonnam_jindo_county_office;
		var jeonnam_sinan_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: jeonnam_mokpo_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 166번째 마커와 정보창
	    var marker166 = new naver.maps.Marker({
	        map: map,
	        position: jeonnam_mokpo_city_office
	    });
	    var contentString166 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonnam.png" width="100" height="100" alt="전남목포시청" class="thumb"/><br>',
	        '<h2>전남목포시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전라남도 목포시 양을로 203(용당동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 061-272-2171, 중대재해: 061-270-8648, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 061-270-3598 <br>',
	        '<i class="fa-solid fa-envelope"></i> 58613 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.mokpo.go.kr/www" target="_blank">https://www.mokpo.go.kr/www</a>',
	        '</div>'
	    ].join('');
	    var infowindow166 = new naver.maps.InfoWindow({
	        content: contentString166
	    });
	    
	    // 167번째 마커와 정보창
	    var marker167 = new naver.maps.Marker({
	        map: map,
	        position: jeonnam_yeosu_city_office
	    });
	    var contentString167 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonnam.png" width="100" height="100" alt="전남여수시청" class="thumb"/><br>',
	        '<h2>전남여수시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전라남도 여수시 시청로 1(학동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 061-659-2114, 1899-2012, 재난안전상황실: 061-659-4949, <br>',
	        '(야간,공휴일/당직실): 061-659-3345~3347 <br><i class="fa-solid fa-fax"></i> 팩스(재난안전상황실): 061-659-5893, (당직실): 061-659-5877 <br>',
	        '<i class="fa-solid fa-envelope"></i> 59675 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.yeosu.go.kr/" target="_blank">https://www.yeosu.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow167 = new naver.maps.InfoWindow({
	        content: contentString167
	    });
	    
	    // 168번째 마커와 정보창
	    var marker168 = new naver.maps.Marker({
	        map: map,
	        position: jeonnam_suncheon_city_office
	    });
	    var contentString168 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonnam.png" width="100" height="100" alt="전남순천시청" class="thumb"/><br>',
	        '<h2>전남순천시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전라남도 순천시 장명로 30(장천동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 061-749-3114, 재난안전상황실: 061-749-6622, <br>',
	        '(야간,공휴일/당직실): 061-749-5462 <br><i class="fa-solid fa-fax"></i> 팩스(재난안전상황실): 061-749-4616 <br>',
	        '<i class="fa-solid fa-envelope"></i> 57956 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.suncheon.go.kr/kr/" target="_blank">https://www.suncheon.go.kr/kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow168 = new naver.maps.InfoWindow({
	        content: contentString168
	    });
	    
	    // 169번째 마커와 정보창
	    var marker169 = new naver.maps.Marker({
	        map: map,
	        position: jeonnam_naju_city_office
	    });
	    var contentString169 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonnam.png" width="100" height="100" alt="전남나주시청" class="thumb"/><br>',
	        '<h2>전남나주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전라남도 나주시 시청길 22(송월동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 061-339-8114, 통합관제상황실: 061-339-4701~5, <br>',
	        '(야간,공휴일/당직실): 061-339-8222 <br><i class="fa-solid fa-fax"></i> 팩스(안전재난과): 061-339-2829 <br>',
	        '<i class="fa-solid fa-envelope"></i> 58263 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.naju.go.kr/" target="_blank">https://www.naju.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow169 = new naver.maps.InfoWindow({
	        content: contentString169
	    });
	    
	    // 170번째 마커와 정보창
	    var marker170 = new naver.maps.Marker({
	        map: map,
	        position: jeonnam_gwangyang_city_office
	    });
	    var contentString170 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeonnam.png" width="100" height="100" alt="전남광양시청" class="thumb"/><br>',
	        '<h2>전남광양시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 전라남도 광양시 시청로 33(중동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 061-797-2114, 재난상황실: 061-797-4949, 4950, <br>',
	        '(야간,공휴일/당직실): 061-797-2223, 2225 <br><i class="fa-solid fa-fax"></i> 팩스: 061-797-2598, (안전재난과): 061-797-2119 <br>',
	        '<i class="fa-solid fa-envelope"></i> 57785 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://gwangyang.go.kr/kor/" target="_blank">https://gwangyang.go.kr/kor/</a>',
	        '</div>'
	    ].join('');
	    var infowindow170 = new naver.maps.InfoWindow({
	        content: contentString170
	    });
	    
	    // 166 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker166, "click", function(e) {
	        if (infowindow166.getMap()) {
	            infowindow166.close();
	        } else {
	            infowindow166.open(map, marker166);
	        }
	    });
	    
	    // 167 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker167, "click", function(e) {
	        if (infowindow167.getMap()) {
	            infowindow167.close();
	        } else {
	            infowindow167.open(map, marker167);
	        }
	    });
	    
	    // 168 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker168, "click", function(e) {
	        if (infowindow168.getMap()) {
	            infowindow168.close();
	        } else {
	            infowindow168.open(map, marker168);
	        }
	    });
	    
	    // 169 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker169, "click", function(e) {
	        if (infowindow169.getMap()) {
	            infowindow169.close();
	        } else {
	            infowindow169.open(map, marker169);
	        }
	    });
	    
	    // 170 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker170, "click", function(e) {
	        if (infowindow170.getMap()) {
	            infowindow170.close();
	        } else {
	            infowindow170.open(map, marker170);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow166.open(map, marker166);
	    
	   	
	});
	