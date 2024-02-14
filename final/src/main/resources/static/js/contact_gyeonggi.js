/**
 * 
 */
/*
	77.경기도 수원시
	78.경기도 성남시
	79.경기도 의정부시
	80.경기도 안양시
	81.경기도 부천시
	82.경기도 광명시
	83.경기도 평택시
	84.경기도 동두천시
	85.경기도 안산시
	86.경기도 고양시
	87.경기도 과천시
	88.경기도 구리시
	89.경기도 남양주시
	90.경기도 오산시
	91.경기도 시흥시
	92.경기도 군포시
	93.경기도 의왕시
	94.경기도 하남시
	95.경기도 용인시
	96.경기도 파주시
	97.경기도 이천시
	98.경기도 안성시
	99.경기도 김포시
	100.경기도 화성시
	101.경기도 광주시
	102.경기도 양주시
	103.경기도 포천시
	104.경기도 여주시
	105.경기도 연천군
	106.경기도 가평군
	107.경기도 양평군
*/

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var gyeonggi_suwon_city_office = new naver.maps.LatLng(37.26345, 127.0286);
	    var gyeonggi_seongnam_city_office = new naver.maps.LatLng(37.42002, 127.1267);
	    var gyeonggi_uijeongbu_city_office = new naver.maps.LatLng(37.73810, 127.0337);
	    var gyeonggi_anyang_city_office = new naver.maps.LatLng(37.39429, 126.9568);
	    var gyeonggi_bucheon_city_office = new naver.maps.LatLng(37.50350, 126.7659);	//5
	    var gyeonggi_gwangmyeong_city_office = new naver.maps.LatLng(37.47852, 126.8647);
	    var gyeonggi_pyeongtaek_city_office = new naver.maps.LatLng(36.99231, 127.1126);
	    var gyeonggi_dongducheon_city_office = new naver.maps.LatLng(37.90351, 127.0612);
	    var gyeonggi_ansan_city_office = new naver.maps.LatLng(37.32195, 126.8312);		//10
	    var gyeonggi_goyang_city_office = new naver.maps.LatLng(37.65822, 126.8320);
	    var gyeonggi_gwacheon_city_office;
	    var gyeonggi_guri_city_office;
	    var gyeonggi_namyangju_city_office;
	    var gyeonggi_osan_city_office;	//15
	    var gyeonggi_siheung_city_office;
	    var gyeonggi_gunpo_city_office;
	    var gyeonggi_uiwang_city_office;
	    var gyeonggi_hanam_city_office;
	    var gyeonggi_yongin_city_office;	//20
	    var gyeonggi_paju_city_office;
	    var gyeonggi_icheon_city_office;
	    var gyeonggi_anseong_city_office;
	    var gyeonggi_gimpo_city_office;
	    var gyeonggi_hwaseong_city_office;	//25
	    var gyeonggi_gwangju_city_office;
	    var gyeonggi_yangju_city_office;
	    var gyeonggi_pocheon_city_office;
	    var gyeonggi_yeoju_city_office;
	    var gyeonggi_yeoncheon_county_office;	//30
	    var gyeonggi_gapyeong_county_office;
	    var gyeonggi_yangpyeong_county_office;
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: gyeonggi_suwon_city_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    
	    // 77번째 마커와 정보창
	    var marker77 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_suwon_city_office
	    });
	    var contentString77 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기수원시청" class="thumb"/><br>',
	        '<h2>경기수원시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 수원시 팔달구 효원로 241(인계동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1899-3300, 031-228-2114, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(재난대응과): 031-369-2032 <br>',
	        '<i class="fa-solid fa-envelope"></i> 16490 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.suwon.go.kr/index.do" target="_blank">https://www.suwon.go.kr/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow77 = new naver.maps.InfoWindow({
	        content: contentString77
	    });
	    
	    // 78번째 마커와 정보창
	    var marker78 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_seongnam_city_office
	    });
	    var contentString78 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기성남시청" class="thumb"/><br>',
	        '<h2>경기성남시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 성남시 중원구 성남대로 997(여수동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 1577-3100, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(재난안전): 031-729-3539 <br>',
	        '<i class="fa-solid fa-envelope"></i> 13437 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.seongnam.go.kr/main.do" target="_blank">https://www.seongnam.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow78 = new naver.maps.InfoWindow({
	        content: contentString78
	    });
	    
	    // 79번째 마커와 정보창
	    var marker79 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_uijeongbu_city_office
	    });
	    var contentString79 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기의정부시청" class="thumb"/><br>',
	        '<h2>경기의정부시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 의정부시 시민로 1(의정부동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-828-2114, 재난안전상황실: 031-828-4800, <br>',
	        '(야간,공휴일/당직실): 031-828-2221~3 <br><i class="fa-solid fa-fax"></i> 팩스: 031-828-2119 <br>',
	        '<i class="fa-solid fa-envelope"></i> 11622 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.ui4u.go.kr/main.do" target="_blank">https://www.ui4u.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow79 = new naver.maps.InfoWindow({
	        content: contentString79
	    });
	    
	    // 80번째 마커와 정보창
	    var marker80 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_anyang_city_office
	    });
	    var contentString80 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기안양시청" class="thumb"/><br>',
	        '<h2>경기안양시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 안양시 동안구 시민대로 235(관양동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-8045-7000, <br>',
	        '(야간,공휴일/당직실): 031-8045-7000 <br><i class="fa-solid fa-fax"></i> 팩스: 031-8045-6500 <br>',
	        '<i class="fa-solid fa-envelope"></i> 14053 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.anyang.go.kr/main/index.do" target="_blank">https://www.anyang.go.kr/main/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow80 = new naver.maps.InfoWindow({
	        content: contentString80
	    });
	    
	    // 81번째 마커와 정보창
	    var marker81 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_bucheon_city_office
	    });
	    var contentString81 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기부천시청" class="thumb"/><br>',
	        '<h2>경기부천시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 부천시 원미구 길주로 210(중동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 032-320-3000, 재난대책: 032-625-4040, <br>',
	        '(야간,공휴일/당직실): 032-320-3000 <br><i class="fa-solid fa-fax"></i> 팩스: <br>',
	        '<i class="fa-solid fa-envelope"></i> 14547 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="http://www.bucheon.go.kr/site/main/index148" target="_blank">http://www.bucheon.go.kr/site/main/index148</a>',
	        '</div>'
	    ].join('');
	    var infowindow81 = new naver.maps.InfoWindow({
	        content: contentString81
	    });
	    
	    // 82번째 마커와 정보창
	    var marker82 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_gwangmyeong_city_office
	    });
	    var contentString82 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기광명시청" class="thumb"/><br>',
	        '<h2>경기광명시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 광명시 시청로 20<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 02-680-2114, 민원콜센터: 1688-3399, 중대재해: 02-2680-2118, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 02-2680-6916 <br>',
	        '<i class="fa-solid fa-envelope"></i> 14234 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.gm.go.kr/pt/index.do" target="_blank">https://www.gm.go.kr/pt/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow82 = new naver.maps.InfoWindow({
	        content: contentString82
	    });
	    
	    // 83번째 마커와 정보창
	    var marker83 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_pyeongtaek_city_office
	    });
	    var contentString83 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기평택시청" class="thumb"/><br>',
	        '<h2>경기평택시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 평택시 경기대로 245(비전동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-8024-5000, 재난신고: 031-8024-4949, 중대재해: 031-8024-4914, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스:  <br>',
	        '<i class="fa-solid fa-envelope"></i> 17901 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.pyeongtaek.go.kr/main.do" target="_blank">https://www.pyeongtaek.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow83 = new naver.maps.InfoWindow({
	        content: contentString83
	    });
	    
	    // 84번째 마커와 정보창
	    var marker84 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_dongducheon_city_office
	    });
	    var contentString84 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기동두청시청" class="thumb"/><br>',
	        '<h2>경기동두청시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 동두천시 방죽로 23<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-860-2114, 재난관리: 031-860-2166, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(안전총괄과): 031-860-2676 <br>',
	        '<i class="fa-solid fa-envelope"></i> 11371 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.ddc.go.kr/ddc/index.do" target="_blank">https://www.ddc.go.kr/ddc/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow84 = new naver.maps.InfoWindow({
	        content: contentString84
	    });
	    
		// 85번째 마커와 정보창
	    var marker85 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_ansan_city_office
	    });
	    var contentString85 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기안산시청" class="thumb"/><br>',
	        '<h2>경기안산시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 안산시 단원구 화랑로 387(고잔동)<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-430-8100, 시민안전과: 031-481-2725, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(시민안전과): 031-481-3190 <br>',
	        '<i class="fa-solid fa-envelope"></i> 15335 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.ansan.go.kr/www/main/main.do" target="_blank">https://www.ansan.go.kr/www/main/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow85 = new naver.maps.InfoWindow({
	        content: contentString85
	    });
		
	    // 86번째 마커와 정보창
	    var marker86 = new naver.maps.Marker({
	        map: map,
	        position: gyeonggi_goyang_city_office
	    });
	    var contentString86 = [
	        '<div class="emer_office">',
	        '<img src="/images/iconGyeonggi.png" width="100" height="100" alt="경기고양시청" class="thumb"/><br>',
	        '<h2>경기고양시청</h2><br>',
	        '<h4><i class="fa-solid fa-location-dot"></i> 경기도 고양시 덕양구 고양시청로10<br>',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 031-909-9000, <br>',
	        '(야간,공휴일/당직실):  <br><i class="fa-solid fa-fax"></i> 팩스(재난대응담당): 031-8075-4991 <br>',
	        '<i class="fa-solid fa-envelope"></i> 10460 | 공공,사회기관 &gt; 시청<br><br>',
	        '</h4>',
	        '<h2>공식 홈페이지</h2>',
	        '<a href="https://www.goyang.go.kr/www/index.do" target="_blank">https://www.goyang.go.kr/www/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow86 = new naver.maps.InfoWindow({
	        content: contentString86
	    });
	    
	    // 77 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker77, "click", function(e) {
	        if (infowindow77.getMap()) {
	            infowindow77.close();
	        } else {
	            infowindow77.open(map, marker77);
	        }
	    });
	    
	    // 78 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker78, "click", function(e) {
	        if (infowindow78.getMap()) {
	            infowindow78.close();
	        } else {
	            infowindow78.open(map, marker78);
	        }
	    });
	    
	    // 79 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker79, "click", function(e) {
	        if (infowindow79.getMap()) {
	            infowindow79.close();
	        } else {
	            infowindow79.open(map, marker79);
	        }
	    });
	    
	    // 80 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker80, "click", function(e) {
	        if (infowindow80.getMap()) {
	            infowindow80.close();
	        } else {
	            infowindow80.open(map, marker80);
	        }
	    });
	    
	    // 81 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker81, "click", function(e) {
	        if (infowindow81.getMap()) {
	            infowindow81.close();
	        } else {
	            infowindow81.open(map, marker81);
	        }
	    });
	    
	    // 82 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker82, "click", function(e) {
	        if (infowindow82.getMap()) {
	            infowindow82.close();
	        } else {
	            infowindow82.open(map, marker82);
	        }
	    });
	    
	    // 83 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker83, "click", function(e) {
	        if (infowindow83.getMap()) {
	            infowindow83.close();
	        } else {
	            infowindow83.open(map, marker83);
	        }
	    });
	    
	    // 84 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker84, "click", function(e) {
	        if (infowindow84.getMap()) {
	            infowindow84.close();
	        } else {
	            infowindow84.open(map, marker84);
	        }
	    });
	    
	    // 85 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker85, "click", function(e) {
	        if (infowindow85.getMap()) {
	            infowindow85.close();
	        } else {
	            infowindow85.open(map, marker85);
	        }
	    });
	    
	    // 86 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker86, "click", function(e) {
	        if (infowindow86.getMap()) {
	            infowindow86.close();
	        } else {
	            infowindow86.open(map, marker86);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow77.open(map, marker77);
		
	   	
	});
	