import { header, mainTag, footer, bookCard } from "./html_nodes.js";

const body = document.querySelector('body');

const fragment = new DocumentFragment();
fragment.append(header());
fragment.append(mainTag());
fragment.append(footer());  // probably should add later as a lastchild to body (place for form)

body.append(fragment); // to have something on screen while loading books

const mainFunc = (data) => {
  const choice = document.querySelector('.choice');
  const basket = document.querySelector('.basket');
  for (let i in data) {
    // shorten name 'alias'
    const sh = data[i];
    const card = bookCard(sh.imageLink, sh.author, sh.title, sh.price, sh.description, true);
    // console.log(sh.author,sh.imageLink, sh.title, sh.price)
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
