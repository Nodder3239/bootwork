/**
 * 
 */
/*
	42.대구광역시 중구
	43.대구광역시 동구
	44.대구광역시 서구
	45.대구광역시 남구
	46.대구광역시 북구
	47.대구광역시 수성구
	48.대구광역시 달서구
	49.대구광역시 달성군
	50.대구광역시 군위군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var daegu_jung_gu_office = new naver.maps.LatLng(35.86928, 128.6061);
	    var daegu_dong_gu_office = new naver.maps.LatLng(35.88660, 128.6356);
	    var daegu_seo_gu_office = new naver.maps.LatLng(35.87180, 128.5592);
	    var daegu_nam_gu_office = new naver.maps.LatLng(35.84599, 128.5974);
	    var daegu_buk_gu_office = new naver.maps.LatLng(35.88566, 128.5829);	//5
	    var daegu_suseong_gu_office = new naver.maps.LatLng(35.85805, 128.6306);
	   	var daegu_dalseo_gu_office = new naver.maps.LatLng(35.82973, 128.5326);
	   	var daegu_dalseong_county_office = new naver.maps.LatLng(35.77454, 128.4313);
	   	var daegu_gunwi_county_office = new naver.maps.LatLng(36.24287, 128.5726);
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: daegu_jung_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    		
	    
	    // 42번째 마커와 정보창
	    var marker42 = new naver.maps.Marker({
	        map: map,
	        position: daegu_jung_gu_office
	    });
	    var contentString42 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구중구청" class="thumb"/><br>',
	        '<h2>대구중구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 중구 국채보상로139길 1(동인동2가)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-661-2000, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 053-661-3030 <br>',
	        '<i class="fa-solid fa-envelope"></i> 41908 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.jung.daegu.kr/new/pages/main/" target="_blank">https://www.jung.daegu.kr/new/pages/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow42 = new naver.maps.InfoWindow({
	        content: contentString42
	    });
	    
	    // 43번째 마커와 정보창
	    var marker43 = new naver.maps.Marker({
	        map: map,
	        position: daegu_dong_gu_office
	    });
	    var contentString43 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구동구청" class="thumb"/><br>',
	        '<h2>대구동구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 동구 아양로 207(신암동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-662-2000, 안전총괄과: 053-662-2892, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 053-662-2899 <br>',
	        '<i class="fa-solid fa-envelope"></i> 41185 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.dong.daegu.kr/main.do" target="_blank">https://www.dong.daegu.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow43 = new naver.maps.InfoWindow({
	        content: contentString43
	    });
	    
	    // 44번째 마커와 정보창
	    var marker44 = new naver.maps.Marker({
	        map: map,
	        position: daegu_seo_gu_office
	    });
	    var contentString44 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구서구청" class="thumb"/><br>',
	        '<h2>대구서구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 서구 국채보상로 257(평리동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-663-2000 자연재난: 053-663-2891, <br>',
	        '(야간,공휴일/당직실): 053-663-2222 <br><i class="fa-solid fa-fax"></i> 팩스(자연재난): 053-663-5892 <br>',
	        '<i class="fa-solid fa-envelope"></i> 41777 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.dgs.go.kr/dgs/" target="_blank">https://www.dgs.go.kr/dgs/</a>',
	        '</div>'
	    ].join('');
	    var infowindow44 = new naver.maps.InfoWindow({
	        content: contentString44
	    });
	    
	    // 45번째 마커와 정보창
	    var marker45 = new naver.maps.Marker({
	        map: map,
	        position: daegu_nam_gu_office
	    });
	    var contentString45 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구남구청" class="thumb"/><br>',
	        '<h2>대구남구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 남구 이천로 51(봉덕동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-664-2000, 자연재난: 053-664-2921, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 053-664-3030 , (자연재난): 053-664-2279 <br>',
	        '<i class="fa-solid fa-envelope"></i> 42429 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.nam.daegu.kr/" target="_blank">https://www.nam.daegu.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow45 = new naver.maps.InfoWindow({
	        content: contentString45
	    });
	    
	    // 46번째 마커와 정보창
	    var marker46 = new naver.maps.Marker({
	        map: map,
	        position: daegu_buk_gu_office
	    });
	    var contentString46 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구북구청" class="thumb"/><br>',
	        '<h2>대구북구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 북구 옥산로 65(침산동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-665-2000 자연재난: 053-665-4351, <br>',
	        '(야간,공휴일/당직실): 053-665-2222 <br><i class="fa-solid fa-fax"></i> 팩스: 053-665-3030, (자연재난): 053-665-2899 <br>',
	        '<i class="fa-solid fa-envelope"></i> 41590 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.buk.daegu.kr/" target="_blank">https://www.buk.daegu.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow46 = new naver.maps.InfoWindow({
	        content: contentString46
	    });
	    
	    // 47번째 마커와 정보창
	    var marker47 = new naver.maps.Marker({
	        map: map,
	        position: daegu_suseong_gu_office
	    });
	    var contentString47 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구수성구청" class="thumb"/><br>',
	        '<h2>대구수성구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 수성구 달구벌대로 2450(범어동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-666-2000, 안전총괄과: 053-666-2961, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스: 053-666-3030, (안전총괄과): 053-666-2969 <br>',
	        '<i class="fa-solid fa-envelope"></i> 42086 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.suseong.kr/" target="_blank">https://www.suseong.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow47 = new naver.maps.InfoWindow({
	        content: contentString47
	    });
	    
	    // 48번째 마커와 정보창
	    var marker48 = new naver.maps.Marker({
	        map: map,
	        position: daegu_dalseo_gu_office
	    });
	    var contentString48 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구달서구청" class="thumb"/><br>',
	        '<h2>대구달서구청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 달서구 학산로 45(월성동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-667-2000, 재난안전상황실: 053-667-2282, <br>',
	        '(야간,공휴일/당직실): 053-667-2222 <br><i class="fa-solid fa-fax"></i> 팩스: 053-636-1251 <br>',
	        '<i class="fa-solid fa-envelope"></i> 42731 | 공공,사회기관 &gt; 구청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.dalseo.daegu.kr/" target="_blank">https://www.dalseo.daegu.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow48 = new naver.maps.InfoWindow({
	        content: contentString48
	    });
	    
	    // 49번째 마커와 정보창
	    var marker49 = new naver.maps.Marker({
	        map: map,
	        position: daegu_dalseong_county_office
	    });
	    var contentString49 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구달성군청" class="thumb"/><br>',
	        '<h2>대구달성군청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 달성군 논공읍 달성군청로 33<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 053-668-2000, <br>',
	        '(야간,공휴일/당직실): 053-668-2222 <br><i class="fa-solid fa-fax"></i> 팩스: 053-668-3030, (당직실): 053-282-7020 <br>',
	        '<i class="fa-solid fa-envelope"></i> 42794 | 공공,사회기관 &gt; 군청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.dalseong.daegu.kr/" target="_blank">https://www.dalseong.daegu.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow49 = new naver.maps.InfoWindow({
	        content: contentString49
	    });
	    
	    // 50번째 마커와 정보창
	    var marker50 = new naver.maps.Marker({
	        map: map,
	        position: daegu_gunwi_county_office
	    });
	    var contentString50 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconDaegu.png" width="100" height="100" alt="대구군위군청" class="thumb"/><br>',
	        '<h2>대구군위군청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 대구광역시 군위군 군위읍 군청로 200<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 054-383-2181, <br>',
	        '(야간,공휴일/당직실): 054-383-3000 <br><i class="fa-solid fa-fax"></i> 팩스: 054-380-6221 <br>',
	        '<i class="fa-solid fa-envelope"></i> 43113 | 공공,사회기관 &gt; 군청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gunwi.go.kr/ko/index.do" target="_blank">https://www.gunwi.go.kr/ko/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow50 = new naver.maps.InfoWindow({
	        content: contentString50
	    });
	    
	    // 42 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker42, "click", function(e) {
	        if (infowindow42.getMap()) {
	            infowindow42.close();
	        } else {
	            infowindow42.open(map, marker42);
	        }
	    });
	    
	    // 43 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker43, "click", function(e) {
	        if (infowindow43.getMap()) {
	            infowindow43.close();
	        } else {
	            infowindow43.open(map, marker43);
	        }
	    });
	    
	    // 44 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker44, "click", function(e) {
	        if (infowindow44.getMap()) {
	            infowindow44.close();
	        } else {
	            infowindow44.open(map, marker44);
	        }
	    });
	    
	    // 45 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker45, "click", function(e) {
	        if (infowindow45.getMap()) {
	            infowindow45.close();
	        } else {
	            infowindow45.open(map, marker45);
	        }
	    });
	    
	    // 46 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker46, "click", function(e) {
	        if (infowindow46.getMap()) {
	            infowindow46.close();
	        } else {
	            infowindow46.open(map, marker46);
	        }
	    });
	    
	    // 47 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker47, "click", function(e) {
	        if (infowindow47.getMap()) {
	            infowindow47.close();
	        } else {
	            infowindow47.open(map, marker47);
	        }
	    });
	    
	    // 48 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker48, "click", function(e) {
	        if (infowindow48.getMap()) {
	            infowindow48.close();
	        } else {
	            infowindow48.open(map, marker48);
	        }
	    });
	    
	    // 49 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker49, "click", function(e) {
	        if (infowindow49.getMap()) {
	            infowindow49.close();
	        } else {
	            infowindow49.open(map, marker49);
	        }
	    });
	    
	    // 50 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker50, "click", function(e) {
	        if (infowindow50.getMap()) {
	            infowindow50.close();
	        } else {
	            infowindow50.open(map, marker50);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow42.open(map, marker42);
	   	
	});
	