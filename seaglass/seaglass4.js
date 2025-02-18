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

    if (!text2) {
        console.error("text2 요소를 찾을 수 없습니다!");
        return;
    }

    // 스크롤 이벤트 처리
    document.addEventListener("scroll", function() {
        let text2Position = text2.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;

        // text2가 화면에 나타나면 visible 클래스 추가
        if (text2Position < windowHeight - 100) {
            text2.classList.add("visible");
        } else {
            text2.classList.remove("visible"); // 위로 스크롤하면 사라짐
        }
    });

    // 텍스트 효과 적용
    function applyTextEffect(element) {
        if (!element) return;

        var originalHtml = element.innerHTML.trim();
        var characters = [];
        element.innerHTML = element.innerHTML.replace(/<br\s*\/?>/g, "↵");

        var priorityWords = ["Sea Glass", "not broken", "washed clean", "shake me up"];

        let tempWord = "";
        for (let i = 0; i < element.innerHTML.length; i++) {
            let char = element.innerHTML[i];

            if (char === ' ' || char === '↵') {
                if (priorityWords.includes(tempWord)) {
                    characters.push(`<span class="char priority">${tempWord}</span>`); // 우선순위 단어
                } else {
                    for (let j = 0; j < tempWord.length; j++) {
                        characters.push(`<span class="char">${tempWord[j]}</span>`); // 일반 문자
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

        // 애니메이션 딜레이 설정
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
});

document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--cursor-x', e.pageX + 'px');
    document.body.style.setProperty('--cursor-y', e.pageY + 'px');
});