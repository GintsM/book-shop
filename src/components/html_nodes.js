const newTag = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
}

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

// Book Cards
export const bookCard = (img, book_author, book_title, book_price, book_description) => {
  // <div class="main_book_card">
  const main_book = newTag('div', { className: 'main_book_card' });

  const img_cont = newTag('div', { className: 'main_img_cont' })
  const image = newTag('img', { src: img, alt: book_title })
  img_cont.append(image);
  main_book.append(img_cont);

  // class="main_book_cred
  const book_cred = newTag('div', { className: 'main_book_cred' });
  const h3 = newTag('h3', { innerText: book_author });
  const title = newTag('p', { className: 'title', innerText: book_title });
  const b_data = newTag('div', { className: 'b_data' });
  const price = newTag('p', { innerText: '$ ' + book_price + ',00' });        // since we dont have pennies 
  const button_block = newTag('div', { className: 'b_block' });
  const show_more = newTag('button', { type: 'button', innerText: 'Show more' });
  show_more.addEventListener('click', popUp);
  const add_to_bag = newTag('button', { type: 'button', innerText: 'Add to bag' });
  button_block.append(show_more);
  button_block.append(add_to_bag);
  b_data.append(price);
  b_data.append(button_block);
  book_cred.append(h3);
  book_cred.append(title);
  book_cred.append(b_data);

  // <!-- Popup -->
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

  main_book.append(book_cred);
  main_book.append(book_info);

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

export const mainTag = () => {
  const main = newTag('main', {});
  const main_1_Div = newTag('div', { className: 'oval_top' });
  const choice = newTag('div', { className: 'choice' });
  const basket = newTag('div', { className: 'basket' });
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
