// 스크롤 이벤트를 감지하여 페이지 끝에 도달하면 2초 후 맨 위로 자동 이동
window.addEventListener('scroll', function() {
    // 페이지가 끝에 도달하면
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // 2초 후 맨 위로 스크롤
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 2000);  // 2초 지연
    }
});





document.addEventListener("DOMContentLoaded", function () {
    var text = document.getElementById('text');
    var text2 = document.getElementById('text2');

    if (!text || !text2) {
        console.error("Text elements not found!");
        return;
    }

    function applyTextEffect(element) {
        var originalHtml = element.innerHTML.trim();
        var characters = [];
        element.innerHTML = element.innerHTML.replace(/<br\s*\/?>/g, "↵");

        var priorityWords = ["Sea Glass", "not broken", "washed clean", "shake me up"];

        let tempWord = "";
        for (let i = 0; i < element.innerHTML.length; i++) {
            let char = element.innerHTML[i];

            if (char === ' ' || char === '↵') {
                if (priorityWords.includes(tempWord)) {
                    characters.push(`<span class="char priority">${tempWord}</span>`);
                } else {
                    for (let j = 0; j < tempWord.length; j++) {
                        characters.push(`<span class="char">${tempWord[j]}</span>`);
                    }
                }
                characters.push(char === ' ' ? '&nbsp;' : '<br>');
                tempWord = "";
            } else {
                tempWord += char;
            }
        }

        if (tempWord.length > 0) {
            if (priorityWords.includes(tempWord)) {
                characters.push(`<span class="char priority">${tempWord}</span>`);
            } else {
                for (let j = 0; j < tempWord.length; j++) {
                    characters.push(`<span class="char">${tempWord[j]}</span>`);
                }
            }
        }

        element.innerHTML = characters.join('');

        let charElements = Array.from(element.querySelectorAll('.char'));
        let priorityElements = Array.from(element.querySelectorAll('.priority'));

        priorityElements.forEach((char, index) => {
            char.style.animationDelay = `${index * 200}ms`;
        });

        let otherChars = charElements.filter(c => !priorityElements.includes(c));
        otherChars.sort(() => Math.random() - 0.5);

        otherChars.forEach((char, index) => {
            char.style.animationDelay = `${(priorityElements.length * 200) + (index * 100)}ms`;
        });
    }

    applyTextEffect(text);

    // 기존 IntersectionObserver 제거하고 scroll 이벤트 사용
    function handleScroll() {
        let text2Position = text2.getBoundingClientRect().top; // 요소의 위치
        let screenPosition = window.innerHeight / 1.3; // 화면 기준 위치 조정

        if (text2Position < screenPosition) {
            text2.classList.add('visible');
            applyTextEffect(text2); // 텍스트 애니메이션 적용
            window.removeEventListener('scroll', handleScroll); // 한 번 실행 후 이벤트 제거
        }
    }

    window.addEventListener('scroll', handleScroll);
});


document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--cursor-x', e.pageX + 'px');
    document.body.style.setProperty('--cursor-y', e.pageY + 'px');
});


