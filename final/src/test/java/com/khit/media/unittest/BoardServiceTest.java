import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.khit.media.dto.MemberDTO;
import com.khit.media.entity.Role;
import com.khit.media.service.BoardService;
import com.khit.media.service.MemberService;

@SpringBootTest
public class BoardServiceTest {
	@Autowired
	private BoardService boardService;
	private MemberService memberService;
	
	/*
	 * @Test void testInsertMember() { MemberDTO memberDTO = new MemberDTO();
	 * memberDTO.setId(2); memberDTO.setMemberId("12345");
	 * memberDTO.setPassword("12345"); memberDTO.setName("관리자");
	 * memberDTO.setMemberEmail("12345"); memberDTO.setMemberAge("12345");
	 * memberDTO.setMnumber("12345"); memberDTO.setMemberArea("12345");
	 * memberDTO.setRole(Role.ADMIN); memberService.save(memberDTO);
	 * 
	 * }
	 */
	
}
