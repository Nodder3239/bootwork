/**
 * 
 */

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var incheon_jung_gu_office = new naver.maps.LatLng(37.47371, 126.6215);
	    var incheon_dong_gu_office = new naver.maps.LatLng(37.47387, 126.6432);
	    var incheon_michuhol_gu_office = new naver.maps.LatLng(37.46347, 126.6503);
	    var incheon_yeonsu_gu_office = new naver.maps.LatLng(37.41017, 126.6783);
	    var incheon_namdong_gu_office = new naver.maps.LatLng(37.44725, 126.7315);	//5
	    var incheon_bupyeong_gu_office = new naver.maps.LatLng(37.50705, 126.7219);
	    var incheon_gyeyang_gu_office = new naver.maps.LatLng(37.53737, 126.7377);
	    var incheon_seo_gu_office = new naver.maps.LatLng(37.54529, 126.6760);
	    var incheon_ganghwa_gun_office = new naver.maps.LatLng(37.74650, 126.4881);
	    var incheon_ongjin_gun_office = new naver.maps.LatLng(37.44658, 126.6368);	//10
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: incheon_jung_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    		
	    
	    // 51번째 마커와 정보창
	    var marker51 = new naver.maps.Marker({
	        map: map,
	        position: incheon_jung_gu_office
	    });
	    var contentString51 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천중구구청" class="thumb" /><br />',
	        '<h3>인천중구구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 중구 신포로27번길 80(관동1가)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-120, 032-760-7114(미추홀 콜센터), <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 032-760-7111 <br />',
	        '<i class="fa-solid fa-envelope"></i> 22315 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.icjg.go.kr/index" target="_blank">https://www.icjg.go.kr/index</a>',
	        '</div>'
	    ].join('');
	    var infowindow51 = new naver.maps.InfoWindow({
	        content: contentString51
	    });
	    
	    // 52번째 마커와 정보창
	    var marker52 = new naver.maps.Marker({
	        map: map,
	        position: incheon_dong_gu_office
	    });
	    var contentString52 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천동구구청" class="thumb" /><br />',
	        '<h3>인천동구구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 동구 금곡로 67(송림동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-120, 032-770-6114(미추홀 콜센터) 안전관리과: 032-770-6560, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> (안전관리과)032-770-6569 <br />',
	        '<i class="fa-solid fa-envelope"></i> 22556 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.icdonggu.go.kr/" target="_blank">https://www.icdonggu.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow52 = new naver.maps.InfoWindow({
	        content: contentString52
	    });
	    
	    // 53번째 마커와 정보창
	    var marker53 = new naver.maps.Marker({
	        map: map,
	        position: incheon_michuhol_gu_office
	    });
	    var contentString53 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천미추홀구청" class="thumb" /><br />',
	        '<h3>인천미추홀구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 미추홀구 독정이로 95<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-887-1011, <br/>',
	        ' 032-880-4222(야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> <br />',
	        '<i class="fa-solid fa-envelope"></i> 22169 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.michuhol.go.kr/main/main.do" target="_blank">https://www.michuhol.go.kr/main/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow53 = new naver.maps.InfoWindow({
	        content: contentString53
	    });
	    
	    // 54번째 마커와 정보창
	    var marker54 = new naver.maps.Marker({
	        map: map,
	        position: incheon_yeonsu_gu_office
	    });
	    var contentString54 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천연수구청" class="thumb" /><br />',
	        '<h3>인천연수구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 연수구 원인재로 115(동춘동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-749-7114(미추홀 콜센터), <br/>',
	        ' 032-749-7110(야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>(안전관리과) 032-749-8849 <br />',
	        '<i class="fa-solid fa-envelope"></i> 21967 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yeonsu.go.kr/main/" target="_blank">https://www.yeonsu.go.kr/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow54 = new naver.maps.InfoWindow({
	        content: contentString54
	    });
	    
	    // 55번째 마커와 정보창
	    var marker55 = new naver.maps.Marker({
	        map: map,
	        position: incheon_namdong_gu_office
	    });
	    var contentString55 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천남동구청" class="thumb" /><br />',
	        '<h3>인천남동구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 남동구 소래로 633(만수동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-466-3811(미추홀 콜센터), <br/>',
	        ' 032-453-2222(야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>(안전총괄과) 032-453-2319 <br />',
	        '<i class="fa-solid fa-envelope"></i> 21589 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.namdong.go.kr/" target="_blank">https://www.namdong.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow55 = new naver.maps.InfoWindow({
	        content: contentString55
	    });
	    
	    // 56번째 마커와 정보창
	    var marker56 = new naver.maps.Marker({
	        map: map,
	        position: incheon_bupyeong_gu_office
	    });
	    var contentString56 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천부평구청" class="thumb" /><br />',
	        '<h3>인천부평구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 부평구 부평대로 168<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-504-2114 재난관리팀: 032-509-6360, <br/>',
	        ' 032-509-6222(야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>(안전총괄과) 032-509-5009 <br />',
	        '<i class="fa-solid fa-envelope"></i> 21354 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.icbp.go.kr/main/" target="_blank">https://www.icbp.go.kr/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow56 = new naver.maps.InfoWindow({
	        content: contentString56
	    });
	    
	    // 57번째 마커와 정보창
	    var marker57 = new naver.maps.Marker({
	        map: map,
	        position: incheon_gyeyang_gu_office
	    });
	    var contentString57 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천계양구청" class="thumb" /><br />',
	        '<h3>인천계양구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 계양구 계산새로 88(계산동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-551-5701 재난관리: 032-450-5911, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>(안전관리과) 032-545-6363 <br />',
	        '<i class="fa-solid fa-envelope"></i> 21067 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gyeyang.go.kr/open_content/main/" target="_blank">https://www.gyeyang.go.kr/open_content/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow57 = new naver.maps.InfoWindow({
	        content: contentString57
	    });
	    
	    // 58번째 마커와 정보창
	    var marker58 = new naver.maps.Marker({
	        map: map,
	        position: incheon_seo_gu_office
	    });
	    var contentString58 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천서구청" class="thumb" /><br />',
	        '<h3>인천서구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 서구 서곶로 307(심곡동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-562-5301 자연재난팀: 032-560-4700, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 032-560-2777 <br />',
	        '<i class="fa-solid fa-envelope"></i> 22726 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.seo.incheon.kr/open_content/main/" target="_blank">https://www.seo.incheon.kr/open_content/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow58 = new naver.maps.InfoWindow({
	        content: contentString58
	    });
	    
	    // 59번째 마커와 정보창
	    var marker59 = new naver.maps.Marker({
	        map: map,
	        position: incheon_ganghwa_gun_office
	    });
	    var contentString59 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천강화군청" class="thumb" /><br />',
	        '<h3>인천강화군청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 강화군 강화읍 강화대로 394<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-930-3114 재난관리: 032-930-3009, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 032-930-3660 (안전총괄과)032-930-3837 <br />',
	        '<i class="fa-solid fa-envelope"></i> 23031 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.ganghwa.go.kr/open_content/main/" target="_blank">https://www.ganghwa.go.kr/open_content/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow59 = new naver.maps.InfoWindow({
	        content: contentString59
	    });
	    
	    // 60번째 마커와 정보창
	    var marker60 = new naver.maps.Marker({
	        map: map,
	        position: incheon_ongjin_gun_office
	    });
	    var contentString60 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="인천옹진군청" class="thumb" /><br />',
	        '<h3>인천옹진군청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 인천광역시 미추홀구 매소홀로 120(용현동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-899-2114 자연재난: 032-899-2490, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 032-899-3399,3339 <br />',
	        '<i class="fa-solid fa-envelope"></i> 22193 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.ongjin.go.kr/open_content/main/" target="_blank">https://www.ongjin.go.kr/open_content/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow60 = new naver.maps.InfoWindow({
	        content: contentString60
	    });
	    
	    // 51 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker51, "click", function(e) {
	        if (infowindow51.getMap()) {
	            infowindow51.close();
	        } else {
	            infowindow51.open(map, marker51);
	        }
	    });
	    
	    // 52 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker52, "click", function(e) {
	        if (infowindow52.getMap()) {
	            infowindow52.close();
	        } else {
	            infowindow52.open(map, marker52);
	        }
	    });
	    
	    // 53 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker53, "click", function(e) {
	        if (infowindow53.getMap()) {
	            infowindow53.close();
	        } else {
	            infowindow53.open(map, marker53);
	        }
	    });
	    
	    // 54 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker54, "click", function(e) {
	        if (infowindow54.getMap()) {
	            infowindow54.close();
	        } else {
	            infowindow54.open(map, marker54);
	        }
	    });
	    
	    // 55 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker55, "click", function(e) {
	        if (infowindow55.getMap()) {
	            infowindow55.close();
	        } else {
	            infowindow55.open(map, marker55);
	        }
	    });
	    
	    // 56 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker56, "click", function(e) {
	        if (infowindow56.getMap()) {
	            infowindow56.close();
	        } else {
	            infowindow56.open(map, marker56);
	        }
	    });
	    
	    // 57 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker57, "click", function(e) {
	        if (infowindow57.getMap()) {
	            infowindow57.close();
	        } else {
	            infowindow57.open(map, marker57);
	        }
	    });
	    
	    // 58 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker58, "click", function(e) {
	        if (infowindow58.getMap()) {
	            infowindow58.close();
	        } else {
	            infowindow58.open(map, marker58);
	        }
	    });
	    
	    // 59 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker59, "click", function(e) {
	        if (infowindow59.getMap()) {
	            infowindow59.close();
	        } else {
	            infowindow59.open(map, marker59);
	        }
	    });
	    
	    // 60 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker60, "click", function(e) {
	        if (infowindow60.getMap()) {
	            infowindow60.close();
	        } else {
	            infowindow60.open(map, marker60);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow51.open(map, marker51);
	   	
	});
	