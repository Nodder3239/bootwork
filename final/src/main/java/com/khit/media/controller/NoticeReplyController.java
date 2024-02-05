package com.khit.media.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.ReplyDTO;
import com.khit.media.entity.Reply;
import com.khit.media.service.ReplyService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/noticereply")
@RequiredArgsConstructor
@Controller
public class NoticeReplyController {
	
	private final ReplyService replyService;
	
	@PostMapping("/write")
	public String insertReply(ReplyDTO replyDTO,
		@AuthenticationPrincipal SecurityUser principal) {
		replyDTO.setReplyer(principal.getMember().getName());
		replyService.insert(replyDTO);
		return "redirect:/noticeboard/" + replyDTO.getBoardId();
	}
	
	@GetMapping("/update/{id}")
	public String updateReplyForm(Model model, @PathVariable Long id) {
		ReplyDTO replyDTO = replyService.findById(id);
		model.addAttribute("reply", replyDTO);
		return "notice/updateReply";
	}
	
	@PostMapping("/update")
	public String updateReply(@ModelAttribute ReplyDTO replyDTO) {
		replyService.update(replyDTO);
		return "redirect:/noticeboard/" + replyDTO.getBoardId();
	}
	
	@GetMapping("/delete/{id}")
	public String deleteReply(@PathVariable Long id) {
		Reply reply = replyService.findEntityById(id);
		replyService.delete(id);
		return "redirect:/noticeboard/" + reply.getBoardId();
	}
}
