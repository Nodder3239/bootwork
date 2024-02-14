/**
 * 
 */
/*
	137.충청남도 천안시
	138.충청남도 공주시
	139.충청남도 당진시
	140.충청남도 보령시
	141.충청남도 아산시
	142.충청남도 서산시
	143.충청남도 논산시
	144.충청남도 계룡시
	145.충청남도 금산군
	146.충청남도 부여군
	147.충청남도 서천군
	148.충청남도 청양군
	149.충청남도 홍성군
	150.충청남도 예산군
	151.충청남도 태안군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var chungnam_cheonan_city_office = new naver.maps.LatLng(36.81511, 127.1139);
	    var chungnam_gongju_city_office = new naver.maps.LatLng(36.44655, 127.1190);
	    var chungnam_dangjin_city_office = new naver.maps.LatLng(36.88965, 126.6460);
	    var chungnam_boryeong_city_office = new naver.maps.LatLng(36.33261, 126.6122);
	    var chungnam_asan_city_office = new naver.maps.LatLng(36.78982, 127.0026);	//5
	    var chungnam_seosan_city_office;
	    var chungnam_nonsan_city_office;
	    var chungnam_gyeryong_city_office;
	    var	chungnam_geumsan_county_office;
	    var chungnam_buyeo_county_office;	//10
	    var chungnam_seocheon_county_office;
	    var chungnam_cheongyang_county_office;
	    var chungnam_hongseong_county_office;
	    var chungnam_yesan_county_office;
	    var chungnam_taean_county_office;	//15
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: chungnam_cheonan_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    // 137번째 마커와 정보창
	    var marker137 = new naver.maps.Marker({
	        map: map,
	        position: chungnam_cheonan_city_office
	    });
	    var contentString137 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungnam.png" width="100" height="100" alt="충남천안시청" class="thumb"/><br>',
	        '<h2>충남천안시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청남도 천안시 서북구 번영로 156<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1422-36, 중대재해팀: 041-521-2416, <br>',
	        '(야간,공휴일/당직실): <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 041-521-2419<br>',
	        '<i class="fa-solid fa-envelope"></i> 31162 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.cheonan.go.kr/" target="_blank">https://www.cheonan.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow137 = new naver.maps.InfoWindow({
	        content: contentString137
	    });
	    
	    // 138번째 마커와 정보창
	    var marker138 = new naver.maps.Marker({
	        map: map,
	        position: chungnam_gongju_city_office
	    });
	    var contentString138 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungnam.png" width="100" height="100" alt="충남공주시청" class="thumb"/><br>',
	        '<h2>충남공주시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청남도 공주시 봉황로 1<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 041-840-3800, 1899-0088, 재난종합상황실: 041-840-8119, <br>',
	        '(야간,공휴일/당직실): 041-840-2222 <br><i class="fa-solid fa-fax"></i> 팩스(시민안전과): 041-840-3703<br>',
	        '<i class="fa-solid fa-envelope"></i> 32552 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gongju.go.kr/" target="_blank">https://www.gongju.go.kr/</a>',
	        '</div>'
	    ].join('');
	    var infowindow138 = new naver.maps.InfoWindow({
	        content: contentString138
	    });
	    
	    // 139번째 마커와 정보창
	    var marker139 = new naver.maps.Marker({
	        map: map,
	        position: chungnam_dangjin_city_office
	    });
	    var contentString139 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungnam.png" width="100" height="100" alt="충남당진시청" class="thumb"/><br>',
	        '<h2>충남당진시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청남도 당진시 시청1로 1(수청동 1002번지)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1522-3113, 041-350-3114, <br>',
	        '(야간,공휴일/당직실): <br><i class="fa-solid fa-fax"></i> 팩스: 041-350-3699<br>',
	        '<i class="fa-solid fa-envelope"></i> 31773 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.dangjin.go.kr/kor.do" target="_blank">https://www.dangjin.go.kr/kor.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow139 = new naver.maps.InfoWindow({
	        content: contentString139
	    });
	    
	    // 140번째 마커와 정보창
	    var marker140 = new naver.maps.Marker({
	        map: map,
	        position: chungnam_boryeong_city_office
	    });
	    var contentString140 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungnam.png" width="100" height="100" alt="충남보령시청" class="thumb"/><br>',
	        '<h2>충남보령시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청남도 보령시 성주산로 77<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 041-930-3114, 재난안전상황실: 041-930-3119, <br>',
	        '(야간,공휴일/당직실): 041-930-2222 <br><i class="fa-solid fa-fax"></i> 팩스: 041-930-3333 (안전총괄과): 041-930-3259<br>',
	        '<i class="fa-solid fa-envelope"></i> 33483 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.brcn.go.kr/kor.do" target="_blank">https://www.brcn.go.kr/kor.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow140 = new naver.maps.InfoWindow({
	        content: contentString140
	    });
	    
	    // 141번째 마커와 정보창
	    var marker141 = new naver.maps.Marker({
	        map: map,
	        position: chungnam_asan_city_office
	    });
	    var contentString141 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconChungnam.png" width="100" height="100" alt="충남아산시청" class="thumb"/><br>',
	        '<h2>충남아산시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 충청남도 아산시 시민로 456<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1422-42 중대재해: 041-530-6781, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 041-540-2547<br>',
	        '<i class="fa-solid fa-envelope"></i> 31512 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.asan.go.kr/main/" target="_blank">https://www.asan.go.kr/main/</a>',
	        '</div>'
	    ].join('');
	    var infowindow141 = new naver.maps.InfoWindow({
	        content: contentString141
	    });
	    
	    // 137 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker137, "click", function(e) {
	        if (infowindow137.getMap()) {
	            infowindow137.close();
	        } else {
	            infowindow137.open(map, marker137);
	        }
	    });
	    
	    // 138 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker138, "click", function(e) {
	        if (infowindow138.getMap()) {
	            infowindow138.close();
	        } else {
	            infowindow138.open(map, marker138);
	        }
	    });
	    
	    // 139 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker139, "click", function(e) {
	        if (infowindow139.getMap()) {
	            infowindow139.close();
	        } else {
	            infowindow139.open(map, marker139);
	        }
	    });
	    
	    // 140 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker140, "click", function(e) {
	        if (infowindow140.getMap()) {
	            infowindow140.close();
	        } else {
	            infowindow140.open(map, marker140);
	        }
	    });
	    
	    // 141 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker141, "click", function(e) {
	        if (infowindow141.getMap()) {
	            infowindow141.close();
	        } else {
	            infowindow141.open(map, marker141);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow137.open(map, marker137);
	    
	   	
	});
	