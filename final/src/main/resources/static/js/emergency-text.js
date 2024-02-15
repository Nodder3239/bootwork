/**
 * 
 */

$(document).ready(function(){
// 			alert("test...");
			
			$.ajax({
				//요청방식(type), url, data,dataType, success, error
				type: "GET",
				url: "https://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List?serviceKey=3e6KfjqGd%2BSHh5QtxpCL6hAh8NyMv%2Bzbbz4btxYu3dmUvLkrW6msC23slFSCHRrGmyHzajC8cTa1OcvCICFebQ%3D%3D&pageNo=1&numOfRows=2&type=json",
				dataType: "JSON",	//받는 데이터는 json 유형임을 명시 필수
				success: function(data){
					console.log(data);
					
					let itemArr = data.DisasterMsg[1].row;
					
					//테이블 작성
					let value = ""; //태그 + data
					for(let i=0; i<itemArr.length; i++){
						let item = itemArr[i];	//각각의 인덱스에 객체 생성
						value += "<tr class='ds-trclass'>"
	                            + "<td class='ds-location-name'>" + item.location_name + "</td>" // 수신지역이름
	                            + "<td class='ds-item-msg'>" + item.msg + "&nbsp;&nbsp;" + "<strong>" +item.create_date + "</strong>" + "</td>"
	                            + "</tr>";
					};

	                // 결과를 테이블에 삽입
	                $("#result1 tbody").html(value);
				},
				error: function(error){
					alert("에러 발생: " + error);
				}
			});
		
	});