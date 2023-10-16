let isRunning = false;
let interval;
let startTime = 0;
let pausedTime = 0;
let lapCounter = 1;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        const now = Date.now();
        startTime = now - (pausedTime > 0 ? pausedTime : startTime);
        interval = setInterval(updateTime, 10);
        document.getElementById("start").innerHTML = "Pause";
    } else {
        isRunning = false;
        clearInterval(interval);
        const now = Date.now();
        pausedTime = now - startTime;
        document.getElementById("start").innerHTML = "Resume";
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        document.getElementById("start").innerHTML = "Start";
    }
}

function resetStopwatch() {
    stopStopwatch();
    startTime = 0;
    pausedTime = 0;
    lapCounter = 1;
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("milliseconds").textContent = "00";
    document.getElementById("lapList").innerHTML = "";
}

function updateTime(){
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    document.getElementById("milliseconds").textContent = String(milliseconds).padStart(2, "0");
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement("li");
        lapTime.innerHTML = `Lap ${lapCounter}: ${document.getElementById("minutes").textContent}:${document.getElementById("seconds").textContent}.${document.getElementById("milliseconds").textContent}`;
        document.getElementById("lapList").appendChild(lapTime);
        lapCounter++;
    }
}
resetStopwatch();