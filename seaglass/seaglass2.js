window.addEventListener("wheel", function(event) {
    event.preventDefault();  
    window.scrollBy({
        top: event.deltaY * 0.1,  
    });
}, { passive: false });


function createRandomQuestionMark() {
    const questionMark = document.createElement("div");
    questionMark.classList.add("questionmark");

    // 물음표 이미지 추가 (이미지 경로 변경)
    const img = document.createElement("img");
    img.src = "1img/question.png";  // 물음표 이미지 경로
    questionMark.appendChild(img);

    // 랜덤 위치, 크기, 회전 각도 설정
    const randomX = Math.random() * window.innerWidth;  // 랜덤 X 위치
    const randomY = Math.random() * window.innerHeight;  // 랜덤 Y 위치
    const randomSize = Math.random() * 100 + 50;  // 랜덤 크기 (50px ~ 150px)
    const randomRotation = Math.random() * 360;  // 랜덤 회전 각도 (0° ~ 360°)

    questionMark.style.left = randomX + 'px';
    questionMark.style.top = randomY + 'px';
    questionMark.style.width = randomSize + 'px';
    questionMark.style.height = randomSize + 'px';
    questionMark.style.transform = `rotate(${randomRotation}deg)`;

    // 랜덤 시간 후 애니메이션 효과 적용
    const randomDelay = Math.random() * 2 + 1;  // 1~3초 사이의 랜덤 딜레이
    questionMark.style.animation = `fade-in-out ${randomDelay}s ease-in-out`;

    // 화면에 추가
    document.body.appendChild(questionMark);

    // 일정 시간 후 사라지기
    setTimeout(() => {
        questionMark.style.opacity = 2.0;
    }, randomDelay * 1000 / 2);  // 애니메이션 진행의 절반에서 opacity 0으로 변경

    // 애니메이션 끝난 후 DOM에서 제거
    setTimeout(() => {
        questionMark.remove();
    }, randomDelay * 1000);  // 애니메이션 끝나고 나서 DOM에서 제거
}

// 물음표를 0.5초마다 랜덤하게 생성
setInterval(createRandomQuestionMark, 500);





document.addEventListener("DOMContentLoaded", function() {
    function revealText() {
        let text = document.querySelector(".hidden-text");
        let scrollPosition = window.scrollY;
        let triggerPoint = window.innerHeight * 0; // 화면의 70% 지점에서 실행

        if (scrollPosition > triggerPoint) {
            text.classList.add(""); // 페이드 인 효과 적용
        }
    }

    window.addEventListener("scroll", revealText);
});

let angle = 0;

window.addEventListener("scroll", () => {
    angle += 0.5; 
    document.querySelectorAll(".rotating-image").forEach((img, index) => {
        const rotation = angle + index * 50;
        img.style.transform = `rotate(${rotation}deg) translate(180px) rotate(-${rotation}deg)`;
    });
});

window.addEventListener('scroll', function() {
    // 페이지의 맨 끝에 도달했을 때
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // 부드럽게 스크롤 맨 위로 가기
        smoothScrollToTop();
    }
});

function smoothScrollToTop() {
    // 현재 스크롤 위치
    let currentPosition = window.scrollY;
    
    // 목표 위치 (맨 위)
    let targetPosition = 0;
    
    // 이동 속도 조절 (더 낮은 값일수록 더 부드럽고 천천히)
    let speed = 10;
    
    // 스크롤을 부드럽게 이동시키는 함수
    function scrollStep() {
        // 현재 위치에서 목표 위치로 이동
        let distance = targetPosition - currentPosition;
        if (Math.abs(distance) > 1) {
            // 점진적으로 위치를 이동
            window.scrollTo(0, currentPosition + distance / speed);
            currentPosition = window.scrollY;
            requestAnimationFrame(scrollStep); // 애니메이션 반복
        } else {
            window.scrollTo(0, targetPosition); // 정확하게 맨 위로 설정
        }
    }
    
    // 애니메이션 시작
    requestAnimationFrame(scrollStep);
}

document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--cursor-x', e.pageX + 'px');
    document.body.style.setProperty('--cursor-y', e.pageY + 'px');
});


