const searchYearInput = document.querySelector("#book-year");
const searchMonthInput = document.querySelector("#book-month");
const searchCategoryInput = document.querySelector("#book-category");
const searchBtn = document.querySelector("#search-btn");
const searchByNameBtn = document.querySelector("#search-by-name-btn");
const searchBookTitleInput = document.querySelector("#search-book-title-input");
const searchBookAuthorInput = document.querySelector(
  "#search-book-author-input"
);
const booksContainer = document.querySelector(".container");

//SEARCHING BOOKS BY DATE
searchBtn.addEventListener("click", function (e) {
  getData(
    searchYearInput.value,
    searchMonthInput.value,
    searchCategoryInput.value
  );
  // return to initial state
  booksContainer.innerHTML = "";
});

async function getData(userYear, userMonth, userCategory) {
  const data = [];
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/${userYear}-${userMonth}-28/${userCategory}.json?api-key=zdsGcSMWHDVJToI4XvZOHBTOl9I0AbD7`
  );
  data.push((await response.json()).results.books);
  // console.log(data.flat());
  showBooks1(data.flat());
}

//Displaying result in UI
const showBooks1 = function (list) {
  list.forEach((el) => {
    const bookCard = document.createElement("div");
    bookCard.className = "card";
    bookCard.innerHTML = `
    <img src="${el.book_image}" alt="" />
    <div>
    <h3>${el.title}</h3>
    by <h4>${el.author}</h4>
    <p>${el.description === null ? " " : el.description}</p>
    <a href="${el.buy_links[0].url}" target="_blank"><button>Amazon</button></a>
    </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};

//SEARCHING BOOK BY ITS NAME & AUTHOR
searchByNameBtn.addEventListener("click", function () {
  if (searchBookTitleInput.value !== "") {
    getData2(searchBookTitleInput.value, "");
  } else if (searchBookAuthorInput.value !== "") {
    getData2("", searchBookAuthorInput.value);
  }
  //return to initial state
  searchBookTitleInput.value = "";
  searchBookAuthorInput.value = "";
  booksContainer.innerHTML = "";
});

async function getData2(userTitle, userAuthor) {
  userTitle = userTitle.split(" ").join("%20");
  userAuthor = userAuthor.split(" ").join("%20");
  const response = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?author=${userAuthor}&title=${userTitle}&api-key=zdsGcSMWHDVJToI4XvZOHBTOl9I0AbD7`
  );
  data2 = (await response.json()).results;
  // console.log(data2);
  if (data2.length === 0) {
    booksContainer.innerHTML = `<h2>Not Found</h2>`;
  } else {
    showBooks2(data2);
  }
}
//Displaying result in UI
const showBooks2 = function (list) {
  list.forEach((el) => {
    const bookCard = document.createElement("div");
    bookCard.className = "card noimage";
    bookCard.innerHTML = `
    <div>
    <h3>${el.title}</h3>
    by <h4>${el.author}</h4>
    <p>${el.description === null ? " " : el.description}</p>
    </div>
    `;
    booksContainer.appendChild(bookCard);
  });
};
