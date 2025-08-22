let score = 0;
let cross = true;
let isGameOver = false;

let audio = new Audio('music.mp3');
let audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function (e) {
    if (isGameOver) return; 

    if (e.keyCode == 38) { 
        let dino = document.querySelector('.dino');
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }
    }

    if (e.keyCode == 39) { 
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }

    if (e.keyCode == 37) {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameover = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);


    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "☠️ Game Over! Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        isGameOver = true;
        document.getElementById("restartBtn").style.display = "inline-block";

        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }

    else if (offsetX < 145 && cross && !isGameOver) {
        score += 1;
        updateScore(score);
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (aniDur > 3.0) {
                let newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }
        }, 500);
    }
}, 100);

function updateScore(score) {
    document.getElementById("scoreCont").innerHTML = "Your Score : " + score;
}


document.getElementById("restartBtn").onclick = function () {
    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');
    let gameover = document.querySelector('.gameOver');

    obstacle.classList.add('obstacleAni');
    obstacle.style.left = "100vw"; 

    gameover.innerHTML = "🦖 Welcome to Dino-Dash";
    document.getElementById("restartBtn").style.display = "none";

    dino.style.left = "40px"; 

    score = 0;
    updateScore(score);

    obstacle.style.animationDuration = "5s";
    isGameOver = false;

    audiogo.pause();
    audiogo.currentTime = 0;
    audio.currentTime = 0;
    audio.play();
};
