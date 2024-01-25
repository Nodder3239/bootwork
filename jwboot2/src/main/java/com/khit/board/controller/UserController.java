package com.khit.board.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Controller;

import com.khit.board.entity.User;
import com.khit.board.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@RequiredArgsConstructor
@Controller
public class UserController {

	private final UserService userService;
	
	//회원 가입
	//포스트맨에서 보낸 json 형태의 자료를 입력받아서 db에 저장함
	@PostMapping("/user")
	public @ResponseBody String insertUser(@RequestBody User user) {
		userService.save(user);
		return "회원 가입 성공";
	}
	
	//회원 목록 보기
	@GetMapping("/user/list")
	public @ResponseBody List<User> getUser(){
		List<User> userList = userService.findAll();
		return userList;
	}
	
	//회원 상세보기
	//id로 검색
	@GetMapping("/user/{id}")
	public @ResponseBody User getUserOne(@PathVariable Integer id){
		User user = userService.findbyId(id);
		return user;
	}
	
}
