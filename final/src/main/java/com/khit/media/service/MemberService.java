package com.khit.media.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.khit.media.config.SecurityUser;
import com.khit.media.dto.MemberDTO;
import com.khit.media.entity.Member;
import com.khit.media.entity.Role;
import com.khit.media.exception.BootBoardException;
import com.khit.media.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	private final PasswordEncoder pwEncoder;
	

	public Member login(Member member) {
		// db에서 아이디 조회
		Optional<Member> findMember = 
				memberRepository.findByMemberId(member.getMemberId());
		if(findMember.isPresent()) {
			return findMember.get();
		}else {
			return null;
		}
	}

	public void save(MemberDTO memberDTO, MultipartFile memberFile) throws Exception {
		if(!memberFile.isEmpty()) {  //전달된 파일이 있으면
			//저장 경로
	         //배포 후 해당 경로 못찾음..
	         //String filepath = "C:\\bootworks\\bootboard\\src\\main\\resources\\static\\upload\\";
	         
	         UUID uuid = UUID.randomUUID();  //무작위 아이디 생성(중복파일의 이름을 생성해줌)
	         String filename = uuid + "_" + memberFile.getOriginalFilename();  //원본 파일
	         String filepath = "C:/springfiles/" + filename;
	      
	         //File 클래스 객체 생성
	         File savedFile = new File(filepath); //실제 파일
	         memberFile.transferTo(savedFile);
	      
	         //2. 파일 이름은 db에 저장
	         memberDTO.setFilename(filename);
	         memberDTO.setFilepath("/upload/" + filepath); //파일 경로 설정함
		}
		//1. 비밀번호 암호화
		//2. 권한 설정
		String encPW = pwEncoder.encode(memberDTO.getPassword());
		memberDTO.setPassword(encPW);
		memberDTO.setRole(Role.MEMBER);
		
		//dto -> entity 변환 메서드
		Member member = Member.toSaveEntity(memberDTO);
		memberRepository.save(member);
		
	}

	public List<MemberDTO> findAll() {
		//db에서 memberList를 가져옴
		List<Member> memberList = memberRepository.findAll();
		
		//비어있는 memberDTOList를 생성
		List<MemberDTO> memberDTOList = new ArrayList<>();
		
		//memberDTOList에 memberDTO를 저장함
		for(Member member : memberList) {
			MemberDTO memberDTO = MemberDTO.toSaveDTO(member);
			memberDTOList.add(memberDTO);
		}
		return memberDTOList;
	}

	public MemberDTO findById(Integer id) {
		//db에서 member 엔티티를 꺼내옴
		Optional<Member> findMember = memberRepository.findById(id);
		if(findMember.isPresent()) { //회원 정보가 있으면 
			//entity -> dto 변환
			MemberDTO memberDTO = MemberDTO.toSaveDTO(findMember.get());
			return memberDTO; //정보를 가져와서 반환
		}else {
			throw new BootBoardException("페이지를 찾을 수 없습니다.");
		}
	}

	public void deleteById(Integer id) {
		memberRepository.deleteById(id);
	}

	public MemberDTO findByMemberId(SecurityUser principal) {
		Optional<Member> member = memberRepository.findByMemberId(principal.getUsername());
		//변환
		MemberDTO memberDTO = MemberDTO.toSaveDTO(member.get());
		return memberDTO;
	}
	
	public MemberDTO findByMemberEmail(String email) {
		//db에서 이메일로 검색한 회원 객체 가져오고
		Member member = memberRepository.findByMemberEmail(email).get();
		//회원 객체(엔티티)를 dto로 변환
		MemberDTO memberDTO = MemberDTO.toSaveDTO(member);
		return memberDTO;
	}

	public void update(MemberDTO memberDTO, MultipartFile memberFile) throws Exception {
		Member member;
		if (!memberFile.isEmpty()) {
			
			UUID uuid = UUID.randomUUID();	//무작위 아이디 생성(중복 파일 이름의 생성)
			
			String filename = uuid.toString() + "_" + memberFile.getOriginalFilename();	//원본 파일
			String filepath = "C:/springfiles/" + filename;
			
			//File 클래스로 객체 생성
			File savedFile = new File(filepath);	//upload 폴더에 저장
			memberFile.transferTo(savedFile);	//서버 폴더에 저장
		
		//2. 파일 이름은 db에 저장
			memberDTO.setFilename(filename);
			memberDTO.setFilepath(filepath);
			

		}else{
			memberDTO.setFilename(findById(memberDTO.getId()).getFilename());
			memberDTO.setFilepath(findById(memberDTO.getId()).getFilepath());

		}
		
		//암호화, 권한 설정
		String encPW = pwEncoder.encode(memberDTO.getPassword());
		memberDTO.setPassword(encPW);
		memberDTO.setRole(Role.MEMBER);
		
		//변환시 엔티티 메서드를 toSaveUpdate()로 바꿔줌
		member = Member.toSaveUpdate(memberDTO);
		
		memberRepository.save(member);		
	}

	public String checkEmail(String memberEmail) {
		//db에 있는 이메일 조회해서 있으면 "OK" 아니면 "NO"를 보냄
		Optional<Member> findMember = memberRepository.findByMemberEmail(memberEmail);
		if(findMember.isEmpty()) { //db에 회원이 없으면 가입해도 되는("OK") 문자 반환
			return "OK";
		}else {
			return "NO";
		}
	}
}