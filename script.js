const chronoElement = document.getElementById('chrono');
const buttonElement = document.getElementById('actionButton');

let seconds = 0;
let timer;

function startChronometer() {
  timer = setInterval(() => {
    seconds++;
    chronoElement.textContent = formatTime(seconds);
  }, 1000);
}

function stopChronometer() {
  clearInterval(timer);
}

function resetChronometer() {
  seconds = 0;
  chronoElement.textContent = formatTime(seconds);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

buttonElement.addEventListener('click', function() {
  if (buttonElement.textContent === 'Start') {
    startChronometer();
    buttonElement.textContent = 'Stop';
  } else {
    stopChronometer();
    buttonElement.textContent = 'Start';
  }
});

window.addEventListener('offline', function() {
  stopChronometer();
  buttonElement.disabled = true;
});

window.addEventListener('online', function() {
  buttonElement.disabled = false;
});

// Initial setup
chronoElement.textContent = formatTime(seconds);
