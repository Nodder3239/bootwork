/**
 * 
 */
/*
	61.광주광역시 동구
	62.광주광역시 서구
	63.광주광역시 남구
	64.광주광역시 북구
	65.광주광역시 광산구
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var gwangju_dong_gu_office = new naver.maps.LatLng(35.14595, 126.9231);
	    var gwangju_seo_gu_office = new naver.maps.LatLng(35.15202, 126.8900);
	    var gwangju_nam_gu_office = new naver.maps.LatLng(35.13304, 126.9022);
	    var gwangju_buk_gu_office = new naver.maps.LatLng(35.17421, 126.9122);
	    var gwangju_gwangsan_gu_office = new naver.maps.LatLng(35.13959, 126.7938);	//5
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: gwangju_dong_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    
	    // 61번째 마커와 정보창
	    var marker61 = new naver.maps.Marker({
	        map: map,
	        position: gwangju_dong_gu_office
	    });
	    var contentString61 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGwangju.png" width="100" height="100" alt="광주동구청" class="thumb"/><br>',
	        '<h2>광주동구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 광주광역시 동구 서남로 1(서석동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 062-608-2114, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 062-608-2111 <br>',
	        '<i class="fa-solid fa-envelope"></i> 61466 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.donggu.kr/index.es?sid=a1" target="_blank">https://www.donggu.kr/index.es?sid=a1</a>',
	        '</div>'
	    ].join('');
	    var infowindow61 = new naver.maps.InfoWindow({
	        content: contentString61
	    });
	    
	    // 62번째 마커와 정보창
	    var marker62 = new naver.maps.Marker({
	        map: map,
	        position: gwangju_seo_gu_office
	    });
	    var contentString62 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGwangju.png" width="100" height="100" alt="광주서구청" class="thumb"/><br>',
	        '<h2>광주서구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 광주광역시 서구 경열로 33(농성동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 062-360-7114, 안전총괄과: 062-360-7495, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 062-360-7600, (안전총괄과): 062-360-7554 <br>',
	        '<i class="fa-solid fa-envelope"></i> 61928 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.seogu.gwangju.kr/kor/" target="_blank">https://www.seogu.gwangju.kr/kor/</a>',
	        '</div>'
	    ].join('');
	    var infowindow62 = new naver.maps.InfoWindow({
	        content: contentString62
	    });
	    
	    // 63번째 마커와 정보창
	    var marker63 = new naver.maps.Marker({
	        map: map,
	        position: gwangju_nam_gu_office
	    });
	    var contentString63 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGwangju.png" width="100" height="100" alt="광주남구청" class="thumb"/><br>',
	        '<h2>광주남구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 광주광역시 남구 봉선로 1(봉선동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 062-651-9020, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 062-607-2805 <br>',
	        '<i class="fa-solid fa-envelope"></i> 61687 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.namgu.gwangju.kr/index.es?sid=a1" target="_blank">https://www.namgu.gwangju.kr/index.es?sid=a1</a>',
	        '</div>'
	    ].join('');
	    var infowindow63 = new naver.maps.InfoWindow({
	        content: contentString63
	    });
	    
	    // 64번째 마커와 정보창
	    var marker64 = new naver.maps.Marker({
	        map: map,
	        position: gwangju_buk_gu_office
	    });
	    var contentString64 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGwangju.png" width="100" height="100" alt="광주북구청" class="thumb"/><br>',
	        '<h2>광주북구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 광주광역시 북구 우치로 77(용봉동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 062-410-8000, 안전총괄과: 062-410-6726, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 062-510-1480, (안전총괄과): 062-510-1446 <br>',
	        '<i class="fa-solid fa-envelope"></i> 61187 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://bukgu.gwangju.kr/" target="_blank">https://bukgu.gwangju.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow64 = new naver.maps.InfoWindow({
	        content: contentString64
	    });
	    
	    // 65번째 마커와 정보창
	    var marker65 = new naver.maps.Marker({
	        map: map,
	        position: gwangju_gwangsan_gu_office
	    });
	    var contentString65 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGwangju.png" width="100" height="100" alt="광주광산구청" class="thumb"/><br>',
	        '<h2>광주광산구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 광주광역시 광산구 광산로29번길 15(송정동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 062-960-8114, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 062-960-8990 <br>',
	        '<i class="fa-solid fa-envelope"></i> 62430 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gwangsan.go.kr/" target="_blank">https://www.gwangsan.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow65 = new naver.maps.InfoWindow({
	        content: contentString65
	    });
	    
	    // 61 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker61, "click", function(e) {
	        if (infowindow61.getMap()) {
	            infowindow61.close();
	        } else {
	            infowindow61.open(map, marker61);
	        }
	    });
	    
	    // 62 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker62, "click", function(e) {
	        if (infowindow62.getMap()) {
	            infowindow62.close();
	        } else {
	            infowindow62.open(map, marker62);
	        }
	    });
	    
	    // 63 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker63, "click", function(e) {
	        if (infowindow63.getMap()) {
	            infowindow63.close();
	        } else {
	            infowindow63.open(map, marker63);
	        }
	    });
	    
	    // 64 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker64, "click", function(e) {
	        if (infowindow64.getMap()) {
	            infowindow64.close();
	        } else {
	            infowindow64.open(map, marker64);
	        }
	    });
	    
	    // 65 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker65, "click", function(e) {
	        if (infowindow65.getMap()) {
	            infowindow65.close();
	        } else {
	            infowindow65.open(map, marker65);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow61.open(map, marker61);
	   	
	});
	