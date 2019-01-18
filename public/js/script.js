
///////////////////7 Search functionality //////////////////////

const books_table = document.querySelector("tbody");
const books = document.querySelectorAll("#db_table .book_row");
const book_to_search = document.querySelector("#search_bar");

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

// Creates the list element to contain pagination links
// "reference_list" parameter takes a collection of books to be passes to the pagination_links function
const pagination_container = (reference_list = books) => {
    const container = document.querySelector(".pagination_container");
    const pagination_list = document.createElement("ul");
    container.appendChild(pagination_list);
    //displays the pagination links
    pagination_list.innerHTML = pagination_links(reference_list);
}

// Function that creates the pagination links
// "books_to_asses" parameter takes a collection of books to determine in how many pages the collection will be divided (7 books max per page)
const pagination_links = (books_to_asses) => {

    // calculates the amount of pages needed
    const total_links =  Math.ceil(books_to_asses.length / 7);
    const links_to_print = [];

    for (let i = 0; i <= total_links; i += 1) {

        if( i != 0) {
            let a = `<li><a>${i}</a></li>`
        links_to_print.push(a);
        }
        
    }

    // returns links HTML
    return links_to_print.join("")
}

// Function for displaying 7 results per page
// "table" parameter - string - name of the table where books will be selected
// "link_number" parameter - Interger - number of the page with results that wants to be displayed
const display_seven_results = (table, link_number = 1) => {

    // Retrieves books from the db table or search results table
    const chosen_table_books = document.querySelectorAll(`${table} .book_row`);

    // Logic for determining which books to be displayed
    const max_to_display = parseInt(link_number) * 7;
    const min_to_display = max_to_display - 7;

    // Hides all books
    for (let i = 0; i < chosen_table_books.length; i += 1) {
            chosen_table_books[i].style.display = "none";
    }

    // Displays needed books
    for (let i = min_to_display; i <= max_to_display - 1; i += 1) {

        // If the i is equal or higher to the books.length it will break
        if (i >= chosen_table_books.length) {
            break
        } else {
            // Displays book
            chosen_table_books[i].style.display = "";
        }

    }

}

///////////// Event listeners/ Function calls /////////////

// Event listener for search bar
book_to_search.addEventListener("keyup", () => {

    // calls the search function when a change in the field occurs
    searchFunction();

    // Creation of pagination links after search functionality is called
    const results_to_paginate = document.querySelectorAll(".results_table .book_row");
    const links_container = document.querySelector(".pagination_container");
    const previous_links = document.querySelector(".pagination_container ul");

    // Resets pagination container list
    links_container.removeChild(previous_links);
    // Prints new pagination list according to search results
    pagination_container(results_to_paginate);
    // Displays 7 first obtained results
    display_seven_results(".results_table");
});

// Event listener for pagination links

const links_container = document.querySelector(".pagination_container");

links_container.addEventListener("click", (event) => {

    const results_table = document.querySelector(".results_table");

    if (event.target.tagName === "A") {
        const link_number = event.target.textContent;
    
        if (results_table) {
            display_seven_results(".results_table", link_number);
        } else {
            display_seven_results("#db_table", link_number);
        }
        
    }
    
})

// Calls function to create pagination links when page loaded
pagination_container();
// Displays first 7 books on  the DB
display_seven_results("#db_table");