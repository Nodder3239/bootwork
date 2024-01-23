package com.khit.solo.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
@Log4j2
public class ChatController {
    
    @GetMapping("/chat")
    public String chatGET(HttpSession session){
    	String sessionId = "관리자";
    	session.setAttribute("sessionId", sessionId);
        log.info("@ChatController, chat GET()");
        
        return "/chat/chat";
    }
}