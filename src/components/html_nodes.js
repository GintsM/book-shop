const uniq_id = () => Math.floor(Math.random() * 6500 + 23);

const newTag = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
}

// DRY and reduce searching
const basket = newTag('div', { className: 'basket' });

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
  basket.classList.add('darkerborder');
}

const dragend = (e) => {
  e.target.classList.remove('darkerborder');
  basket.classList.remove('darkerborder')
}

const drop = (e) => {
  const id = e.dataTransfer.getData('text');
  const nodeCopy = document.getElementById(id);
  nodeCopy.classList.remove('darkerborder');
  add_to_basket(nodeCopy.firstChild.nextSibling);
  basket.classList.remove('darkerborder');
}

//  ______________________ CLICK EVENTS ________________________________
const popUp = (e) => {
  const e_parent = e.target.closest('.main_book_cred');
  e_parent.nextSibling.classList.remove('hide')
}

const closePop = (e) => {
  const grabEverything = document.querySelectorAll('.book_info')
  grabEverything.forEach(element => {
    if (!element.classList.contains('hide')) element.classList.add('hide');
  });
}

export const add_to_basket = (e) => {
  let e_parent = {};
  e.type === 'click' ? e_parent = e.target.closest('.main_book_cred') : e_parent = e;
  // if book already is in basket
  const basket_contains = basket.querySelectorAll('.main_book_card');
  let el_is_added = Boolean(basket_contains.item(0));
  if (el_is_added) {
    for (let el of basket_contains) {
      if (el.querySelector('h3').innerText === e_parent.querySelector('h3').innerText) {
        increment(el.querySelector('.showMore'))
        el_is_added = true;
        break;
      } else {
        el_is_added = false;
      }
    }
  }
  if (!el_is_added) {
    const e_image = e_parent.previousSibling.cloneNode(true);
    const p_prime = e_parent.cloneNode(true);

    // change button content/ to plus and minus.
    const price = p_prime.querySelector('.price').dataset.price;// get units elements price
    const decrement = p_prime.querySelector('.addToBag');
    p_prime.querySelector('.showMore').innerText = '+';
    decrement.innerText = '-';
    const p_counter = newTag('p', { className: 'b_count', innerText: '1' });
    p_prime.lastChild.lastChild.insertBefore(p_counter, decrement);

    //update total sum
    update_total(price);
    const main_book = newTag('div', { className: 'main_book_card' });
    const span = newTag('span', { className: 'close_x for_basket', innerText: 'x' });
    main_book.append(e_image, p_prime, span)
    const firstChild = basket.firstChild;       // add new book to basket always as first 
    basket.insertBefore(main_book, firstChild);
  }
}

const basket_actions = (e) => {
  switch (e.target.className) {
    case 'showMore':
      increment(e.target);
      break;
    case 'addToBag':
      decrement(e.target);
      break;
    case 'close_x for_basket':
      removeNode(e);
      break;
    case 'delivery':
      delivery();
      break;
    default:
      return '';
  }
}

const shelves_actions = (e) => {
  switch (e.target.className) {
    case 'showMore':
      popUp(e);
      break;
    case 'addToBag':
      add_to_basket(e);
      break;
    case 'close_x':
      closePop(e);
      break;
    default:
      return '';
  }
}

const removeNode = (e) => {
  const book_details = e.target.parentNode
  const b_price = book_details.querySelector('.price');
  const b_amount = book_details.querySelector('.b_count').innerText;
  const remove_sum = -Number(b_price.dataset.price) * Number(b_amount);
  update_total(remove_sum);
  book_details.remove();
}

const increment = (node) => {
  const b_price = node.parentNode.previousSibling.dataset.price; // all data reading from card
  let p_counter = node.nextSibling;
  p_counter.innerText = Number(p_counter.innerText) + 1;
  update_total(b_price);
}

const decrement = (node) => { // pass to update negative value
  const b_price = node.parentNode.previousSibling.dataset.price;
  let p_counter = node.previousSibling;
  if (Number(p_counter.innerText) > 1) {
    p_counter.innerText = Number(p_counter.innerText) - 1;
    update_total('-' + b_price);
  }
}

const update_total = (price) => {
  let total_display = basket.lastChild.firstChild.firstChild.lastChild // get total amount
  const total = Number(total_display.dataset.price) + Number(price);
  total_display.dataset.price = total;
  total_display.innerText = '$ ' + total + ',00';
}

const delivery = () => {
  const main = document.querySelector('main');
  main.setAttribute("class", "hide");
  const section_form = document.querySelector('section');
  section_form.classList.remove('hide');
}

//  ______________________ CREAT NODES ________________________________
const pop_Up_node = (book_title, book_description) => {
  const book_info = newTag('div', { className: 'book_info hide' });
  const b_descritpion = newTag('div', { className: 'b_description' });
  const h4 = newTag('h4', { className: 'pop_title', innerText: book_title });
  const p = newTag('p', { className: 'pop_description', innerText: book_description });
  const span = newTag('span', { className: 'close_x', innerText: 'x' });
  b_descritpion.append(h4);
  b_descritpion.append(p);
  b_descritpion.append(span);
  book_info.append(b_descritpion);
  return book_info;
}

// Book Cards
export const bookCard = (img, book_author, book_title, book_price, book_description) => {
  const main_book = newTag('div', { className: 'main_book_card', id: uniq_id(), draggable: true });
  const img_cont = newTag('div', { className: 'main_img_cont', draggable: false });
  const image = newTag('img', { src: img, alt: book_title });
  img_cont.append(image);
  main_book.append(img_cont);
  const book_cred = newTag('div', { className: 'main_book_cred' });
  const h3 = newTag('h3', { innerText: book_author });
  const title = newTag('p', { className: 'title', innerText: book_title });
  const b_data = newTag('div', { className: 'b_data' });
  const price = newTag('p', { innerText: '$ ' + book_price + ',00', className: 'price' });        // since we dont have pennies 
  price.setAttribute('data-price', book_price);
  const button_block = newTag('div', { className: 'b_block' });
  const show_more = newTag('button', { type: 'button', className: 'showMore', innerText: 'Show more' });
  const add_to_bag = newTag('button', { type: 'button', className: 'addToBag', innerText: 'Add to bag' });
  button_block.append(show_more);
  button_block.append(add_to_bag);
  b_data.append(price);
  b_data.append(button_block);
  book_cred.append(h3);
  book_cred.append(title);
  book_cred.append(b_data);
  main_book.append(book_cred);
  main_book.append(pop_Up_node(book_title, book_description));
  return main_book;
}

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

const summary = () => { // in basket total amount
  const div_sum = newTag('div', { className: 'summary' });
  const div_total = newTag('div', { id: 'total' });
  const p_total = newTag('p', { innerText: 'Sum total: ' });
  const bold_txt = newTag('b', { innerText: '$ 0,00' });
  bold_txt.setAttribute('data-price', '0');
  p_total.append(bold_txt);
  div_total.append(p_total);
  const make_order = newTag('button', { className: 'delivery', type: 'button', innerText: 'Make Order' });
  div_sum.append(div_total);
  div_sum.append(make_order)
  return div_sum;
}

export const mainTag = () => {
  const main = newTag('main', {});
  const main_1_Div = newTag('div', { className: 'oval_top' });
  const choice = newTag('div', { className: 'choice' });
  choice.addEventListener('click', shelves_actions);
  choice.addEventListener('dragstart', dragstart);
  choice.addEventListener('dragend', dragend);

  // main Title
  const ch_title_div = newTag('div', { className: 'shelves_title' });
  const ch_h2 = newTag('h2', { innerText: 'Books available today' });
  ch_title_div.append(ch_h2);
  choice.append(ch_title_div);
  basket.addEventListener('dragenter', dragEnter)
  basket.addEventListener('dragover', dragOver);
  basket.addEventListener('drop', drop);
  basket.addEventListener('click', basket_actions);
  const hr = newTag('hr', {});
  basket.append(hr);
  basket.append(summary());
  main_1_Div.append(choice);
  main_1_Div.append(basket);
  main.append(main_1_Div);

  // Torches on main page
  const left_torch = newTag('div', { className: 'torch t_left' });
  const left_t_img = newTag('img', { src: './assets/images/torch_left.png', alt: 'old torch' });
  left_torch.append(left_t_img);
  const right_torch = newTag('div', { className: 'torch t_right' });
  const right_t_img = newTag('img', { src: './assets/images/torch_left.png', alt: 'old torch' });
  right_torch.append(right_t_img);
  main.append(left_torch, right_torch);
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

export const confirmOrder = (arr = []) => {
  const order = newTag('div', {})
  const ord_title = newTag('h3', { innerText: 'Your order is ready' })
  order.append(ord_title);
  for (let data of arr) {
    const p_name = newTag('p', { innerText: data[0] + ' ' });
    p_name.append(newTag('b', { innerText: data[1] }));
    order.append(p_name);
  }
  const compl_button = newTag('button', { type: 'button', innerText: 'Back to begining' });
  compl_button.addEventListener('click', () => window.location.reload())
  order.append(compl_button)
  return order;
}