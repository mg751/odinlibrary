const collection = document.querySelector(".container");
const newBookBtn = document.querySelector(".newbookbtn");
const ui = document.querySelector(".ui");
const form = document.querySelector("form");
const submitBookBtn = document.querySelector(".submitbtn");

newBookBtn.addEventListener("click", () => {
  ui.classList.remove("hidden");
});

submitBookBtn.addEventListener("click", () => {
  addBook();
  ui.classList.add("hidden");
  form.reset();
});

function updateStatus() {}

function updateCollection() {
  if (collection.hasChildNodes) {
    collection.textContent = "";
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement("div");
    let bookTitle = document.createElement("h4");
    let bookDescription = document.createElement("p");
    let bookStatus = document.createElement("p");
    let changeStatusBtn = document.createElement("button");
    changeStatusBtn.innerText = "Change Status";
    let resetBtn = document.createElement("button");
    resetBtn.innerText = "Remove";

    collection.appendChild(card);
    bookTitle.innerText = myLibrary[i].title;
    bookDescription.innerText =
      "Author: " + myLibrary[i].author + ", " + myLibrary[i].pages + " pages";
    bookStatus.innerText = myLibrary[i].readstatus;
    card.appendChild(bookTitle);
    card.appendChild(bookDescription);
    card.appendChild(bookStatus);
    card.appendChild(changeStatusBtn);

    card.classList.add("book" + [i]);
    resetBtn.classList.add("book" + [i]);
    bookStatus.classList.add("book" + [i]);

    card.classList.add("card");

    resetBtn.id = "book" + [i];
    resetBtn.addEventListener("click", () => {
      if (card.classList.contains(resetBtn.id)) {
        card.remove();
        let removedBook = myLibrary.splice(i, 1);
      }
    });

    changeStatusBtn.addEventListener("click", () => {
      myLibrary[i].switchstatus();
      if (bookStatus.classList.contains("book" + [i])) {
        bookStatus.innerText = myLibrary[i].readstatus;
      }
    });

    card.appendChild(resetBtn);
  }
}

function Book(title, author, pages, id, readstatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.readstatus = readstatus;
  this.test = function () {
    alert("Test");
  };
}

let myLibrary = [];

function addBook() {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let readstatus;

  if (document.getElementById("read").checked) {
    readstatus = "Read";
  } else {
    readstatus = "Not read";
  }

  const book = new Book(
    title.value,
    author.value,
    pages.value,
    myLibrary.length + 1,
    readstatus
  );

  book.switchstatus = function () {
    if (this.readstatus === "Read") {
      return (this.readstatus = "Not read");
    } else {
      return (this.readstatus = "Read");
    }
  };

  myLibrary.push(book);
  updateCollection();
}
