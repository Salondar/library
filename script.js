const modal = document.querySelector('#modal');

const title = modal.querySelector('#title');
const author  = modal.querySelector('#author');
const pageCount = modal.querySelector('#pages');
const bookStatus = modal.querySelector('select');
const addBookBtn = modal.querySelector('#addBook');
const openModal = document.querySelector('#open-modal');

const table = document.querySelector('table');


const myLibrary = [{title:"A Song of Ice and Fire", author:"G.R.R Martin", pages:578, status: "not read"},
    {title:"Ualalapi", author:"Ungulani Bha Kha Khossa", pages:378, status: "read"},
    {title:"The Lord Of The Rings", author:"J.R.R Tolkien", pages:778, status: "not read"},
    {title:"The Three Body Problem", author:"Cixin Liu", pages:302, status: "read"}
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addToLibrary(book) {
    myLibrary.push(book);
}


let row, rowData, statusBtn, removeBtn;
function displayOnPage() {
    for (let obj of myLibrary) {
        row = document.createElement('tr');
        table.appendChild(row);
        for (let key in obj) {
            rowData = document.createElement('td'); 
            if (key === 'status') {
                statusBtn = document.createElement('button');
                statusBtn.textContent = obj[key];
                rowData.appendChild(statusBtn);
                
            }
            else {
                rowData.textContent = obj[key];
            }
            row.appendChild(rowData);
        }

        removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';

        rowData = document.createElement('td');
        rowData.appendChild(removeBtn);
        
        row.appendChild(rowData);
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
    displayOnPage();
    modal.close();
});