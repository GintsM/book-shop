import { header, mainTag, footer, bookCard, confirmOrder } from "./html_nodes.js";

const body = document.querySelector('body');
const section = document.querySelector('section');
const form = body.querySelector('form');

const fragment = new DocumentFragment();
fragment.append(header());
fragment.append(mainTag());

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
  let collect_data = []
  const formData = new FormData(e.target);
  for (let pair of formData.entries()) {
    collect_data.push([pair[0], pair[1]]);
  }
  section.classList.add('hide');
  const footer = body.querySelector('footer');
  body.insertBefore(confirmOrder(collect_data), footer);
}

const date = document.getElementById('date');
const date_now = new Date();
date.value = date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + (date_now.getDate() + 1)
date.setAttribute('min', date_now.getFullYear() + '-' + (date_now.getMonth() + 1) + '-' + (date_now.getDate() + 1));
const allInput = form.querySelectorAll('input');

// const checkboxCheck = (e) => {
//   console.log(e);
// }

const changeChecked = (el) => {
  const check_box = form.querySelectorAll('.check_b');
  check_box.forEach(ch_b => {
    if (ch_b.classList.contains('last')) {
      ch_b.classList.remove('last');
      ch_b.checked = false;
    }
    el.classList.add('last');
    el.checked = true;
  })

}

const submitCheck = (e) => {
  let counter = 0, ch_counter = 0;
  allInput.forEach((el) => {
    if (el.checkValidity()) {
      counter += 1;
      allInput[allInput.length - 1].disabled = true;
    }
    if (el.type === 'checkbox') {
      el.checked ? ch_counter += 1 : '';
      if (ch_counter > 1) e.target.classList.add('last');
      if (ch_counter > 2) {
        changeChecked(e.target);
      }
    }
  })
  if (counter >= 13) {
    allInput[allInput.length - 1].disabled = false;
  }
}

const validityCheck = (e) => {
  if (!e.target.checkValidity()) {
    e.target.classList.add('invalid')
  } else {
    if (e.target.classList.contains('invalid')) {
      e.target.classList.remove('invalid')
    }
    if (!(e.target.parentNode.tagName === 'FIELDSET')) {
      e.target.nextElementSibling.classList.add('hide'); // remove tips for inputfield
    }
  }
}

const show_input_rulles = (e) => {
  e.target.nextElementSibling.classList.remove('hide');
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