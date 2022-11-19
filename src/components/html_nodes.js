const uniq_id = () => Date.now().toString();

const newTag = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
}

//  ______________________ DRAG AND DROP ________________________________
const dragstart = (e) => {
  e.dataTransfer.setData('text', e.target.id);
  e.target.classList.add('darkerborder');
}

const dragEnter = (e) => {
  e.preventDefault();
}

const dragOver = (e) => {
  e.preventDefault();
  const basket = document.querySelector('.basket');
  basket.classList.add('darkerborder');
}

const dragend = (e) => {
  e.target.classList.remove('darkerborder');
  const basket = document.querySelector('.basket');
  basket.classList.remove('darkerborder')
}

const drop = (e) => {
  const id = e.dataTransfer.getData('text');
  const nodeCopy = document.getElementById(id);
  nodeCopy.classList.remove('darkerborder');
  add_to_basket(nodeCopy.firstChild.nextSibling);
  const basket = document.querySelector('.basket');
  basket.classList.remove('darkerborder');
}

//  ______________________ CLICK EVENTS ________________________________
const popUp = (e) => {
  const e_parent = e.target.parentNode.parentNode.parentNode
  if (e_parent.classList.contains('main_book_cred')) {
    e_parent.nextSibling.classList.remove('hide')
  }
}

const closePop = (e) => {
  const grabEverything = document.querySelectorAll('.book_info')
  grabEverything.forEach(element => {
    if (!element.classList.contains('hide')) element.classList.add('hide');
  });
}

export const add_to_basket = (e) => {
  const basket = document.querySelector('.basket');
  let e_parent = {};
  e.type === 'click' ? e_parent = e.target.parentNode.parentNode.parentNode : e_parent = e;
  const e_image = e_parent.previousSibling.cloneNode(true);
  const p_prime = e_parent.cloneNode(true);

  // change button content/ to make a counter
  const price = p_prime.lastChild.firstChild.dataset.price;// get units elements price                      
  p_prime.lastChild.lastChild.firstChild.innerText = '+';  // 'show more' to increment button
  p_prime.lastChild.lastChild.firstChild.addEventListener('click', increment);
  p_prime.lastChild.lastChild.lastChild.innerText = '-';   // 'add to bag' to decrement button
  p_prime.lastChild.lastChild.lastChild.addEventListener('click', decrement);
  const p_counter = newTag('p', { className: 'b_count', innerText: '1' });
  p_prime.lastChild.lastChild.insertBefore(p_counter, p_prime.lastChild.lastChild.lastChild);

  //update total sum
  update_total(price);
  const main_book = newTag('div', { className: 'main_book_card' }); // can change this name
  const span = newTag('span', { className: 'close_x for_basket', innerText: 'x' });
  span.addEventListener('click', removeNode);
  main_book.append(e_image, p_prime, span)
  const firstChild = basket.firstChild;       // add new book to basket always as first 
  basket.insertBefore(main_book, firstChild);
}

const removeNode = (e) => {
  const b_price = e.target.previousSibling.lastChild.firstChild;
  const b_amount = b_price.nextSibling.firstChild.nextSibling.innerText;
  const remove_sum = -Number(b_price.dataset.price) * Number(b_amount);
  update_total(remove_sum);

  // remove a node
  const container_head = e.target.parentNode
  container_head.remove();
}

const increment = (e) => {
  const b_price = e.target.parentNode.previousSibling.dataset.price;
  let p_counter = e.target.nextSibling;
  p_counter.innerText = Number(p_counter.innerText) + 1;
  update_total(b_price);
}

const decrement = (e) => { // pass to update negative value
  const b_price = e.target.parentNode.previousSibling.dataset.price;
  let p_counter = e.target.previousSibling;
  if (Number(p_counter.innerText) > 1) {
    p_counter.innerText = Number(p_counter.innerText) - 1;
    update_total('-' + b_price);
  }
}

const update_total = (price) => {
  const basket = document.querySelector('.basket');
  let total_display = basket.lastChild.firstChild.firstChild.lastChild // get total amount
  const total = Number(total_display.dataset.price) + Number(price);
  total_display.dataset.price = total;
  total_display.innerText = '$ ' + total + ',00';
}

//  ______________________ CREAT NODES ________________________________
const pop_Up_node = (book_title, book_description) => {
  const book_info = newTag('div', { className: 'book_info hide' });
  const b_descritpion = newTag('div', { className: 'b_description' });
  const h4 = newTag('h4', { className: 'pop_title', innerText: book_title });
  const p = newTag('p', { className: 'pop_description', innerText: book_description });
  const span = newTag('span', { className: 'close_x', innerText: 'x' });
  span.addEventListener('click', closePop);

  b_descritpion.append(h4);
  b_descritpion.append(p);
  b_descritpion.append(span);
  book_info.append(b_descritpion);
  return book_info;

}

// Book Cards
export const bookCard = (img, book_author, book_title, book_price, book_description, mainShelfs = false) => {
  // mainShelfs is to determine were call is coming    
  // <div class="main_book_card">
  const main_book = newTag('div', { className: 'main_book_card', id: uniq_id(), draggable: true });

  const img_cont = newTag('div', { className: 'main_img_cont', draggable: false });
  const image = newTag('img', { src: img, alt: book_title });
  img_cont.append(image);
  main_book.append(img_cont);

  // class="main_book_cred
  const book_cred = newTag('div', { className: 'main_book_cred' });
  const h3 = newTag('h3', { innerText: book_author });
  const title = newTag('p', { className: 'title', innerText: book_title });
  const b_data = newTag('div', { className: 'b_data' });
  const price = newTag('p', { innerText: '$ ' + book_price + ',00' });        // since we dont have pennies 
  price.setAttribute('data-price', book_price);
  const button_block = newTag('div', { className: 'b_block' });
  const show_more = newTag('button', { type: 'button', innerText: 'Show more' });
  show_more.addEventListener('click', popUp);
  const add_to_bag = newTag('button', { type: 'button', innerText: 'Add to bag' });
  add_to_bag.addEventListener('click', add_to_basket);
  button_block.append(show_more);
  button_block.append(add_to_bag);
  b_data.append(price);
  b_data.append(button_block);
  book_cred.append(h3);
  book_cred.append(title);
  book_cred.append(b_data);
  main_book.append(book_cred);

  if (mainShelfs) main_book.append(pop_Up_node(book_title, book_description));
  main_book.addEventListener('dragstart', dragstart);
  main_book.addEventListener('dragend', dragend);

  return main_book;
}

// Header and Main will be called before any data
export const header = () => {
  const header = newTag('header', { className: "flex_row" })
  const h1 = newTag('h1', { id: 'primary-navigation', className: 'logo' });
  const img = newTag('img', { src: './assets/images/ibooks_icon.png', alt: "" });
  const aTag = newTag('a', { href: '#', innerText: 'Bookshop' });
  aTag.appendChild(img);
  const text = document.createTextNode('online')
  aTag.appendChild(text);
  h1.append(aTag);
  const p = newTag('p', { innerText: 'Sign in/ Register' });
  header.append(h1);
  header.append(p);
  return header;
}

const summary = () => {
  const div_sum = newTag('div', { className: 'summary' });
  const div_total = newTag('div', { id: 'total' });
  const p_total = newTag('p', { innerText: 'Sum total: ' });
  const bold_txt = newTag('b', { innerText: '$ 0,00' });
  bold_txt.setAttribute('data-price', '0');
  p_total.append(bold_txt);
  div_total.append(p_total);
  const make_order = newTag('a', { href: '#', innerText: 'Make Order' });
  div_sum.append(div_total);
  div_sum.append(make_order)
  return div_sum;
}

export const mainTag = () => {
  const main = newTag('main', {});
  const main_1_Div = newTag('div', { className: 'oval_top' });
  const choice = newTag('div', { className: 'choice' });
  const basket = newTag('div', { className: 'basket' });
  basket.addEventListener('dragenter', dragEnter)
  basket.addEventListener('dragover', dragOver);
  // basket.addEventListener('dragleave', dragLeave);
  basket.addEventListener('drop', drop);
  const hr = newTag('hr', {});
  basket.append(hr);
  basket.append(summary());
  main_1_Div.append(choice);
  main_1_Div.append(basket);
  main.append(main_1_Div);
  return main;
}

export const footer = () => {
  const footer = newTag('footer', { className: 'flex_row' });
  const pLeft = newTag('p', { innerText: 'design GintsM' });
  const pLink = newTag('p', {});
  const aTag = newTag('a', { href: 'https://github.com/GintsM', innerText: 'Github' });
  pLink.append(aTag);
  const date = newTag('p', { innerText: '11/2022' });
  footer.append(pLeft);
  footer.append(pLink);
  footer.append(date);
  return footer;
}

