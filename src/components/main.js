// import { bookCard } from "./bookCard_main.js"

// const root = document.getElementById('root')

// const newEl = document.createElement('div')

// newEl.appendChild(bookCard("./books/images/appJs.jpg", "Addy Osmani", "Learning JavaScript Design Patterns", 32))

// root.appendChild(newEl)

// let ptag = document.createElement('p')

// root.appendChild(ptag)

// let name = "John";
// // // assuming 'el' is an HTML DOM element
// // el.innerHTML = name; // harmless in this case

// // …

// let name1 = "<script>alert('I am John in an annoying alert!')</script>";
// ptag.innerHTML = name; // harmless in this case
// alert('I am John in an annoying alert!')

const url = './assets/books/books.json'
const res = fetch(url) //path to the file with json data
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });