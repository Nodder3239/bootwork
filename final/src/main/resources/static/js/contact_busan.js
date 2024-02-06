/**
 * 
 */

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var busan_jung_gu_office = new naver.maps.LatLng(35.10633, 129.0323);
	    var busan_seo_gu_office = new naver.maps.LatLng(35.09792, 129.0242);
	    var busan_dong_gu_office = new naver.maps.LatLng(35.12934, 129.0454);
	    var busan_yeongdo_gu_office = new naver.maps.LatLng(35.09120, 129.0679);
	    var busan_jin_gu_office = new naver.maps.LatLng(35.16283, 129.0531);	//5
	    var busan_dongnae_gu_office = new naver.maps.LatLng(35.19629, 129.0932);
	    var busan_nam_gu_office = new naver.maps.LatLng(35.13641, 129.0844);
	    var busan_buk_gu_office = new naver.maps.LatLng(35.19727, 128.9903);
	    var busan_haeundae_gu_office = new naver.maps.LatLng(35.16326, 129.1635);
	    var busan_saha_gu_office = new naver.maps.LatLng(35.10454, 128.9748);	//10
	    var busan_geumjeong_gu_office = new naver.maps.LatLng(35.24306, 129.0921);
	    var busan_gangseo_gu_office = new naver.maps.LatLng(35.21220, 128.9805);
	    var busan_yeonje_gu_office = new naver.maps.LatLng(35.17622, 129.0796);
	    var busan_suyeong_gu_office = new naver.maps.LatLng(35.14556, 129.1132);
	    var busan_sasang_gu_office = new naver.maps.LatLng(35.15261, 128.9912);	//15
	    var busan_gijang_gun_office = new naver.maps.LatLng(35.24431, 129.2226);
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: busan_jung_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
                
                
	    // 26번째 마커와 정보창
	    var marker26 = new naver.maps.Marker({
	        map: map,
	        position: busan_jung_gu_office
	    });
	    var contentString26 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산중구청" class="thumb" /><br />',
	        '<h3>부산중구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 중구 중구로 120<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-600-4000, <br/>',
	        '051-600-4222~4(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-600-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 48926 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsjunggu.go.kr/index.junggu" target="_blank">https://www.bsjunggu.go.kr/index.junggu</a>',
	        '</div>'
	    ].join('');
	    var infowindow26 = new naver.maps.InfoWindow({
	        content: contentString26
	    });
	    
	    // 27번째 마커와 정보창
	    var marker27 = new naver.maps.Marker({
	        map: map,
	        position: busan_seo_gu_office
	    });
	    var contentString27 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산서구청" class="thumb" /><br />',
	        '<h3>부산서구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 서구 구덕로 120(토성동 4가)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-240-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-240-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 49247 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsseogu.go.kr/index.bsseogu?contentsSid=1" target="_blank">https://www.bsseogu.go.kr/index.bsseogu?contentsSid=1</a>',
	        '</div>'
	    ].join('');
	    var infowindow27 = new naver.maps.InfoWindow({
	        content: contentString27
	    });
	    
	    // 28번째 마커와 정보창
	    var marker28 = new naver.maps.Marker({
	        map: map,
	        position: busan_dong_gu_office
	    });
	    var contentString28 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산동구청" class="thumb" /><br />',
	        '<h3>부산동구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 동구 구청로 1(수정동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-440-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-440-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 48781 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsdonggu.go.kr/index.donggu" target="_blank">https://www.bsdonggu.go.kr/index.donggu</a>',
	        '</div>'
	    ].join('');
	    var infowindow28 = new naver.maps.InfoWindow({
	        content: contentString28
	    });
	    
	    // 29번째 마커와 정보창
	    var marker29 = new naver.maps.Marker({
	        map: map,
	        position: busan_yeongdo_gu_office
	    });
	    var contentString29 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="영도구청" class="thumb" /><br />',
	        '<h3>영도구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 영도구 태종로 423(청학동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-419-4000, <br/>',
	        '051-419-4221~4(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-419-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 49011 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yeongdo.go.kr/main.web" target="_blank">https://www.yeongdo.go.kr/main.web</a>',
	        '</div>'
	    ].join('');
	    var infowindow29 = new naver.maps.InfoWindow({
	        content: contentString29
	    });
	    
	    // 30번째 마커와 정보창
	    var marker30 = new naver.maps.Marker({
	        map: map,
	        position: busan_jin_gu_office
	    });
	    var contentString30 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산진구청" class="thumb" /><br />',
	        '<h3>부산진구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 부산진구 시민공원로 30(부암동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-605-4000, <br/>',
	        '051-605-4222(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-605-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 47193 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.busanjin.go.kr/index.busanjin" target="_blank">https://www.busanjin.go.kr/index.busanjin</a>',
	        '</div>'
	    ].join('');
	    var infowindow30 = new naver.maps.InfoWindow({
	        content: contentString30
	    });
	    
	    // 31번째 마커와 정보창
	    var marker31 = new naver.maps.Marker({
	        map: map,
	        position: busan_dongnae_gu_office
	    });
	    var contentString31 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="동래구청" class="thumb" /><br />',
	        '<h3>동래구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 동래구 온천천로 359번길 70(낙민동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-550-4000, <br/>',
	        '(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-550-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 47193 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.dongnae.go.kr/index.dongnae" target="_blank">https://www.dongnae.go.kr/index.dongnae</a>',
	        '</div>'
	    ].join('');
	    var infowindow31 = new naver.maps.InfoWindow({
	        content: contentString31
	    });
	    
	    // 32번째 마커와 정보창
	    var marker32 = new naver.maps.Marker({
	        map: map,
	        position: busan_nam_gu_office
	    });
	    var contentString32 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산남구청" class="thumb" /><br />',
	        '<h3>부산남구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 남구 못골로 19(대연동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-607-4000, <br/>',
	        '(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-607-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 48452 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsnamgu.go.kr/index.namgu" target="_blank">https://www.bsnamgu.go.kr/index.namgu</a>',
	        '</div>'
	    ].join('');
	    var infowindow32 = new naver.maps.InfoWindow({
	        content: contentString32
	    });
	    
	    // 33번째 마커와 정보창
	    var marker33 = new naver.maps.Marker({
	        map: map,
	        position: busan_buk_gu_office
	    });
	    var contentString33 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산북구청" class="thumb" /><br />',
	        '<h3>부산북구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 북구 낙동대로 1570번길 33(구포동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-309-4000, <br/>',
	        '051-309-4661(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-309-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 46504 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsbukgu.go.kr/index.bsbukgu" target="_blank">https://www.bsbukgu.go.kr/index.bsbukgu</a>',
	        '</div>'
	    ].join('');
	    var infowindow33 = new naver.maps.InfoWindow({
	        content: contentString33
	    });
	    
	    // 34번째 마커와 정보창
	    var marker34 = new naver.maps.Marker({
	        map: map,
	        position: busan_haeundae_gu_office
	    });
	    var contentString34 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="해운대구청" class="thumb" /><br />',
	        '<h3>해운대구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 해운대구 중동2로 11(중동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-749-4000, <br/>',
	        '051-749-4222(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-749-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 48095 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.haeundae.go.kr/index.do" target="_blank">https://www.haeundae.go.kr/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow34 = new naver.maps.InfoWindow({
	        content: contentString34
	    });
	    
	    // 35번째 마커와 정보창
	    var marker35 = new naver.maps.Marker({
	        map: map,
	        position: busan_saha_gu_office
	    });
	    var contentString35 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산사하구청" class="thumb" /><br />',
	        '<h3>부산사하구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 사하구 낙동대로 398번길 12(당리동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-220-4000, <br/>',
	        '051-220-4222~4(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-220-4269 <br />',
	        '<i class="fa-solid fa-envelope"></i> 49328 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.saha.go.kr/main.do" target="_blank">https://www.saha.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow35 = new naver.maps.InfoWindow({
	        content: contentString35
	    });
	    
	    // 36번째 마커와 정보창
	    var marker36 = new naver.maps.Marker({
	        map: map,
	        position: busan_geumjeong_gu_office
	    });
	    var contentString36 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산금정구청" class="thumb" /><br />',
	        '<h3>부산금정구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 금정구 중앙대로 1777(부곡동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-519-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-519-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 46274 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.geumjeong.go.kr/index.geumj" target="_blank">https://www.geumjeong.go.kr/index.geumj</a>',
	        '</div>'
	    ].join('');
	    var infowindow36 = new naver.maps.InfoWindow({
	        content: contentString36
	    });
	    
	    // 37번째 마커와 정보창
	    var marker37 = new naver.maps.Marker({
	        map: map,
	        position: busan_gangseo_gu_office
	    });
	    var contentString37 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산강서구청" class="thumb" /><br />',
	        '<h3>부산강서구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 강서구 낙동북로 477(대저1동 2300)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-970-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-970-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 46702 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.bsgangseo.go.kr/main.do" target="_blank">https://www.bsgangseo.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow37 = new naver.maps.InfoWindow({
	        content: contentString37
	    });
	    
	    // 38번째 마커와 정보창
	    var marker38 = new naver.maps.Marker({
	        map: map,
	        position: busan_yeonje_gu_office
	    });
	    var contentString38 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산연제구청" class="thumb" /><br />',
	        '<h3>부산연제구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 연제구 연제로 2(연산동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-665-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-665-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 47605 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yeonje.go.kr/main.do" target="_blank">https://www.yeonje.go.kr/main.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow38 = new naver.maps.InfoWindow({
	        content: contentString38
	    });
	    
	    // 39번째 마커와 정보창
	    var marker39 = new naver.maps.Marker({
	        map: map,
	        position: busan_suyeong_gu_office
	    });
	    var contentString39 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산수영구청" class="thumb" /><br />',
	        '<h3>부산수영구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 수영구 남천동로 100(남천동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-640-4000, <br/>',
	        '051-610-4221(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-610-4444 <br />',
	        '<i class="fa-solid fa-envelope"></i> 48305 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.suyeong.go.kr/index.suyeong" target="_blank">https://www.suyeong.go.kr/index.suyeong</a>',
	        '</div>'
	    ].join('');
	    var infowindow39 = new naver.maps.InfoWindow({
	        content: contentString39
	    });
	    
	    // 40번째 마커와 정보창
	    var marker40 = new naver.maps.Marker({
	        map: map,
	        position: busan_sasang_gu_office
	    });
	    var contentString40 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산사상구청" class="thumb" /><br />',
	        '<h3>부산사상구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 사상구 학감대로 242(감전동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-310-4000, <br/>',
	        ' (야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-310-4269 <br />',
	        '<i class="fa-solid fa-envelope"></i> 46985 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.sasang.go.kr/index.sasang" target="_blank">https://www.sasang.go.kr/index.sasang</a>',
	        '</div>'
	    ].join('');
	    var infowindow40 = new naver.maps.InfoWindow({
	        content: contentString40
	    });
	    
	    // 41번째 마커와 정보창
	    var marker41 = new naver.maps.Marker({
	        map: map,
	        position: busan_gijang_gun_office
	    });
	    var contentString41 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="부산기장군청" class="thumb" /><br />',
	        '<h3>부산기장군청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 부산광역시 기장군 기장읍 기장대로 560<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 051-709-4000, <br/>',
	        '051-709-4222(야간,공휴일/당직실) 전화+문자상담: 051-120 <i class="fa-solid fa-fax"></i> 051-709-4286 <br />',
	        '<i class="fa-solid fa-envelope"></i> 46077 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.gijang.go.kr/index.gijang?contentsSid=1219" target="_blank">https://www.gijang.go.kr/index.gijang?contentsSid=1219</a>',
	        '</div>'
	    ].join('');
	    var infowindow41 = new naver.maps.InfoWindow({
	        content: contentString41
	    });
	    
	 	// 26 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker26, "click", function(e) {
	        if (infowindow26.getMap()) {
	            infowindow26.close();
	        } else {
	            infowindow26.open(map, marker26);
	        }
	    });
	    
	    // 27 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker27, "click", function(e) {
	        if (infowindow27.getMap()) {
	            infowindow27.close();
	        } else {
	            infowindow27.open(map, marker27);
	        }
	    });
	    
	    // 28 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker28, "click", function(e) {
	        if (infowindow28.getMap()) {
	            infowindow28.close();
	        } else {
	            infowindow28.open(map, marker28);
	        }
	    });
	    
	    // 29 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker29, "click", function(e) {
	        if (infowindow29.getMap()) {
	            infowindow29.close();
	        } else {
	            infowindow29.open(map, marker29);
	        }
	    });
	    
	    // 30 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker30, "click", function(e) {
	        if (infowindow30.getMap()) {
	            infowindow30.close();
	        } else {
	            infowindow30.open(map, marker30);
	        }
	    });
	    
	    // 31 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker31, "click", function(e) {
	        if (infowindow31.getMap()) {
	            infowindow31.close();
	        } else {
	            infowindow31.open(map, marker31);
	        }
	    });
	    
	    // 32 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker32, "click", function(e) {
	        if (infowindow32.getMap()) {
	            infowindow32.close();
	        } else {
	            infowindow32.open(map, marker32);
	        }
	    });
	    
	    // 33 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker33, "click", function(e) {
	        if (infowindow33.getMap()) {
	            infowindow33.close();
	        } else {
	            infowindow33.open(map, marker33);
	        }
	    });
	    
	    // 34 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker34, "click", function(e) {
	        if (infowindow34.getMap()) {
	            infowindow34.close();
	        } else {
	            infowindow34.open(map, marker34);
	        }
	    });
	    
	    // 35 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker35, "click", function(e) {
	        if (infowindow35.getMap()) {
	            infowindow35.close();
	        } else {
	            infowindow35.open(map, marker35);
	        }
	    });
	    
	    // 36 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker36, "click", function(e) {
	        if (infowindow36.getMap()) {
	            infowindow36.close();
	        } else {
	            infowindow36.open(map, marker36);
	        }
	    });
	    
	    // 37 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker37, "click", function(e) {
	        if (infowindow37.getMap()) {
	            infowindow37.close();
	        } else {
	            infowindow37.open(map, marker37);
	        }
	    });

		// 38 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker38, "click", function(e) {
	        if (infowindow38.getMap()) {
	            infowindow38.close();
	        } else {
	            infowindow38.open(map, marker38);
	        }
	    });
	    
	    // 39 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker39, "click", function(e) {
	        if (infowindow39.getMap()) {
	            infowindow39.close();
	        } else {
	            infowindow39.open(map, marker39);
	        }
	    });
	    
	    // 40 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker40, "click", function(e) {
	        if (infowindow40.getMap()) {
	            infowindow40.close();
	        } else {
	            infowindow40.open(map, marker40);
	        }
	    });
	    
	    // 41 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker41, "click", function(e) {
	        if (infowindow41.getMap()) {
	            infowindow41.close();
	        } else {
	            infowindow41.open(map, marker41);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow26.open(map, marker26);

	});
	