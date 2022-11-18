import { header, mainTag, footer, bookCard } from "./html_nodes.js";

const body = document.querySelector('body');

const fragment = new DocumentFragment();
fragment.append(header());
fragment.append(mainTag());
fragment.append(footer());

body.append(fragment); // to have something on screen while loading

const mainFunc = (data) => {
  //  ... add new elements

  // for (let i in data) {
  //   // shorten name 'alias'
  //   const sh = data[i];
  //   const card = bookCard(sh.author, sh.imageLink, sh.title, sh.price);
  //   // console.log(sh.author,sh.imageLink, sh.title, sh.price)
  //   fragment.append(card);
  // }

  // const card = bookCard()
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
