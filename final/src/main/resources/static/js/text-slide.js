/**
 * 
 */
        // 선택자
        const sliderWrap = document.querySelector(".slider_wrap");
        const sliderInner = sliderWrap.querySelector(".slider_inner"); // 움직이는 영역
        const slider = sliderWrap.querySelectorAll(".slider"); // 개별 이미지
    
        let currentIndex = 0; // 현재 보이는 이미지
        let sliderCount = slider.length; // 이미지 갯수
        let sliderInterval = 3000; // 이미지 변경 간격 시간
        let interval; // 슬라이드 인터벌을 저장할 변수
    
        sliderInner.style.transition = "all 0.3s";
    
        function startSlider() {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % sliderCount;
    
                sliderInner.style.transform = "translateY(" + -46 * currentIndex + "px)";
            }, sliderInterval);
        }
    
        function stopSlider() {
            clearInterval(interval);
        }
    
        // 마우스 hover 시 슬라이드 멈춤
        sliderWrap.addEventListener("mouseover", stopSlider);
    
        // 마우스 hover 해제 시 슬라이드 재시작
        sliderWrap.addEventListener("mouseout", startSlider);
    
        // 슬라이더 시작
        startSlider();
    