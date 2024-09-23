let startTime, elapsedTime = 0, timerInterval;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Start the stopwatch
startBtn.addEventListener('click', function() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
});

// Pause the stopwatch
pauseBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

// Reset the stopwatch
resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(0);
    laps = [];
    renderLaps();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

// Record a lap time
lapBtn.addEventListener('click', function() {
    laps.push(elapsedTime);
    renderLaps();
});

// Update the time displayed on the stopwatch
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
}

// Format the time and update the display
function updateDisplay(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    
    timeDisplay.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds);
}

// Render the list of lap times
function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        const lapTime = formatTime(lap);
        li.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapsList.appendChild(li);
    });
}

// Format time in hh:mm:ss format
function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    
    return (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
           (minutes > 9 ? minutes : "0" + minutes) + ":" +
           (seconds > 9 ? seconds : "0" + seconds);
}
