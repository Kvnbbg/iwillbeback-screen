const boxElement = document.querySelector('.box');
const actionButtonElement = document.getElementById("actionButton");
const chronoElement = document.getElementById('chrono');
const subButtonElement = document.getElementById("subButton");
const testCases = {
	'test 1': {
		'name': 'button work'
		,'description': 'the start countdown button work'
}}

// init timer
let seconds = 0;
let timer;
let isWorking = false;
let subButton = false;

// Updates the chronoElement text content based on the seconds elapsed
function updateChrono() {
	chronoElement.textContent = Math.floor(seconds/60);
					      }
	
// Starts the chronometer
function startChronometer() {
	if (isWorking) return;
	isWorking = true;
	console.log(testCases['test 1']['name']['description']);
	timer = setInterval(() => {
		seconds++;
		updateChrono();
	}, 1000); // Run this every second
}
// Stops the chronometer
function stopChronometer() {
	clearInterval(timer);
	isWorking = false;
	boxElement.style.backgroundColor = "blueviolet";
	boxElement.style.width = "50%";
	boxElement.style.height = "50%";
}
// Listener for the 'Start Countdown' button
actionButtonElement.addEventListener('click', function(){
	if (isWorking) {
		stopChronometer();
		this.textContent = "Start Countdown"; // To change button text accordingly
	} else {
		startChronometer();
		this.textContent = "Stop Countdown"; // To change button text accordingly
	}
});
function resetChronometer() {
	seconds = 0;
	chronoElement.textContent = formatTime(seconds);
	boxElement.style.width = "50%";
	boxElement.style.height = "50%";
	boxElement.style.backgroundColor = "transparent";
}

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


// Sub zone
function handleSubscriptionClick() {
   const enteredEmail = prompt("Enter your email, subscriber.");

   if (enteredEmail) {
       alert("Thank you for subscribing!");
   } else {
       alert("You have to enter an email.");
   }
}

subButtonElement.addEventListener('click', handleSubscriptionClick);


// animation
actionButtonElement.addEventListener('click', function() {
	if (actionButtonElement.textContent === 'Start Countdown') {
		startChronometer();
		actionButtonElement.textContent = 'Stop Countdown';
	} else {
		stopChronometer();
		actionButtonElement.textContent = 'Start Countdown';
		resetChronometer();
	}
});

window.addEventListener('offline', function() {
	stopChronometer();
	actionButtonElement.disabled = true;
});
window.addEventListener('online', function() {
	actionButtonElement.disabled = false;
});

// Initial setup
chronoElement.textContent = formatTime(seconds);

// Enable drag and drop
boxElement.setAttribute('draggable', 'true');
let dragObj = null;

boxElement.addEventListener('dragstart', function(e) {
  dragObj = this;
  e.dataTransfer.setData('text/plain', this.id);
});

document.body.addEventListener('dragover', function(e) {
  e.preventDefault();
});

document.body.addEventListener('drop', function(e) {
  e.preventDefault();
  const target = e.target;
  const bounding = target.getBoundingClientRect();
  let offsetX = e.clientX - bounding.x;
  let offsetY = e.clientY - bounding.y;

  dragObj.style.position = 'fixed';
  dragObj.style.left = `${offsetX}px`;
  dragObj.style.top = `${offsetY}px`;

  dragObj = null;
});