/**
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
	
    const faqs = [
        { faqId: "1", question: "질문 1은 무엇인가요?", answer: "질문 1에 대한 답변입니다." },
        { faqId: "2", question: "질문 2를 해주세요.", answer: "질문 2의 답변은 이렇습니다." }
    ];

    // FAQ 컨테이너
    const faqContainer = document.getElementById('faqContainer');
    
    // FAQ 토글 버튼 클릭 이벤트 리스너
    document.getElementById('faqToggleButton').addEventListener('click', function() {
        // faqContainer의 표시 상태 토글
        const isDisplayed = faqContainer.style.display !== 'none';
        faqContainer.style.display = isDisplayed ? 'none' : 'block';
        document.getElementById('faqOverlay').style.display = 'none'; // 오버레이는 항상 숨김 처리
        
        // 아이콘 요소 찾기 및 스타일 변경
        const icon = this.querySelector('i');
        icon.className = isDisplayed ? 'fa-solid fa-robot' : 'fa-regular fa-circle-xmark';
        if (!isDisplayed) {
            showQuestions(); // 컨테이너가 표시될 때 질문 로드
        }
    });

    // 오버레이 클릭 이벤트 리스너를 제거합니다.
    // document.getElementById('faqOverlay').addEventListener('click', function() {}) 이 부분을 삭제하거나 주석 처리합니다.

    function showQuestions() {
    
        // 질문 목록 초기화
        faqContainer.innerHTML = '';
        
        // 이미지 요소 생성 및 설정
	    const faqImage = document.createElement('img');
	    faqImage.src = '/images/planB-logo.png'; // 이미지 경로 설정
	    faqImage.alt = 'FAQ 이미지 설명'; // 대체 텍스트 설정
	    faqImage.className ="faqbot-image";
//	    faqImage.style.width = '30px'; // 이미지 크기 조정 예시 (원본 크기가 너무 작음)
//	    faqImage.style.height = '30px'; // 이미지 크기 조정 예시
//	    faqImage.style.float = 'left';
	
	    // #faqContainer 내에 이미지 추가
	    faqContainer.appendChild(faqImage);

        
        // FAQ 제목 추가
	    const faqTitle = document.createElement('p');
	    faqTitle.innerText = '자주 묻는 질문(FAQ)';
	    faqTitle.className = "faqbot-title"
	    faqContainer.appendChild(faqTitle);
        

        // 질문 버튼 생성
        faqs.forEach(faq => {
            const questionBtn = document.createElement('button');
            questionBtn.textContent = faq.question;
            questionBtn.classList.add('faq-question');
            questionBtn.onclick = () => showAnswer(faq);
            faqContainer.appendChild(questionBtn);
        });
    }

    function showAnswer(faq) {
        // 모든 질문 버튼을 숨깁니다.
        document.querySelectorAll('.faq-question').forEach(btn => btn.style.display = 'none');
        
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `<p>${faq.answer}</p>`;
        faqContainer.appendChild(answerDiv);

        // "다른 질문하기" 버튼 생성
        const otherQuestionsBtn = document.createElement('button');
        otherQuestionsBtn.textContent = '다른 질문하기';
        otherQuestionsBtn.onclick = () => {
            document.querySelectorAll('.faq-question').forEach(btn => btn.style.display = 'block'); // 모든 질문 버튼을 다시 표시합니다.
            answerDiv.remove(); // 현재 답변을 제거합니다.
            otherQuestionsBtn.remove(); // "다른 질문하기" 버튼을 제거합니다.
            showQuestions(); // 질문 목록을 다시 로드합니다.
        };
        faqContainer.appendChild(otherQuestionsBtn);
    }
});