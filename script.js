console.log("snake game");
//initializing the variable and snake as array
let inputDir = {x: 0 , y: 0}
let snakeArr = [{x: 12 , y: 13}]
let speed = 8;
let lastPaintTime = 0;
let food = { x: 2 , y: 3};
let score = 0;
let highscore;
if (localStorage.getItem('hgscore')== null) {
    highscore = 0;
}
else{
    highscore = localStorage.getItem('hgscore');
}
count.innerHTML = score;
hgcount.innerHTML = highscore;

// creating main function
main = (ctime)=>{
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

function collid(serr){
    if (serr[0].x <=0 || serr[0].x>=41 || serr[0].y <=0 || serr[0].y >=41 ) {
        return true;
    }
    for (let i = 1; i < serr.length; i++) {
        if (serr[0].x == serr[i].x && serr[0].y == serr[i].y) {
            return true;
        }
    }
}


// creating gameEngine function
gameEngine = ()=>{
    // 1. increase snake array and crete ramdom food on board
    if (collid(snakeArr)) {
        if (localStorage.getItem('hgscore')== null) {
            highscore = score;
            localStorage.setItem('hgscore', JSON.stringify(highscore));
        }
        else{
            if (score > localStorage.getItem('hgscore')) {
                localStorage.clear();
                highscore = score;
                localStorage.setItem('hgscore', JSON.stringify(highscore));
            }
            else{
                highscore = localStorage.getItem('hgscore');
            }
        }
        hgcount.innerHTML = highscore;
        // alert(`game over! your high score : ${highscore}`)
        outside.innerHTML = `
        <div class="card">
        <h2 id="gameover">GAME OVER</h2>
        <div class="score">SCORE: ${score}</span></div>
        <div class="hgscore">HIGH SCORE: ${highscore}</span></div>
        <button id="retry">RETRY</button>
    </div>`;
        // outside.style.background = "rgba(0, 0, 0, 0.596)";
        let container = document.querySelectorAll('.container');
        container[0].style.opacity = "0.5";
        retry.addEventListener('click', ()=>{
            outside.style.background = "transparent";
            let card = document.querySelectorAll('.card');
            card[0].style.opacity = "0";
            container[0].style.opacity = "1";
        })

        document.addEventListener('keydown' , (e)=>{
            if (e.key == "Enter"){
                outside.style.background = "transparent";
                let card = document.querySelectorAll('.card');
                card[0].style.opacity = "0";
                container[0].style.opacity = "1";
            }
        })
        inputDir = {x: 0 , y: 0};
        snakeArr = [{x: 12 , y: 13}] ;
        speed = 8;
        score = 0;
        count.innerHTML = score;
    }

    // 2 . displaying snake
    let board = document.getElementById('board');
    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.setAttribute('id', 'shir');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    
    // displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // moving the snake
    for (let i = snakeArr.length -2 ; i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // snake eat a food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y });
        let a = 1;
        let b = 38;
        food = { x: Math.round(a + (b - a)*Math.random()), y: Math.round(a + (b - a)*Math.random())};
        score++;
        count.innerHTML = score;
        if (score > highscore) {
            hgcount.innerHTML = score;
        }
    }

}

window.requestAnimationFrame(main);

// functioning arrow keys
window.addEventListener('keydown' , (e)=>{
    inputDir = {x:0 , y: 0};
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("arrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("arrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            default:
                break;
    }
    
})

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/most significant/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            inputDir.x = -1;
            inputDir.y = 0;
        } else {
            /* right swipe */
            inputDir.x = 1;
            inputDir.y = 0;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            inputDir.x = 0;
            inputDir.y = -1;
        } else { 
            /* down swipe */
            inputDir.x = 0;
            inputDir.y = 1;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
