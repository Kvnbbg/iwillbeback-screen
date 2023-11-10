// Optimized and improved code based on the task provided

// GET ELEMENTS
const boxElement = document.querySelector('.box');
const actionButtonElement = document.getElementById("actionButton");
const chronoElement = document.getElementById('chrono');
const subButtonElement = document.getElementById("subButton");
const testCases = {
    'test 1': {
        'name': 'button work',
        'description': 'the start countdown button work',
    }
}

// Get the elements
const darkenButton = document.getElementById('darken');
const lightenButton = document.getElementById('lighten');
const hereButton = document.getElementById('here');
const backButton = document.getElementById('back');
const headingLetters = document.querySelectorAll('.heading-letter');

// EVENT LISTENERS

// Darken and lighten screen
darkenButton.addEventListener('click', () => document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)');
lightenButton.addEventListener('click', () => document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)');

// Change heading text
hereButton.addEventListener('click', () => updateHeadingText(['I', '\'', 'M', ' ', 'H', 'E', 'R', 'E']));
backButton.addEventListener('click', () => updateHeadingText(['I', '', 'W', 'I', 'L', 'L', '', 'B', 'E', '', 'B', 'A', 'C', 'K']));

// Timer functionality
let seconds = 0;
let timer;
let isWorking = false;

// Update heading letters
function updateHeadingText(letters) {
    headingLetters.forEach((letter, index) => letter.textContent = letters[index] || '');
}

// Timer related functions
function startChronometer() {
    if(isWorking) return;
    isWorking = true;
    console.log(testCases['test 1'].description); // Output test case description
    timer = setInterval(() => {
        seconds++;
        chronoElement.textContent = formatTime(seconds);
    }, 1000);
}

function stopChronometer() {
    clearInterval(timer);
    isWorking = false;
}

function resetChronometer() {
    stopChronometer();
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

// Start/Stop button
actionButtonElement.addEventListener('click', () => {
    if (!isWorking) startChronometer();
    else resetChronometer();
    actionButtonElement.textContent = isWorking ? "Stop Countdown" : "Start Countdown";
});

// Subscription button
subButtonElement.addEventListener('click', handleSubscriptionClick);

// Handle network status changes
window.addEventListener('offline', () => {
    stopChronometer();
    actionButtonElement.disabled = true;
});
window.addEventListener('online', () => {
    actionButtonElement.disabled = false;
});

// Initialize the chronoElement
chronoElement.textContent = formatTime(seconds);

// Drag and drop functionality
boxElement.addEventListener('dragstart', handleDragStart);
document.body.addEventListener('dragover', handleDragOver);
document.body.addEventListener('drop', handleDrop);

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;

    if(e.target === boxElement || boxElement.contains(e.target)) {
        boxElement.style.position = 'absolute';
        boxElement.style.left = `${e.clientX - offsetX}px`;
        boxElement.style.top = `${e.clientY - offsetY}px`;
    }
}

// Email validation and subscription mechanism
function handleSubscriptionClick() {
    const enteredEmail = prompt("Enter your email to subscribe:");
    if (enteredEmail && validateEmail(enteredEmail)) {
        alert("Thank you for subscribing!");
        // Subscription logic would go here (e.g., AJAX request to server)
    } else {
        alert("Please enter a valid email.");
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}