// 도메인 직접 입력 or domain option 선택 및 전체이메일 input #full-email에 값 넣기
window.onload=function(){
 
$(document).ready(function() {
    // 도메인 목록 드롭다운의 변경사항을 감지하는 리스너 설정
    $('#domain-list').change(function() {
        let selectedValue = $(this).val();
        
        // '직접 입력' 옵션이 선택되었는지 확인
        if (selectedValue === 'type') {
            // 직접 입력을 위해 텍스트 입력 필드를 활성화
            $('#domain-txt').prop('readonly', false).val('').focus();
        } else {
            // 텍스트 입력 필드를 읽기 전용으로 설정하고 선택된 도메인으로 값 설정
            $('#domain-txt').prop('readonly', true).val(selectedValue);
        }
    });

    // 폼 제출 이벤트를 처리하는 부분
    $('form').on('submit', function(e) {
        // 이메일 로컬 부분과 도메인을 결합
        let emailLocalPart = document.userform.email.value;
        let = document.userform.domain-txt.value;
        let = emailLocalPart + '@' + emailDomainPart;
        
        
	    console.log("emailLocalPart:", emailLocalPart);
	    console.log("emailDomainPart:", emailDomainPart);
	    console.log("fullEmail:", fullEmail);
        
        // 전체 이메일 주소를 hidden input에 설정
        $('#memberEmail').val(fullEmail);
    });
});
}