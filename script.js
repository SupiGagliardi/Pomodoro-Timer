
let currentTitle;

const audio = new Audio('bell.mp3')

const leftColumn = document.querySelector('.left-column');
const rightColumn = document.querySelector('.right-column');

const workTimerElement = document.querySelector('#work-timer');
const breakTimerElement = document.querySelector('#break-timer');

const workArrowUpElement = document.querySelector('#work-arrowup');
const workArrowDownElement = document.querySelector('#work-arrowdown');

const allArrows = document.querySelectorAll('.arrows');

const breakArrowUpElement = document.querySelector('#break-arrowup');
const breakArrowDownElement = document.querySelector('#break-arrowdown');

const startButton = document.querySelector('#start-btn');
const pauseButton = document.querySelector('#pause-btn');
const restartButton = document.querySelector('#restart-btn');
pauseButton.classList.add('hide');

let onBreak = false;
let firstTrigger = false;


const workStatus = document.querySelector('#work-status');
const breakStatus = document.querySelector('#break-status');

let workTimer = 25;
let workTimerInfo = '25:00'
workTimerElement.textContent = `${workTimer}:00`;

let breakTimer = 5;
let breakTimerInfo = '5:00'
breakTimerElement.textContent = `0${breakTimer}:00`;

workArrowUpElement.addEventListener('click', () => {
    if (workTimer >= 60) { return }

    workTimer++
    if (workTimer < 10) {
        workTimerElement.textContent = `0${workTimer}:00`;
    } else {
        workTimerElement.textContent = `${workTimer}:00`;
    }
})

workArrowDownElement.addEventListener('click', () => {
    if (workTimer <= 1) { return }

    workTimer--
    if (workTimer < 10) {
        workTimerElement.textContent = `0${workTimer}:00`;
        workTimerInfo = workTimerElement.textContent
    } else {
        workTimerElement.textContent = `${workTimer}:00`;
        workTimerInfo = workTimerElement.textContent
    }
});

breakArrowUpElement.addEventListener('click', () => {
    if (breakTimer >= 60) { return }
    breakTimer++
    if (breakTimer < 10) {
        breakTimerElement.textContent = `0${breakTimer}:00`;
        breakTimerInfo = breakTimerElement.textContent;
    } else {
        breakTimerElement.textContent = `${breakTimer}:00`;
        breakTimerInfo = breakTimerElement.textContent;
    }
})

breakArrowDownElement.addEventListener('click', () => {
    if (breakTimer <= 1) { return }

    breakTimer--
    if (breakTimer < 10) {
        breakTimerElement.textContent = `0${breakTimer}:00`;
        breakTimerInfo = breakTimerElement.textContent;
    } else {
        breakTimerElement.textContent = `${breakTimer}:00`;
        breakTimerInfo = breakTimerElement.textContent;
    }
})

startButton.addEventListener('click', () => {

    if (firstTrigger === false) {
        startWorkTimer();
        firstTrigger = true;
    }

    startButton.classList.add('hide');
    pauseButton.classList.remove('hide');

    allArrows.forEach(arrow => {

        arrow.classList.add('hideVisibility')
    })

    if (onBreak === false) {
        workStatus.classList.remove('paused-timer');
    } else {
        breakStatus.classList.remove('paused-timer');
    }

});

pauseButton.addEventListener('click', () => {

    pauseButton.classList.add('hide');
    startButton.classList.remove('hide');

    if (onBreak === false) {
        workStatus.classList.add('paused-timer');
    } else {
        breakStatus.classList.add('paused-timer');
    }


})


function startWorkTimer() {


    currentTitle = document.title;
    

    leftColumn.style.cssText = 'Background-color: #F55D5D'
    rightColumn.style.cssText = 'Background-color: #FB6767'

    workStatus.classList.add('word-highlight');
    breakStatus.classList.remove('word-highlight');

    workTimerElement.classList.add('timer-highlight');
    breakTimerElement.classList.remove('timer-highlight');

    let timer = workTimer * 60;
    let minutes;
    let seconds;

    

    let workInterval = setInterval(function () {
    
    if (workStatus.classList.contains('paused-timer')) {
        return;
    }

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        workTimerElement.textContent = minutes + ":" + seconds;

        currentTitle = `(${minutes}:${seconds}) Work timer!` 
        document.title = currentTitle;

        if (--timer < 0) {
            document.title = 'Break time!'
            clearInterval(workInterval);
            onBreak = true;
            startBreakTimer();
        }
    }, 1000);
}


function startBreakTimer() {

    audio.play();

    rightColumn.style.cssText = 'Background-color: #F55D5D'
    leftColumn.style.cssText = 'Background-color: #FB6767'

    breakStatus.classList.add('word-highlight');
    workStatus.classList.remove('word-highlight');

    breakTimerElement.classList.add('timer-highlight');
    workTimerElement.classList.remove('timer-highlight');


    let timer = breakTimer * 60;
    let minutes;
    let seconds;

    let breakInterval = setInterval(function () {

        if (breakStatus.classList.contains('paused-timer')) {
            return;
        }
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        breakTimerElement.textContent = minutes + ":" + seconds;

        currentTitle = `(${minutes}:${seconds}) Break timer!` 
        document.title = currentTitle;

        if (--timer < 0) {
            audio.play();
            document.title = "Break's over!"
            clearInterval(breakInterval);
            onBreak = false;
            startWorkTimer();
        }
    }, 1000);
}

restartButton.addEventListener('click', () => {

    document.title = 'Pomodoro Timer'

    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }

    allArrows.forEach(arrow => {

        arrow.classList.remove('hideVisibility')
    })

    workStatus.classList.remove('word-highlight')
    breakStatus.classList.remove('word-highlight')

    breakTimerElement.classList.remove('timer-highlight');
    workTimerElement.classList.remove('timer-highlight');

    pauseButton.classList.add('hide');
    startButton.classList.remove('hide');

    leftColumn.style.cssText = 'Background-color: #FC5E5E'
    rightColumn.style.cssText = 'Background-color: #FB6767'

    firstTrigger = false;
    workTimerElement.textContent = workTimerInfo
    breakTimerElement.textContent = breakTimerInfo


})