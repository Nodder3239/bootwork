package com.khit.media.faq;

public class FAQ {
	// 동적 데이터 준비! 
	// 필드생성
	private String faqId; // 'id' 대신 'faqId' 사용 
    private String question;
    private String answer;
    
    // 생성자 
    public FAQ(String faqId, String question, String answer) {
        this.faqId = faqId;
        this.question = question;
        this.answer = answer;
    }
    
    //getter setter
    public String getFaqId() {
        return faqId;
    }

    public void setFaqId(String faqId) {
        this.faqId = faqId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
    

}