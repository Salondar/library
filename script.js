const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const title = modal.querySelector('#title');
const author  = modal.querySelector('#author');
const pageCount = modal.querySelector('#pages');
const addBookBtn = modal.querySelector('#addBook');
const cancelBtn = modal.querySelector('#cancelBtn');
const openModal = document.querySelector('#open-modal');

const tableBody = document.querySelector('tbody');

const DEFAULT_BOOKS = [{title: "The Posthumous Memoirs of Brás Cubas", 
                        author: "Machado de Assis",
                        pages: 238, status: "read"},
                        {title: "The Three Body Problem", 
                        author: "Liu Cixin",
                        pages: 302, status: "read"},
                        {title: " Also sprach Zarathustra: Ein Buch für Alle und Keinen", 
                        author: " Friedrich Nietzsche", pages: 302, status: "not read"},
                        {title: "Robinsoe Crusoe", author: "Daniel Dafoe", pages: 320, status:"not read"}     
];

let myLibrary = [];

// Book constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.changeStatus = function() {
    if (this.status === 'read') {
        this.status = 'not read';
    }
    else {
        this.status = 'read';
    }
};

function addToLibrary(book) {
    myLibrary.push(book);
}

let row, rowData, statusBtn, removeBtn;
function displayOnPage() {
    let index = 0;
    for (let obj of myLibrary) {
        row = document.createElement('tr');
        tableBody.appendChild(row);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                    rowData = document.createElement('td');
                if (key === 'title') {
                    rowData.setAttribute('data-label', 'Title');
                    rowData.textContent = obj[key];
                }
                else if (key === 'author') {
                    rowData.setAttribute('data-label', 'Author');
                    rowData.textContent = obj[key];
                }
                else if (key === 'pages') {
                    rowData.setAttribute('data-label', 'Pages');
                    rowData.textContent = obj[key];
                }
                else if (key === 'status') {
                    statusBtn = document.createElement('button');
                    statusBtn.setAttribute('id', 'statusBtn');
                    statusBtn.setAttribute('data-index', index);
                    statusBtn.textContent = obj[key];
                    rowData.appendChild(statusBtn);

                    rowData.setAttribute('data-label', 'Status');
                }
                row.appendChild(rowData);
            }
        }
        removeBtn = document.createElement('button');
        removeBtn.setAttribute('id', 'removeBtn');
        removeBtn.setAttribute('data-index', index);
        removeBtn.textContent = 'remove';

        rowData = document.createElement('td');

        rowData.setAttribute('data-label','Remove');
        rowData.appendChild(removeBtn);
        
        row.appendChild(rowData);
        index++;
    }   
}

window.addEventListener("DOMContentLoaded", (event)=>{
    let defaultTitle, defaultAuthor, defaultPages, defaultStatus, defaultBook;

    for (let obj of DEFAULT_BOOKS) {
        for (let key in obj) {
            if (key === "title") {
                defaultTitle = obj[key]
            }
            else if (key === "author") {
                defaultAuthor = obj[key]
            }
            else if (key === "pages") {
                defaultPages = obj[key];
            }
            else {
                defaultStatus = obj[key];
            }
        }
        defaultBook = new Book(defaultTitle, defaultAuthor, defaultPages, defaultStatus);
        myLibrary.push(defaultBook);
    }
    displayOnPage();
});

openModal.addEventListener('click', ()=> {
    form.reset();
    modal.showModal();
});


addBookBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    title.style.borderColor = "black";
    author.style.borderColor = "black";
    pageCount.style.borderColor = "black";

    let newTitle, newAuthor, newPageCount, newStatus;
    if (form.checkValidity() === false) {
        if (title.checkValidity() === false) {
            title.placeholder = "Enter book title";
            title.style.borderColor = "red";
        }
        else if (author.checkValidity() === false) {
            author.placeholder = "Enter an author name";
            author.style.borderColor = "red";
        }
        else if (pageCount.checkValidity() === false) {
            pageCount.placeholder = "Enter the number of pages";
            pageCount.style.borderColor = "red";
        }
    }
    else {
        newTitle = title.value;
        newAuthor = author.value;
        newPageCount = pageCount.value;
        newStatus = bookStatus.value;
        const newBook = new Book(newTitle, newAuthor, newPageCount, newStatus);
        addToLibrary(newBook);
        modal.close();
    }
});

cancelBtn.addEventListener('click', (event)=> {
    // Remove the invalid border color
    title.style.borderColor = "black";
    author.style.borderColor = "black";
    pageCount.style.borderColor = "black";

    // Remove the invalid placeholder text
    title.placeholder = "";
    author.placeholder = "";
    pageCount.placeholder = "";
});

// Close modal
modal.addEventListener('close', ()=> {
    tableBody.innerHTML = '';
    displayOnPage();
});

// Change status or remove a book
tableBody.addEventListener('click', (event)=> {
    const target = event.target;
    if (target.id === 'removeBtn' || target.id === 'statusBtn') {
        const bookIndex = Number(target.dataset.index);
        if (target.id === 'removeBtn') {      // Remove book
            myLibrary.splice(bookIndex, 1);
        }
        else if (target.id === 'statusBtn') {  // Change read status
            const book = myLibrary[bookIndex];
            book.changeStatus();
        }
        tableBody.innerHTML = '';
        displayOnPage();
    }
});