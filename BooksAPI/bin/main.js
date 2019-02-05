$(document).ready(() => {


});

var uri = 'http://localhost:49879/api/books?title=';

//Click event on btn_search make a ajax request to web api.
$('#btn_search').on('click', function (e) {
    var search_string = $('#input_search').val();

    // Send an AJAX request
    if (search_string.length > 0) {
        uri += search_string;
        searchBooks(url);
    } else {
        uri = 'http://localhost:49879/api/books';
        searchBooks(uri);
    }
});

function searchBooks(url){
  $.ajax({
      url: uri, success: function (result) {
          console.log(result);
          result.forEach((item) => addToView(item));
      }
  });
}


function addToView(item) {

  var book_item = document.createElement("div");
  book_item.className = "book_item";
  book_item.id = "book";

  var img = document.createElement("img");
  img.src = "img/book.svg";

  var title = document.createElement("h3");
  title.innerHTML = item.Title;

  var author = document.createElement("p");
  author.innerHTML = "<strong>" + item.Author + "</strong>"

  var genre = document.createElement("p");
  genre.innerHTML = "<i>" + item.Genre + "</i>";

  var publish = document.createElement("p");
  publish.innerHTML = "Publish in: " + item.Publish_Date;

  var pDes = document.createElement("p");
  pDes.innerHTML = item.Description;

  var price = document.createElement("p");
  price.innerHTML = "<strong>Price: " + item.Price + " $</strong>";

  var btn = document.createElement("button");
  btn.id = "btn_buy";
  btn.type = "button";
  btn.className = "btn btn-warning";
  btn.innerHTML = "Buy Now";

  book_item.appendChild(img);
  book_item.appendChild(title);
  book_item.appendChild(author);
  book_item.appendChild(genre);
  book_item.appendChild(publish);
  book_item.appendChild(pDes);
  book_item.appendChild(price);
  book_item.appendChild(btn);

  var currentDiv = document.getElementById("bookcontainer");
  currentDiv.appendChild(book_item);

  addClickOnBtn();
}

function addClickOnBtn(){
  var btn_buy = document.getElementsByClassName("btn btn-warning");
  for (var i = 0; i < btn_buy.length; i++) {
      btn_buy[i].addEventListener("click", function () {
          buy(event);
      });
  }
}



function buy(e) {
    var target = e.target.parentElement;
    console.log(target);
}
