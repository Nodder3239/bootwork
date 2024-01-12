<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글쓰기...</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
	<%-- <c:if test="${empty sessionId }">
		<script type="text/javascript">
			alert("로그인 후 이용 가능합니다.");
			location.href = "/user/login";
		</script>
	</c:if> --%>
	<%-- <jsp:include page="../layout/header.jsp"/> --%>
	<div id="content">
		<h2>글쓰기</h2>
		<form action="/board/write" method="post" enctype="multipart/form-data">
			<input type="text" name="title" class="form-control mt-4 mb-2"
				placeholder="제목을 입력해주세요." required
			>
			<input type="text" name="writer" class="form-control mt-4 mb-2"
				placeholder="작성자를 입력해주세요." required
			>
			<div class="form-group">
				<textarea class="form-control" rows="10" name="content"
					placeholder="내용을 입력해주세요" required style="resize: none;"
				></textarea>
			</div>
			<div class="form-group">
			    <label for="exampleFormControlFile1">사진 업로드</label>
			    <div class="my-1">
			   		<input type="file" class="form-control-file" id="exampleFormControlFile1" name=filename>
			    </div>
			</div>
			<div class="d-flex justify-content-center">
				<input class="btn btn-outline-secondary" type="submit" value="등록">&nbsp;
				<input class="btn btn-outline-secondary" type="reset" value="초기화">&nbsp;
				<a href="/board/"><input type="button" class="btn btn-outline-secondary" value="목록"></a>
			</div>
		</form>
	</div>
	<%-- <jsp:include page="../layout/footer.jsp"/> --%>
</body>
</html>