const modal = document.querySelector('#modal');

const title = modal.querySelector('#title');
const author  = modal.querySelector('#author');
const pageCount = modal.querySelector('#pages');
const bookStatus = modal.querySelector('select');
const addBookBtn = modal.querySelector('#addBook');
const openModal = document.querySelector('#open-modal');

const tableBody = document.querySelector('tbody');

const myLibrary = [];

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

openModal.addEventListener('click', ()=> {
    modal.showModal();
});

addBookBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    let newTitle = title.value;
    let newAuthor = author.value;
    let newPageCount = pageCount.value;
    let newStatus = bookStatus.value;
    const newBook = new Book(newTitle, newAuthor, newPageCount, newStatus);
    addToLibrary(newBook)
    modal.close();
});

modal.addEventListener('close', ()=> {
    tableBody.innerHTML = '';
    displayOnPage();
});

tableBody.addEventListener('click', (event)=> {
    if (event.target.id === 'removeBtn') {
        const index  = Number(event.target.dataset.index);
        myLibrary.splice(index, 1);
        tableBody.innerHTML = '';
        displayOnPage();
    }
    else if (event.target.id === 'statusBtn') {
        const index =  Number(event.target.dataset.index);
        const book = myLibrary[index];
        book.changeStatus();
        tableBody.innerHTML = '';
        displayOnPage();
    }
});