<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 상세보기...</title>
<link rel="stylesheet" href="/static/css/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<link >
</head>
<body>
	<%-- <jsp:include page="../layout/header.jsp"/> --%>
	<div id="content">
		<h2>글 상세보기</h2>
		<table class="tbl_detail">
			<tr>
				<td>
					<div class="text-left" style="font-size: 33px; font-weight: 500;; font-weight:bold">
					${board.title }
					</div>
					<div style="margin-left: 10px; font-size: 15px">
					<c:choose>
						<c:when test="${not empty board.updatedDate }">
							작성일시: <fmt:formatDate value="${board.createdDate }" pattern="yyyy-MM-dd HH:mm:ss"/>&nbsp;
							수정일시: <fmt:formatDate value="${board.updatedDate }" pattern="yyyy-MM-dd HH:mm:ss"/>
						</c:when>
						<c:otherwise>
							작성일시: <fmt:formatDate value="${board.createdDate }" pattern="yyyy-MM-dd HH:mm:ss"/>
						</c:otherwise>
					</c:choose>
					</div>
					<%-- <div class="text-right" class="font-weight-light">
					조회수: ${board.hit }회
					</div> --%>
					<hr>
				</td>
			</tr>
			<tr>
				<td>
					<p class="text-left" class="font-weight-light" style="font-size: 18px; font-weight:bold">
					작성자: ${board.writer }
					</p>
					<hr>
				</td>
			</tr>
			<%-- <tr>
				<td>
				<c:if test="${not empty board.boardFilename }">
					<img src="/resources\\upload/${board.boardFilename }" alt="" style="width:100%">
				</c:if>
				</td>
			</tr> --%>
			<tr>
				<td>
					<p class="text-left">
					${board.content }
					</p>
					<hr>
				</td>
			</tr>
			<tr>
				<td>
					<%-- <c:if test = "${sessionId eq board.userId}"> --%>
					<a href="/board/update?id=${board.id }"><button class="btn btn-outline-secondary">수정</button></a>
					<a href="/board/delete?id=${board.id }"><button class="btn btn-outline-secondary"
					 onclick="return confirm('정말로 삭제하시겠습니까?')">삭제</button></a>
					<%-- </c:if> --%>
					<%-- <a href="/board/paging?page=${page }"><button class="btn btn-outline-secondary">목록</button></a> --%>
					<a href="/board/"><button class="btn btn-outline-secondary">목록</button></a>
				</td>
			</tr>
		</table>
		<!-- 댓글 목록 -->
		<%-- <div id="reply-list">
			<div class = "reply">
				<c:forEach items="${replyList }" var="reply">
					<div class = "replyer" >
						<p class="text-left" style="font-size: 18px; font-weight:bold">${reply.replyer }</p>
					</div>
					<div class = "replyContent">
						<p class="text-left">${reply.replyContent }</p>
						<p class="text-left" style="font-size: 13px">
							<c:choose>
								<c:when test="${not empty reply.updatedTime }">
									작성일시: <fmt:formatDate value="${reply.createdTime }" pattern="yyyy-MM-dd HH:mm:ss"/>&nbsp;
									수정일시: <fmt:formatDate value="${reply.updatedTime }" pattern="yyyy-MM-dd HH:mm:ss"/>
								</c:when>
								<c:otherwise>
									작성일시: <fmt:formatDate value="${reply.createdTime }" pattern="yyyy-MM-dd HH:mm:ss"/>
								</c:otherwise>
							</c:choose>
							<c:if test="${sessionId eq reply.replyer }">
								<a href="/reply/update?id=${reply.id }">
								<i class="fa-solid fa-pen"></i></a>
								<a href="/reply/delete?boardId=${reply.boardId}&id=${reply.id }"
										onclick="return confirm('댓글을 삭제하시겠습니까?')">
								<i class="fa-solid fa-trash-can"></i></a>
							</c:if>
						</p>
					</div>
				</c:forEach>
			</div>
		</div> --%>
				
		<div class = "reply">
			<c:forEach items="${replyList }" var="reply">
				<div class = "replyer" >
					<p class="text-left" style="font-size: 18px; font-weight:bold">${reply.replyer }</p>
				</div>
				<div class = "replyContent">
					<p class="text-left">${reply.replyContent }</p>
					<p class="text-left" style="font-size: 13px">
						<c:choose>
							<c:when test="${not empty reply.updatedTime }">
								작성일시: <fmt:formatDate value="${reply.createdTime }" pattern="yyyy-MM-dd HH:mm:ss"/>&nbsp;
								수정일시: <fmt:formatDate value="${reply.updatedTime }" pattern="yyyy-MM-dd HH:mm:ss"/>
							</c:when>
							<c:otherwise>
								작성일시: <fmt:formatDate value="${reply.createdTime }" pattern="yyyy-MM-dd HH:mm:ss"/>
							</c:otherwise>
						</c:choose>
						<c:if test="${sessionId eq reply.replyer }">
							<a href="/reply/update?id=${reply.id }">
							<i class="fa-solid fa-pen"></i></a>
							<a href="/reply/delete?boardId=${reply.boardId}&id=${reply.id }"
									onclick="return confirm('댓글을 삭제하시겠습니까?')">
							<i class="fa-solid fa-trash-can"></i></a>
						</c:if>
					</p>
				</div>
			</c:forEach>
		</div>
		<!-- 댓글 등록 -->
		<c:if test="${not empty sessionId}">
		<div class="replyWrite">
			<form action="/reply/insert" method="post" name="replyform">
				<input type="hidden" name="boardId" value="${board.id }">
				<input type="hidden" name="replyer" value="${sessionId }">
				<p>
				<textarea name="replyContent" id="replyContent" class="form-control" rows="5"
						placeholder="댓글 작성란" style="resize: none;"></textarea>
				</p>
				<input type="button" class="btn btn-outline-secondary" onclick="checkReply()" value="등록"></input>
			</form>	
			<%-- <input type="hidden" name="boardId" id="boardId" value="${board.id }">
			<input type="hidden" name="replyer" id="replyer" value="${sessionId }">
			<p>
			<textarea name="replyContent" id="replyContent" class="form-control" rows="5"
					placeholder="댓글 작성란" style="resize: none;"></textarea>
			</p>
			<input type="button" class="btn btn-outline-secondary" onclick="replyInsert()" value="등록"></input> --%>	
		</div>
		</c:if>	
	</div>
	<%-- <jsp:include page="../layout/footer.jsp"/> --%>
	<script>
		/* const checkReply = function() {
			//댓글 등록이 비어있으면 "댓글을 입력해 주세요"
			//댓글 내용이 있으면 서버에 전송
			let content = document.getElementById("replyContent");
			if(content.value == ""){
				alert("댓글을 입력해 주세요.")
				content.focus();
				return false;
			}else{
				document.replyform.submit();
			}
				
		} */
		
		/*
		const replyInsert = function() {
			//댓글 등록이 비어있으면 "댓글을 입력해 주세요"
			//댓글 내용이 있으면 서버에 전송
			let boardId = "${board.id}";
			let replyer = document.getElementById("replyer").value;
			let content = document.getElementById("replyContent").value;
			
			if(content == ""){
				alert("댓글을 입력해 주세요.")
				document.getElementById("replyContent").focus();
				return false;
			}
			
			//ajax 구현
			$.ajax({
				//요청방식: POST, 요청주소: /reply/insert
				type: "POST",
				url: "/reply/insert",
				data:{
					boardId: boardId,
					replyer: replyer,
					replyContent: content
					},
				success: function(replyList){
					alert("댓글 등록 성공");
					console.log(replyList);
					//댓글 목록
					let output = "";
					for(let i in replyList){
						output += "<div class='reply'>";
						output += "<p>" + replyList[i].replyContent + "</p>"
						output += "<p>작성자: " + replyList[i].replyer + "</p>"
						output += "<p>(작성일: " + replyList[i].createdTime + ")</p>"						
						output += "</div>"
					}
					document.getElementById("reply-list").innerHTML = output;
					document.getElementById("replyContent").value = "";	//댓글 내용 초기화
				},
				error: function(){
					console.log("댓글 등록 실패");
				}
			});				
		}
		*/
	</script>
</body>
</html>