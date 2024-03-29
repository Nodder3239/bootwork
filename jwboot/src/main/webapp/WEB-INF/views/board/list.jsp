<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글 목록...</title>
<link rel="stylesheet" href="/static/css/style.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://kit.fontawesome.com/69798321c6.js" ></script>
<link >
</head>
<body>
	<%-- <jsp:include page="../layout/header.jsp"/> --%>
	<div id="content">
		<div class="content_list">
		<h2 class="text-left">글 목록</h2>
		<table class="table" id="tbl_list">
			<thead>
				<tr>
					<th scope="col">글번호</th>
					<th scope="col">글제목</th>
					<th scope="col">글쓴이</th>
					<th scope="col">작성일</th>
					<!-- <th scope="col">조회수</th> -->
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${boardList.content }" var="board">
					<tr>
						<th scope="row">${board.id }</th>
						<td class="td_title"><a href="/board?id=${board.id}">${board.title }
							<%-- <c:if test="${board.replyCount ne 0}">
								<small>[&nbsp;<c:out value="${board.replyCount}"/>&nbsp;]</small>
							</c:if> --%>
						</a></td>
						<td>${board.writer }</td>
						<td><c:choose>
							<c:when test="${not empty board.updatedDate }">
								<fmt:formatDate value="${board.updatedDate }" pattern="yyyy-MM-dd"/>
							</c:when>
							<c:otherwise>
								<fmt:formatDate value="${board.createdDate }" pattern="yyyy-MM-dd"/>
							</c:otherwise>
						</c:choose></td>
						<%-- <td>${board.hit } 
						</td>--%>
					</tr>
				</c:forEach>
			</tbody>
		</table>
		<!-- 페이징처리 시작 -->
          <div class="my-2">
                <ul class="pagination justify-content-center">
                    <c:if test="${boardList.number > 0}">
                            <li class="page-item">
                                <a class="page-link" href="?page=0">&lt;&lt;</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="?page=${boardList.number - 1}">&lt;</a>
                            </li>
                        </c:if>

                        <c:forEach var="i" begin="${Math.max(0, boardList.number - 5)}" end="${Math.min(boardList.totalPages - 1, boardList.number + 5)}">
                            <li class="page-item ${boardList.number eq i ? 'active' : ''}">
                                <a class="page-link" href="?page=${i}&field=${param.field}&kw=${param.kw}">${i + 1}</a>
                            </li>
                        </c:forEach>

                        <c:if test="${boardList.number < boardList.totalPages - 1}">
                            <li class="page-item">
                                <a class="page-link" href="?page=${boardList.number + 1}">&gt;</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="?page=${boardList.totalPages - 1}">&gt;&gt;</a>
                            </li>
                     </c:if>
                </ul>
          </div>
          <!-- 페이징처리 끝 -->
		<!-- 검색 영역 -->
		<div style="width:50%; margin: 10px auto;">
		  <form action="/board/" method="get">
		  	<div style="display: flex;">
				<select name="field" class="btn btn-outline-secondary dropdown-toggle">
					<option value="t" ${(field eq "t") ? "selected" : ""} >제목</option>
					<option value="c" ${(field eq "c") ? "selected" : ""} >내용</option>
					<option value="w" ${(field eq "w") ? "selected" : ""} >작성자</option>
				</select>
				<input type="text" class="form-control" name="kw" value="${kw }" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" style="width:50%">
				<button type="submit" class="btn btn-outline-secondary"><i class="fa-solid fa-magnifying-glass"></i></button>
		  		<a href = "/board/write"><button type="button" class="btn btn-outline-secondary">글쓰기</button></a>
		  	</div>
		  </form>
		 </div>
		</div>
	</div>
	<%-- <jsp:include page="../layout/footer.jsp"/> --%>
</body>
</html>