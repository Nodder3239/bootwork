/**
 * 
 */
/*
	228.제주특별자치도 제주시
	229.제주특별자치도 서귀포시제1청사
	230.제주특별자치도 서귀포시제2청사
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var jeju_jeju_city_office = new naver.maps.LatLng(33.49965, 126.5312);
		var jeju_seogwipo1_city_office = new naver.maps.LatLng(33.25394, 126.5596);
		var jeju_seogwipo2_city_office = new naver.maps.LatLng(33.25563, 126.5106);
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: jeju_jeju_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 228번째 마커와 정보창
	    var marker228 = new naver.maps.Marker({
	        map: map,
	        position: jeju_jeju_city_office
	    });
	    var contentString228 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeju.png" width="100" height="100" alt="제주시청" class="thumb"/><br>',
	        '<h2>제주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 제주특별자치도 제주시 광양9길 10<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 064-120(만덕콜센터), 064-728-3222, 재난관리: 064-728-3011~7, <br>',
	        '(야간,공휴일/당직실): 064-728-2222 <br><i class="fa-solid fa-fax"></i> 팩스(안전교통국): 064-728-3759 <br>',
	        '<i class="fa-solid fa-envelope"></i> 63208 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jejusi.go.kr/index.ac" target="_blank">https://www.jejusi.go.kr/index.ac</a>',
	        '</div>'
	    ].join('');
	    var infowindow228 = new naver.maps.InfoWindow({
	        content: contentString228
	    });
	    
	    // 229번째 마커와 정보창
	    var marker229 = new naver.maps.Marker({
	        map: map,
	        position: jeju_seogwipo1_city_office
	    });
	    var contentString229 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeju.png" width="100" height="100" alt="제주서귀포시청제1청사" class="thumb"/><br>',
	        '<h2>제주서귀포시청제1청사</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 제1청사: 제주특별자치도 서귀포시 중앙로 105(서홍동), 제2청사 제주특별자치도 서귀포시 신중로 55(법환동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 064-120(만덕콜센터), 재난관리: 064-760-3281, <br>',
	        '(야간,공휴일/당직실): 064-760-3181 <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄): 064-760-3149 <br>',
	        '<i class="fa-solid fa-envelope"></i> 63584, 63565 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.seogwipo.go.kr/" target="_blank">https://www.seogwipo.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow229 = new naver.maps.InfoWindow({
	        content: contentString229
	    });
	    
	    // 230번째 마커와 정보창
	    var marker230 = new naver.maps.Marker({
	        map: map,
	        position: jeju_seogwipo2_city_office
	    });
	    var contentString230 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconJeju.png" width="100" height="100" alt="제주서귀포시청제2청사" class="thumb"/><br>',
	        '<h2>제주서귀포시청제2청사</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 제1청사: 제주특별자치도 서귀포시 중앙로 105(서홍동), 제2청사 제주특별자치도 서귀포시 신중로 55(법환동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 064-120(만덕콜센터), 재난관리: 064-760-3281, <br>',
	        '(야간,공휴일/당직실): 064-760-3181 <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄): 064-760-3149 <br>',
	        '<i class="fa-solid fa-envelope"></i> 63584, 63565 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.seogwipo.go.kr/" target="_blank">https://www.seogwipo.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow230 = new naver.maps.InfoWindow({
	        content: contentString230
	    });
	    
	    // 228 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker228, "click", function(e) {
	        if (infowindow228.getMap()) {
	            infowindow228.close();
	        } else {
	            infowindow228.open(map, marker228);
	        }
	    });
	    
	    // 229 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker229, "click", function(e) {
	        if (infowindow229.getMap()) {
	            infowindow229.close();
	        } else {
	            infowindow229.open(map, marker229);
	        }
	    });
	    
	    // 230 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker230, "click", function(e) {
	        if (infowindow230.getMap()) {
	            infowindow230.close();
	        } else {
	            infowindow230.open(map, marker230);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow228.open(map, marker228);
	    
	   	
	});
	