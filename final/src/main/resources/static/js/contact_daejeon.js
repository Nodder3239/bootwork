/**
 * 
 */

 // 버튼을 클릭하면 네이버 지도 표시
	$(document).ready(function(){
		//이미지 넣을 때 PATH(안먹혀서 직접 적어줌)
	    var HOME_PATH = window.HOME_PATH || '.';
	    
	    //위도, 경도
	    var daejeon_dong_gu_office = new naver.maps.LatLng(36.31220, 127.4550);
	    var daejeon_jung_gu_office = new naver.maps.LatLng(36.32549, 127.4214);
	    var daejeon_seo_gu_office = new naver.maps.LatLng(36.35548, 127.3838);
	    var daejeon_yuseong_gu_office = new naver.maps.LatLng(36.36209, 127.3564);
	    var daejeon_daedeok_gu_office = new naver.maps.LatLng(36.34672, 127.4156);	//5
	    
	    // map 설정
	    var map = new naver.maps.Map('map', {
                    center: daejeon_dong_gu_office.destinationPoint(0, 0), // 서울의 중심 좌표
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
	    
	    
	    // 66번째 마커와 정보창
	    var marker66 = new naver.maps.Marker({
	        map: map,
	        position: daejeon_dong_gu_office
	    });
	    var contentString66 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="대전동구청" class="thumb" /><br />',
	        '<h3>대전동구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 대전광역시 동구 동구청로 147(가오동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 042-251-4114, <br/>',
	        ' 042-251-4222(야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i>(안전총괄과) 042-224-6169 <br />',
	        '<i class="fa-solid fa-envelope"></i> 34691 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.donggu.go.kr/dg/kor" target="_blank">https://www.donggu.go.kr/dg/kor</a>',
	        '</div>'
	    ].join('');
	    var infowindow66 = new naver.maps.InfoWindow({
	        content: contentString66
	    });
	    
	    // 67번째 마커와 정보창
	    var marker67 = new naver.maps.Marker({
	        map: map,
	        position: daejeon_jung_gu_office
	    });
	    var contentString67 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="대전중구청" class="thumb" /><br />',
	        '<h3>대전중구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 대전광역시 중구 중앙로 100(대흥동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 042-606-6114, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 042-606-7999 <br />',
	        '<i class="fa-solid fa-envelope"></i> 34939 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.djjunggu.go.kr/kr/index.do" target="_blank">https://www.djjunggu.go.kr/kr/index.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow67 = new naver.maps.InfoWindow({
	        content: contentString67
	    });
	    
	    // 68번째 마커와 정보창
	    var marker68 = new naver.maps.Marker({
	        map: map,
	        position: daejeon_seo_gu_office
	    });
	    var contentString68 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="대전서구청" class="thumb" /><br />',
	        '<h3>대전서구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 대전광역시 서구 둔산서로 100(둔산동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 042-288-2114 자연재난: 042-288-2531, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 042-288-5900 <br />',
	        '<i class="fa-solid fa-envelope"></i> 35238 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.seogu.go.kr/kor.do" target="_blank">https://www.seogu.go.kr/kor.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow68 = new naver.maps.InfoWindow({
	        content: contentString68
	    });
	    
	    // 69번째 마커와 정보창
	    var marker69 = new naver.maps.Marker({
	        map: map,
	        position: daejeon_yuseong_gu_office
	    });
	    var contentString69 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="대전유성구청" class="thumb" /><br />',
	        '<h3>대전유성구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 대전광역시 유성구 대학로 211<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 042-611-2114, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 042-611-2569 <br />',
	        '<i class="fa-solid fa-envelope"></i> 34139 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.yuseong.go.kr/kor/" target="_blank">https://www.yuseong.go.kr/kor/</a>',
	        '</div>'
	    ].join('');
	    var infowindow69 = new naver.maps.InfoWindow({
	        content: contentString69
	    });
	    
	    // 70번째 마커와 정보창
	    var marker70 = new naver.maps.Marker({
	        map: map,
	        position: daejeon_daedeok_gu_office
	    });
	    var contentString70 = [
	        '<div class="emer_office">',
	        '<img src="../img/icon/jongno_gu_office.jpg" width="50" height="50" alt="대전대덕구청" class="thumb" /><br />',
	        '<h3>대전대덕구청</h3>',
	        '<p><i class="fa-solid fa-location-dot"></i> 대전광역시 대덕구 대전로 1033번길 20(오정동)<br />',
	        '<i class="fa-solid fa-phone"></i> 대표전화: 042-608-6114, <br/>',
	        ' (야간,공휴일/당직실)  <i class="fa-solid fa-fax"></i> 042-608-3939 <br />',
	        '<i class="fa-solid fa-envelope"></i> 34443 | 공공,사회기관 &gt; 구청<br />',
	        '</p>',
	        '<h3>공식 홈페이지</h3>',
	        '<a href="https://www.daedeok.go.kr/dpt/DPT.do" target="_blank">https://www.daedeok.go.kr/dpt/DPT.do</a>',
	        '</div>'
	    ].join('');
	    var infowindow70 = new naver.maps.InfoWindow({
	        content: contentString70
	    });
	    
	    // 66 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker66, "click", function(e) {
	        if (infowindow66.getMap()) {
	            infowindow66.close();
	        } else {
	            infowindow66.open(map, marker66);
	        }
	    });
	    
	    // 67 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker67, "click", function(e) {
	        if (infowindow67.getMap()) {
	            infowindow67.close();
	        } else {
	            infowindow67.open(map, marker67);
	        }
	    });
	    
	    // 68 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker68, "click", function(e) {
	        if (infowindow68.getMap()) {
	            infowindow68.close();
	        } else {
	            infowindow68.open(map, marker68);
	        }
	    });
	    
	    // 69 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker69, "click", function(e) {
	        if (infowindow69.getMap()) {
	            infowindow69.close();
	        } else {
	            infowindow69.open(map, marker69);
	        }
	    });
	    
	    // 70 번째 마커 클릭 이벤트 처리
	    naver.maps.Event.addListener(marker70, "click", function(e) {
	        if (infowindow70.getMap()) {
	            infowindow70.close();
	        } else {
	            infowindow70.open(map, marker70);
	        }
	    });
	    
	    // 마커와 정보창 표시
	    infowindow66.open(map, marker66);

	   	
	});
	