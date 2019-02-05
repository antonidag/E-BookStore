﻿$(document).ready(() => {
    $("#btn_checkout").on('click', function (e){
        $("#bookcontainer").fadeOut();
        $("#checkout").delay(500).fadeIn();
    });
    $("#btn_backtoshop").on('click', function(e){
        $("#checkout").fadeOut();
        $("#bookcontainer").delay(500).fadeIn();

    });
});

var uri = 'http://localhost:49879/api/books?title=';

//Click event on btn_search make a ajax request to web api.
$('#btn_search').on('click', function (e) {

    //If your in the checkout meny, then fade it out.
    $("#checkout").fadeOut();
    $("#bookcontainer").delay(500).fadeIn();


    var search_string = $('#input_search').val();

    // Send an AJAX request
    if (search_string.length > 0) {
        uri += search_string;
        searchBooks(uri);
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
  btn.addEventListener("click", (event) => buy(event));

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

}

function buy(e) {
    var target = e.target.parentElement;
    console.log(target);
    
}


var sumPrice = 0;
var numberOfBooks = 1;
function addToCheckOut(title, price){
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = title;

    var ul = document.getElementById("checkoutlist");
    ul.appendChild(li);
    sumPrice += price;

    var textprice = document.getElementById("sumPrice");
    textprice.innerHTML = "<strong>Summary: " + sumPrice + " $</strong>";
    $("#btn_checkout").html(numberOfBooks++);
}
