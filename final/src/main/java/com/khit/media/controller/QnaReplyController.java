package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.entity.Reply;
import com.khit.media.service.ReplyService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/qnareply")
@RequiredArgsConstructor
@Controller
public class QnaReplyController {
	
	private final ReplyService replyService;
	
	@PostMapping("/write")
	public String insertReply(Reply reply) {
		replyService.insert(reply);
		return "redirect:/qnaboard/" + reply.getBoardId();
	}
	
	@GetMapping("/update/{id}")
	public String updateReplyForm(Model model, @PathVariable Long id) {
		Reply reply = replyService.findById(id);
		model.addAttribute("reply", reply);
		return "qna/updateReply";
	}
	
	@PostMapping("/update")
	public String updateReply(@ModelAttribute Reply reply) {
		replyService.update(reply);
		return "redirect:/qnaboard/" + reply.getBoardId();
	}
	
	@GetMapping("/delete/{id}")
	public String deleteReply(@PathVariable Long id) {
		Reply reply = replyService.findById(id);
		replyService.delete(id);
		return "redirect:/qnaboard/" + reply.getBoardId();
	}
}
