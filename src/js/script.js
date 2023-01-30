const bookList = document.querySelector('.books-list'),
  templateBook = document.querySelector('#template-book'),
  filterList = document.querySelector('.filters');

const favoriteBooks = [];
const filters = [];

// const templates = {
//     bookProduct: Handlebars.compile(templateBook.innerHTML),
//   };
function render() {
  for (const book of dataSource.books) {
    const bookProduct = Handlebars.compile(templateBook.innerHTML);
    const generatedHTML = bookProduct(book);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    bookList.appendChild(generatedDOM);
  }
}

function initActions() {
  bookList.addEventListener('dblclick', function (event) {
    event.preventDefault();
    if (event.target.offsetParent.classList.contains('book__image')) {
      const image = event.target.offsetParent;
      const imageId = image.getAttribute('data-id');
      if (!favoriteBooks.includes(imageId) && !image.classList.contains('favorite')) {
        image.classList.add('favorite');
        favoriteBooks.push(imageId);
      } else {
        image.classList.remove('favorite');
        favoriteBooks.splice(favoriteBooks.indexOf(imageId), 1);
      }
    }
  });

  filterList.addEventListener('click', function (event) {
    if (event.target.tagName == "INPUT" && event.target.type == "checkbox" && event.target.name == "filter") {
      if (event.target.checked) {
        filters.push(event.target.value);
      } else {
        filters.splice(filters.indexOf(event.target.value), 1);
      }
    }

    filterBooks();
  });
}

function filterBooks() {
  for (const book of dataSource.books) {
    let shouldBeHidden = false;
    for (const filter in filters) {
      if (filters[filter] == 'adults' && book.details.adults == false) {
        shouldBeHidden = true;
        break;
      }
      if (filters[filter] == 'nonFiction' && book.details.nonFiction == false) {
        shouldBeHidden = true;
        break;
      }
    }
    if (shouldBeHidden == true) {
      const book__image = document.querySelector('.book__image[data-id="' + book.id + '"]');
      book__image.classList.add('hidden');
    } else {
      const book__image = document.querySelector('.book__image[data-id="' + book.id + '"]');
      book__image.classList.remove('hidden');
    }
  }
}

//alternative eventListener function
// function initActions() {
//   const imageList = bookList.querySelectorAll('.book__image');
//   console.log(imageList);
//   for (const image of imageList) {
//     image.addEventListener('dblclick', function (event) {
//       event.preventDefault();
//       const imageId = image.getAttribute('data-id');
//       console.log('image',image);
//       if(!favoriteBooks.includes(imageId) && !image.classList.contains('favorite')) {
//         image.classList.add('favorite');        
//         favoriteBooks.push(imageId);
//       } else {
//         image.classList.remove('favorite');
//         favoriteBooks.pop(imageId);        
//       }
//     });
//   }
// }


render();
initActions();

