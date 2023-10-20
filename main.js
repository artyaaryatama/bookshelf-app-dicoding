let booksData = [];

document.addEventListener("DOMContentLoaded", function() {

  const btnAddBooks = document.getElementById('addBook');
  const btnDeleteAllBooks = document.getElementById('deleteAllBooks')
  let booksLS = JSON.parse(localStorage.getItem('BOOKS'))
  
  if (booksLS) {
    showsBookshelf()
  }

  btnAddBooks.addEventListener('click', function(){

    addBook()
    localStorage.setItem('BOOKS', JSON.stringify(booksData))
    showsBookshelf()
  })

  btnDeleteAllBooks.addEventListener('click', function() {

    if(confirm(`Do you want to Clear All book? \nThis will include the Local Storage Book!`)){
      localStorage.clear()
      booksData = []
      clearBookshelf()
      alert('Successfully Deleted')
      
    }
  })

});

function addBook(){
  const bookTitle = document.getElementById('bTitle').value;
  const bookAuthor = document.getElementById('bAuthor').value;
  const bookYear = document.getElementById('bYear').value;
  const bookIsComplete = isCheckedRead();

  if(!bookTitle || !bookAuthor || !bookYear){
    return alert('Make sure you fill Book title, author and year!')
  }

  const bookId = generateId();
  
  const booksObject = generateBookObject(bookId, bookTitle, bookAuthor, parseInt(bookYear), bookIsComplete)

  booksData.push(booksObject)

  localStorage.setItem('BOOKS', JSON.stringify(booksData))
  showsBookshelf()
}

function showsBookshelf(){
  let booksLS = JSON.parse(localStorage.getItem('BOOKS'))
  let cardUncompleteBooks =  "";
  let cardCompleteBooks =  "";

  booksLS.map(item =>{
    if(item.isComplete == false){
      cardUncompleteBooks += `
      <li class="card row uncomplete">
        <div class="book-logo uncomplete">
          <i class="fa-solid fa-cookie-bite"></i>
        </div>
        <div class="book-desc uncomplete">
          <h4>${item.title}</h4>
          <h5>By : <span>${item.author}</span></h5>
          <h5>Published : <span>${item.year}</span></h5>
          <div class="menu-btn">
            <button type="button" onClick="moveCompleted('${item.id}')">Move to Completed Read</button>
            <button type="button" class="deleteBooks" onClick="deleteBook('${item.id}')">Delete</button>
          </div>
        </div>
      </li>
      `
    }
    else {
      cardCompleteBooks += `
      <li class="card row">
        <div class="book-logo">
          <i class="fa-solid fa-cookie"></i>
        </div>
        <div class="book-desc">
          <h4>${item.title}</h4>
          <h5>By : <span>${item.author}</span></h5>
          <h5>Published : <span>${item.year}</span></h5>
          <div class="menu-btn">
            <button type="button" onClick="moveUncompleted('${item.id}')">Move to Uncompleted Read</button>
            <button type="button" class="deleteBooks" onClick="deleteBook('${item.id}')">Delete</button>
          </div>
        </div>
      </li>
      `
    }
  })
  
  document.getElementById('uncompletedBookShelf').innerHTML = cardUncompleteBooks
  document.getElementById('CompletedBookShelf').innerHTML = cardCompleteBooks

}

function moveCompleted(bookId){
  let booksLS = JSON.parse(localStorage.getItem('BOOKS'))

  booksLS.map(item => {
    if(item.id == bookId){
      item.isComplete = true

      localStorage.setItem('BOOKS', JSON.stringify(booksLS))
      showsBookshelf()
    }
  })
}

function moveUncompleted(bookId){
  let booksLS = JSON.parse(localStorage.getItem('BOOKS'))

  booksLS.map(item => {
    if(item.id == bookId){
      item.isComplete = false

      localStorage.setItem('BOOKS', JSON.stringify(booksLS))
      showsBookshelf()
    }
  })
}

function deleteBook(bookId){
  let booksLS = JSON.parse(localStorage.getItem('BOOKS'))

  booksLS.map((item, index) => {
    if(item.id == bookId){
      if(confirm(`Do you want to delete book: ${item.title} \nYou won't be able to revert this!`)){
        booksLS.splice(index, 1)

        alert('Successfully Deleted')

        localStorage.setItem('BOOKS', JSON.stringify(booksLS))
        booksData.splice(index, 1)
        console.log(booksData)
        showsBookshelf()
      }
    }
  })
}

function clearBookshelf(){
  document.getElementById('uncompletedBookShelf').innerHTML = ''
  document.getElementById('CompletedBookShelf').innerHTML = ''
}

function isCheckedRead(){
  if (document.getElementById('bCompleted').checked){
    return true;
  } else {
    return false;
  }
}

function generateId(){
  return 'book' + Date.now().toString(36);
}

function generateBookObject(id, title, author, year, isComplete){
  return {
    id, 
    title,
    author, 
    year,
    isComplete
  }
}
