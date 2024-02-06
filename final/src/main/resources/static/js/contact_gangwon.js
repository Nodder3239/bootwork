/**
 * 
 */

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var gangwon_chuncheon_city_office = new naver.maps.LatLng(37.88128, 127.7301);
	    var gangwon_wonju_city_office = new naver.maps.LatLng(37.34287, 127.9212);
	    var gangwon_gangneung_city_office = new naver.maps.LatLng(37.75200, 128.8760);
	    var gangwon_donghae_city_office = new naver.maps.LatLng(37.52475, 129.1143);
	    var gangwon_taebaek_city_office = new naver.maps.LatLng(37.16410, 128.9857);	//5
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: gangwon_chuncheon_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    
	    // 108번째 마커와 정보창
	    var marker108 = new naver.maps.Marker({
	        map: map,
	        position: gangwon_chuncheon_city_office
	    });
	    var contentString108 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강원춘천시청" class="thumb" /><br />',
	        '<h3>강원춘천시청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 강원특별자치도 춘천시 시청길11(옥천동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 033-250-3114 재난안전담당관: 033-250-3250, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>  <br />',
	        '<i class="fa-solid fa-envelope"></i> 24347 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.chuncheon.go.kr/cityhall/" target="_blank">https://www.chuncheon.go.kr/cityhall/</a>',
	        '</div>'
	    ].join('');
	    var infowindow108 = new naver.maps.InfoWindow({
	        content: contentString108
	    });
	    
	    // 109번째 마커와 정보창
	    var marker109 = new naver.maps.Marker({
	        map: map,
	        position: gangwon_wonju_city_office
	    });
	    var contentString109 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강원원주시청" class="thumb" /><br />',
	        '<h3>강원원주시청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 강원특별자치도 원주시 시청로1(무실동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 033-742-2111 자연재난: 033-737-3261, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 033-737-3300 (자연재난): 033-737-4819 <br />',
	        '<i class="fa-solid fa-envelope"></i> 26384 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.wonju.go.kr/www/index.do" target="_blank">https://www.wonju.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow109 = new naver.maps.InfoWindow({
	        content: contentString109
	    });
	    
	    // 110번째 마커와 정보창
	    var marker110 = new naver.maps.Marker({
	        map: map,
	        position: gangwon_gangneung_city_office
	    });
	    var contentString110 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강원강릉시청" class="thumb" /><br />',
	        '<h3>강원강릉시청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 강원특별자치도 강릉시 강릉대로 33(홍제동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 033-660-2018 재난안전: 033-640-5233, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>  <br />',
	        '<i class="fa-solid fa-envelope"></i> 25522 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gn.go.kr/www/index.do" target="_blank">https://www.gn.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow110 = new naver.maps.InfoWindow({
	        content: contentString110
	    });
	    
	    // 111번째 마커와 정보창
	    var marker111 = new naver.maps.Marker({
	        map: map,
	        position: gangwon_donghae_city_office
	    });
	    var contentString111 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강원동해시청" class="thumb" /><br />',
	        '<h3>강원동해시청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 강원특별자치도 동해시 천곡로 77(천곡동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 033-530-2114, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 033-533-9511 <br />',
	        '<i class="fa-solid fa-envelope"></i> 25755 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.dh.go.kr/www/index.do" target="_blank">https://www.dh.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow111 = new naver.maps.InfoWindow({
	        content: contentString111
	    });
	    
	    // 112번째 마커와 정보창
	    var marker112 = new naver.maps.Marker({
	        map: map,
	        position: gangwon_taebaek_city_office
	    });
	    var contentString112 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="강원태백시청" class="thumb" /><br />',
	        '<h3>강원태백시청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 강원특별자치도 태백시 태붐로 21(황지동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 033-552-1360 안전과: 033-550-3021, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 033-550-2951 <br />',
	        '<i class="fa-solid fa-envelope"></i> 26023 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.taebaek.go.kr/www/index.do" target="_blank">https://www.taebaek.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow112 = new naver.maps.InfoWindow({
	        content: contentString112
	    });
	    
	    // 108 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker108, "click", function(e) {
	        if (infowindow108.getMap()) {
	            infowindow108.close();
	        } else {
	            infowindow108.open(map, marker108);
	        }
	    });
	    
	    // 109 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker109, "click", function(e) {
	        if (infowindow109.getMap()) {
	            infowindow109.close();
	        } else {
	            infowindow109.open(map, marker109);
	        }
	    });
	    
	    // 110 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker110, "click", function(e) {
	        if (infowindow110.getMap()) {
	            infowindow110.close();
	        } else {
	            infowindow110.open(map, marker110);
	        }
	    });
	    
	    // 111 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker111, "click", function(e) {
	        if (infowindow111.getMap()) {
	            infowindow111.close();
	        } else {
	            infowindow111.open(map, marker111);
	        }
	    });
	    
	    // 112 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker112, "click", function(e) {
	        if (infowindow112.getMap()) {
	            infowindow112.close();
	        } else {
	            infowindow112.open(map, marker112);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow108.open(map, marker108);
	    
	   	
	});
	