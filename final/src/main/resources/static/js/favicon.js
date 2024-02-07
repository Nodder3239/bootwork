/**
    << favicon 모든 페이지에 적용하기 >>
    
   조건: 모든 페이지에 포함하는 header.html에 추가하는 것이 효율적 -> 모든 페이지를 포함할 페이지가 필요
  
   header.html Body 하단에 추가해줄 <script>태그 : <script src="/js/favicon.js"></script> 
   
   결과 : header.html을 포함한 모든 페이지에 favicon이 생성됨!
 */

function loadFavicon() {
  var link = document.createElement('link');
  link.rel = 'icon';
  link.href = '/images/favicon-96x96.png'; // favicon의 URL을 지정
  link.type = 'image/png'; // favicon의 MIME 타입을 지정
  document.head.appendChild(link);
}

window.onload = loadFavicon;
 