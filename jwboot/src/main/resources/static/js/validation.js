let checkUser = function() {
	let form = document.userform;
	let id = form.userId.value;
	//let id = document.getElementById("userId").value;
	let pw = form.userPasswd.value;
	let pw2 = form.userPasswd2.value;
	let name = form.userName.value;
	let age = form.userAge.value;
	
	let regPw1 = /[0-9]+/;      //숫자
	let regPw2 = /[a-zA-Z]+/;   //영문자
	let regPw3 = /[~!@#$%^&*()=_+|\-]+/; //특수문자
	let regName = /^[가-힣]+$/; //한글만
	
	let regPw = /[!-~]+/;
	
	//아이디는 4자 이상 15자까지 입력해주세요
	//비밀번호는 영문자, 숫자, 특수문자 포함 8자 이상 입력해주세요
	//이름은 한글로 입력해주세요
	//나이는 숫자로 입력해주세요
	if(id.length < 4 || id.length > 15){
		alert("아이디는 4자 이상 15자 까지 입력해주세요.");
		document.getElementById("userId").select();
		return false;
	}else if(pw.length < 7 || !regPw.test(pw)){
	/*
	else if(pw.length < 7 || !regPw1.test(pw) ||
			!regPw2.test(pw) || !regPw3.test(pw)){
	*/
		alert("비밀번호는 영문자, 숫자, 특수문자 포함 8자 이상 입력해주세요.")
		document.getElementById("userPasswd").select();
		return false;
	}else if(pw != pw2){
		alert("비밀번호를 동일하게 입력해 주세요");
		document.getElementById("userPasswd2").select();
		return false;
	}else if(!regName.test(name)){	//이름이 정규식에 일치하지 않으면
		alert("이름은 한글로 입력해주세요.");
		document.getElementById("userName").select();
		return false;
	}else if(isNaN(age) || age == ""){
		alert("나이는 숫자로 입력해주세요.");
		document.getElementById("userAge").select();
		return false;
	}else{
		form.submit();	//유효하면 폼에 전송
	}
}//checkUser 닫기

//ID 중복검사 순서
/*
 1. 아이디 입력값 가져오기
 2. 입력값을 서버에 전송하고 중복된 아이디가 있는지 확인
 
 */



//아이디 중복검사
function checkId(){
	let userId = document.getElementById("userId").value;
	let checkResult = document.getElementById("check-result");
	
	if(userId != null){
		$.ajax({
			//요청방식: post, url: /user/checkuserid, 데이터: userId
			type: "post",
			url: "/user/checkuserid",
			data: {"userId": userId},
			//서버에서 응답 - 성공과 실패
			success: function(response){
				console.log(response);
				if(response == "usable"){
					checkResult.innerHTML = "사용 가능한 아이디입니다.";
					checkResult.style.color = "blue";
				}else{
					checkResult.innerHTML = "이미 사용중인 아이디입니다.";
					checkResult.style.color = "red";
				}
			},
			error: function(error){
				console.log("에러발생", error);
				
			}
		});
	}
}