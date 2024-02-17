/**
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
	
    const faqs = [
        { faqId: "1", question: "회원가입 관련 문의", answer: "참여와 신고 게시판 이용 시, 민원 및 제안업무 처리와 회원간의 원활한 소통을 위하여 회원가입 및 로그인 후 이용가능합니다. 게시판을 제외한 나머지 페이지는 별도의 회원 가입이 필요치 않습니다." },
        { faqId: "2", question: "재난 콘텐츠 관련 문의", answer: "콘텐츠 사용은 공공의 목적에 한하며, 콘텐츠를 무단으로 가공하거나 게시 할 수 없습니다. 단, 가공없이 공공의 목적으로 사용을 원할 시 “참여와 신고-질문”으로 사용 협조 요청 공문 발송 시 콘텐츠 사용 및 게시가 가능합니다." },
        { faqId: "3", question: "참여와 신고 - 글 수정,삭제 문의", answer: "로그인 후, [Account] -> 내가 쓴 글을 확인할 수 있으며, 클릭하여 해당 글이 있는 페이지로 이동하시면 글 내용 하단에 삭제/수정 기능이 있습니다." },
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
            questionBtn.classList.add('faq-question' , "centered-question");
            questionBtn.onclick = () => showAnswer(faq);
            faqContainer.appendChild(questionBtn);
        });
    }

    function showAnswer(faq) {
        // 모든 질문 버튼을 숨깁니다.
        document.querySelectorAll('.faq-question').forEach(btn => btn.style.display = 'none');
        
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `<p class="answer-question">${faq.answer}</p>`;
        faqContainer.appendChild(answerDiv);

        // "다른 질문하기" 버튼 생성
        const otherQuestionsBtn = document.createElement('button');
        otherQuestionsBtn.textContent = '다른 질문하기';
         otherQuestionsBtn.className = 'centered-question';
        otherQuestionsBtn.onclick = () => {
            document.querySelectorAll('.faq-question').forEach(btn => btn.style.display = 'block'); // 모든 질문 버튼을 다시 표시합니다.
            answerDiv.remove(); // 현재 답변을 제거합니다.
            otherQuestionsBtn.remove(); // "다른 질문하기" 버튼을 제거합니다.
            showQuestions(); // 질문 목록을 다시 로드합니다.
        };
        faqContainer.appendChild(otherQuestionsBtn);
    }
});