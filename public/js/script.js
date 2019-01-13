
///////////////////7 Search functionality //////////////////////

const books_table = document.querySelector("tbody");
const book_to_search = document.querySelector("#search_bar");
let flag_array = "";

class book_found {
    constructor (title, link, author, genre, year) {
        this.title= title,
        this.link= link,
        this.author= author,
        this.genre= genre,
        this.year= year
    }
}

// Search function - searches and displays results
const searchFunction = () => {
  
  const value_to_search = book_to_search.value.toUpperCase();
  const books = document.querySelectorAll("#db_table .book_row");
  const title = document.querySelectorAll(".title_col");
  const link = document.querySelectorAll("table a");
  const author = document.querySelectorAll(".author_col");
  const genre = document.querySelectorAll(".genre_col");
  const year_published = document.querySelectorAll(".year_col");
  const initial_list = document.querySelector(".student-list");
  const search_results = [];

  // Hides initial display of books when search function is called
  books_table.style.display = "none"; 
  
  // Adds matching results to array to be displayed
  for (let i = 0; i < books.length; i += 1) {
      
      if (title[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
       author[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
        genre[i].textContent.toUpperCase().indexOf(value_to_search) > -1 ||
         year_published[i].textContent.toUpperCase().indexOf(value_to_search) > -1) {

             //Creates found book instance and adds it to the array to display
            search_results.push(new book_found(title[i].textContent, 
                link[i].getAttribute("href"), 
                author[i].textContent, 
                genre[i].textContent, 
                year_published[i].textContent)); 

      }
  
  }

  //Iterates over every object in the search results item and returns a table row for each item
  const results_to_display = search_results.map( book =>
      `<tr class="book_row">
      <td class="title_col"><a href="${book.link}">${book.title}</a></td>
      <td class="author_col">${book.author}</td><td class="genre_col">${book.genre}</td>
      <td class="year_col">${book.year}</td>
      </tr>`
  ).join("");

  // Selects the main table where books are displayed
  const table = document.querySelector("table");

  // Function for createing and appending a new table for the search results
  const create_table = () => {

    const new_table = document.createElement("tbody");
    table.appendChild(new_table);
    new_table.className = "results_table";

  }

  // Conditional for reseting the resutls table
  if (document.querySelector(".results_table")) {
    table.removeChild(document.querySelector(".results_table"));
    create_table();
  } else {
    create_table();
  }

  // Displays the search results rows in the table created
  const results_table = document.querySelector(".results_table");
  results_table.innerHTML = results_to_display;
  
}

// Event listener for search bar
book_to_search.addEventListener("keyup", () => {
    // calls the search function when a change in the field occurs
    searchFunction();
});