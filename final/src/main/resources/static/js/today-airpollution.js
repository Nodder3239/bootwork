/**
 * 	공공데이터 미세먼지api로 미세먼지와 초미세먼지 화면에 출력
 */

 $(document).ready(function() {
    var url = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    var queryParams = '?' + $.param({
        serviceKey: decodeURIComponent('3e6KfjqGd%2BSHh5QtxpCL6hAh8NyMv%2Bzbbz4btxYu3dmUvLkrW6msC23slFSCHRrGmyHzajC8cTa1OcvCICFebQ%3D%3D'),
        returnType: 'json',
        numOfRows: '1',
        pageNo: '1',
        sidoName: '서울',
        ver: '1.5'
    });

    $.ajax({
        url: url + queryParams,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if(data && data.response && data.response.body && data.response.body.items && data.response.body.items.length > 0) {
                var item = data.response.body.items[0]; // 첫 번째 결과 항목
            	$('#pm10Value').text(item.pm10Value);
               	$('#pm25Value').text(item.pm25Value);
            } else {
                $('#pm10Value').text('미세먼지(PM10) 농도: 데이터를 불러오는 데 실패했습니다.');
                $('#pm25Value').text('초미세먼지(PM2.5) 농도: 데이터를 불러오는 데 실패했습니다.');
            }
        },
        error: function(xhr, status, error) {
            $('#pm10Value').text('미세먼지(PM10) 농도: 요청 실패');
            $('#pm25Value').text('초미세먼지(PM2.5) 농도: 요청 실패');
            alert('요청 실패: ' + error);
        }
    });
});