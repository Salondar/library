const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const title = modal.querySelector('#title');
const author  = modal.querySelector('#author');
const pageCount = modal.querySelector('#pages');
const bookStatus = modal.querySelector('select');
const addBookBtn = modal.querySelector('#addBook');
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
    form.reset(); /* Clear form */
    modal.showModal();
});

const titleMsg = document.querySelector("#title-warning-msg")
const  authorMsg = document.querySelector("#author-warning-msg")
const pagesMsg = document.querySelector("#pages-warning-msg")
addBookBtn.addEventListener('click', (event)=> {
    titleMsg.textContent = "";
    authorMsg.textContent = "";
    pagesMsg.textContent = "";

    let newTitle, newAuthor, newPageCount, newStatus;
    if (title.checkValidity()) {
        newTitle = title.value;

    }
    else {
        titleMsg.textContent =  "Please enter a book title";
    }

    if (author.checkValidity()) {
        newAuthor = author.value;
    }
    else {
        authorMsg.textContent = "Please enter an author name";
    }

    if (pageCount.checkValidity()) {
        newPageCount = pageCount.value;
    }
    else {
        pagesMsg.textContent = "Please enter the number of pages"
    }

    newStatus = bookStatus.value;
    
    if (form.checkValidity()) {
        const newBook = new Book(newTitle, newAuthor, newPageCount, newStatus);
        addToLibrary(newBook);
        modal.close();
    }
});

modal.addEventListener('close', ()=> {
    tableBody.innerHTML = '';
    displayOnPage();
});

tableBody.addEventListener('click', (event)=> {
    const target = event.target;
    if (target.id === 'removeBtn' || target.id === 'statusBtn') {
        const bookIndex = Number(target.dataset.index);
        if (target.id === 'removeBtn') {
            myLibrary.splice(bookIndex, 1);
        }
        else if (target.id === 'statusBtn') {
            const book = myLibrary[bookIndex];
            book.changeStatus();
        }
        tableBody.innerHTML = '';
        displayOnPage();
    }
});