/**
 *  기상청 날씨api로 현재날씨 출력하기 (서울)
 */
	//  오늘 날짜출력
	$(document).ready(function () {
	
	    function convertTime() {
	        var now = new Date();
	
	
	        var month = now.getMonth() + 1;
	        var date = now.getDate();
	
	        return '(' + month + '/' + date + ')';
	    }
	
	    var currentTime = convertTime();
	    $('.nowtime').append(currentTime);
	});
	//제이쿼리사용
	$.getJSON('https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=a8501159eb9e48f3bb16a140c20e9c6f&units=metric', function(WeatherResult) {
		// 기온 출력을 위해 Math.round()를 사용하여 온도 값을 정수로 반올림
		var nowTemp = Math.round(WeatherResult.main.temp);
		var lowTemp = Math.round(WeatherResult.main.temp_min);
		var highTemp = Math.round(WeatherResult.main.temp_max);
	
		$('.SeoulNowtemp').html(nowTemp + '&nbsp;' + '<small>°C</small>');
		$('.SeoulLowtemp').html(lowTemp + '&nbsp;' + '°C');
		$('.SeoulHightemp').html(highTemp + '&nbsp;' + '°C');
		
	// 날씨 아이콘 출력
		// 날씨 상황에 따른 아이콘 추가하기
		var iconPath = "/weather-icon/"; //아이콘 파일경로
	
		var customWeatherIcons = {
			// 맑은날	
			"01d": iconPath + "clearSky_d.png",
			"01n": iconPath + "clearSky_n.png",
			// 약간 구름낀 날
			"02d": iconPath + "fewClouds_d.png",
			"02n": iconPath + "fewClouds_n.png",
			// 구름이 많은 날(맑은 흐림)
			"03d": iconPath + "Scattered-dn.png",
			"03n": iconPath + "Scattered-dn.png",
			// 구름이 많은 날(흐림)
			"04d": iconPath + "brokenClouds_dn.png",
			"04n": iconPath + "brokenClouds_dn.png",
			// 소나기가 오는 날
			"09d": iconPath + "showerRain_d.png",
			"09n": iconPath + "showerRain_n.png",
			// 비가 오는 날
			"10d": iconPath + "rain_d.png",
			"10n": iconPath + "rain_n.png",
			// 천둥번개 치는 날
			"11d": iconPath + "thunderstorm_dn.png",
			"11n": iconPath + "thunderstorm_dn.png",
			// 눈 
			"13d": iconPath + "snow_dn.png",
			"13n": iconPath + "snow_dn.png",
			// 안개
			"50d": iconPath + "mist_dn.png",
			"50n": iconPath + "mist_dn.png",
		};
		
		var weatherIconCode = WeatherResult.weather[0].icon;
		var weatherIconAlt = WeatherResult.weather[0].description;
		var weatherIconUrl = '<img class="weather-icons" src="' + customWeatherIcons[weatherIconCode] + '" alt="' + weatherIconAlt + '"/>';
				
		$('.SeoulIcon').html(weatherIconUrl);
	
	// 기온에 따른 이미지 표시
	var temperature = WeatherResult.main.temp;
	if (temperature <= 10) {
		// 추운 날씨 이미지
		$('.weatherExpression').html('<img src="#" alt="Cold">');
		} else if (temperature >= 20) {
		// 따듯한 날씨 이미지
		$('.weatherExpression').html('<img src="#" alt="Warm">');
		} else {
		// 온화한 날씨 이미지 또는 표시하지 않음
		$('.weatherExpression').html('<img src="#" alt="Cold">');
		}
		});