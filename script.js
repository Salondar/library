const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const title = modal.querySelector('#title');
const author  = modal.querySelector('#author');
const pageCount = modal.querySelector('#pages');
const bookStatus = modal.querySelector('select');
const addBookBtn = modal.querySelector('#addBook');
const cancelBtn = modal.querySelector('#cancelBtn');
const openModal = document.querySelector('#open-modal');

const tableBody = document.querySelector('tbody');

let myLibrary = [];

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
                if (key === 'status') {
                    statusBtn = document.createElement('button');
                    statusBtn.setAttribute('id', 'statusBtn');
                    statusBtn.setAttribute('data-index', index);
                    statusBtn.textContent = obj[key];
                    rowData.appendChild(statusBtn);
                    
                }
                else {
                    rowData.textContent = obj[key];
                }
                row.appendChild(rowData);
            }
        }
        removeBtn = document.createElement('button');
        removeBtn.setAttribute('id', 'removeBtn');
        removeBtn.setAttribute('data-index', index);
        removeBtn.textContent = 'remove';

        rowData = document.createElement('td');
        rowData.appendChild(removeBtn);
        
        row.appendChild(rowData);
        index++;
    }   
}

displayOnPage();

openModal.addEventListener('click', ()=> {
    form.reset();
    modal.showModal();
});

addBookBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    let newTitle, newAuthor, newPageCount, newStatus;

    if (title.checkValidity() === false) {
        title.placeholder = "Enter a valid book title";
        title.style.borderColor = "red";

    }
    else if (author.checkValidity() === false) {
        author.placeholder = "Enter an author name";
    }
    else if (pageCount.checkValidity() === false) {
        pageCount.placeholder = "Enter the number of pages the book has";
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

modal.addEventListener('close', ()=> {
    tableBody.innerHTML = '';
    displayOnPage();
});

tableBody.addEventListener('click', (event)=> {
    const target = event.target;
    if (target.id === 'removeBtn' || target.id === 'statusBtn') {
        const bookIndex = Number(target.dataset.index);
        if (target.id === 'removeBtn') {      // Remove a book
            myLibrary.splice(bookIndex, 1);
        }
        else if (target.id === 'statusBtn') {  // Change the read status
            const book = myLibrary[bookIndex];
            book.changeStatus();
        }
        tableBody.innerHTML = '';
        displayOnPage();
    }
});