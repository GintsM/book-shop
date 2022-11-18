const newTag = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
}



// Book Cards

export const bookCard = (img, book_author, book_title, book_price) => {



  return card_container;
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
