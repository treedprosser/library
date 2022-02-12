const form = document.querySelector("form");
const submit = document.getElementById("submit");
submit.addEventListener("click", addBookToLibrary);

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

let myLibrary = [];
let newBook;

class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value;
        this.author = form.author.value;
        this.pages = form.pages.value + 'pages';
        this.read = form.read.checked;
    }
}

function addBookToLibrary() {
    event.preventDefault();
    form.style.display = "none";
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
    form.reset();
}

function displayBooks() {
    const bookshelf = document.getElementById("bookshelf");
    const books = document.querySelectorAll(".book");
    books.forEach(book => bookshelf.removeChild(book));

    for(let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(item) {
    const library = document.querySelector("#bookshelf");
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book-card');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read === false) {
        readBtn.textContent = "Not read";
        readBtn.style.backgroundColor = "#e04f63";
    } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "#63da63";
    }

    removeBtn.textContent = "Remove";
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        displayBooks();
    });

    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        displayBooks();
    });
}