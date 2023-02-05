import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const display = document.querySelector('.timer');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

display.insertAdjacentHTML(
  'afterbegin',
  '<span>LEFT BEFORE SELECTED TIME: </span>'
);
display.style.display = 'flex';
display.style.gap = '20px';

let selectedTime = null;
let intervalId = null;
let timer = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedTime = selectedDates[0];
    console.log('onClose --> selectedDate', selectedTime);

    clearInterval(intervalId);

    if (timer) {
      timer = false;
      Notify.failure('Timer was stopped');
    }

    if (selectedTime > Date.now()) {
      startBtn.disabled = false;
    } else {
      Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(inputTime, options);
startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  timer = true;
  if (selectedTime < Date.now()) {
    Notify.warning('Please choose a date in the future');
    return;
  }

  intervalId = setInterval(() => {
    const remainingTime = selectedTime - Date.now();
    const remainingDate = convertMs(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      timer = false;
      startBtn.disabled = false;
      
      Notify.success(
        'We have reached the destination date! Please select new date.'
      );
      return;
    } else {
      days.textContent = remainingDate.days;
      hours.textContent = remainingDate.hours;
      minutes.textContent = remainingDate.minutes;
      seconds.textContent = remainingDate.seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = twoNumbersString(Math.floor(ms / day));
  // Remaining hours
  const hours = twoNumbersString(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = twoNumbersString(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = twoNumbersString(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function twoNumbersString(value) {
  return String(value).padStart(2, '0');
}
