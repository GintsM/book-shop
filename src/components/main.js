import { header, mainTag, footer, bookCard, confirmOrder } from "./html_nodes.js";

const body = document.querySelector('body');
const section = document.querySelector('section');
const form = body.querySelector('form');

const fragment = new DocumentFragment();
fragment.append(header());
fragment.append(mainTag());
// fragment.append(footer());  // probably should add later as a lastchild to body (place for form)

body.insertBefore(fragment, section); // to have something on screen while loading books
body.append(footer());

const mainFunc = (data) => {
  const choice = document.querySelector('.choice');
  const basket = document.querySelector('.basket');
  for (let i in data) {
    // shorten name 'alias'
    const sh = data[i];
    const card = bookCard(sh.imageLink, sh.author, sh.title, sh.price, sh.description);
    fragment.append(card);
  }
  choice.append(fragment);
}


// Sarting the engine !
const url = './assets/books/books.json'
const res = fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    mainFunc(data);
  });

//  ______________________ VALIDATION ________________________________
const collect_data = (e) => {
  e.preventDefault();
  section.classList.add('hide');
  const footer = body.querySelector('footer');
  const allInput = body.querySelectorAll('input');
  let collect_data = []
  allInput.forEach((el) => {
    if (el.name) {
      if (!(el.type === 'radio' && !el.checked)) {
        collect_data.push([el.name, el.value])
      }
    }
  })
  body.insertBefore(confirmOrder(collect_data), footer); // this should appear as last
}

const date = document.getElementById('date');
const date_now = new Date();
// date.value = date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + (date_now.getDate() + 1)
date.setAttribute('min', date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + (date_now.getDate() + 1));
const allInput = form.querySelectorAll('input');

const submitCheck = () => {
  let counter = 0;
  allInput.forEach((el) => {
    if (!el.validity.valueMissing && !el.validity.patternMismatch) {
      counter += 1;
      allInput[allInput.length - 1].disabled = true;
    }
  })
  if (counter >= 9) {
    allInput[allInput.length - 1].disabled = false;
  }
}

const validityCheck = (e) => {
  console.log(e.target.validity)
  if (e.target.validity.valueMissing || e.target.validity.patternMismatch || e.target.validity.rangeUnderflow) {
    e.target.classList.add('invalid')
  } else {
    if (e.target.classList.contains('invalid')) {
      e.target.classList.remove('invalid')
    }
    if (!(e.target.parentNode.tagName === 'FIELDSET')) {
      e.target.nextSibling.nextSibling.classList.add('hide'); // remove tips for inputfield
    }
  }
}

const show_input_rulles = (e) => {
  e.target.nextSibling.nextSibling.classList.remove('hide');
  if (e.target.classList.contains('invalid')) {
    e.target.classList.remove('invalid')
  }
}

form.addEventListener('submit', collect_data);
form.addEventListener('change', submitCheck);
allInput.forEach(el => {
  if (el.type === 'text' || el.type === 'date') {
    el.addEventListener('focus', show_input_rulles);
    el.addEventListener('blur', validityCheck);
  }
})