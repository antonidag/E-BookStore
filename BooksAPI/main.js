$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$("#btn_checkout").on('click', function (e) {
    var body = $("#app");
    body[0].style.backgroundImage = "url('')";
    $("#bookcontainer").fadeOut();
    $("#checkout").delay(500).fadeIn();
});

$("#btn_backtoshop").on('click', function (e) {

    $("#checkout").fadeOut();
    $("#bookcontainer").delay(500).fadeIn();

});

var uri = '';

//Click event on btn_search make a ajax request to web api.
$('#btn_search').on('click', function (e) {

    fadeout();
    var search_string = $('#input_search').val();
    searchBooks(search_string);
});

// If Enter is pressed fade out then search on the book.
$(document).keyup(function (event) {
    if ($("#input_search").is(":focus") && event.key == "Enter") {
        fadeout();

        var search_string = $('#input_search').val();
        searchBooks(search_string);
    }
});


function fadeout() {
    $("#bookcontainer").html("");
    $("#checkout").fadeOut();
    $("#bookcontainer").delay(500).fadeIn();
    var body = $("#app");
    body[0].style.backgroundImage = "url('')";
}

// Change to the tooltip to other text.
$("#searchby").change(function () {
    var searchby = $("#searchby").val();
    switch (searchby) {
        case "Title":
            $("#input_search").attr('title', 'Example: The Hobbit').tooltip('fixTitle').tooltip('show');
            break;
        case "Author":
            $("#input_search").attr('title', 'Example: John').tooltip('fixTitle').tooltip('show');
            break;
        case "Genre":
            $("#input_search").attr('title', 'Example: Computer').tooltip('fixTitle').tooltip('show');
            break;
        default:
    }
});

// Make Ajax request to api
function searchBooks(input) {
    var searchby = $("#searchby").val();
    if (input.length > 0) {
        switch (searchby) {
            case "Title":
                uri = 'http://localhost:49879/api/books?title=' + input;
                ajax(uri);
                break;
            case "Author":
                uri = 'http://localhost:49879/api/Books?author=' + input;
                ajax(uri);
                break;
            case "Genre":
                uri = 'http://localhost:49879/api/Books?genre=' + input;
                ajax(uri);
                break;
            default:
        }
    } else {
        uri = 'http://localhost:49879/api/Books';
        ajax(uri);
    }
}

function ajax(uri) {
    $.ajax({
        url: uri, success: function (result) {
            console.log(result);
            result.forEach((item) => addToView(item));
        }
    });
}

//Adds items to bookcontainer.
function addToView(item) {
    // Create all the divs and fill wiht info from the item.
  var book_item = document.createElement("div");
  book_item.className = "book_item";
  book_item.id = "book";

  var img = document.createElement("img");
  img.src = "img/book.svg";

  var title = document.createElement("h3");
  title.innerHTML = item.Title;

  var author = document.createElement("p");
  author.innerHTML = "<strong>" + item.Author + "</strong>";

  var genre = document.createElement("p");
  genre.innerHTML = "<i>" + item.Genre + "</i>";

  var publish = document.createElement("p");
  publish.innerHTML = "Publish in: " + item.Publish_Date.substring(0,10);

  var pDes = document.createElement("p");
  pDes.innerHTML = item.Description;

  var price = document.createElement("p");
  price.innerHTML = "<strong>Price: " + item.Price + " $</strong>";

  //Create btn and add click event.
  var btn = document.createElement("button");
  btn.id = "btn_buy";
  btn.type = "button";
  btn.className = "btn btn-warning";
  btn.innerHTML = "Buy Now";
  btn.addEventListener("click", (event) => buy(event));

  // Append all the elements to the book_item.
  book_item.appendChild(img);
  book_item.appendChild(title);
  book_item.appendChild(author);
  book_item.appendChild(genre);
  book_item.appendChild(publish);
  book_item.appendChild(pDes);
  book_item.appendChild(price);
  book_item.appendChild(btn);

  // Append the book_item to the DOM.
  var currentDiv = document.getElementById("bookcontainer");
  currentDiv.appendChild(book_item);
}

// Click event on btn_buy
function buy(e) {
    // Get the btn parent element
    var target = e.target.parentElement;

    // Get the Title and price
    var title = target.childNodes[1].innerHTML;
    var strPrice = target.childNodes[6].childNodes[0].innerHTML;
    var price = parseFloat(strPrice.substring(7, strPrice.length - 2));


    // Fix to decimals .11
    var fixedPrice = price.toFixed(2);

    addToCheckOut(title, fixedPrice);
}


var sumPrice = 0;

var numberOfBooks = 0;

// Adds a book to the chechoutlist
function addToCheckOut(title, price){
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = title;

    var p = document.createElement("p");
    p.innerHTML = price;

    var btn = document.createElement("span");
    btn.id = "btn_removeItm";
    btn.className = "close";
    btn.innerHTML = "X";
    btn.addEventListener("click", (event) => removeItem(event));

    li.appendChild(p);

    p.appendChild(btn);

    var ul = document.getElementById("checkoutlist");
    ul.appendChild(li);

    // Fix price so there is only 2 decimals 0.11
    var sum = parseFloat(sumPrice) + parseFloat(price);
    var fixedSumPrice = sum.toFixed(2);
    sumPrice = fixedSumPrice;


    var textprice = document.getElementById("sumPrice");
    textprice.innerHTML = "<strong>Summary: " + sumPrice + " $</strong>";
    numberOfBooks++;
    $("#btn_checkout").html(numberOfBooks);
}

// Removes a li from the checkoutlist.
function removeItem(event) {
    // Get the elements 
    var p = event.target.parentElement;
    var li = p.parentElement;
    var price = parseFloat(p.innerHTML);

    // Fix price so there is only 2 decimals 0.11
    var sum = parseFloat(sumPrice) - parseFloat(price);
    var fixedSumPrice = sum.toFixed(2);
    sumPrice = fixedSumPrice;


    var textprice = document.getElementById("sumPrice");
    textprice.innerHTML = "<strong>Summary: " + sumPrice + " $</strong>";
    numberOfBooks--;

    $("#btn_checkout").html(numberOfBooks);
    $(li).remove();
}

