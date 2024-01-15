let checkMember = function() {
	let form = document.userform;
	let email = form.memberEmail.value;
	let pw = form.memberPassword.value;
	let pw2 = form.memberPassword2.value;
	let name = form.memberName.value;
	let age = form.memberAge.value;
	
	let regPw1 = /[0-9]+/;      //숫자
	let regPw2 = /[a-zA-Z]+/;   //영문자
	let regPw3 = /[~!@#$%^&*()=_+|\-]+/; //특수문자
	let regName = /^[가-힣]+$/; //한글만
	
	let regPw = /[!-~]+/;
	
	//아이디는 4자 이상 15자까지 입력해주세요
	//비밀번호는 영문자, 숫자, 특수문자 포함 8자 이상 입력해주세요
	//이름은 한글로 입력해주세요
	//나이는 숫자로 입력해주세요
	if(pw.length < 7 || !regPw.test(pw)){
		alert("비밀번호는 영문자, 숫자, 특수문자 포함 8자 이상 입력해주세요.")
		document.getElementById("password").select();
		return false;
	}else if(pw != pw2){
		alert("비밀번호를 동일하게 입력해 주세요");
		document.getElementById("password2").select();
		return false;
	}else if(!regName.test(name)){	//이름이 정규식에 일치하지 않으면
		alert("이름은 한글로 입력해주세요.");
		document.getElementById("name").select();
		return false;
	}else if(isNaN(age) || age == ""){
		alert("나이는 숫자로 입력해주세요.");
		document.getElementById("age").select();
		return false;
	}else{
		form.submit();	//유효하면 폼에 전송
	}
}//checkUser 닫기


//아이디 중복검사
function checkEmail(){
	let email = document.userform.email.value.toLowerCase();
	let checkResult = document.getElementById("check-result");
	
	if(email != null && email.trim() != ""){
		$.ajax({
			type: "post",
			url: "/member/checkEmail",
			data: {"memberEmail": email},
			//서버에서 응답 - 성공과 실패
			success: function(response){
				console.log(response);
				if(response == "usable"){
					checkResult.innerHTML = "사용 가능한 이메일입니다.";
					checkResult.style.color = "blue";
				}else{
					checkResult.innerHTML = "이미 사용중인 이메일입니다.";
					checkResult.style.color = "red";
				}
			},
			error: function(error){
				console.log("에러발생", error);
				
			}
		});
	}else{
		checkResult.innerHTML = "이메일을 입력해주세요.";
		checkResult.style.color = "red";
	}
	
}