const playBtn = document.getElementsByClassName('m-btn')[0];
const resetBtn = document.getElementsByClassName('re-btn')[0];
const lapBtn = document.getElementsByClassName('st-btn')[0];
const display = document.getElementsByClassName("display")[0];
const lapTable = document.getElementsByClassName("lap-table")[0];
const lapClearBtn = document.getElementsByClassName("lap-btn")[0];

let flag = 0;
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let lapCount = 0;

playBtn.addEventListener("click", ()=>{
    if(flag === 0){
        playBtn.innerHTML = `<i class="ri-pause-line"></i>`;
        resetBtn.classList.remove("cover");
        lapBtn.classList.remove("cover");
        start();
        flag = 1;
    } else{
        playBtn.innerHTML = `<i class="ri-play-line"></i>`;
        stop();
        flag = 0;
    }
});
resetBtn.addEventListener("click", ()=>{
    clearInterval(timer);
    flag = 0;
    startTime = 0;
    elapsedTime = 0;
    lapBtn.classList.add("cover");
    resetBtn.classList.add("cover");
    playBtn.innerHTML = `<i class="ri-play-line"></i>`;
    lapCount = 0;
    lapTable.innerHTML = `<div class="lap-head">
                            <span>Index</span>
                            <span>Timestamp</span>
                        </div>
    `;
    display.textContent = `00 : 00 : 00 : 00`;
})
lapBtn.addEventListener("click", ()=>{
    lapCount++;
        
    let clutter = `<li class="lap-item">
                        <span class="index"> LAP ${lapCount}</span>
                        <span class="timestamp">${display.textContent}</span>
                    </li>`
    lapTable.innerHTML += clutter;
})

function start(){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
}

function stop(){
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
}

function update(){
    const currentTime  = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;

}
