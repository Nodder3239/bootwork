<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 수정하기...</title>
<link rel="stylesheet" href="/static/css/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>
	<%-- <jsp:include page="../layout/header.jsp"/> --%>
	<div id="content">
		<h2>글 수정하기</h2>
		<form action="/board/update" method="post" enctype="multipart/form-data">
			<input type="hidden" name="id" value="${board.id }">
			<input type="hidden" name="writer" value="${board.writer }">
			
			<input type="text" name="title" class="form-control mt-4 mb-2"
				value="${board.title }" required
			>
			<div class="form-group">
				<textarea class="form-control" rows="10" name="content"
					required style="resize: none;">${board.content }</textarea>
			</div>
			<%-- <div class="form-group">
			    <label for="exampleFormControlFile1">사진 수정</label>
			    <input type="file" class="form-control-file" id="exampleFormControlFile1" name="filename"
			     value="">
			    <input type="hidden" name="filename" value="${board.filename }">
			</div> --%>
			<input class="btn btn-outline-secondary" type="submit" value="수정">
			<input class="btn btn-outline-secondary" type="reset" value="초기화">
			<a href="/board/"><input type="button" class="btn btn-outline-secondary" value="목록"></a>
		</form>
	</div>
	<%-- <jsp:include page="../layout/footer.jsp"/> --%>
</body>
</html>