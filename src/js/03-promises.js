import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', runPromises);

function runPromises(evt) {
  evt.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  refs.form.reset();
  
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay}) => {
      setTimeout(() => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      }, delay);
    })
    .catch(({ position, delay}) => {
      setTimeout(() => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      }, delay);
    });
    delay += step;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay});
    } else {
      reject({ position, delay});
    }
  });
}
