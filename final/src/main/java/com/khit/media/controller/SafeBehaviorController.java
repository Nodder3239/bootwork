package com.khit.media.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SafeBehaviorController {

	@GetMapping("/safeBehavior/Num1")
	public String safeBehaviorNum1() {
		return "safe_behavior1/safeBehaviorNum1";
	}
	
	@GetMapping("/safeBehavior/Num2")
	public String safeBehaviorNum2() {
		return "safe_behavior2/safeBehaviorNum2";
	}
	
	@GetMapping("/safeBehavior/Num3")
	public String safeBehaviorNum3() {
		return "safe_behavior2/safeBehaviorNum3";
	}
	
	@GetMapping("/safeBehavior/Num4")
	public String safeBehaviorNum4() {
		return "safe_behavior1/safeBehaviorNum4";
	}
	
	@GetMapping("/safeBehavior/Num5")
	public String safeBehaviorNum5() {
		return "safe_behavior2/safeBehaviorNum5";
	}
	
	@GetMapping("/safeBehavior/Num6")
	public String safeBehaviorNum6() {
		return "safe_behavior1/safeBehaviorNum6";
	}
	
	
}
