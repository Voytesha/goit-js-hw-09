const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
  
let intervalId = null;
refs.startBtn.addEventListener('click', backgroundColorChanging);
refs.stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function backgroundColorChanging() {
    refs.startBtn.removeEventListener('click', backgroundColorChanging);  
    refs.stopBtn.addEventListener('click', stopChanging);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChanging() {
    refs.stopBtn.removeEventListener('click', stopChanging);
    refs.startBtn.addEventListener('click', backgroundColorChanging);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(intervalId);
}

