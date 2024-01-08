const game_body = document.getElementById("game-body");
let shotgunSound = new Audio("./assets/shotgun.wav");

game_body.onclick = () => {
    shotgunSound.currentTime = 0;
    shotgunSound.play();
};

let bgm = new Audio("./assets/bgm.mp3");
bgm.play();
bgm.loop = true;
let zombie;
let zombieID = 0;

function generateZombies() {
    let num = generateUniqueNums(1, 7);
    game_body.innerHTML += `<img src=./assets/zombie-${num}.png  class=zombie-image id=Zombies${zombieID} >`;
    zombie = document.getElementById(`Zombies${zombieID}`);
    let second = generateUniqueNums(2, 7);
    zombie.style.animationDuration = `${second}s`;
    let viewwidth = generateUniqueNums(20, 80);
    zombie.style.transform = `translateX(${viewwidth}vw)`;

    zombie.onclick = () => {
        destroyZombie(zombie);
    };
}

generateZombies();

function generateUniqueNums(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function destroyZombie(ghost) {
    ghost.style.display = "none";
    zombieID++;
    generateZombies();
}



let maxlife = document.getElementById("max-lives");
let lives = 5; 
let time = 60;

function Escapezombie(zombie) {
    let widthLife = 100;
    if (zombie.getBoundingClientRect().top <= 0) {
        widthLife -= 20;
        lives--;
       maxlife.style.width = `${widthLife}%`;
        if (lives <= 0) {
            location.href = "game-over.html";
        } else {
            destroyZombie(zombie);
        }
    }
}


setInterval(timer, 1000);

function timer() {
    if (time <= 0) {
        location.href = "win.html";
    } else {
        time--;
        document.getElementById("timer").innerText = time;
        Escapezombie(zombie);
    }
}
