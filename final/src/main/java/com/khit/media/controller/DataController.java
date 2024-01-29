package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/data")
@Controller
public class DataController {
	@GetMapping("/data")
	public String data() {
		return "/data/data";
	}
}
